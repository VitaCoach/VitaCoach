import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate(); // 회원가입 성공 시 로그인 페이지로 이동
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    phone: "",
    password: "",
    birth: "",
    sex: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // 기존 오류 메시지 초기화

    try {
      const birthDate = new Date(formData.birth).toISOString();
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...formData, birth: birthDate }),
      });

      if (response.status === 201) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        navigate("/LoginPage"); // 회원가입 성공 시 로그인 페이지로 이동
      } else if (response.status === 400) {
        const data = await response.json();
        setError(data.message || "회원가입 실패: 입력값을 확인해주세요.");
      } else {
        setError("서버 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (err) {
      console.error("회원가입 오류:", err);
      setError("네트워크 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <RegisterBox>
        <Title>회원 가입</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <Label>사용자 ID</Label>
          <InputWrapper>
            <Input
              type="text"
              name="id"
              placeholder="아이디를 입력하세요"
              value={formData.id}
              onChange={handleChange}
              required
            />
            <Icon>🆔</Icon>
          </InputWrapper>

          <Label>이름</Label>
          <InputWrapper>
            <Input
              type="text"
              name="name"
              placeholder="이름을 입력하세요"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Icon>👤</Icon>
          </InputWrapper>

          <Label>연락처</Label>
          <InputWrapper>
            <Input
              type="tel"
              name="phone"
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <Icon>📞</Icon>
          </InputWrapper>

          <Label>비밀번호</Label>
          <InputWrapper>
            <Input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Icon>🔒</Icon>
          </InputWrapper>

          <Label>생년월일</Label>
          <InputWrapper>
            <Input
              type="date"
              name="birth"
              value={formData.birth}
              onChange={handleChange}
              required
            />
          </InputWrapper>

          <Label>성별</Label>
          <GenderWrapper>
            <GenderOption>
              <input
                type="radio"
                name="sex"
                value="WOMAN"
                checked={formData.sex === "WOMAN"}
                onChange={handleChange}
              />
              여성
            </GenderOption>
            <GenderOption>
              <input
                type="radio"
                name="sex"
                value="MAN"
                checked={formData.sex === "MAN"}
                onChange={handleChange}
              />
              남성
            </GenderOption>
          </GenderWrapper>

          <RegisterButton type="submit">가입 완료</RegisterButton>
        </Form>
      </RegisterBox>
    </Container>
  );
};

export default RegisterPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 10vh;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const RegisterBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
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

const GenderWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 5px;
`;

const GenderOption = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
  color: #003f73;
`;

const RegisterButton = styled.button`
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
