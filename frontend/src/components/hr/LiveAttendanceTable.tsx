import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAttendance } from '@/context/AttendanceContext';
import { AttendanceStatus } from '@/types/attendance';
import { toast } from 'sonner';

export const LiveAttendanceTable = () => {
  const { liveAttendance, refreshLiveAttendance } = useAttendance();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshLiveAttendance();
      toast.success('Attendance data refreshed');
    } catch (error) {
      toast.error('Failed to refresh attendance data');
    } finally {
      setIsRefreshing(false);
    }
  };

  const filteredAttendance = liveAttendance.filter((record) => {
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || record.department === departmentFilter;
    return matchesStatus && matchesDepartment;
  });

  const departments = [...new Set(liveAttendance.map((a) => a.department))];

  const getStatusBadge = (status: AttendanceStatus) => {
    const config = {
      CHECKED_IN: { bg: 'bg-success/10', text: 'text-success', label: 'Checked In' },
      CHECKED_OUT: { bg: 'bg-warning/10', text: 'text-warning', label: 'Checked Out' },
      NOT_MARKED: { bg: 'bg-danger/10', text: 'text-danger', label: 'Not Marked' },
    };
    const c = config[status];
    return (
      <span className={`status-badge ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '-';
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const calculateDuration = (checkInTime: string, checkOutTime: string) => {
    if (!checkInTime) return '-';
    
    const checkIn = new Date(checkInTime);
    const checkOut = checkOutTime ? new Date(checkOutTime) : new Date();
    
    const diffMs = checkOut.getTime() - checkIn.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m`;
    } else {
      return `${diffMinutes}m`;
    }
  };

  const getTimeSinceLastActivity = (timeString: string) => {
    if (!timeString) return '';
    
    const activityTime = new Date(timeString);
    const now = new Date();
    const diffMs = now.getTime() - activityTime.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    const remainingMinutes = diffMinutes % 60;
    
    return `${diffHours}h ${remainingMinutes}m ago`;
  };

  return (
    <div className="bg-card rounded-lg border overflow-hidden">
      {/* Filters Row */}
      <div className="p-4 border-b flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filter by Status:</span>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="CHECKED_IN">Checked In</SelectItem>
                <SelectItem value="CHECKED_OUT">Checked Out</SelectItem>
                <SelectItem value="NOT_MARKED">Not Marked</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filter by Department:</span>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="section-header flex items-center justify-between rounded-none">
        <span>LIVE ATTENDANCE STATUS - {new Date().toLocaleDateString('en-GB')}</span>
        <span className="flex items-center gap-2 text-success text-xs font-normal normal-case">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
          LIVE
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase border-r">EMP ID</th>
              <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase border-r">Name</th>
              <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase border-r">Department</th>
              <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase border-r">Position</th>
              <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase border-r">Status</th>
              <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase border-r">Check In</th>
              <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase border-r">Check Out</th>
              <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase border-r">Hours</th>
              <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase border-r">Location</th>
              <th className="text-left p-3 text-xs font-semibold text-muted-foreground uppercase">Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-8 text-center text-muted-foreground">
                  No attendance records found for today.
                </td>
              </tr>
            ) : (
              filteredAttendance.map((record, idx) => (
                <tr key={idx} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="p-3 font-medium border-r">USR-{String(idx + 1).padStart(3, '0')}</td>
                  <td className="p-3 font-medium border-r">{record.name}</td>
                  <td className="p-3 text-muted-foreground border-r">{record.department}</td>
                  <td className="p-3 text-muted-foreground border-r">{record.position}</td>
                  <td className="p-3 border-r">{getStatusBadge(record.status)}</td>
                  <td className="p-3 font-mono text-sm border-r">{formatTime(record.checkInTime)}</td>
                  <td className="p-3 font-mono text-sm border-r">{record.checkOutTime ? formatTime(record.checkOutTime) : '-'}</td>
                  <td className="p-3 font-mono text-sm font-medium border-r">
                    {calculateDuration(record.checkInTime, record.checkOutTime)}
                  </td>
                  <td className="p-3 text-muted-foreground border-r">Main Office</td>
                  <td className="p-3 text-muted-foreground">{getTimeSinceLastActivity(record.checkInTime || record.checkOutTime)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
