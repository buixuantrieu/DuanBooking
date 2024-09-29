import { RestActions } from "@configs/enum";
import { BookingController } from "@controllers";
import { Router } from "express";
import { Route } from ".";
import { authenticateToken } from "src/midleware/authMidleware";

export class BookingRoute {
  private static path = Router();
  private static bookingController = new BookingController();

  public static draw() {
    this.path.route("/").post(this.bookingController.create);
    this.path.route("/update").post(this.bookingController.updateCreate);
    this.path.route("/roomId").get(this.bookingController.getBookingByRoomId);
    this.path.route("/userId").get(authenticateToken, this.bookingController.getBookingByUserId);
    return this.path;
  }
}
