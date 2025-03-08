import React from "react";
import SubscribedPage from "./SubscribedPage.tsx";
import UnsubscribedPage from "./UnsubscribedPage.tsx";

const SubscriptionPage: React.FC<{ isSubscribed: boolean }> = ({
  isSubscribed,
}) => {
  return isSubscribed ? <SubscribedPage /> : <UnsubscribedPage />;
};

export default SubscriptionPage;
