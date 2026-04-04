// src/pages/tutor/TutorSchedulePage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  Calendar,
  Video,
  Users,
  Clock,
  ExternalLink,
  Edit,
  Trash2,
  CheckCircle,
  Link as LinkIcon,
  Bell,
} from 'lucide-react';
import { getTeachingSessions, deleteTeachingSession, getMeetings, deleteMeeting } from '../../services/tutorService';
import type { TeachingSession, Meeting, ScheduleItem } from '../../types/tutor';
import { getStartTime, getEndTime, getJoinLink, getRecordingUrl } from '../../types/tutor';
import Toast from '../../components/Toast';
import ScheduleMeetingModal from '../../components/ScheduleMeetingModal';
import ScheduleSessionModal from '../../components/ScheduleSessionModal';
import ConfirmationModal from '../../components/ConfirmationModal';
import '../../assets/css/TutorSchedulePage.css';

const TutorSchedulePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [upcomingSessions, setUpcomingSessions] = useState<TeachingSession[]>([]);
  const [pastSessions, setPastSessions] = useState<TeachingSession[]>([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState<Meeting[]>([]);
  const [pastMeetings, setPastMeetings] = useState<Meeting[]>([]);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);

  // Confirmation modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const fetchSessions = useCallback(async () => {
    try {
      const [upcoming, past] = await Promise.all([
        getTeachingSessions({ status: 'upcoming' }),
        getTeachingSessions({ status: 'ended' }),
      ]);
      setUpcomingSessions(upcoming);
      setPastSessions(past);
    } catch {
      setToast({ type: 'error', message: 'Failed to load teaching sessions' });
    }
  }, []);

  const fetchMeetings = useCallback(async () => {
    try {
      const [upcoming, past] = await Promise.all([
        getMeetings({ status: 'scheduled' }),
        getMeetings({ status: 'ended' }),
      ]);
      setUpcomingMeetings(upcoming);
      setPastMeetings(past);
    } catch {
      setToast({ type: 'error', message: 'Failed to load meetings' });
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchSessions(), fetchMeetings()]);
      setLoading(false);
    };
    loadData();
  }, [fetchSessions, fetchMeetings]);

  const handleDeleteSession = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Teaching Session',
      message: 'Are you sure you want to delete this teaching session? This action cannot be undone.',
      onConfirm: async () => {
        try {
          await deleteTeachingSession(id);
          setToast({ type: 'success', message: 'Session deleted' });
          await fetchSessions();
        } catch {
          setToast({ type: 'error', message: 'Failed to delete session' });
        } finally {
          setConfirmModal(prev => ({ ...prev, isOpen: false }));
        }
      },
    });
  };

  const handleDeleteMeeting = (id: string) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Meeting',
      message: 'Are you sure you want to delete this meeting? This action cannot be undone.',
      onConfirm: async () => {
        try {
          await deleteMeeting(id);
          setToast({ type: 'success', message: 'Meeting deleted' });
          await fetchMeetings();
        } catch {
          setToast({ type: 'error', message: 'Failed to delete meeting' });
        } finally {
          setConfirmModal(prev => ({ ...prev, isOpen: false }));
        }
      },
    });
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

  const formatTimeRange = (start: string, end: string) => {
    const fmt = (d: string) =>
      new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${fmt(start)} – ${fmt(end)}`;
  };

  const combinedUpcoming: ScheduleItem[] = [
    ...upcomingSessions.map(s => ({ ...s, type: 'session' as const })),
    ...upcomingMeetings.map(m => ({ ...m, type: 'meeting' as const })),
  ].sort((a, b) => new Date(getStartTime(a)).getTime() - new Date(getStartTime(b)).getTime());

  const combinedPast: ScheduleItem[] = [
    ...pastSessions.map(s => ({ ...s, type: 'session' as const })),
    ...pastMeetings.map(m => ({ ...m, type: 'meeting' as const })),
  ].sort((a, b) => new Date(getStartTime(b)).getTime() - new Date(getStartTime(a)).getTime());

  if (loading) {
    return (
      <div className="tutor-schedule-page loading">
        <div className="loading-spinner">Loading schedule…</div>
      </div>
    );
  }

  return (
    <div className="tutor-schedule-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">Schedule &amp; Sessions</h1>
          <p className="page-subtitle">Manage your lectures, workshops, and meetings</p>
        </div>
        <div className="header-buttons">
          <button className="schedule-button" onClick={() => setShowMeetingModal(true)}>
            <Video size={20} />
            <span>Internal Meeting</span>
          </button>
          <button className="schedule-button secondary" onClick={() => setShowSessionModal(true)}>
            <Calendar size={20} />
            <span>Teaching Session</span>
          </button>
        </div>
      </div>

      {/* Mini Calendar */}
      <div className="calendar-section">
        <div className="calendar-header">
          <h3>{new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
        </div>
        <div className="calendar-grid">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="calendar-day-header">{day}</div>
          ))}
          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
            <div key={day} className={`calendar-day${day === new Date().getDate() ? ' today' : ''}`}>
              <span className="day-number">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming */}
      <section className="sessions-section">
        <h3>Upcoming</h3>
        <div className="sessions-grid">
          {combinedUpcoming.length === 0 ? (
            <div className="empty-state">No upcoming sessions or meetings</div>
          ) : (
            combinedUpcoming.map(item => (
              <div key={`${item.type}-${item.id}`} className="session-card">
                <div className="session-header">
                  <div className="session-icon"><Video size={24} /></div>
                  <div className="session-actions">
                    <button className="icon-btn"><Edit size={16} /></button>
                    <button
                      className="icon-btn delete"
                      onClick={() =>
                        item.type === 'session'
                          ? handleDeleteSession(item.id)
                          : handleDeleteMeeting(item.id)
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="session-content">
                  <h4>{item.title}</h4>
                  <p className="session-description">{item.description}</p>
                  <div className="session-details">
                    <div className="detail"><Calendar size={14} /><span>{formatDate(getStartTime(item))}</span></div>
                    <div className="detail"><Clock size={14} /><span>{formatTimeRange(getStartTime(item), getEndTime(item))}</span></div>
                    <div className="detail"><Users size={14} /><span>
                      {item.type === 'session'
                        ? `${item.current_attendees ?? 0} / ${item.max_attendees ?? 0} attendees`
                        : `${item.participant_count ?? 0} / ${item.max_participants ?? 0} participants`}
                    </span></div>
                    <div className="detail"><LinkIcon size={14} /><span>
                      {item.type === 'session'
                        ? (item.platform || 'External')
                        : item.meeting_type === 'internal' ? 'Internal Meeting' : item.meeting_type}
                    </span></div>
                  </div>
                  <div className="session-status">
                    <span className={`status ${item.status}`}>
                      {item.status === 'confirmed' || item.status === 'scheduled' ? (
                        <><CheckCircle size={12} /> Scheduled</>
                      ) : item.status}
                    </span>
                  </div>
                </div>
                <div className="session-footer">
                  {getJoinLink(item) ? (
                    <a href={getJoinLink(item)} target={item.type === 'session' ? '_blank' : undefined} rel="noopener noreferrer" className="join-link">
                      <ExternalLink size={16} /> Join {item.type === 'meeting' ? 'Meeting' : 'Session'}
                    </a>
                  ) : (
                    <button className="join-link disabled" disabled>No link yet</button>
                  )}
                  <button className="reminder-btn"><Bell size={16} /> Set Reminder</button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Past */}
      <section className="sessions-section">
        <h3>Past</h3>
        <div className="sessions-grid">
          {combinedPast.length === 0 ? (
            <div className="empty-state">No past sessions or meetings</div>
          ) : (
            combinedPast.map(item => (
              <div key={`${item.type}-${item.id}`} className="session-card past">
                <div className="session-header"><div className="session-icon"><Video size={24} /></div></div>
                <div className="session-content">
                  <h4>{item.title}</h4>
                  <p className="session-description">{item.description}</p>
                  <div className="session-details">
                    <div className="detail"><Calendar size={14} /><span>{formatDate(getStartTime(item))}</span></div>
                    <div className="detail"><Clock size={14} /><span>{formatTimeRange(getStartTime(item), getEndTime(item))}</span></div>
                    <div className="detail"><Users size={14} /><span>
                      {item.type === 'session' ? `${item.current_attendees ?? 0} attendees` : `${item.participant_count ?? 0} participants`}
                    </span></div>
                  </div>
                  <div className="session-status"><span className="status completed"><CheckCircle size={12} /> Completed</span></div>
                </div>
                <div className="session-footer">
                  {getRecordingUrl(item) ? (
                    <a href={getRecordingUrl(item)} target="_blank" rel="noopener noreferrer" className="review-btn">View Recording</a>
                  ) : (
                    <button className="review-btn" disabled>No recording</button>
                  )}
                  <button className="stats-btn">View Statistics</button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Modals */}
      {showMeetingModal && (
        <ScheduleMeetingModal
          onClose={() => setShowMeetingModal(false)}
          onCreated={() => fetchMeetings()}
        />
      )}
      {showSessionModal && (
        <ScheduleSessionModal
          onClose={() => setShowSessionModal(false)}
          onCreated={() => fetchSessions()}
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
};

export default TutorSchedulePage;