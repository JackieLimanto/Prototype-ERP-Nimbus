import { useState } from 'react';
import { CheckCircle, XCircle, Clock, FileText, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

const Inbox = () => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'PO' | 'ADJUSTMENTS' | 'RETURNS'>('ALL');

  // Mock Approval Data
  const approvals = [
    { id: '1', type: 'PO', reference: 'PO-202501-0012', requestor: 'Dewi Purchasing', amount: 'Rp 15.000.000', date: '2025-01-20', status: 'PENDING' },
    { id: '2', type: 'ADJUSTMENT', reference: 'ADJ-202501-005', requestor: 'Rudi Warehouse', amount: '-5 Qty (Damaged)', date: '2025-01-21', status: 'PENDING' },
    { id: '3', type: 'RETURN', reference: 'RMA-202501-001', requestor: 'Sales Team', amount: 'Rp 2.500.000', date: '2025-01-21', status: 'PENDING' },
  ];

  const filteredApprovals = activeTab === 'ALL' ? approvals : approvals.filter(a => a.type === activeTab.replace('S', ''));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Approval Center</h1>
        <p className="text-slate-500 mt-1">Manage pending approvals for Orders, Adjustments, and Returns</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6">
            {['ALL', 'PO', 'ADJUSTMENTS', 'RETURNS'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={clsx(
                  "py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                  activeTab === tab ? "border-blue-500 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"
                )}
              >
                {tab === 'ALL' ? 'All Pending' : tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredApprovals.map((item) => (
            <div key={item.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-start space-x-4">
                <div className={clsx(
                  "p-2 rounded-lg",
                  item.type === 'PO' ? "bg-blue-100 text-blue-600" :
                  item.type === 'ADJUSTMENT' ? "bg-amber-100 text-amber-600" :
                  "bg-purple-100 text-purple-600"
                )}>
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    {item.reference}
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-normal">
                      {item.type}
                    </span>
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Request from <span className="font-medium">{item.requestor}</span> • {item.date}
                  </p>
                  <p className="text-sm font-medium text-slate-900 mt-1">{item.amount}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">
                  View Details
                </button>
                <button className="flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg">
                  <XCircle className="w-4 h-4 mr-1" /> Reject
                </button>
                <button className="flex items-center px-3 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg">
                  <CheckCircle className="w-4 h-4 mr-1" /> Approve
                </button>
              </div>
            </div>
          ))}
          {filteredApprovals.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                <CheckCircle className="w-6 h-6 text-slate-400" />
              </div>
              <p>No pending approvals in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
