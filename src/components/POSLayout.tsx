import { ReactNode } from 'react';
import { ArrowLeft, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/posDb';

interface POSLayoutProps {
  children: ReactNode;
  title?: string;
}

const POSLayout = ({ children, title = 'Nimbus POS' }: POSLayoutProps) => {
  const navigate = useNavigate();
  const unsyncedCount = useLiveQuery(() => db.orders.where('syncStatus').equals(0).count()) || 0;
  
  // Mock online status
  const isOnline = true;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* POS Header */}
      <header className="h-14 bg-slate-900 text-white flex items-center justify-between px-4 shadow-md z-20">
        <div className="flex items-center">
          <button onClick={() => navigate('/')} className="mr-3 text-slate-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-lg tracking-wide">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center text-xs bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
            {isOnline ? (
              <span className="flex items-center text-emerald-400 font-medium">
                <Wifi className="w-3 h-3 mr-1.5" /> Online
              </span>
            ) : (
              <span className="flex items-center text-red-400 font-medium">
                <WifiOff className="w-3 h-3 mr-1.5" /> Offline
              </span>
            )}
            <div className="w-px h-3 bg-slate-600 mx-2"></div>
            <span className="text-slate-400 flex items-center">
              <RefreshCw className={`w-3 h-3 mr-1.5 ${unsyncedCount > 0 ? 'animate-spin' : ''}`} /> 
              {unsyncedCount} Pending
            </span>
          </div>
          
          <div className="flex items-center">
             <div className="text-right mr-3 hidden sm:block">
               <div className="text-sm font-semibold">Mbak Ani</div>
               <div className="text-xs text-slate-400">Cashier</div>
             </div>
             <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">MA</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        {children}
      </main>
    </div>
  );
};

export default POSLayout;
