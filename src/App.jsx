import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Whatsapp from './Components/Whatsapp'
import AboutPage from './Pages/AboutPage';
import HomePage from './Pages/HomePage';
import BookingPage from './Pages/BookingPage';
import ContactPage from './Pages/ContactPage';
function App() {
  return (
    <div className="app-shell">
    <Router>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
     
   
    </Router>
   
<Whatsapp/>



    </div>
  )
}

export default App
