import {  Routes, Route } from 'react-router-dom'
// import LandingPage from '../views/homepage'
import LandingPage from '../views/LandingPage'
import HomePage from '../views/HomePage';
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
