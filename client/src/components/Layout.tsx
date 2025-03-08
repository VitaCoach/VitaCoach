import React from "react";
import Navbar from "./Navbar";
import SubNavbar from "./SubNavbar.tsx";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      {/* 최상단 네비게이션 바 (항상 고정) */}
      <Navbar />
      {/* 두 번째 네비게이션 바 (항상 고정) */}
      <SubNavbar />
      {/* 메인 콘텐츠 (네비게이션 바 아래 여백 추가) */}
      <main style={{ paddingTop: "110px" }}>{children}</main>
    </div>
  );
};

export default Layout;
