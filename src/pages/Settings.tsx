import { useState } from 'react';
import { mockProducts, mockWarehouses, mockSettings, mockSuppliers, mockCustomers } from '../mockData';
import { Settings as SettingsIcon, Package, MapPin, Users, Zap, ShieldAlert, Lock, FileText, UserSquare2 } from 'lucide-react';
import clsx from 'clsx';

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'Products' | 'Warehouses' | 'System Config' | 'Users' | 'General' | 'Partners' | 'Documents'>('Products');

  const tabs = [
    { name: 'Products', icon: Package },
    { name: 'Warehouses', icon: MapPin },
    { name: 'Partners', icon: UserSquare2 },
    { name: 'System Config', icon: Zap },
    { name: 'Documents', icon: FileText },
    { name: 'Users', icon: Users },
    { name: 'General', icon: SettingsIcon },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar Settings Nav */}
      <div className="w-full md:w-64 flex-shrink-0">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Settings</h1>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name as any)}
              className={clsx(
                "w-full flex items-center px-4 py-3 text-sm font-medium transition-colors border-l-4",
                activeTab === tab.name 
                  ? "bg-blue-50 text-blue-700 border-blue-500" 
                  : "text-slate-600 hover:bg-slate-50 border-transparent"
              )}
            >
              <tab.icon className="w-4 h-4 mr-3" />
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 space-y-6">
        {activeTab === 'System Config' && (
          <div className="space-y-6">
            {/* Costing Method Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                <h2 className="font-bold text-slate-900">Costing Method (Valuation)</h2>
                {mockSettings.isCostingLocked && (
                  <span className="flex items-center text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full uppercase tracking-tight">
                    <Lock className="w-3 h-3 mr-1" /> Locked
                  </span>
                )}
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-500 mb-6">
                  Determines how the value of inventory and COGS is calculated. 
                  <span className="text-red-500 font-medium ml-1 italic">TIDAK DAPAT DIUBAH setelah transaksi pertama.</span>
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(['FIFO', 'AVERAGE', 'LAST_PRICE'] as const).map((method) => (
                    <div 
                      key={method}
                      className={clsx(
                        "p-4 border rounded-xl transition-all cursor-not-allowed",
                        mockSettings.costingMethod === method 
                          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/20" 
                          : "border-slate-200 bg-slate-50 opacity-60"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-900">{method.replace('_', ' ')}</span>
                        {mockSettings.costingMethod === method && <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {method === 'FIFO' && "First-In, First-Out. Best for perishable goods."}
                        {method === 'AVERAGE' && "Weighted Average Cost. Balanced valuation."}
                        {method === 'LAST_PRICE' && "Most recent purchase price. Standard for Indonesian MSMEs."}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex items-start p-4 bg-slate-100 rounded-lg border border-slate-200">
                  <ShieldAlert className="w-5 h-5 text-slate-400 mr-3 mt-0.5" />
                  <p className="text-xs text-slate-600 italic">
                    Note: Perubahan metode costing hanya dimungkinkan pada awal tahun fiskal baru dengan persetujuan manajemen dan audit trail lengkap.
                  </p>
                </div>
              </div>
            </div>

            {/* Workflow Toggles */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h2 className="font-bold text-slate-900">Workflow Configuration</h2>
              </div>
              <div className="p-6 divide-y divide-slate-100">
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Quality Check (QC)</h3>
                    <p className="text-xs text-slate-500">Enable mandatory inspection step after receiving items.</p>
                  </div>
                  <button className={`w-12 h-6 rounded-full p-1 transition-colors ${mockSettings.enableQC ? 'bg-blue-600' : 'bg-slate-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${mockSettings.enableQC ? 'translate-x-6' : ''}`}></div>
                  </button>
                </div>
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Put Away Flow</h3>
                    <p className="text-xs text-slate-500">Suggested location logic and confirmation task for staff.</p>
                  </div>
                  <button className={`w-12 h-6 rounded-full p-1 transition-colors ${mockSettings.enablePutAway ? 'bg-blue-600' : 'bg-slate-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${mockSettings.enablePutAway ? 'translate-x-6' : ''}`}></div>
                  </button>
                </div>
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Packing Step</h3>
                    <p className="text-xs text-slate-500">Mandatory package creation before shipping.</p>
                  </div>
                  <button className={`w-12 h-6 rounded-full p-1 transition-colors ${mockSettings.enablePacking ? 'bg-blue-600' : 'bg-slate-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${mockSettings.enablePacking ? 'translate-x-6' : ''}`}></div>
                  </button>
                </div>
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Shipping Step</h3>
                    <p className="text-xs text-slate-500">Carrier selection and tracking number entry.</p>
                  </div>
                  <button className={`w-12 h-6 rounded-full p-1 transition-colors ${mockSettings.enableShipping ? 'bg-blue-600' : 'bg-slate-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${mockSettings.enableShipping ? 'translate-x-6' : ''}`}></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Products' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="font-semibold text-slate-900">Product Master Data</h2>
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700">+ Add Product</button>
             </div>
             <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {mockProducts.map(p => (
                    <tr key={p.id}>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{p.code}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{p.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{p.category}</td>
                      <td className="px-6 py-4 text-sm text-slate-900">Rp {p.price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        )}

        {activeTab === 'Partners' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h2 className="font-bold text-slate-900">Suppliers</h2>
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700">+ Add Supplier</button>
              </div>
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Phone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {mockSuppliers.map(s => (
                    <tr key={s.id}>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{s.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{s.email}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{s.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h2 className="font-bold text-slate-900">Customers</h2>
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700">+ Add Customer</button>
              </div>
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {mockCustomers.map(c => (
                    <tr key={c.id}>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{c.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{c.email}</td>
                      <td className="px-6 py-4 text-sm text-slate-500 truncate max-w-xs">{c.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Documents' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="font-bold text-slate-900">Document Numbering Configuration</h2>
              <p className="text-xs text-slate-500 mt-1">Set auto-generation patterns for your documents</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6">
                {[
                  { label: 'Purchase Order', prefix: 'PO', example: 'PO-202501-0001' },
                  { label: 'Goods Receipt', prefix: 'GR', example: 'GR-202501-0001' },
                  { label: 'Sales Order', prefix: 'SO', example: 'SO-202501-0001' },
                  { label: 'Delivery Order', prefix: 'DO', example: 'DO-202501-0001' },
                  { label: 'Stock Transfer', prefix: 'TRF', example: 'TRF-202501-0001' },
                  { label: 'Stock Adjustment', prefix: 'ADJ', example: 'ADJ-202501-0001' },
                ].map((doc) => (
                  <div key={doc.label} className="flex items-center gap-4 p-4 border border-slate-100 rounded-lg hover:bg-slate-50">
                    <div className="w-40 font-medium text-slate-700">{doc.label}</div>
                    <div className="flex-1 flex gap-2 items-center">
                      <span className="text-sm text-slate-500">Prefix:</span>
                      <input type="text" value={doc.prefix} className="w-20 px-2 py-1 text-sm border rounded" readOnly />
                      <span className="text-sm text-slate-500 ml-4">Pattern:</span>
                      <span className="px-2 py-1 bg-slate-100 text-xs font-mono rounded text-slate-600">{`{PREFIX}-{YYYYMM}-{SEQ}`}</span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Ex: {doc.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Warehouses' && (
           <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                <h2 className="font-semibold text-slate-900">Warehouse Configuration</h2>
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700">+ Add Warehouse</button>
             </div>
             <div className="p-6 grid gap-4">
                {mockWarehouses.map(w => (
                  <div key={w.id} className="border border-slate-200 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-slate-900">{w.name}</h3>
                      <p className="text-sm text-slate-500 flex items-center mt-1">
                        <MapPin className="w-3 h-3 mr-1" /> {w.location}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">Active</span>
                  </div>
                ))}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
