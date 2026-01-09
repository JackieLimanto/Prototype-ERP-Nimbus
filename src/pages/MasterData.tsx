import React, { useState } from 'react';
import { Layers, Package, Users, Truck, Search, Filter } from 'lucide-react';
import { mockProducts, mockSuppliers, mockCustomers } from '../mockData';

const MasterData = () => {
  const [activeTab, setActiveTab] = useState('products');

  const tabs = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'suppliers', label: 'Suppliers', icon: Layers },
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
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">SKU</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Tracking</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {mockProducts.map((p) => (
                            <tr key={p.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-lg object-cover" src={p.thumbnailUrl} alt="" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-slate-900">{p.name}</div>
                                            <div className="text-sm text-slate-500">{p.base_uom}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{p.sku}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{p.category_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-slate-900">{p.stock}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-500">Rp {p.price.toLocaleString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {p.is_batch && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800 mr-1">Batch</span>}
                                    {p.is_expiry && <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Exp</span>}
                                    {!p.is_batch && !p.is_expiry && <span className="text-slate-400 text-xs">-</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          )}
          {activeTab === 'suppliers' && (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Code</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                         {mockSuppliers.map((s) => (
                            <tr key={s.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{s.supplier_code}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{s.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                    <div>{s.email}</div>
                                    <div className="text-xs">{s.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${s.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {s.status}
                                    </span>
                                </td>
                            </tr>
                         ))}
                    </tbody>
                </table>
            </div>
          )}
          {activeTab === 'customers' && (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Code</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Address</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                         {mockCustomers.map((c) => (
                            <tr key={c.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{c.customer_code}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{c.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 truncate max-w-xs">{c.ship_address}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${c.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {c.status}
                                    </span>
                                </td>
                            </tr>
                         ))}
                    </tbody>
                </table>
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