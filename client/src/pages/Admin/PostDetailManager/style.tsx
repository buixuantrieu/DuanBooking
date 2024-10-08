import styled, { css } from "styled-components";

interface Active {
  $active: boolean;
}
export const PostDetailWrapper = styled.div`
  width: 900px;
  padding: 24px;
  margin: 0 auto;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  border-radius: 6px;
`;
export const PostName = styled.div`
  font-size: 24px;
  margin-bottom: 24px;
`;
export const RoomImageMain = styled.img`
  width: 100%;
  aspect-ratio: 3/2;
  border-radius: 4px;
`;
export const BoxImageWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  margin: 24px 0;
`;
export const BoxImageContainer = styled.div`
  display: flex;
  gap: 32px;
`;
export const BoxImage = styled.img<Active>`
  width: 200px;
  aspect-ratio: 3/2;
  object-fit: cover;
  scroll-snap-align: start;
  border-radius: 8px;
  margin: 16px 0;
  cursor: pointer;
  ${(prop) =>
    prop.$active &&
    css`
      box-shadow: rgba(196, 196, 196, 0.4) 5px 5px, rgba(196, 196, 196, 0.3) 10px 10px,
        rgba(196, 196, 196, 0.2) 15px 15px, rgba(196, 196, 196, 0.1) 20px 20px, rgba(196, 196, 196, 0.05) 25px 25px;
    `}
`;
export const RoomDescription = styled.div`
  text-align: justify;
  height: max-content;
  padding-bottom: 40px;
  & h2 {
    margin: 12px 0;
  }
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 36px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;
