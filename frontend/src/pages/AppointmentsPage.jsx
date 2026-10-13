import React, { useState, useEffect } from 'react';
import {
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
  deleteAppointment,
} from '../services/appointmentService';
import ApiContractCard from '../components/ApiContractCard';

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [alert, setAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const getInitialFormState = () => ({
    patientName: '',
    doctorName: '',
    department: 'General Medicine',
    date: '2026-10-09',
    time: '10:00',
    notes: '',
  });
  const [formData, setFormData] = useState(getInitialFormState);

  // API Contracts
  const appointmentContracts = [
    {
      title: 'Get All Appointments',
      endpoint: '/api/appointments',
      method: 'GET',
      requestQuery: 'None (Optional: ?status=Scheduled)',
      expectedResponse: [
        {
          id: '101',
          patientName: 'Jane Smith',
          doctorName: 'Dr. Michael Chen',
          department: 'Cardiology',
          date: '2026-10-05',
          time: '11:00',
          status: 'Scheduled',
          notes: 'Routine checkup',
        },
      ],
      frontendAction: 'Renders appointment schedule table and status badges.',
      expectedErrors: '500 Internal Server Error',
    },
    {
      title: 'Book New Appointment',
      endpoint: '/api/appointments',
      method: 'POST',
      requestBody: {
        patientName: 'Jane Smith',
        doctorName: 'Dr. Michael Chen',
        department: 'Cardiology',
        date: '2026-10-05',
        time: '11:00',
        notes: 'Routine checkup',
      },
      expectedResponse: {
        message: 'Appointment booked successfully',
        appointment: {
          id: '101',
          patientName: 'Jane Smith',
          status: 'Scheduled',
        },
      },
      frontendAction: 'Appends booked appointment into schedule list and closes modal.',
      expectedErrors: '400 Bad Request: { message: "Doctor or date missing" }',
    },
    {
      title: 'Update Appointment Status',
      endpoint: '/api/appointments/:id/status',
      method: 'PATCH',
      requestBody: {
        status: 'Completed',
      },
      expectedResponse: {
        message: 'Status updated successfully',
        appointment: { id: '101', status: 'Completed' },
      },
      frontendAction: 'Updates status tag of the targeted appointment.',
      expectedErrors: '404 Not Found: { message: "Appointment not found" }',
    },
  ];

  const fetchAppointmentsList = async () => {
    setLoading(true);
    try {
      const data = await getAppointments();
      setAppointments(data);
      setAlert(null);
    } catch (err) {
      if (err.isNetworkError) {
        setAlert({
          type: 'warning',
          message: 'Backend server not running yet at http://localhost:5000. Start Express to fetch live appointments!',
        });
      } else {
        setAlert({
          type: 'danger',
          message: err.message || 'Error fetching appointments',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointmentsList();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setAlert(null);

    try {
      const response = await createAppointment(formData);
      setAlert({
        type: 'success',
        message: response.message || 'Appointment booked successfully!',
      });
      setFormData(getInitialFormState());
      setShowModal(false);
      fetchAppointmentsList();
    } catch (err) {
      setAlert({
        type: 'danger',
        message: err.message || 'Failed to book appointment in Express backend.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateAppointmentStatus(id, newStatus);
      setAlert({
        type: 'success',
        message: `Appointment marked as ${newStatus}.`,
      });
      setAppointments((prev) =>
        prev.map((app) =>
          (app.id || app._id) === id ? { ...app, status: newStatus } : app
        )
      );
    } catch (err) {
      setAlert({
        type: 'danger',
        message: err.message || 'Failed to update appointment status.',
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this appointment record?')) return;
    try {
      await deleteAppointment(id);
      setAlert({
        type: 'success',
        message: 'Appointment deleted successfully.',
      });
      setAppointments((prev) => prev.filter((app) => (app.id || app._id) !== id));
    } catch (err) {
      setAlert({
        type: 'danger',
        message: err.message || 'Failed to delete appointment.',
      });
    }
  };

  const filteredAppointments = appointments.filter((app) => {
    if (statusFilter === 'ALL') return true;
    return (app.status || 'Scheduled').toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div className="page-transition">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="pos-tag-lime">Appointments</span>
            <h3 className="fw-bold mb-0 text-dark">Consultation Schedule</h3>
          </div>
          <p className="text-secondary mb-0">Organize clinic visits, doctors on call, and triage queues.</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn-pos-outline" onClick={fetchAppointmentsList}>
            <i className="bi bi-arrow-clockwise me-1"></i> Refresh
          </button>
          <button className="btn-pos-dark" onClick={() => setShowModal(true)}>
            <i className="bi bi-calendar-plus-fill me-1"></i> Book Appointment
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

      {/* API Contract Card */}
      <ApiContractCard contracts={appointmentContracts} />

      {/* Filter Tabs */}
      <div className="pos-card-base pos-card-white p-3 mb-4">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="d-flex gap-2 flex-wrap">
            {['ALL', 'Scheduled', 'Completed', 'Cancelled'].map((st) => (
              <button
                key={st}
                type="button"
                className={`px-3 py-1 rounded-pill fw-semibold border transition-all ${statusFilter === st
                    ? 'btn-pos-dark'
                    : 'btn btn-sm btn-outline-dark'
                  }`}
                onClick={() => setStatusFilter(st)}
              >
                {st}
              </button>
            ))}
          </div>
          <span className="pos-tag-lime small">
            {filteredAppointments.length} Appointments Found
          </span>
        </div>
      </div>

      {/* Table Card */}
      <div className="pos-table-card">
        <div className="table-responsive">
          <table className="table pos-table align-middle mb-0">
            <thead>
              <tr>
                <th scope="col" className="ps-4">Patient</th>
                <th scope="col">Doctor &amp; Department</th>
                <th scope="col">Date &amp; Time</th>
                <th scope="col">Status</th>
                <th scope="col">Clinical Notes</th>
                <th scope="col" className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-5">
                    <div className="spinner-border text-dark" role="status"></div>
                    <p className="text-secondary small mt-2 mb-0">Loading appointments from Express backend...</p>
                  </td>
                </tr>
              ) : filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-secondary">
                    <div className="p-4 d-inline-block rounded-circle bg-light mb-3">
                      <i className="bi bi-calendar-x fs-1 text-dark"></i>
                    </div>
                    <h5 className="fw-bold text-dark">No Appointments Found</h5>
                    <p className="small mb-3 text-secondary">
                      {appointments.length === 0
                        ? 'No appointments returned by your backend yet. Schedule one below!'
                        : 'No appointments match this filter.'}
                    </p>
                    <button className="btn-pos-dark py-2 px-3" onClick={() => setShowModal(true)}>
                      <i className="bi bi-plus-lg me-1"></i> Book First Appointment
                    </button>
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((app, appIdx) => {
                  const appId = app.id || app._id || `app-${appIdx}`;
                  const status = app.status || 'Scheduled';
                  const isCompleted = status === 'Completed';
                  const isCancelled = status === 'Cancelled';

                  return (
                    <tr key={appId}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="rounded-circle text-dark fw-bold d-flex align-items-center justify-content-center"
                            style={{
                              width: 38,
                              height: 38,
                              backgroundColor: 'var(--pos-grey)',
                              border: 'var(--pos-border)',
                            }}
                          >
                            <i className="bi bi-person-fill"></i>
                          </div>
                          <span className="fw-bold text-dark fs-6">{app.patientName}</span>
                        </div>
                      </td>
                      <td>
                        <div className="fw-bold text-dark">{app.doctorName}</div>
                        <small className="text-secondary">{app.department || 'General'}</small>
                      </td>
                      <td>
                        <div className="fw-semibold text-dark small">{app.date}</div>
                        <small className="text-secondary">{app.time || '10:00 AM'}</small>
                      </td>
                      <td>
                        <span
                          className="badge fw-bold px-3 py-1 border"
                          style={{
                            backgroundColor: isCompleted
                              ? '#F0FDF4'
                              : isCancelled
                                ? '#FEF2F2'
                                : 'var(--ws-white)',
                            color: isCompleted
                              ? '#16A34A'
                              : isCancelled
                                ? '#DC2626'
                                : 'var(--ws-dark)',
                            borderColor: isCompleted
                              ? '#BBF7D0'
                              : isCancelled
                                ? '#FECACA'
                                : 'var(--ws-smoke-border)',
                          }}
                        >
                          {status}
                        </span>
                      </td>
                      <td>
                        <span className="small text-secondary text-truncate d-inline-block" style={{ maxWidth: 200 }}>
                          {app.notes || 'Routine consultation'}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <div className="d-flex align-items-center justify-content-end gap-2">
                          {status !== 'Completed' && (
                            <button
                              className="btn btn-sm btn-outline-dark rounded-circle"
                              style={{ width: 34, height: 34, border: 'var(--pos-border)' }}
                              title="Mark as Completed"
                              onClick={() => handleStatusChange(appId, 'Completed')}
                            >
                              <i className="bi bi-check-lg text-success"></i>
                            </button>
                          )}
                          {status !== 'Cancelled' && (
                            <button
                              className="btn btn-sm btn-outline-dark rounded-circle"
                              style={{ width: 34, height: 34, border: 'var(--pos-border)' }}
                              title="Mark as Cancelled"
                              onClick={() => handleStatusChange(appId, 'Cancelled')}
                            >
                              <i className="bi bi-x-lg text-danger"></i>
                            </button>
                          )}
                          <button
                            className="btn btn-sm btn-outline-danger rounded-circle"
                            style={{ width: 34, height: 34, border: 'var(--pos-border)' }}
                            title="Delete Record"
                            onClick={() => handleDelete(appId)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Book Appointment */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(24, 24, 27, 0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 overflow-hidden" style={{ border: 'var(--pos-border)', boxShadow: 'var(--pos-shadow)' }}>
              <div className="modal-header bg-white py-3 px-4" style={{ borderBottom: 'var(--pos-border)' }}>
                <div className="d-flex align-items-center gap-2">
                  <span className="pos-tag-lime small">Booking</span>
                  <h5 className="modal-title fw-bold text-dark mb-0">Book Appointment</h5>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  disabled={submitting}
                ></button>
              </div>

              <form onSubmit={handleCreateAppointment}>
                <div className="modal-body p-4 bg-white">
                  <div className="mb-3">
                    <label className="form-label fw-bold small text-dark">Patient Name *</label>
                    <input
                      type="text"
                      className="form-control pos-input"
                      name="patientName"
                      required
                      value={formData.patientName}
                      onChange={handleInputChange}
                      placeholder="e.g. Jane Smith"
                    />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label fw-bold small text-dark">Doctor Name *</label>
                      <input
                        type="text"
                        className="form-control pos-input"
                        name="doctorName"
                        required
                        value={formData.doctorName}
                        onChange={handleInputChange}
                        placeholder="Dr. Michael Chen"
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-bold small text-dark">Department</label>
                      <select
                        className="form-select pos-input"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                      >
                        <option value="General Medicine">General Medicine</option>
                        <option value="Cardiology">Cardiology</option>
                        <option value="Neurology">Neurology</option>
                        <option value="Pediatrics">Pediatrics</option>
                        <option value="Orthopedics">Orthopedics</option>
                        <option value="Dermatology">Dermatology</option>
                      </select>
                    </div>
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label fw-bold small text-dark">Date *</label>
                      <input
                        type="date"
                        className="form-control pos-input"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-bold small text-dark">Time *</label>
                      <input
                        type="time"
                        className="form-control pos-input"
                        name="time"
                        required
                        value={formData.time}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mb-2">
                    <label className="form-label fw-bold small text-dark">Consultation Notes</label>
                    <textarea
                      className="form-control pos-input"
                      name="notes"
                      rows="2"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Specific symptoms or checkup details..."
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
                        Booking...
                      </>
                    ) : (
                      'Confirm Booking'
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

export default AppointmentsPage;
