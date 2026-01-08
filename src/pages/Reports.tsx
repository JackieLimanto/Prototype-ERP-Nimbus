import React from 'react';
import { FileText, PieChart, TrendingUp, DollarSign } from 'lucide-react';

const Reports = () => {
  const reportCategories = [
    { title: 'Inventory', reports: ['Stock Summary', 'Stock Movement', 'Low Stock Alert'], icon: Box },
    { title: 'Purchase', reports: ['PO Summary', 'Supplier Performance', 'Receiving History'], icon: TrendingUp },
    { title: 'Sales', reports: ['SO Summary', 'Fulfillment Rate', 'Customer Returns'], icon: DollarSign }, // DollarSign or similar
    { title: 'Audit', reports: ['User Activity Log', 'System Changes'], icon: FileText },
  ];

  // Helper component for Icon
  function Box(props: any) {
      return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
  }


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
          <p className="text-slate-500">Operational and financial reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportCategories.map((category) => (
          <div key={category.title} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <category.icon className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">{category.title} Reports</h2>
            </div>
            <ul className="space-y-2">
              {category.reports.map((report) => (
                <li key={report}>
                  <button className="w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-between group">
                    {report}
                    <span className="text-slate-400 group-hover:text-blue-500">→</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
