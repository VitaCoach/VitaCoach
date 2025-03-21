import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import doctorProfile from "../../assets/doctorProfile.png";
import profileImage from "../../assets/profileImage.png";

const RecommendPage: React.FC = () => {
  const [inputText, setInputText] = useState<string>(""); // 사용자 입력
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 추가
  const [loading, setLoading] = useState<boolean>(false);

  // 사용자 프로필 이름 가져오기
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("📌 인증 토큰이 없습니다. 로그인 후 다시 시도하세요.");
          return;
        }

        const response = await fetch(
          "http://localhost:3000/api/sub/myprofile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `사용자 정보 로드 실패 (HTTP 상태: ${response.status})`
          );
        }

        const data = await response.json();
        console.log("📌 사용자 정보:", data);

        if (data.name) {
          localStorage.setItem("username", data.name); // ✅ localStorage에도 저장 (새로고침 유지)
        }
      } catch (error) {
        console.error("프로필 정보 오류:", error);
      }
    };

    fetchUserProfile(); // 초기 실행

    // 🔥 토큰이 변경될 때 자동으로 fetch 실행
    const handleStorageChange = () => {
      console.log("📌 `authToken` 변경 감지됨!");
      fetchUserProfile();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // API 요청 함수
  const fetchRecommendations = async () => {
    if (!inputText.trim()) {
      alert("증상을 입력해주세요!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: inputText }),
      });

      if (!response.ok) throw new Error("추천 요청 실패");

      const data = await response.json();
      navigate("/recommend-result", {
        state: { recommendations: data.results },
      });
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      alert("추천 요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 엔터 키 입력 시 요청 실행
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      fetchRecommendations();
    }
  };

  return (
    <Container>
      <Header>🔍 추천해주세요!</Header>
      <ChatContainer>
        {/* 건강봇 메시지 */}
        <BotMessage>
          <BotProfile src={doctorProfile} alt="건강봇" />
          <Bubble>
            안녕하세요! 저는 건강봇입니다. 만나서 반갑습니다.
            <br />
            <strong>{localStorage.getItem("username") || "고객"}님</strong>의
            현재 증상을 간단히 입력해주세요!
          </Bubble>
        </BotMessage>

        {/* 사용자 입력 메시지 */}
        <UserMessage>
          <InputContainer>
            <Input
              placeholder="예: 피곤함이 지속돼요..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </InputContainer>
          <UserProfile src={profileImage} alt="사용자" />
        </UserMessage>
      </ChatContainer>

      <SubmitButton onClick={fetchRecommendations} disabled={loading}>
        {loading ? "🔍 추천 중..." : "추천 품목 받기!"}
      </SubmitButton>
    </Container>
  );
};

export default RecommendPage;

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 40px 20px;
  text-align: center;
`;

const Header = styled.h2`
  font-size: 28px;
  color: #003f73;
  margin-bottom: 25px;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 50px;
`;

const BotMessage = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const BotProfile = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  object-fit: cover;
`;

const Bubble = styled.div`
  background: #e3f2fd;
  padding: 12px 15px;
  border-radius: 15px;
  max-width: 75%;
  text-align: left;
  font-size: 16px;
  line-height: 1.5;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
`;

const UserMessage = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 10px;
`;

const UserProfile = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  object-fit: cover;
`;

const InputContainer = styled.div`
  margin-top: 50px;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 25px;
  padding: 10px 15px;
  width: 85%;
  max-width: 500px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.15);
`;

const Input = styled.textarea`
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  resize: none;
  background: transparent;
  padding: 15px;
`;
const SubmitButton = styled.button`
  margin-top: 70px;
  padding: 14px 0;
  background: linear-gradient(90deg, #003f73, #0056b3);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
  width: 90%;
  max-width: 500px;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 4px 10px rgba(0, 119, 204, 0.3);

  &:hover {
    background: linear-gradient(90deg, #0056b3, #004494);
    transform: scale(1.05);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    box-shadow: none;
  }
`;
