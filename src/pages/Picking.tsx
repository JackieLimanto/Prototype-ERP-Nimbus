import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SalesOrder } from '../types';
import { ArrowLeft, CheckCircle, MapPin } from 'lucide-react';

const Picking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const so = location.state?.so as SalesOrder;

  // Mock initial state, assuming items are sorted by location in the backend
  const [items, setItems] = useState(
    so?.items.map(item => ({
      ...item,
      isPicked: false
    })) || []
  );

  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleFinish = () => {
    alert('Picking Completed!');
    navigate('/outbound');
  };

  return (
    <div className="max-w-md mx-auto bg-slate-50 min-h-screen md:min-h-0 md:rounded-xl md:shadow-sm md:border md:border-slate-200 flex flex-col">
      {/* Mobile Header */}
      <div className="bg-slate-900 text-white p-4 sticky top-0 z-10 flex items-center shadow-md">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-bold">Picking Task</h1>
          <p className="text-xs text-slate-400">Order #{so.id}</p>
        </div>
        <div className="ml-auto text-sm font-medium bg-slate-800 px-3 py-1 rounded-full">
          {items.filter(i => i.isPicked).length} / {items.length}
        </div>
      </div>

      {isComplete ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
             <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">All Items Picked!</h2>
          <p className="text-slate-500 mb-8">Order #{so.id} is ready for packing.</p>
          <button 
            onClick={handleFinish}
            className="w-full bg-slate-900 text-white font-bold py-3 px-4 rounded-lg shadow-lg"
          >
            Return to List
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col p-4">
          {/* Location Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6 text-center">
             <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-2">Go to Location</p>
             <div className="flex items-center justify-center text-5xl font-black text-blue-600 tracking-tight">
               <MapPin className="w-8 h-8 mr-2 text-slate-400" />
               {currentItem.location || 'N/A'}
             </div>
          </div>

          {/* Product Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex-1">
             <div className="aspect-square bg-slate-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <img src={`https://placehold.co/400x400?text=${currentItem.productName.split(' ')[0]}`} alt="Product" className="object-cover" />
             </div>
             
             <h3 className="text-xl font-bold text-slate-900 mb-1">{currentItem.productName}</h3>
             <p className="text-slate-500 text-sm mb-6">SKU: {currentItem.productId}</p>

             <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex justify-between items-center mb-6">
                <span className="text-slate-600 font-medium">Pick Quantity</span>
                <span className="text-3xl font-bold text-slate-900">{currentItem.quantity} <span className="text-sm text-slate-400 font-normal">Units</span></span>
             </div>

             <button 
               onClick={handleConfirmPick}
               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-blue-600/30 transition-transform active:scale-[0.98]"
             >
               Confirm Pick
             </button>
          </div>
          
          <div className="mt-4 text-center text-xs text-slate-400">
            Next: {items[currentIndex + 1]?.location || 'Finish'}
          </div>
        </div>
      )}
    </div>
  );
};

export default Picking;
