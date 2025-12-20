```markdown
# EMS Wi-Fi Attendance System

A backend-focused Employee Management System that enforces Wi-Fi-based attendance tracking. Employees can only check-in/check-out when connected to the office network, validated through backend middleware.

----------------------------------------------
## Environment Variables

Create a `.env` file in the root directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OFFICE_WIFI_IP=your_office_ip_or_subnet
NODE_ENV=development
```

## Installation & Setup same commands for both frontend and backend

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Attendance (Employee)
- POST /api/attendance/check-in
- POST /api/attendance/check-out
- GET /api/attendance/my-status

### Attendance (HR)
- GET /api/attendance/live
- GET /api/attendance/summary

### Wi-Fi
- GET /api/attendance/check-wifi
## Assignment Note

This project prioritizes **backend logic and architecture** over UI design. The frontend is minimal and serves only to demonstrate API functionality. Focus areas include middleware design, authentication flow, role-based authorization, and Wi-Fi validation logic.

---

**Built as a backend assignment project**
```
