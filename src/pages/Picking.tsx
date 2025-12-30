import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SalesOrder } from '../types';
import { ArrowLeft, CheckCircle, MapPin, AlertCircle, HelpCircle } from 'lucide-react';

const Picking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const so = location.state?.so as SalesOrder;

  const [items, setItems] = useState(
    so?.items.map(item => ({
      ...item,
      isPicked: false,
      actualQty: item.quantity,
      shortPickReason: '',
      isExpiringSoon: Math.random() > 0.8 // Mock FEFO warning
    })) || []
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showShortPickModal, setShowShortPickModal] = useState(false);

  if (!so) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-slate-800">No Order Selected</h2>
        <button onClick={() => navigate('/outbound')} className="mt-4 text-blue-600">Go Back</button>
      </div>
    );
  }

  const currentItem = items[currentIndex];
  const isComplete = items.every(i => i.isPicked);

  const handleConfirmPick = () => {
    const newItems = [...items];
    newItems[currentIndex].isPicked = true;
    setItems(newItems);

    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleShortPick = (reason: string) => {
    const newItems = [...items];
    newItems[currentIndex].isPicked = true;
    newItems[currentIndex].shortPickReason = reason;
    // For prototype, assume we found 0 if short picked
    newItems[currentIndex].actualQty = 0; 
    setItems(newItems);
    setShowShortPickModal(false);
    
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleFinish = () => {
    alert('Picking Task Completed and Logged to Audit Trail.');
    navigate('/outbound');
  };

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen md:min-h-0 md:rounded-xl md:shadow-sm md:border md:border-slate-200 flex flex-col relative overflow-hidden">
      {/* Mobile Header */}
      <div className="bg-slate-900 text-white p-4 sticky top-0 z-10 flex items-center shadow-md">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-bold">Picking Task</h1>
          <p className="text-xs text-slate-400">Order #{so.id}</p>
        </div>
        <div className="ml-auto text-xs font-black bg-blue-600 px-3 py-1 rounded-full uppercase tracking-tighter">
          {items.filter(i => i.isPicked).length} / {items.length} DONE
        </div>
      </div>

      {isComplete ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border-4 border-emerald-100">
             <CheckCircle className="w-12 h-12 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">PICK COMPLETE</h2>
          <p className="text-slate-500 mb-8 font-medium">All items processed. Status updated to PICKED (BR-PICK-009).</p>
          <button 
            onClick={handleFinish}
            className="w-full bg-slate-900 text-white font-black py-4 px-4 rounded-xl shadow-xl active:scale-[0.98] transition-all"
          >
            RETURN TO LIST
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col p-4">
          {/* Location Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 mb-6 text-center ring-4 ring-blue-500/10">
             <p className="text-xs text-blue-500 font-black uppercase tracking-[0.2em] mb-3">Target Location</p>
             <div className="flex items-center justify-center text-6xl font-black text-slate-900 tracking-tighter">
               <MapPin className="w-10 h-10 mr-3 text-blue-600" />
               {currentItem.location || 'N/A'}
             </div>
          </div>

          {/* Product Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex-1 flex flex-col">
             <div className="relative aspect-video bg-slate-100 rounded-xl mb-5 flex items-center justify-center overflow-hidden border border-slate-100">
                <img src={`https://placehold.co/600x400?text=${currentItem.productName.split(' ')[0]}`} alt="Product" className="object-cover w-full h-full" />
                {currentItem.isExpiringSoon && (
                  <div className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" /> FEFO: EXPIRING SOON
                  </div>
                )}
             </div>
             
             <div className="mb-6">
               <h3 className="text-2xl font-black text-slate-900 leading-none mb-2 uppercase">{currentItem.productName}</h3>
               <p className="text-slate-400 text-xs font-mono">SKU: {currentItem.productId}</p>
             </div>

             <div className="mt-auto">
               <div className="bg-slate-900 rounded-2xl p-6 flex justify-between items-center mb-4">
                  <span className="text-slate-400 font-bold uppercase text-xs tracking-widest">PICK QTY</span>
                  <span className="text-5xl font-black text-white">{currentItem.quantity}</span>
               </div>

               <div className="grid grid-cols-2 gap-3">
                 <button 
                   onClick={() => setShowShortPickModal(true)}
                   className="bg-white border-2 border-slate-200 text-slate-600 font-black py-4 px-4 rounded-xl flex items-center justify-center hover:bg-slate-50 transition-all"
                 >
                   <HelpCircle className="w-5 h-5 mr-2 text-slate-400" /> SHORT
                 </button>
                 <button 
                   onClick={handleConfirmPick}
                   className="bg-blue-600 text-white font-black py-4 px-4 rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center active:scale-[0.95] transition-all"
                 >
                   CONFIRM
                 </button>
               </div>
             </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Next Up</p>
            <p className="text-sm font-bold text-slate-600">{items[currentIndex + 1]?.location || '--- FINISH ---'}</p>
          </div>
        </div>
      )}

      {/* Short Pick Modal (BR-PICK-007) */}
      {showShortPickModal && (
        <div className="absolute inset-0 z-50 bg-slate-900/90 backdrop-blur-sm p-6 flex flex-col justify-center">
          <div className="bg-white rounded-3xl p-6 space-y-4">
            <h2 className="text-xl font-black text-slate-900 uppercase">Short Pick Reason</h2>
            <p className="text-sm text-slate-500">Why are you picking less than {currentItem.quantity} units?</p>
            
            <div className="grid gap-2 pt-2">
              {['DAMAGED', 'NOT_FOUND', 'WRONG_ITEM', 'EXPIRED'].map(reason => (
                <button 
                  key={reason}
                  onClick={() => handleShortPick(reason)}
                  className="w-full text-left p-4 rounded-xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50 font-bold text-slate-700 transition-all"
                >
                  {reason.replace('_', ' ')}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setShowShortPickModal(false)}
              className="w-full py-3 text-slate-400 font-bold text-sm"
            >
              CANCEL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Picking;

