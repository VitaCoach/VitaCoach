import React, { useState } from "react";
import SubscribedPage from "./SubscribedPage";
import UnsubscribedPage from "./UnsubscribedPage";
import SubscriptionStatus from "./SubscriptionStatus"; // ✅ 구독 상태 확인

const SubscriptionPage: React.FC = () => {
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);

  return (
    <>
      {/* ✅ 구독 상태를 가져와서 `setIsSubscribed`을 업데이트 */}
      <SubscriptionStatus onStatusCheck={setIsSubscribed} />

      {/* ✅ 구독 상태에 따라 적절한 페이지 렌더링 */}
      {isSubscribed === null ? (
        <p>로딩 중...</p>
      ) : isSubscribed ? (
        <SubscribedPage />
      ) : (
        <UnsubscribedPage />
      )}
    </>
  );
};

export default SubscriptionPage;
