/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Row, Col, Input, Select, Button } from "antd";
import * as S from "./style";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { useEffect } from "react";
import { updateProfileRequest } from "@slices/user.slice";
import dayjs from "dayjs";

function PersonalInformation() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    form.setFieldsValue({
      fullName: userInfo.data.profile?.fullName,
      email: userInfo.data.email,
      phone: userInfo.data.profile?.phone,
      dateOfBirth: dayjs(userInfo.data.profile?.dateOfBirth).format("YYYY-MM-DD") || null,
      gender: userInfo.data.profile?.gender,
      address: userInfo.data.profile?.address,
    });
  }, [userInfo.data]);
  const handleUpdateUserInfo = (value: any) => {
    const dateOfBirth = dayjs(value.dateOfBirth).add(1, "day").toISOString();
    dispatch(updateProfileRequest({ data: { ...value, dateOfBirth } }));
  };
  return (
    <S.InfoWrapper>
      <S.InfoTitle>Thông tin cá nhân</S.InfoTitle>
      <Form onFinish={handleUpdateUserInfo} form={form} layout="vertical">
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Form.Item
              name="fullName"
              label="Họ và tên:"
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
            <Form.Item name="email" label="Email">
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Số điện thoại:"
              rules={[
                {
                  required: true,
                  message: "Không được để trống!",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "Không đúng định dạng!",
                },
                {
                  min: 10,
                  max: 11,
                  message: "Từ 10 - 11 số!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="dateOfBirth"
              label="Ngày sinh:"
              rules={[
                {
                  required: true,
                  message: "Không được để trống!",
                },
              ]}
            >
              <Input type="date" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="gender"
              label="Giới tính:"
              rules={[
                {
                  required: true,
                  message: "Không được để trống!",
                },
              ]}
            >
              <Select
                options={[
                  {
                    label: "Nam",
                    value: 0,
                  },
                  {
                    label: "Nữ",
                    value: 1,
                  },
                  {
                    label: "Khác",
                    value: 2,
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item
              name="address"
              label="Địa chỉ:"
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
        </Row>
        <Button htmlType="submit" style={{ width: "100%", marginTop: 24 }} type="primary">
          Cập nhật
        </Button>
      </Form>
    </S.InfoWrapper>
  );
}
export default PersonalInformation;
