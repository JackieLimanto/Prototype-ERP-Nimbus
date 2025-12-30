import { useState } from 'react';
import { mockReturns, mockPOs, mockSOs } from '../mockData';
import { Plus, Filter, ArrowLeftRight, CheckCircle, XCircle } from 'lucide-react';
import clsx from 'clsx';

const Returns = () => {
  const [activeTab, setActiveTab] = useState<'PURCHASE' | 'SALES'>('PURCHASE');
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // Create Return Form State
  const [returnData, setReturnData] = useState({
    type: 'PURCHASE_RETURN',
    referenceId: '',
    reason: '',
    items: [{ productId: 'p1', qty: 1, condition: 'DAMAGED' }]
  });

  const filteredReturns = mockReturns.filter(r => 
    activeTab === 'PURCHASE' ? r.type === 'PURCHASE_RETURN' : r.type === 'SALES_RETURN'
  );

  const handleCreateReturn = () => {
    alert(`Return Created: ${returnData.type} for Ref: ${returnData.referenceId}`);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Returns Management</h1>
          <p className="text-slate-500 mt-1">Manage Supplier Returns and Customer RMAs</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Return
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('PURCHASE')}
              className={clsx(
                "py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors",
                activeTab === 'PURCHASE' ? "border-blue-500 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"
              )}
            >
              <ArrowLeftRight className="w-4 h-4 mr-2" /> Purchase Returns (Out)
            </button>
            <button
              onClick={() => setActiveTab('SALES')}
              className={clsx(
                "py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors",
                activeTab === 'SALES' ? "border-blue-500 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"
              )}
            >
              <ArrowLeftRight className="w-4 h-4 mr-2" /> Sales Returns (RMA In)
            </button>
          </nav>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Return ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Partner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredReturns.map((ret) => (
                <tr key={ret.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{ret.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{ret.referenceId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{ret.partnerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{ret.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{ret.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      ret.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' :
                      ret.status === 'APPROVED' ? 'bg-blue-100 text-blue-800' :
                      'bg-slate-100 text-slate-800'
                    )}>
                      {ret.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredReturns.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No returns found for this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Create New Return</h3>
              <button onClick={() => setShowCreateModal(false)}><XCircle className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Return Type</label>
                <select 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  value={returnData.type}
                  onChange={(e) => setReturnData({...returnData, type: e.target.value as any})}
                >
                  <option value="PURCHASE_RETURN">Purchase Return (To Supplier)</option>
                  <option value="SALES_RETURN">Sales Return (From Customer)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reference Document</label>
                <select 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  value={returnData.referenceId}
                  onChange={(e) => setReturnData({...returnData, referenceId: e.target.value})}
                >
                  <option value="">Select Reference...</option>
                  {returnData.type === 'PURCHASE_RETURN' 
                    ? mockPOs.map(po => <option key={po.id} value={po.id}>{po.id} - {po.supplierName}</option>)
                    : mockSOs.map(so => <option key={so.id} value={so.id}>{so.id} - {so.customerName}</option>)
                  }
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
                <textarea 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  rows={3}
                  placeholder="Reason for return..."
                  value={returnData.reason}
                  onChange={(e) => setReturnData({...returnData, reason: e.target.value})}
                />
              </div>
            </div>
            <div className="p-4 border-t bg-slate-50 flex justify-end gap-2 rounded-b-xl">
              <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-slate-600 font-medium">Cancel</button>
              <button onClick={handleCreateReturn} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Returns;
