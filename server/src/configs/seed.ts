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

const addType = async () => {
  try {
    await prisma.roomType.createMany({
      data: [
        { id: 1, typeName: "Khung cảnh tuyệt vời", description: "View khung cảnh tuyệt vời", imageUrl: "" },
        { id: 2, typeName: "Hướng biển", description: "View hướng biển", imageUrl: "" },
      ],
      skipDuplicates: true,
    });
    console.log("Đã thêm home type thành công.");
  } catch (error) {
    console.error("Lỗi khi thêm home type:", error);
  }
};
const addAmenity = async () => {
  try {
    await prisma.amenity.createMany({
      data: [
        { id: 1, amenityName: "Nóng lạnh", description: "Thiết bị thay đổi nhiệt độ nước phòng tắm", imageUrl: "" },
        { id: 2, amenityName: "Điều hòa", description: "Thiết bị điều hòa lọc không khí", imageUrl: "" },
      ],
      skipDuplicates: true,
    });
    console.log("Đã thêm home amenity thành công.");
  } catch (error) {
    console.error("Lỗi khi thêm amenity:", error);
  }
};

addRole();
addType();
addAmenity();
