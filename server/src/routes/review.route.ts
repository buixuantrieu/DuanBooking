import { RestActions } from "@configs/enum";
import { ReviewController } from "@controllers";
import { Router } from "express";
import { Route } from ".";
import { authenticateToken } from "src/midleware/authMidleware";

export class ReviewRoute {
  private static path = Router();
  private static reviewController = new ReviewController();

  public static draw() {
    this.path.route("/").get(this.reviewController.index);
    this.path.route("/").post(authenticateToken, this.reviewController.create);
    return this.path;
  }
}
