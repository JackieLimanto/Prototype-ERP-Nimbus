import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PackageCheck, 
  Truck, 
  Boxes, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import clsx from 'clsx';

const Sidebar = () => {
  const { logout } = useAuth();

  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/inbound', icon: PackageCheck, label: 'Inbound' },
    { to: '/outbound', icon: Truck, label: 'Outbound' },
    { to: '/inventory', icon: Boxes, label: 'Inventory' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
          NIMBUS ERP
        </div>
      </div>

      <div className="flex-1 py-6 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => clsx(
              "flex items-center px-6 py-3 text-sm font-medium transition-colors relative group",
              isActive 
                ? "text-white bg-slate-800 border-r-4 border-blue-500" 
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            )}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
            <ChevronRight className={clsx(
              "w-4 h-4 ml-auto opacity-0 transition-opacity",
              "group-hover:opacity-100"
            )} />
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={logout}
          className="flex items-center w-full px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors rounded-md hover:bg-slate-800"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
