import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockPOs, mockSuppliers, mockProducts } from '../mockData';
import { Plus, Filter, MoreHorizontal, PackageCheck, X, Save } from 'lucide-react';
import clsx from 'clsx';

const Inbound = () => {
  const [activeTab, setActiveTab] = useState<'PO' | 'GR'>('PO');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  // PO Form State
  const [newPO, setNewPO] = useState({
    supplierId: 's1',
    items: [{ productId: 'p1', qty: 1, price: 0 }]
  });

  const handleReceive = (po: any) => {
    navigate('/inbound/receive', { state: { po } });
  };

  const handleCreatePO = () => {
    alert(`Purchase Order Created for Supplier ${newPO.supplierId} with ${newPO.items.length} items.`);
    setShowCreateModal(false);
  };

  const addItem = () => {
    setNewPO({ ...newPO, items: [...newPO.items, { productId: 'p1', qty: 1, price: 0 }] });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inbound Operations</h1>
          <p className="text-slate-500 mt-1">Manage purchasing and goods receipt</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create {activeTab === 'PO' ? 'Order' : 'Receipt'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('PO')}
              className={clsx(
                "py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                activeTab === 'PO' ? "border-blue-500 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              )}
            >
              Purchase Orders
            </button>
            <button
              onClick={() => setActiveTab('GR')}
              className={clsx(
                "py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                activeTab === 'GR' ? "border-blue-500 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              )}
            >
              Goods Receipts
            </button>
          </nav>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {mockPOs.map((po) => (
                <tr key={po.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{po.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{po.supplierName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{po.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">Rp {po.total.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                      po.status === 'RECEIVED' ? 'bg-emerald-100 text-emerald-800' : 
                      po.status === 'SUBMITTED' ? 'bg-blue-100 text-blue-800' : 
                      po.status === 'APPROVED' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-800'
                    )}>
                      {po.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {po.status !== 'RECEIVED' && po.status !== 'CLOSED' && po.status !== 'CANCELLED' ? (
                      <button 
                        onClick={() => handleReceive(po)}
                        className="text-blue-600 hover:text-blue-900 flex items-center ml-auto"
                      >
                        <PackageCheck className="w-4 h-4 mr-1" /> Receive
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
        </div>
      </div>

      {/* Create PO Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Create Purchase Order</h3>
              <button onClick={() => setShowCreateModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Supplier</label>
                <select 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  value={newPO.supplierId}
                  onChange={(e) => setNewPO({...newPO, supplierId: e.target.value})}
                >
                  {mockSuppliers.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-slate-900">Items</h4>
                  <button onClick={addItem} className="text-sm text-blue-600 font-medium">+ Add Line</button>
                </div>
                {newPO.items.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <select 
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      value={item.productId}
                      onChange={(e) => {
                        const newItems = [...newPO.items];
                        newItems[idx].productId = e.target.value;
                        setNewPO({...newPO, items: newItems});
                      }}
                    >
                      {mockProducts.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                    <input 
                      type="number" 
                      className="w-24 px-3 py-2 border border-slate-300 rounded-lg text-sm" 
                      placeholder="Qty"
                      value={item.qty}
                      onChange={(e) => {
                        const newItems = [...newPO.items];
                        newItems[idx].qty = parseInt(e.target.value);
                        setNewPO({...newPO, items: newItems});
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t bg-slate-50 flex justify-end gap-2 rounded-b-xl">
              <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-slate-600 font-medium">Cancel</button>
              <button onClick={handleCreatePO} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center">
                <Save className="w-4 h-4 mr-2" />
                Submit Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inbound;
