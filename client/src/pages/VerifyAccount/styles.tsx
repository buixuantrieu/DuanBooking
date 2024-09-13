import styled from "styled-components";

export const VerificationWrapper = styled.div`
  padding: 40px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;
export const EmailIcon = styled.span`
  font-size: 28px;
  border: 1px solid #bec0e1;
  display: flex;
  padding: 8px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  color: #6f76b8;
`;
export const Title = styled.h3`
  margin: 12px 0;
  color: #6f76b8;
`;
export const Description = styled.p`
  font-size: 14px;
  margin: 2px 0;
  color: #8b90c6;
`;
export const BoxNumberContainer = styled.div`
  display: flex;
  gap: 12px;
  margin: 20px 0;
`;
export const BoxNumber = styled.span``;
export const ResendMail = styled.button`
  background-color: transparent;
  border: none;
  color: #6f76b8;
  font-weight: bold;
  margin-right: 8px;
  cursor: pointer;
  &:disabled {
    color: #bec0e1;
    cursor: not-allowed;
  }
`;
export const BackToLogin = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  align-items: center;
  margin-top: 16px;
  font-weight: 500;
  color: #6f76b8;
  cursor: pointer;
`;
