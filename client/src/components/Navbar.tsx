import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png"; //

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("token")
  ); // 초기값 설정

  // 로그인 시 즉시 UI 반영
  const handleLogin = () => {
    setIsLoggedIn(true); // ✅ 상태 즉시 변경
    navigate("/"); // 로그인 후 메인 페이지로 이동
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // 토큰 삭제 (로그아웃)
    setIsLoggedIn(false);
    alert("로그아웃 되었습니다.");
    navigate("/"); // 메인 페이지로 이동
  };

  return (
    <NavBar>
      <NavContainer>
        {/* 로고 (왼쪽 정렬) */}
        <LogoLink to="/">
          <Logo src={logo} alt="Logo" />
          <BrandName>VITACOACH</BrandName>
        </LogoLink>
        {/* 네비게이션 링크 (오른쪽 정렬) */}
        <NavLinks>
          {isLoggedIn ? (
            <NavButton onClick={handleLogout}>로그아웃</NavButton>
          ) : (
            <NavItem to="/LoginPage" onClick={handleLogin}>
              로그인
            </NavItem>
          )}
          <NavItem to="/RegisterPage">회원 가입</NavItem>
          <NavItem to="/MyPage">마이 페이지</NavItem>
          <NavItem to="/cart">장바구니</NavItem>
        </NavLinks>
      </NavContainer>
    </NavBar>
  );
};

export default Navbar;

/* Styled Components */
const NavBar = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: rgba(240, 248, 255, 1);
  padding: 0 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
`;

const NavContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const Logo = styled.img`
  height: 50px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-left: auto; /* ✅ 오른쪽 정렬 */
`;

const NavItem = styled(Link)`
  color: #000000;
  text-decoration: none;
  font-size: 18px;
  font-weight: normal;
  transition: all 0.3s ease-in-out;

  &:hover,
  &:focus {
    font-weight: bold;
  }
`;

const BrandName = styled.span`
  font-size: 22px;
  font-weight: bold;
  color: #003f73; /* 
  letter-spacing: 3px; /* 
  font-family: "Arial", sans-serif;
  text-transform: uppercase; 
  text-decoration: none;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #000000;
  cursor: pointer;
  transition: font-weight 0.3s ease-in-out;

  &:hover {
    font-weight: bold;
  }
`;
