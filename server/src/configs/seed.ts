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
        {
          id: 1,
          typeName: "Khung cảnh tuyệt vời",
          description: "View khung cảnh tuyệt vời",
          imageUrl: "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
        },
        {
          id: 2,
          typeName: "Hướng biển",
          description: "View hướng biển",
          imageUrl: "https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg",
        },
        {
          id: 3,
          typeName: "Nhà trên cây",
          description: "Nhà trên cây",
          imageUrl: "https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg",
        },
        {
          id: 4,
          typeName: "Nhà khung chữ A",
          description: "Nhà khung chữ A",
          imageUrl: "https://a0.muscache.com/pictures/1d477273-96d6-4819-9bda-9085f809dad3.jpg",
        },
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
