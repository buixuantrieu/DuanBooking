import styled from "styled-components";
import { media } from "@constants/media";

export const CustomerWrapper = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
  overflow: hidden;
  background-color: #fafafa;

  @media ${media.mobile} {
    padding: 0 4px;
  }
  @media ${media.tablet} {
    padding: 0 8px;
  }
  @media ${media.desktop} {
    padding: 0 12px;
  }
`;
export const CustomerContainer = styled.div`
  flex: 1;
  padding: 0 30px;
`;
