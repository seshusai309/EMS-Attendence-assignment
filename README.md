```markdown
# EMS Wi-Fi Attendance System

A backend-focused Employee Management System that enforces Wi-Fi-based attendance tracking. Employees can only check-in/check-out when connected to the office network, validated through backend middleware.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Authorization:** Role-based (Employee, HR)

## Key Features

- Wi-Fi-based attendance validation via backend middleware
- JWT authentication with role-based access control
- Employees can check-in/check-out only from office Wi-Fi
- HR dashboard showing live attendance status
- Employees without check-in are marked as `NOT_MARKED`
- RESTful API design

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OFFICE_WIFI_IP=your_office_ip_or_subnet
NODE_ENV=development
```

## Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/attendance/checkin` - Check-in (Wi-Fi validated)
- `POST /api/attendance/checkout` - Check-out (Wi-Fi validated)
- `GET /api/attendance/live` - Live attendance (HR only)

## Assignment Note

This project prioritizes **backend logic and architecture** over UI design. The frontend is minimal and serves only to demonstrate API functionality. Focus areas include middleware design, authentication flow, role-based authorization, and Wi-Fi validation logic.

---

**Built as a backend assignment project**
```
