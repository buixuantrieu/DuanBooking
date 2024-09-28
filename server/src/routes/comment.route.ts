import { RestActions } from "@configs/enum";
import { CommentController } from "@controllers";
import { Router } from "express";
import { Route } from ".";
import { authenticateToken } from "src/midleware/authMidleware";

export class CommentRoute {
  private static path = Router();
  private static commentController = new CommentController();

  public static draw() {
    this.path.route("/").get(this.commentController.index);
    this.path.route("/").post(authenticateToken, this.commentController.create);
    return this.path;
  }
}
