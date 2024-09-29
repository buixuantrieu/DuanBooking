/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@constants/routes";
import { Row, Col, Card, Form, Input, Button, notification } from "antd";
import * as S from "./style";
import dayjs from "dayjs";
import { createBookingRequest, updateCreateBookingRequest } from "@slices/booking.slice";
import Paypal from "../../../Paypal";

function Booking() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isValidate, setIsValidate] = useState(true);

  const { infoBookingTemporary } = useSelector((state: RootState) => state.booking);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!infoBookingTemporary.data.roomId) {
      navigate(ROUTES.USER.ROOM_LIST);
    }
  }, []);

  useEffect(() => {
    form
      .validateFields()
      .then(() => setIsValidate(false))
      .catch(() => setIsValidate(true));
  }, []);

  const handleChangeForm = () => {
    form
      .validateFields()
      .then(() => setIsValidate(false))
      .catch(() => setIsValidate(true));
  };

  const handleBooking = () => {
    const values = form.getFieldsValue();
    dispatch(
      createBookingRequest({
        data: {
          customerName: values.fullName,
          phone: values.phone,
          email: values.email,
          checkIn: infoBookingTemporary.data.checkIn,
          checkOut: infoBookingTemporary.data.checkOut,
          amount: infoBookingTemporary.data.total,
          customerId: userInfo.data.id,
          roomId: infoBookingTemporary.data.roomId,
          paymentMethod: "paypal",
        },
        callback: () => null,
      })
    );
  };

  const handleUpdateBooking = () => {
    dispatch(
      updateCreateBookingRequest({
        data: {
          checkIn: infoBookingTemporary.data.checkIn,
          checkOut: infoBookingTemporary.data.checkOut,
          customerId: userInfo.data.id,
          roomId: infoBookingTemporary.data.roomId,
        },
        callback: () => {
          navigate(ROUTES.USER.ROOM_LIST);
          notification.success({ message: "Chúc mừng bạn đã đặt phònh thành công!" });
        },
      })
    );
  };

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
            <Form form={form} onFinish={handleBooking} layout="vertical">
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
                    <Input onChange={() => handleChangeForm()} />
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
                    <Input onChange={() => handleChangeForm()} />
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
                    <Input onChange={() => handleChangeForm()} />
                  </Form.Item>
                </Col>
                <Button
                  disabled={isValidate}
                  style={{ height: "max-content", width: "100%", border: "none", background: "transparent" }}
                >
                  <Paypal callback={handleUpdateBooking} createBooking={handleBooking} amount={Number(10)} />
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
