import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PurchaseOrder } from '../types';
import { ArrowLeft, Check, AlertTriangle, Sparkles, Calendar, Hash } from 'lucide-react';
import clsx from 'clsx';

const GoodsReceipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const po = location.state?.po as PurchaseOrder;

  const [receivedItems, setReceivedItems] = useState(
    po?.items.map(item => ({
      ...item,
      qtyInput: 0,
      qcPassed: true,
      batchNo: '',
      expiryDate: '',
      suggestedLoc: 'A-01-01' // Mock smart allocate
    })) || []
  );

  if (!po) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-slate-800">No PO Selected</h2>
        <button onClick={() => navigate('/inbound')} className="mt-4 text-blue-600">Go Back</button>
      </div>
    );
  }

  const handleQtyChange = (index: number, val: string) => {
    const num = parseInt(val) || 0;
    const newItems = [...receivedItems];
    newItems[index].qtyInput = num;
    setReceivedItems(newItems);
  };

  const toggleQC = (index: number) => {
    const newItems = [...receivedItems];
    newItems[index].qcPassed = !newItems[index].qcPassed;
    setReceivedItems(newItems);
  };

  const handleUpdateField = (index: number, field: string, val: string) => {
    const newItems = [...receivedItems];
    (newItems[index] as any)[field] = val;
    setReceivedItems(newItems);
  };

  const handleSubmit = () => {
    // Check for hard-block over-receipt
    const hasViolation = receivedItems.some(i => i.qtyInput > i.quantity);
    if (hasViolation) {
      alert('Error: Kuantitas diterima melebihi pesanan. Perlu persetujuan Admin (BR-GR-002).');
      return;
    }
    
    alert('Goods Receipt Submitted Successfully!');
    navigate('/inbound');
  };

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen md:min-h-0 md:rounded-xl md:shadow-sm md:border md:border-slate-200">
      {/* Mobile Header */}
      <div className="bg-slate-900 text-white p-4 sticky top-0 z-10 flex items-center shadow-md">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-bold">Receive Goods (GRN)</h1>
          <p className="text-xs text-slate-400">{po.id} • {po.supplierName}</p>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-32">
        {receivedItems.map((item, idx) => {
          const isOverReceiving = item.qtyInput > item.quantity;

          return (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight">{item.productName}</h3>
                  <p className="text-[10px] text-slate-400 font-mono mt-1">SKU: {item.productId}</p>
                </div>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-1 rounded uppercase">
                  PO: {item.quantity}
                </span>
              </div>

              {/* Qty and QC Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Qty Received</label>
                  <input
                    type="number"
                    className={`w-full px-3 py-2 border rounded-lg text-lg font-black focus:outline-none focus:ring-2 ${
                      isOverReceiving 
                        ? "border-red-300 bg-red-50 text-red-600 focus:ring-red-500" 
                        : "border-slate-200 bg-slate-50 text-slate-900 focus:ring-blue-500"
                    }`}
                    value={item.qtyInput || ''}
                    placeholder="0"
                    onChange={(e) => handleQtyChange(idx, e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">QC Pass?</label>
                  <button
                    onClick={() => toggleQC(idx)}
                    className={`w-full h-11 rounded-lg flex items-center justify-center transition-all border-2 ${
                      item.qcPassed ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <Check className={clsx("w-5 h-5", item.qcPassed ? "opacity-100" : "opacity-20")} />
                  </button>
                </div>
              </div>

              {/* Batch & Expiry Tracking (FR-INB-023) */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-50 pt-4">
                <div className="space-y-1">
                  <div className="flex items-center text-[10px] font-bold text-slate-500 uppercase">
                    <Hash className="w-3 h-3 mr-1" /> Batch No
                  </div>
                  <input 
                    type="text" 
                    placeholder="B-0000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={item.batchNo}
                    onChange={(e) => handleUpdateField(idx, 'batchNo', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-[10px] font-bold text-slate-500 uppercase">
                    <Calendar className="w-3 h-3 mr-1" /> Expiry
                  </div>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={item.expiryDate}
                    onChange={(e) => handleUpdateField(idx, 'expiryDate', e.target.value)}
                  />
                </div>
              </div>

              {/* Put Away Suggestion (FR-PA-002) */}
              <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-blue-800 uppercase tracking-tight">Smart Allocate</p>
                    <p className="text-sm font-black text-blue-900 tracking-wider">{item.suggestedLoc}</p>
                  </div>
                </div>
                <button className="text-[10px] font-bold text-blue-600 hover:text-blue-800 bg-white px-2 py-1 rounded border border-blue-200">CHANGE</button>
              </div>

              {isOverReceiving && (
                <div className="flex items-start p-3 bg-red-50 rounded-xl border border-red-100">
                  <AlertTriangle className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                  <p className="text-[10px] text-red-700 font-bold leading-normal uppercase">
                    ERROR: Kuantitas melebihi PO ({item.quantity}). 
                    Blokir transaksi aktif (BR-GR-002).
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] md:absolute md:rounded-b-xl">
        <button 
          onClick={handleSubmit}
          className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 px-4 rounded-xl shadow-lg flex items-center justify-center transition-all active:scale-[0.98]"
        >
          <Check className="w-5 h-5 mr-2" />
          CONFIRM RECEIPT (GRN)
        </button>
      </div>
    </div>
  );
};

export default GoodsReceipt;
