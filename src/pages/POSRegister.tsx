import { useState } from 'react';
import POSLayout from '../components/POSLayout';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, LocalProduct, LocalOrderItem } from '../db/posDb';
import { Search, Plus, Minus, ShoppingCart, CreditCard, Banknote, QrCode } from 'lucide-react';

const POSRegister = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<LocalOrderItem[]>([]);
  
  const products = useLiveQuery(
    () => db.products.toArray()
  );

  const filteredProducts = products?.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(products?.map(p => p.category) || [])];

  const addToCart = (product: LocalProduct) => {
    const existing = cart.find(i => i.productId === product.id);
    if (existing) {
      setCart(cart.map(i => i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, {
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity: 1,
        discount: 0
      }]);
    }
  };

  const updateQty = (productId: string, delta: number) => {
    setCart(cart.map(i => {
      if (i.productId === productId) {
        return { ...i, quantity: Math.max(0, i.quantity + delta) };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxAmount = cartTotal * 0.11; // 11% tax
  const grandTotal = cartTotal + taxAmount;

  return (
    <POSLayout title="Register">
      <div className="flex h-full">
        {/* LEFT: Cart Section */}
        <div className="w-1/3 bg-white border-r border-slate-200 flex flex-col h-full shadow-xl z-10">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
             <div className="flex items-center justify-between mb-2">
               <h2 className="font-bold text-slate-800 flex items-center">
                 <ShoppingCart className="w-5 h-5 mr-2" /> Current Order
               </h2>
               <button onClick={() => setCart([])} className="text-xs text-red-500 hover:text-red-700 font-medium">
                 Clear All
               </button>
             </div>
             <div className="text-xs text-slate-500">Order #LOCAL-001</div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <ShoppingCart className="w-12 h-12 mb-3 opacity-20" />
                <p>Cart is empty</p>
                <p className="text-xs">Scan item or select from grid</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.productId} className="flex justify-between items-center bg-white border border-slate-100 p-2 rounded-lg shadow-sm">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-800 truncate">{item.productName}</div>
                    <div className="text-xs text-slate-500">Rp {item.price.toLocaleString()}</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => updateQty(item.productId, -1)} className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-slate-800 w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQty(item.productId, 1)} className="p-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span>Rp {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Tax (11%)</span>
                <span>Rp {taxAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total</span>
                <span>Rp {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button className="flex flex-col items-center justify-center py-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 transition-all">
                <Banknote className="w-6 h-6 text-green-600 mb-1" />
                <span className="text-xs font-medium">Cash</span>
              </button>
              <button className="flex flex-col items-center justify-center py-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 transition-all">
                <QrCode className="w-6 h-6 text-slate-700 mb-1" />
                <span className="text-xs font-medium">QRIS</span>
              </button>
              <button className="flex flex-col items-center justify-center py-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 transition-all">
                <CreditCard className="w-6 h-6 text-blue-600 mb-1" />
                <span className="text-xs font-medium">Card</span>
              </button>
            </div>
            
            <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-transform">
              PAY Rp {grandTotal.toLocaleString()}
            </button>
          </div>
        </div>

        {/* RIGHT: Product Grid */}
        <div className="flex-1 bg-slate-100 flex flex-col h-full">
          {/* Search Bar */}
          <div className="p-4 bg-white shadow-sm z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search products by name or SKU..." 
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
            {/* Categories */}
            <div className="flex space-x-2 mt-3 overflow-x-auto pb-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat 
                      ? 'bg-slate-800 text-white shadow-md' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts?.map(product => (
                <button 
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all text-left flex flex-col h-32 justify-between active:scale-[0.98]"
                >
                  <div>
                    <h3 className="font-bold text-slate-800 line-clamp-2 leading-tight">{product.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{product.sku}</p>
                  </div>
                  <div className="font-bold text-blue-600">
                    Rp {product.price.toLocaleString()}
                  </div>
                </button>
              ))}
            </div>
            
            {filteredProducts?.length === 0 && (
              <div className="text-center py-20 text-slate-400">
                <p>No products found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </POSLayout>
  );
};

export default POSRegister;
