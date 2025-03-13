import { Routes, Route } from "react-router-dom";
import Memorial from "../pages/MemorialPage";
import { MemorialProvider } from "@/context/memorial/MemorialContext";
import MemorialForm from "@/components/Memorial/forms/Memorial_form";


const MemorialRoute: React.FC = () => {
    return (
            <MemorialProvider>
                <Routes>
                    <Route path=":slug" element={<Memorial />} /> 
                    <Route path="create" element={<MemorialForm />} />
                </Routes>
                
        
            </MemorialProvider>
    );
};

export default MemorialRoute;