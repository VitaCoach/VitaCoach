import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import SubscriptionPage from "./pages/Subscription/SubscriptionPage.tsx";
import VirtualConsulting from "./pages/VirtualConsulting/VirtualConsulting.tsx";
import PromotionPage from "./pages/Promotion/PromotionPage.tsx";
import LoginPage from "./pages/Login/LoginPage.tsx";
import RegisterPage from "./pages/Login/RegisterPage.tsx";
import MyPage from "./pages/MyPage/MyPage.tsx";
import ExpertDetail from "./pages/VirtualConsulting/ExpertDetail.tsx";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts.tsx";
import ProductDetail from "./pages/CategoryProducts/ProductDetail.tsx";
import RecommendPage from "./pages/ModelRecommendation/RecommendPage.tsx";
import RecommendResult from "./pages/ModelRecommendation/RecommendResult.tsx";
import UnsubscribedPage from "./pages/Subscription/UnsubscribedPage.tsx";
import SubscribedPage from "./pages/Subscription/SubscribedPage.tsx";
import MyProfile from "./pages/MyPage/MyProfile.tsx";
import PaidInfo from "./pages/MyPage/PaidInfo.tsx";
import BookedConsulting from "./pages/MyPage/BookedConsulting.tsx";

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SubscriptionPage" element={<SubscriptionPage />} />
        <Route path="/PromotionPage" element={<PromotionPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
        <Route path="/VirtualConsulting" element={<VirtualConsulting />} />
        <Route path="/expert/:id" element={<ExpertDetail />} />
        {/* <Route path="/mypage/:tab" element={<MyPage />} /> */}
        <Route path="/mypage" element={<MyPage />}>
          <Route path="profile" element={<MyProfile />} />
          <Route path="payment" element={<PaidInfo />} />
          <Route path="consulting" element={<BookedConsulting />} />
        </Route>
        <Route path="/category/:categoryId" element={<CategoryProducts />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/RecommendPage" element={<RecommendPage />} />
        <Route path="/recommend-result" element={<RecommendResult />} />
        <Route path="/UnsubscribedPage" element={<UnsubscribedPage />} />
        <Route path="/SubscribedPage" element={<SubscribedPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
