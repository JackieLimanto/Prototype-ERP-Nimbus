import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Layers, Package, Users, Truck } from 'lucide-react';

const MasterData = () => {
  const [activeTab, setActiveTab] = useState('products');

  const tabs = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'suppliers', label: 'Suppliers', icon: Layers }, // Using Layers as generic placeholder if needed
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'transporters', label: 'Transporters', icon: Truck },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Master Data</h1>
          <p className="text-slate-500">Manage products, partners, and transporters</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Package className="w-4 h-4" />
          Add New {activeTab.slice(0, -1).replace(/^\w/, c => c.toUpperCase())}
        </button>
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
          {activeTab === 'products' && (
            <div className="text-center py-12 text-slate-500">
              Product Management Table (Coming Soon)
            </div>
          )}
          {activeTab === 'suppliers' && (
            <div className="text-center py-12 text-slate-500">
              Supplier Management Table (Coming Soon)
            </div>
          )}
          {activeTab === 'customers' && (
            <div className="text-center py-12 text-slate-500">
              Customer Management Table (Coming Soon)
            </div>
          )}
          {activeTab === 'transporters' && (
            <div className="text-center py-12 text-slate-500">
              Transporter Management Table (Coming Soon)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MasterData;
