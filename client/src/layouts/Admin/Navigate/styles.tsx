import styled, { css } from "styled-components";
interface collapsed {
  $collapsed: boolean;
}

export const NavigateWrapper = styled.div`
  max-width: 256px;
  width: max-content;
  min-height: 100vh;
  border-right: 1px solid rgba(5, 5, 5, 0.06);
  transition: all 0.3s;
  /* background-color: #001628; */
`;
export const Logo = styled.div<collapsed>`
  width: 150px;
  padding: 0 10px;
  transform: translateY(-16px);
  transition: all 0.3s;
  ${(prop) =>
    prop.$collapsed &&
    css`
      width: 80px;
      transform: translateY(0);
    `}
`;
