import jwt from "jsonwebtoken";
import prisma from "../prismaClient/index";
import { Request, Response, NextFunction } from "express";
interface CustomRequest extends Request {
  userId?: string;
}
export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    if (typeof user !== "string" && user.id) {
      req.userId = user.id;
    }
    next();
  } catch (error) {
    return res.status(403).json({ message: "Access token is invalid or expired" });
  }
};
export const authenticatePartnerToken = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
    if (typeof user !== "string" && user.id) {
      const partner = await prisma.partner.findFirst({
        where: {
          userId: user.id,
        },
      });
      if (partner?.isApproved && partner.isActive) {
        req.userId = user.id;
        next();
      } else {
        return res.status(403).json({ message: "Access token is invalid or expired" });
      }
    } else {
      return res.status(403).json({ message: "Access token is invalid or expired" });
    }
  } catch (error) {
    return res.status(403).json({ message: "Access token is invalid or expired" });
  }
};
