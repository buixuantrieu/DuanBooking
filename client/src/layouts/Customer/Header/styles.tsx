import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { media } from "@constants/media";

interface ShowMenu {
  $showMenu: boolean;
}

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  align-items: center;
  border-bottom: 1px solid rgba(5, 5, 5, 0.12);
  margin-bottom: 30px;
  position: relative;
  background-color: white;
  @media ${media.mobile} {
    padding: 8px 0;
  }
`;
export const LogoHeader = styled.img`
  width: 100px;
  aspect-ratio: 3/2;
  object-fit: cover;
  @media ${media.mobile} {
    width: 70px;
  }
  @media ${media.tablet} {
    width: 75px;
  }
  @media ${media.desktop} {
    width: 80px;
  }
`;
export const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;

  @media ${media.desktop} {
    gap: 10px;
  }
  @media ${media.tablet} {
    display: none;
  }
  @media ${media.mobile} {
    display: none;
  }
`;
export const NavElement = styled(Link)`
  color: black;
  &:hover {
    color: #6f76b8;
  }
  @media ${media.desktop} {
    font-size: 14px;
    font-weight: 500;
  }
`;
export const HeaderControl = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 20px;
`;
export const Avatar = styled.img`
  width: 25px;
  height: 25px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 0 2px #6f76b8;
`;
export const Icon = styled.span`
  cursor: pointer;
  &:hover {
    color: #6f76b8;
  }
`;
export const Role = styled.span`
  font-size: 12px;
  color: #50547f;
  font-weight: 500;
`;
export const IconMenu = styled.span`
  display: none;
  font-size: 24px;
  cursor: pointer;

  @media ${media.tablet} {
    display: block;
  }
  @media ${media.mobile} {
    display: block;
  }
`;
export const MenuContainer = styled.div<ShowMenu>`
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  min-height: calc(100vh - 100%);
  background-color: #ffffffda;
  z-index: 10;
  backdrop-filter: blur(4px);
  transform: translateX(100%);
  transition: all 0.4s;
  @media ${media.desktop} {
    display: none;
  }
  @media ${media.tablet} {
    display: block;
  }
  ${(prop) =>
    prop.$showMenu &&
    css`
      transform: translateX(0);
    `}
`;
export const MenuNavMobile = styled.div`
  padding: 30px;
  display: flex;
  flex-flow: column;
  gap: 16px;
`;
export const NavMobileElement = styled(Link)`
  color: black;
  padding: 4px;
  display: flex;
  gap: 12px;
  align-items: center;
  &:hover {
    color: #6f76b8;
    transform: translate(6px, -2px);
  }
  transition: all 0.4s;
`;
