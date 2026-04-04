// src/pages/dashboard/LearningMaterialsPage.tsx
import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Video,
  FileText,
  Clock,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { getMyLearningMaterials, type LearningMaterial } from '../../services/simulationService';
import Toast from '../../components/Toast';
import '../../assets/css/LearningMaterialsPage.css';

const LearningMaterialsPage: React.FC = () => {
  const [materials, setMaterials] = useState<LearningMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoading(true);
        const data = await getMyLearningMaterials();
        setMaterials(data);
      } catch {
        setToast({ type: 'error', message: 'Failed to load learning materials' });
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={20} />;
      case 'document': return <FileText size={20} />;
      default: return <BookOpen size={20} />;
    }
  };

  if (loading) {
    return (
      <div className="learning-materials-page loading">
        <div className="loading-spinner"><Loader2 size={32} className="spinner" /> Loading materials...</div>
      </div>
    );
  }

  return (
    <div className="learning-materials-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="page-header">
        <h1 className="page-title">Learning Materials</h1>
        <p className="page-subtitle">Access documents, videos, and resources from your tutors</p>
      </div>

      {materials.length === 0 ? (
        <div className="empty-state">
          <BookOpen size={48} />
          <p>No materials available yet. Check back later!</p>
        </div>
      ) : (
        <div className="materials-grid">
          {materials.map((material) => (
            <div key={material.id} className="material-card">
              <div className="material-icon">{getMaterialIcon(material.material_type)}</div>
              <div className="material-info">
                <h3>{material.title}</h3>
                <p>{material.description}</p>
                <div className="material-meta">
                  <span className="material-type">{material.material_type_display || material.material_type}</span>
                  <span className="material-difficulty">{material.difficulty_display || material.difficulty}</span>
                  {material.estimated_read_time && (
                    <span className="material-time">
                      <Clock size={12} /> {material.estimated_read_time} min
                    </span>
                  )}
                </div>
              </div>
              <div className="material-actions">
                {material.file_url || material.video_url ? (
                  <a href={material.file_url || material.video_url} target="_blank" rel="noopener noreferrer" className="view-btn">
                    <ExternalLink size={16} /> View
                  </a>
                ) : (
                  <button className="view-btn disabled" disabled>Preview</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningMaterialsPage;