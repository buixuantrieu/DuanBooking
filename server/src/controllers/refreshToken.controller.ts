import { generateAccessToken, getUsers } from "@services/userService";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
export class RefreshTokenController {
  public async create(req: Request, res: Response) {
    const { token: refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }
    try {
      const decoded = jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET as string) as { id: string };
      const user = await getUsers({ id: decoded.id });
      if (user.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      const newAccessToken = generateAccessToken({ id: user[0].id });
      return res.json({ accessToken: newAccessToken });
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
  }
}
