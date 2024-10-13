import styled, { css } from "styled-components";
import { media } from "@constants/media";

interface isActive {
  $isActive: boolean;
}

export const AuthWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const AuthContainer = styled.div`
  padding: 40px;
  @media ${media.mobile} {
    padding: 32px 0;
  }
  @media ${media.tablet} {
    padding: 32px 12px;
  }
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 4px;
`;
export const AuthPicture = styled.div`
  height: 100%;
  
  display: flex;
  align-items: center;
`;
export const AuthFormContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 0 80px;
  @media ${media.desktop} {
    padding: 0 40px;
  }
`;
export const AuthLogo = styled.img`
  width: 100px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  font-weight: 500;
  font-size: 18px;
  color: #8b90c6;
  padding: 5px;
  font-size: 15px;
  position: relative;
  align-items: center;
`;
export const ButtonLogin = styled.span<isActive>`
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  ${(prop) =>
    !prop.$isActive &&
    css`
      color: #525789;
      font-size: 16px;
      &::after {
        content: "";
        position: absolute;
        bottom: -8px;
        left: 0;
        height: 3px;
        width: 100%;
        background-color: #6f76b8;
      }
    `}
`;
export const ButtonRegister = styled.span<isActive>`
  cursor: pointer;

  position: relative;
  transition: all 0.3s;
  ${(prop) =>
    prop.$isActive &&
    css`
      color: #525789;
      font-size: 16px;
      &::after {
        content: "";
        position: absolute;
        bottom: -8px;
        left: 0;
        height: 3px;
        width: 100%;
        background-color: #6f76b8;
      }
    `}
`;
export const FormLogin = styled.div<isActive>`
  width: 100%;
  margin-top: 32px;

  ${(prop) =>
    prop.$isActive &&
    css`
      display: none;
    `}
`;
export const Des = styled.div`
  text-align: center;
  margin: 12px 0;
`;
export const ButtonGoogle = styled.div`
  display: flex;
  justify-content: center;
`;
export const FormRegister = styled.div<isActive>`
  width: 100%;
  margin-top: 32px;
  display: none;
  ${(prop) =>
    prop.$isActive &&
    css`
      display: block;
    `}
`;
