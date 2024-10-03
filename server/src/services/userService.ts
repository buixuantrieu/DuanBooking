import prisma from "@prismaClient";
import { IncludeParams, SortType } from "src/types/types";
import { UserFilter } from "src/types/userType";
import { checkPassword, hashPassword } from "@utils/userUtils";
import nodemailer from "nodemailer";
import { Profile, User } from "@prisma/client";
import jwt from "jsonwebtoken";

export const getUsers = async (
  params?: UserFilter,
  orderBy?: SortType[] | undefined,
  include?: IncludeParams,
  take?: number,
  skip?: number
) => {
  const users = await prisma.user.findMany({
    where: params,
    orderBy,
    include,
    take,
    skip,
  });
  return users;
};
export const createUser = async (
  id: string,
  userName: string,
  password: string,
  email: string,
  activationCode: number,
  status: number
) => {
  const hashPass = hashPassword(password);
  const user = await prisma.user.create({
    data: {
      id,
      userName,
      password: hashPass,
      email,
      status,
      activationCode,
    },
  });
  return user;
};
export const loginUser = async (userName: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: { userName },
    include: {
      UserRole: true,
    },
  });
  if (user) {
    const checkPass = await checkPassword(password, user.password);
    if (checkPass) {
      return user;
    }
  }
  return false;
};

export const changePassword = async (useId: string, oldPassword: string, newPassword: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id: useId,
    },
  });
  const checkPass = await checkPassword(oldPassword, user?.password as string);
  if (checkPass) {
    const hashPass = await hashPassword(newPassword);
    await prisma.user.update({
      data: {
        password: hashPass,
      },
      where: {
        id: useId,
      },
    });
    return true;
  }
  return false;
};

export const sendMail = async (email: string, htmlContent: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mingsuhomestay@gmail.com",
        pass: "ocjs njlp vdfm befn",
      },
    });

    const mailOptions = {
      from: "mingsuhomestay@gmail.com",
      to: email,
      subject: "MingSu HomeStay",
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
export const getUserById = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  return user;
};
export const updateUser = async (id: string, newData: Partial<User>) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: newData,
  });
};
export const createSubTableUser = async (userId: string) => {
  await Promise.all([
    prisma.userLog.create({ data: { userId } }),
    prisma.userSetting.create({ data: { userId } }),
    prisma.profile.create({ data: { userId } }),
  ]);
};
export const deleteUser = async (id: string) => {
  await prisma.user.delete({ where: { id } });
};
export const updateProfileById = async (userId: string, newData: Partial<Profile>) => {
  try {
    const profile = await prisma.profile.findFirst({
      where: {
        userId,
      },
    });
    const updateUser = await prisma.profile.update({
      where: {
        userId,
      },
      data: newData,
    });
    return updateUser;
  } catch (error) {
    console.error("Error updating account:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
export const generateAccessToken = (data: UserFilter) => {
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "1h",
  });
  return accessToken;
};
export const generateRefreshToken = (data: UserFilter) => {
  const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "7d",
  });
  return accessToken;
};
export const getUserDetailById = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      Partner: true,
      Booking: {
        where: {
          Payment: {
            status: 1,
          },
        },
        include: {
          Payment: true,
        },
      },
      profile: true,
      userLog: true,
      userSetting: true,
      UserRole: {
        include: {
          role: true,
        },
      },
    },
  });
  return user;
};

export const createUserRole = async (userId: string, roleId: number) => {
  const userRole = await prisma.userRole.create({
    data: {
      userId,
      roleId,
    },
  });
  return userRole;
};
export const createPartner = async (
  userId: string,
  paymentAccountMethod: string,
  paymentAccountType: string,
  paymentAccountInfo: string
) => {
  const partner = await prisma.partner.create({
    data: {
      isApproved: false,
      userId,
      paymentAccountInfo,
      paymentAccountMethod,
      paymentAccountType,
    },
  });
  return partner;
};
export const updateProfile = async (data: Profile, userId: string | undefined) => {
  const profile = await prisma.profile.update({
    data,
    where: {
      userId: userId,
    },
  });
};

export const getAllPartner = async () => {
  const result = await prisma.partner.findMany({
    include: {
      user: { include: { profile: true } },
    },
  });
  return result;
};
export const updatePartner = async (id: number, data: { [key: string]: boolean }) => {
  const result = await prisma.partner.update({
    data,
    where: {
      id,
    },
  });
  return result;
};

export const createNotification = async (userId: string, message: string) => {
  const result = await prisma.notification.create({
    data: {
      message,
      userId,
    },
  });
};
export const getNotificationByUserId = async (userId: string) => {
  const notification = await prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return notification;
};
export const updateWatchNotification = async (userId: string) => {
  const result = await prisma.notification.updateMany({
    data: {
      isWatched: true,
    },
    where: {
      userId,
    },
  });
};
