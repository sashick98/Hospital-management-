import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Navbar({ activePage, setActivePage }) {
  const [backendStatus, setBackendStatus] = useState('checking'); // 'connected' | 'disconnected' | 'checking'

  const checkBackendHealth = async () => {
    setBackendStatus('checking');
    try {
      await api.get('/health', { timeout: 2000 });
      setBackendStatus('connected');
    } catch (err) {
      if (err.isNetworkError) {
        setBackendStatus('disconnected');
      } else {
        // Express responded with status code
        setBackendStatus('connected');
      }
    }
  };

  useEffect(() => {
    checkBackendHealth();
    const interval = setInterval(checkBackendHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="portal-topbar d-flex justify-content-between align-items-center flex-wrap gap-2">
      {/* Left: CarePlus Healthcare Brand Header */}
      <div className="d-flex align-items-center gap-3">
        <div className="d-flex align-items-center gap-2">
          <div 
            className="d-flex align-items-center justify-content-center rounded-2 shadow-sm"
            style={{ 
              width: 30, 
              height: 30, 
              background: 'linear-gradient(135deg, #0284C7 0%, #06B6D4 100%)',
              color: '#FFFFFF'
            }}
          >
            <i className="bi bi-plus-lg" style={{ fontSize: '0.95rem', fontWeight: 900 }}></i>
          </div>
          <div>
            <div style={{ fontSize: '0.62rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', lineHeight: 1 }}>
              CarePlus Health Network
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              Clinical OS
            </div>
          </div>
        </div>
        <span 
          className="badge rounded-pill border px-2 py-1 ms-1 d-none d-md-inline text-capitalize" 
          style={{ fontSize: '0.75rem', backgroundColor: '#F0F9FF', color: '#0369A1', borderColor: '#BAE6FD' }}
        >
          {activePage} Portal
        </span>
      </div>

      {/* Right: CHN-North, Doctor Thumbnail, Notification Bell with 4, Website & Backend Pill */}
      <div className="d-flex align-items-center gap-3">
        {/* Branch / Zone tag */}
        <span className="text-secondary fw-semibold small d-none d-sm-inline">
          CHN-North
        </span>

        {/* Doctor user avatar thumbnail with border */}
        <div 
          className="d-flex align-items-center gap-2"
          title="Dr. Sarah Smith, MD (Senior Interventional Cardiologist)"
        >
          <img 
            src="/images/doctors/dr_sarah_smith.jpg" 
            alt="Dr. Sarah Smith, MD" 
            className="rounded-circle border"
            style={{ width: 36, height: 36, objectFit: 'cover', borderColor: '#BAE6FD' }}
          />
        </div>

        {/* Notification Bell with CarePlus blue badge (4) */}
        <div 
          className="position-relative d-flex align-items-center justify-content-center rounded-circle bg-white border"
          style={{ width: 36, height: 36, cursor: 'pointer', borderColor: '#E2E8F0' }}
          title="4 Unread Clinical Alerts"
        >
          <i className="bi bi-bell-fill text-secondary"></i>
          <span 
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill shadow-sm"
            style={{ backgroundColor: '#0284C7', color: '#FFFFFF', fontSize: '0.62rem', padding: '0.22em 0.44em' }}
          >
            4
          </span>
        </div>

        {/* Toggle to Landing Page */}
        <button
          className="btn btn-sm btn-outline-dark rounded-pill fw-semibold px-3 py-1"
          onClick={() => setActivePage('landing')}
        >
          <i className="bi bi-arrow-left me-1"></i> Public Website
        </button>

        {/* Backend Connectivity Status Badge */}
        <div 
          className="d-flex align-items-center gap-2 px-3 py-1 bg-white rounded-pill"
          style={{ border: 'var(--pos-border)', boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)' }}
        >
          <small className="fw-semibold text-secondary d-none d-lg-inline">Backend:</small>
          {backendStatus === 'checking' && (
            <span className="badge bg-secondary-subtle text-dark border">
              <span className="spinner-border spinner-border-sm me-1" style={{ width: '0.65rem', height: '0.65rem' }}></span>
              Checking
            </span>
          )}
          {backendStatus === 'connected' && (
            <span 
              className="badge fw-bold d-flex align-items-center gap-1 border"
              style={{ backgroundColor: '#DCFCE7', color: '#15803D', borderColor: '#86EFAC' }}
            >
              <i className="bi bi-circle-fill" style={{ fontSize: '0.5rem', color: '#16A34A' }}></i> Live :5000
            </span>
          )}
          {backendStatus === 'disconnected' && (
            <span 
              className="badge bg-warning-subtle text-dark border border-warning d-flex align-items-center gap-1"
              title="Click to re-check Express server on http://localhost:5000"
              style={{ cursor: 'pointer' }}
              onClick={checkBackendHealth}
            >
              <i className="bi bi-exclamation-triangle-fill text-warning"></i> Offline
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
