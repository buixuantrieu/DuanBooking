import { createComment, getCommentByRoomId } from "@services/rateService";
import { log } from "console";
import { Request, Response } from "express";
import { get } from "http";

interface CustomRequest extends Request {
  userId?: string;
}
export class CommentController {
  public async index(req: Request, res: Response) {
    try {
      const { id } = req.query;

      const comment = await getCommentByRoomId(Number(id));
      res.json(comment);
    } catch (e) {
        console.log(e);
        
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async create(req: CustomRequest, res: Response) {
    try {
      const { content, roomId } = req.body;
      const userId = req.userId;
      const comment = await createComment(userId as string, Number(roomId), content as string);
      res.json(comment);
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
