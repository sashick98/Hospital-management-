import React, { useState, useEffect } from 'react';
import { getDoctors, createDoctor } from '../services/doctorService';
import ApiContractCard from '../components/ApiContractCard';
import DoctorDetailModal from '../components/DoctorDetailModal';

const PRESET_DOCTOR_PHOTOS = [
  { name: 'Dr. Sarah Smith', photo: '/images/doctors/dr_sarah_smith.jpg', dept: 'Cardiology' },
  { name: 'Dr. Michael Chen', photo: '/images/doctors/dr_michael_chen.jpg', dept: 'Neurology' },
  { name: 'Dr. Emily Watson', photo: '/images/doctors/dr_emily_watson.jpg', dept: 'Pediatrics' },
  { name: 'Dr. David Miller', photo: '/images/doctors/dr_david_miller.jpg', dept: 'Orthopedics' },
  { name: 'Dr. Amara Patel', photo: '/images/doctors/dr_amara_patel.jpg', dept: 'General Medicine' },
  { name: 'Dr. Robert Hayes', photo: '/images/doctors/dr_robert_hayes.jpg', dept: 'Dermatology' },
];

const DEFAULT_DOCTORS = [
  {
    id: '201',
    name: 'Dr. Sarah Smith, MD',
    specialization: 'Senior Cardiologist & Interventionalist',
    department: 'Cardiology',
    photo: '/images/doctors/dr_sarah_smith.jpg',
    phone: '+1 (555) 234-5678',
    email: 'dr.sarah@carepulse.org',
    experience: '8+ years',
    rating: 4.9,
    reviewsCount: 142,
    room: 'Suite 302, Heart Center',
    availability: 'Available',
    education: 'Johns Hopkins School of Medicine',
  },
  {
    id: '202',
    name: 'Dr. Michael Chen, MD',
    specialization: 'Chief Neurologist & Neurosurgeon',
    department: 'Neurology',
    photo: '/images/doctors/dr_michael_chen.jpg',
    phone: '+1 (555) 345-6789',
    email: 'dr.chen@carepulse.org',
    experience: '12+ years',
    rating: 4.95,
    reviewsCount: 198,
    room: 'Room 410, Brain & Spine Institute',
    availability: 'Available',
    education: 'Harvard Medical School',
  },
  {
    id: '203',
    name: 'Dr. Emily Watson, MD',
    specialization: 'Lead Pediatrician & Neonatologist',
    department: 'Pediatrics',
    photo: '/images/doctors/dr_emily_watson.jpg',
    phone: '+1 (555) 456-7890',
    email: 'dr.emily@carepulse.org',
    experience: '9+ years',
    rating: 4.88,
    reviewsCount: 165,
    room: 'Suite 104, Children Health Wing',
    availability: 'Available',
    education: 'Stanford University School of Medicine',
  },
  {
    id: '204',
    name: 'Dr. David Miller, MD',
    specialization: 'Orthopedic & Joint Surgeon',
    department: 'Orthopedics',
    photo: '/images/doctors/dr_david_miller.jpg',
    phone: '+1 (555) 567-8901',
    email: 'dr.david@carepulse.org',
    experience: '11+ years',
    rating: 4.92,
    reviewsCount: 120,
    room: 'OR Suite 2B, Orthopedic Pavilion',
    availability: 'In Surgery',
    education: 'Columbia University Vagelos College',
  },
  {
    id: '205',
    name: 'Dr. Amara Patel, MD',
    specialization: 'Internal Medicine & Family Physician',
    department: 'General Medicine',
    photo: '/images/doctors/dr_amara_patel.jpg',
    phone: '+1 (555) 678-9012',
    email: 'dr.amara@carepulse.org',
    experience: '7+ years',
    rating: 4.85,
    reviewsCount: 110,
    room: 'Clinic 108, Outpatient Center',
    availability: 'Available',
    education: 'Penn State College of Medicine',
  },
  {
    id: '206',
    name: 'Dr. Robert Hayes, MD',
    specialization: 'Chief of Surgery & Dermatology',
    department: 'Dermatology',
    photo: '/images/doctors/dr_robert_hayes.jpg',
    phone: '+1 (555) 789-0123',
    email: 'dr.hayes@carepulse.org',
    experience: '18+ years',
    rating: 4.97,
    reviewsCount: 230,
    room: 'Executive Suite 501, Surgical Tower',
    availability: 'Available',
    education: 'Yale School of Medicine',
  },
];

function DoctorsPage() {
  const [doctors, setDoctors] = useState(DEFAULT_DOCTORS);
  const [loading, setLoading] = useState(false);
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [alert, setAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const initialFormState = {
    name: '',
    specialization: '',
    department: 'Cardiology',
    photo: '/images/doctors/dr_sarah_smith.jpg',
    phone: '',
    email: '',
    experience: '5+ years',
    availability: 'Available',
    room: 'Clinic Suite 201',
    education: 'Medical College',
  };
  const [formData, setFormData] = useState(initialFormState);

  const doctorContracts = [
    {
      title: 'Get All Doctors',
      endpoint: '/api/doctors',
      method: 'GET',
      requestQuery: 'None',
      expectedResponse: [
        {
          id: '201',
          name: 'Dr. Sarah Smith, MD',
          specialization: 'Senior Cardiologist',
          department: 'Cardiology',
          photo: '/images/doctors/dr_sarah_smith.jpg',
          phone: '+1 (555) 234-5678',
          email: 'dr.sarah@carepulse.org',
          experience: '8+ years',
          availability: 'Available',
        },
      ],
      frontendAction: 'Renders doctor profile directory cards with photos and specialties.',
      expectedErrors: '500 Internal Server Error',
    },
    {
      title: 'Add New Doctor',
      endpoint: '/api/doctors',
      method: 'POST',
      requestBody: {
        name: 'Dr. Sarah Smith, MD',
        specialization: 'Senior Cardiologist',
        department: 'Cardiology',
        photo: '/images/doctors/dr_sarah_smith.jpg',
        phone: '+1 (555) 234-5678',
        email: 'dr.sarah@carepulse.org',
        experience: '8+ years',
        availability: 'Available',
      },
      expectedResponse: {
        message: 'Doctor added successfully',
        doctor: {
          id: '201',
          name: 'Dr. Sarah Smith, MD',
          department: 'Cardiology',
        },
      },
      frontendAction: 'Appends doctor into directory and closes modal.',
      expectedErrors: '400 Bad Request: { message: "Name and Department are required" }',
    },
  ];

  const fetchDoctorsList = async () => {
    setLoading(true);
    try {
      const data = await getDoctors();
      if (Array.isArray(data) && data.length > 0) {
        // Enrich any backend records that lack a photo with a matching preset photo
        const enriched = data.map((doc, idx) => ({
          ...doc,
          photo: doc.photo || PRESET_DOCTOR_PHOTOS[idx % PRESET_DOCTOR_PHOTOS.length].photo,
          rating: doc.rating || 4.9,
          reviewsCount: doc.reviewsCount || 85,
        }));
        setDoctors(enriched);
        setAlert({
          type: 'success',
          message: `Connected to Express backend! Loaded ${data.length} doctors.`,
        });
      } else {
        // Keep default doctors for visual clarity
        setDoctors(DEFAULT_DOCTORS);
      }
    } catch (err) {
      // Backend is offline - use default rich doctors roster
      setDoctors(DEFAULT_DOCTORS);
      if (err.isNetworkError) {
        setAlert({
          type: 'info',
          message: 'Backend server not running yet at http://localhost:5000. Displaying default clinical staff in Demo Mode.',
        });
      } else {
        setAlert({
          type: 'danger',
          message: err.message || 'Error fetching doctors',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorsList();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateDoctor = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setAlert(null);

    const newDocObj = {
      ...formData,
      id: String(Date.now()),
      rating: 5.0,
      reviewsCount: 1,
    };

    try {
      const response = await createDoctor(formData);
      setAlert({
        type: 'success',
        message: response.message || 'Doctor added successfully to your backend!',
      });
      setShowModal(false);
      setFormData(initialFormState);
      fetchDoctorsList();
    } catch {
      // Offline fallback: add to local state so user gets immediate visual feedback
      setDoctors((prev) => [newDocObj, ...prev]);
      setAlert({
        type: 'success',
        message: 'Doctor added to local roster! (Start your Express server on :5000 to persist permanently)',
      });
      setShowModal(false);
      setFormData(initialFormState);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredDoctors = doctors.filter((doc) => {
    if (selectedDept === 'ALL') return true;
    return doc.department === selectedDept;
  });

  return (
    <div className="page-transition">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span 
              className="badge rounded-pill px-3 py-1 fw-bold" 
              style={{ backgroundColor: '#F0F9FF', color: '#0369A1', border: '1px solid #BAE6FD', fontSize: '0.78rem' }}
            >
              <i className="bi bi-shield-check me-1"></i> CarePlus Medical Roster
            </span>
            <h3 className="fw-bold mb-0 text-dark">Specialists &amp; Medical Staff</h3>
          </div>
          <p className="text-secondary mb-0">Meet the certified clinicians leading cardiology, neurology, pediatrics, and surgical care.</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn-pos-outline" onClick={fetchDoctorsList}>
            <i className="bi bi-arrow-clockwise me-1"></i> Refresh
          </button>
          <button 
            className="btn btn-sm px-3 py-2 fw-bold text-white rounded-pill shadow-sm"
            style={{ backgroundColor: '#0284C7' }} 
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-person-plus-fill me-1"></i> Add Doctor
          </button>
        </div>
      </div>

      {/* Alert Notice */}
      {alert && (
        <div 
          className="pos-card-base pos-card-grey p-3 mb-4 d-flex align-items-center justify-content-between"
          style={{ borderColor: alert.type === 'danger' ? '#FCA5A5' : alert.type === 'success' ? '#86EFAC' : '#BAE6FD' }}
        >
          <div className="d-flex align-items-center gap-3">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
              style={{
                width: 36,
                height: 36,
                backgroundColor: alert.type === 'success' ? '#DCFCE7' : alert.type === 'danger' ? '#FEE2E2' : '#E0F2FE',
                color: alert.type === 'success' ? '#15803D' : alert.type === 'danger' ? '#B91C1C' : '#0284C7',
              }}
            >
              <i className={`bi ${alert.type === 'success' ? 'bi-check-lg' : alert.type === 'danger' ? 'bi-exclamation-triangle' : 'bi-info-circle'}`}></i>
            </div>
            <span className="fw-semibold text-dark">{alert.message}</span>
          </div>
          <button type="button" className="btn-close" onClick={() => setAlert(null)}></button>
        </div>
      )}

      {/* Contract Card */}
      <ApiContractCard contracts={doctorContracts} />

      {/* Filter Card */}
      <div className="pos-card-base pos-card-white p-3 mb-4" style={{ borderColor: '#E2E8F0' }}>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3">
            <span className="fw-bold text-dark small">Department:</span>
            <select
              className="form-select pos-input py-1 px-3"
              style={{ width: 'auto', borderColor: '#BAE6FD' }}
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              <option value="ALL">All Specialties</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Dermatology">Dermatology</option>
            </select>
          </div>
          <span 
            className="badge rounded-pill px-3 py-1 fw-semibold"
            style={{ backgroundColor: '#F0F9FF', color: '#0369A1', border: '1px solid #BAE6FD', fontSize: '0.8rem' }}
          >
            {filteredDoctors.length} Specialists On Duty
          </span>
        </div>
      </div>

      {/* Doctors Grid with CarePlus Cards */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="text-secondary small mt-2 mb-0">Loading doctors...</p>
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="pos-card-base pos-card-grey text-center py-5 p-4">
          <div className="p-4 d-inline-block rounded-circle bg-white mb-3 border" style={{ borderColor: 'var(--med-border)' }}>
            <i className="bi bi-person-badge fs-1 text-primary"></i>
          </div>
          <h5 className="fw-bold text-dark">No Specialists Found</h5>
          <p className="small mb-3 text-secondary">
            No doctors found matching the selected department.
          </p>
          <button className="btn btn-sm px-3 py-2 fw-bold text-white rounded-pill" style={{ backgroundColor: '#0284C7' }} onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-lg me-1"></i> Add Doctor
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filteredDoctors.map((doc, idx) => {
            const docId = doc.id || doc._id || `doc-${idx}`;
            const photoSrc = doc.photo || PRESET_DOCTOR_PHOTOS[idx % PRESET_DOCTOR_PHOTOS.length].photo;
            const isAvail = doc.availability === 'Available';
            const isInSurgery = doc.availability === 'In Surgery';

            return (
              <div className="col-12 col-md-6 col-xl-4" key={docId}>
                <div
                  className="careplus-doc-card hover-lift"
                  onClick={() => setSelectedDoctor(doc)}
                  title="Click to view full specialist profile & consultation hours"
                >
                  {/* CarePlus Executive Gradient Banner */}
                  <div className="careplus-doc-banner">
                    <span className="careplus-doc-banner-tag">
                      <i className="bi bi-shield-plus me-1" style={{ color: '#0284C7' }}></i>
                      {doc.department}
                    </span>
                  </div>

                  <div className="careplus-doc-body">
                    {/* Overlapping Avatar & Rating */}
                    <div className="careplus-doc-avatar-wrap">
                      <div className="doctor-photo-wrap">
                        <img
                          src={photoSrc}
                          alt={doc.name}
                          className="careplus-doc-avatar-img"
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
                          title={doc.availability || 'Available'}
                        ></span>
                      </div>

                      <span className="careplus-doc-rating">
                        <i className="bi bi-star-fill text-warning"></i>
                        {doc.rating || 4.9} <small className="text-muted fw-normal">({doc.reviewsCount || 120})</small>
                      </span>
                    </div>

                    {/* Doctor Identity */}
                    <h5 className="careplus-doc-name text-truncate" title={doc.name}>
                      {doc.name}
                    </h5>
                    <div className="careplus-doc-spec text-truncate" title={doc.specialization || doc.department}>
                      {doc.specialization || doc.department}
                    </div>

                    {/* Metadata Rows */}
                    <div className="careplus-doc-meta-row">
                      {doc.room && (
                        <div className="careplus-doc-meta-item">
                          <i className="bi bi-geo-alt-fill"></i>
                          <span className="text-dark fw-medium text-truncate">{doc.room}</span>
                        </div>
                      )}
                      {doc.experience && (
                        <div className="careplus-doc-meta-item">
                          <i className="bi bi-award-fill"></i>
                          <span>Experience: <strong className="text-dark">{doc.experience}</strong></span>
                        </div>
                      )}
                      {doc.education && (
                        <div className="careplus-doc-meta-item text-truncate" title={doc.education}>
                          <i className="bi bi-mortarboard-fill"></i>
                          <span className="text-secondary text-truncate">{doc.education}</span>
                        </div>
                      )}
                      {doc.phone && (
                        <div className="careplus-doc-meta-item">
                          <i className="bi bi-telephone-fill"></i>
                          <a 
                            href={`tel:${doc.phone}`} 
                            className="text-secondary text-decoration-none"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {doc.phone}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="careplus-doc-footer">
                      <span 
                        className={`careplus-status-pill ${
                          isAvail
                            ? 'careplus-status-available'
                            : isInSurgery
                            ? 'careplus-status-busy'
                            : 'careplus-status-leave'
                        }`}
                      >
                        <i className="bi bi-circle-fill" style={{ fontSize: '0.45rem' }}></i>
                        {doc.availability || 'Available'}
                      </span>

                      <button
                        type="button"
                        className="btn-careplus-view"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDoctor(doc);
                        }}
                      >
                        <span>View Profile</span>
                        <i className="bi bi-arrow-right-short" style={{ fontSize: '1rem', marginLeft: -2 }}></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Add Doctor with Photo Selection */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(24, 24, 27, 0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content rounded-4 overflow-hidden shadow-lg border-0">
              <div className="modal-header bg-white py-3 px-4 border-bottom">
                <div className="d-flex align-items-center gap-2">
                  <span className="pos-tag-lime small">Clinical Staff</span>
                  <h5 className="modal-title fw-bold text-dark mb-0">Register Medical Specialist</h5>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                ></button>
              </div>

              <form onSubmit={handleCreateDoctor}>
                <div className="modal-body p-4 bg-white">
                  {/* Photo Selection Row */}
                  <div className="mb-4 p-3 rounded-3 border" style={{ backgroundColor: '#F8FAFC' }}>
                    <label className="form-label fw-bold small text-dark d-block mb-2">
                      <i className="bi bi-camera-fill text-dark me-1"></i> Choose Specialist Portrait
                    </label>
                    <div className="d-flex align-items-center gap-3 flex-wrap">
                      <div className="doctor-photo-wrap" style={{ width: 68, height: 68 }}>
                        <img
                          src={formData.photo}
                          alt="Selected Doctor"
                          className="doctor-photo-img"
                        />
                      </div>
                      <div className="d-flex gap-2 flex-wrap">
                        {PRESET_DOCTOR_PHOTOS.map((p, pIdx) => (
                          <img
                            key={pIdx}
                            src={p.photo}
                            alt={p.name}
                            className={`rounded-3 cursor-pointer object-fit-cover border ${
                              formData.photo === p.photo ? 'border-dark border-3 shadow-sm' : 'border-secondary-subtle opacity-75'
                            }`}
                            style={{ width: 50, height: 50, cursor: 'pointer', transition: 'all 0.2s' }}
                            title={`${p.name} (${p.dept})`}
                            onClick={() => setFormData((prev) => ({ ...prev, photo: p.photo, department: p.dept }))}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold small text-dark">Doctor Full Name *</label>
                      <input
                        type="text"
                        className="form-control pos-input"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Dr. Jennifer Lawrence, MD"
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold small text-dark">Specialization *</label>
                      <input
                        type="text"
                        className="form-control pos-input"
                        name="specialization"
                        required
                        value={formData.specialization}
                        onChange={handleInputChange}
                        placeholder="e.g. Interventional Cardiologist"
                      />
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-12 col-md-4">
                      <label className="form-label fw-bold small text-dark">Department</label>
                      <select
                        className="form-select pos-input"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                      >
                        <option value="Cardiology">Cardiology</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="General Medicine">General Medicine</option>
                        <option value="Dermatology">Dermatology</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label fw-bold small text-dark">Experience</label>
                      <input
                        type="text"
                        className="form-control pos-input"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="e.g. 10+ years"
                      />
                    </div>
                    <div className="col-12 col-md-4">
                      <label className="form-label fw-bold small text-dark">Availability</label>
                      <select
                        className="form-select pos-input"
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                      >
                        <option value="Available">Available</option>
                        <option value="In Surgery">In Surgery</option>
                        <option value="On Leave">On Leave</option>
                      </select>
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold small text-dark">Phone Number</label>
                      <input
                        type="tel"
                        className="form-control pos-input"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 987-6543"
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold small text-dark">Email Address</label>
                      <input
                        type="email"
                        className="form-control pos-input"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="doctor@carepulse.org"
                      />
                    </div>
                  </div>

                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold small text-dark">Office / Suite Room</label>
                      <input
                        type="text"
                        className="form-control pos-input"
                        name="room"
                        value={formData.room}
                        onChange={handleInputChange}
                        placeholder="e.g. Suite 305, West Pavilion"
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label className="form-label fw-bold small text-dark">Medical School / Education</label>
                      <input
                        type="text"
                        className="form-control pos-input"
                        name="education"
                        value={formData.education}
                        onChange={handleInputChange}
                        placeholder="e.g. Harvard Medical School"
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer bg-light p-3 border-top">
                  <button
                    type="button"
                    className="btn-pos-outline py-2 px-3"
                    onClick={() => setShowModal(false)}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-pos-lime py-2 px-4" disabled={submitting}>
                    {submitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Saving...
                      </>
                    ) : (
                      'Save Specialist'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Doctor Information & Profile Modal */}
      <DoctorDetailModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
      />
    </div>
  );
}

export default DoctorsPage;
