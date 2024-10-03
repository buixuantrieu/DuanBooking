/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row } from "antd";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "store";
import * as S from "./style";
import { FaCamera } from "react-icons/fa";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "firebase";
import { useDispatch } from "react-redux";
import { updateProfileRequest } from "@slices/user.slice";
import { useLocation, useNavigate } from "react-router-dom";
import { NAVIGATE_ITEM } from "./constants";
import { useEffect, useMemo } from "react";
import { ROUTES } from "@constants/routes";

function UserInfoLayout() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (!userInfo.data.id) {
      navigate(ROUTES.USER.HOME);
    }
  }, []);
  const handleChangeAvatar = async (e: any) => {
    try {
      const file = e.target.files[0];
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const fileName = await getDownloadURL(storageRef);
      dispatch(
        updateProfileRequest({
          data: {
            avatar: fileName,
          },
        })
      );
    } catch (e) {
      console.log(e);
    }
  };
  const renderNavigation = useMemo(
    () =>
      NAVIGATE_ITEM.map((item, index) => {
        return (
          <S.NavigateElement key={index} to={item.path} $active={pathname === item.path}>
            {item.name}
          </S.NavigateElement>
        );
      }),
    [NAVIGATE_ITEM, pathname]
  );
  return (
    <Row gutter={[24, 24]}>
      <Col span={8}>
        <Card>
          <S.BoxAvatarContainer>
            <S.Avatar>
              <img src={userInfo.data.profile?.avatar} alt="" />
              <input id="upload-avatar" hidden onChange={(e) => handleChangeAvatar(e)} type="file" />
              <S.CameraUpload htmlFor="upload-avatar">
                <FaCamera />
              </S.CameraUpload>
            </S.Avatar>
          </S.BoxAvatarContainer>
          <S.NavigateContainer>{renderNavigation}</S.NavigateContainer>
        </Card>
      </Col>
      <Col span={16}>
        <Card>
          <Outlet />
        </Card>
      </Col>
    </Row>
  );
}
export default UserInfoLayout;
