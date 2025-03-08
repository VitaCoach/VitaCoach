import React from "react";
import Navbar from "./Navbar";
import SubNavbar from "./SubNavbar";
import styled from "styled-components";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LayoutContainer>
      <Navbar />
      <SubNavbar />
      <MainContent>{children}</MainContent>
    </LayoutContainer>
  );
};

export default Layout;

/* ✅ Styled Components */
const LayoutContainer = styled.div`
  background-color: rgba(240, 248, 255, 1);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainContent = styled.main`
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  margin-top: 110px; /* ✅ 네비게이션 바 높이만큼 여백 추가 */
`;
