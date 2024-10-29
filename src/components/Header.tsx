import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/강아지 자장소-logo (1).png";

const Wrapper = styled.div`
  max-width: 1300px;
  height: 100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  width: 300px;
  height: 100px;
  cursor: pointer;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const Text = styled.p`
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
`;

const Border = styled.div`
  border: 1px solid #964b00;
  border-radius: 20px;
  padding: 10px 15px;
  background: #964b00;
  cursor: pointer;
  p {
    color: #fff;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const onClick = (navi: string) => {
    navigate(`/${navi}`);
  };

  return (
    <>
      <Wrapper>
        <Logo onClick={() => onClick("")} src={logo} alt="Logo이미지" />
        <HeaderRight>
          <Text onClick={() => onClick("login")}>로그인</Text>
          <Text onClick={() => onClick("createAccount")}>회원가입</Text>
          <Border onClick={() => onClick("writing")}>
            <Text>글쓰기</Text>
          </Border>
        </HeaderRight>
      </Wrapper>
      <Outlet />
    </>
  );
};

export default Header;
