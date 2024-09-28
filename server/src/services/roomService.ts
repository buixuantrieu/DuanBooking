import prisma from "@prismaClient";

export const getAllRoomType = async () => {
  const result = await prisma.roomType.findMany();
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
  orderBy: { [key: string]: string } | undefined
) => {
  const result = await prisma.room.findMany({
    include: {
      roomType: true,
      Favorite: true,
      Review: true,
      user: {
        include: {
          profile: true,
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
      roomTypeId: roomTypeId,
    },
    orderBy: {
      ...orderBy,
    },
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
        },
      },
    },
  });
  return result;
};
