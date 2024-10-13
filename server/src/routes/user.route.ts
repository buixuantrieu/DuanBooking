import { RestActions } from "@configs/enum";
import { UserController } from "@controllers";
import { Router } from "express";
import { Route } from ".";
import { authenticateToken } from "../middleware/authMiddleware";

export class UserRoute {
  private static path = Router();
  private static userController = new UserController();

  public static draw() {
    this.path.route("/user-info").get(authenticateToken, this.userController.userInfo);
    this.path.route("/register-partner").post(authenticateToken, this.userController.registerPartner);
    this.path.route("/profile").put(authenticateToken, this.userController.updateProfile);
    this.path.route("/change-password").post(authenticateToken, this.userController.changePassword);
    this.path.route("/partner").get(authenticateToken, this.userController.indexPartner);
    this.path.route("/partner/:id").put(authenticateToken, this.userController.updatePartner);
    this.path.route("/notification").get(authenticateToken, this.userController.indexNotification);
    this.path.route("/notification").put(authenticateToken, this.userController.updateNotification);
    Route.resource(this.path, this.userController, {
      only: [RestActions.Destroy],
    });
    return this.path;
  }
}
