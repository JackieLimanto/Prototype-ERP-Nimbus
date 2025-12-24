import { mockInventory, mockPOs, mockSOs } from '../mockData';
import { DollarSign, Package, ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  // Calculate stats
  const totalStockValue = mockInventory.reduce((acc, item) => {
    // Find price from mockProducts
    // Simulating a join, in real app backend does this
    return acc + (item.quantity * 1000000); // Mock price avg
  }, 0);

  const lowStockItems = mockInventory.filter(i => i.quantity < 10).length;
  const pendingPOs = mockPOs.filter(po => po.status !== 'RECEIVED' && po.status !== 'CLOSED').length;
  const pendingShipments = mockSOs.filter(so => so.status !== 'COMPLETED' && so.status !== 'SHIPPED').length;

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
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <div className="flex space-x-2">
           <select className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
             <option>Last 7 Days</option>
             <option>Last 30 Days</option>
           </select>
        </div>
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
          title="Open POs" 
          value={pendingPOs} 
          icon={Package} 
          color="bg-purple-500" 
        />
        <StatCard 
          title="Pending Shipments" 
          value={pendingShipments} 
          icon={ShoppingCart} 
          color="bg-emerald-500"
          trend="+5%"
        />
        <StatCard 
          title="Low Stock Items" 
          value={lowStockItems} 
          icon={AlertTriangle} 
          color="bg-amber-500" 
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
