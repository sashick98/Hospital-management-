import React, { useState } from 'react';
import DoctorDetailModal from '../components/DoctorDetailModal';

function LandingPage({ onNavigate }) {
  // Working process accordion state
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [selectedLandingDoctor, setSelectedLandingDoctor] = useState(null);

  const processSteps = [
    {
      number: '01',
      title: 'Consultation & Triage',
      badge: 'Step 1: Patient Admission & Evaluation',
      icon: 'bi-chat-heart-fill',
      iconColor: '#18181B',
      iconBg: '#F5F5F5',
      content:
        'During the initial consultation, our clinical team evaluates your symptoms, medical history, and specific health concerns to assign the appropriate specialist without delays.',
    },
    {
      number: '02',
      title: 'Comprehensive Diagnosis & Lab Tests',
      badge: 'Step 2: Laboratory & Imaging Screening',
      icon: 'bi-clipboard2-pulse-fill',
      iconColor: '#18181B',
      iconBg: '#F5F5F5',
      content:
        'We utilize state-of-the-art diagnostic imaging, blood pathology, and clinical assessments to get an accurate, verified picture of your health status.',
    },
    {
      number: '03',
      title: 'Personalized Treatment Plan',
      badge: 'Step 3: Multidisciplinary Specialist Plan',
      icon: 'bi-capsule-pill',
      iconColor: '#18181B',
      iconBg: '#F5F5F5',
      content:
        'Our multidisciplinary team designs a custom treatment plan tailored to your condition, lifestyle, and recovery milestones.',
    },
    {
      number: '04',
      title: 'Continuous Monitoring & Recovery',
      badge: 'Step 4: Real-time Vitals & Inpatient Care',
      icon: 'bi-activity',
      iconColor: '#18181B',
      iconBg: '#F5F5F5',
      content:
        'Post-treatment follow-ups, scheduled checkups, and round-the-clock doctor availability ensure smooth recovery and long-term well-being.',
    },
    {
      number: '05',
      title: 'Digital Health Records & Follow-up',
      badge: 'Step 5: Electronic Health Records Sync',
      icon: 'bi-shield-fill-check',
      iconColor: '#18181B',
      iconBg: '#F5F5F5',
      content:
        'Access all your prescriptions, test reports, and upcoming appointments digitally through our integrated patient management portal.',
    },
  ];

  const doctorsList = [
    {
      name: 'Dr. Sarah Smith, MD',
      role: 'Senior Cardiologist & Heart Surgeon',
      photo: '/images/doctors/dr_sarah_smith.jpg',
      dept: 'Cardiology',
      exp: '8+ years in cardiology & critical care leadership. Expert in cardiovascular catheterization and patient rehabilitation.',
    },
    {
      name: 'Dr. Michael Chen, MD',
      role: 'Chief Neurologist & Neurosurgeon',
      photo: '/images/doctors/dr_michael_chen.jpg',
      dept: 'Neurology',
      exp: '12+ years specializing in neural surgery, stroke prevention, and advanced neurological therapeutics.',
    },
    {
      name: 'Dr. Emily Watson, MD',
      role: 'Lead Pediatrician & Neonatologist',
      photo: '/images/doctors/dr_emily_watson.jpg',
      dept: 'Pediatrics',
      exp: '9+ years caring for infant emergencies, pediatric vaccinations, and comprehensive child development.',
    },
    {
      name: 'Dr. David Miller, MD',
      role: 'Chief Orthopedic & Trauma Surgeon',
      photo: '/images/doctors/dr_david_miller.jpg',
      dept: 'Orthopedics',
      exp: '11+ years leading joint reconstruction, arthroscopy, and sports injury recovery programs.',
    },
  ];

  return (
    <div className="landing-page page-transition">
      {/* 1. TOP HEADER / NAVBAR (STICKY) */}
      <nav className="navbar navbar-expand-lg py-3 px-4 px-md-5 pos-navbar-sticky">
        <div className="container-fluid px-0">
          <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }} onClick={() => onNavigate('landing')}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="heroBrandGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#18181B" />
                  <stop offset="1" stopColor="#27272A" />
                </linearGradient>
              </defs>
              <rect width="36" height="36" rx="10" fill="url(#heroBrandGrad)" />
              <path d="M18 9V27M9 18H27" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
              <circle cx="18" cy="18" r="3" fill="#FFFFFF" />
            </svg>
            <span className="fs-4 fw-bold text-dark tracking-tight">CarePulse Hospital</span>
          </div>

          <button
            className="navbar-toggler border-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#landingNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="landingNav">
            <ul className="navbar-nav align-items-center gap-2 gap-lg-4 my-3 my-lg-0">
              <li className="nav-item">
                <a className="nav-link text-dark fw-semibold" href="#services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark fw-semibold" href="#use-cases">
                  Specialties
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark fw-semibold" href="#process">
                  Working Process
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark fw-semibold" href="#doctors">
                  Specialists
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark fw-semibold" href="#contracts" onClick={(e) => { e.preventDefault(); onNavigate('contracts'); }}>
                  API Learning
                </a>
              </li>
              <li className="nav-item ms-lg-2">
                <button
                  className="btn-pos-dark py-2 px-3"
                  onClick={() => onNavigate('dashboard')}
                >
                  <i className="bi bi-hospital me-1"></i> Hospital Portal
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="py-5 px-4 px-md-5 bg-white">
        <div className="container-fluid px-0">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <h1 className="display-4 fw-bold text-dark lh-sm mb-4" style={{ letterSpacing: '-0.03em' }}>
                Navigating the healthcare landscape for well-being
              </h1>
              <p className="fs-5 text-secondary mb-4" style={{ maxWidth: 520, lineHeight: 1.6 }}>
                Our modern hospital intelligence platform helps patients, doctors, and staff seamlessly collaborate
                through accurate diagnostics, instant appointment scheduling, and coordinated clinical care.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <button className="btn-pos-dark" onClick={() => onNavigate('appointments')}>
                  Book a consultation
                </button>
                <button className="btn-pos-lime" onClick={() => onNavigate('patients')}>
                  <i className="bi bi-person-plus-fill me-1"></i> Patient Directory
                </button>
              </div>
            </div>

            {/* Modern Hospital Exterior Image with Minimalist White Smoke Badges */}
            <div className="col-12 col-lg-6">
              <div className="position-relative">
                {/* Floating clinical excellence badge */}
                <div
                  className="position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill bg-white shadow-sm d-flex align-items-center gap-2 border"
                  style={{ zIndex: 2, borderColor: 'var(--ws-smoke-border)' }}
                >
                  <span className="rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--ws-smoke)', color: 'var(--ws-dark)', width: 24, height: 24 }}>
                    <i className="bi bi-shield-check" style={{ fontSize: '0.75rem' }}></i>
                  </span>
                  <small className="fw-bold text-dark" style={{ fontSize: '0.8rem' }}>
                    Accredited Medical Center
                  </small>
                </div>

                {/* Floating 24/7 care badge */}
                <div
                  className="position-absolute bottom-0 end-0 m-3 p-3 rounded-4 bg-white shadow-lg d-flex align-items-center gap-3 border"
                  style={{ zIndex: 2, borderColor: 'var(--ws-smoke-border)' }}
                >
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white"
                    style={{ width: 42, height: 42, background: 'var(--ws-dark)' }}
                  >
                    <i className="bi bi-heart-pulse-fill fs-5 text-white"></i>
                  </div>
                  <div>
                    <div className="fw-bold text-dark" style={{ fontSize: '0.88rem' }}>Patient-Centered Care</div>
                    <div className="text-secondary small" style={{ fontSize: '0.75rem' }}>Zero-Wait Triage &bull; 24/7 Care</div>
                  </div>
                </div>

                {/* Hospital Hero Architectural Image */}
                <div
                  className="overflow-hidden rounded-4 shadow-lg border position-relative"
                  style={{ borderColor: 'var(--ws-smoke-border)', height: 420 }}
                >
                  <img
                    src="/images/hospital_hero.jpg"
                    alt="Modern State-of-the-Art Hospital & Wellness Medical Center"
                    className="w-100 h-100 object-fit-cover"
                    style={{ transition: 'transform 0.6s ease' }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 w-100 p-3"
                    style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(24, 24, 27, 0.75) 100%)' }}
                  >
                    <span className="badge text-white px-3 py-1 fw-medium" style={{ backgroundColor: 'rgba(24, 24, 27, 0.85)', backdropFilter: 'blur(4px)' }}>
                      <i className="bi bi-geo-alt-fill me-1 text-white"></i> Main Pavilion &bull; Aurora Health Center
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOGO BAR (ACCORDING TO REFERENCE) */}
      <section className="py-4 border-top border-bottom bg-white" style={{ borderColor: 'var(--pos-dark)' }}>
        <div className="container-fluid px-4 px-md-5">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-4 text-center">
            {['World Health Org', 'Mayo Health', 'Johns Hopkins', 'Harvard Med', 'MedTech Global', 'CarePulse'].map((brand, idx) => (
              <div key={idx} className="flex-fill fw-bold fs-5 text-secondary opacity-75 text-uppercase tracking-wider">
                <i className="bi bi-shield-check text-dark me-1"></i> {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION (6 ALTERNATING CARDS FROM REFERENCE) */}
      <section id="services" className="py-5 px-4 px-md-5 bg-white">
        <div className="container-fluid px-0">
          {/* Section Header */}
          <div className="pos-section-header">
            <span className="pos-tag-lime pos-section-title">Services</span>
            <p className="pos-section-desc">
              At our hospital agency, we offer a comprehensive range of clinical services to help patients heal and doctors manage care efficiently. These services include:
            </p>
          </div>

          {/* 6 Cards Grid */}
          <div className="row g-4">
            {/* Card 1: Emergency & Critical Care */}
            <div className="col-12 col-lg-6">
              <div className="pos-card-base pos-card-grey h-100 d-flex flex-column justify-content-between p-4">
                <div>
                  <div className="mb-4">
                    <span className="pos-tag-lime fs-5 mb-2">Emergency &</span>
                    <br />
                    <span className="pos-tag-lime fs-5">Critical Care</span>
                  </div>
                  <p className="text-secondary small mb-0" style={{ maxWidth: 300, lineHeight: 1.5 }}>
                    24/7 rapid response trauma resuscitation, ICU life support, and urgent ambulance dispatch.
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-end mt-4">
                  <div
                    className="d-flex align-items-center gap-3 cursor-pointer"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onNavigate('appointments')}
                  >
                    <div className="pos-arrow-circle pos-arrow-dark">
                      <i className="bi bi-arrow-up-right"></i>
                    </div>
                    <span className="fw-bold text-dark fs-6">Book visit</span>
                  </div>
                  <div className="text-end">
                    <div className="service-img-wrapper">
                      <img src="/images/services/emergency.jpg" alt="Emergency & Critical Care" className="service-card-img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Cardiology & Heart Health */}
            <div className="col-12 col-lg-6">
              <div className="pos-card-base pos-card-lime h-100 d-flex flex-column justify-content-between p-4">
                <div>
                  <div className="mb-4">
                    <span className="pos-tag-white fs-5 mb-2">Cardiology &</span>
                    <br />
                    <span className="pos-tag-white fs-5">Heart Health</span>
                  </div>
                  <p className="text-dark small mb-0 opacity-80" style={{ maxWidth: 300, lineHeight: 1.5 }}>
                    Comprehensive cardiovascular checkups, advanced ECG telemetry, and arterial stent therapeutics.
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-end mt-4">
                  <div
                    className="d-flex align-items-center gap-3 cursor-pointer"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onNavigate('doctors')}
                  >
                    <div className="pos-arrow-circle pos-arrow-dark">
                      <i className="bi bi-arrow-up-right"></i>
                    </div>
                    <span className="fw-bold text-dark fs-6">Find specialist</span>
                  </div>
                  <div className="text-end">
                    <div className="service-img-wrapper">
                      <img src="/images/services/cardiology.jpg" alt="Cardiology & Heart Health" className="service-card-img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Pediatric Care & Family Medicine */}
            <div className="col-12 col-lg-6">
              <div className="pos-card-base pos-card-dark h-100 d-flex flex-column justify-content-between p-4">
                <div>
                  <div className="mb-4">
                    <span className="pos-tag-lime fs-5 mb-2">Pediatric Care</span>
                    <br />
                    <span className="pos-tag-white fs-5 text-dark">Family Medicine</span>
                  </div>
                  <p className="text-light small mb-0 opacity-75" style={{ maxWidth: 300, lineHeight: 1.5 }}>
                    Gentle healthcare for infants, immunizations, developmental milestones, and routine wellness.
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-end mt-4">
                  <div
                    className="d-flex align-items-center gap-3 cursor-pointer"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onNavigate('patients')}
                  >
                    <div className="pos-arrow-circle pos-arrow-lime">
                      <i className="bi bi-arrow-up-right"></i>
                    </div>
                    <span className="fw-bold text-white fs-6">Patient portal</span>
                  </div>
                  <div className="text-end">
                    <div className="service-img-wrapper" style={{ border: '2px solid rgba(255, 255, 255, 0.15)' }}>
                      <img src="/images/services/pediatrics.jpg" alt="Pediatric Care & Family Medicine" className="service-card-img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Neurology & Brain Surgery */}
            <div className="col-12 col-lg-6">
              <div className="pos-card-base pos-card-grey h-100 d-flex flex-column justify-content-between p-4">
                <div>
                  <div className="mb-4">
                    <span className="pos-tag-lime fs-5 mb-2">Neurology &</span>
                    <br />
                    <span className="pos-tag-lime fs-5">Brain Surgery</span>
                  </div>
                  <p className="text-secondary small mb-0" style={{ maxWidth: 300, lineHeight: 1.5 }}>
                    High-precision neural imaging, stroke rehabilitation, spine surgery, and neurological care.
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-end mt-4">
                  <div
                    className="d-flex align-items-center gap-3 cursor-pointer"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onNavigate('doctors')}
                  >
                    <div className="pos-arrow-circle pos-arrow-dark">
                      <i className="bi bi-arrow-up-right"></i>
                    </div>
                    <span className="fw-bold text-dark fs-6">Our surgeons</span>
                  </div>
                  <div className="text-end">
                    <div className="service-img-wrapper">
                      <img src="/images/services/neurology.jpg" alt="Neurology & Brain Surgery" className="service-card-img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5: Pathology & Diagnostic Lab */}
            <div className="col-12 col-lg-6">
              <div className="pos-card-base pos-card-lime h-100 d-flex flex-column justify-content-between p-4">
                <div>
                  <div className="mb-4">
                    <span className="pos-tag-white fs-5 mb-2">Pathology &</span>
                    <br />
                    <span className="pos-tag-white fs-5">Diagnostic Lab</span>
                  </div>
                  <p className="text-dark small mb-0 opacity-80" style={{ maxWidth: 300, lineHeight: 1.5 }}>
                    Automated molecular blood tests, rapid pathology cultures, biopsy screening, and digital results.
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-end mt-4">
                  <div
                    className="d-flex align-items-center gap-3 cursor-pointer"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onNavigate('appointments')}
                  >
                    <div className="pos-arrow-circle pos-arrow-dark">
                      <i className="bi bi-arrow-up-right"></i>
                    </div>
                    <span className="fw-bold text-dark fs-6">Schedule test</span>
                  </div>
                  <div className="text-end">
                    <div className="service-img-wrapper">
                      <img src="/images/services/pathology.jpg" alt="Pathology & Diagnostic Lab" className="service-card-img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 6: Telemedicine & Data Analytics */}
            <div className="col-12 col-lg-6">
              <div className="pos-card-base pos-card-dark h-100 d-flex flex-column justify-content-between p-4">
                <div>
                  <div className="mb-4">
                    <span className="pos-tag-lime fs-5 mb-2">Telemedicine &</span>
                    <br />
                    <span className="pos-tag-white fs-5 text-dark">Data Analytics</span>
                  </div>
                  <p className="text-light small mb-0 opacity-75" style={{ maxWidth: 300, lineHeight: 1.5 }}>
                    Virtual consultations, real-time vital trends, digital prescription refills, and electronic logs.
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-end mt-4">
                  <div
                    className="d-flex align-items-center gap-3 cursor-pointer"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onNavigate('dashboard')}
                  >
                    <div className="pos-arrow-circle pos-arrow-lime">
                      <i className="bi bi-arrow-up-right"></i>
                    </div>
                    <span className="fw-bold text-white fs-6">Clinical dashboard</span>
                  </div>
                  <div className="text-end">
                    <div className="service-img-wrapper" style={{ border: '2px solid rgba(255, 255, 255, 0.15)' }}>
                      <img src="/images/services/telemedicine.jpg" alt="Telemedicine & Data Analytics" className="service-card-img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. "LET'S MAKE THINGS HAPPEN" BANNER FROM REFERENCE */}
      <section className="py-4 px-4 px-md-5 bg-white">
        <div className="container-fluid px-0">
          <div className="pos-card-base pos-card-grey p-5">
            <div className="row align-items-center">
              <div className="col-12 col-lg-7">
                <h3 className="fw-bold text-dark fs-2 mb-3">Let&apos;s make things happen</h3>
                <p className="text-secondary fs-5 mb-4" style={{ maxWidth: 500 }}>
                  Contact us today to learn more about how our hospital management platform and Express APIs
                  streamline patient care, appointment bookings, and staff records.
                </p>
                <button className="btn-pos-dark" onClick={() => onNavigate('dashboard')}>
                  Open Management Portal
                </button>
              </div>
              <div className="col-12 col-lg-5 text-center mt-4 mt-lg-0">
                <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
                  {/* Floating clinical star illustration */}
                  <ellipse cx="110" cy="110" rx="90" ry="35" stroke="#BAE6FD" strokeWidth="2" strokeDasharray="4 4" />
                  <ellipse cx="110" cy="110" rx="80" ry="25" stroke="#38BDF8" strokeWidth="3" />
                  <circle cx="110" cy="90" r="45" fill="#0F172A" />
                  <circle cx="95" cy="85" r="7" fill="#38BDF8" />
                  <circle cx="125" cy="85" r="7" fill="#38BDF8" />
                  <polygon points="110,140 120,165 145,175 120,185 110,210 100,185 75,175 100,165" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WORKING PROCESS (STEP-BY-STEP ACCORDION) */}
      <section id="process" className="py-5 px-4 px-md-5 bg-white">
        <div className="container-fluid px-0">
          <div className="pos-section-header mb-4">
            <span className="pos-tag-lime fs-5 fw-bold">Our Working Process</span>
            <p className="pos-section-desc small">
              Step-by-step clinical workflow ensuring prompt evaluation, targeted specialist care, and seamless digital recovery.
            </p>
          </div>

          <div className="accordion-process">
            {processSteps.map((step, idx) => {
              const isOpen = activeAccordion === idx;
              return (
                <div
                  key={idx}
                  className={`pos-accordion-item ${isOpen ? 'active' : 'bg-white'}`}
                >
                  <div
                    className="pos-accordion-header"
                    onClick={() => setActiveAccordion(isOpen ? -1 : idx)}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <span className="pos-accordion-number">{step.number}</span>
                      
                      {/* Image-type Icon Badge */}
                      <div 
                        className="process-step-icon shadow-sm"
                        style={{
                          backgroundColor: step.iconBg,
                          color: step.iconColor,
                          border: `1px solid ${step.iconBg}`,
                        }}
                      >
                        <i className={`bi ${step.icon}`}></i>
                      </div>

                      <div>
                        <h5 className="fw-bold mb-0 text-dark fs-5">{step.title}</h5>
                        <small className="text-secondary fw-semibold d-none d-sm-inline" style={{ fontSize: '0.78rem' }}>
                          {step.badge}
                        </small>
                      </div>
                    </div>
                    <div className="pos-accordion-toggle">
                      {isOpen ? '—' : '+'}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="pos-accordion-body">
                      <p className="text-secondary mb-3 lh-base" style={{ fontSize: '0.98rem' }}>
                        {step.content}
                      </p>
                      <div className="d-flex align-items-center gap-2 flex-wrap">
                        <span 
                          className="badge rounded-pill px-3 py-2 fw-semibold border"
                          style={{ backgroundColor: step.iconBg, color: step.iconColor, borderColor: step.iconBg }}
                        >
                          <i className={`bi ${step.icon} me-1`}></i> Standard Clinical Protocol
                        </span>
                        <span className="badge rounded-pill px-3 py-2 bg-white text-secondary border fw-medium">
                          <i className="bi bi-shield-check text-primary me-1"></i> Quality Assured
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. DOCTORS / TEAM SECTION FROM REFERENCE */}
      <section id="doctors" className="py-5 px-4 px-md-5 bg-white">
        <div className="container-fluid px-0">
          <div className="pos-section-header">
            <span className="pos-tag-lime pos-section-title">Team</span>
            <p className="pos-section-desc">
              Meet the skilled and experienced medical staff behind our patient care and operations.
            </p>
          </div>

          <div className="row g-4 mb-4">
            {doctorsList.map((doc, idx) => (
              <div className="col-12 col-md-6" key={idx}>
                <div
                  className="careplus-doc-card hover-lift h-100"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedLandingDoctor(doc)}
                  title="Click to view full doctor details, bio, and consultation hours"
                >
                  <div className="careplus-doc-banner">
                    <span className="careplus-doc-banner-tag">
                      <i className="bi bi-shield-plus me-1" style={{ color: '#0284C7' }}></i>
                      {doc.role?.includes('Cardiologist') ? 'Cardiology' : doc.role?.includes('Neurologist') ? 'Neurology' : doc.role?.includes('Pediatrician') ? 'Pediatrics' : 'Specialist'}
                    </span>
                  </div>

                  <div className="careplus-doc-body">
                    <div className="careplus-doc-avatar-wrap">
                      <div className="doctor-photo-wrap">
                        <img
                          src={doc.photo}
                          alt={doc.name}
                          className="careplus-doc-avatar-img"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/images/doctors/dr_sarah_smith.jpg';
                          }}
                        />
                        <span className="doctor-status-badge doctor-status-available" title="Available"></span>
                      </div>
                      <span className="careplus-doc-rating">
                        <i className="bi bi-star-fill text-warning"></i>
                        4.95 <small className="text-muted fw-normal">(CarePlus Certified)</small>
                      </span>
                    </div>

                    <h5 className="careplus-doc-name text-truncate" title={doc.name}>
                      {doc.name}
                    </h5>
                    <div className="careplus-doc-spec text-truncate" title={doc.role}>
                      {doc.role}
                    </div>

                    <p className="text-secondary small mb-3 flex-grow-1" style={{ lineHeight: 1.6 }}>
                      {doc.exp}
                    </p>

                    <div className="careplus-doc-footer">
                      <span className="careplus-status-pill careplus-status-available">
                        <i className="bi bi-circle-fill" style={{ fontSize: '0.45rem' }}></i>
                        Accepting Consults
                      </span>

                      <button
                        type="button"
                        className="btn-careplus-view"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLandingDoctor(doc);
                        }}
                      >
                        <span>View Profile</span>
                        <i className="bi bi-arrow-right-short" style={{ fontSize: '1rem', marginLeft: -2 }}></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-end">
            <button className="btn-pos-dark" onClick={() => onNavigate('doctors')}>
              See all medical team
            </button>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS (SECTION ABOVE FOOTER IN WHITE & WHITE SMOKE) */}
      <section className="py-5 px-4 px-md-5" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container-fluid px-0">
          <div className="pos-section-header">
            <span className="pos-tag-lime pos-section-title">Testimonials</span>
            <p className="pos-section-desc">
              Hear from our patients and healthcare partners about our attentive medical support.
            </p>
          </div>

          <div
            className="pos-card-base p-5 border"
            style={{ backgroundColor: '#F5F5F5', borderColor: '#E5E5E5' }}
          >
            <div className="row g-4">
              <div className="col-12 col-md-6">
                <div
                  className="p-4 rounded-4 border bg-white"
                  style={{ borderColor: '#E5E5E5' }}
                >
                  <p className="text-dark mb-0 fs-6 lh-base">
                    &quot;We have been using the hospital management platform to schedule surgeries and manage inpatient admissions. The UI is lightning fast, clean, and intuitive.&quot;
                  </p>
                </div>
                <div className="mt-3 ps-3">
                  <h6 className="fw-bold mb-0 text-dark">John Smith</h6>
                  <small className="text-secondary">Director of Cardiology at XYZ Hospital</small>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div
                  className="p-4 rounded-4 border bg-white"
                  style={{ borderColor: '#E5E5E5' }}
                >
                  <p className="text-dark mb-0 fs-6 lh-base">
                    &quot;Patient check-in times dropped significantly. The doctors have clear schedules, and the REST API integration with our backend was effortless!&quot;
                  </p>
                </div>
                <div className="mt-3 ps-3">
                  <h6 className="fw-bold mb-0 text-dark">Jane Doe</h6>
                  <small className="text-secondary">Chief Nursing Officer, Metro Health</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FOOTER IN CLEAN WHITE & WHITE SMOKE */}
      <footer
        className="mt-5 py-5 px-4 px-md-5 rounded-top-5 border-top"
        style={{ backgroundColor: '#F5F5F5', borderColor: '#E5E5E5', color: '#18181B' }}
      >
        <div className="container-fluid px-0">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-4 pb-4 border-bottom" style={{ borderColor: '#E5E5E5' }}>
            <div className="d-flex align-items-center gap-2">
              <svg width="34" height="34" viewBox="0 0 36 36" fill="none">
                <rect width="36" height="36" rx="10" fill="#18181B" />
                <path d="M18 9V27M9 18H27" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <h4 className="fw-bold mb-0 text-dark">CarePulse Hospital</h4>
            </div>

            <div className="d-flex gap-4">
              <a href="#services" className="text-dark text-decoration-none fw-semibold">Services</a>
              <a href="#use-cases" className="text-dark text-decoration-none fw-semibold">Specialties</a>
              <a href="#process" className="text-dark text-decoration-none fw-semibold">Process</a>
              <a href="#doctors" className="text-dark text-decoration-none fw-semibold">Team</a>
            </div>

            <div className="d-flex gap-2">
              {['bi-linkedin', 'bi-facebook', 'bi-twitter-x'].map((icon, idx) => (
                <div
                  key={idx}
                  className="rounded-circle bg-white text-dark d-flex align-items-center justify-content-center border"
                  style={{ width: 36, height: 36, cursor: 'pointer', borderColor: '#E5E5E5' }}
                >
                  <i className={`bi ${icon}`}></i>
                </div>
              ))}
            </div>
          </div>

          <div className="row g-4 mt-4">
            <div className="col-12 col-md-6">
              <span className="pos-tag-lime mb-3 text-dark fw-bold">Contact us:</span>
              <p className="text-secondary mt-2 mb-1">Email: info@carepulsehospital.com</p>
              <p className="text-secondary mb-1">Phone: 555-567-8901</p>
              <p className="text-secondary mb-0">Address: 1234 Healthway Blvd, Medical District</p>
            </div>

            <div className="col-12 col-md-6">
              <div className="p-4 rounded-4 bg-white border" style={{ borderColor: '#E5E5E5' }}>
                <div className="d-flex flex-column flex-sm-row gap-2">
                  <input
                    type="email"
                    className="form-control pos-input"
                    placeholder="Enter your email"
                    style={{ backgroundColor: '#F5F5F5', color: '#18181B', borderColor: '#E5E5E5' }}
                  />
                  <button className="btn-pos-dark text-nowrap">
                    Subscribe to news
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-top text-secondary small d-flex justify-content-between flex-wrap gap-2" style={{ borderColor: '#E5E5E5' }}>
            <span>&copy; 2026 CarePulse Hospital System. All Rights Reserved.</span>
            <span>Frontend built for Express Backend Learning</span>
          </div>
        </div>
      </footer>

      {/* Doctor Information Modal on Card Click */}
      <DoctorDetailModal
        doctor={selectedLandingDoctor}
        onClose={() => setSelectedLandingDoctor(null)}
        onBookAppointment={() => onNavigate('appointments')}
      />
    </div>
  );
}

export default LandingPage;
