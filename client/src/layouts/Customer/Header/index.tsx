import { ROUTES } from "@constants/routes";
import * as S from "./styles";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { GiHomeGarage } from "react-icons/gi";
import { FaForumbee } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { useState } from "react";
import { Avatar, Dropdown } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { logoutRequest } from "@slices/user.slice";
import { CiLogin } from "react-icons/ci";
function Header() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = [
    {
      key: "1",
      label: <Link to={ROUTES.USER.PROFILE}>Thông tin cá nhân</Link>,
    },
    {
      key: "2",
      label: <Link to={ROUTES.USER.PROFILE}>Thay đổi mật khẩu</Link>,
    },
    {
      key: "3",
      label: <Link to={ROUTES.USER.PROFILE}>Lịch sử đặt phòng</Link>,
    },

    {
      key: "4",
      label: <Link to={ROUTES.USER.PROFILE}>Danh sách phòng yêu thích</Link>,
    },
    {
      key: "5",
      label: <Link to={ROUTES.USER.PROFILE}>Cài đặt</Link>,
    },
    {
      key: "6",
      label: (
        <div
          style={{ fontWeight: 500 }}
          onClick={() => {
            navigate(ROUTES.AUTH);
            dispatch(logoutRequest());
          }}
        >
          Đăng xuất
        </div>
      ),
    },
    {
      key: "7",
      label: <Link to={ROUTES.USER.PROFILE}>Đăng nhập</Link>,
    },
  ];
  return (
    <S.HeaderWrapper>
      <S.MenuContainer $showMenu={showMenu}>
        <S.MenuNavMobile>
          <S.NavMobileElement to={ROUTES.USER.HOME}>
            <AiOutlineHome /> Trang chủ
          </S.NavMobileElement>
          <S.NavMobileElement to={ROUTES.USER.ROOM_LIST}>
            <GiHomeGarage /> Danh sách phòng
          </S.NavMobileElement>
          <S.NavMobileElement to={ROUTES.USER.HOME}>
            <FaForumbee /> Diễn đàn
          </S.NavMobileElement>
          <S.NavMobileElement to={ROUTES.USER.CONTACT}>
            <MdOutlineConnectWithoutContact /> Đăng kí đối tác
          </S.NavMobileElement>
          <S.NavMobileElement to={ROUTES.USER.ABOUT}>
            <BsQuestionCircle /> Giới thiệu
          </S.NavMobileElement>
          <S.NavMobileElement to={ROUTES.USER.CONTACT}>
            <MdOutlineConnectWithoutContact /> Liên hệ
          </S.NavMobileElement>
        </S.MenuNavMobile>
      </S.MenuContainer>
      <S.LogoHeader src="https://firebasestorage.googleapis.com/v0/b/sdsd-f6fec.appspot.com/o/images%2FLogo.png?alt=media&token=085a122d-7460-4e37-800c-68cf30ee9a08" />
      <S.NavContainer>
        <S.NavElement to={ROUTES.USER.HOME}>Trang chủ</S.NavElement>
        <S.NavElement to={ROUTES.USER.ROOM_LIST}>Danh sách phòng</S.NavElement>
        <S.NavElement to={ROUTES.USER.HOME}>Diễn đàn</S.NavElement>
        <S.NavElement to={ROUTES.USER.PARTNER_REGISTRATION}>Đăng kí đối tác</S.NavElement>
        <S.NavElement to={ROUTES.USER.ABOUT}>Giới thiệu</S.NavElement>
        <S.NavElement to={ROUTES.USER.CONTACT}>Liên hệ</S.NavElement>
      </S.NavContainer>
      <S.HeaderControl>
        {userInfo.data?.id ? (
          <>
            <S.Icon>
              <IoMdNotificationsOutline />
            </S.Icon>

            <S.Role>Khách hàng</S.Role>
            <S.Icon>
              {!showMenu && (
                <Dropdown menu={{ items }} arrow>
                  {userInfo.data.profile?.avatar ? <S.Avatar src={userInfo.data.profile?.avatar} /> : <Avatar />}
                </Dropdown>
              )}
            </S.Icon>
            <S.IconMenu onClick={() => setShowMenu(!showMenu)}>
              <AiOutlineMenuUnfold />
            </S.IconMenu>
          </>
        ) : (
          <Link to={ROUTES.AUTH}>
            <CiLogin style={{ cursor: "pointer" }} />
          </Link>
        )}
      </S.HeaderControl>
    </S.HeaderWrapper>
  );
}
export default Header;
