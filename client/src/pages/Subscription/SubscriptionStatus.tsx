import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SubscriptionStatus: React.FC<{
  onStatusCheck: (subscribed: boolean) => void;
}> = ({ onStatusCheck }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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
        if (data.redirectTo === "/subscribe") {
          onStatusCheck(false); // 구독 안 한 상태 전달
        } else {
          onStatusCheck(true); // 구독한 상태 전달
        }
      } catch (error) {
        console.error("구독 상태 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionStatus();
  }, [navigate, onStatusCheck]);

  if (loading) return <p>로딩 중...</p>;

  return null; // 이 컴포넌트 자체는 화면을 그리지 않음
};

export default SubscriptionStatus;
