import { Wifi, WifiOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { wifiAPI } from '@/lib/api';

interface WifiStatus {
  connected: boolean;
  message: string;
  ip?: string;
}

export const NetworkBanner = () => {
  const [wifiStatus, setWifiStatus] = useState<WifiStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkWifiStatus = async () => {
      try {
        const response = await wifiAPI.checkWifi();
        setWifiStatus(response);
      } catch (error) {
        setWifiStatus({ connected: false, message: 'Failed to check Wi-Fi status' });
      } finally {
        setLoading(false);
      }
    };

    checkWifiStatus();
    // Check every 30 seconds
    const interval = setInterval(checkWifiStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="network-banner animate-fade-in">
        <div className="flex items-center justify-center w-10 h-10 bg-gray-100">
          <Wifi className="w-5 h-5 text-gray-500 animate-pulse" />
        </div>
        <div>
          <p className="font-semibold text-gray-600">Checking network connection...</p>
          <p className="text-sm text-gray-500">Verifying Wi-Fi status</p>
        </div>
      </div>
    );
  }

  if (wifiStatus?.connected) {
    return (
      <div className="network-banner network-banner-connected animate-fade-in">
        <div className="flex items-center justify-center w-10 h-10 bg-success/20">
          <Wifi className="w-5 h-5 text-success" />
        </div>
        <div>
          <p className="font-semibold text-success">CONNECTED TO COMPANY NETWORK</p>
          <p className="text-sm text-success/80">
            {wifiStatus.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="network-banner network-banner-disconnected animate-fade-in">
      <div className="flex items-center justify-center w-10 h-10 bg-destructive/20">
        <WifiOff className="w-5 h-5 text-destructive" />
      </div>
      <div>
        <p className="font-semibold text-destructive">NOT CONNECTED TO COMPANY NETWORK</p>
        <p className="text-sm text-destructive/80">
          {wifiStatus?.message || 'Please connect to office Wi-Fi to check in/out'}
        </p>
      </div>
    </div>
  );
};
