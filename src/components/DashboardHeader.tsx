import React, { useState, useEffect } from 'react';
import { Bell, Search, Menu, Sun, Moon, LogOut, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import NotificationPanel from './NotificationPanel';
import '../assets/css/DashboardHeader.css';

interface DashboardHeaderProps {
  onMobileToggle: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onMobileToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  const [notificationsCount] = useState(3); // Will be fetched from backend later

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const displayName = user?.full_name || user?.email?.split('@')[0] || 'User';
  const displayRole = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Guest';
  const avatarUrl = user?.profile_picture || null;

  // Determine which dashboard the user belongs to (trainee or tutor)
  const isTrainee = user?.role === 'trainee';
  const profilePath = isTrainee ? '/dashboard/profile' : '/tutor/profile';
  const settingsPath = isTrainee ? '/dashboard/settings' : '/tutor/settings';

  return (
    <>
      <header className="dashboard-header">
        <div className="header-left">
          <button className="mobile-toggle" onClick={onMobileToggle}>
            <Menu size={24} />
          </button>
          <div className="search-container">
            <div className="search-bar">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search simulations, reports, users..."
                className="search-input"
              />
            </div>
          </div>
        </div>

        <div className="header-right">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="notifications">
            <button className="notification-btn" onClick={() => setNotificationsPanelOpen(true)}>
              <Bell size={20} />
              {notificationsCount > 0 && <span className="notification-badge">{notificationsCount}</span>}
            </button>
          </div>

          <div className="user-menu">
            <div className="user-avatar">
              {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} className="avatar-image" />
              ) : (
                <div className="avatar-placeholder">
                  <User size={20} />
                </div>
              )}
            </div>
            <div className="user-info">
              <span className="user-name">{displayName}</span>
              <span className="user-role">{displayRole}</span>
            </div>
            <div className="user-dropdown">
              <div className="dropdown-content">
                <button className="dropdown-item" onClick={() => navigate(profilePath)}>
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button className="dropdown-item" onClick={() => navigate(settingsPath)}>
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <button className="dropdown-item" onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <NotificationPanel isOpen={notificationsPanelOpen} onClose={() => setNotificationsPanelOpen(false)} />
    </>
  );
};

export default DashboardHeader;