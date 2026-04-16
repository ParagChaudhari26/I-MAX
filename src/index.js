import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';

import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home";
// Import all other page components
import AboutUs from "./components/About_us";
import Consultation from "./components/Consultation";
import TrainingPrograms from "./components/Training_Programs";

import AyurvedaTreatment from "./components/Ayurveda_Treatment";
import Overview from './components/Overview';
import Major_therapies from './components/Major_therapies';
import Allied_therapies from './components/Allied_therapies';

import Tourism from "./components/Tourism";
import RefundPolicy from "./components/Refund_Policy";
import ContactUs from "./components/Contact_Us";
import NewsEvents from "./components/News";
import Testimonials from "./components/Testimonials";
import VideoTestimonials from "./components/Video_Testimonials";
import Blogs from "./components/Blogs";
import ResearchCollaboration from "./components/Research_Collabration";
import PhotoGallery from "./components/Photo_Gallary";
import Faq from "./components/FAQ";
import RequestCall from "./components/RequestaCall";

// User Auth components
import LoginHub from "./components/auth/LoginHub.js";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import VerifyEmail from "./components/auth/VerifyEmail";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";

// User Dashboard components
import UserProtectedRoute from "./components/user/UserProtectedRoute";
import UserDashboardLayout from "./components/user/UserDashboardLayout";
import UserDashboardHome from "./components/user/DashboardHome";
import UserPrescriptions from "./components/user/Prescriptions";
import UserNotifications from "./components/user/Notifications";
import UserPayments from "./components/user/Payments";
import UserProfile from "./components/user/UserProfile";

// Dynamic Banner
import DynamicBanner from "./components/DynamicBanner";

// Chatbot Widget
import ChatbotWidget from "./components/ChatbotWidget";


// Admin components
import LoginForm from "./components/admin/LoginForm";
import DashboardLayout from "./components/admin/DashboardLayout";
import DashboardHome from "./components/admin/DashboardHome";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import {
  TrainingProgramsManager,
  NewsEventsManager,
  TestimonialsManager,
  BlogsManager,
  BannerMessagesManager,
  GalleryManager,
  NotificationsManager,
  PrescriptionsManager,
  PaymentReceiptsManager,
} from "./components/admin/modules";

// Layout wrapper for public pages with header/footer
function PublicLayout({ children }) {
  return (
    <>
      <DynamicBanner />
      <Header />
      {children}
      <Footer />
      <ChatbotWidget />
    </>
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            {/* Public Routes with Header and Footer */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/about-us" element={<PublicLayout><AboutUs /></PublicLayout>} />
            <Route path="/consultation" element={<PublicLayout><Consultation /></PublicLayout>} />
            <Route path="/training-programs" element={<PublicLayout><TrainingPrograms /></PublicLayout>} />

            {/* Ayurveda Treatment with nested routes */}
            <Route path="/ayurveda-treatment" element={<PublicLayout><AyurvedaTreatment /></PublicLayout>}>
              <Route index element={<Overview />} />
              <Route path="major-therapies" element={<Major_therapies />} />
              <Route path="minor-therapies" element={<Allied_therapies />} />
            </Route>

            <Route path="/tourism" element={<PublicLayout><Tourism /></PublicLayout>} />
            <Route path="/refund-policy" element={<PublicLayout><RefundPolicy /></PublicLayout>} />
            <Route path="/contact-us" element={<PublicLayout><ContactUs /></PublicLayout>} />
            <Route path="/news-events" element={<PublicLayout><NewsEvents /></PublicLayout>} />
            <Route path="/testimonials" element={<PublicLayout><Testimonials /></PublicLayout>} />
            <Route path="/video-testimonials" element={<PublicLayout><VideoTestimonials /></PublicLayout>} />
            <Route path="/blogs" element={<PublicLayout><Blogs /></PublicLayout>} />
            <Route path="/research-collaboration" element={<PublicLayout><ResearchCollaboration /></PublicLayout>} />
            <Route path="/photo-gallery" element={<PublicLayout><PhotoGallery /></PublicLayout>} />
            <Route path="/faq" element={<PublicLayout><Faq /></PublicLayout>} />
            <Route path="/request-call" element={<PublicLayout><RequestCall /></PublicLayout>} />

            {/* Login hub: single entry for User + Admin auth */}
            <Route path="/auth" element={<PublicLayout><LoginHub /></PublicLayout>} />

            {/* User Auth Routes - with Header and Footer (like Admin Login) */}
            <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
            <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
            <Route path="/verify-email" element={<PublicLayout><VerifyEmail /></PublicLayout>} />
            <Route path="/forgot-password" element={<PublicLayout><ForgotPassword /></PublicLayout>} />
            <Route path="/reset-password/:token" element={<PublicLayout><ResetPassword /></PublicLayout>} />

            {/* User Dashboard Routes - Protected */}
            <Route 
              path="/user/dashboard" 
              element={
                <UserProtectedRoute>
                  <UserDashboardLayout />
                </UserProtectedRoute>
              }
            >
              <Route index element={<UserDashboardHome />} />
              <Route path="prescriptions" element={<UserPrescriptions />} />
              <Route path="notifications" element={<UserNotifications />} />
              <Route path="payments" element={<UserPayments />} />
            </Route>

            {/* User Profile Route - Protected, Standalone */}
            <Route 
              path="/user/profile" 
              element={
                <UserProtectedRoute>
                  <PublicLayout>
                    <UserProfile />
                  </PublicLayout>
                </UserProtectedRoute>
              }
            />

            {/* Admin Routes - No Header/Footer */}
            <Route path="/admin/login" element={<LoginForm />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="training-programs" element={<TrainingProgramsManager />} />
              <Route path="news-events" element={<NewsEventsManager />} />
              <Route path="testimonials" element={<TestimonialsManager />} />
              <Route path="blogs" element={<BlogsManager />} />
              <Route path="notifications" element={<NotificationsManager />} />
              <Route path="prescriptions" element={<PrescriptionsManager />} />
              <Route path="payment-receipts" element={<PaymentReceiptsManager />} />
              <Route path="banner-messages" element={<BannerMessagesManager />} />
              <Route path="gallery" element={<GalleryManager />} />
            </Route>
          </Routes>
        </AuthProvider>
    </Router>
  );
}

const reactroot = ReactDOM.createRoot(document.getElementById("root"));
reactroot.render(<App />);
