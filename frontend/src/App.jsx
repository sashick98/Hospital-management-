import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import PatientsPage from './pages/PatientsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import DoctorsPage from './pages/DoctorsPage';
import BackendContractPage from './pages/BackendContractPage';

function App() {
  // Defaults to the Landing Page inspired by the Positivus design
  const [activePage, setActivePage] = useState('landing');

  // If on public Landing Page, render the full landing experience
  if (activePage === 'landing') {
    return <LandingPage onNavigate={setActivePage} />;
  }

  // Otherwise, render the Hospital Management Portal Layout
  const renderPortalPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage onNavigate={setActivePage} />;
      case 'patients':
        return <PatientsPage />;
      case 'appointments':
        return <AppointmentsPage />;
      case 'doctors':
        return <DoctorsPage />;
      case 'contracts':
        return <BackendContractPage />;
      default:
        return <DashboardPage onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="portal-layout page-transition">
      {/* Sidebar Navigation */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content Area */}
      <div className="portal-main">
        <Navbar activePage={activePage} setActivePage={setActivePage} />
        <main className="portal-content">
          {renderPortalPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
