import React, { useState, useEffect } from 'react';
import { getPatients } from '../services/patientService';
import { getAppointments } from '../services/appointmentService';
import { getDoctors } from '../services/doctorService';
import ApiContractCard from '../components/ApiContractCard';

const HOSPITAL_DOCTORS = [
  {
    id: '201',
    name: 'Dr. Sarah Smith, MD',
    subName: '(Johns Hopkins School of Medicine • License #MD-883492)',
    handle: '@DrSarah',
    photo: '/images/doctors/dr_sarah_smith.jpg',
    designation: 'Senior Interventional Cardiologist',
    department: 'Cardiology & Critical Care',
    branch: 'CarePulse Heart Center',
    email: 'dr.sarah@carepulse.org',
    phone: '+1 (555) 234-5678',
    room: 'Suite 302, Heart Center',
    permanentAddress: 'Suite 302, Heart Pavilion, Medical District',
    currentAddress: 'Building 4B, Doctor Suites, Healthway Blvd',
    experience: '8+ years',
    rating: 4.9,
    reviewsCount: 142,
  },
  {
    id: '202',
    name: 'Dr. Michael Chen, MD',
    subName: '(Harvard Medical School • License #MD-912384)',
    handle: '@DrChen',
    photo: '/images/doctors/dr_michael_chen.jpg',
    designation: 'Chief Neurologist & Neurosurgeon',
    department: 'Neurology & Brain Institute',
    branch: 'CarePulse Neuro Center',
    email: 'dr.chen@carepulse.org',
    phone: '+1 (555) 345-6789',
    room: 'Room 410, Brain & Spine Institute',
    permanentAddress: 'Room 410, Brain Institute, Medical District',
    currentAddress: '15 West End Ave, Neuro Suites',
    experience: '12+ years',
    rating: 4.95,
    reviewsCount: 198,
  },
  {
    id: '203',
    name: 'Dr. Emily Watson, MD',
    subName: '(Stanford University School of Medicine • License #MD-772910)',
    handle: '@DrWatson',
    photo: '/images/doctors/dr_emily_watson.jpg',
    designation: 'Lead Pediatrician & Neonatologist',
    department: 'Pediatrics & Family Medicine',
    branch: 'CarePulse Children Wing',
    email: 'dr.emily@carepulse.org',
    phone: '+1 (555) 456-7890',
    room: 'Suite 104, Children Health Wing',
    permanentAddress: 'Suite 104, Pediatric Pavilion',
    currentAddress: '88 Meadow Lane, Family District',
    experience: '9+ years',
    rating: 4.88,
    reviewsCount: 165,
  },
  {
    id: '204',
    name: 'Dr. David Miller, MD',
    subName: '(Columbia University Vagelos College • License #MD-661298)',
    handle: '@DrMiller',
    photo: '/images/doctors/dr_david_miller.jpg',
    designation: 'Chief Orthopedic & Joint Surgeon',
    department: 'Orthopedics & Sports Medicine',
    branch: 'CarePulse Surgical Pavilion',
    email: 'dr.david@carepulse.org',
    phone: '+1 (555) 567-8901',
    room: 'OR Suite 2B, Orthopedic Pavilion',
    permanentAddress: 'OR Suite 2B, Joint Center',
    currentAddress: '310 Hudson St, Riverdale',
    experience: '11+ years',
    rating: 4.92,
    reviewsCount: 120,
  },
];

const DEFAULT_PATIENTS = [
  { id: '101', name: 'John Doe', age: 34, gender: 'Male', bloodGroup: 'O+', condition: 'Post-op Cardiac Checkup', ward: 'Suite 302, Cardiac Wing', status: 'Admitted' },
  { id: '102', name: 'Eleanor Vance', age: 29, gender: 'Female', bloodGroup: 'A+', condition: 'Arrhythmia Telemetry Monitoring', ward: 'ICU Bed 04, Life Support', status: 'Observation' },
  { id: '103', name: 'Marcus Sterling', age: 52, gender: 'Male', bloodGroup: 'B+', condition: 'Hypertension & Coronary Stent', ward: 'Deluxe Suite 210', status: 'Admitted' },
  { id: '104', name: 'Sophia Martinez', age: 41, gender: 'Female', bloodGroup: 'O-', condition: 'Angina Diagnostics & Stress Test', ward: 'Cardiac Day Care Bed 3', status: 'Admitted' },
];

const DEFAULT_APPOINTMENTS = [
  { id: 'app-01', patientName: 'John Doe', doctorName: 'Dr. Sarah Smith', department: 'Cardiology', date: '2026-10-09', time: '10:00 AM', status: 'Scheduled', room: 'Suite 302' },
  { id: 'app-02', patientName: 'Eleanor Vance', doctorName: 'Dr. Sarah Smith', department: 'Cardiology', date: '2026-10-09', time: '11:30 AM', status: 'Scheduled', room: 'Suite 302' },
  { id: 'app-03', patientName: 'Marcus Sterling', doctorName: 'Dr. Michael Chen', department: 'Neurology', date: '2026-10-09', time: '02:00 PM', status: 'Pending', room: 'Room 410' },
  { id: 'app-04', patientName: 'Sophia Martinez', doctorName: 'Dr. Emily Watson', department: 'Pediatrics', date: '2026-10-09', time: '03:30 PM', status: 'Completed', room: 'Suite 104' },
];

function DashboardPage({ onNavigate }) {
  const [selectedDoctorId, setSelectedDoctorId] = useState('201');
  const [stats, setStats] = useState({
    patientsCount: 4,
    appointmentsCount: 4,
    doctorsCount: 4,
    pendingAppointments: 3,
  });
  const [patientsList, setPatientsList] = useState(DEFAULT_PATIENTS);
  const [appointmentsList, setAppointmentsList] = useState(DEFAULT_APPOINTMENTS);
  const [isLoading, setIsLoading] = useState(true);
  const [backendError, setBackendError] = useState(null);
  const [showContracts, setShowContracts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const activeDoctor =
    HOSPITAL_DOCTORS.find((doc) => doc.id === selectedDoctorId) || HOSPITAL_DOCTORS[0];

  const dashboardContracts = [
    {
      title: 'Fetch All Patients',
      endpoint: '/api/patients',
      method: 'GET',
      requestQuery: 'None (Optional: ?limit=10)',
      expectedResponse: [
        { id: '1', name: 'John Doe', age: 34, gender: 'Male', bloodGroup: 'O+' }
      ],
      frontendAction: 'Counts total patients and updates dashboard metric card.',
      expectedErrors: '500 Internal Server Error: { message: "Database connection failed" }',
    },
    {
      title: 'Fetch Appointments',
      endpoint: '/api/appointments',
      method: 'GET',
      requestQuery: 'None',
      expectedResponse: [
        { id: '101', patientName: 'John Doe', doctorName: 'Dr. Sarah Smith', status: 'Scheduled', date: '2026-10-09' }
      ],
      frontendAction: 'Calculates scheduled appointments for today and displays them in stat cards.',
      expectedErrors: '500 Internal Server Error',
    },
    {
      title: 'Fetch Doctors',
      endpoint: '/api/doctors',
      method: 'GET',
      requestQuery: 'None',
      expectedResponse: [
        { id: '201', name: 'Dr. Sarah Smith', department: 'Cardiology', availability: 'Available' }
      ],
      frontendAction: 'Counts active doctors on staff and updates doctor stat card.',
      expectedErrors: '500 Internal Server Error',
    }
  ];

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      setBackendError(null);
      try {
        const [patientsData, appointmentsData, doctorsData] = await Promise.allSettled([
          getPatients(),
          getAppointments(),
          getDoctors(),
        ]);

        const patients = patientsData.status === 'fulfilled' && patientsData.value.length > 0
          ? patientsData.value
          : DEFAULT_PATIENTS;

        const appointments = appointmentsData.status === 'fulfilled' && appointmentsData.value.length > 0
          ? appointmentsData.value
          : DEFAULT_APPOINTMENTS;

        const doctors = doctorsData.status === 'fulfilled' && doctorsData.value.length > 0
          ? doctorsData.value
          : HOSPITAL_DOCTORS;

        if (
          patientsData.status === 'rejected' &&
          appointmentsData.status === 'rejected' &&
          doctorsData.status === 'rejected'
        ) {
          setBackendError('Backend server is not running yet at http://localhost:5000/api.');
        }

        setPatientsList(patients);
        setAppointmentsList(appointments);

        const pending = appointments.filter(
          (a) => a.status === 'Scheduled' || a.status === 'Pending'
        ).length;

        setStats({
          patientsCount: patients.length,
          appointmentsCount: appointments.length,
          doctorsCount: doctors.length,
          pendingAppointments: pending,
        });
      } catch (err) {
        setBackendError(err.message || 'Failed to fetch dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const filteredAppointments = appointmentsList.filter(
    (item) =>
      item.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.doctorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPatients = patientsList.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.condition?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bloodGroup?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-transition">
      {/* Top Controls Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        {/* Doctor Switcher Pills from Our Medical Team */}
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <span className="small text-secondary fw-bold text-uppercase" style={{ fontSize: '0.75rem' }}>
            Attending Specialist:
          </span>
          {HOSPITAL_DOCTORS.map((doc) => (
            <button
              key={doc.id}
              type="button"
              className={`btn btn-sm rounded-pill px-3 py-1 fw-bold ${
                selectedDoctorId === doc.id
                  ? 'btn-pos-dark'
                  : 'btn-outline-secondary bg-white'
              }`}
              onClick={() => setSelectedDoctorId(doc.id)}
            >
              {doc.name.split(',')[0]}
            </button>
          ))}
        </div>

        {/* Action Shortcuts */}
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <button
            type="button"
            className="btn btn-sm btn-outline-dark rounded-pill px-3 py-1 fw-semibold"
            onClick={() => setShowContracts(!showContracts)}
          >
            <i className="bi bi-code-slash me-1"></i>
            {showContracts ? 'Hide Express Contract' : 'Express API Spec'}
          </button>
          <button className="btn-pos-dark py-1 px-3 fs-6" onClick={() => onNavigate('patients')}>
            <i className="bi bi-person-plus-fill me-1"></i> Add Patient
          </button>
          <button className="btn-pos-lime py-1 px-3 fs-6" onClick={() => onNavigate('appointments')}>
            <i className="bi bi-calendar-plus-fill me-1"></i> Book Visit
          </button>
        </div>
      </div>

      {/* Backend API Specs Drawer */}
      {showContracts && (
        <div className="mb-4">
          <ApiContractCard contracts={dashboardContracts} />
        </div>
      )}

      {/* Backend Offline Status notice */}
      {/* Backend Offline Status notice */}
      {backendError && !showContracts && (
        <div 
          className="p-3 mb-4 rounded-4 bg-white border d-flex align-items-center justify-content-between flex-wrap gap-2 shadow-sm"
          style={{ borderColor: 'var(--careplus-sky-border, #BAE6FD)' }}
        >
          <div className="d-flex align-items-center gap-2">
            <span className="badge rounded-pill bg-light text-dark border p-2">
              <i className="bi bi-lightbulb-fill text-warning"></i>
            </span>
            <small className="text-secondary">
              <strong>Backend Learning Mode:</strong> Express server offline at <code>:5000</code>. Implement <code>GET /api/patients</code> to connect live.
            </small>
          </div>
          <button
            className="btn btn-sm btn-outline-dark rounded-pill px-3 py-1"
            onClick={() => setShowContracts(true)}
          >
            View Route Specs
          </button>
        </div>
      )}

      {/* Two-Column Layout Matching CarePlus Dashboard Suite */}
      <div className="row g-4">
        {/* =========================================================================
            LEFT COLUMN: Doctor Profile Card for Doctor from Our List
            ========================================================================= */}
        <div className="col-12 col-lg-4 col-xl-3">
          {/* 1. Doctor Profile Card */}
          <div className="careplus-doctor-card c9-doctor-card">
            {/* Deep CarePlus Royal Blue & Navy Cover Banner */}
            <div className="careplus-cover-banner c9-cover-banner"></div>

            {/* Overlapping Doctor Portrait */}
            <div className="careplus-avatar-container c9-avatar-container">
              <img
                src={activeDoctor.photo}
                alt={activeDoctor.name}
                className="careplus-avatar-img c9-avatar-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/images/doctors/dr_sarah_smith.jpg';
                }}
              />
            </div>

            {/* Doctor Titles & Handle */}
            <div className="p-4 pt-3 text-center border-bottom">
              <span 
                className="badge rounded-pill border px-3 py-1 mb-2 fw-semibold"
                style={{ 
                  backgroundColor: 'var(--careplus-sky-soft, #F0F9FF)', 
                  color: 'var(--careplus-sky-text, #0369A1)', 
                  borderColor: 'var(--careplus-sky-border, #BAE6FD)', 
                  fontSize: '0.78rem' 
                }}
              >
                {activeDoctor.handle}
              </span>
              <h4 className="fw-bolder mb-1 text-dark" style={{ letterSpacing: '-0.02em' }}>
                {activeDoctor.name}
              </h4>
              <small className="text-muted d-block" style={{ fontSize: '0.75rem', lineHeight: 1.3 }}>
                {activeDoctor.subName}
              </small>
            </div>

            {/* Doctor Details List */}
            <div className="px-4 py-3">
              <div className="careplus-info-row c9-info-row">
                <span className="careplus-info-label c9-info-label">
                  <i className="bi bi-person-badge text-secondary"></i> Designation
                </span>
                <span className="careplus-info-value c9-info-value">{activeDoctor.designation}</span>
              </div>

              <div className="careplus-info-row c9-info-row">
                <span className="careplus-info-label c9-info-label">
                  <i className="bi bi-heart-pulse text-secondary"></i> Department
                </span>
                <span className="careplus-info-value c9-info-value text-truncate" title={activeDoctor.department}>
                  {activeDoctor.department}
                </span>
              </div>

              <div className="careplus-info-row c9-info-row">
                <span className="careplus-info-label c9-info-label">
                  <i className="bi bi-hospital text-secondary"></i> Clinic Suite
                </span>
                <span className="careplus-info-value c9-info-value">{activeDoctor.room}</span>
              </div>

              <div className="careplus-info-row c9-info-row">
                <span className="careplus-info-label c9-info-label">
                  <i className="bi bi-envelope text-secondary"></i> Email
                </span>
                <span className="careplus-info-value c9-info-value text-truncate" title={activeDoctor.email}>
                  {activeDoctor.email}
                </span>
              </div>

              <div className="careplus-info-row c9-info-row">
                <span className="careplus-info-label c9-info-label">
                  <i className="bi bi-telephone text-secondary"></i> Phone
                </span>
                <span className="careplus-info-value c9-info-value">{activeDoctor.phone}</span>
              </div>
            </div>
          </div>

          {/* 2. Address Card */}
          <div className="careplus-address-card c9-address-card">
            <div className="d-flex align-items-center gap-2 mb-3">
              <i className="bi bi-house-door-fill text-dark fs-6"></i>
              <span className="fw-bold text-dark small">Hospital Suite / Clinic</span>
            </div>
            <p className="text-secondary small mb-3 ps-4" style={{ lineHeight: 1.4 }}>
              {activeDoctor.permanentAddress}
            </p>

            <div className="d-flex align-items-center gap-2 mb-2">
              <i className="bi bi-geo-alt-fill text-dark fs-6"></i>
              <span className="fw-bold text-dark small">Residential Residence</span>
            </div>
            <p className="text-secondary small mb-0 ps-4" style={{ lineHeight: 1.4 }}>
              {activeDoctor.currentAddress}
            </p>
          </div>

          {/* Quick Real-Time Metric Pill */}
          <div className="p-3 rounded-4 bg-white border mt-3 shadow-sm" style={{ borderColor: 'var(--careplus-sky-border, #BAE6FD)' }}>
            <div className="d-flex justify-content-between align-items-center small text-secondary">
              <span>System Patients:</span>
              <strong className="text-dark">{isLoading ? '...' : stats.patientsCount} admitted</strong>
            </div>
            <div className="d-flex justify-content-between align-items-center small text-secondary mt-2">
              <span>Pending Bookings:</span>
              <strong className="text-dark">{isLoading ? '...' : stats.pendingAppointments} scheduled</strong>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: 3-Column Hospital Specs & Real Clinical Schedule Tables
            ========================================================================= */}
        <div className="col-12 col-lg-8 col-xl-9">
          {/* Top 3-Section Card (Real Hospital Metrics) */}
          <div className="careplus-metrics-card c9-metrics-card">
            <div className="row g-4">
              {/* Column 1: Patient Intelligence */}
              <div className="col-12 col-md-4">
                <div className="careplus-spec-label c9-spec-label d-flex align-items-center gap-2">
                  <i className="bi bi-people-fill" style={{ color: 'var(--careplus-blue, #0284C7)' }}></i>
                  Patient Directory
                </div>
                <div className="careplus-spec-row c9-spec-row">
                  <span className="careplus-spec-key c9-spec-key">Total Registered</span>
                  <span className="careplus-spec-val c9-spec-val font-monospace fs-6">{isLoading ? '-' : stats.patientsCount}</span>
                </div>
                <div className="careplus-spec-row c9-spec-row">
                  <span className="careplus-spec-key c9-spec-key">Pending Checkups</span>
                  <span className="careplus-spec-val c9-spec-val font-monospace">{isLoading ? '-' : stats.pendingAppointments}</span>
                </div>
                <div className="careplus-spec-row c9-spec-row">
                  <span className="careplus-spec-key c9-spec-key">Admissions Status</span>
                  <span className="careplus-spec-val c9-spec-val text-success fw-bold">Active</span>
                </div>
                <div className="careplus-spec-row c9-spec-row">
                  <span className="careplus-spec-key c9-spec-key">Blood Registry</span>
                  <span className="careplus-spec-val c9-spec-val">O+, A+, B+, AB+</span>
                </div>
              </div>

              {/* Column 2: Clinical Operations & Visits */}
              <div className="col-12 col-md-4 careplus-col-divider c9-col-divider">
                <div className="careplus-spec-label c9-spec-label d-flex align-items-center gap-2">
                  <i className="bi bi-calendar-check-fill" style={{ color: 'var(--careplus-blue, #0284C7)' }}></i>
                  Consultation Schedule
                </div>
                <div className="careplus-spec-row c9-spec-row">
                  <span className="careplus-spec-key c9-spec-key">Total Bookings</span>
                  <span className="careplus-spec-val c9-spec-val font-monospace fs-6">{isLoading ? '-' : stats.appointmentsCount}</span>
                </div>
                <div className="careplus-spec-row c9-spec-row">
                  <span className="careplus-spec-key c9-spec-key">Hours</span>
                  <span className="careplus-spec-val c9-spec-val">08:30 AM &ndash; 05:00 PM</span>
                </div>
                <div className="careplus-spec-row c9-spec-row">
                  <span className="careplus-spec-key c9-spec-key">Emergency Triage</span>
                  <span className="careplus-spec-val c9-spec-val text-success fw-bold">24/7 On Duty</span>
                </div>
                <div className="careplus-spec-row c9-spec-row">
                  <span className="careplus-spec-key c9-spec-key">Wait Time</span>
                  <span className="careplus-spec-val c9-spec-val">&lt; 15 mins</span>
                </div>
              </div>

              {/* Column 3: Medical Staff & System Status */}
              <div className="col-12 col-md-4 careplus-col-divider c9-col-divider">
                <div className="careplus-spec-label c9-spec-label d-flex align-items-center gap-2">
                  <i className="bi bi-heart-pulse-fill" style={{ color: 'var(--careplus-blue, #0284C7)' }}></i>
                  Medical Specialists
                </div>
                <div className="careplus-spec-row c9-spec-row">
                  <span className="careplus-spec-key c9-spec-key">Active Staff</span>
                  <span className="careplus-spec-val c9-spec-val font-monospace fs-6">{isLoading ? '-' : stats.doctorsCount}</span>
                </div>
                <div className="careplus-spec-row c9-spec-row">
                  <span className="careplus-spec-key c9-spec-key">Specialties</span>
                  <span className="careplus-spec-val c9-spec-val">Cardio, Neuro, Peds</span>
                </div>
                <div className="careplus-spec-row c9-spec-row">
                  <span className="careplus-spec-key c9-spec-key">Express Backend</span>
                  <span className="careplus-spec-val c9-spec-val font-monospace">:5000 API</span>
                </div>
                <div className="careplus-spec-row c9-spec-row">
                  <span className="c9-spec-key">REST Contracts</span>
                  <span className="c9-spec-val">3 Endpoints</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section Heading: Clinical Operations & Summary */}
          <div className="d-flex justify-content-between align-items-center mt-4 mb-3 flex-wrap gap-2">
            <h5 className="fw-bold text-dark mb-0" style={{ letterSpacing: '-0.01em' }}>
              Clinical Operations &amp; Consultations Summary
            </h5>
            <div className="d-flex align-items-center gap-2">
              <div className="input-group input-group-sm" style={{ width: 230 }}>
                <span className="input-group-text bg-white border-end-0" style={{ borderColor: '#E5E7EB' }}>
                  <i className="bi bi-search text-secondary"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  style={{ borderColor: '#E5E7EB', fontSize: '0.8rem' }}
                  placeholder="Filter schedule..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 1. Out-Patient Commercial / Consultations Table */}
          <div className="careplus-commercial-card c9-commercial-card">
            <div className="careplus-commercial-header c9-commercial-header">
              <span>Out-Patient Consultations (OPD Schedule)</span>
              <span 
                className="badge rounded-pill bg-white border px-2 py-1 fw-bold" 
                style={{ fontSize: '0.75rem', borderColor: 'var(--careplus-sky-border, #BAE6FD)', color: '#0369A1' }}
              >
                {filteredAppointments.length} Scheduled
              </span>
            </div>
            <div className="table-responsive">
              <table className="careplus-table c9-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Attending Doctor</th>
                    <th>Department / Clinic</th>
                    <th>Scheduled Date &amp; Time</th>
                    <th>Clinical Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted py-3">
                        No appointments found matching search filter.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((app, idx) => (
                      <tr key={idx}>
                        <td className="fw-bold text-dark">
                          <i className="bi bi-person-fill text-secondary me-2"></i>
                          {app.patientName}
                        </td>
                        <td className="text-dark fw-medium">{app.doctorName}</td>
                        <td className="text-secondary">{app.department}</td>
                        <td>
                          <span className="small text-secondary font-monospace">
                            {app.date} &bull; {app.time || '10:00 AM'}
                          </span>
                        </td>
                        <td>
                          <span 
                            className="badge fw-semibold px-2 py-1 rounded"
                            style={{
                              backgroundColor: app.status === 'Completed' ? '#ECFDF5' : 'var(--careplus-sky-soft, #F0F9FF)',
                              color: app.status === 'Completed' ? '#059669' : 'var(--careplus-sky-text, #0369A1)',
                              border: '1px solid ' + (app.status === 'Completed' ? '#A7F3D0' : 'var(--careplus-sky-border, #BAE6FD)'),
                              fontSize: '0.82rem',
                            }}
                          >
                            {app.status || 'Scheduled'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. In-Patient Admissions & Surgical Registry */}
          <div className="careplus-commercial-card c9-commercial-card">
            <div className="careplus-commercial-header c9-commercial-header">
              <span>In-Patient Admissions &amp; Ward Registry (IPD Schedule)</span>
              <span 
                className="badge rounded-pill bg-white border px-2 py-1 fw-bold" 
                style={{ fontSize: '0.75rem', borderColor: 'var(--careplus-sky-border, #BAE6FD)', color: '#0369A1' }}
              >
                {filteredPatients.length} Admitted Patients
              </span>
            </div>
            <div className="table-responsive">
              <table className="careplus-table c9-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Age / Gender</th>
                    <th>Blood Group</th>
                    <th>Ward / Room Suite</th>
                    <th>Diagnosis / Condition</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-3">
                        No patients matching search filter.
                      </td>
                    </tr>
                  ) : (
                    filteredPatients.map((pt, idx) => (
                      <tr key={idx}>
                        <td className="fw-bold text-dark">{pt.name}</td>
                        <td className="text-secondary">{pt.age} yrs &bull; {pt.gender}</td>
                        <td>
                          <span className="badge rounded px-2 py-1 bg-light text-dark border font-monospace">
                            {pt.bloodGroup || 'O+'}
                          </span>
                        </td>
                        <td className="text-dark fw-medium">{pt.ward || 'Suite 302, Cardiac Wing'}</td>
                        <td className="text-secondary small">{pt.condition || 'General Evaluation'}</td>
                        <td>
                          <span 
                            className="badge fw-semibold px-2 py-1 rounded"
                            style={{ 
                              backgroundColor: 'var(--careplus-sky-soft, #F0F9FF)', 
                              color: 'var(--careplus-sky-text, #0369A1)', 
                              border: '1px solid var(--careplus-sky-border, #BAE6FD)',
                              fontSize: '0.82rem' 
                            }}
                          >
                            {pt.status || 'Admitted'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Clinical Management Modules Navigation Cards */}
          <div className="row g-3 mt-1">
            <div className="col-12 col-md-6 col-xl-3">
              <div 
                className="p-3 bg-white rounded-4 border hover-lift cursor-pointer h-100 d-flex flex-column justify-content-between"
                style={{ cursor: 'pointer', borderColor: 'var(--careplus-sky-border, #BAE6FD)' }}
                onClick={() => onNavigate('patients')}
              >
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="pos-tag-lime small py-0 px-2">Admissions</span>
                    <i className="bi bi-arrow-up-right text-secondary small"></i>
                  </div>
                  <h6 className="fw-bold text-dark mb-1">Patient Records</h6>
                  <p className="small text-secondary mb-0" style={{ fontSize: '0.8rem' }}>
                    Admit patients, view blood groups, and manage diagnosis history.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <div 
                className="p-3 bg-white rounded-4 border hover-lift cursor-pointer h-100 d-flex flex-column justify-content-between"
                style={{ cursor: 'pointer', borderColor: 'var(--careplus-sky-border, #BAE6FD)' }}
                onClick={() => onNavigate('appointments')}
              >
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="pos-tag-lime small py-0 px-2">Bookings</span>
                    <i className="bi bi-arrow-up-right text-secondary small"></i>
                  </div>
                  <h6 className="fw-bold text-dark mb-1">Consultations</h6>
                  <p className="small text-secondary mb-0" style={{ fontSize: '0.8rem' }}>
                    Schedule specialist visits, surgery check-ins, and clinic bookings.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <div 
                className="p-3 bg-white rounded-4 border hover-lift cursor-pointer h-100 d-flex flex-column justify-content-between"
                style={{ cursor: 'pointer', borderColor: 'var(--careplus-sky-border, #BAE6FD)' }}
                onClick={() => onNavigate('doctors')}
              >
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="pos-tag-lime small py-0 px-2">Specialists</span>
                    <i className="bi bi-arrow-up-right text-secondary small"></i>
                  </div>
                  <h6 className="fw-bold text-dark mb-1">Medical Staff</h6>
                  <p className="small text-secondary mb-0" style={{ fontSize: '0.8rem' }}>
                    View active on-duty specialists, credentials, and clinic availability.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <div 
                className="p-3 bg-white rounded-4 border hover-lift cursor-pointer h-100 d-flex flex-column justify-content-between"
                style={{ cursor: 'pointer', borderColor: 'var(--careplus-sky-border, #BAE6FD)' }}
                onClick={() => onNavigate('contracts')}
              >
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="pos-tag-lime small py-0 px-2">Express API</span>
                    <i className="bi bi-arrow-up-right text-secondary small"></i>
                  </div>
                  <h6 className="fw-bold text-dark mb-1">Backend Specs</h6>
                  <p className="small text-secondary mb-0" style={{ fontSize: '0.8rem' }}>
                    Test and integrate Express REST endpoints for your backend build.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
