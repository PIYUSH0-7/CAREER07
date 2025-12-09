import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import DomainTracker from './components/DomainTracker';
import { INITIAL_DOMAINS } from './data';
import { Domain, View } from './types';

function App() {
  const [domains, setDomains] = useState<Domain[]>(INITIAL_DOMAINS);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [activeDomainId, setActiveDomainId] = useState<string | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('careerLaunchData');
    if (savedData) {
      try {
        setDomains(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to load data", e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('careerLaunchData', JSON.stringify(domains));
  }, [domains]);

  const handleDomainSelect = (id: string) => {
    setActiveDomainId(id);
    setCurrentView('domain');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDashboard = () => {
    setActiveDomainId(null);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleTask = (domainId: string, sectionId: string, taskId: string) => {
    setDomains(prevDomains => 
      prevDomains.map(d => {
        if (d.id !== domainId) return d;
        return {
          ...d,
          sections: d.sections.map(s => {
            if (s.id !== sectionId) return s;
            return {
              ...s,
              tasks: s.tasks.map(t => {
                if (t.id !== taskId) return t;
                return { ...t, isCompleted: !t.isCompleted };
              })
            };
          })
        };
      })
    );
  };

  const activeDomain = domains.find(d => d.id === activeDomainId);

  return (
    <Layout onDashboardClick={handleBackToDashboard}>
      {currentView === 'dashboard' ? (
        <>
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Your Learning Roadmap</h2>
            <p className="text-gray-500 mt-2 text-lg">Track your progress from beginner to FAANG-ready engineer.</p>
          </div>
          <Dashboard 
            domains={domains} 
            onSelectDomain={handleDomainSelect} 
          />
        </>
      ) : (
        activeDomain && (
          <DomainTracker 
            domain={activeDomain} 
            onBack={handleBackToDashboard}
            onToggleTask={handleToggleTask}
          />
        )
      )}
    </Layout>
  );
}

export default App;