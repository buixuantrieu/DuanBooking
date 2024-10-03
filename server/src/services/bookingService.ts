import prisma from "@prismaClient";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { createNotification, sendMail } from "./userService";

// Kích hoạt plugin
dayjs.extend(utc);
dayjs.extend(timezone);

export const createBooking = async (
  customerName: string,
  phone: string,
  email: string,
  checkIn: Date,
  checkOut: Date,
  customerId: string,
  totalPrice: number,
  roomId: number,
  paymentMethod: string
) => {
  const check = await prisma.booking.findFirst({
    where: {
      customerId,
      roomId,
      checkIn: checkIn,
      checkOut: checkOut,
    },
  });

  if (!check) {
    const booking = await prisma.booking.create({
      data: {
        customerName,
        phone,
        email,
        checkIn: checkIn,
        checkOut: checkOut,
        customerId,
        totalPrice,
        roomId,
      },
    });
    const payment = await prisma.payment.create({
      data: {
        amount: totalPrice,
        paymentMethod,
        status: 0,
        bookingId: booking.id,
      },
    });
    return payment;
  }
  return check;
};

export const updateCreateBooking = async (checkIn: Date, checkOut: Date, customerId: string, roomId: number) => {
  const check = await prisma.booking.findFirst({
    where: {
      customerId,
      roomId,
      checkIn: checkIn,
      checkOut: checkOut,
    },
    include: {
      Payment: true,
      room: {
        include: {
          user: {
            include: {
              profile: true,
            },
          },
        },
      },
    },
  });

  const checkPayment = await prisma.booking.findMany({
    where: {
      OR: [
        {
          checkIn: {
            gte: checkIn,
            lt: checkOut,
          },
          checkOut: {
            lte: checkOut,
          },
        },
        {
          checkIn: {
            gte: checkIn,
            lte: checkOut,
          },
        },
      ],
      Payment: {
        status: 1,
      },
    },
    include: {
      Payment: true,
    },
  });

  if (check && checkPayment.length == 0) {
    const PaymentItem = await prisma.payment.update({
      data: {
        status: 1,
      },
      where: {
        id: check.Payment?.id,
      },
    });
    const conflictingBookings = await prisma.booking.findMany({
      where: {
        roomId,
        NOT: {
          id: check.id,
        },
        OR: [
          {
            checkIn: {
              gte: checkIn,
              lt: checkOut,
            },
            checkOut: {
              lte: checkOut,
            },
          },
          {
            checkIn: {
              gte: checkIn,
              lte: checkOut,
            },
          },
        ],
      },
      include: {
        Payment: true,
      },
    });
    for (const booking of conflictingBookings) {
      if (booking.Payment) {
        await prisma.payment.update({
          where: {
            id: booking.Payment.id,
          },
          data: {
            status: 2,
          },
        });
      }
    }
  } else if (check && checkPayment.length != 0) {
    const PaymentItem = await prisma.payment.update({
      data: {
        status: 3,
      },
      where: {
        id: check.Payment?.id,
      },
    });
    createNotification(
      customerId,
      "Phòng bạn đặt đã được người khác thanh toán trước. Hệ thống sẽ hoàn tiền cho bạn trong vòng 24 giờ tới. Chúng tôi xin lỗi vì sự bất tiện này và rất mong bạn thông cảm!"
    );
  }
  if (check && checkPayment.length == 0) {
    const dateCheckIn = new Date(check.checkIn);
    const dateCheckOut = new Date(check.checkOut);
    const contentHtml = `
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #6f76b5;">Xác Nhận Đặt Phòng Thành Công</h1>
          <p>Chào <strong>${check.customerName}</strong>,</p>
          <p>Cảm ơn bạn đã đặt phòng trên MingSuBooking của chúng tôi. Dưới đây là thông tin chi tiết về đặt phòng của bạn:</p>

          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                  <th style="border: 1px solid #ddd; padding: 8px; background-color: #6f76b5; color: white;">Thông Tin</th>
                  <th style="border: 1px solid #ddd; padding: 8px; background-color: #6f76b5; color: white;">Chi Tiết</th>
              </tr>
              <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">Tên khách sạn</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${check.room.roomName}</td>
              </tr>
              <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">Ngày nhận phòng</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">2:00 - ${dayjs(dateCheckIn)
                    .subtract(1, "day")
                    .format("DD/MM/YYYY")}</td>
              </tr>
              <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">Ngày trả phòng</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">12:00 - ${dayjs(dateCheckOut)
                    .subtract(1, "day")
                    .format("DD/MM/YYYY")}</td>
              </tr>
              <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">Tổng Chi Phí</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${check.totalPrice.toLocaleString("en-US")}.00$</td>
              </tr>
          </table>

          <p>Chúng tôi rất mong được chào đón bạn tại khách sạn của chúng tôi!</p>
          <p>Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại dưới đây.</p>

          <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #888;">
              <p>Địa chỉ: ${check.room.location}</p>
              <p>Email: ${check.room.user.email} | Số điện thoại: ${check.room.user.profile?.phone}</p>
          </div>
      </div>
  </body>
      `;
    await sendMail(check.email, contentHtml);
  }
};

export const getBookingByRoomId = async (roomId: number) => {
  const bookingList = await prisma.booking.findMany({
    where: {
      roomId: roomId,
      Payment: {
        status: 1,
      },
    },
    include: {
      Payment: true,
    },
  });
  return bookingList;
};
export const getBookingByUserId = async (userId: string | undefined) => {
  const bookingList = await prisma.booking.findMany({
    where: {
      customerId: userId,
    },
    include: {
      Payment: true,
      room: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return bookingList;
};
