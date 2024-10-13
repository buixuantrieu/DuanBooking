import { RestActions } from "@configs/enum";
import { RoomController } from "@controllers";
import { Router } from "express";
import { Route } from ".";
import { authenticatePartnerToken, authenticateToken } from "src/middleware/authMiddleware";

export class RoomRoute {
  private static path = Router();
  private static roomController = new RoomController();

  public static draw() {
    this.path.route("/type").get(this.roomController.getRoomType);
    this.path.route("/type").post(this.roomController.createRoomType);
    this.path.route("/type/:id").get(this.roomController.getRoomTypeDetail);
    this.path.route("/type/:id").put(this.roomController.updateRoomType);
    this.path.route("/amenity").get(this.roomController.getAmenity);
    this.path.route("/amenity").post(this.roomController.createAmenity);
    this.path.route("/amenity/:id").put(this.roomController.updateAmenity);
    this.path.route("/amenity/:id").get(this.roomController.getAmenityDetail);
    this.path.route("/favorite").get(this.roomController.getFavorite);
    this.path.route("/favorite/:id").put(authenticateToken, this.roomController.updateFavorite);
    this.path.route("/partner").get(authenticatePartnerToken, this.roomController.indexPartner);
    this.path.route("/image/:id").put(authenticatePartnerToken, this.roomController.updateImage);
    this.path.route("/").post(authenticateToken, this.roomController.create);
    this.path.route("/").get(this.roomController.index);
    this.path.route("/:id").get(this.roomController.show);
    this.path.route("/:id").put(this.roomController.update);

    return this.path;
  }
}
