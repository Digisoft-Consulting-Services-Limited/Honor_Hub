import {  Routes, Route } from 'react-router-dom'
// import LandingPage from '../pages/homepage'
import LandingPage from '../pages/LandingPage'
import HomePage from '../pages/HomePage';
import { MemorialProvider } from "@/context/memorial/MemorialContext";


const PagesRoute: React.FC = () => {
    return (
            <MemorialProvider>

            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="home" element={<HomePage />} />

            </Routes>
            </MemorialProvider>
    )
}


export default PagesRoute;