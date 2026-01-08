import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockSOs } from '../mockData';
import { Plus, Filter, MoreHorizontal, PackageSearch, Box, Truck, CheckCircle, Package } from 'lucide-react';
import clsx from 'clsx';

const SalesOrder = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'picking' | 'packing' | 'shipping'>('orders');
  const navigate = useNavigate();

  const handlePick = (so: any) => {
    navigate('/outbound/pick', { state: { so } });
  };

  const handleAllocate = (id: string) => {
    alert(`Stock Allocated for SO ${id}. Moved to Picking Queue.`);
  };

  const handlePack = (id: string) => {
    alert(`SO ${id} started Packing.`);
  };

   const handleShip = (id: string) => {
    alert(`SO ${id} Shipped! Tracking generated.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sales Order Management</h1>
          <p className="text-slate-500 mt-1">Manage orders, allocation, picking, packing, and shipping</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
            <Plus className="w-4 h-4 mr-2" />
            Create SO
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('orders')}
              className={clsx(
                "py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                activeTab === 'orders' ? "border-blue-500 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              )}
            >
              Sales Orders
            </button>
            <button
              onClick={() => setActiveTab('picking')}
              className={clsx(
                "py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                activeTab === 'picking' ? "border-blue-500 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              )}
            >
              Picking Queue
            </button>
             <button
              onClick={() => setActiveTab('packing')}
              className={clsx(
                "py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                activeTab === 'packing' ? "border-blue-500 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              )}
            >
              Packing
            </button>
             <button
              onClick={() => setActiveTab('shipping')}
              className={clsx(
                "py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                activeTab === 'shipping' ? "border-blue-500 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              )}
            >
              Shipping
            </button>
          </nav>
        </div>

        <div className="overflow-x-auto">
          {activeTab === 'orders' && (
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {mockSOs.map((so) => (
                <tr key={so.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{so.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{so.customerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{so.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">Rp {so.total.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      so.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 
                      so.status === 'PROCESSING' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-800'
                    )}>
                      {so.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {so.status === 'CONFIRMED' ? (
                       <button 
                         onClick={() => handleAllocate(so.id)}
                         className="text-blue-600 hover:text-blue-900 flex items-center ml-auto"
                         title="Allocate Stock"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" /> Allocate
                      </button>
                    ) : so.status === 'PROCESSING' ? (
                       <button 
                         onClick={() => handlePick(so)}
                         className="text-orange-600 hover:text-orange-900 flex items-center ml-auto"
                         title="Pick Items"
                      >
                        <PackageSearch className="w-4 h-4 mr-1" /> Pick
                      </button>
                    ) : (
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}

          {activeTab === 'picking' && (
              <div className="p-8 text-center text-slate-500">
                  <PackageSearch className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                  <p>Picking Queue</p>
                  <p className="text-xs text-slate-400">Items ready to be picked from shelves</p>
              </div>
          )}
           {activeTab === 'packing' && (
              <div className="p-8 text-center text-slate-500">
                  <Box className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                  <p>Packing Station</p>
                  <p className="text-xs text-slate-400">Scan items to box</p>
              </div>
          )}
           {activeTab === 'shipping' && (
              <div className="p-8 text-center text-slate-500">
                  <Truck className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                  <p>Ready to Ship</p>
                  <p className="text-xs text-slate-400">Generate shipping labels</p>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesOrder;
