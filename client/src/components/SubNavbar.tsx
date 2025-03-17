import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const SubNavbar: React.FC = () => {
  const location = useLocation(); // ✅ 현재 경로 가져오기

  return (
    <SubNavBar>
      <NavContainer>
        <NavItem to="/" $active={location.pathname === "/"}>
          건강 기능 식품이란?
        </NavItem>
        <NavItem
          to="/category/1"
          $active={location.pathname.startsWith("/category/")}
        >
          기능별 제품
        </NavItem>
        <NavItem to="/category3" $active={location.pathname === "/category3"}>
          추천해주세요!
        </NavItem>
        <NavItem
          to="/VirtualConsulting"
          $active={location.pathname === "/VirtualConsulting"}
        >
          비대면 상담
        </NavItem>
        <NavItem
          to="/SubscriptionPage"
          $active={location.pathname === "/SubscriptionPage"}
        >
          구독 및 플랜
        </NavItem>
        <NavItem
          to="/PromotionPage"
          $active={location.pathname === "/PromotionPage"}
        >
          프로모션
        </NavItem>
      </NavContainer>
    </SubNavBar>
  );
};

export default SubNavbar;

/* ✅ Styled Components */
const SubNavBar = styled.div`
  position: fixed;
  top: 60px;
  width: 100%;
  height: 70px;
  background-color: #7dbed2;
  padding: 15px 0px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 999;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

/* ✅ 현재 페이지에 있을 경우 스타일 변경 */
const NavItem = styled(Link)<{ $active: boolean }>`
  color: ${(props) => (props.$active ? "#000000" : "#ffffff")};
  text-decoration: none;
  font-size: 23px;
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
  transition: all 0.3s ease-in-out;

  &:hover,
  &:focus {
    color: #000000;
    font-weight: bold;
  }
`;
