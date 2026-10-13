import api from './api';

/**
 * PATIENT SERVICE
 *
 * Backend API Contract for these operations:
 *
 * 1. GET /api/patients
 *    - Expected Response: Array of patient objects OR { patients: [...] }
 *
 * 2. POST /api/patients
 *    - Request Body: { name, age, gender, phone, email, bloodGroup, condition }
 *    - Expected Response: { message: "...", patient: { id, name, ... } }
 *
 * 3. GET /api/patients/:id
 *    - Expected Response: Single patient object
 *
 * 4. PUT /api/patients/:id
 *    - Request Body: Updated patient fields
 *    - Expected Response: { message: "...", patient: { ... } }
 *
 * 5. DELETE /api/patients/:id
 *    - Expected Response: { message: "Patient deleted successfully" }
 */

export const getPatients = async () => {
  const response = await api.get('/patients');
  // Handle both array response or { patients: [...] }
  return Array.isArray(response.data) ? response.data : (response.data.patients || []);
};

export const getPatientById = async (id) => {
  const response = await api.get(`/patients/${id}`);
  return response.data;
};

export const createPatient = async (patientData) => {
  const response = await api.post('/patients', patientData);
  return response.data;
};

export const updatePatient = async (id, patientData) => {
  const response = await api.put(`/patients/${id}`, patientData);
  return response.data;
};

export const deletePatient = async (id) => {
  const response = await api.delete(`/patients/${id}`);
  return response.data;
};
