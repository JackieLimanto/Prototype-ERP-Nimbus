import { useState } from 'react';
import { mockInventory, mockAuditLogs, mockWarehouses } from '../mockData';
import { Search, ArrowRightLeft, PenTool, History, Boxes, BadgeInfo, X, Save } from 'lucide-react';
import clsx from 'clsx';

const Inventory = () => {
  const [activeTab, setActiveTab] = useState<'STOCK' | 'AUDIT'>('STOCK');
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showAdjustModal, setShowAdjustModal] = useState(false);

  // Transfer Form State
  const [transferData, setTransferData] = useState({
    fromLocation: 'A-01-01',
    toLocation: '',
    productId: 'p1',
    qty: 0,
    notes: ''
  });

  // Adjust Form State
  const [adjustData, setAdjustData] = useState({
    location: 'A-01-01',
    productId: 'p1',
    qty: 0,
    reason: 'DAMAGE'
  });

  const handleTransfer = () => {
    // Validation: Check if source location has enough stock (BR-TRF-003)
    // For prototype, we mock this check against the selected 'p1' item
    const sourceItem = mockInventory.find(i => i.productId === transferData.productId && i.location === transferData.fromLocation);
    const availableQty = sourceItem ? sourceItem.quantity : 0;

    if (transferData.qty > availableQty) {
      alert(`Error: Insufficient stock in ${transferData.fromLocation}. Available: ${availableQty} (BR-TRF-003)`);
      return;
    }

    if (transferData.qty <= 0) {
      alert("Error: Transfer quantity must be greater than 0.");
      return;
    }

    alert(`Success: ${transferData.qty} units moved from ${transferData.fromLocation} to ${transferData.toLocation}. Audit log created.`);
    setShowTransferModal(false);
  };

  const handleAdjust = () => {
    // Validation: Check for negative stock (BR-INV-001)
    const targetItem = mockInventory.find(i => i.productId === adjustData.productId && i.location === adjustData.location);
    const currentQty = targetItem ? targetItem.quantity : 0;
    const newQty = currentQty + adjustData.qty;

    if (newQty < 0) {
      alert(`Error: Adjustment would result in negative stock (${newQty}). Operation Blocked (BR-INV-001).`);
      return;
    }

    if (adjustData.qty === 0) {
      alert("Error: Adjustment quantity cannot be zero.");
      return;
    }

    alert(`Success: Inventory adjusted by ${adjustData.qty}. New Quantity: ${newQty}. Reason: ${adjustData.reason}`);
    setShowAdjustModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory Management</h1>
          <p className="text-slate-500 mt-1">Real-time stock levels, valuation, and audit trail</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowTransferModal(true)}
            className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Transfer
          </button>
          <button 
            onClick={() => setShowAdjustModal(true)}
            className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <PenTool className="w-4 h-4 mr-2" />
            Adjust
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('STOCK')}
              className={clsx(
                "py-4 px-1 border-b-2 font-medium text-sm flex items-center",
                activeTab === 'STOCK' ? "border-blue-500 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"
              )}
            >
              <Boxes className="w-4 h-4 mr-2" /> Stock Levels
            </button>
            <button
              onClick={() => setActiveTab('AUDIT')}
              className={clsx(
                "py-4 px-1 border-b-2 font-medium text-sm flex items-center",
                activeTab === 'AUDIT' ? "border-blue-500 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"
              )}
            >
              <History className="w-4 h-4 mr-2" /> Audit History
            </button>
          </nav>
        </div>

        {activeTab === 'STOCK' ? (
          <>
            <div className="p-4 border-b border-slate-200 flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search by product, location, or SKU..." 
                  className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                <option>All Warehouses</option>
                <option>Jakarta Central</option>
                <option>Bandung Hub</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Product Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Warehouse</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Value (IDR)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {mockInventory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{item.productName}</div>
                        <div className="text-xs text-slate-500">ID: {item.productId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.warehouseName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-slate-100 rounded text-xs font-mono font-medium text-slate-700">
                          {item.location}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">{item.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        Rp {item.value.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.quantity < 10 ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Low Stock
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                            In Stock
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Entity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {mockAuditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 font-mono">{log.timestamp}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{log.user}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={clsx(
                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                        log.action === 'CREATE' ? 'bg-emerald-100 text-emerald-700' :
                        log.action === 'APPROVE' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                      )}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{log.entity}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-6 bg-blue-50 border-t border-blue-100 flex items-start leading-relaxed">
               <BadgeInfo className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
               <p className="text-xs text-blue-700 font-medium">
                 Audit logs are immutable and cannot be modified or deleted. 
                 They serve as the legal record for financial and operational compliance (PSAK 14).
               </p>
            </div>
          </div>
        )}
      </div>

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Stock Transfer</h3>
              <button onClick={() => setShowTransferModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">From Location</label>
                <input type="text" value={transferData.fromLocation} disabled className="w-full px-3 py-2 bg-slate-100 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">To Location</label>
                <input 
                  type="text" 
                  placeholder="e.g. B-02-01" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  value={transferData.toLocation}
                  onChange={e => setTransferData({...transferData, toLocation: e.target.value})} 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Product</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                    <option value="p1">Asus Vivobook</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Qty</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg" 
                    value={transferData.qty}
                    onChange={e => setTransferData({...transferData, qty: parseInt(e.target.value)})}
                  />
                </div>
              </div>
            </div>
            <div className="p-4 border-t bg-slate-50 flex justify-end gap-2 rounded-b-xl">
              <button onClick={() => setShowTransferModal(false)} className="px-4 py-2 text-slate-600 font-medium">Cancel</button>
              <button onClick={handleTransfer} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Confirm Transfer</button>
            </div>
          </div>
        </div>
      )}

      {/* Adjustment Modal */}
      {showAdjustModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Stock Adjustment</h3>
              <button onClick={() => setShowAdjustModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <input type="text" value={adjustData.location} disabled className="w-full px-3 py-2 bg-slate-100 border rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Product</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg">
                    <option value="p1">Asus Vivobook</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Adjustment Qty (+/-)</label>
                  <input 
                    type="number" 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg" 
                    placeholder="-5"
                    value={adjustData.qty}
                    onChange={e => setAdjustData({...adjustData, qty: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reason Code (Wajib)</label>
                <select 
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  value={adjustData.reason}
                  onChange={e => setAdjustData({...adjustData, reason: e.target.value})}
                >
                  <option value="DAMAGE">Damage / Broken</option>
                  <option value="LOST">Lost / Stolen</option>
                  <option value="FOUND">Found Inventory</option>
                  <option value="EXPIRY">Expired</option>
                </select>
              </div>
            </div>
            <div className="p-4 border-t bg-slate-50 flex justify-end gap-2 rounded-b-xl">
              <button onClick={() => setShowAdjustModal(false)} className="px-4 py-2 text-slate-600 font-medium">Cancel</button>
              <button onClick={handleAdjust} className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700">Post Adjustment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
