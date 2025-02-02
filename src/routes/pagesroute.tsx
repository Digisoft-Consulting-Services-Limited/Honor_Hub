import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Memorial from '../pages/MemorialPage'
import { MemorialProvider } from '@/context/memorial/MemorialContext'

const PagesRoute: React.FC = () => {
    return (
        <Router>
            <MemorialProvider>
                <Routes>
                    <Route path="/memorial" element={<Memorial />} />
                </Routes>
           </MemorialProvider>
        </Router>
    )
}


export default PagesRoute;