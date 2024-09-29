import { createBooking, getBookingByRoomId, getBookingByUserId, updateCreateBooking } from "@services/bookingService";
import { Request, Response } from "express";

interface CustomRequest extends Request {
  userId?: string;
}
export class BookingController {
  public async create(req: CustomRequest, res: Response) {
    try {
      const { customerName, phone, email, checkIn, checkOut, customerId, amount, roomId, paymentMethod } = req.body;
      const result = await createBooking(
        customerName,
        phone,
        email,
        checkIn,
        checkOut,
        customerId,
        amount,
        roomId,
        paymentMethod
      );
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async updateCreate(req: CustomRequest, res: Response) {
    try {
      const { checkIn, checkOut, customerId, roomId } = req.body;
      await updateCreateBooking(checkIn, checkOut, customerId, Number(roomId));
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async getBookingByRoomId(req: CustomRequest, res: Response) {
    try {
      const { roomId } = req.query;
      const result = await getBookingByRoomId(Number(roomId));
      res.json(result);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async getBookingByUserId(req: CustomRequest, res: Response) {
    try {
      const result = await getBookingByUserId(req.userId);
      res.json(result);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
