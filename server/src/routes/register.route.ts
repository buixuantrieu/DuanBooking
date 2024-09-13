import { RestActions } from "@configs/enum";
import { RegisterController } from "@controllers";
import { Router } from "express";
import { Route } from ".";

export class RegisterRoute {
  private static path = Router();
  private static registerController = new RegisterController();

  public static draw() {
    Route.resource(this.path, this.registerController, {
      only: [RestActions.Create, RestActions.Update],
    });
    return this.path;
  }
}
