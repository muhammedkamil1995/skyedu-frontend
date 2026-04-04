// src/pages/dashboard/LectureSchedulePage.tsx
import {
  Calendar as CalendarIcon,
  Clock,
  Link as LinkIcon,
  Loader2,
  PlayCircle,
  PlusCircle,
  Users,
  Video,
  X,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/LectureSchedulePage.css';
import Toast from '../../components/Toast';
import { getMyUpcomingSessions, type UpcomingSession } from '../../services/simulationService';

const LectureSchedulePage: React.FC = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<UpcomingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinInput, setJoinInput] = useState('');
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const data = await getMyUpcomingSessions();
        setSessions(data);
      } catch {
        setToast({ type: 'error', message: 'Failed to load lecture schedule' });
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const handleJoinWithCode = () => {
    let code = joinInput.trim();
    if (!code) {
      setToast({ type: 'error', message: 'Please enter a meeting code or link' });
      return;
    }
    // Extract code from full URL if user pasted a link
    const match = code.match(/\/meetings\/join\/([a-zA-Z0-9]+)/);
    if (match) {
      code = match[1];
    }
    setJoining(true);
    // Navigate directly – the meeting room will handle validation
    navigate(`/meetings/join/${code}`);
    setShowJoinModal(false);
    setJoinInput('');
    setJoining(false);
  };

  if (loading) {
    return (
      <div className="lecture-schedule-page loading">
        <div className="loading-spinner"><Loader2 size={32} className="spinner" /> Loading schedule...</div>
      </div>
    );
  }

  return (
    <div className="lecture-schedule-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Join Meeting Modal */}
      {showJoinModal && (
        <div className="modal-overlay" onClick={() => setShowJoinModal(false)}>
          <div className="join-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Join a Meeting</h3>
              <button className="modal-close" onClick={() => setShowJoinModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p>Enter the meeting code or full link provided by the host.</p>
              <input
                type="text"
                className="join-input"
                placeholder="e.g., abc123xyz or https://skyshield.com/meetings/join/abc123xyz"
                value={joinInput}
                onChange={(e) => setJoinInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleJoinWithCode()}
                autoFocus
              />
              <button
                className="join-submit-btn"
                onClick={handleJoinWithCode}
                disabled={joining}
              >
                {joining ? <Loader2 size={18} className="spinner" /> : <PlayCircle size={18} />}
                Join Meeting
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="page-header">
        <div className="header-left">
          <h1 className="page-title">Lecture Schedule</h1>
          <p className="page-subtitle">Join your live classes and instructor sessions</p>
        </div>
        <button className="join-meeting-btn" onClick={() => setShowJoinModal(true)}>
          <PlusCircle size={20} />
          <span>Join Meeting</span>
        </button>
      </div>

      {sessions.length === 0 ? (
        <div className="empty-state">
          <CalendarIcon size={48} />
          <p>No upcoming lectures scheduled. Check back later!</p>
          <button className="empty-join-btn" onClick={() => setShowJoinModal(true)}>
            <LinkIcon size={16} /> Join a meeting with code
          </button>
        </div>
      ) : (
        <div className="sessions-grid">
          {sessions.map((session) => (
            <div key={session.id} className="session-card">
              <div className="session-header">
                <div className="session-icon"><Video size={24} /></div>
                <div className="session-meta">
                  <span className="session-type">{session.session_type || 'Live Class'}</span>
                  <span className="session-status scheduled">Scheduled</span>
                </div>
              </div>
              <div className="session-content">
                <h3>{session.title}</h3>
                <p className="session-description">{session.description}</p>
                <div className="session-details">
                  <div className="detail">
                    <CalendarIcon size={14} />
                    <span>{formatDate(session.start_time)}</span>
                  </div>
                  <div className="detail">
                    <Clock size={14} />
                    <span>Duration: {session.duration_minutes || 60} min</span>
                  </div>
                  <div className="detail">
                    <Users size={14} />
                    <span>Max {session.max_attendees || 50} participants</span>
                  </div>
                </div>
              </div>
              <div className="session-footer">
                {session.join_link ? (
                  <a href={session.join_link} target="_blank" rel="noopener noreferrer" className="join-btn">
                    <PlayCircle size={18} /> Join Now
                  </a>
                ) : (
                  <button className="join-btn disabled" disabled>Link coming soon</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LectureSchedulePage;