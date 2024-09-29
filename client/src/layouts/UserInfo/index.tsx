import { Card, Col, Row } from "antd";
import { Outlet } from "react-router-dom";

function UserInfoLayout() {
  return (
    <Row gutter={[24, 24]}>
      <Col span={8}>
        <Card></Card>
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
