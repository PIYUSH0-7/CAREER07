import React, { useState } from 'react';
import { Rocket, Github, Linkedin, Code, Lightbulb, Layout as LayoutIcon, ChevronDown, ChevronRight, Menu } from 'lucide-react';
import LearningStrategy from './LearningStrategy';

interface LayoutProps {
  children: React.ReactNode;
  onDashboardClick?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onDashboardClick }) => {
  const [showStrategy, setShowStrategy] = useState(false);
  const [showQuickLinks, setShowQuickLinks] = useState(false);

  const handleDashboardClick = () => {
    if (onDashboardClick) {
      onDashboardClick();
    }
    setShowQuickLinks(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f8fafc]">
      {showStrategy && <LearningStrategy onClose={() => setShowStrategy(false)} />}
      
      {/* Sidebar / Mobile Header */}
      <aside className="bg-slate-900 text-slate-300 w-full md:w-72 flex-shrink-0 md:h-screen sticky top-0 z-40 shadow-2xl flex flex-col transition-all duration-300">
        <div 
          onClick={() => setShowQuickLinks(!showQuickLinks)}
          className="p-6 flex items-center justify-between border-b border-slate-800 cursor-pointer hover:bg-slate-800/50 transition-colors select-none group bg-slate-900"
          title="Click to toggle menu"
        >
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white tracking-tight text-lg group-hover:text-indigo-300 transition-colors">CareerLaunch</h1>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">OS 2025</p>
              </div>
            </div>
          </div>
          {/* Toggle Indicator */}
          <div className="p-1 rounded-full bg-slate-800/50 group-hover:bg-slate-800 transition-colors">
            {showQuickLinks ? (
              <ChevronDown className="w-4 h-4 text-indigo-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
            )}
          </div>
        </div>

        {/* Quick Links Section - Collapsible */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-slate-900/50 ${showQuickLinks ? 'max-h-[500px] opacity-100 border-b border-slate-800' : 'max-h-0 opacity-0'}`}>
          <nav className="p-4 space-y-2">
            <div className="px-2 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Navigation
            </div>
            
            <button 
              onClick={handleDashboardClick} 
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800 text-white shadow-sm hover:bg-indigo-600 hover:shadow-indigo-500/20 transition-all duration-200 border border-slate-700/50 hover:border-indigo-500 group"
            >
              <LayoutIcon className="w-4 h-4 text-emerald-400 group-hover:text-white" />
              <span className="font-medium text-sm">Dashboard</span>
            </button>

            <button 
              onClick={() => {
                setShowStrategy(true);
                setShowQuickLinks(false);
              }} 
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-900/20 to-orange-900/20 text-amber-100 hover:text-white hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-600 transition-all duration-200 border border-amber-500/20 hover:border-amber-500 group"
            >
              <Lightbulb className="w-4 h-4 text-amber-400 group-hover:text-white" />
              <span className="font-medium text-sm">Learning Strategy</span>
            </button>
          </nav>
        </div>

        <div className="p-6 border-t border-slate-800 md:absolute md:bottom-0 w-full bg-slate-900/95 backdrop-blur hidden md:block">
          <div className="flex gap-6 justify-center">
            <a 
              href="https://github.com/PIYUSH0-7" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="GitHub"
              className="transform hover:scale-110 transition-transform duration-200"
            >
              <Github className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
            </a>
            <a 
              href="https://www.linkedin.com/in/piyush-gangwar-bb4911312" 
              target="_blank" 
              rel="noopener noreferrer"
              title="LinkedIn"
              className="transform hover:scale-110 transition-transform duration-200"
            >
              <Linkedin className="w-5 h-5 text-slate-400 hover:text-blue-400 cursor-pointer transition-colors" />
            </a>
            <a 
              href="https://piyush07-pi.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Portfolio"
              className="transform hover:scale-110 transition-transform duration-200"
            >
              <Code className="w-5 h-5 text-slate-400 hover:text-emerald-400 cursor-pointer transition-colors" />
            </a>
          </div>
          <p className="text-center text-[10px] font-medium text-slate-600 mt-4 tracking-wide uppercase">
            Designed for Excellence
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 lg:p-10 overflow-y-auto custom-scroll relative">
        <div className="max-w-7xl mx-auto pb-12">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;