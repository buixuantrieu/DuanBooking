/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, notification, Table, Tabs } from "antd";
import * as S from "./style";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { useEffect, useMemo } from "react";
import { getRoomRequest, updateRoomRequest } from "@slices/room.slice";
import { RoomType } from "types/types";
import { generatePath, Link } from "react-router-dom";
import { ROUTES } from "@constants/routes";

function PostManager() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomRequest({}));
  }, []);

  const { roomList } = useSelector((state: RootState) => state.room);

  const roomListUnActive = useMemo(() => {
    return roomList.data.filter((item) => !item.isApproved);
  }, [roomList.data]);
  const roomListActive = useMemo(() => {
    return roomList.data.filter((item) => item.isApproved);
  }, [roomList.data]);

  const handleApprove = (id: number) => {
    dispatch(
      updateRoomRequest({
        id,
        data: { isApproved: true },
        callback: () => {
          notification.success({ message: "Phê duyệt bài viết thành công!" });
        },
      })
    );
  };
  const handleDelete = (id: number) => {
    dispatch(
      updateRoomRequest({
        id,
        data: { isDelete: true },
        callback: () => {
          notification.success({ message: "Đã từ chối bài viết!" });
        },
      })
    );
  };

  const columnOne = [
    {
      title: "Tên phòng",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "Chủ phòng",
      dataIndex: "partner",
      key: "partner",
      render: (_: any, item: RoomType) => {
        return `${item.user?.profile?.fullName}`;
      },
    },
    {
      title: "Xem bài đăng",
      dataIndex: "view",
      key: "view",
      render: (_: any, item: RoomType) => {
        return <Link to={generatePath(ROUTES.ADMIN.POST_DETAIL, { id: item.id })}>Xem chi tiết</Link>;
      },
    },
    {
      title: "Thao tác",
      dataIndex: "control",
      key: "control",
      render: (_: any, item: RoomType) => (
        <div style={{ display: "flex", gap: 4 }}>
          <Button onClick={() => handleApprove(Number(item.id))} type="primary">
            Phê duyệt
          </Button>
          <Button onClick={() => handleDelete(Number(item.id))} danger>
            Từ chối
          </Button>
        </div>
      ),
    },
  ];

  const columnTwo = [
    {
      title: "Tên phòng",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "Chủ phòng",
      dataIndex: "partner",
      key: "partner",
      render: (_: any, item: RoomType) => {
        return `${item.user?.profile?.fullName}`;
      },
    },
    {
      title: "Xem bài đăng",
      dataIndex: "view",
      key: "view",
      render: (_: any, item: RoomType) => {
        return <Link to={generatePath(ROUTES.ADMIN.POST_DETAIL, { id: item.id })}>Xem chi tiết</Link>;
      },
    },
    {
      title: "Thao tác",
      dataIndex: "control",
      key: "control",
      render: (_: any, item: RoomType) => (
        <div style={{ display: "flex", gap: 4 }}>
          <Button onClick={() => handleDelete(Number(item.id))} danger>
            Xóa bài viết
          </Button>
        </div>
      ),
    },
  ];

  const tabItem = [
    {
      label: "Chưa phê duyệt",
      key: "1",
      children: <Table dataSource={roomListUnActive} columns={columnOne} rowKey="id" />,
    },
    {
      label: "Đã phê duyệt",
      key: "2",
      children: <Table dataSource={roomListActive} columns={columnTwo} rowKey="id" />,
    },
  ];

  return (
    <S.PostWrapper>
      <S.PostTitle>Quản lí bài đăng phòng cho thuê</S.PostTitle>
      <Tabs defaultActiveKey="1" centered items={tabItem} />
    </S.PostWrapper>
  );
}
export default PostManager;
