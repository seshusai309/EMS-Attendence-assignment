import { useState, useEffect } from 'react';
import { Calendar, Clock, XCircle, CheckCircle } from 'lucide-react';
import { AttendanceStatus } from '@/types/attendance';

interface DateTimeDisplayProps {
  status?: AttendanceStatus;
}

export const DateTimeDisplay = ({ status = 'NOT_MARKED' }: DateTimeDisplayProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const getStatusDisplay = () => {
    switch (status) {
      case 'CHECKED_IN':
        return { text: 'Checked In', icon: CheckCircle, color: 'text-success' };
      case 'CHECKED_OUT':
        return { text: 'Checked Out', icon: CheckCircle, color: 'text-warning' };
      default:
        return { text: 'Not Marked', icon: XCircle, color: 'text-danger' };
    }
  };

  const statusDisplay = getStatusDisplay();
  const StatusIcon = statusDisplay.icon;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-card border p-4 flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-info/10">
          <Calendar className="w-5 h-5 text-info" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Today's Date</p>
          <p className="font-medium">{formatDate(currentTime)}</p>
        </div>
      </div>

      <div className="bg-card border p-4 flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-info/10">
          <Clock className="w-5 h-5 text-info" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Current Time</p>
          <p className="font-mono font-medium">{formatTime(currentTime)}</p>
        </div>
      </div>

      <div className="bg-card border p-4 flex items-center gap-3">
        <div className={`flex items-center justify-center w-10 h-10 ${statusDisplay.color}/10`}>
          <StatusIcon className={`w-5 h-5 ${statusDisplay.color}`} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Status</p>
          <p className={`font-medium ${statusDisplay.color}`}>{statusDisplay.text}</p>
        </div>
      </div>
    </div>
  );
};
