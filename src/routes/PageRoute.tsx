import {  Routes, Route } from 'react-router-dom'
// import LandingPage from '../pages/homepage'
import LandingPage from '../pages/LandingPage'
import HomePage from '../pages/HomePage';


const PagesRoute: React.FC = () => {
    return (
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="home" element={<HomePage />} />

            </Routes>
    )
}


export default PagesRoute;