import { RestActions } from "@configs/enum";
import { AddressController } from "@controllers";
import { Router } from "express";
import { Route } from ".";

export class AddressRoute {
  private static path = Router();
  private static addressController = new AddressController();

  public static draw() {
    this.path.route("/provinces").get(this.addressController.getProvince);
    this.path.route("/districts").get(this.addressController.getDistrict);
    this.path.route("/wards").get(this.addressController.getWard);
    return this.path;
  }
}
