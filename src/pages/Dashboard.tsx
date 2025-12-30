import { useNavigate } from 'react-router-dom';
import { mockInventory, mockPOs, mockSOs } from '../mockData';
import { DollarSign, Package, ShoppingCart, TrendingUp, AlertTriangle, Store, Bell, CheckCircle2, Truck, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ActionWidget = ({ title, count, icon: Icon, color, onClick }: any) => (
  <button 
    onClick={onClick}
    className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all text-left"
  >
    <div className="flex items-center space-x-4">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        <p className="text-xl font-bold text-slate-900">{count}</p>
      </div>
    </div>
    <ArrowRight className="w-4 h-4 text-slate-300" />
  </button>
);

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center">
          <TrendingUp className="w-3 h-3 mr-1" />
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  // Calculate stats
  const totalStockValue = mockInventory.reduce((acc, item) => {
    return acc + (item.quantity * 1000000); 
  }, 0);

  const lowStockItems = mockInventory.filter(i => i.quantity < 10).length;
  const pendingPOs = mockPOs.filter(po => po.status === 'SUBMITTED').length;
  const overdueDOs = mockSOs.filter(so => so.status === 'PROCESSING').length;

  const chartData = [
    { name: 'Mon', Inbound: 40, Outbound: 24 },
    { name: 'Tue', Inbound: 30, Outbound: 13 },
    { name: 'Wed', Inbound: 20, Outbound: 58 },
    { name: 'Thu', Inbound: 27, Outbound: 39 },
    { name: 'Fri', Inbound: 18, Outbound: 48 },
    { name: 'Sat', Inbound: 23, Outbound: 38 },
    { name: 'Sun', Inbound: 34, Outbound: 43 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Command Center</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time overview of your warehouse ecosystem</p>
        </div>
        <div className="flex space-x-2">
           <button 
             onClick={() => navigate('/onboarding')}
             className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
           >
             Setup Wizard
           </button>
           <button 
             onClick={() => navigate('/pos')}
             className="flex items-center px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors shadow-lg shadow-slate-800/20"
           >
             <Store className="w-4 h-4 mr-2" />
             Launch POS
           </button>
        </div>
      </div>

      {/* Action Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ActionWidget 
          title="Items to Reorder" 
          count={lowStockItems} 
          icon={Bell} 
          color="bg-amber-500" 
          onClick={() => navigate('/inventory')}
        />
        <ActionWidget 
          title="Late Shipments" 
          count={overdueDOs} 
          icon={Truck} 
          color="bg-red-500" 
          onClick={() => navigate('/outbound')}
        />
        <ActionWidget 
          title="Pending Approvals" 
          count={pendingPOs} 
          icon={CheckCircle2} 
          color="bg-indigo-500" 
          onClick={() => navigate('/inbox')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Stock Value" 
          value={`Rp ${totalStockValue.toLocaleString()}`} 
          icon={DollarSign} 
          color="bg-blue-500" 
          trend="+12%"
        />
        <StatCard 
          title="Active SKUs" 
          value={mockInventory.length} 
          icon={Package} 
          color="bg-purple-500" 
        />
        <StatCard 
          title="Inbound Today" 
          value="450 Units" 
          icon={ShoppingCart} 
          color="bg-emerald-500"
          trend="+5%"
        />
        <StatCard 
          title="Stock Accuracy" 
          value="99.2%" 
          icon={CheckCircle2} 
          color="bg-cyan-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Inbound vs Outbound Qty (Last 30 Days)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="Inbound" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Outbound" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex items-start pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="h-2 w-2 mt-2 rounded-full bg-blue-500 mr-3"></div>
                <div>
                  <p className="text-sm font-medium text-slate-900">PO-2025-00{i+1} received from Supplier A</p>
                  <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
