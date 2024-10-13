import {
  changePassword,
  createNotification,
  createPartner,
  deleteUser,
  getAllPartner,
  getNotificationByUserId,
  getUserDetailById,
  updatePartner,
  updateProfile,
  updateProfileById,
  updateWatchNotification,
} from "@services/userService";
import { Request, Response } from "express";

interface CustomRequest extends Request {
  userId?: string;
}
export class UserController {
  public async index(req: Request, res: Response) {}
  public async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await deleteUser(id);
      return res.json(user);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async userInfo(req: CustomRequest, res: Response) {
    try {
      const user = await getUserDetailById(req.userId as string);
      return res.json(user);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async updateProfile(req: CustomRequest, res: Response) {
    try {
      const { data } = req.body;
      const { email, ...newData } = data;
      const profile = await updateProfile(newData, req.userId);
      res.json(profile);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async registerPartner(req: CustomRequest, res: Response) {
    try {
      const {
        paymentAccountMethod,
        paymentAccountType,
        paymentAccountInfo,
        userId,
        address,
        provinceId,
        districtId,
        wardId,
        phone,
        fullName,
      } = req.body;
      const partner = await createPartner(userId, paymentAccountMethod, paymentAccountType, paymentAccountInfo);
      await updateProfileById(userId, { address, provinceId, districtId, wardId, phone, fullName });
      return res.json(partner);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async changePassword(req: CustomRequest, res: Response) {
    try {
      const { oldPassword, newPassword } = req.body;

      const checkPass = await changePassword(req.userId as string, oldPassword, newPassword);
      if (checkPass) {
        res.json(checkPass);
      } else {
        return res.status(401).json({ message: "Sai mật khẩu cũ" });
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async indexPartner(req: CustomRequest, res: Response) {
    try {
      const partners = await getAllPartner();
      res.json(partners);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async updatePartner(req: CustomRequest, res: Response) {
    try {
      const { id } = req.params;
      const { isApproved } = req.body;
      const partner = await updatePartner(Number(id), req.body);
      if (isApproved) {
        await createNotification(partner.userId, "Yêu cầu đăng kí đối tác của bạn đã được phê duyệt");
      }

      res.json(partner);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async indexNotification(req: CustomRequest, res: Response) {
    try {
      const result = await getNotificationByUserId(req.userId as string);
      res.json(result);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async updateNotification(req: CustomRequest, res: Response) {
    try {
      const result = await updateWatchNotification(req.userId as string);
      res.json(result);
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
