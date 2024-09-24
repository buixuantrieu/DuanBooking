import { createRoom, getAllAmenity, getAllRoomType } from "@services/roomService";
import { Request, Response } from "express";

interface CustomRequest extends Request {
  userId?: string;
}
export class RoomController {
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
