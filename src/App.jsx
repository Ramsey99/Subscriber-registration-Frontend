import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SubscriberRegistration from './components/SubscriberRegistration';
import VerifyEmail from './pages/verifyEmail';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubscriberRegistration />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </Router>
  )
}

export default App
