import React, { useState } from 'react';

function ApiContractCard({ contracts = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!contracts || contracts.length === 0) return null;

  return (
    <div 
      className="card border mb-4 rounded-4 overflow-hidden" 
      style={{ borderColor: 'var(--ws-smoke-border)', boxShadow: 'var(--pos-shadow)' }}
    >
      <div 
        className="card-header d-flex justify-content-between align-items-center py-3 px-4 bg-white"
        style={{ borderBottom: '1px solid var(--ws-smoke-border)' }}
      >
        <div className="d-flex align-items-center gap-3">
          <span className="pos-tag-lime small">Express API Contract</span>
          <span className="fw-bold text-dark fs-6">Backend Endpoints ({contracts.length})</span>
        </div>
        <button
          className="btn-pos-dark py-1 px-3 fs-6"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <>
              <i className="bi bi-chevron-up me-1"></i> Hide Contract
            </>
          ) : (
            <>
              <i className="bi bi-code-square me-1"></i> View Express Contract
            </>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="card-body p-4" style={{ backgroundColor: 'var(--ws-smoke)' }}>
          <p className="text-secondary small mb-3">
            <i className="bi bi-info-circle me-1 text-dark"></i>
            Implement these routes in your Express server inside <code>backend/</code>.
          </p>

          <div className="d-flex flex-column gap-3">
            {contracts.map((item, idx) => {
              const isPost = item.method === 'POST';
              const isGet = item.method === 'GET';
              const isDelete = item.method === 'DELETE';

              return (
                <div 
                  key={idx} 
                  className="rounded-4 overflow-hidden border bg-white"
                  style={{ borderColor: 'var(--ws-smoke-border)', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)' }}
                >
                  <div 
                    className="p-3 d-flex align-items-center justify-content-between flex-wrap gap-2"
                    style={{ borderBottom: '1px solid var(--ws-smoke-border)' }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <span 
                        className="badge px-3 py-2 fw-bold text-uppercase border"
                        style={{
                          backgroundColor: isPost ? '#E0F2FE' : isGet ? '#F0FDF4' : isDelete ? '#FEF2F2' : '#F1F5F9',
                          color: isPost ? '#0284C7' : isGet ? '#16A34A' : isDelete ? '#DC2626' : '#334155',
                          borderColor: isPost ? '#BAE6FD' : isGet ? '#BBF7D0' : isDelete ? '#FECACA' : '#E2E8F0',
                        }}
                      >
                        {item.method}
                      </span>
                      <code className="text-dark fw-bold fs-6">{item.endpoint}</code>
                    </div>
                    <span className="text-secondary fw-semibold small">{item.title}</span>
                  </div>

                  <div className="p-3">
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
                        <span className="fw-bold small text-secondary d-block mb-1">
                          Request Data Expected:
                        </span>
                        <div className="bg-dark p-2 rounded-3">
                          <pre className="mb-0 small" style={{ color: '#38BDF8' }}>
                            {JSON.stringify(item.requestBody || item.requestQuery || 'No body required', null, 2)}
                          </pre>
                        </div>
                      </div>

                      <div className="col-12 col-md-6">
                        <span className="fw-bold small text-secondary d-block mb-1">
                          Expected Response (200/201):
                        </span>
                        <div className="bg-dark p-2 rounded-3">
                          <pre className="mb-0 small text-white">
                            {JSON.stringify(item.expectedResponse, null, 2)}
                          </pre>
                        </div>
                      </div>

                      <div className="col-12 col-md-6">
                        <span className="fw-bold small text-secondary d-block mb-1">
                          Frontend Usage:
                        </span>
                        <p className="small text-dark mb-0 p-2 rounded bg-light border">
                          {item.frontendAction}
                        </p>
                      </div>

                      <div className="col-12 col-md-6">
                        <span className="fw-bold small text-secondary d-block mb-1">
                          Expected Error Responses:
                        </span>
                        <p className="small text-danger mb-0 p-2 rounded bg-danger-subtle border border-danger-subtle">
                          {item.expectedErrors}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ApiContractCard;
