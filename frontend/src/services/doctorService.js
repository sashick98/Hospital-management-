import api from './api';

/**
 * DOCTOR SERVICE
 *
 * Backend API Contract:
 *
 * 1. GET /api/doctors
 *    - Expected Response: Array of doctor objects OR { doctors: [...] }
 *
 * 2. POST /api/doctors
 *    - Request Body: { name, specialization, department, phone, email, experience, availability }
 *    - Expected Response: { message: "Doctor added successfully", doctor: { ... } }
 */

export const getDoctors = async () => {
  const response = await api.get('/doctors');
  return Array.isArray(response.data) ? response.data : (response.data.doctors || []);
};

export const createDoctor = async (doctorData) => {
  const response = await api.post('/doctors', doctorData);
  return response.data;
};
