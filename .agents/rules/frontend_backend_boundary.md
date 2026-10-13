# Frontend & Backend Development Boundary Rules

## Core Purpose
The user is using this project to **LEARN backend development** (Express.js, REST APIs, middleware, routing, authentication, database operations, validation, error handling, etc.).

## Absolute Boundaries
- **FRONTEND = AI Assistant (Antigravity)**
- **BACKEND = USER (Ashick)**

## Strict Boundary Rules (DO NOT BREAK):
1. **ONLY** work on the React frontend (`frontend/` directory).
2. **DO NOT** create any Express.js backend code.
3. **DO NOT** create `server.js`, `app.js`, routes, controllers, middleware, models, or database code.
4. **DO NOT** install or configure backend packages (no `npm install express`, `mongoose`, `cors`, etc. in backend).
5. **DO NOT** modify anything inside the `backend/` folder.
6. **DO NOT** automatically create APIs or server endpoints.
7. **DO NOT** implement authentication on the backend.
8. **DO NOT** create database logic.
9. **DO NOT** fix backend errors directly.
10. If a backend-related issue occurs, explain what the frontend expects from the backend, but let the user implement the backend themselves.

## Frontend Technology Stack:
- React JS (Vite)
- Bootstrap 5 & Bootstrap Icons (responsive, modern UI)
- JavaScript (clean, beginner-friendly)
- Axios for API requests (centralized in `services/`)
- jQuery only if genuinely useful/requested
- Do not introduce extra frameworks without explicit request.

## Frontend Project Structure:
```
frontend/
    src/
        components/     # Reusable UI components (Navbar, Sidebar, Cards, Modals, etc.)
        pages/          # Application views/screens (Dashboard, Patients, Appointments, etc.)
        services/       # API abstraction layer using Axios
        assets/         # Static assets (images, icons, styles)
        App.jsx         # Root app component with layout and state
        main.jsx        # App entry point
```

## Mandatory Learning Mode (API Contract Documentation):
Whenever creating frontend code that expects or communicates with a backend endpoint, ALWAYS provide the exact API contract:
1. **Endpoint**: e.g., `/api/patients`
2. **HTTP Method**: `GET`, `POST`, `PUT`, `DELETE`, etc.
3. **Request Data**: Query params, headers (e.g. `Authorization`), body payload
4. **Response Data Expected**: JSON structure, status codes (e.g. 200, 201)
5. **Frontend Usage**: What the frontend component/service does with the returned data
6. **Error Responses Expected**: Expected error format (e.g. `{ message: "..." }`) and status codes (400, 401, 404, 500)
