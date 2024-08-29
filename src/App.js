import React from 'react';
import './App.css';
import Navbar from './Component/Header';
import Dashboard from './Component/Dashboard';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-container">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
