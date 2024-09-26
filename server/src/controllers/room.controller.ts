import { createRoom, getAllAmenity, getAllRoom, getAllRoomType } from "@services/roomService";
import { Request, Response } from "express";

interface CustomRequest extends Request {
  userId?: string;
}
export class RoomController {
  public async index(req: Request, res: Response) {
    try {
      const { q, amenityIds, priceRange, typeRoomId, sort } = req.query;
      let amenityList: number[] = [];
      let pricePerNight: number[] = [];
      let roomTypeId: number | undefined = undefined;
      let sortBy: { [key: string]: string } | undefined = undefined;
      if (Array.isArray(amenityIds)) {
        amenityList = amenityIds.map((id) => Number(id)).filter((id) => !isNaN(id));
      }
      if (Array.isArray(priceRange)) {
        pricePerNight = priceRange.map((price) => Number(price));
      }
      if (typeof typeRoomId === "string") {
        roomTypeId = Number(typeRoomId);
      }

      if (typeof sort === "string") {
        const arrSort = sort.split("_");
        sortBy = { [arrSort[0]]: arrSort[1] };
      }

      const result = await getAllRoom(q as string, amenityList, pricePerNight, roomTypeId, sortBy);
      res.json(result);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async getRoomType(req: Request, res: Response) {
    try {
      const result = await getAllRoomType();
      res.json(result);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async getAmenity(req: Request, res: Response) {
    try {
      const result = await getAllAmenity();
      res.json(result);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async create(req: CustomRequest, res: Response) {
    try {
      const {
        title,
        roomName,
        image,
        description,
        districtId,
        provinceId,
        wardId,
        location,
        pricePerNight,
        roomTypeId,
        amenities,
        imageList,
      } = req.body;
      const partnerId = req.userId;
      if (partnerId) {
        const room = await createRoom(
          title,
          roomName,
          image,
          description,
          districtId,
          provinceId,
          wardId,
          location,
          pricePerNight,
          roomTypeId,
          partnerId,
          amenities,
          imageList
        );
        res.json(room);
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
