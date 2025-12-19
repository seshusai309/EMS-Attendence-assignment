export type UserRole = 'EMPLOYEE' | 'HR';

export type AttendanceStatus = 'CHECKED_IN' | 'CHECKED_OUT' | 'NOT_MARKED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  position?: string;
}

// Backend API response types
export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  token: string;
  user: User;
}

export interface CheckInResponse {
  message: string;
  checkInTime: string;
}

export interface CheckOutResponse {
  message: string;
  checkOutTime: string;
}

export interface MyStatusResponse {
  status: AttendanceStatus;
  checkInTime?: string;
  checkOutTime?: string;
}

export interface LiveAttendanceItem {
  name: string;
  department: string;
  position: string;
  status: AttendanceStatus;
  checkInTime: string;
  checkOutTime?: string;
}

export interface AttendanceSummary {
  totalStaff: number;
  checkedIn: number;
  checkedOut: number;
  notMarked: number;
  presentPercentage: number;
}
