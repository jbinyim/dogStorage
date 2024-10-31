import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/강아지 자장소-logo (1).png";
import { auth } from "../firebase";

const Wrapper = styled.div`
  max-width: 1300px;
  height: 100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #000;
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
  border: 1px solid ${({ theme }) => theme.colors.mainColor};
  border-radius: 20px;
  padding: 10px 15px;
  background: ${({ theme }) => theme.colors.mainColor};
  cursor: pointer;
  p {
    color: #fff;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const onClick = (navi: string) => {
    navigate(`/${navi}`);
  };

  const onLogout = async () => {
    /* eslint-disable no-restricted-globals */
    const ok = confirm("로그아웃 하시겠습니까?");
    /* eslint-disable no-restricted-globals */

    if (ok) {
      await auth.signOut();
      navigate("/");
    }
  };

  return (
    <>
      <Wrapper>
        <Logo onClick={() => onClick("")} src={logo} alt="Logo이미지" />
        <HeaderRight>
          {user === null ? (
            <>
              <Text onClick={() => onClick("login")}>로그인</Text>
              <Text onClick={() => onClick("createAccount")}>회원가입</Text>
            </>
          ) : (
            <>
              <Text onClick={onLogout}>로그아웃</Text>
              <Text>마이페이지</Text>
            </>
          )}

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
