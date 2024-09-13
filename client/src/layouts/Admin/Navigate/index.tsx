import React, { useState } from "react";
import * as S from "./styles";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";
import { VscDashboard } from "react-icons/vsc";
import { MdManageAccounts } from "react-icons/md";
import { ROUTES } from "@constants/routes";
import { Link } from "react-router-dom";
import { PiArticleNyTimesFill } from "react-icons/pi";
import { MdOutlineForum } from "react-icons/md";
import { HiMiniHomeModern } from "react-icons/hi2";
import { TbBrandBooking } from "react-icons/tb";
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  { key: "1", icon: <VscDashboard />, label: <Link to={ROUTES.ADMIN.DASHBOARD}>Dashboard</Link> },
  {
    key: "2",
    icon: <MdManageAccounts />,
    label: "Account",
    children: [
      {
        key: "A1",
        label: <Link to={ROUTES.ADMIN.ACCOUNT_MANAGEMENT}>Account Management</Link>,
      },
      {
        key: "A2",
        label: <Link to={ROUTES.ADMIN.ACCESS_CONTROL}>Access control</Link>,
      },
    ],
  },
  {
    key: "3",
    icon: <PiArticleNyTimesFill />,
    label: "Post",
    children: [
      {
        key: "P1",
        label: "HomeStay posts",
      },
      {
        key: "P2",
        label: "Forum posts",
      },
      {
        key: "P3",
        label: "Approve posts",
      },
    ],
  },
  {
    key: "4",
    icon: <HiMiniHomeModern />,
    label: "HomeStay",
    children: [
      {
        key: "H1",
        label: "HomeStay list",
      },
    ],
  },
  {
    key: "5",
    icon: <MdOutlineForum />,
    label: "Comment",
    children: [
      {
        key: "C1",
        label: "Comment list",
      },
      {
        key: "C2",
        label: "Comment report",
      },
    ],
  },
  { key: "6", icon: <TbBrandBooking />, label: "Booking" },
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <S.NavigateWrapper>
      <S.Logo $collapsed={collapsed}>
        <img src="src/assets/image/Logo.png" alt="" />
      </S.Logo>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16, marginLeft: 14 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        inlineCollapsed={collapsed}
        items={items}
        style={{ padding: 10, border: "none" }}
      />
    </S.NavigateWrapper>
  );
};

export default App;
