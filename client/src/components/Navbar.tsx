import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png"; // ✅ 로고 불러오기

const Navbar: React.FC = () => {
  return (
    <NavBar>
      <NavContainer>
        {/* ✅ 로고 (왼쪽 정렬) */}
        <LogoLink to="/">
          <Logo src={logo} alt="Logo" />
        </LogoLink>
        {/* ✅ 네비게이션 링크 (오른쪽 정렬) */}
        <NavLinks>
          <NavItem to="/LoginPage">로그인</NavItem>
          <NavItem to="/RegisterPage">회원 가입</NavItem>
          <NavItem to="/mypage">마이 페이지</NavItem>
          <NavItem to="/cart">장바구니</NavItem>
        </NavLinks>
      </NavContainer>
    </NavBar>
  );
};

export default Navbar;

/* ✅ Styled Components */
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
