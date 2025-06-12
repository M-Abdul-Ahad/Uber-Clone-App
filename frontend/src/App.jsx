
import { Routes,Route } from 'react-router-dom'
import './App.css'
import UserLogin from '../pages/auth/UserLogin'
import UserRegister from '../pages/auth/UserRegister'
import Home from '../pages/user/Home'
import CaptainLogin from '../pages/auth/CaptainLogin'
import CaptainRegister from '../pages/auth/CaptainRegister'
import Start from '../pages/Start'
import CaptainDashboard from '../pages/captain/CaptainDashboard'
import ProtectedHomeRoute from '../components/ProtectedHomeRoute'

function App() {
 

  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/home" element={<ProtectedHomeRoute><Home/></ProtectedHomeRoute>} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/user-register" element={<UserRegister />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-register" element={<CaptainRegister />} />
      <Route path="/captain-dashboard" element={<CaptainDashboard />} />

    </Routes>
      
  )
}

export default App
