import React, { useState, useEffect } from 'react';
import { getPatients, createPatient, deletePatient } from '../services/patientService';
import ApiContractCard from '../components/ApiContractCard';

function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBlood, setFilterBlood] = useState('ALL');
  const [alert, setAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const initialFormState = {
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    email: '',
    bloodGroup: 'O+',
    condition: '',
  };
  const [formData, setFormData] = useState(initialFormState);

  // Contracts
  const patientContracts = [
    {
      title: 'Get All Patients',
      endpoint: '/api/patients',
      method: 'GET',
      requestQuery: 'None',
      expectedResponse: [
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
      frontendAction: 'Renders the patient cards and table list.',
      expectedErrors: '500 Internal Server Error: { message: "Server error" }',
    },
    {
      title: 'Register Patient',
      endpoint: '/api/patients',
      method: 'POST',
      requestBody: {
        name: 'Sarah Connor',
        age: 38,
        gender: 'Female',
        phone: '9876543210',
        email: 'sarah@example.com',
        bloodGroup: 'A+',
        condition: 'Asthma checkup',
      },
      expectedResponse: {
        message: 'Patient registered successfully',
        patient: {
          id: 'generated_id',
          name: 'Sarah Connor',
          age: 38,
          gender: 'Female',
          bloodGroup: 'A+',
        },
      },
      frontendAction: 'Adds the newly returned patient into state and closes registration modal.',
      expectedErrors: '400 Bad Request: { message: "Validation error: Name is required" }',
    },
    {
      title: 'Delete Patient',
      endpoint: '/api/patients/:id',
      method: 'DELETE',
      requestQuery: 'Param: :id (e.g. /api/patients/1)',
      expectedResponse: {
        message: 'Patient deleted successfully',
      },
      frontendAction: 'Removes the deleted patient item from React state.',
      expectedErrors: '404 Not Found: { message: "Patient not found" }',
    },
  ];

  const fetchPatientsList = async () => {
    setLoading(true);
    try {
      const data = await getPatients();
      setPatients(data);
      setAlert(null);
    } catch (err) {
      if (err.isNetworkError) {
        setAlert({
          type: 'warning',
          message: 'Backend server not running yet at http://localhost:5000. Start Express to fetch live patients!',
        });
      } else {
        setAlert({
          type: 'danger',
          message: err.message || 'Error fetching patients',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientsList();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitPatient = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setAlert(null);

    try {
      const newPatientPayload = {
        ...formData,
        age: Number(formData.age),
      };

      const response = await createPatient(newPatientPayload);

      setAlert({
        type: 'success',
        message: response.message || 'Patient registered successfully in your backend!',
      });

      setFormData(initialFormState);
      setShowModal(false);
      fetchPatientsList();
    } catch (err) {
      setAlert({
        type: 'danger',
        message: err.message || 'Failed to register patient in Express backend.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete patient "${name}"?`)) return;

    try {
      await deletePatient(id);
      setAlert({
        type: 'success',
        message: `Patient "${name}" deleted successfully.`,
      });
      setPatients((prev) => prev.filter((p) => (p.id || p._id) !== id));
    } catch (err) {
      setAlert({
        type: 'danger',
        message: err.message || 'Failed to delete patient.',
      });
    }
  };

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone?.includes(searchTerm) ||
      patient.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBlood = filterBlood === 'ALL' || patient.bloodGroup === filterBlood;
    return matchesSearch && matchesBlood;
  });

  return (
    <div className="page-transition">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="pos-tag-lime">Patients</span>
            <h3 className="fw-bold mb-0 text-dark">Directory & Admissions</h3>
          </div>
          <p className="text-secondary mb-0">Manage registered clinical profiles, emergency records, and blood groups.</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn-pos-outline" onClick={fetchPatientsList}>
            <i className="bi bi-arrow-clockwise me-1"></i> Refresh
          </button>
          <button className="btn-pos-dark" onClick={() => setShowModal(true)}>
            <i className="bi bi-person-plus-fill me-1"></i> Register New Patient
          </button>
        </div>
      </div>

      {/* Alert Notice */}
      {alert && (
        <div 
          className="pos-card-base pos-card-grey p-3 mb-4 d-flex align-items-center justify-content-between"
          style={{ borderColor: alert.type === 'danger' ? '#FCA5A5' : alert.type === 'success' ? '#86EFAC' : '#FDE68A' }}
        >
          <div className="d-flex align-items-center gap-3">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
              style={{
                width: 36,
                height: 36,
                backgroundColor: alert.type === 'success' ? '#DCFCE7' : alert.type === 'warning' ? '#FEF3C7' : '#FEE2E2',
                color: alert.type === 'success' ? '#15803D' : alert.type === 'warning' ? '#B45309' : '#B91C1C',
              }}
            >
              <i className={`bi ${alert.type === 'success' ? 'bi-check-lg' : 'bi-exclamation-triangle'}`}></i>
            </div>
            <span className="fw-semibold text-dark">{alert.message}</span>
          </div>
          <button type="button" className="btn-close" onClick={() => setAlert(null)}></button>
        </div>
      )}

      {/* API Contract helper card */}
      <ApiContractCard contracts={patientContracts} />

      {/* Search and Filters Card */}
      <div className="pos-card-base pos-card-white p-3 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0" style={{ borderColor: '#CBD5E1' }}>
                <i className="bi bi-search text-dark"></i>
              </span>
              <input
                type="text"
                className="form-control pos-input border-start-0"
                placeholder="Search patient by name, phone or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-6 col-md-3">
            <select
              className="form-select pos-input"
              value={filterBlood}
              onChange={(e) => setFilterBlood(e.target.value)}
            >
              <option value="ALL">All Blood Groups</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div className="col-6 col-md-3 text-end">
            <span className="pos-tag-lime small">
              {filteredPatients.length} Active Records
            </span>
          </div>
        </div>
      </div>

      {/* Patients Table Card */}
      <div className="pos-table-card">
        <div className="table-responsive">
          <table className="table pos-table align-middle mb-0">
            <thead>
              <tr>
                <th scope="col" className="ps-4">Patient Profile</th>
                <th scope="col">Demographics</th>
                <th scope="col">Blood Group</th>
                <th scope="col">Contact Details</th>
                <th scope="col">Medical Notes</th>
                <th scope="col" className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <div className="spinner-border text-dark" role="status"></div>
                    <p className="text-secondary small mt-2 mb-0">Loading patients from Express backend...</p>
                  </td>
                </tr>
              ) : filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-secondary">
                    <div className="p-4 d-inline-block rounded-circle bg-light mb-3">
                      <i className="bi bi-people fs-1 text-dark"></i>
                    </div>
                    <h5 className="fw-bold text-dark">No Patient Records Found</h5>
                    <p className="small mb-3 text-secondary">
                      {patients.length === 0
                        ? 'Your Express backend hasn&apos;t returned any patients yet. Register one below!'
                        : 'No patients matched your filter criteria.'}
                    </p>
                    <button className="btn-pos-dark py-2 px-3" onClick={() => setShowModal(true)}>
                      <i className="bi bi-plus-lg me-1"></i> Register First Patient
                    </button>
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient, pIdx) => {
                  const patientId = patient.id || patient._id || `pat-${pIdx}`;
                  return (
                    <tr key={patientId}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center gap-3">
                          <div 
                            className="rounded-4 fw-bold text-dark d-flex align-items-center justify-content-center"
                            style={{
                              width: 44,
                              height: 44,
                              backgroundColor: 'var(--pos-lime)',
                              border: 'var(--pos-border)',
                            }}
                          >
                            {patient.name?.charAt(0).toUpperCase() || 'P'}
                          </div>
                          <div>
                            <div className="fw-bold text-dark fs-6">{patient.name}</div>
                            <small className="text-secondary">ID: #{String(patientId).substring(0, 8)}</small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="fw-semibold text-dark">{patient.age} yrs</span>
                        <span className="text-secondary small d-block">{patient.gender}</span>
                      </td>
                      <td>
                        <span 
                          className="badge text-dark fw-bold px-3 py-1 border"
                          style={{ backgroundColor: 'var(--ws-smoke)', borderColor: 'var(--ws-smoke-border)' }}
                        >
                          {patient.bloodGroup || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <div className="fw-semibold text-dark small">{patient.phone || '-'}</div>
                        <small className="text-secondary">{patient.email || '-'}</small>
                      </td>
                      <td>
                        <span className="small text-secondary text-truncate d-inline-block" style={{ maxWidth: 220 }}>
                          {patient.condition || 'General health evaluation'}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <button
                          className="btn btn-sm btn-outline-danger rounded-circle p-2"
                          style={{ width: 36, height: 36, border: 'var(--pos-border)' }}
                          title="Delete Patient"
                          onClick={() => handleDelete(patientId, patient.name)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Register Patient (White & Smoke) */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(24, 24, 27, 0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 overflow-hidden" style={{ border: 'var(--pos-border)', boxShadow: 'var(--pos-shadow)' }}>
              <div className="modal-header bg-white py-3 px-4" style={{ borderBottom: 'var(--pos-border)' }}>
                <div className="d-flex align-items-center gap-2">
                  <span className="pos-tag-lime small">New Patient</span>
                  <h5 className="modal-title fw-bold text-dark mb-0">Admission Form</h5>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                ></button>
              </div>

              <form onSubmit={handleSubmitPatient}>
                <div className="modal-body p-4 bg-white">
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-dark">Full Name *</label>
                    <input
                      type="text"
                      className="form-control pos-input"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                    />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label fw-bold small text-dark">Age *</label>
                      <input
                        type="number"
                        className="form-control pos-input"
                        name="age"
                        required
                        min="1"
                        max="120"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="35"
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-bold small text-dark">Gender</label>
                      <select
                        className="form-select pos-input"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label fw-bold small text-dark">Blood Group</label>
                      <select
                        className="form-select pos-input"
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-bold small text-dark">Phone Number *</label>
                      <input
                        type="tel"
                        className="form-control pos-input"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="9876543210"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold small text-dark">Email Address</label>
                    <input
                      type="email"
                      className="form-control pos-input"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="patient@example.com"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label fw-bold small text-dark">Condition / Symptoms</label>
                    <textarea
                      className="form-control pos-input"
                      name="condition"
                      rows="2"
                      value={formData.condition}
                      onChange={handleInputChange}
                      placeholder="Reason for visit, symptoms, or previous diagnosis..."
                    ></textarea>
                  </div>
                </div>

                <div className="modal-footer bg-light p-3" style={{ borderTop: 'var(--pos-border)' }}>
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
                        Saving to Express...
                      </>
                    ) : (
                      'Save to Backend'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientsPage;
