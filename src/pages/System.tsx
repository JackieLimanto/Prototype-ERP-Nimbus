import React, { useState } from 'react';
import { Building, Shield, Settings, GitBranch } from 'lucide-react';

const System = () => {
  const [activeTab, setActiveTab] = useState('tenant');

  const tabs = [
    { id: 'tenant', label: 'Tenant Setup', icon: Building },
    { id: 'access', label: 'Access Control', icon: Shield },
    { id: 'config', label: 'System Config', icon: Settings },
    { id: 'workflow', label: 'Workflows', icon: GitBranch },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System</h1>
          <p className="text-slate-500">Configure tenant, users, roles, and system-wide settings</p>
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
          {activeTab === 'tenant' && (
             <div className="p-4 border border-dashed border-slate-300 rounded-lg text-center text-slate-500">
               Tenant Details (Name, Address, Logo, Currency, Timezone)
             </div>
          )}
          {activeTab === 'access' && (
             <div className="p-4 border border-dashed border-slate-300 rounded-lg text-center text-slate-500">
               User & Role Management
             </div>
          )}
          {activeTab === 'config' && (
             <div className="p-4 border border-dashed border-slate-300 rounded-lg text-center text-slate-500">
               General System Options & Modules
             </div>
          )}
           {activeTab === 'workflow' && (
             <div className="p-4 border border-dashed border-slate-300 rounded-lg text-center text-slate-500">
               Approval Workflows (PO, SO, Adjustments)
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default System;
