/* eslint-disable react-hooks/exhaustive-deps */
import Auth from "@pages/Auth";

import { ROUTES } from "@constants/routes";
import { Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";

import AdminLayout from "@layouts/Admin";
import CustomerLayout from "@layouts/Customer";
import PartnerRegistration from "@pages/Customer/PartnerRegistration";
import HomePage from "@pages/Customer/Home";
import RoomList from "@pages/Customer/RoomList";
import CreatePost from "@pages/Customer/CreatePost";
import VerifyAccount from "@pages/VerifyAccount";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserInfoRequest, logoutRequest } from "@slices/user.slice";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      dispatch(getUserInfoRequest());
    } else if (!accessToken && refreshToken) {
      dispatch(logoutRequest());
      navigate(ROUTES.AUTH);
    }
  }, [pathname]);
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeShadow: "0 0 0 1px #bec0e1",
            activeBorderColor: "none",
            hoverBorderColor: "#8b90c6",
          },
          Table: {
            headerBg: "#bec0e1",
            headerColor: "#50547f",
          },
          Collapse: {
            headerBg: "#eaebff",
            contentBg: "#f1f2ff",
            contentPadding: "16px 40px",
          },
        },
        token: {
          borderRadius: 4,
          colorBorder: "#bec0e1",
          colorPrimary: "#6f76b5",
        },
      }}
    >
      <Routes>
        <Route path={ROUTES.AUTH} element={<Auth />} />
        <Route path={ROUTES.ACCOUNT_VERIFICATION} element={<VerifyAccount />} />
        <Route element={<AdminLayout />}></Route>
        <Route element={<CustomerLayout />}>
          <Route path={ROUTES.USER.PARTNER_REGISTRATION} element={<PartnerRegistration />} />
          <Route path={ROUTES.USER.HOME} element={<HomePage />} />
          <Route path={ROUTES.USER.CREATE_POST} element={<CreatePost />} />
          <Route path={ROUTES.USER.ROOM_LIST} element={<RoomList />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
