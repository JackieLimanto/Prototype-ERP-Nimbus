import { useState } from 'react';
import { mockProducts, mockWarehouses } from '../mockData';
import { Settings as SettingsIcon, Package, MapPin, Users } from 'lucide-react';
import clsx from 'clsx';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Products');

  const tabs = [
    { name: 'Products', icon: Package },
    { name: 'Warehouses', icon: MapPin },
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
              onClick={() => setActiveTab(tab.name)}
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
