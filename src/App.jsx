import React, { Suspense, useState } from 'react'
import './App.css'
import Header from './components/Home/header'
import "bootstrap/dist/css/bootstrap.min.css";
import MonitorNavbar from './components/Home/navbar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Home/dashboard';

function App() {

  const Incidents = React.lazy(() => import('./components/Incidents/incidents'));

  return (
    <Router>
      <div className="App">
        <Header />
        <MonitorNavbar />
        <hr className="my-0" />

        <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/incidents" element={<Incidents />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  )
}

export default App
