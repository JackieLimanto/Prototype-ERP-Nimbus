import { useState } from 'react';
import { mockSOs } from '../mockData';
import { Plus, Filter, MoreHorizontal } from 'lucide-react';
import clsx from 'clsx';

const Outbound = () => {
  const [activeTab, setActiveTab] = useState<'SO' | 'Picking'>('SO');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Outbound Operations</h1>
          <p className="text-slate-500 mt-1">Manage sales orders and shipping</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
            <Plus className="w-4 h-4 mr-2" />
            Create Order
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('SO')}
              className={clsx(
                "py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                activeTab === 'SO' ? "border-blue-500 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              )}
            >
              Sales Orders
            </button>
            <button
              onClick={() => setActiveTab('Picking')}
              className={clsx(
                "py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                activeTab === 'Picking' ? "border-blue-500 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              )}
            >
              Picking Queue
            </button>
          </nav>
        </div>

        <div className="overflow-x-auto">
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
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Outbound;
