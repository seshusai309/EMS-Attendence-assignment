import { useState } from 'react';
import { LogIn, LogOut, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAttendance } from '@/context/AttendanceContext';
import { toast } from 'sonner';

export const CheckInOutCard = () => {
  const { myStatus, checkIn, checkOut, isLoading } = useAttendance();
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const canCheckIn = myStatus?.status === 'NOT_MARKED';
  const canCheckOut = myStatus?.status === 'CHECKED_IN';

  const handleCheckIn = async () => {
    if (!canCheckIn || isLoading || isCheckingIn) return;
    
    setIsCheckingIn(true);
    try {
      await checkIn();
      toast.success('Successfully checked in!');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to check in. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsCheckingIn(false);
    }
  };

  const handleCheckOut = async () => {
    if (!canCheckOut || isLoading || isCheckingOut) return;
    
    setIsCheckingOut(true);
    try {
      await checkOut();
      toast.success('Successfully checked out!');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to check out. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return '';
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Check In Card */}
      <div className="bg-card border overflow-hidden">
        <div className="section-header flex items-center gap-2">
          <LogIn className="w-4 h-4" />
          CHECK IN
        </div>
        <div className="p-6">
          <p className="text-center text-muted-foreground mb-4">
            Click button to mark your arrival
          </p>
          <Button
            onClick={handleCheckIn}
            disabled={!canCheckIn || isLoading || isCheckingIn}
            className="w-full bg-success hover:bg-success/90 text-success-foreground h-12 text-base font-semibold"
          >
            {isCheckingIn ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Checking In...
              </>
            ) : (
              'CHECK IN NOW'
            )}
          </Button>
          {myStatus?.checkInTime && (
            <p className="text-center text-sm text-success mt-3">
              ✓ Checked in at {formatTime(myStatus.checkInTime)}
            </p>
          )}
        </div>
      </div>

      {/* Check Out Card */}
      <div className="bg-card border overflow-hidden">
        <div className="section-header flex items-center gap-2">
          <LogOut className="w-4 h-4" />
          CHECK OUT
        </div>
        <div className="p-6">
          <p className="text-center text-muted-foreground mb-4">
            Click button to mark your departure
          </p>
          <Button
            onClick={handleCheckOut}
            disabled={!canCheckOut || isLoading || isCheckingOut}
            variant="outline"
            className="w-full h-12 text-base font-semibold border-2"
          >
            {isCheckingOut ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Checking Out...
              </>
            ) : (
              'CHECK OUT NOW'
            )}
          </Button>
          {myStatus?.status === 'NOT_MARKED' && (
            <p className="text-center text-sm text-danger mt-3 flex items-center justify-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Must check in first
            </p>
          )}
          {myStatus?.checkOutTime && (
            <p className="text-center text-sm text-warning mt-3">
              ✓ Checked out at {formatTime(myStatus.checkOutTime)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
