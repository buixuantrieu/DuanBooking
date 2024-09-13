import { RestActions } from "@configs/enum";
import { LoginController } from "@controllers";
import { Router } from "express";
import { Route } from ".";

export class LoginRoute {
  private static path = Router();
  private static loginController = new LoginController();

  public static draw() {
    this.path.route("/google").get(this.loginController.loginWithGoogle);
    this.path.route("/google/callback").get(this.loginController.loginWithGoogleRedirect);
    Route.resource(this.path, this.loginController, {
      only: [RestActions.Create],
    });
    return this.path;
  }
}
