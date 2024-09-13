import { Request, Response } from "express";
import { createSubTableUser, createUser, getUsers, sendMail, updateUser } from "@services/userService";
import { generateRandom4DigitNumber } from "@utils/randomUtils";
import { v4 as uuid } from "uuid";

export class RegisterController {
  public async create(req: Request, res: Response) {
    try {
      const { email, userName, password } = req.body;
      const userByEmail = await getUsers({ email });
      const userByUserName = await getUsers({ userName });
      if (userByUserName.length > 0) {
        return res.status(400).json({ message: "Tài khoản đã tồn tại!" });
      } else if (userByEmail.length > 0) {
        return res.status(400).json({ message: "Email đã tồn tại!" });
      } else {
        const id = uuid();
        const activationCode = generateRandom4DigitNumber();
        const user = await createUser(id, userName, password, email, activationCode, 1);
        sendMail(
          email,
          `<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #e3e4f3; color: #333;">
                <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fff;">
                    <tr>
                        <td style="padding: 20px; text-align: center;">
                            <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px;">
                                <h1 style="color: #6f76b8; font-size: 24px; margin-bottom: 20px;">Chào mừng đến với Mingsu Homestay!</h1>
                                <p style="color: #8b90c6; font-size: 16px; line-height: 1.5;">Cảm ơn bạn đã đăng ký. Vui lòng xác nhận địa chỉ email của bạn bằng cách nhập mã OTP dưới đây:</p>
                                <span style="display: inline-block; padding: 12px 24px; margin: 20px 0; font-size: 16px; color: #ffffff; background-color: #6f76b8; text-decoration: none; border-radius: 4px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">${activationCode}</span>
                                <p style="color: #bec0e1; font-size: 14px;">Nếu bạn không thực hiện đăng ký tài khoản, không cần phải thực hiện thêm bất kỳ hành động nào.</p>
                                <p style="color: #8b90c6; font-size: 14px;">Trân trọng,<br>Đội ngũ Mingsu Homestay</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </body>`
        );
        return res.json(user);
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { activationCode } = req.body;
      const user = await getUsers({ id, activationCode });
      if (user.length > 0) {
        const user = await updateUser(id, { statusUserId: 2 });
        await createSubTableUser(id);
        return res.json(user);
      } else {
        return res.status(400).json({ message: "Mã OTP sai!" });
      }
    } catch (e) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
