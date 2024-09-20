import { RestActions } from "@configs/enum";
import { UserController } from "@controllers";
import { Router } from "express";
import { Route } from ".";
import { authenticateToken } from "../midleware/authMidleware";

export class UserRoute {
  private static path = Router();
  private static userController = new UserController();

  public static draw() {
    this.path.route("/user-info").get(authenticateToken, this.userController.userInfo);
    this.path.route("/register-partner").post(authenticateToken, this.userController.registerPartner);
    Route.resource(this.path, this.userController, {
      only: [RestActions.Destroy],
    });
    return this.path;
  }
}
