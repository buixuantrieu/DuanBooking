/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table, Tabs } from "antd";
import * as S from "./style";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { useEffect, useMemo } from "react";
import { getRoomRequest } from "@slices/room.slice";
import { RoomType } from "types/types";

function PostManager() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomRequest({}));
  }, []);

  const { roomList } = useSelector((state: RootState) => state.room);

  const roomListUnActive = useMemo(() => {
    return roomList.data.filter((item) => !item.isApprove);
  }, [roomList.data]);
  const roomListActive = useMemo(() => {
    return roomList.data.filter((item) => item.isApprove);
  }, [roomList.data]);

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
    },
    {
      title: "Thao tác",
      dataIndex: "control",
      key: "control",
      render: () => (
        <div style={{ display: "flex", gap: 4 }}>
          <Button type="primary">Phê duyệt</Button>
          <Button danger>Từ chối</Button>
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
      children: <Table dataSource={roomListActive} columns={columnOne} rowKey="id" />,
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
