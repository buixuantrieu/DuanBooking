import prisma from "@prismaClient";

const addRole = async () => {
  try {
    await prisma.role.createMany({
      data: [
        { roleName: "admin", description: "quyền admin" },
        { roleName: "user", description: "quyền người dùng" },
        { roleName: "moderator", description: "quyền điều hành" },
      ],
      skipDuplicates: true,
    });
    console.log("Đã thêm roles thành công.");
  } catch (error) {
    console.error("Lỗi khi thêm roles:", error);
  }
};

const addStatusUser = async () => {
  try {
    await prisma.statusUser.createMany({
      data: [
        {
          statusName: "unActive",
          description: "không hoạt động",
        },
        {
          statusName: "active",
          description: "người dùng hoạt động",
        },
      ],
      skipDuplicates: true,
    });
    console.log("Đã thêm status users thành công.");
  } catch (error) {
    console.error("Lỗi khi thêm status users:", error);
  }
};

addRole();
addStatusUser();
