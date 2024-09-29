import styled from "styled-components";
import { Link } from "react-router-dom";

export const BoxAvatarContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const Avatar = styled.img`
  border-radius: 50%;
  width: 40%;
  aspect-ratio: 1/1;
  border: 3px solid gray;
  box-shadow: 0 0 3px gray;
`;
export const NavigateContainer = styled.div`
  margin-top: 40px;
`;
export const NavigateElement = styled(Link)`
  padding: 12px 12px;
  border-bottom: 1px solid #f0f0f0;
  color: #391085;
  cursor: pointer;
  display: block;
  &:hover {
    background: linear-gradient(to right, #6f76b5, #6f76b55b);
    color: white;
  }
`;
