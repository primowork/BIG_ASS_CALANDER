import React, { useEffect } from 'react';
import { useCalendarStore } from './store/useCalendarStore';
import { TopBar } from './components/layout/TopBar';
import { Sidebar } from './components/layout/Sidebar';
import { YearView } from './components/calendar/YearView';

function App() {
  const { initializeApp, isLoading } = useCalendarStore();

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <YearView />
        </div>
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
