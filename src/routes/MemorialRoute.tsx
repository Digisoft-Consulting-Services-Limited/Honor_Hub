import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import LandingPage from '../pages/homepage'
import LandingPage from '../pages/LandingPage'
import HomePage from '../pages/HomePage';


const MemorialRoute: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />

            </Routes>
        </Router>
    )
}


export default MemorialRoute;