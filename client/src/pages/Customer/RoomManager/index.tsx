/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Table } from "antd";
import { FaRegEdit } from "react-icons/fa";
import * as S from "./style";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomByPartnerIdRequest } from "@slices/room.slice";
import { RootState } from "store";
import { Link, generatePath } from "react-router-dom";
import { ROUTES } from "@constants/routes";

function RoomManager() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRoomByPartnerIdRequest());
  }, []);

  const { roomList } = useSelector((state: RootState) => state.room);

  const columns = [
    {
      title: "Tên phòng",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "Giá",
      dataIndex: "pricePerNight",
      key: "pricePerNight",
      render: (item: number) => `${item}.$`,
    },
    {
      title: "Bài viết",
      dataIndex: "id",
      key: "id",
      render: (id: number) => (
        <Link to={generatePath(ROUTES.USER.EDIT_POST, { id })} style={{ cursor: "pointer" }}>
          <FaRegEdit />
        </Link>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "id",
      key: "ok",
      render: (id: number) => (
        <span style={{ display: "flex", gap: 6 }}>
          <Button danger ghost>
            Bảo trì {id}
          </Button>
          <Button type="primary" danger>
            Xóa
          </Button>
        </span>
      ),
    },
  ];
  return (
    <S.RoomWrapper>
      <S.RoomTitle>Quản lí phòng</S.RoomTitle>
      <Table dataSource={roomList.data} rowKey="id" columns={columns} />
    </S.RoomWrapper>
  );
}
export default RoomManager;
