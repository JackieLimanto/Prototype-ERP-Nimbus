import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Warehouse, 
  Database, 
  Rocket, 
  ChevronRight, 
  ChevronLeft,
  Upload,
  AlertTriangle
} from 'lucide-react';
import clsx from 'clsx';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Progress Bar */}
        <div className="h-2 bg-slate-100 flex">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className={clsx(
                "flex-1 transition-all duration-500",
                i <= step ? "bg-blue-600" : "bg-slate-200"
              )}
            />
          ))}
        </div>

        <div className="p-8">
          {/* Step 1: Company Profile */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Company Profile</h2>
                <p className="text-slate-500">Tell us about your business</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="PT. Maju Bersama" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Logo (Optional)</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 2MB</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Warehouse & Costing */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-4">
                  <Warehouse className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Warehouse Setup</h2>
                <p className="text-slate-500">Configure your primary storage and costing</p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">WH Code</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg outline-none" placeholder="WH-MAIN" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">WH Name</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg outline-none" placeholder="Jakarta Central" />
                  </div>
                </div>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <h3 className="font-bold text-amber-900 text-sm">Critical: Select Costing Method</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {['FIFO', 'AVERAGE', 'LAST_PRICE'].map((m) => (
                      <button key={m} className="px-3 py-2 bg-white border border-amber-200 rounded-lg text-xs font-bold text-amber-800 hover:bg-amber-100 transition-colors">
                        {m.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-amber-700 mt-3 italic">
                    ⚠️ Decisions are PERMANENT after first transaction. Standard Indonesian MSMEs use LAST PRICE.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Data Import */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-4">
                  <Database className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Import Data</h2>
                <p className="text-slate-500">Quickly upload your existing inventory</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {['Products Master', 'Warehouse Locations', 'Opening Stock Balance'].map((item) => (
                  <div key={item} className="flex items-center justify-between p-4 border rounded-xl hover:bg-slate-50">
                    <span className="font-medium text-slate-700">{item}</span>
                    <button className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">Upload CSV</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Finalize */}
          {step === 4 && (
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4 animate-bounce">
                <Rocket className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">You're Ready!</h2>
              <p className="text-slate-500">Everything is set up. Welcome to Nimbus WMS.</p>
              <div className="bg-slate-50 rounded-xl p-6 text-left space-y-2">
                <div className="flex justify-between text-sm"><span className="text-slate-500">Warehouse:</span> <span className="font-bold">WH-MAIN</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-500">Costing:</span> <span className="font-bold">LAST PRICE</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-500">Products:</span> <span className="font-bold">Ready to Import</span></div>
              </div>
            </div>
          )}

          {/* Nav Buttons */}
          <div className="mt-12 flex justify-between">
            {step > 1 ? (
              <button onClick={prevStep} className="flex items-center px-6 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">
                <ChevronLeft className="w-4 h-4 mr-2" /> Back
              </button>
            ) : <div />}
            
            {step < 4 ? (
              <button onClick={nextStep} className="flex items-center px-8 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200">
                Continue <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button onClick={() => navigate('/')} className="flex items-center px-8 py-2 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 shadow-lg shadow-emerald-200">
                Launch Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
