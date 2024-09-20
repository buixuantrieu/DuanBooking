import prisma from "@prismaClient";

const addRole = async () => {
  try {
    await prisma.role.createMany({
      data: [
        { id: 1, roleName: "admin", description: "quyền admin" },
        { id: 2, roleName: "user", description: "quyền người dùng" },
      ],
      skipDuplicates: true,
    });
    console.log("Đã thêm roles thành công.");
  } catch (error) {
    console.error("Lỗi khi thêm roles:", error);
  }
};

addRole();
