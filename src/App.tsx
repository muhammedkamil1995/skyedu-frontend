import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

import Header from './components/Header';
import Footer from './components/Footer';
import DashboardLayout from './components/DashboardLayout';
import TutorDashboardLayout from './components/TutorDashboardLayout';

// Public Pages
import HomePage from './pages/HomePage';
import SimulationsPage from './pages/SimulationsPage';
import FeaturesPage from './pages/FeaturesPage';
import UseCasesPage from './pages/UseCasesPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

// Trainee Dashboard Pages
import DashboardPage from './pages/dashboard/DashboardPage';
import DashboardSimulationsPage from './pages/dashboard/SimulationsPage';
import DashboardAnalyticsPage from './pages/dashboard/AnalyticsPage';
import CertificationsPage from './pages/dashboard/CertificationsPage';
import CalendarPage from './pages/dashboard/CalendarPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import SettingsPage from './pages/dashboard/SettingsPage';
import LectureSchedulePage from './pages/dashboard/LectureSchedulePage';
import LearningMaterialsPage from './pages/dashboard/LearningMaterialsPage';
import ExercisesPage from './pages/dashboard/ExercisesPage';

// Tutor Pages
import TutorDashboardPage from './pages/tutor/TutorDashboardPage';
import TutorMaterialsPage from './pages/tutor/TutorMaterialsPage';
import TutorExercisesPage from './pages/tutor/TutorExercisesPage';
import TutorStudentsPage from './pages/tutor/TutorStudentsPage';
import TutorAnalyticsPage from './pages/tutor/TutorAnalyticsPage';
import TutorSchedulePage from './pages/tutor/TutorSchedulePage';
import TutorReportsPage from './pages/tutor/TutorReportsPage';
import TutorProfilePage from './pages/tutor/TutorProfilePage';
import TutorSettingsPage from './pages/tutor/TutorSettingsPage';

// New Pages
import TutorExerciseSubmissionsPage from './pages/tutor/TutorExerciseSubmissionsPage';
import TutorGradingPage from './pages/tutor/TutorGradingPage';   // ← NEW IMPORT

// Meeting Room
import MeetingRoom from './pages/meetings/MeetingRoom';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Page not found</p>
        <Link 
          to="/" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ====================== PUBLIC ROUTES ====================== */}
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/simulations" element={<Layout><SimulationsPage /></Layout>} />
          <Route path="/features" element={<Layout><FeaturesPage /></Layout>} />
          <Route path="/usecases" element={<Layout><UseCasesPage /></Layout>} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/signup" element={<Layout><SignUpPage /></Layout>} />

          {/* ====================== TRAINEE DASHBOARD ====================== */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['trainee']}>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="lecture-schedule" element={<LectureSchedulePage />} />
            <Route path="learning-materials" element={<LearningMaterialsPage />} />
            <Route path="simulations" element={<DashboardSimulationsPage />} />
            <Route path="analytics" element={<DashboardAnalyticsPage />} />
            <Route path="certifications" element={<CertificationsPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="exercises" element={<ExercisesPage />} />
          </Route>

          {/* ====================== TUTOR / INSTRUCTOR ROUTES ====================== */}
          <Route
            path="/tutor"
            element={
              <ProtectedRoute allowedRoles={['supervisor', 'admin', 'instructor']}>
                <TutorDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<TutorDashboardPage />} />
            <Route path="dashboard" element={<TutorDashboardPage />} />
            <Route path="materials" element={<TutorMaterialsPage />} />
            <Route path="exercises" element={<TutorExercisesPage />} />
            
            {/* NEW: Grading Overview Page */}
            <Route path="grading" element={<TutorGradingPage />} />
            
            {/* Detailed Submissions / Grading for specific exercise */}
            <Route 
              path="exercises/:exerciseId/submissions" 
              element={<TutorExerciseSubmissionsPage />} 
            />

            <Route path="students" element={<TutorStudentsPage />} />
            <Route path="analytics" element={<TutorAnalyticsPage />} />
            <Route path="schedule" element={<TutorSchedulePage />} />
            <Route path="reports" element={<TutorReportsPage />} />
            <Route path="profile" element={<TutorProfilePage />} />
            <Route path="settings" element={<TutorSettingsPage />} />
          </Route>

          {/* ====================== ADMIN ROUTES ====================== */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <TutorDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<TutorDashboardPage />} />
            <Route path="dashboard" element={<TutorDashboardPage />} />
            <Route path="materials" element={<TutorMaterialsPage />} />
            <Route path="exercises" element={<TutorExercisesPage />} />
            
            {/* Admin also gets Grading Overview */}
            <Route path="grading" element={<TutorGradingPage />} />
            
            {/* Admin also gets detailed submissions */}
            <Route 
              path="exercises/:exerciseId/submissions" 
              element={<TutorExerciseSubmissionsPage />} 
            />

            <Route path="students" element={<TutorStudentsPage />} />
            <Route path="analytics" element={<TutorAnalyticsPage />} />
            <Route path="schedule" element={<TutorSchedulePage />} />
            <Route path="reports" element={<TutorReportsPage />} />
            <Route path="profile" element={<TutorProfilePage />} />
            <Route path="settings" element={<TutorSettingsPage />} />
          </Route>

          {/* ====================== MEETING ROOM ====================== */}
          <Route
            path="/meetings/join/:code"
            element={
              <ProtectedRoute allowedRoles={['trainee', 'supervisor', 'admin', 'instructor']}>
                <MeetingRoom />
              </ProtectedRoute>
            }
          />

          {/* ====================== 404 ====================== */}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;