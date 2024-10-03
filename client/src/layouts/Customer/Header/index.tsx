/* eslint-disable react-hooks/exhaustive-deps */
import { ROUTES } from "@constants/routes";
import * as S from "./styles";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { GiHomeGarage } from "react-icons/gi";
import { FaForumbee } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { useEffect, useMemo, useState } from "react";
import { Avatar, Badge, Dropdown, Empty } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { getNotificationByUserIdRequest, logoutRequest, updateNotificationByUserIdRequest } from "@slices/user.slice";
function Header() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const { userInfo, notification } = useSelector((state: RootState) => state.user);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getNotificationByUserIdRequest());
    setShowNotification(false);
  }, [pathname, userInfo.data]);

  const renderNotification = useMemo(
    () =>
      notification.data.map((item, index) => {
        return (
          <S.NotificationElement key={index} $isWatched={item.isWatched}>
            {item.message}
            <S.TimeNotification>3 phút trước</S.TimeNotification>
          </S.NotificationElement>
        );
      }),
    [notification.data]
  );

  const items = [
    {
      key: "0",
      label: userInfo.data.Partner?.isApproved && <Link to={ROUTES.USER.CREATE_POST}>Tạo bài đăng</Link>,
    },
    {
      key: "1",
      label: <Link to={ROUTES.USER.PROFILE}>Thông tin cá nhân</Link>,
    },
    {
      key: "2",
      label: <Link to={ROUTES.USER.CHANGE_PASSWORD}>Thay đổi mật khẩu</Link>,
    },
    {
      key: "3",
      label: <Link to={ROUTES.USER.BOOKING_HISTORY}>Lịch sử đặt phòng</Link>,
    },

    {
      key: "4",
      label: <Link to={ROUTES.USER.FAVORITE_HOMES}>Danh sách phòng yêu thích</Link>,
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
  ];

  const toggleShowNotification = () => {
    if (showNotification) {
      dispatch(updateNotificationByUserIdRequest());
    }
    setShowNotification(!showNotification);
  };
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
          <S.NavMobileElement to={ROUTES.USER.PROFILE}>
            <MdOutlineConnectWithoutContact /> Đăng kí đối tác
          </S.NavMobileElement>
          <S.NavMobileElement to={ROUTES.USER.ABOUT}>
            <BsQuestionCircle /> Giới thiệu
          </S.NavMobileElement>
          <S.NavMobileElement to={ROUTES.USER.PROFILE}>
            <MdOutlineConnectWithoutContact /> Liên hệ
          </S.NavMobileElement>
        </S.MenuNavMobile>
      </S.MenuContainer>
      <S.LogoHeader src="https://firebasestorage.googleapis.com/v0/b/sdsd-f6fec.appspot.com/o/images%2FLogo.png?alt=media&token=085a122d-7460-4e37-800c-68cf30ee9a08" />
      <S.NavContainer>
        <S.NavElement to={ROUTES.USER.HOME}>Trang chủ</S.NavElement>
        <S.NavElement to={ROUTES.USER.ROOM_LIST}>Danh sách phòng</S.NavElement>
        <S.NavElement to={ROUTES.USER.HOME}>Diễn đàn</S.NavElement>
        {!userInfo.data.Partner?.id && (
          <S.NavElement to={ROUTES.USER.PARTNER_REGISTRATION}>Đăng kí đối tác</S.NavElement>
        )}
        <S.NavElement to={ROUTES.USER.ABOUT}>Giới thiệu</S.NavElement>
        <S.NavElement to={ROUTES.USER.PROFILE}>Liên hệ</S.NavElement>
      </S.NavContainer>
      <S.HeaderControl>
        {userInfo.data?.id ? (
          <>
            <S.Icon style={{ marginRight: 12, position: "relative" }}>
              <Badge
                size="small"
                count={notification.data.filter((item) => item.isWatched === false).length}
                overflowCount={9}
              >
                <IoMdNotificationsOutline style={{ fontSize: 24 }} onClick={() => toggleShowNotification()} />
              </Badge>
              <S.NotificationContainer $isShowNotification={showNotification}>
                <S.TitleNotification>Thông báo</S.TitleNotification>
                {notification.data.length === 0 ? (
                  <Empty style={{ marginTop: 32, paddingBottom: 24 }} description="Không có thông báo" />
                ) : (
                  renderNotification
                )}
              </S.NotificationContainer>
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
            <span style={{ cursor: "pointer", fontSize: 14 }}>Đăng nhập</span>
          </Link>
        )}
      </S.HeaderControl>
    </S.HeaderWrapper>
  );
}
export default Header;
