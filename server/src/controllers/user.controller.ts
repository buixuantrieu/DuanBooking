import { deleteUser, getUserDetailById } from "@services/userService";
import { Request, Response } from "express";

interface CustomRequest extends Request {
  userId?: string;
}
export class UserController {
  public async index(req: Request, res: Response) {}

  public async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await deleteUser(id);
      return res.json(user);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async userInfo(req: CustomRequest, res: Response) {
    try {
      const user = await getUserDetailById(req.userId as string);
      return res.json(user);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}