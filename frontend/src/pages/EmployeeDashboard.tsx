import { Header } from '@/components/layout/Header';
import { NetworkBanner } from '@/components/attendance/NetworkBanner';
import { DateTimeDisplay } from '@/components/attendance/DateTimeDisplay';
import { CheckInOutCard } from '@/components/attendance/CheckInOutCard';
import { useAttendance } from '@/context/AttendanceContext';

const EmployeeDashboard = () => {
  const { myStatus } = useAttendance();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold">MY ATTENDANCE</h1>
          <p className="text-muted-foreground">User / Attendance Management</p>
        </div>

        {/* Network Status Banner */}
        <NetworkBanner />

        {/* Date, Time, Status */}
        <DateTimeDisplay status={myStatus?.status} />

        {/* Check In / Check Out Cards */}
        <CheckInOutCard />
      </main>
    </div>
  );
};

export default EmployeeDashboard;
