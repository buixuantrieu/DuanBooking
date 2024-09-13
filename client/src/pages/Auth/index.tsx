/* eslint-disable react-hooks/exhaustive-deps */

import { Row, Col, Form, Input, Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FaGooglePlusG } from "react-icons/fa";

import { ROUTES } from "@constants/routes";
import * as S from "./styles";
import { registerUserRequest, loginUserRequest, loginWithGoogle } from "@slices/user.slice";
import { RootState } from "store";
import qs from "qs";

function Register() {
  const { search } = useLocation();
  const [formLogin] = Form.useForm();
  const [formRegister] = Form.useForm();
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userRegister, userLogin } = useSelector((state: RootState) => state.user);
  const params = qs.parse(search as string, { ignoreQueryPrefix: true });

  interface RegisterFormValues {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  interface LoginFormValue {
    userName: string;
    password: string;
  }
  useEffect(() => {
    if (userRegister.error) {
      if (userRegister.error === "Tài khoản đã tồn tại!") {
        formRegister.setFields([
          {
            name: "userName",
            errors: [userRegister.error],
          },
        ]);
      } else {
        formRegister.setFields([
          {
            name: "email",
            errors: [userRegister.error],
          },
        ]);
      }
    }
  }, [userRegister.error]);
  useEffect(() => {
    if (userLogin.error) {
      formLogin.setFields([
        {
          name: "userNameLogin",
          errors: [""],
        },
        {
          name: "passwordLogin",
          errors: [userLogin.error],
        },
      ]);
    }
  }, [userLogin.error]);
  useEffect(() => {
    if (params.code) {
      dispatch(
        loginWithGoogle({
          code: params.code as string,
          callback: (roleId: number) => {
            navigate(roleId === 1 ? ROUTES.ADMIN.DASHBOARD : ROUTES.USER.HOME);
          },
        })
      );
    }
  }, []);
  const handleRegister = (values: RegisterFormValues) => {
    dispatch(registerUserRequest({ data: values, callback: () => navigate(ROUTES.ACCOUNT_VERIFICATION) }));
  };
  const handleLogin = (values: LoginFormValue) => {
    dispatch(
      loginUserRequest({
        data: values,
        callback: (roleId: number) => (roleId === 1 ? navigate(ROUTES.ADMIN.DASHBOARD) : navigate(ROUTES.USER.HOME)),
      })
    );
  };
  return (
    <Row>
      <S.AuthWrapper>
        <Col xs={22} lg={20} span={18}>
          <S.AuthContainer>
            <Row>
              <Col xs={0} sm={8} md={11} span={12}>
                <S.AuthPicture>
                  <img src="src/assets/image/PictureLogin.jpg" alt="" />
                </S.AuthPicture>
              </Col>
              <Col xs={24} sm={16} md={13} span={12}>
                <S.AuthFormContainer>
                  <Link to={ROUTES.USER.HOME}>
                    <S.AuthLogo src="src/assets/image/Logo.png" />
                  </Link>
                  <S.ButtonContainer>
                    <S.ButtonLogin
                      $isActive={active}
                      onClick={() => {
                        setActive(false);
                        formRegister.resetFields();
                      }}
                    >
                      Login
                    </S.ButtonLogin>
                    <S.ButtonRegister
                      $isActive={active}
                      onClick={() => {
                        setActive(true);
                        formLogin.resetFields();
                      }}
                    >
                      Register
                    </S.ButtonRegister>
                  </S.ButtonContainer>
                  <S.FormLogin $isActive={active}>
                    <Form layout="vertical" form={formLogin} onFinish={handleLogin}>
                      <Form.Item
                        label="User Name:"
                        name="userNameLogin"
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please enter your user name!",
                          },
                          {
                            pattern: /^[a-zA-Z0-9]+$/,
                            message: "Only letters and numbers are allowed!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Password:"
                        name="passwordLogin"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your password!",
                          },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                      <Button htmlType="submit" style={{ width: "100%" }} type="primary">
                        Login
                      </Button>
                    </Form>
                    <S.Des>or</S.Des>
                    <a href="http://localhost:3000/login/google">
                      <S.ButtonGoogle>
                        <Button>
                          Login with <FaGooglePlusG />
                        </Button>
                      </S.ButtonGoogle>
                    </a>
                  </S.FormLogin>
                  <S.FormRegister $isActive={active}>
                    <Form layout="vertical" form={formRegister} onFinish={handleRegister}>
                      <Form.Item
                        label="User Name:"
                        name="userName"
                        rules={[
                          {
                            required: true,
                            message: "Please enter a user name!",
                          },
                          {
                            pattern: /^[a-zA-Z0-9]+$/,
                            message: "Only letters and numbers are allowed!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Password:"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Please enter a password!",
                          },
                          {
                            pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/g,
                            message: "Mật khẩu yếu",
                          },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                      <Form.Item
                        label="Confirm Password:"
                        name="confirmPassword"
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your password!",
                          },
                          (params) => ({
                            validator(_, value) {
                              if (!value || params.getFieldValue("password") === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error("Passwords do not match!"));
                            },
                          }),
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please enter your email!",
                          },
                          {
                            type: "email",
                            message: "Invalid email format!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Button htmlType="submit" style={{ width: "100%" }} type="primary">
                        Register
                      </Button>
                    </Form>
                  </S.FormRegister>
                </S.AuthFormContainer>
              </Col>
            </Row>
          </S.AuthContainer>
        </Col>
      </S.AuthWrapper>
    </Row>
  );
}
export default Register;
