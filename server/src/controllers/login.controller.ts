import env from "@configs/env";
import prisma from "@prismaClient";
import {
  createSubTableUser,
  createUser,
  createUserRole,
  generateAccessToken,
  generateRefreshToken,
  getUsers,
  updateProfileById,
} from "@services/userService";
import { checkPassword } from "@utils/userUtils";
import axios from "axios";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uid } from "uuid";

export class LoginController {
  public async create(req: Request, res: Response) {
    try {
      const { userName, password } = req.body;
      const user = await getUsers(
        {
          userName,
        },
        undefined,
        {
          UserRole: {
            include: {
              role: true,
            },
          },
        }
      );
      if (user.length > 0) {
        if (user[0].status === 1) {
          return res.status(400).json({ message: "Tài khoản chưa kích hoạt!" });
        } else if (user[0].status === 3) {
          return res
            .status(400)
            .json({ message: "Tài khoản đã bị khóa, vui lòng liên hệ tổng đài để biết thêm chi tiết!" });
        }
        const checkPass = checkPassword(password, user[0].password);
        if (checkPass) {
          const accessToken = generateAccessToken({ id: user[0].id });
          const refreshToken = generateRefreshToken({ id: user[0].id });
          return res.json({ accessToken, refreshToken, user: user[0] });
        } else {
          return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu!" });
        }
      } else {
        return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu!" });
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async loginWithGoogle(req: Request, res: Response) {
    res.redirect(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${env.googleClientId}&redirect_uri=${env.googleRedirectUri}&response_type=code&scope=profile email`
    );
  }
  public async loginWithGoogleRedirect(req: Request, res: Response) {
    try {
      const { code } = req.query;

      const {
        data: { access_token },
      } = await axios.post("https://oauth2.googleapis.com/token", {
        client_id: env.googleClientId,
        client_secret: env.googleClientSecret,
        code,
        redirect_uri: env.googleRedirectUri,
        grant_type: "authorization_code",
      });

      const { data: googleUser } = await axios.get("https://www.googleapis.com/oauth2/v1/userinfo", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const loginUser = await getUsers({ email: googleUser.email }, undefined, {
        UserRole: {
          include: {
            role: true,
          },
        },
      });

      if (loginUser.length === 0) {
        const userId = uid();
        const user = await createUser(userId, googleUser.name, "google", googleUser.email, 0, 2);
        await createUserRole(userId, 2);
        await createSubTableUser(userId);
        await updateProfileById(userId, {
          avatar: googleUser.picture,
          fullName: googleUser.name,
        });
        const accessToken = await generateAccessToken({ id: userId });
        const refreshToken = await generateRefreshToken({ id: userId });
        return res.json({ accessToken, refreshToken, user: { UserRole: 2 } });
      } else {
        const userProfile = await prisma.profile.findFirst({
          where: {
            userId: loginUser[0].id,
          },
        });
        if (userProfile?.avatar == null || userProfile?.avatar == "") {
          await updateProfileById(loginUser[0].id, {
            avatar: googleUser.picture,
            fullName: googleUser.name,
          });
        }
        const accessToken = await generateAccessToken({ id: loginUser[0].id });
        const refreshToken = await generateRefreshToken({ id: loginUser[0].id });
        return res.json({ accessToken, refreshToken, user: loginUser[0] });
      }
    } catch (e) {
      res.status(500).json({ error: "An error occurred while fetching users." });
    }
  }
}
