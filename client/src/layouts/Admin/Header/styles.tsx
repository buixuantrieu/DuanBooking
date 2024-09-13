import styled from "styled-components";
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 40px;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
`;
export const HeaderSearchContainer = styled.div``;
export const HeaderRight = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 8px;
`;
export const IconHeader = styled.span``;
export const AvatarHeader = styled.img`
  box-shadow: 0 0 1px black;
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
export const UserName = styled.span`
  font-size: 13px;
`;
export const Role = styled.span`
  font-weight: bold;
  font-size: 13px;
`;
