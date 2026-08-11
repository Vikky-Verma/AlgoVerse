import { useEffect } from "react";
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import CosmicBackground from "./components/effects/CosmicBackground";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import ResumeDetail from "./pages/ResumeDetail";
import MockInterviewSetup from "./pages/MockInterviewSetup";
import InterviewRoom from "./pages/InterviewRoom";
import InterviewReport from "./pages/InterviewReport";
import ATSChecker from "./pages/ATSChecker";
import DsaInsights from "./pages/DsaInsights";
import ProjectIntelligence from "./pages/ProjectIntelligence";
import AiRoadmap from "./pages/AiRoadmap";
import CompanyPrep from "./pages/CompanyPrep";
import CompanyPrepDetail from "./pages/CompanyPrepDetail";
import InternshipTracker from "./pages/InternshipTracker";
import PortfolioBuilder from "./pages/PortfolioBuilder";
import ResumeBuilder from "./pages/ResumeBuilder";
import Progress from "./pages/Progress";
import Pricing from "./pages/Pricing";
import PortfolioPublic from "./pages/PortfolioPublic";
import Home from "./pages/Home";
import Community from "./pages/Community";
import About from "./pages/About";
import Contact from "./pages/Contact";


const App = () => {

  useEffect(() => {

    /*
      Record a visit every time the application loads.

      Your VITE_API_URL should ideally be:

      http://localhost:8000

      OR your deployed backend URL.

      Example:

      VITE_API_URL=https://your-backend.onrender.com
    */

    const apiBase =
      import.meta.env.VITE_API_URL ||
      "http://localhost:8000";

    fetch(
      `${apiBase}/api/stats/visit`,
      {
        method: "POST",
      }
    ).catch((err) => {

      console.error(
        "Failed to record visit:",
        err
      );

    });

  }, []);


  return (

    <AuthProvider>

      <BrowserRouter>

        {/* Global background */}

        <CosmicBackground />


        {/* Toast notifications */}

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1a1d2e",
              color: "#f1f5f9",
              border: "1px solid #2e3150",
              borderRadius: "12px",
              fontSize: "13px",
            },
          }}
        />


        <Routes>

          {/* =====================================
              PUBLIC ROUTES
          ===================================== */}

          <Route
            path="/"
            element={<Landing />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/verify-otp"
            element={<VerifyOtp />}
          />

          <Route
            path="/pricing"
            element={<Pricing />}
          />

          <Route
            path="/portfolio/:slug"
            element={<PortfolioPublic />}
          />


          {/* =====================================
              PROTECTED APPLICATION ROUTES
          ===================================== */}

          <Route element={<Layout />}>


            {/* HOME */}

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />


            {/* COMMUNITY */}

            <Route
              path="/community"
              element={
                <ProtectedRoute>
                  <Community />
                </ProtectedRoute>
              }
            />


            {/* DASHBOARD */}

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />


            {/* RESUME DETAIL */}

            <Route
              path="/resume/:resumeId"
              element={
                <ProtectedRoute>
                  <ResumeDetail />
                </ProtectedRoute>
              }
            />


            {/* =================================
                MOCK INTERVIEW
            ================================= */}

            <Route
              path="/interview"
              element={
                <ProtectedRoute>
                  <MockInterviewSetup />
                </ProtectedRoute>
              }
            />

            <Route
              path="/interview/new"
              element={
                <ProtectedRoute>
                  <MockInterviewSetup />
                </ProtectedRoute>
              }
            />

            <Route
              path="/interview/:interviewId/room"
              element={
                <ProtectedRoute>
                  <InterviewRoom />
                </ProtectedRoute>
              }
            />

            <Route
              path="/interview/:interviewId/report"
              element={
                <ProtectedRoute>
                  <InterviewReport />
                </ProtectedRoute>
              }
            />


            {/* =================================
                ATS CHECKER
            ================================= */}

            <Route
              path="/ats-checker"
              element={
                <ProtectedRoute>
                  <ATSChecker />
                </ProtectedRoute>
              }
            />


            {/* =================================
                DSA
            ================================= */}

            <Route
              path="/dsa-insights"
              element={
                <ProtectedRoute>
                  <DsaInsights />
                </ProtectedRoute>
              }
            />


            {/* =================================
                PROJECT INTELLIGENCE
            ================================= */}

            <Route
              path="/project-intelligence"
              element={
                <ProtectedRoute>
                  <ProjectIntelligence />
                </ProtectedRoute>
              }
            />


            {/* =================================
                AI ROADMAP
            ================================= */}

            <Route
              path="/ai-roadmap"
              element={
                <ProtectedRoute>
                  <AiRoadmap />
                </ProtectedRoute>
              }
            />


            {/* =================================
                COMPANY PREPARATION
            ================================= */}

            <Route
              path="/company-prep"
              element={
                <ProtectedRoute>
                  <CompanyPrep />
                </ProtectedRoute>
              }
            />

            <Route
              path="/company-prep/:slug"
              element={
                <ProtectedRoute>
                  <CompanyPrepDetail />
                </ProtectedRoute>
              }
            />


            {/* =================================
                INTERNSHIP TRACKER
            ================================= */}

            <Route
              path="/internship-tracker"
              element={
                <ProtectedRoute>
                  <InternshipTracker />
                </ProtectedRoute>
              }
            />


            {/* =================================
                ? UPDATED RESUME BUILDER
            ================================= */}

            <Route
              path="/resume-builder"
              element={
                <ProtectedRoute>
                  <ResumeBuilder />
                </ProtectedRoute>
              }
            />


            {/* =================================
                PORTFOLIO BUILDER
            ================================= */}

            <Route
              path="/portfolio-builder"
              element={
                <ProtectedRoute>
                  <PortfolioBuilder />
                </ProtectedRoute>
              }
            />


            {/* =================================
                PROGRESS
            ================================= */}

            <Route
              path="/progress"
              element={
                <ProtectedRoute>
                  <Progress />
                </ProtectedRoute>
              }
            />


            {/* =================================
                ABOUT
            ================================= */}

            <Route
              path="/about"
              element={<About />}
            />


            {/* =================================
                CONTACT
            ================================= */}

            <Route
              path="/contact"
              element={<Contact />}
            />

          </Route>

        </Routes>

      </BrowserRouter>

    </AuthProvider>

  );
};


export default App;
