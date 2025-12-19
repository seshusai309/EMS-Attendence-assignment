import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { MyStatusResponse, LiveAttendanceItem, AttendanceSummary, AttendanceStatus } from '@/types/attendance';
import { attendanceAPI } from '@/lib/api';
import { useAuth } from './AuthContext';

interface AttendanceContextType {
  myStatus: MyStatusResponse | null;
  liveAttendance: LiveAttendanceItem[];
  summary: AttendanceSummary | null;
  isLoading: boolean;
  checkIn: () => Promise<boolean>;
  checkOut: () => Promise<boolean>;
  refreshMyStatus: () => Promise<void>;
  refreshLiveAttendance: () => Promise<void>;
  refreshSummary: () => Promise<void>;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export const AttendanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [myStatus, setMyStatus] = useState<MyStatusResponse | null>(null);
  const [liveAttendance, setLiveAttendance] = useState<LiveAttendanceItem[]>([]);
  const [summary, setSummary] = useState<AttendanceSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshMyStatus = useCallback(async () => {
    if (!isAuthenticated || user?.role !== 'EMPLOYEE') return;
    
    try {
      const data = await attendanceAPI.myStatus();
      setMyStatus(data);
    } catch (error: any) {
      console.error('Failed to fetch my status:', error);
      if (error.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
  }, [isAuthenticated, user?.role]);

  const refreshLiveAttendance = useCallback(async () => {
    if (!isAuthenticated || user?.role !== 'HR') return;
    
    try {
      const data = await attendanceAPI.liveAttendance();
      setLiveAttendance(data);
    } catch (error: any) {
      console.error('Failed to fetch live attendance:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
  }, [isAuthenticated, user?.role]);

  const refreshSummary = useCallback(async () => {
    if (!isAuthenticated || user?.role !== 'HR') return;
    
    try {
      const data = await attendanceAPI.summary();
      setSummary(data);
    } catch (error: any) {
      console.error('Failed to fetch summary:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
  }, [isAuthenticated, user?.role]);

  // Auto-refresh data based on role
  useEffect(() => {
    if (!isAuthenticated) return;

    if (user?.role === 'EMPLOYEE') {
      refreshMyStatus();
      // Refresh every 30 seconds
      const interval = setInterval(refreshMyStatus, 30000);
      return () => clearInterval(interval);
    } else if (user?.role === 'HR') {
      refreshLiveAttendance();
      refreshSummary();
      // Refresh every 10 seconds
      const interval = setInterval(() => {
        refreshLiveAttendance();
        refreshSummary();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, user?.role, refreshMyStatus, refreshLiveAttendance, refreshSummary]);

  const checkIn = useCallback(async (): Promise<boolean> => {
    if (!isAuthenticated || user?.role !== 'EMPLOYEE') return false;
    
    setIsLoading(true);
    try {
      await attendanceAPI.checkIn();
      await refreshMyStatus();
      return true;
    } catch (error: any) {
      console.error('Check-in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, user?.role, refreshMyStatus]);

  const checkOut = useCallback(async (): Promise<boolean> => {
    if (!isAuthenticated || user?.role !== 'EMPLOYEE') return false;
    
    setIsLoading(true);
    try {
      await attendanceAPI.checkOut();
      await refreshMyStatus();
      return true;
    } catch (error: any) {
      console.error('Check-out error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, user?.role, refreshMyStatus]);

  return (
    <AttendanceContext.Provider
      value={{
        myStatus,
        liveAttendance,
        summary,
        isLoading,
        checkIn,
        checkOut,
        refreshMyStatus,
        refreshLiveAttendance,
        refreshSummary,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (context === undefined) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
};
