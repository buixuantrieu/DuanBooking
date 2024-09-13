import { Router } from "express";
import { RestActions } from "@configs/enum";
import { RegisterRoute } from "./register.route";
import { UserRoute } from "./user.route";
import { LoginRoute } from "./login.route";
import { AddressRoute } from "./address.route";
import { RefreshTokenRoute } from "./refreshToken.route";

export class Route {
  private static path = Router();

  public static draw() {
    this.path.use("/refresh-token", RefreshTokenRoute.draw());
    this.path.use("/register", RegisterRoute.draw());
    this.path.use("/login", LoginRoute.draw());
    this.path.use("/users", UserRoute.draw());
    this.path.use("/address", AddressRoute.draw());
    return this.path;
  }

  public static resource(
    path: Router,
    customController: any,
    filter?: {
      only?: RestActions[];
      except?: RestActions[];
    }
  ) {
    if (filter?.only && filter?.except) {
      throw new Error("Can only pass only or except!");
    }

    if (this.isAllowAccess(filter?.only, filter?.except, RestActions.Index))
      path.route("/").get(customController.index);

    if (this.isAllowAccess(filter?.only, filter?.except, RestActions.New)) path.route("/new").get(customController.new);

    if (this.isAllowAccess(filter?.only, filter?.except, RestActions.Show))
      path.route("/:id").get(customController.show);

    if (this.isAllowAccess(filter?.only, filter?.except, RestActions.Create))
      path.route("/").post(customController.create);

    if (this.isAllowAccess(filter?.only, filter?.except, RestActions.Edit))
      path.route("/:id/edit").get(customController.edit);

    if (this.isAllowAccess(filter?.only, filter?.except, RestActions.Update))
      path.route("/:id").put(customController.update);

    if (this.isAllowAccess(filter?.only, filter?.except, RestActions.Destroy))
      path.route("/:id").delete(customController.destroy);
  }

  private static isAllowAccess(
    only: RestActions[] | undefined,
    except: RestActions[] | undefined,
    action: RestActions
  ) {
    return (!only && !except) || (only && only?.includes(action)) || (except && !except?.includes(action));
  }
}
