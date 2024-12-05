import React, { useState } from 'react';
import { HallProvider } from './context/HallContext';
import { useHallContext } from './context/HallContext';
import { HallCard } from './components/HallCard';
import { RequestForm } from './components/RequestForm';
import { RequestList } from './components/RequestList';
import { CalendarView } from './components/CalendarView';
import { Shield } from 'lucide-react';

function HallManagement() {
  const { halls, isAdmin, toggleAdmin } = useHallContext();
  const [selectedHallId, setSelectedHallId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hall Management System</h1>
          <button
            onClick={toggleAdmin}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            <Shield className="w-4 h-4" />
            {isAdmin ? 'Switch to User' : 'Switch to Admin'}
          </button>
        </div>

        <CalendarView />

        {isAdmin ? (
          <RequestList />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {halls.map((hall) => (
                <HallCard
                  key={hall.id}
                  hall={hall}
                  onRequest={() => setSelectedHallId(hall.id)}
                />
              ))}
            </div>
            <RequestList />
          </>
        )}

        {selectedHallId && (
          <RequestForm
            hallId={selectedHallId}
            onClose={() => setSelectedHallId(null)}
          />
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <HallProvider>
      <HallManagement />
    </HallProvider>
  );
}

export default App;