import styled, { css } from "styled-components";

interface Active {
  $active: boolean;
}

export const RoomImageMain = styled.img`
  width: 100%;
  aspect-ratio: 3/2;
`;

export const TitleRoomType = styled.div`
  color: gray;
  font-weight: bold;
`;
export const TitleRoom = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 12px 0;
`;
export const RoomDescription = styled.div<Active>`
  text-align: justify;
  height: 500px;
  overflow: hidden;
  position: relative;
  padding-bottom: 40px;
  ${(prop) =>
    prop.$active &&
    css`
      height: max-content;
      &::after {
        background: transparent !important;
      }
    `}
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent, white);
  }
`;
export const ContentWrapper = styled.div`
  position: relative;
`;
export const ButtonShowMore = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;
export const TitlePost = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 16px 0;
`;
export const FormCommentWrapper = styled.div`
  padding-bottom: 30px;
  border-bottom: 1px solid #d9d9d9;
  margin-bottom: 32px;
`;
export const BoxComment = styled.div`
  padding: 12px;
  border-bottom: 1px solid #d9d9d9;
`;
export const InfoCommentContainer = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  align-items: center;
`;
export const AvatarComment = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 0 1px black;
  object-fit: cover;
`;
export const InfoComment = styled.div`
  line-height: 1.2;
`;
export const UserName = styled.div`
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  & span {
    font-size: 10px;
    color: #722ed1;
    display: flex;
    gap: 4px;
    align-items: c;
  }
`;
export const DateComment = styled.div`
  color: gray;
  font-size: 10px;
`;
export const ContentComment = styled.div`
  margin-top: 16px;
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
export const PriceContainer = styled.div`
  display: flex;
  gap: 6px;
  margin: 20px 0;
  margin-top: 56px;
`;

export const LabelPrice = styled.div`
  font-size: 16px;
  font-weight: 500;
`;
export const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #a8071a;
  display: flex;
  gap: 4px;
`;

export const TotalPrice = styled.div`
  display: flex;
  gap: 8px;
  align-items: end;
  margin-bottom: 20px;
  margin-top: 40px;
  font-size: 16px;
`;
export const LabelTotal = styled.div`
  font-weight: 500;
`;
export const PriceTotal = styled.div`
  display: flex;
  gap: 4px;
  font-weight: 400;
`;
