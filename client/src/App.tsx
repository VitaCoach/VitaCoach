import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import SubscriptionPage from "./pages/Subscription/SubscriptionPage.tsx";
import VirtualConsulting from "./pages/VirtualConsulting/VirtualConsulting.tsx";
import PromotionPage from "./pages/Promotion/PromotionPage.tsx";
import LoginPage from "./pages/Login/LoginPage.tsx";
import RegisterPage from "./pages/Login/RegisterPage.tsx";
// import BlogsPage from './pages/BlogsPage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
import MyPage from "./pages/MyPage/MyPage.tsx";
import ExpertDetail from "./pages/VirtualConsulting/ExpertDetail.tsx";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts.tsx";
import ProductDetail from "./pages/CategoryProducts/ProductDetail.tsx";
// import CartPage from './pages/CartPage';

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
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/category/:categoryId" element={<CategoryProducts />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>
    </Layout>
  );
};

export default App;
