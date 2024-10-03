/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { getPartnerAllRequest, updatePartnerRequest } from "@slices/user.slice";
import * as S from "./style";
import { Button, Table, Tabs } from "antd";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { PartnerType } from "types/types";

function PartnerManager() {
  const dispatch = useDispatch();
  const { partner } = useSelector((state: RootState) => state.user);
  const notApproved = useMemo(
    () => partner.data.filter((item) => item.isApproved === false && item.isActive),
    [partner.data]
  );
  const isApproved = useMemo(
    () => partner.data.filter((item) => item.isApproved === true && item.isActive),
    [partner.data]
  );
  const notActive = useMemo(() => partner.data.filter((item) => item.isActive === false), [partner.data]);

  useEffect(() => {
    dispatch(getPartnerAllRequest());
  }, []);
  const handelDeletePartner = (id: number) => {
    console.log(id);
  };
  const handleApproved = (id: number, data: { [key: string]: boolean }) => {
    dispatch(
      updatePartnerRequest({
        data,
        id,
      })
    );
  };

  const activeColumns = [
    {
      title: "Tên",
      dataIndex: "user",
      key: "user",
      render: (_: any, item: PartnerType) => `${item.user?.profile?.fullName}`,
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      render: (_: any, item: PartnerType) => `${item.user?.email}`,
    },
    {
      title: "Thao tác",
      dataIndex: "control",
      key: "control",
      render: (_: any, item: PartnerType) => {
        return (
          <div style={{ display: "flex", gap: 8 }}>
            <Button
              type="primary"
              onClick={() => handleApproved(Number(item.id), { isActive: true, isApproved: false })}
            >
              Thanh toán
            </Button>
          </div>
        );
      },
    },
  ];

  const notApprovedColumns = [
    {
      title: "Tên",
      dataIndex: "user",
      key: "user",
      render: (_: any, item: PartnerType) => `${item.user?.profile?.fullName}`,
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      render: (_: any, item: PartnerType) => `${item.user?.email}`,
    },
    {
      title: "Thao tác",
      dataIndex: "control",
      key: "control",
      render: (_: any, item: PartnerType) => {
        return (
          <div style={{ display: "flex", gap: 8 }}>
            <Button type="primary" onClick={() => handleApproved(Number(item.id), { isApproved: true })}>
              Phê duyệt
            </Button>

            <Button onClick={() => handelDeletePartner(Number(item.id))} danger>
              Từ chối
            </Button>
          </div>
        );
      },
    },
  ];
  const isApprovedColumns = [
    {
      title: "Tên",
      dataIndex: "fullName",
      render: (_: any, item: PartnerType) => `${item.user?.profile?.fullName}`,
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      render: (_: any, item: PartnerType) => `${item.user?.email}`,
    },
    {
      title: "Thao tác",
      dataIndex: "control",
      key: "control",
      render: (_: any, item: PartnerType) => {
        return (
          <div style={{ display: "flex", gap: 8 }}>
            <Button onClick={() => handleApproved(Number(item.id), { isActive: false, isApproved: false })} danger>
              Ngưng hợp tác
            </Button>
            <Button onClick={() => handelDeletePartner(Number(item.id))} type="primary" danger>
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];

  const tabItem = [
    {
      label: "Chưa phê duyệt",
      key: "1",
      children: <Table dataSource={notApproved} columns={notApprovedColumns} rowKey="id" />,
    },
    {
      label: "Đã phê duyệt",
      key: "2",
      children: <Table dataSource={isApproved} columns={isApprovedColumns} rowKey="id" />,
    },
    {
      label: "Đối tác ngưng hợp tác",
      key: "3",
      children: <Table dataSource={notActive} columns={activeColumns} rowKey="id" />,
    },
  ];
  return (
    <S.PartnerWrapper>
      <S.PartnerTitle>Quản lí đối tác</S.PartnerTitle>
      <Tabs defaultActiveKey="1" centered items={tabItem} />
    </S.PartnerWrapper>
  );
}
export default PartnerManager;
