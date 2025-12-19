import { LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-header text-header-foreground shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
            <span className="text-success font-bold text-lg">A</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">Attendance System</h1>
            <p className="text-xs opacity-70">Wi-Fi Based Tracking</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-medium text-sm">{user?.name}</p>
              <p className="text-xs opacity-70">{user?.role === 'HR' ? 'HR Manager' : user?.position || user?.role}</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-header-foreground hover:bg-header-foreground/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
