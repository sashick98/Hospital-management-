import React from 'react';

function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: 'bi-grid-fill', tooltip: 'Consultant Clinical Dashboard' },
    { id: 'patients', name: 'Patients', icon: 'bi-clipboard2-pulse-fill', tooltip: 'Patient Records & Directory' },
    { id: 'appointments', name: 'Visits', icon: 'bi-calendar2-check-fill', tooltip: 'Appointments & Consultations' },
    { id: 'doctors', name: 'Doctors', icon: 'bi-person-badge-fill', tooltip: 'Medical Staff & Specialists' },
    { id: 'contracts', name: 'API Guide', icon: 'bi-link-45deg', tooltip: 'Express API Specs & Learning' },
    { id: 'landing', name: 'Portal', icon: 'bi-shield-check', tooltip: 'Public Hospital Portal' },
  ];

  return (
    <aside className="careplus-sidebar c9-sidebar">
      {/* CarePlus Brand Logo */}
      <div 
        className="d-flex flex-column align-items-center mb-3 mt-1 text-decoration-none"
        style={{ cursor: 'pointer', userSelect: 'none' }}
        onClick={() => setActivePage('dashboard')}
        title="CarePlus Healthcare Suite & Consultant Portal"
      >
        {/* CarePlus Emblem with vibrant cyan medical plus */}
        <div 
          className="d-flex align-items-center justify-content-center rounded-3 shadow-sm mb-1 position-relative"
          style={{ 
            width: 38, 
            height: 38, 
            background: 'linear-gradient(135deg, #0284C7 0%, #06B6D4 100%)',
            boxShadow: '0 4px 14px rgba(6, 182, 212, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.25)'
          }}
        >
          <i className="bi bi-plus-lg text-white" style={{ fontSize: '1.25rem', fontWeight: 800 }}></i>
        </div>

        <div className="text-center" style={{ lineHeight: 1.1 }}>
          <span 
            className="fw-bolder" 
            style={{ 
              fontSize: '0.88rem', 
              color: '#FFFFFF', 
              letterSpacing: '-0.02em'
            }}
          >
            Care<span style={{ color: '#38BDF8' }}>Plus</span>
          </span>
          <span 
            className="d-block text-uppercase"
            style={{ 
              fontSize: '0.52rem', 
              color: 'rgba(255, 255, 255, 0.6)', 
              letterSpacing: '0.12em',
              fontWeight: 700,
              marginTop: 2
            }}
          >
            HOSPITAL
          </span>
        </div>
      </div>

      <div 
        className="w-75 mb-3" 
        style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
      ></div>

      {/* Vertical Navigation Icons with Names Kept Underneath */}
      <nav className="d-flex flex-column align-items-center flex-grow-1 w-100">
        {menuItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`careplus-nav-btn c9-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActivePage(item.id)}
              title={item.tooltip}
              aria-label={item.name}
            >
              <i className={`bi ${item.icon} careplus-nav-icon`}></i>
              <span className="careplus-nav-label">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* CarePlus System Live Status at bottom */}
      <div className="mt-auto text-center px-1 pb-2">
        <div 
          style={{ 
            fontSize: '0.58rem', 
            color: 'rgba(255, 255, 255, 0.5)', 
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            lineHeight: 1.2
          }}
        >
          CarePlus OS
        </div>
        <div 
          style={{ 
            fontSize: '0.74rem', 
            fontWeight: 700, 
            color: '#38BDF8', 
            letterSpacing: '0.02em' 
          }}
        >
          v2.4 Live
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

