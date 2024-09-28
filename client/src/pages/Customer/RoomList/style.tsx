import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

interface Active {
  $active: boolean;
}

export const LabelFilter = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-top: 12px;
`;
export const BoxTypeRoomWrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

export const BoxTypeRoomLeft = styled.div`
  width: 10px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 30px;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
    background: linear-gradient(to right, white 10%, #ffffffec 100%);
    filter: blur(2px);
  }
`;
export const BoxTypeRoomRight = styled.div`
  width: 10px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 30px;
    height: 100%;
    top: 0;
    right: 0;
    z-index: 10;
    background: linear-gradient(to left, white 10%, #ffffffec 100%);
    filter: blur(2px);
  }
`;

export const BoxTypeRoomCenterWrapper = styled.div`
  flex: 1;
  overflow-x: auto;
  height: max-content;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  position: relative;
`;

export const BoxTypeRoomContainer = styled.div`
  width: max-content;
  display: flex;
`;
export const BoxTypeRoom = styled.div<Active>`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: max-content;
  scroll-snap-align: start;
  padding: 10px 20px;
  cursor: pointer;
  position: relative;
  ${(prop) =>
    prop.$active &&
    css`
      &::before {
        width: 80% !important;
      }
    `}
  &::before {
    content: "";
    position: absolute;
    width: 0;
    left: 50%;
    bottom: 0;
    border-radius: 3px;
    height: 3px;
    transform: translateX(-50%);
    background-color: #bfbfbf;
    z-index: 100;
    transition: all 0.3s ease-in-out;
  }
  &:hover::before {
    width: 80%;
  }
`;
export const ImageTypeRoom = styled.img`
  width: 30px;
  aspect-ratio: 1/1;
`;
export const TypeRoomName = styled.div``;

export const BoxRoomContainer = styled.div`
  border-radius: 6px;
  min-height: 300px;
  padding: 18px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
`;

export const RoomImage = styled.img`
  border-radius: 4px;
  width: 100%;
  aspect-ratio: 3/2;
  margin-bottom: 8px;
`;
export const TypeRoomTitle = styled.div`
  font-weight: bold;
  font-size: 12px;
  color: gray;
  object-fit: cover;
  margin-bottom: 2px;
`;
export const RoomTitle = styled(Link)`
  font-weight: bold;
  font-size: 18px;
  display: block;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LabelContainer = styled.div`
  margin: 3px 0;
  display: flex;
  gap: 4px;
`;
export const RoomLabel = styled.span`
  font-weight: 500;
  font-size: 14px;
`;
export const Owner = styled.a`
  color: gray;
  &:hover {
    color: #9254de;
  }
`;
export const Address = styled.p`
  flex: 1;
  font-style: italic;
  color: gray;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const PricePerNight = styled.p`
  color: #cf1322;
  font-weight: bold;
`;
export const IconWrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;
export const IconContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
export const LabelIcon = styled.div``;
