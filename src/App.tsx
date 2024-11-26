import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import KidsLogin from './pages/KidsLogin';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import ParentDashboard from './pages/ParentDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSubscriptions from './pages/admin/AdminSubscriptions';
import ContentManagement from './pages/admin/ContentManagement';
import ParentActivitiesManagement from './pages/admin/ParentActivitiesManagement';
import QuizManagement from './pages/admin/QuizManagement';
import PromptManagement from './pages/admin/PromptManagement';
import ThematicPathManagement from './pages/admin/ThematicPathManagement';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import AdminSettings from './pages/admin/AdminSettings';
import LearningPathPage from './pages/LearningPathPage';
import JournalPage from './pages/JournalPage';
import MangaStoriesPage from './pages/MangaStoriesPage';
import AICompanions from './pages/AICompanions';
import ARContainer from './components/ar/ARContainer';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import SciencePage from './pages/SciencePage';
import UseCasesPage from './pages/UseCasesPage';
import DemoPage from './pages/DemoPage';
import FeaturesPage from './pages/FeaturesPage';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/kids-login" element={<KidsLogin />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/science" element={<SciencePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/use-cases" element={<UseCasesPage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />

            {/* Protected routes */}
            <Route path="/app" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              {/* Student routes */}
              <Route path="learning-path" element={<LearningPathPage />} />
              <Route path="student-dashboard" element={<StudentDashboard />} />
              <Route path="journal" element={<JournalPage />} />
              <Route path="manga-stories" element={<MangaStoriesPage />} />
              <Route path="ai-companions" element={<AICompanions />} />
              <Route path="ar-activities" element={<ARContainer />} />

              {/* Teacher routes */}
              <Route path="teacher-dashboard" element={<TeacherDashboard />} />
              
              {/* Parent routes */}
              <Route path="parent-dashboard" element={<ParentDashboard />} />

              {/* Admin routes */}
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/users" element={<AdminUsers />} />
              <Route path="admin/subscriptions" element={<AdminSubscriptions />} />
              <Route path="admin/content" element={<ContentManagement />} />
              <Route path="admin/parent-activities" element={<ParentActivitiesManagement />} />
              <Route path="admin/quiz" element={<QuizManagement />} />
              <Route path="admin/paths" element={<ThematicPathManagement />} />
              <Route path="admin/prompts" element={<PromptManagement />} />
              <Route path="admin/analytics" element={<AnalyticsPage />} />
              <Route path="admin/settings" element={<AdminSettings />} />

              {/* Default redirect */}
              <Route index element={<Navigate to="/app/learning-path" replace />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;