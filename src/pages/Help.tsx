import { Search, Book, Video, HelpCircle, MessageSquare, ExternalLink, PlayCircle } from 'lucide-react';

const Help = () => {
  const articles = [
    { title: 'How to Receive Goods', cat: 'Inbound' },
    { title: 'Processing Customer Returns', cat: 'Returns' },
    { title: 'Cycle Count Guide', cat: 'Inventory' },
    { title: 'Setting up User Roles', cat: 'Admin' },
  ];

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="bg-blue-600 rounded-3xl p-12 text-white text-center relative overflow-hidden">
        <div className="relative z-10 max-w-xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">How can we help?</h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search for guides, videos, or FAQs..." 
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-400/50"
            />
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/50 to-transparent pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Knowledge Base */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <Book className="w-5 h-5 mr-2 text-blue-600" /> Knowledge Base
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {articles.map((art) => (
              <div key={art.title} className="p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 transition-colors cursor-pointer group">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{art.cat}</span>
                <h3 className="font-bold text-slate-900 mt-1 group-hover:text-blue-600 flex items-center">
                  {art.title} <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100" />
                </h3>
              </div>
            ))}
          </div>
          
          <h2 className="text-xl font-bold text-slate-900 flex items-center pt-4">
            <Video className="w-5 h-5 mr-2 text-red-600" /> Video Tutorials
          </h2>
          <div className="aspect-video bg-slate-900 rounded-2xl flex items-center justify-center relative group cursor-pointer overflow-hidden">
            <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000" alt="Tutorial Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" />
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-white transition-colors">
                <PlayCircle className="w-10 h-10 text-white group-hover:text-blue-600" />
              </div>
              <p className="font-bold text-white text-lg">WMS Getting Started Guide</p>
              <p className="text-white/70 text-sm">12:45 • Watch now</p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-emerald-600" /> Contact Support
          </h2>
          <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="font-bold text-emerald-900">Need direct assistance?</h3>
            <p className="text-emerald-700 text-sm mt-2 leading-relaxed">
              Our team is available Mon-Fri, 9AM-6PM (WIB).
            </p>
            <button className="w-full mt-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-colors">
              Submit a Ticket
            </button>
            <button className="w-full mt-3 py-3 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 rounded-xl font-bold transition-colors">
              Live Chat
            </button>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 flex items-center">
              <HelpCircle className="w-4 h-4 mr-2" /> Quick FAQ
            </h3>
            <div className="mt-4 space-y-4">
              <details className="group">
                <summary className="text-sm font-medium text-slate-700 cursor-pointer list-none flex justify-between items-center">
                  How do I reset my PIN? <ExternalLink className="w-3 h-3" />
                </summary>
              </details>
              <details className="group">
                <summary className="text-sm font-medium text-slate-700 cursor-pointer list-none flex justify-between items-center">
                  Supported barcode formats <ExternalLink className="w-3 h-3" />
                </summary>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper for local use
const ChevronRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);

export default Help;
