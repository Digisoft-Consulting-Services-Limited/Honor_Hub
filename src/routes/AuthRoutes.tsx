import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from '@/components/Auth/Login'

const AuthRoutes:React.FC = () => {
  return (
    <div>
       <Router>
            <Routes>
               
                <Route path="/login" element={<Login/>} />
            </Routes>
        </Router>  
    </div>
  )
}

export default AuthRoutes