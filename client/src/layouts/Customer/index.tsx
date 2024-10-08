import { Outlet } from "react-router-dom";
import * as S from "./styles";
import Header from "./Header";
import Footer from "./Footer";


function CustomerLayout() {
  return (
    <S.CustomerWrapper>
      <Header />
      <S.CustomerContainer>
        <Outlet />
      </S.CustomerContainer>
      <Footer />
    </S.CustomerWrapper>
  );
}
export default CustomerLayout;
