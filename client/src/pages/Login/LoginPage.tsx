import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginPage: React.FC = () => {
  const navigate = useNavigate(); // 로그인 성공 시 페이지 이동
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // 기존 오류 초기화

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }), //
      });

      const data = await response.json();

      if (response.status === 200) {
        // JWT 토큰 저장 (localStorage)
        localStorage.setItem("token", data.token);
        alert("로그인 성공!");
        navigate("/"); // 로그인 성공 시 이동할 페이지 설정
      } else {
        setError(
          data.message || "로그인 실패: 아이디 또는 비밀번호를 확인하세요."
        );
      }
    } catch (err) {
      console.error("로그인 오류:", err);
      setError("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <LoginBox>
        <Title>로그인</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <Label>아이디</Label>
          <InputWrapper>
            <Input
              type="text"
              placeholder="아이디 입력"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <Icon>🆔</Icon>
          </InputWrapper>

          <Label>비밀번호</Label>
          <InputWrapper>
            <Input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Icon>🔒</Icon>
          </InputWrapper>

          <LoginButton type="submit">로그인</LoginButton>
        </Form>

        <RegisterLink>
          계정이 없으신가요? <a href="/RegisterPage">가입하기</a>
        </RegisterLink>
      </LoginBox>
    </Container>
  );
};

export default LoginPage;

/* ✅ Styled Components */
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
  margin-top: -200px;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: bold;
  color: #003f73;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  color: #333;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  padding-left: 40px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: 0.3s;

  &:focus {
    border-color: #003f73;
  }
`;

const Icon = styled.span`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #003f73;
`;

const LoginButton = styled.button`
  background-color: #003f73;
  color: white;
  font-size: 18px;
  font-weight: bold;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #002244;
  }
`;

const RegisterLink = styled.p`
  margin-top: 30px;
  font-size: 14px;
  color: #003f73;

  a {
    font-weight: bold;
    text-decoration: none;
    color: #003f73;

    &:hover {
      text-decoration: underline;
    }
  }
`;
