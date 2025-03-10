import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MemorialRoute from './routes/MemorialRoute';
import PagesRoute from './routes/PageRoute';
import AuthRoutes from './routes/AuthRoutes';
import { NotFoundPage } from './pages/NotFound';
// import AuthTest from './components/Auth/AuthTest';
// import { AuthProvider } from '@/context/auth/authcontext';
import { useEffect } from 'react';
import { setupAutoRefresh } from '@/services/Auth/GuestUserAuth';
function App() {
  useEffect(() => {
    // Initialize the auth system on app load
    setupAutoRefresh();
  }, []);
  return (
    <> 
    
    <Router>
      {/* <AuthProvider> */}
      <Routes>
        {/* Example top-level route */}
        <Route path="/*" element={<PagesRoute />} />


        {/* Nested routes for memorial features */}
        <Route path="/memorial/*" element={<MemorialRoute />} />


        {/* Nested routes for auth */}
        <Route path="/auth/*" element={<AuthRoutes />} />
        {/* <Route path="/auth-test" element={<AuthTest />} /> */}
        {/* 404 catch-all - MUST BE LAST */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    {/* </AuthProvider> */}
    </Router>
    </>
  );
}

export default App;
