import * as S from "./styles";
import Navigate from "./Navigate";
import Header from "./Header";

import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <S.AdminLayoutWrapper>
      <Navigate />
      <S.AdminLayoutContainer>
        <Header />
        <S.AdminContent>
          <Outlet />
        </S.AdminContent>
      </S.AdminLayoutContainer>
    </S.AdminLayoutWrapper>
  );
}
export default AdminLayout;
