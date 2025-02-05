import {  Routes, Route } from 'react-router-dom'
import Memorial from '../pages/MemorialPage'
import { MemorialProvider } from '@/context/memorial/MemorialContext'

const MemorialRoute: React.FC = () => {
    return (
            <MemorialProvider>
                <Routes>
                    <Route path="memorial" element={<Memorial />} />
                </Routes>
           </MemorialProvider>
    )
}


export default MemorialRoute;