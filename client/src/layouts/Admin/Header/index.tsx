import { Input } from "antd";
import * as S from "./styles";
import { IoNotificationsOutline } from "react-icons/io5";
function Header() {
  return (
    <S.HeaderContainer>
      <S.HeaderSearchContainer>
        <Input type="search" style={{ width: 300 }} />
      </S.HeaderSearchContainer>
      <S.HeaderRight>
        <S.IconHeader>
          <IoNotificationsOutline />
        </S.IconHeader>
        <S.AvatarHeader />
        <S.UserName>Xuân Triều</S.UserName>-<S.Role>Admin</S.Role>
      </S.HeaderRight>
    </S.HeaderContainer>
  );
}
export default Header;
