import React, { useState } from 'react';
import { Webhook, Key, Activity } from 'lucide-react';

const Integration = () => {
  const [activeTab, setActiveTab] = useState('api-keys');

  const tabs = [
    { id: 'partners', label: 'Partners', icon: Activity },
    { id: 'webhooks', label: 'Webhooks', icon: Webhook },
    { id: 'api-keys', label: 'API Keys', icon: Key },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Integration</h1>
          <p className="text-slate-500">Manage API keys, webhooks, and external partners</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          Create New {activeTab === 'api-keys' ? 'Key' : activeTab === 'webhooks' ? 'Webhook' : 'Partner'}
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
           <div className="text-center py-12 text-slate-500">
              {activeTab === 'api-keys' && "Manage your API Keys here."}
              {activeTab === 'webhooks' && "Configure Webhooks to notify external systems."}
              {activeTab === 'partners' && "Setup integration partners (ERP, Marketplace, etc.)."}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Integration;
