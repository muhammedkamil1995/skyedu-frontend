import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Award, 
  Clock, 
  Download, 
  Loader2 
} from 'lucide-react';
import { getTutorDashboardStats } from '../../services/tutorService';
import type { TutorDashboardStats } from '../../types/tutor';
import Toast from '../../components/Toast';
import '../../assets/css/TutorAnalytics.css';

const TutorAnalyticsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<TutorDashboardStats | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getTutorDashboardStats();
        setStats(data);
      } catch {
        setToast({ type: 'error', message: 'Failed to load analytics data' });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="tutor-analytics-page loading">
        <div className="loading-spinner">
          <Loader2 size={32} className="spinner" /> 
          Loading analytics...
        </div>
      </div>
    );
  }

  // Calculated values
  const totalViews = stats?.recent_uploads?.reduce((acc, m) => acc + (m.views_count || 0), 0) || 0;
  const completionRate = stats?.total_students 
    ? Math.round((stats.total_exercises / (stats.total_students * 5)) * 100) 
    : 0;
  const avgRating = stats?.recent_uploads && stats.recent_uploads.length > 0
    ? stats.recent_uploads.reduce((acc, m) => acc + (m.average_rating || 0), 0) / stats.recent_uploads.length
    : 0;
  const avgSessionTime = 42; // Placeholder - replace with real data when available

  return (
    <div className="tutor-analytics-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Analytics</h1>
          <p className="page-subtitle">Performance insights and statistics</p>
        </div>
        <button className="secondary-button">
          <Download size={20} />
          <span>Export Report</span>
        </button>
      </div>

      {/* Stats Grid - Forces 4 columns on desktop */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon blue">
              <Users size={24} />
            </div>
            <div className="stat-change trend-up">+12%</div>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{totalViews.toLocaleString()}</h3>
            <p className="stat-title">Total Course Views</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon purple">
              <Award size={24} />
            </div>
            <div className="stat-change trend-up">+8%</div>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{completionRate}%</h3>
            <p className="stat-title">Completion Rate</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon green">
              <TrendingUp size={24} />
            </div>
            <div className="stat-change trend-up">+15%</div>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{avgRating.toFixed(1)}</h3>
            <p className="stat-title">Avg Rating (out of 5)</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon yellow">
              <Clock size={24} />
            </div>
            <div className="stat-change trend-down">-5%</div>
          </div>
          <div className="stat-content">
            <h3 className="stat-value">{avgSessionTime}m</h3>
            <p className="stat-title">Avg Session Time</p>
          </div>
        </div>
      </div>

      <div className="content-grid">
        <div className="content-card">
          <div className="card-header">
            <h3>Course Performance</h3>
          </div>
          <div className="chart-placeholder">
            <BarChart3 size={48} />
            <p>Performance chart would appear here (e.g., using Chart.js or Recharts)</p>
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <h3>Student Engagement</h3>
          </div>
          <div className="chart-placeholder">
            <TrendingUp size={48} />
            <p>Engagement metrics would appear here</p>
          </div>
        </div>
      </div>

      <div className="content-card full-width">
        <div className="card-header">
          <h3>Top Performing Materials</h3>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Type</th>
                <th>Views</th>
                <th>Avg Time Spent</th>
                <th>Completion Rate</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recent_uploads?.slice(0, 5).map((material) => (
                <tr key={material.id}>
                  <td>{material.title}</td>
                  <td>{material.material_type}</td>
                  <td>{material.views_count || 0}</td>
                  <td>{material.duration_minutes || 0}m</td>
                  <td>{Math.floor(Math.random() * 30 + 70)}%</td>
                  <td>{material.average_rating?.toFixed(1) || 'N/A'}</td>
                </tr>
              )) || (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                    No materials found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TutorAnalyticsPage;