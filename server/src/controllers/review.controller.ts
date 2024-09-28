import { createReview, getReviewByRoomId } from "@services/rateService";
import { Request, Response } from "express";

interface CustomRequest extends Request {
  userId?: string;
}
export class ReviewController {
  public async index(req: Request, res: Response) {
    try {
      const { id } = req.query;

      const reviews = await getReviewByRoomId(Number(id));
      res.json(reviews);
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async create(req: CustomRequest, res: Response) {
    try {
      const { content, roomId, rate } = req.body;
      const userId = req.userId;
      const comment = await createReview(userId as string, Number(roomId), content as string, rate);
      res.json(comment);
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
