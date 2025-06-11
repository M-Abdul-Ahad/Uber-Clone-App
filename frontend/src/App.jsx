
import { Routes,Route } from 'react-router-dom'
import './App.css'
import UserLogin from '../pages/auth/UserLogin'
import UserRegister from '../pages/auth/UserRegister'
import Home from '../pages/Home'
import CaptainLogin from '../pages/auth/CaptainLogin'
import CaptainRegister from '../pages/auth/CaptainRegister'

function App() {
 

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/user-register" element={<UserRegister />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-register" element={<CaptainRegister />} />
    </Routes>
      
  )
}

export default App
