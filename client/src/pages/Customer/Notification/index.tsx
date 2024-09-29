/* eslint-disable react-hooks/exhaustive-deps */
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@constants/routes";

function Notification() {
  const navigate = useNavigate();
  const showSuccess = () => {
    Swal.fire({
      title: "Chúc mừng!",
      text: "Bạn đã đặt phòng thành công!",
      icon: "success",
      confirmButtonText: "Về trang chủ",
      willClose: () => navigate(ROUTES.USER.HOME),
    });
  };
  useEffect(() => {
    showSuccess();
  }, []);
  const { width, height } = useWindowSize();
  return (
    <>
      <Confetti width={width} height={height} />
    </>
  );
}
export default Notification;
