import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import HomePage from "./pages/HomePage.tsx";
import FeaturesPage from "./pages/FeaturesPage.tsx";
import SubscriptionPage from "./pages/SubscriptionPage.tsx";
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
      </Routes>
    </Layout>
  );
};

export default App;
