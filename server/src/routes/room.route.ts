import { RestActions } from "@configs/enum";
import { RoomController } from "@controllers";
import { Router } from "express";
import { Route } from ".";
import { authenticateToken } from "src/midleware/authMidleware";

export class RoomRoute {
  private static path = Router();
  private static roomController = new RoomController();

  public static draw() {
    this.path.route("/type").get(this.roomController.getRoomType);
    this.path.route("/amenity").get(this.roomController.getAmenity);
    this.path.route("/").post(authenticateToken, this.roomController.create);
    this.path.route("/").get(this.roomController.index);

    return this.path;
  }
}
