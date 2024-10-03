import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

interface Active {
  $active: boolean;
}
export const BoxAvatarContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const Avatar = styled.div`
  width: 40%;
  position: relative;

  & img {
    border-radius: 50%;
    border: 3px solid #f5f5f5;
    box-shadow: 0 0 3px #f5f5f5;
    aspect-ratio: 1/1;
  }
`;
export const NavigateContainer = styled.div`
  margin-top: 40px;
`;
export const NavigateElement = styled(Link)<Active>`
  padding: 12px 12px;
  border-bottom: 1px solid #f0f0f0;
  color: #391085;
  cursor: pointer;
  display: block;
  ${(prop) =>
    prop.$active &&
    css`
      background: linear-gradient(to right, #6f76b5, #6f76b55b);
      color: white;
    `}
  &:hover {
    background: linear-gradient(to right, #6f76b5, #6f76b55b);
    color: white;
  }
`;
export const CameraUpload = styled.label`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 24px;
`;
