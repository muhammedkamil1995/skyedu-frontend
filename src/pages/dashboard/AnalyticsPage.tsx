// src/pages/dashboard/DashboardAnalyticsPage.tsx
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { getAllSessions } from '../../services/simulationService';
import { getUserCertifications } from '../../services/simulationService';
import Toast from '../../components/Toast';
import '../../assets/css/AnalyticsPage.css';

interface DashboardStats {
  totalSimulations: number;
  avgScore: number;
  certificationsEarned: number;
  totalHours: number;
  weeklyProgress: { day: string; count: number }[];
  completionRate: number;
  performanceTrend: { date: string; score: number }[];
}

const DashboardAnalyticsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        
        // Fetch all simulation sessions
        const allSessions = await getAllSessions();
        
        // Fetch certifications
        const certifications = await getUserCertifications();
        const completedCerts = certifications.filter(c => c.status === 'completed').length;
        
        // Calculate stats
        const completedSessions = allSessions.filter(s => s.status === 'completed');
        const totalSimulations = completedSessions.length;
        const totalScore = completedSessions.reduce((sum, s) => sum + (s.score || 0), 0);
        const avgScore = totalSimulations > 0 ? Math.round(totalScore / totalSimulations) : 0;
        
        // Total training hours (time_spent is in seconds)
        const totalSeconds = allSessions.reduce((sum, s) => sum + s.time_spent, 0);
        const totalHours = Math.round(totalSeconds / 3600);
        
        // Weekly progress (last 7 days, count of simulations completed per day)
        const today = new Date();
        const weeklyData: Record<string, number> = {};
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          weeklyData[dayName] = 0;
        }
        
        completedSessions.forEach(session => {
          if (session.completed_at) {
            const completedDate = new Date(session.completed_at);
            const diffDays = Math.floor((today.getTime() - completedDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays >= 0 && diffDays < 7) {
              const dayName = completedDate.toLocaleDateString('en-US', { weekday: 'short' });
              weeklyData[dayName] = (weeklyData[dayName] || 0) + 1;
            }
          }
        });
        
        const weeklyProgress = Object.entries(weeklyData).map(([day, count]) => ({ day, count }));
        
        // Completion rate (percentage of passed simulations)
        const passedCount = completedSessions.filter(s => s.passed === true).length;
        const completionRate = totalSimulations > 0 ? Math.round((passedCount / totalSimulations) * 100) : 0;
        
        // Performance trend (last 7 days, average score per day)
        const trendMap: Record<string, { total: number; count: number }> = {};
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          trendMap[dateStr] = { total: 0, count: 0 };
        }
        
        completedSessions.forEach(session => {
          if (session.completed_at && session.score) {
            const dateStr = session.completed_at.split('T')[0];
            if (trendMap[dateStr]) {
              trendMap[dateStr].total += session.score;
              trendMap[dateStr].count += 1;
            }
          }
        });
        
        const performanceTrend = Object.entries(trendMap).map(([date, { total, count }]) => ({
          date,
          score: count > 0 ? Math.round(total / count) : 0,
        }));
        
        setStats({
          totalSimulations,
          avgScore,
          certificationsEarned: completedCerts,
          totalHours,
          weeklyProgress,
          completionRate,
          performanceTrend,
        });
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
        setToast({ type: 'error', message: 'Failed to load analytics data' });
        // Fallback to empty stats
        setStats({
          totalSimulations: 0,
          avgScore: 0,
          certificationsEarned: 0,
          totalHours: 0,
          weeklyProgress: [],
          completionRate: 0,
          performanceTrend: [],
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
  }, []);

  // Find max count for bar chart scaling
  const maxWeeklyCount = Math.max(...(stats?.weeklyProgress.map(w => w.count) || [0]), 1);

  if (loading) {
    return (
      <div className="dashboard-page analytics-page loading">
        <div className="loading-spinner"><Loader2 size={32} className="spinner" /> Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-page analytics-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="welcome-header">
        <div className="welcome-content">
          <h1 className="welcome-title">
            Performance <span className="gradient-text">Analytics</span>
          </h1>
          <p className="welcome-subtitle">
            Deep insights into learning progress, simulations, and certifications
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <section className="analytics-kpis">
        <div className="kpi-card">
          <h4>Total Simulations</h4>
          <span className="kpi-value">{stats?.totalSimulations ?? 0}</span>
          <span className="kpi-trend neutral">Completed</span>
        </div>

        <div className="kpi-card">
          <h4>Avg Score</h4>
          <span className="kpi-value">{stats?.avgScore ?? 0}%</span>
          <span className="kpi-trend neutral">Overall</span>
        </div>

        <div className="kpi-card">
          <h4>Certifications</h4>
          <span className="kpi-value">{stats?.certificationsEarned ?? 0}</span>
          <span className="kpi-trend neutral">Earned</span>
        </div>

        <div className="kpi-card">
          <h4>Training Hours</h4>
          <span className="kpi-value">{stats?.totalHours ?? 0}h</span>
          <span className="kpi-trend neutral">Total time</span>
        </div>
      </section>

      {/* Charts */}
      <section className="analytics-grid">
        {/* Weekly Training Progress (Bar Chart) */}
        <div className="analytics-card">
          <h3>Weekly Training Progress</h3>
          <div className="bar-chart">
            {(stats?.weeklyProgress.length ? stats.weeklyProgress : [
              { day: 'Mon', count: 0 }, { day: 'Tue', count: 0 }, { day: 'Wed', count: 0 },
              { day: 'Thu', count: 0 }, { day: 'Fri', count: 0 }, { day: 'Sat', count: 0 },
              { day: 'Sun', count: 0 }
            ]).map((item) => (
              <div key={item.day} className="bar-item">
                <div
                  className="bar-fill"
                  style={{ height: `${(item.count / maxWeeklyCount) * 100}%` }}
                />
                <span>{item.day}</span>
                <small>{item.count}</small>
              </div>
            ))}
          </div>
        </div>

        {/* Completion Rate (Circular Progress) */}
        <div className="analytics-card">
          <h3>Completion Rate</h3>
          <div className="circle-chart">
            <svg viewBox="0 0 36 36">
              <path
                className="circle-bg"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle-progress"
                strokeDasharray={`${stats?.completionRate ?? 0}, 100`}
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="circle-value">
              <span>{stats?.completionRate ?? 0}%</span>
              <small>Passed</small>
            </div>
          </div>
        </div>

        {/* Performance Trend (Line Chart) */}
        <div className="analytics-card wide">
          <h3>Performance Trend (Last 7 Days)</h3>
          <div className="line-chart">
            {stats?.performanceTrend && stats.performanceTrend.length > 0 ? (
              <div className="line-chart-container">
                <svg viewBox="0 0 600 200" preserveAspectRatio="none">
                  <polyline
                    className="line-path"
                    points={stats.performanceTrend.map((point, i) => {
                      const x = (i / (stats.performanceTrend.length - 1)) * 600;
                      const y = 200 - (point.score / 100) * 180;
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="line-labels">
                  {stats.performanceTrend.map((point, i) => (
                    <div key={i} className="line-label">
                      <span>{new Date(point.date).toLocaleDateString(undefined, { weekday: 'short' })}</span>
                      <small>{point.score}%</small>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="empty-chart">No data available</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardAnalyticsPage;