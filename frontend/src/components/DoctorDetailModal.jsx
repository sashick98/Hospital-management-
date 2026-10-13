import React from 'react';

function DoctorDetailModal({ doctor, onClose, onBookAppointment }) {
  if (!doctor) return null;

  const isAvail = doctor.availability === 'Available';
  const isInSurgery = doctor.availability === 'In Surgery';

  // Fallback focus areas based on department
  const getFocusAreas = (dept) => {
    switch (dept) {
      case 'Cardiology':
        return ['Preventative Cardiology', 'Coronary Angioplasty', 'Heart Rhythm Care', 'Echocardiography'];
      case 'Neurology':
        return ['Stroke Prevention', 'Spine & Neural Rehabilitation', 'Migraine Therapeutics', 'Memory Assessment'];
      case 'Pediatrics':
        return ['Neonatal Care', 'Developmental Milestones', 'Childhood Immunizations', 'Pediatric Allergy'];
      case 'Orthopedics':
        return ['Joint Replacement', 'Arthroscopy', 'Sports Injury Rehabilitation', 'Spine Care'];
      case 'General Medicine':
        return ['Preventative Screening', 'Chronic Disease Care', 'Metabolic Health', 'Wellness Consultations'];
      case 'Dermatology':
        return ['Clinical Dermatology', 'Laser Therapeutics', 'Biopsy Screening', 'Skin Allergy Treatment'];
      default:
        return ['Comprehensive Patient Care', 'Clinical Diagnosis', 'Preventative Medicine', 'Specialist Consults'];
    }
  };

  const focusAreas = doctor.focusAreas || getFocusAreas(doctor.department);
  const bio = doctor.bio || `Dr. ${doctor.name.replace(/^Dr\.\s*/, '')} is a dedicated clinician with ${doctor.experience || 'extensive experience'} in ${doctor.department}. Committed to compassionate, evidence-based care in a tranquil and restorative clinical environment.`;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 1060,
      }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-content rounded-4 overflow-hidden border-0 shadow-lg"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #BAE6FD' }}
        >
          {/* CarePlus Executive Royal Blue & Midnight Navy Cover Banner */}
          <div
            className="position-relative"
            style={{
              height: 125,
              background: 'linear-gradient(135deg, #0B2545 0%, #134074 50%, #0284C7 100%)',
            }}
          >
            <button
              type="button"
              className="btn-close btn-close-white position-absolute top-0 end-0 m-3 shadow-none"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          {/* Overlapping Avatar & Header Info */}
          <div className="px-4 pb-3 position-relative" style={{ borderBottom: '1px solid #F1F5F9' }}>
            <div className="d-flex align-items-end gap-3 flex-wrap" style={{ marginTop: -50 }}>
              <div
                className="position-relative"
                style={{ width: 100, height: 100, flexShrink: 0 }}
              >
                <img
                  src={doctor.photo || '/images/doctors/dr_sarah_smith.jpg'}
                  alt={doctor.name}
                  className="rounded-circle w-100 h-100 object-fit-cover shadow"
                  style={{ border: '4px solid #FFFFFF', backgroundColor: '#F8FAFC' }}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/doctors/dr_sarah_smith.jpg';
                  }}
                />
                <span
                  className={`doctor-status-badge ${
                    isAvail
                      ? 'doctor-status-available'
                      : isInSurgery
                      ? 'doctor-status-busy'
                      : 'doctor-status-leave'
                  }`}
                  style={{ width: 18, height: 18, bottom: 2, right: 2 }}
                  title={doctor.availability || 'Available'}
                ></span>
              </div>

              <div className="flex-grow-1 pt-2">
                <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
                  <span 
                    className="badge rounded-pill px-3 py-1 fw-bold" 
                    style={{ backgroundColor: '#F0F9FF', color: '#0369A1', border: '1px solid #BAE6FD', fontSize: '0.8rem' }}
                  >
                    {doctor.department}
                  </span>
                  <span
                    className={`badge fw-bold px-3 py-1 border ${
                      isAvail
                        ? 'bg-success-subtle text-success border-success-subtle'
                        : isInSurgery
                        ? 'bg-warning-subtle text-warning border-warning-subtle'
                        : 'bg-secondary-subtle text-secondary border-secondary-subtle'
                    }`}
                  >
                    <i className="bi bi-circle-fill me-1" style={{ fontSize: '0.5rem' }}></i>
                    {doctor.availability || 'Available'}
                  </span>
                </div>

                <h3 className="fw-bolder mb-1 text-dark" style={{ letterSpacing: '-0.02em' }}>
                  {doctor.name}
                </h3>
                <p className="fw-semibold mb-2" style={{ color: '#0284C7', fontSize: '0.95rem' }}>
                  {doctor.specialization || doctor.department}
                </p>

                <div className="d-flex align-items-center gap-3 text-secondary small flex-wrap">
                  <span className="careplus-doc-rating">
                    <i className="bi bi-star-fill text-warning"></i>
                    {doctor.rating || 4.9} ({doctor.reviewsCount || 120} reviews)
                  </span>
                  {doctor.experience && (
                    <span>
                      <i className="bi bi-award-fill text-primary me-1"></i>
                      {doctor.experience} experience
                    </span>
                  )}
                  {doctor.room && (
                    <span>
                      <i className="bi bi-geo-alt-fill text-primary me-1"></i>
                      {doctor.room}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="modal-body p-4">
            <div className="row g-4">
              {/* Left Column: Bio & Clinical Focus */}
              <div className="col-12 col-md-7">
                <div className="mb-4">
                  <h6 className="fw-bold text-dark d-flex align-items-center gap-2 mb-2">
                    <i className="bi bi-file-earmark-person-fill text-dark"></i>
                    About Specialist
                  </h6>
                  <p className="text-secondary small mb-0" style={{ lineHeight: 1.7 }}>
                    {bio}
                  </p>
                </div>

                <div className="mb-4">
                  <h6 className="fw-bold text-dark d-flex align-items-center gap-2 mb-2">
                    <i className="bi bi-check2-circle text-dark"></i>
                    Clinical Focus &amp; Expertise
                  </h6>
                  <div className="d-flex flex-wrap gap-2">
                    {focusAreas.map((item, idx) => (
                      <span
                        key={idx}
                        className="badge bg-white text-dark border px-3 py-2 fw-medium"
                        style={{ fontSize: '0.8rem', borderColor: '#E5E5E5' }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {doctor.education && (
                  <div>
                    <h6 className="fw-bold text-dark d-flex align-items-center gap-2 mb-2">
                      <i className="bi bi-mortarboard-fill text-dark"></i>
                      Medical Education &amp; Credentials
                    </h6>
                    <div className="p-3 rounded-3 border bg-light small text-secondary">
                      <i className="bi bi-shield-check text-dark me-2"></i>
                      <strong>{doctor.education}</strong>
                      <div className="mt-1 text-muted" style={{ fontSize: '0.78rem' }}>
                        Board Certified &bull; Licensed Medical Practitioner
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Contact & Availability Info */}
              <div className="col-12 col-md-5">
                <div
                  className="p-3 rounded-4 border mb-3"
                  style={{ backgroundColor: '#F5F5F5', borderColor: '#E5E5E5' }}
                >
                  <h6 className="fw-bold text-dark mb-3 small text-uppercase tracking-wider">
                    <i className="bi bi-clock-fill text-dark me-2"></i>
                    Consultation Hours
                  </h6>
                  <div className="d-flex justify-content-between small text-secondary py-1 border-bottom">
                    <span>Monday &ndash; Friday</span>
                    <strong className="text-dark">08:30 AM &ndash; 04:30 PM</strong>
                  </div>
                  <div className="d-flex justify-content-between small text-secondary py-1 border-bottom">
                    <span>Saturday</span>
                    <strong className="text-dark">09:00 AM &ndash; 01:00 PM</strong>
                  </div>
                  <div className="d-flex justify-content-between small text-secondary py-1">
                    <span>Emergency / On Call</span>
                    <strong className="text-dark">24/7 Available</strong>
                  </div>
                </div>

                <div
                  className="p-3 rounded-4 border"
                  style={{ backgroundColor: '#F5F5F5', borderColor: '#E5E5E5' }}
                >
                  <h6 className="fw-bold text-dark mb-3 small text-uppercase tracking-wider">
                    <i className="bi bi-person-lines-fill text-dark me-2"></i>
                    Direct Contacts
                  </h6>
                  {doctor.phone && (
                    <div className="mb-2 small">
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>Phone Extension:</div>
                      <a href={`tel:${doctor.phone}`} className="text-dark fw-bold text-decoration-none">
                        <i className="bi bi-telephone-outbound text-dark me-1"></i>
                        {doctor.phone}
                      </a>
                    </div>
                  )}
                  {doctor.email && (
                    <div className="small">
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>Direct Email:</div>
                      <a href={`mailto:${doctor.email}`} className="text-dark fw-bold text-decoration-none text-truncate d-block">
                        <i className="bi bi-envelope-at text-dark me-1"></i>
                        {doctor.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div
            className="modal-footer p-3 justify-content-between"
            style={{ backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}
          >
            <span className="text-secondary small font-monospace">
              Specialist ID: #{String(doctor.id || doctor._id || '201').substring(0, 6)}
            </span>
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-2 fw-semibold" onClick={onClose}>
                Close
              </button>
              {onBookAppointment && (
                <button
                  type="button"
                  className="btn btn-sm px-4 py-2 text-white fw-bold rounded-pill shadow-sm"
                  style={{ backgroundColor: '#0284C7' }}
                  onClick={() => {
                    onClose();
                    onBookAppointment(doctor);
                  }}
                >
                  <i className="bi bi-calendar2-check me-2"></i>
                  Schedule Appointment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetailModal;
