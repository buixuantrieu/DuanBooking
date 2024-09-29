import prisma from "@prismaClient";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

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
  });
  return bookingList;
};
