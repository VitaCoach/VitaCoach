import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import profileImage from "../../assets/profileImage.png"; // ✅ 기본 프로필 이미지 추가


const MyProfile: React.FC = () => {
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState<string>(profileImage);
  const [userData, setUserData] = useState<{
    name: string;
    phone: string;
    subscription: string | null;
  }>({
    name: "",
    phone: "",
    subscription: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/LoginPage");
      return;
    }

    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      console.log("저장된 토큰:", token); // 콘솔에서 토큰 확인

      try {
        const response = await fetch(
          "http://localhost:3000/api/sub/myprofile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          console.error("로그인 필요 (401 Unauthorized)");
          navigate("/LoginPage");
          return;
        }

        if (!response.ok) {
          console.error(
            "사용자 정보 요청 실패:",
            response.status,
            response.statusText
          );
          return;
        }

        const data = await response.json();
        console.log("사용자 정보:", data);

        setUserData({
          name: data.name,
          phone: data.phone,
          subscription: data.subscribe,
        });
      } catch (error) {
        console.error("사용자 정보 조회 오류:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setProfileImg(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <ImageWrapper>
          <ProfileImage src={profileImg} alt="Profile" />
          <ImageUploadLabel htmlFor="file-upload">사진 변경</ImageUploadLabel>
          <ImageUploadInput
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </ImageWrapper>

        <Form>
          <Label>이름</Label>
          <Input type="text" value={userData.name} disabled />
          <Label>연락처</Label>
          <Input type="text" value={userData.phone} disabled />
        </Form>

        <SubscriptionSection>
          <Label>나의 구독</Label>
          {userData.subscription ? (
            <SubscribedText>🎉 {userData.subscription} 구독 중</SubscribedText>
          ) : (
            <SubscribeButton onClick={() => navigate("/SubscriptionPage")}>
              구독하러 가기
            </SubscribeButton>
          )}
        </SubscriptionSection>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default MyProfile;

/* ✅ Styled Components */
const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  background: #f4f7fc;
  margin-top: -120px;
`;

const ProfileCard = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid #003f73;
  object-fit: cover;
`;

const ImageUploadLabel = styled.label`
  margin-top: 8px;
  padding: 6px 12px;
  font-size: 14px;
  background: #003f73;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  text-align: left;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #e9ecef;
`;

const SubscriptionSection = styled.div`
  margin-top: 20px;
`;

const SubscribedText = styled.p`
  font-size: 18px;
  color: #28a745;
  font-weight: bold;
`;

const SubscribeButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background: #003f73;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;
