import styled from "styled-components";

export const TypeWrapper = styled.div``;
export const TypeTitle = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 16px;
`;
export const IconUpdate = styled.span`
  font-size: 20px;
  cursor: pointer;
`;
export const IconDelete = styled.span`
  color: red;
  font-size: 20px;
  cursor: pointer;
`;
export const BoxImage = styled.div`
  width: 50px;
  height: 50px;
  margin: 12px auto;
  position: relative;
  & img {
    width: 100%;
    aspect-ratio: 1/1;
  }
`;
export const IconEdit = styled.label`
  position: absolute;
  right: 1px;
  top: 1;
  height: 20px;
  width: 20px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
