import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const SystemTimeBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-info/10">
            <Clock className="w-5 h-5 text-info" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">System Date & Time</p>
            <p className="font-medium">{formatDate(currentTime)}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Current Time</p>
          <p className="font-mono font-medium text-lg">{formatTime(currentTime)}</p>
        </div>
      </div>
    </div>
  );
};
