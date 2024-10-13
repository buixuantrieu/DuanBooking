import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import { ROUTES } from "@constants/routes";
function NotFound() {
  const navigate = useNavigate();
  return (
    <S.NotFoundWrapper>
      <Button onClick={() => navigate(ROUTES.USER.HOME)} style={{ position: "fixed", top: 12, left: 12 }}>
        MingSu Booking
      </Button>
    </S.NotFoundWrapper>
  );
}
export default NotFound;
