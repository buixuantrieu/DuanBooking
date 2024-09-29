import styled from "styled-components";

export const BookingHistoryWrapper = styled.div``;
export const BookingHistoryTitle = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 16px;
`;
export const BoxContainer = styled.div`
  border-radius: 8px;
  padding: 16px;
  padding-top: 50px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  position: relative;
  overflow: hidden;
  margin-bottom: 24px;
`;
export const ContentContainer = styled.div`
  display: flex;
  gap: 8px;
`;
export const Label = styled.div`
  font-weight: bold;
`;
export const Content = styled.div``;

export const StatusPending = styled.div`
  padding: 4px 8px;
  padding-right: 36px;
  background: linear-gradient(to right, #6f76b5, #6f76b55b);

  color: white;
  position: absolute;
  top: 0px;
  left: 0px;
  &::after {
    content: "";
    position: absolute;
    background-color: white;
    aspect-ratio: 1/1;
    height: 100%;
    right: 0;
    top: 0;
    transform: rotate(45deg) translate(50%, -50%);
  }
`;
export const StatusSuccess = styled.div`
  padding: 4px 8px;
  padding-right: 36px;
  background: linear-gradient(to right, #5b8c00, #5b8c005b);

  color: white;
  position: absolute;
  top: 0px;
  left: 0px;
  &::after {
    content: "";
    position: absolute;
    background-color: white;
    aspect-ratio: 1/1;
    height: 100%;
    right: 0;
    top: 0;
    transform: rotate(45deg) translate(50%, -50%);
  }
`;
export const StatusRefund = styled.div`
  padding: 4px 8px;
  padding-right: 36px;
  background: linear-gradient(to right, #d3adf7, #d3adf75b);

  color: white;
  position: absolute;
  top: 0px;
  left: 0px;
  &::after {
    content: "";
    position: absolute;
    background-color: white;
    aspect-ratio: 1/1;
    height: 100%;
    right: 0;
    top: 0;
    transform: rotate(45deg) translate(50%, -50%);
  }
`;

export const StatusUnavailable = styled.div`
  padding: 4px 8px;
  padding-right: 36px;
  background-color: gray;
  background: linear-gradient(to right, gray, #8080805b);
  color: white;
  position: absolute;
  top: 0px;
  left: 0px;
  &::after {
    content: "";
    position: absolute;
    background-color: white;
    aspect-ratio: 1/1;
    height: 100%;
    right: 0;
    top: 0;
    transform: rotate(45deg) translate(50%, -50%);
  }
`;
