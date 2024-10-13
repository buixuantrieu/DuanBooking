import {
  createAmenity,
  createRoom,
  createRoomType,
  getAllAmenity,
  getAllRoom,
  getAllRoomType,
  getAmenityDetail,
  getFavoriteById,
  getRoomByPartnerId,
  getRoomDetailById,
  getRoomTypeDetail,
  updateAmenity,
  updateFavorite,
  updateRoom,
  updateRoomImage,
  updateTypeRoom,
} from "@services/roomService";
import { Request, Response } from "express";

interface CustomRequest extends Request {
  userId?: string;
}
export class RoomController {
  public async index(req: Request, res: Response) {
    try {
      const { q, amenityIds, priceRange, typeRoomId, sort, isApproved } = req.query;
      const isApprovedQuery: boolean | undefined =
        isApproved === "true" ? true : isApproved === "false" ? false : undefined;
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

      const result = await getAllRoom(q as string, amenityList, pricePerNight, roomTypeId, sortBy, isApprovedQuery);
      res.json(result);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const room = await getRoomDetailById(Number(id));
      res.json(room);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { amenities, ...rest } = req.body;
      const result = await updateRoom(Number(id), rest);
      res.json(result);
    } catch (e) {
      console.log(e);

      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async updateImage(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { image } = req.body;
      const result = await updateRoomImage(Number(id), image);
      res.json(result);
    } catch (e) {
      console.log(e);

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
  public async updateRoomType(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { imageUrl, typeName, description } = req.body;
      const result = await updateTypeRoom(Number(id), { imageUrl, typeName, description });
      res.json(result);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async createRoomType(req: Request, res: Response) {
    try {
      const { typeName, description, imageUrl } = req.body;
      const result = await createRoomType(typeName, description, imageUrl);
      res.json(result);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async getRoomTypeDetail(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await getRoomTypeDetail(Number(id));
      res.json(result);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  public async indexPartner(req: CustomRequest, res: Response) {
    try {
      const result = await getRoomByPartnerId(req.userId);
      res.status(200).json(result);
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
  public async createAmenity(req: Request, res: Response) {
    try {
      const { amenityName, description } = req.body;
      const result = await createAmenity(amenityName, description);
      res.json(result);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async updateAmenity(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { amenityName, description } = req.body;
      const result = await updateAmenity(Number(id), amenityName, description);
      res.json(result);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async getAmenityDetail(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await getAmenityDetail(Number(id));
      res.json(result);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async getFavorite(req: Request, res: Response) {
    try {
      const { roomId } = req.query;
      const result = await getFavoriteById(Number(roomId));
      res.status(200).json(result);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async updateFavorite(req: CustomRequest, res: Response) {
    try {
      const { id } = req.params;
      await updateFavorite(req.userId as string, Number(id));
      res.status(201).json({ message: "Update success!" });
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
