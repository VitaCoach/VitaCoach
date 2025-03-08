import React from "react";
import { Link } from "react-router-dom";

const SubNavbar: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50px", // 첫 번째 네비바 아래에 위치
        width: "100%",
        backgroundColor: "#d9ead3",
        padding: "10px 0",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
        zIndex: 999,
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Link to="/category1">건강 기능 식품이란?</Link>
        <Link to="/category2">기능별 제품</Link>
        <Link to="/category3">추천해주세요!</Link>
        <Link to="/category4">비대면 상담</Link>
        <Link to="/category5">구독 및 플랜</Link>
        <Link to="/category6">프로모션</Link>
      </div>
    </div>
  );
};

export default SubNavbar;
