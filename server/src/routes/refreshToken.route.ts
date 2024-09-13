import { RestActions } from "@configs/enum";
import { RefreshTokenController } from "@controllers";
import { Router } from "express";
import { Route } from ".";

export class RefreshTokenRoute {
  private static path = Router();
  private static refreshTokenController = new RefreshTokenController();

  public static draw() {
    Route.resource(this.path, this.refreshTokenController, {
      only: [RestActions.Create],
    });
    return this.path;
  }
}
