import { createContext, useContext, useState } from 'react';

const EngineContext = createContext(null);

export function EngineProvider({ children }) {
  // 'zustand' hoặc 'context'
  const [engine, setEngine] = useState('zustand');

  return (
    <EngineContext.Provider value={{ engine, setEngine }}>
      {children}
    </EngineContext.Provider>
  );
}

export function useEngine() {
  const context = useContext(EngineContext);
  if (!context) {
    throw new Error('useEngine must be used within EngineProvider');
  }
  return context;
}
