/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from "react";
import { BiLogoGmail } from "react-icons/bi";
import * as S from "./styles";
import { Button, Form, Input, InputRef, notification } from "antd";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@constants/routes";
import { RootState } from "store";
import { deleteUserRequest, verifyAccountRequest } from "@slices/user.slice";

function AccountVerification() {
  const [formVerification] = Form.useForm();
  const [timeLeft, setTimeLeft] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const numberTwoRef = useRef<InputRef>(null);
  const numberThreeRef = useRef<InputRef>(null);
  const numberFourRef = useRef<InputRef>(null);
  const { userRegister } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (userRegister.error) {
      formVerification.setFields([
        {
          name: "numberOne",
          errors: [" "],
          value: "",
        },
        {
          name: "numberTwo",
          errors: [" "],
          value: "",
        },
        {
          name: "numberThree",
          errors: [" "],
          value: "",
        },
        {
          name: "numberFour",
          errors: [" "],
          value: "",
        },
      ]);
      notification.warning({ message: "Mã OTP sai!" });
    }
    if (!localStorage.getItem("userId")) {
      navigate(ROUTES.AUTH);
    }
  }, [userRegister.error]);

  useEffect(() => {
    return () => {
      const idDelete = localStorage.getItem("userId");
      if (idDelete) {
        dispatch(deleteUserRequest({ id: idDelete }));
      }
    };
  }, []);

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft <= 0) {
      setIsTimerActive(false);
    }
  }, [isTimerActive, timeLeft]);

  const handleResendEmail = () => {
    console.log(timeLeft);
    if (!isTimerActive) {
      setIsTimerActive(true);
      setTimeLeft(60);
    }
  };

  const handleOnchange = (value: string, nameValue: string) => {
    const valueNumber = parseInt(value, 10);

    if (valueNumber < 0 || valueNumber > 9 || isNaN(valueNumber)) {
      formVerification.setFieldsValue({
        [nameValue]: "",
      });
    }

    if (valueNumber >= 0 && valueNumber <= 9) {
      if (nameValue === "numberOne") {
        if (numberTwoRef.current) {
          numberTwoRef.current.focus();
        }
      } else if (nameValue === "numberTwo") {
        if (numberThreeRef.current) {
          numberThreeRef.current.focus();
        }
      } else if (nameValue === "numberThree") {
        if (numberFourRef.current) {
          numberFourRef.current.focus();
        }
      }
    }
  };

  const handleVerification = (values: {
    numberOne: string;
    numberTwo: string;
    numberThree: string;
    numberFour: string;
  }) => {
    console.log(1);

    const activationCode =
      parseInt(values.numberOne + values.numberTwo + values.numberThree + values.numberFour) || undefined;
    const id = localStorage.getItem("userId") || undefined;
    dispatch(
      verifyAccountRequest({
        data: { id, activationCode },
        callback: () => navigate(ROUTES.AUTH),
      })
    );
  };

  return (
    <S.VerificationWrapper>
      <S.EmailIcon>
        <BiLogoGmail />
      </S.EmailIcon>
      <S.Title>Vui lòng kiểm tra email của bạn</S.Title>
      <S.Description>Chúng tôi đã gửi mã xác nhận tới emmail</S.Description>
      <S.Description>buixuantrieu23121998@gmail.com</S.Description>
      <Form form={formVerification} onFinish={handleVerification}>
        <S.BoxNumberContainer>
          <S.BoxNumber>
            <Form.Item
              name="numberOne"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input
                style={{ width: 40, fontSize: 24 }}
                onChange={(e) => handleOnchange(e.target.value, "numberOne")}
                maxLength={1}
              />
            </Form.Item>
          </S.BoxNumber>
          <S.BoxNumber>
            <Form.Item
              name="numberTwo"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input
                style={{ width: 40, fontSize: 24 }}
                ref={numberTwoRef}
                onChange={(e) => handleOnchange(e.target.value, "numberTwo")}
                maxLength={1}
              />
            </Form.Item>
          </S.BoxNumber>
          <S.BoxNumber>
            <Form.Item
              name="numberThree"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input
                style={{ width: 40, fontSize: 24 }}
                ref={numberThreeRef}
                onChange={(e) => handleOnchange(e.target.value, "numberThree")}
                maxLength={1}
              />
            </Form.Item>
          </S.BoxNumber>
          <S.BoxNumber>
            <Form.Item
              name="numberFour"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input
                style={{ width: 40, fontSize: 24 }}
                ref={numberFourRef}
                onChange={(e) => handleOnchange(e.target.value, "numberFour")}
                maxLength={1}
              />
            </Form.Item>
          </S.BoxNumber>
        </S.BoxNumberContainer>
        <Button htmlType="submit" type="primary" style={{ width: "100%" }}>
          Xác nhận Email
        </Button>
      </Form>
      <S.Description style={{ marginTop: 12 }}>
        Bạn không nhận được email?{" "}
        <S.ResendMail disabled={timeLeft > 0} onClick={() => handleResendEmail()}>
          Gửi lại mã OTP
        </S.ResendMail>
        <span>{isTimerActive && `${timeLeft}s`}</span>
      </S.Description>
      <S.BackToLogin onClick={() => navigate(ROUTES.AUTH)}>
        <IoMdArrowBack />
        Trở về trang đăng nhập
      </S.BackToLogin>
    </S.VerificationWrapper>
  );
}

export default AccountVerification;
