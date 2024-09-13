import { Request, Response } from "express";
import prisma from "@prismaClient";

export class AddressController {
  public async getProvince(req: Request, res: Response) {
    try {
      const provinces = await prisma.province.findMany();
      return res.json(provinces);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async getDistrict(req: Request, res: Response) {
    try {
      const { province_id } = req.query;
      if (typeof province_id === "string") {
        const districts = await prisma.district.findMany({
          where: {
            province_id: parseInt(province_id),
          },
        });
        return res.json(districts);
      } else {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async getWard(req: Request, res: Response) {
    try {
      const { district_id } = req.query;
      if (typeof district_id === "string") {
        const wards = await prisma.wards.findMany({
          where: {
            district_id: parseInt(district_id),
          },
        });
        return res.json(wards);
      } else {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
