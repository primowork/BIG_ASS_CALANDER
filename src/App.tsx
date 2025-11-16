import { useState } from 'react';
import TopBar from './components/layout/TopBar';
import Sidebar from './components/layout/Sidebar';
import MonthView from './components/calendar/MonthView';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="app">
      <TopBar />
      <div className="main-layout">
        <Sidebar />
        <main>
          <MonthView selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        </main>
      </div>
    </div>
  );
}

export default App;
