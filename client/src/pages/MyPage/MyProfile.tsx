import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MyProfile: React.FC = () => {
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string>(
    "../../assets/profileImage.png"
  );

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/LoginPage");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/sub/status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          navigate("/LoginPage");
          return;
        }

        const data = await response.json();
        setSubscription(data.subscriptionLevel || null);
      } catch (error) {
        console.error("구독 상태 조회 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionStatus();
  }, [navigate]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setProfileImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <LoadingText>로딩 중...</LoadingText>;

  return (
    <ProfileContainer>
      <ProfileCard>
        <ImageWrapper>
          <ProfileImage src={profileImage} alt="Profile" />
          <ImageUploadLabel htmlFor="file-upload">📷 변경</ImageUploadLabel>
          <ImageUploadInput
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </ImageWrapper>

        <Form>
          <Label>이름</Label>
          <Input type="text" placeholder="이름 입력" disabled />
          <Label>연락처</Label>
          <Input type="text" placeholder="연락처 입력" disabled />
        </Form>

        <SubscriptionSection>
          <Label>나의 구독</Label>
          {subscription ? (
            <SubscribedText>🎉 {subscription} 구독 중</SubscribedText>
          ) : (
            <SubscribeButton onClick={() => navigate("/UnsubscribedPage")}>
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

const LoadingText = styled.p`
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
`;
