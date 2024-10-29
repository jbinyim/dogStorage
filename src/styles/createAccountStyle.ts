import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  height: calc(100vh - 200px);
`;

export const Title = styled.p`
  font-size: 25px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 420px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 20px;
  border-radius: 14px;
  border: 2px solid ${({ theme }) => theme.colors.inputBorder};
  font-size: 16px;
  &:focus {
    outline: none;
  }
  &:last-child {
    background: #ccd1d2;
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background: ${({ theme }) => theme.colors.submitBtn};
      color: #fff;
    }
  }
`;

export const Guthub = styled.div`
  width: 420px;
  padding: 20px;
  background: #000;
  color: #fff;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
`;

export const Error = styled.div`
  color: #f00;
`;
