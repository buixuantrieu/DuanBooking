import styled from "styled-components";
import { Link } from "react-router-dom";
export const FooterContainer = styled.footer`
  margin-top: 40px;
  padding: 50px 0;
  text-align: center;
  border-top: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export const FooterSection = styled.div`
  margin: 10px 0;
  color: #555;
`;

export const FooterLink = styled(Link)`
  margin: 0 10px;
  color: #50547f;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`;
