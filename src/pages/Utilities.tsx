import { Upload, Printer, FileDown, FileUp, QrCode, ClipboardList } from 'lucide-react';

const Utilities = () => {
  const tools = [
    { 
      title: 'Bulk Data Import', 
      desc: 'Import Products, Locations, and Stock from Excel/CSV', 
      icon: FileUp, 
      action: 'Start Import',
      color: 'blue' 
    },
    { 
      title: 'Label Printing', 
      desc: 'Generate barcodes for Products and Bin Locations', 
      icon: Printer, 
      action: 'Print Labels',
      color: 'purple' 
    },
    { 
      title: 'Export Tools', 
      desc: 'Download full system data for backup or analysis', 
      icon: FileDown, 
      action: 'Export Data',
      color: 'emerald' 
    },
    { 
      title: 'Universal Scanner', 
      desc: 'Scan any code to lookup info or perform tasks', 
      icon: QrCode, 
      action: 'Open Scanner',
      color: 'amber' 
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Administration & Utilities</h1>
        <p className="text-slate-500 mt-1">Advanced tools for data management and system utilities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <div key={tool.title} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl bg-${tool.color}-50 text-${tool.color}-600`}>
                <tool.icon className="w-6 h-6" />
              </div>
              <button className={`text-sm font-bold text-${tool.color}-600 hover:underline`}>
                {tool.action}
              </button>
            </div>
            <div className="mt-4">
              <h3 className="font-bold text-slate-900 text-lg">{tool.title}</h3>
              <p className="text-slate-500 text-sm mt-1">{tool.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-2xl p-8 text-white flex items-center justify-between overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-2">Need a Custom Data Format?</h2>
          <p className="text-slate-400 text-sm max-w-md">
            Download our standard Excel templates to ensure your data is formatted correctly before bulk importing.
          </p>
          <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-colors flex items-center">
            <FileDown className="w-4 h-4 mr-2" /> Download Templates
          </button>
        </div>
        <ClipboardList className="w-48 h-48 text-slate-800 absolute -right-8 -bottom-8 rotate-12" />
      </div>
    </div>
  );
};

export default Utilities;
