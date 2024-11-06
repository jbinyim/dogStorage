import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 1300px;
  width: 100%;
  margin: 0 auto;
`;

export const Box = styled.div`
  display: flex;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

export const Write = styled.div`
  width: 300px;
  height: 340px;
  border: 1px solid #9999;
  border-radius: 30px;
  padding: 30px 35px 0;
`;

export const BoxTop = styled.div`
  height: 230px;
`;

export const Day = styled.p`
  font-size: 14px;
  color: #999;
`;

export const Title = styled.h2`
  font-size: 18px;
  margin: 20px 0 25px;
`;

export const Text = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const DogName = styled.span`
  font-size: 13px;
  color: #3e86f5;
  background: #f2f4f8;
  padding: 3px 10px;
  border-radius: 15px;
`;

export const Video = styled.img`
  width: 40px;
  margin-top: 15px;
`;

export const User = styled.p`
  margin-top: 10px;
  padding-top: 10px;
  font-size: 15px;
  font-weight: bold;
  border-top: 1px solid #9999;
`;
