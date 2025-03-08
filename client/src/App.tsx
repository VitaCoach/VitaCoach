import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import FeaturesPage from "./pages/FeaturesPage.tsx";
import SubscriptionPage from "./pages/Subscription/SubscriptionPage.tsx";
// import SubscriptionStatus from "./pages/Subscription/SubscriptionStatus.tsx";
import PromotionPage from "./pages/Promotion/PromotionPage.tsx";
import LoginPage from "./pages/Login/LoginPage.tsx";
import RegisterPage from "./pages/Login/RegisterPage.tsx";
// import BlogsPage from './pages/BlogsPage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import MyPage from './pages/MyPage';
// import CartPage from './pages/CartPage';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/FeaturesPage" element={<FeaturesPage />} />
        <Route path="/SubscriptionPage" element={<SubscriptionPage />} />
        <Route path="/PromotionPage" element={<PromotionPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
