import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SubscriberRegistration from './components/SubscriberRegistration';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubscriberRegistration />} />
      </Routes>
    </Router>
  )
}

export default App
