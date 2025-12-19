import { Users, CheckCircle, LogOut, AlertCircle, TrendingUp } from 'lucide-react';
import { useAttendance } from '@/context/AttendanceContext';

export const SummaryCards = () => {
  const { summary } = useAttendance();

  if (!summary) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="stat-card border-l-4 border-muted bg-muted/50 animate-pulse">
          <div className="h-16"></div>
        </div>
      </div>
    );
  }

  const cards = [
    {
      label: 'Total Staff',
      value: summary.totalStaff,
      icon: Users,
      bgColor: 'bg-info/10',
      borderColor: 'border-l-info',
      iconColor: 'text-info',
    },
    {
      label: 'Checked In',
      value: summary.checkedIn,
      icon: CheckCircle,
      bgColor: 'bg-success/10',
      borderColor: 'border-l-success',
      iconColor: 'text-success',
    },
    {
      label: 'Checked Out',
      value: summary.checkedOut,
      icon: LogOut,
      bgColor: 'bg-muted',
      borderColor: 'border-l-muted-foreground',
      iconColor: 'text-muted-foreground',
    },
    {
      label: 'Not Marked',
      value: summary.notMarked,
      icon: AlertCircle,
      bgColor: 'bg-warning/10',
      borderColor: 'border-l-warning',
      iconColor: 'text-warning',
    },
    {
      label: 'Present %',
      value: `${summary.presentPercentage}%`,
      icon: TrendingUp,
      bgColor: 'bg-success/10',
      borderColor: 'border-l-success',
      iconColor: 'text-success',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`stat-card border-l-4 ${card.borderColor} ${card.bgColor} flex-row gap-3 justify-start`}
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-card ${card.iconColor}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{card.label}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
