import { Routes, Route } from "react-router-dom";
import Memorial from "../pages/MemorialPage";
import { MemorialProvider } from "@/context/memorial/MemorialContext";
import MemorialForm from "@/components/Memorial/forms/Memorial_form";


const MemorialRoute: React.FC = () => {
    return (
        <Routes>
            <Route path=":slug" element={
                <MemorialProvider>

                    <Memorial />
                </MemorialProvider>

            } />
            <Route path="create" element={<MemorialForm />} />
        </Routes>


    );
};

export default MemorialRoute;