import React from 'react';
import './App.css';
import PlanetsProvider from './Components/PlanetsProvider';
import { AuthProvider } from './Providers/Auth';

function App() {
  return (
    <AuthProvider>
      <PlanetsProvider />
    </AuthProvider>
  );
}

export default App;
