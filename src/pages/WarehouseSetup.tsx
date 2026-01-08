import React, { useState } from 'react';
import { Warehouse, Map, Grid, Box } from 'lucide-react';

const WarehouseSetup = () => {
  const [activeTab, setActiveTab] = useState('warehouse');

  const tabs = [
    { id: 'warehouse', label: 'Warehouse Info', icon: Warehouse },
    { id: 'zones', label: 'Zones', icon: Map },
    { id: 'locations', label: 'Locations', icon: Grid },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Warehouse Setup</h1>
          <p className="text-slate-500">Configure warehouses, zones, and location hierarchy</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }
                `}
              >
                <tab.icon className={`
                  -ml-0.5 mr-2 h-5 w-5
                  ${activeTab === tab.id ? 'text-blue-500' : 'text-slate-400 group-hover:text-slate-500'}
                `} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'warehouse' && (
            <div className="space-y-6">
               {/* Placeholder for Warehouse Info Form */}
               <div className="p-4 border border-dashed border-slate-300 rounded-lg text-center text-slate-500">
                 Warehouse Details Form (Name, Code, Address, Type)
               </div>
            </div>
          )}
          {activeTab === 'zones' && (
             <div className="p-4 border border-dashed border-slate-300 rounded-lg text-center text-slate-500">
               Zone Management (Receiving, Storage, Shipping, QC)
             </div>
          )}
          {activeTab === 'locations' && (
             <div className="p-4 border border-dashed border-slate-300 rounded-lg text-center text-slate-500">
               Location Hierarchy (Aisle, Rack, Shelf, Bin)
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WarehouseSetup;
