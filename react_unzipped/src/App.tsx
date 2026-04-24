import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfileSetupPage from "./pages/ProfileSetupPage";
import OcrPage from "./pages/OcrPage";
import OrderEditPage from "./pages/OrderEditPage";
import CalculatePage from "./pages/CalculatePage";
import ResultPage from "./pages/ResultPage";
import HistoryPage from "./pages/HistoryPage";
import RulesPage from "./pages/RulesPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/AboutPage";
import HelpPage from "./pages/HelpPage";
import FeedbackPage from "./pages/FeedbackPage";
import { AppDataProvider } from "./lib/app-data";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppDataProvider>
      <BrowserRouter>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", background: "#E8ECF2" }}>
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile-setup" element={<ProfileSetupPage />} />
            <Route path="/ocr" element={<OcrPage />} />
            <Route path="/order-edit" element={<OrderEditPage />} />
            <Route path="/calculate" element={<CalculatePage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/service-detail" element={<ServiceDetailPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppDataProvider>
  </QueryClientProvider>
);

export default App;
