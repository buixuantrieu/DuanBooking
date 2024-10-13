import { Room, RoomType } from "@prisma/client";
import prisma from "@prismaClient";

export const getAllRoomType = async () => {
  const result = await prisma.roomType.findMany();
  return result;
};
export const updateTypeRoom = async (id: number, data: { typeName: string; description: string; imageUrl: string }) => {
  const result = await prisma.roomType.update({
    data,
    where: {
      id,
    },
  });
  return result;
};
export const getRoomTypeDetail = async (id: number) => {
  const result = await prisma.roomType.findFirst({
    where: {
      id,
    },
  });
  return result;
};
export const getAllAmenity = async () => {
  const result = await prisma.amenity.findMany();
  return result;
};
export const getAllRoom = async (
  q: string,
  amenityList: number[],
  pricePerNight: number[],
  roomTypeId: number | undefined,
  orderBySort: { [key: string]: string } | undefined,
  isApproved: boolean | undefined
) => {
  const result = await prisma.room.findMany({
    include: {
      roomType: true,
      Favorite: true,
      Review: true,
      Booking: {
        include: {
          Payment: {
            where: {
              status: 1,
            },
          },
        },
      },
      user: {
        include: {
          profile: true,
          Partner: true,
        },
      },
    },
    where: {
      AND: amenityList.map((amenityId) => ({
        RoomAmenity: {
          some: {
            amenityId: amenityId,
          },
        },
      })),
      roomName: {
        contains: q,
      },
      pricePerNight: {
        gte: pricePerNight[0],
        lte: pricePerNight[1],
      },
      roomTypeId,
      isDelete: false,
      isApproved,
      user: {
        Partner: {
          isApproved: true,
          isActive: true,
        },
      },
    },

    orderBy: orderBySort || { view: "desc" },
  });
  return result;
};

export const createRoom = async (
  title: string,
  roomName: string,
  image: string,
  description: string,
  districtId: number,
  provinceId: number,
  wardId: number,
  location: string,
  pricePerNight: number,
  roomTypeId: number,
  partnerId: string,
  amenities: number[],
  imageList: string[]
) => {
  return await prisma.$transaction(async (prisma) => {
    const room = await prisma.room.create({
      data: {
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
      },
    });

    const amenityPromises = amenities.map((item) =>
      prisma.roomAmenity.create({
        data: {
          roomId: room.id,
          amenityId: item,
        },
      })
    );

    const imagePromises = imageList.map((item) =>
      prisma.roomImage.create({
        data: {
          image: item,
          roomId: room.id,
        },
      })
    );

    await Promise.all([...amenityPromises, ...imagePromises]);

    return room;
  });
};

export const getRoomDetailById = async (id: number) => {
  const result = await prisma.room.findFirst({
    where: {
      id,
    },
    include: {
      RoomImage: true,
      roomType: true,
      user: {
        include: {
          profile: true,
          Partner: true,
        },
      },
      RoomAmenity: true,
    },
  });
  return result;
};

export const updateRoom = async (id: number, data: Room) => {
  const room = await prisma.room.update({
    data,
    where: {
      id,
    },
  });
  return room;
};
export const getRoomByPartnerId = async (userId: string | undefined) => {
  const rooms = await prisma.room.findMany({
    where: {
      partnerId: userId,
      isApproved: true,
      isDelete: false,
    },
  });
  return rooms;
};
export const updateRoomImage = async (id: number, image: string) => {
  const roomImage = await prisma.roomImage.update({
    data: {
      image,
    },
    where: { id },
  });
  return roomImage;
};
export const getFavoriteById = async (roomId: number) => {
  const favoriteList = await prisma.favorite.findMany({
    where: {
      roomId,
    },
  });
  return favoriteList;
};
export const updateFavorite = async (userId: string, roomId: number) => {
  const result = await prisma.favorite.findFirst({
    where: {
      roomId,
      userId,
    },
  });
  if (result?.id) {
    await prisma.favorite.delete({
      where: {
        id: result.id,
      },
    });
  } else {
    await prisma.favorite.create({
      data: {
        userId,
        roomId,
      },
    });
  }
};
export const createRoomType = async (typeName: string, description: string, imageUrl: string) => {
  const result = await prisma.roomType.create({
    data: {
      typeName,
      description,
      imageUrl,
    },
  });
  return result;
};
export const getAmenityDetail = async (id: number) => {
  const result = await prisma.amenity.findFirst({ where: { id } });
  return result;
};
export const updateAmenity = async (id: number, amenityName: string, description: string) => {
  const result = await prisma.amenity.update({
    data: {
      description,
      amenityName,
    },
    where: {
      id,
    },
  });
  return result;
};
export const createAmenity = async (amenityName: string, description: string) => {
  const result = await prisma.amenity.create({
    data: {
      amenityName,
      description,
      imageUrl: "",
    },
  });
  return result;
};
