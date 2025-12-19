import { Header } from '@/components/layout/Header';
import { SystemTimeBar } from '@/components/hr/SystemTimeBar';
import { SummaryCards } from '@/components/hr/SummaryCards';
import { LiveAttendanceTable } from '@/components/hr/LiveAttendanceTable';

const HRDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold">REAL-TIME ATTENDANCE MONITORING</h1>
          <p className="text-muted-foreground">HR / Attendance Monitor</p>
        </div>

        {/* System Time Bar */}
        <SystemTimeBar />

        {/* Summary Cards */}
        <SummaryCards />

        {/* Live Attendance Table */}
        <LiveAttendanceTable />
      </main>
    </div>
  );
};

export default HRDashboard;
