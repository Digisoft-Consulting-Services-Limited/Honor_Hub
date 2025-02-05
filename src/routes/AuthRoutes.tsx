import {  Routes, Route } from 'react-router-dom'

import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'

const AuthRoutes:React.FC = () => {
  return (
    <div>
            <Routes>
               
                <Route path="register" element={<Register/>} />
                <Route path="login" element={<Login/>} />

            </Routes>
    </div>
  )
}

export default AuthRoutes