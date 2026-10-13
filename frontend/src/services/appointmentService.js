import api from './api';

/**
 * APPOINTMENT SERVICE
 *
 * Backend API Contract:
 *
 * 1. GET /api/appointments
 *    - Expected Response: Array of appointment objects OR { appointments: [...] }
 *
 * 2. POST /api/appointments
 *    - Request Body: { patientName, doctorName, department, date, time, notes }
 *    - Expected Response: { message: "Appointment booked successfully", appointment: { ... } }
 *
 * 3. PATCH/PUT /api/appointments/:id/status
 *    - Request Body: { status: "Scheduled" | "Completed" | "Cancelled" }
 *    - Expected Response: { message: "Status updated", appointment: { ... } }
 *
 * 4. DELETE /api/appointments/:id
 *    - Expected Response: { message: "Appointment deleted" }
 */

export const getAppointments = async () => {
  const response = await api.get('/appointments');
  return Array.isArray(response.data) ? response.data : (response.data.appointments || []);
};

export const createAppointment = async (appointmentData) => {
  const response = await api.post('/appointments', appointmentData);
  return response.data;
};

export const updateAppointmentStatus = async (id, status) => {
  const response = await api.patch(`/appointments/${id}/status`, { status });
  return response.data;
};

export const deleteAppointment = async (id) => {
  const response = await api.delete(`/appointments/${id}`);
  return response.data;
};
