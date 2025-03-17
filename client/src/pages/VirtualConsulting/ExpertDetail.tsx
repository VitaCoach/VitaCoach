import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

// ✅ 전문가 타입 정의
interface ExpertDetail {
  name: string;
  type: string;
  rate: number;
  intro: string;
}

const ExpertDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [expert, setExpert] = useState<ExpertDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");

  useEffect(() => {
    const fetchExpertDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found!");
          return;
        }

        const response = await fetch(`/api/counsel/expertInfo/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`서버 응답 오류: ${response.status}`);
        }

        const data = await response.json();
        setExpert(data);
      } catch (error) {
        console.error("Error fetching expert details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExpertDetail();
  }, [id]);

  if (loading) return <LoadingText>Loading...</LoadingText>;
  if (!expert) return <ErrorText>전문가 정보를 찾을 수 없습니다.</ErrorText>;

  // ✅ 날짜 선택 핸들러
  const handleDateChange = (value: Date | null) => {
    if (value) {
      setSelectedDate(value);
    }
  };

  // ✅ 시간 선택 핸들러 (9:00 ~ 17:00, 30분 간격)
  const availableTimes = Array.from({ length: 16 }, (_, i) => {
    const hour = Math.floor(i / 2) + 9;
    const minutes = i % 2 === 0 ? "00" : "30";
    return `${hour}:${minutes}`;
  });

  const handleReservation = async () => {
    if (!selectedDate || !selectedTime) {
      alert("날짜와 시간을 선택해주세요.");
      return;
    }

    const expertId = id ? parseInt(id, 10) : null;

    if (!expertId) {
      alert("잘못된 전문가 ID입니다.");
      return;
    }

    const formattedDate = selectedDate.toISOString().split("T")[0];
    const formattedTime = `${formattedDate}T${selectedTime}:00.000Z`;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/counsel/register", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expertId,
          reservationDate: formattedDate,
          reservationTime: formattedTime,
        }),
      });

      if (!response.ok) {
        throw new Error("예약 실패");
      }

      alert("예약이 완료되었습니다!");
    } catch (error) {
      console.error("Error reserving:", error);
      alert("예약에 실패했습니다.");
    }
  };

  return (
    <DetailContainer>
      <ExpertProfile>
        <ExpertImage
          src={location.state?.imageUrl || "https://via.placeholder.com/150"}
          alt={expert.name}
        />
        <ExpertName>
          {expert.name} <span>{expert.type}</span>
        </ExpertName>
        <Rating>⭐ {expert.rate} out of 5</Rating>
      </ExpertProfile>

      <DetailSection>
        <SectionTitle>소개</SectionTitle>
        <p>{expert.intro}</p>
      </DetailSection>

      {/* ✅ 예약 날짜 및 시간 선택 */}
      <ReservationSection>
        <SectionTitle>예약 날짜 및 시간</SectionTitle>
        <CalendarContainer>
          <Calendar
            onChange={(value) => handleDateChange(value as Date | null)}
            value={selectedDate}
          />
        </CalendarContainer>
        <SelectContainer>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="">시간 선택</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </SelectContainer>
        <ReserveButton onClick={handleReservation}>예약 하기</ReserveButton>
      </ReservationSection>
    </DetailContainer>
  );
};

export default ExpertDetailPage;

/* ✅ Styled Components */
const DetailContainer = styled.div`
  max-width: 700px;
  margin: 50px auto;
  padding: 25px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const ExpertProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ExpertImage = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
`;

const ExpertName = styled.h2`
  margin-top: 10px;
  font-size: 26px;
  color: #2c3e50;
`;

const Rating = styled.p`
  font-size: 18px;
  color: #f39c12;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #34495e;
  margin-bottom: 10px;
`;

const DetailSection = styled.div`
  margin-top: 20px;
  padding: 15px;
  background: #ecf0f1;
  border-radius: 8px;
`;

const ReservationSection = styled.div`
  margin-top: 30px;
  padding: 20px;
  background: #f1f1f1;
  border-radius: 10px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
`;

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  margin-top: 50px;

  .react-calendar {
    width: 100%;
    max-width: 380px;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
    font-family: Arial, sans-serif;
    line-height: 1.5em;
  }

  .react-calendar__tile--active {
    background: #3498db;
    color: white;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 50px;

  select {
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #bdc3c7;
  }
`;

const ReserveButton = styled.button`
  margin-top: 40px;
  width: 100%;
  padding: 12px;
  background: #3498db;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  &:hover {
    background: #2980b9;
  }
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 18px;
  color: #666;
`;

const ErrorText = styled.p`
  text-align: center;
  font-size: 18px;
  color: red;
`;
