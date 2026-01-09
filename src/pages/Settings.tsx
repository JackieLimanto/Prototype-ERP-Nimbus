import { useState } from 'react';
import { mockWarehouses, mockSettings } from '../mockData';
import { Settings as SettingsIcon, Package, MapPin, Users, Zap, FileText, UserSquare2, Lock, ShieldCheck, Box, Truck, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'Products' | 'Warehouses' | 'Workflows' | 'Users' | 'General' | 'Partners' | 'Documents'>('Products');

  const tabs = [
    { name: 'Products', icon: Package },
    { name: 'Warehouses', icon: MapPin },
    { name: 'Partners', icon: UserSquare2 },
    { name: 'Workflows', icon: Zap },
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
        
        {/* Workflows (Approvals) */}
        {activeTab === 'Workflows' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="font-bold text-slate-900">Approval Workflows</h2>
              <p className="text-xs text-slate-500 mt-1">Configure approval requirements for critical documents.</p>
            </div>
            <div className="divide-y divide-slate-100">
              {mockSettings.workflows.map((wf) => (
                <div key={wf.module} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-900">{wf.module} Approval</h3>
                      {wf.is_enabled && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold uppercase rounded-full">Active</span>}
                    </div>
                    <p className="text-sm text-slate-500">
                      Requires approval from <span className="font-medium text-slate-700">{wf.role_id}</span>
                      {wf.min_amount ? ` for amounts over ${wf.min_amount.toLocaleString()}` : ''}.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                     <button className={clsx(
                       "w-12 h-6 rounded-full p-1 transition-colors",
                       wf.is_enabled ? "bg-blue-600" : "bg-slate-300"
                     )}>
                       <div className={clsx(
                         "w-4 h-4 bg-white rounded-full transition-transform",
                         wf.is_enabled ? "translate-x-6" : ""
                       )} />
                     </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warehouses (Updated with Costing/QC) */}
        {activeTab === 'Warehouses' && (
           <div className="space-y-6">
             <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3">
               <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5" />
               <div>
                 <h4 className="font-bold text-blue-900 text-sm">Warehouse Configuration</h4>
                 <p className="text-sm text-blue-700 mt-1">Costing methods and operational toggles (QC, Putaway) are now configured per warehouse.</p>
               </div>
             </div>

             <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                  <h2 className="font-semibold text-slate-900">Warehouse List</h2>
                  <button className="text-sm text-blue-600 font-medium hover:text-blue-700">+ Add Warehouse</button>
               </div>
               <div className="divide-y divide-slate-200">
                  {mockWarehouses.map(w => (
                    <div key={w.id} className="p-6 hover:bg-slate-50 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{w.wh_name}</h3>
                          <p className="text-sm text-slate-500 flex items-center mt-1">
                            <MapPin className="w-3 h-3 mr-1" /> {w.address} <span className="mx-2">•</span> <span className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">{w.wh_code}</span>
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">Active</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                          <div className="text-xs text-slate-500 uppercase font-semibold mb-1">Costing Method</div>
                          <div className="flex items-center text-sm font-bold text-slate-800">
                            {w.costing_method.replace('_', ' ').toUpperCase()}
                            <Lock className="w-3 h-3 text-amber-500 ml-2" />
                          </div>
                        </div>
                        
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                          <div>
                            <div className="text-xs text-slate-500 uppercase font-semibold mb-1">Quality Check</div>
                            <div className="text-sm font-bold text-slate-800">{w.enable_qc ? 'Enabled' : 'Disabled'}</div>
                          </div>
                          {w.enable_qc ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300" />}
                        </div>

                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                          <div>
                            <div className="text-xs text-slate-500 uppercase font-semibold mb-1">Put Away</div>
                            <div className="text-sm font-bold text-slate-800">{w.enable_put_away ? 'Enabled' : 'Disabled'}</div>
                          </div>
                          {w.enable_put_away ? <Box className="w-5 h-5 text-blue-500" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300" />}
                        </div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {/* Products (Placeholder) */}
        {activeTab === 'Products' && (
          <div className="p-12 text-center bg-white rounded-xl border border-slate-200 border-dashed">
             <Package className="w-12 h-12 mx-auto text-slate-300 mb-4" />
             <h3 className="text-lg font-medium text-slate-900">Product Management</h3>
             <p className="text-slate-500 mb-6">Manage your master product catalog here.</p>
             <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Go to Master Data</button>
          </div>
        )}

        {activeTab === 'Partners' && (
          <div className="p-12 text-center bg-white rounded-xl border border-slate-200 border-dashed">
             <Users className="w-12 h-12 mx-auto text-slate-300 mb-4" />
             <h3 className="text-lg font-medium text-slate-900">Partner Management</h3>
             <p className="text-slate-500 mb-6">Manage suppliers and customers.</p>
             <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Go to Master Data</button>
          </div>
        )}

        {/* Documents (Dynamic Numbering) */}
        {activeTab === 'Documents' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
              <h2 className="font-bold text-slate-900">Document Numbering Configuration</h2>
              <p className="text-xs text-slate-500 mt-1">Set auto-generation patterns for your documents</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6">
                {mockSettings.numbering.map((doc) => (
                  <div key={doc.doc_type} className="flex items-center gap-4 p-4 border border-slate-100 rounded-lg hover:bg-slate-50">
                    <div className="w-40 font-medium text-slate-700">
                      {doc.doc_type === 'PO' && 'Purchase Order'}
                      {doc.doc_type === 'SO' && 'Sales Order'}
                      {doc.doc_type === 'GRN' && 'Goods Receipt'}
                      {doc.doc_type === 'DO' && 'Delivery Order'}
                      {doc.doc_type === 'ADJ' && 'Adjustment'}
                    </div>
                    <div className="flex-1 flex gap-2 items-center flex-wrap">
                      <span className="text-sm text-slate-500">Prefix:</span>
                      <input type="text" value={doc.prefix} className="w-20 px-2 py-1 text-sm border rounded" readOnly />
                      <span className="text-sm text-slate-500 ml-4">Next Num:</span>
                      <input type="text" value={doc.next_number} className="w-24 px-2 py-1 text-sm border rounded font-mono" readOnly />
                      <span className="text-sm text-slate-500 ml-4">Pattern:</span>
                      <span className="px-2 py-1 bg-slate-100 text-xs font-mono rounded text-slate-600">
                        {`{PREFIX}{YYYYMM}{SEQ:${doc.padding}}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Settings;