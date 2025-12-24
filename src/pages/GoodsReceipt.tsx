import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PurchaseOrder } from '../types';
import { ArrowLeft, Check, AlertTriangle } from 'lucide-react';

const GoodsReceipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // In a real app, we'd fetch the PO by ID from URL params.
  // Here we expect the PO object to be passed in state
  const po = location.state?.po as PurchaseOrder;

  const [receivedItems, setReceivedItems] = useState(
    po?.items.map(item => ({
      ...item,
      qtyInput: 0,
      qcPassed: true
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

  const handleSubmit = () => {
    // Logic to save GR
    alert('Goods Receipt Submitted!');
    navigate('/inbound');
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen md:min-h-0 md:rounded-xl md:shadow-sm md:border md:border-slate-200">
      {/* Mobile Header */}
      <div className="bg-slate-900 text-white p-4 sticky top-0 z-10 flex items-center shadow-md">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-bold">Receive Goods</h1>
          <p className="text-xs text-slate-400">{po.id} • {po.supplierName}</p>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-24">
        {receivedItems.map((item, idx) => {
          const isOverReceiving = item.qtyInput > item.quantity;

          return (
            <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-slate-900">{item.productName}</h3>
                  <p className="text-xs text-slate-500">SKU: {item.productId}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                    Ordered: {item.quantity}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-end">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Qty Received</label>
                  <input
                    type="number"
                    className={`w-full px-3 py-2 border rounded-lg text-lg font-bold focus:outline-none focus:ring-2 ${
                      isOverReceiving 
                        ? "border-red-300 focus:ring-red-500 text-red-600 bg-red-50" 
                        : "border-slate-300 focus:ring-blue-500 text-slate-900"
                    }`}
                    value={item.qtyInput}
                    onChange={(e) => handleQtyChange(idx, e.target.value)}
                  />
                </div>
                
                <div className="flex items-center justify-end h-full pb-1">
                   <div className="flex items-center space-x-2">
                     <span className="text-sm text-slate-600">QC Pass?</span>
                     <button
                       onClick={() => toggleQC(idx)}
                       className={`w-12 h-6 rounded-full p-1 transition-colors ${item.qcPassed ? 'bg-emerald-500' : 'bg-slate-300'}`}
                     >
                       <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${item.qcPassed ? 'translate-x-6' : ''}`}></div>
                     </button>
                   </div>
                </div>
              </div>

              {isOverReceiving && (
                <div className="mt-2 flex items-center text-xs text-red-600 font-medium">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Warning: Over-receiving by {item.qtyInput - item.quantity} units
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 md:absolute md:rounded-b-xl">
        <button 
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-blue-600/20 flex items-center justify-center transition-all active:scale-[0.98]"
        >
          <Check className="w-5 h-5 mr-2" />
          Confirm Receipt
        </button>
      </div>
    </div>
  );
};

export default GoodsReceipt;
