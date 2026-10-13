import React, { useState } from 'react';

function BackendContractPage() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const contracts = [
    {
      group: '1. Health Check',
      method: 'GET',
      endpoint: '/api/health',
      description: 'Used by the frontend navbar to show real-time connectivity status.',
      request: 'No parameters or body.',
      response: {
        status: 'OK',
        message: 'Express backend is live and healthy!',
        timestamp: '2026-10-03T10:30:00Z',
      },
      frontendUsage: 'Toggles the "Connected" green badge in the top navigation bar.',
      expressTip: 'app.get("/api/health", (req, res) => res.json({ status: "OK" }));',
    },
    {
      group: '2. Patients Endpoints',
      method: 'GET',
      endpoint: '/api/patients',
      description: 'Fetches the list of all registered hospital patients.',
      request: 'Optional query params: ?search=john',
      response: [
        {
          id: '1',
          name: 'Sarah Connor',
          age: 38,
          gender: 'Female',
          phone: '9876543210',
          email: 'sarah@example.com',
          bloodGroup: 'A+',
          condition: 'Asthma checkup',
        },
      ],
      frontendUsage: 'Populates the patient list table and counts total patients on dashboard.',
      expressTip: 'Use Model.find() or an in-memory array to return patient records.',
    },
    {
      group: '2. Patients Endpoints',
      method: 'POST',
      endpoint: '/api/patients',
      description: 'Registers a new patient.',
      request: {
        name: 'Sarah Connor',
        age: 38,
        gender: 'Female',
        phone: '9876543210',
        email: 'sarah@example.com',
        bloodGroup: 'A+',
        condition: 'Asthma checkup',
      },
      response: {
        message: 'Patient created successfully',
        patient: {
          id: '101',
          name: 'Sarah Connor',
          age: 38,
          bloodGroup: 'A+',
        },
      },
      frontendUsage: 'Closes the registration modal and adds patient to the list.',
      expressTip: 'Make sure app.use(express.json()) is enabled to parse req.body.',
    },
    {
      group: '2. Patients Endpoints',
      method: 'DELETE',
      endpoint: '/api/patients/:id',
      description: 'Deletes a patient by ID.',
      request: 'URL route parameter: req.params.id',
      response: {
        message: 'Patient deleted successfully',
      },
      frontendUsage: 'Removes the patient row from React state.',
      expressTip: 'router.delete("/patients/:id", (req, res) => { const { id } = req.params; ... });',
    },
    {
      group: '3. Appointments Endpoints',
      method: 'GET',
      endpoint: '/api/appointments',
      description: 'Returns all booked patient appointments.',
      request: 'Optional query params: ?status=Scheduled',
      response: [
        {
          id: '501',
          patientName: 'Jane Smith',
          doctorName: 'Dr. Michael Chen',
          department: 'Cardiology',
          date: '2026-10-05',
          time: '11:00',
          status: 'Scheduled',
          notes: 'Routine checkup',
        },
      ],
      frontendUsage: 'Renders appointment schedule table and status badges.',
      expressTip: 'Filter by req.query.status if provided.',
    },
    {
      group: '3. Appointments Endpoints',
      method: 'POST',
      endpoint: '/api/appointments',
      description: 'Books a new doctor appointment.',
      request: {
        patientName: 'Jane Smith',
        doctorName: 'Dr. Michael Chen',
        department: 'Cardiology',
        date: '2026-10-05',
        time: '11:00',
        notes: 'Routine checkup',
      },
      response: {
        message: 'Appointment booked successfully',
        appointment: {
          id: '501',
          patientName: 'Jane Smith',
          status: 'Scheduled',
        },
      },
      frontendUsage: 'Adds booking to appointment list and shows success alert.',
      expressTip: 'Default new appointment status to "Scheduled" in your model/controller.',
    },
    {
      group: '3. Appointments Endpoints',
      method: 'PATCH',
      endpoint: '/api/appointments/:id/status',
      description: 'Updates status of an appointment.',
      request: {
        status: 'Completed',
      },
      response: {
        message: 'Status updated successfully',
        appointment: { id: '501', status: 'Completed' },
      },
      frontendUsage: 'Updates status badge in the appointment list.',
      expressTip: 'Validate status against allowed enum values ["Scheduled", "Completed", "Cancelled"].',
    },
    {
      group: '4. Doctors Endpoints',
      method: 'GET',
      endpoint: '/api/doctors',
      description: 'Fetches list of hospital doctors and staff.',
      request: 'None',
      response: [
        {
          id: '201',
          name: 'Dr. Sarah Smith',
          specialization: 'Cardiologist',
          department: 'Cardiology',
          phone: '9871122334',
          email: 'dr.sarah@medicare.com',
          experience: '8 years',
          availability: 'Available',
        },
      ],
      frontendUsage: 'Populates doctor directory cards and doctor selector dropdowns.',
      expressTip: 'Return array directly or wrapped in { doctors: [...] }.',
    },
    {
      group: '4. Doctors Endpoints',
      method: 'POST',
      endpoint: '/api/doctors',
      description: 'Adds a new doctor to the staff list.',
      request: {
        name: 'Dr. Sarah Smith',
        specialization: 'Cardiologist',
        department: 'Cardiology',
        phone: '9871122334',
        email: 'dr.sarah@medicare.com',
        experience: '8 years',
        availability: 'Available',
      },
      response: {
        message: 'Doctor added successfully',
        doctor: { id: '201', name: 'Dr. Sarah Smith' },
      },
      frontendUsage: 'Appends doctor into directory and closes modal.',
      expressTip: 'Validate required fields (name, department) before saving.',
    },
  ];

  return (
    <div className="page-transition">
      <div className="mb-4">
        <div className="d-flex align-items-center gap-2 mb-1">
          <span className="pos-tag-lime">Guide</span>
          <h3 className="fw-bold mb-0 text-dark">Backend API Contract Specifications</h3>
        </div>
        <p className="text-secondary mb-0">
          This reference outlines the exact endpoints, request payloads, and expected JSON responses
          your Express backend should implement.
        </p>
      </div>

      {/* Express Setup Essentials */}
      <div className="pos-card-base pos-card-dark p-4 mb-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="pos-tag-lime small">Backend Checklist</span>
          <h5 className="fw-bold text-white mb-0">Quickstart Requirements</h5>
        </div>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="p-3 rounded-4 border bg-white text-dark h-100" style={{ borderColor: '#E2E8F0' }}>
              <h6 className="fw-bold text-dark mb-2">1. Enable CORS</h6>
              <p className="small text-secondary mb-2">
                Allow <code>http://localhost:5173</code> to call your Express server on <code>5000</code>.
              </p>
              <div className="bg-dark p-2 rounded small text-light">
                <code style={{ color: '#38BDF8' }}>{`const cors = require('cors');\napp.use(cors());`}</code>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 rounded-4 border bg-white text-dark h-100" style={{ borderColor: '#E2E8F0' }}>
              <h6 className="fw-bold text-dark mb-2">2. JSON Parser</h6>
              <p className="small text-secondary mb-2">
                Enables Express to read <code>req.body</code> in POST/PATCH requests from Axios.
              </p>
              <div className="bg-dark p-2 rounded small text-light">
                <code style={{ color: '#38BDF8' }}>{`app.use(express.json());`}</code>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 rounded-4 border bg-white text-dark h-100" style={{ borderColor: '#E2E8F0' }}>
              <h6 className="fw-bold text-dark mb-2">3. Port 5000</h6>
              <p className="small text-secondary mb-2">
                Axios in <code>services/api.js</code> communicates with <code>http://localhost:5000/api</code>.
              </p>
              <div className="bg-dark p-2 rounded small text-light">
                <code style={{ color: '#38BDF8' }}>{`app.listen(5000, () => ...);`}</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Endpoints List */}
      <div className="d-flex flex-column gap-4">
        {contracts.map((item, idx) => {
          const isPost = item.method === 'POST';
          const isGet = item.method === 'GET';
          const isDelete = item.method === 'DELETE';

          return (
            <div className="pos-card-base pos-card-white p-4" key={idx}>
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                <div className="d-flex align-items-center gap-3">
                  <span 
                    className="badge px-3 py-2 fw-bold text-uppercase border"
                    style={{
                      backgroundColor: isPost ? '#E0F2FE' : isGet ? '#F0FDF4' : isDelete ? '#FEF2F2' : '#FEF3C7',
                      color: isPost ? '#0284C7' : isGet ? '#16A34A' : isDelete ? '#DC2626' : '#D97706',
                      borderColor: isPost ? '#BAE6FD' : isGet ? '#BBF7D0' : isDelete ? '#FECACA' : '#FDE68A',
                    }}
                  >
                    {item.method}
                  </span>
                  <h5 className="mb-0 fw-bold font-monospace text-dark fs-5">{item.endpoint}</h5>
                  <span className="pos-tag-white small text-secondary">{item.group}</span>
                </div>
                <button
                  className="btn-pos-dark py-1 px-3 fs-6"
                  onClick={() =>
                    copyToClipboard(
                      JSON.stringify(item.response, null, 2),
                      idx
                    )
                  }
                >
                  <i className="bi bi-clipboard me-1"></i>
                  {copiedIndex === idx ? 'Copied Response!' : 'Copy Sample Response'}
                </button>
              </div>

              <p className="text-secondary small mb-3">{item.description}</p>

              <div className="row g-3">
                <div className="col-12 col-lg-6">
                  <div className="border rounded-4 p-3 bg-light h-100" style={{ borderColor: '#E2E8F0' }}>
                    <h6 className="fw-bold small text-dark text-uppercase mb-2">
                      <i className="bi bi-arrow-right-short text-dark"></i> Request Data Expected
                    </h6>
                    <div className="bg-dark p-2 rounded-3 small text-light font-monospace">
                      <pre className="mb-0" style={{ color: '#38BDF8' }}>
                        {typeof item.request === 'string'
                          ? item.request
                          : JSON.stringify(item.request, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-6">
                  <div className="border rounded-4 p-3 bg-light h-100" style={{ borderColor: '#E2E8F0' }}>
                    <h6 className="fw-bold small text-dark text-uppercase mb-2">
                      <i className="bi bi-arrow-left-short text-success"></i> Expected Response JSON
                    </h6>
                    <div className="bg-dark p-2 rounded-3 small text-light font-monospace">
                      <pre className="mb-0 text-white">
                        {JSON.stringify(item.response, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-top border-secondary-subtle d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div className="small text-secondary">
                  <strong className="text-dark">Frontend usage:</strong> {item.frontendUsage}
                </div>
                <div 
                  className="small text-dark font-monospace px-3 py-1 rounded-pill border fw-semibold"
                  style={{ backgroundColor: '#F0F9FF', borderColor: '#BAE6FD', color: '#0369A1' }}
                >
                  💡 {item.expressTip}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BackendContractPage;
