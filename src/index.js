import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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


function App() {
  return (
    <Router>
      
      <ScrollToTop /> {/* Place it right after <Router> */}

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/training-programs" element={<TrainingPrograms />} />

        {/* <Route path="/ayurveda-treatment" element={<AyurvedaTreatment />} /> */}
         <Route path="/ayurveda-treatment" element={<AyurvedaTreatment />}>
              <Route index element={<Overview />} />

              <Route path="major-therapies" element={<Major_therapies />} />
              <Route path="minor-therapies" element={<Allied_therapies />} />
        </Route>

        <Route path="/tourism" element={<Tourism />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/news-events" element={<NewsEvents />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/video-testimonials" element={<VideoTestimonials />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/research-collaboration" element={<ResearchCollaboration />} />
        <Route path="/photo-gallery" element={<PhotoGallery />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/request-call" element={<RequestCall />} />
        
        <Route path="/blogs" element={<Blogs/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

const reactroot = ReactDOM.createRoot(document.getElementById("root"));
reactroot.render(<App />);