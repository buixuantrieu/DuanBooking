import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@constants/routes";
import { Row, Col, Card, Form, Input, Button } from "antd";
import * as S from "./style";
import dayjs from "dayjs";

function Booking() {
  const navigate = useNavigate();
  const { infoBookingTemporary } = useSelector((state: RootState) => state.booking);
  const { userInfo } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (!infoBookingTemporary.data.roomId) {
      navigate(ROUTES.USER.ROOM_LIST);
    }
  }, []);

  return (
    <S.BookingWrapper>
      <Row gutter={[40, 40]}>
        <Col span={9}>
          <Card title="Thông tin đặt phòng">
            <S.BookingImage src="https://firebasestorage.googleapis.com/v0/b/sdsd-f6fec.appspot.com/o/images%2F1.webp?alt=media&token=b8cd7acf-eec0-47c0-8131-d29f73329614" />
            <S.InfoContainer>
              <S.Label>Tên phòng:</S.Label>
              <S.InfoContent>{infoBookingTemporary.data.roomName}</S.InfoContent>
            </S.InfoContainer>
            <S.InfoContainer>
              <S.Label>Ngày nhận phòng:</S.Label>
              <S.InfoContent>{dayjs(infoBookingTemporary.data.checkIn).format("DD/MM/YYYY")}</S.InfoContent>
            </S.InfoContainer>
            <S.InfoContainer>
              <S.Label>Ngày trả phòng:</S.Label>
              <S.InfoContent>{dayjs(infoBookingTemporary.data.checkOut).format("DD/MM/YYYY")}</S.InfoContent>
            </S.InfoContainer>
            <S.InfoContainer>
              <S.Label>Số ngày ở:</S.Label>
              <S.InfoContent>{infoBookingTemporary.data.countDay}</S.InfoContent>
            </S.InfoContainer>
            <S.InfoContainer>
              <S.Label>Giá:</S.Label>
              <S.InfoContent>{infoBookingTemporary.data.price?.toLocaleString()} Vnd</S.InfoContent>
            </S.InfoContainer>
            <S.Line></S.Line>
            <S.InfoContainer>
              <S.Label>Tổng tiền:</S.Label>
              <S.InfoContent>{infoBookingTemporary.data.total?.toLocaleString()} Vnd</S.InfoContent>
            </S.InfoContainer>
          </Card>
        </Col>
        <Col span={15}>
          <Card title="Thông tin cá nhân">
            <Form layout="vertical">
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="fullName"
                    initialValue={userInfo.data.profile?.fullName}
                    label="Tên khách hàng:"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    initialValue={userInfo.data.profile?.phone}
                    label="Số điện thoại:"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="email"
                    initialValue={userInfo.data.email}
                    label="Email:"
                    rules={[
                      {
                        required: true,
                        message: "Không được để trống!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Button htmlType="submit" type="primary" style={{ width: "100%" }}>
                  Thanh toán Paypal
                </Button>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </S.BookingWrapper>
  );
}
export default Booking;
