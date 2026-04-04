// src/components/NotificationPanel.tsx
import React, { useState, useEffect } from 'react';
import { X, Bell, CheckCheck, MessageSquare, Award, Calendar } from 'lucide-react';
import '../assets/css/NotificationPanel.css';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'meeting' | 'content' | 'graded';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'meeting',
      title: 'New Meeting Invitation',
      message: 'You have been invited to "Cybersecurity Best Practices" meeting at 3:00 PM today.',
      time: '5 min ago',
      read: false,
    },
    {
      id: '2',
      type: 'content',
      title: 'New Course Material',
      message: 'Your instructor uploaded new material for "Network Security Fundamentals".',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'graded',
      title: 'Assessment Graded',
      message: 'Your simulation "Phishing Attack Simulation" has been graded. Score: 92%.',
      time: '2 hours ago',
      read: true,
    },
    {
      id: '4',
      type: 'info',
      title: 'Achievement Unlocked',
      message: 'You earned the "Security Champion" badge!',
      time: 'Yesterday',
      read: true,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return <Calendar size={18} />;
      case 'content':
        return <MessageSquare size={18} />;
      case 'graded':
        return <Award size={18} />;
      default:
        return <Bell size={18} />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && <div className="notification-overlay" onClick={onClose} />}
      <div className={`notification-panel ${isOpen ? 'open' : ''}`}>
        <div className="panel-header">
          <div className="header-title">
            <Bell size={20} />
            <h3>Notifications</h3>
            {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="panel-actions">
          {unreadCount > 0 && (
            <button className="mark-all-btn" onClick={markAllAsRead}>
              <CheckCheck size={16} />
              <span>Mark all as read</span>
            </button>
          )}
        </div>
        <div className="notifications-list">
          {notifications.length === 0 ? (
            <div className="empty-state">
              <Bell size={40} />
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map(notification => (
              <div
                key={notification.id}
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className={`notification-icon ${notification.type}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="notification-content">
                  <div className="notification-title">{notification.title}</div>
                  <div className="notification-message">{notification.message}</div>
                  <div className="notification-time">{notification.time}</div>
                </div>
                {!notification.read && <div className="unread-dot" />}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;