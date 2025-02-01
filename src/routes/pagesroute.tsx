import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Memorial from '../pages/memorial'
import { MemorialProvider } from '../context/memorial/memorialcontext'

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