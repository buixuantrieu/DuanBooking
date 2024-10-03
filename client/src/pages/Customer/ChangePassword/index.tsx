/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Row, Col, Form, Input, Button } from "antd";
import * as S from "./style";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordRequest } from "@slices/user.slice";
import { RootState } from "store";
import { useEffect } from "react";

function ChangePassword() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (userInfo.error !== null) {
      form.setFields([
        {
          name: "oldPassword",
          errors: ["Sai mật khẩu"],
        },
      ]);
    }
  }, [userInfo.error]);
  const handleChangePassword = (value: any) => {
    dispatch(
      changePasswordRequest({
        data: {
          oldPassword: value.oldPassword,
          newPassword: value.newPassword,
        },
        callback: () => form.resetFields(),
      })
    );
  };
  return (
    <S.ChangePasswordWrapper>
      <S.ChangePasswordTitle>Thay đổi mật khẩu</S.ChangePasswordTitle>
      <Form form={form} onFinish={handleChangePassword} layout="vertical">
        <Row>
          <Col span={24}>
            <Form.Item
              name="oldPassword"
              label="Mật khẩu cũ:"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="confirmPassword"
              label="Nhập lại mật khẩu cũ:"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lại mật khẩu!",
                },
                (params) => ({
                  validator(_, value) {
                    if (!value || params.getFieldValue("oldPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không trùng nhau!"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="newPassword"
              label="Nhập mật khẩu mới:"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
                {
                  pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/g,
                  message: "Mật khẩu yếu",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Button htmlType="submit" type="primary" style={{ width: "100%", marginTop: 16 }}>
          Thay đổi mật khẩu
        </Button>
      </Form>
    </S.ChangePasswordWrapper>
  );
}
export default ChangePassword;
