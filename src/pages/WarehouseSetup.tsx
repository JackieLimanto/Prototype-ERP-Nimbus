import React, { useState } from 'react';
import { Warehouse, Map, Grid, Box, ChevronRight, Check } from 'lucide-react';
import { mockWarehouses } from '../mockData';

const WarehouseSetup = () => {
  const [activeTab, setActiveTab] = useState('warehouse');
  const [selectedWh, setSelectedWh] = useState(mockWarehouses[0]);

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
          <div className="mb-6">
             <label className="block text-sm font-medium text-slate-700 mb-2">Select Warehouse to Configure</label>
             <div className="flex gap-4">
               {mockWarehouses.map(wh => (
                 <button 
                    key={wh.id}
                    onClick={() => setSelectedWh(wh)}
                    className={`flex-1 p-4 border rounded-xl text-left transition-all ${selectedWh.id === wh.id ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:border-slate-300'}`}
                 >
                    <div className="flex justify-between items-start">
                       <div>
                         <div className="font-bold text-slate-900">{wh.wh_name}</div>
                         <div className="text-xs text-slate-500 mt-1">{wh.address}</div>
                       </div>
                       {selectedWh.id === wh.id && <Check className="w-4 h-4 text-blue-600" />}
                    </div>
                 </button>
               ))}
             </div>
          </div>

          {activeTab === 'warehouse' && (
            <div className="space-y-6 max-w-2xl">
               <div className="grid grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Warehouse Code</label>
                    <input type="text" value={selectedWh.wh_code} disabled className="w-full px-3 py-2 bg-slate-100 border rounded-lg" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Warehouse Name</label>
                    <input type="text" value={selectedWh.wh_name} readOnly className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                 </div>
                 <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                    <textarea rows={3} value={selectedWh.address} readOnly className="w-full px-3 py-2 border border-slate-300 rounded-lg" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                    <span className="inline-flex px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold uppercase">{selectedWh.wh_type}</span>
                 </div>
               </div>
            </div>
          )}

          {activeTab === 'zones' && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {selectedWh.zones.map(zone => (
                 <div key={zone.id} className="p-4 border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-slate-900">{zone.name}</h3>
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase">{zone.type}</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-4">{zone.locations.length} Locations</p>
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>
                      ))}
                      <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] text-slate-500">
                        +{zone.locations.length}
                      </div>
                    </div>
                 </div>
               ))}
               <button className="p-4 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500 hover:bg-blue-50 transition-all group">
                 <span className="font-medium group-hover:underline">+ Add Zone</span>
               </button>
             </div>
          )}

          {activeTab === 'locations' && (
             <div className="space-y-2">
                {selectedWh.zones.map(zone => (
                  <div key={zone.id} className="border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 font-medium text-sm flex justify-between">
                      <span>{zone.name}</span>
                      <span className="text-slate-500 text-xs">{zone.locations.length} Bins</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {zone.locations.map(loc => (
                        <div key={loc.id} className="px-4 py-3 flex items-center justify-between hover:bg-slate-50">
                          <div className="flex items-center">
                            <Box className="w-4 h-4 text-slate-400 mr-3" />
                            <div>
                              <div className="font-mono text-sm font-medium text-blue-600">{loc.loc_code}</div>
                              <div className="text-xs text-slate-400">Aisle {loc.aisle} • Rack {loc.rack} • Bin {loc.bin}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                             {loc.is_pickable ? (
                               <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">PICKABLE</span>
                             ) : (
                               <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">STORAGE ONLY</span>
                             )}
                             <ChevronRight className="w-4 h-4 text-slate-300" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WarehouseSetup;
