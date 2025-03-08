import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        backgroundColor: "#ffffff",
        padding: "10px 20px",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Link to="/" style={{ fontWeight: "bold", fontSize: "20px" }}>
            For U
          </Link>
        </div>
        <div style={{ display: "flex", gap: "15px" }}>
          <Link to="/features">Features</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/login">로그인</Link>
          <Link to="/register">회원 가입</Link>
          <Link to="/mypage">마이 페이지</Link>
          <Link to="/cart">장바구니</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
