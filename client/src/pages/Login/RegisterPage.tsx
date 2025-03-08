import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    birthdate: "",
    gender: "female",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("회원가입 정보:", formData);
  };

  return (
    <Container>
      <RegisterBox>
        <Title>회원 가입</Title>
        <Form onSubmit={handleSubmit}>
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

          <Label>아이디</Label>
          <InputWrapper>
            <Input
              type="email"
              name="email"
              placeholder="abc@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Icon>📧</Icon>
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
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              required
            />
          </InputWrapper>

          <Label>성별</Label>
          <GenderWrapper>
            <GenderOption>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
              />
              여성
            </GenderOption>
            <GenderOption>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
              />
              남성
            </GenderOption>
          </GenderWrapper>

          <RegisterButton type="submit">가입 완료</RegisterButton>
        </Form>

        <LoginLink>
          이미 계정이 있으신가요? <Link to="/LoginPage">Login</Link>
        </LoginLink>
      </RegisterBox>
    </Container>
  );
};

export default RegisterPage;

/* ✅ Styled Components */
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 10vh;
  min-height: 100vh;
`;

const RegisterBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
  padding-bottom: 60px;
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: bold;
  color: #003f73;
  margin-bottom: 20px;
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

const LoginLink = styled.p`
  margin-top: 20px;
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
