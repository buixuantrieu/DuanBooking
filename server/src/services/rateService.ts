import prisma from "@prismaClient";
export const getCommentByRoomId = async (id: number) => {
  const result = await prisma.comment.findMany({
    where: {
      roomId: id,
    },
    include: {
      user: {
        include: {
          profile: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};
export const createComment = async (userId: string, roomId: number, content: string) => {
  const result = await prisma.comment.create({
    data: {
      userId,
      roomId,
      content,
    },
  });
};
export const createReview = async (userId: string, roomId: number, content: string, rate: number) => {
  const result = await prisma.review.create({
    data: {
      userId,
      roomId,
      content,
      rate,
    },
  });
};
export const getReviewByRoomId = async (id: number) => {
  const result = await prisma.review.findMany({
    where: {
      roomId: id,
    },
    include: {
      user: {
        include: {
          profile: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};
