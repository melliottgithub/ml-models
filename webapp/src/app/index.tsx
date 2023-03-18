import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '../predict';


function App() {
  return (
    <Router>
    <div className="flex-column m-auto max-width p-xsmall-left p-xsmall-right">
      <header className="flex-row secondary-1 font-size-xxlarge">
        <p>ML Models</p>
      </header>
      <div className="flex-row justify-center font-size-medium">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/query/:name" element={<div>home</div>} />
        </Routes>
      </div>
      
    </div>
    </Router>
  );
}

export default App;
