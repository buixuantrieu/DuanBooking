import { Card, Col, Row } from "antd";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "store";
import * as S from "./style";

function UserInfoLayout() {
  const { userInfo } = useSelector((state: RootState) => state.user);
  return (
    <Row gutter={[24, 24]}>
      <Col span={8}>
        <Card>
          <S.BoxAvatarContainer>
            <S.Avatar src={userInfo.data.profile?.avatar} />
          </S.BoxAvatarContainer>
          <S.NavigateContainer>
            <S.NavigateElement to={""}>Thông tin cá nhân</S.NavigateElement>
            <S.NavigateElement to={""}>Lịch sử đặt phòng</S.NavigateElement>
            <S.NavigateElement to={""}>Danh sách phòng ưa thích</S.NavigateElement>
            <S.NavigateElement to={""}>Thay đổi mật khẩu</S.NavigateElement>
            <S.NavigateElement to={""}>Cài đặt</S.NavigateElement>
          </S.NavigateContainer>
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
