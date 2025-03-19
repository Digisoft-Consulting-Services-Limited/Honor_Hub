import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MemorialRoute from './routes/MemorialRoute';
import PagesRoute from './routes/PageRoute';
import AuthRoutes from './routes/AuthRoutes';
import { NotFoundPage } from './pages/NotFound';
// import AuthTest from './components/Auth/AuthTest';
// import { AuthProvider } from '@/context/auth/authcontext';
import { useEffect } from 'react';
import { setupAutoRefresh } from '@/services/Auth/GuestUserAuth';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/lib/queryClient';
function App() {
  useEffect(() => {
    // Initialize the auth system on app load
    setupAutoRefresh();
  }, []);
  return (
    <>
      {/* <QueryClientProvider client={queryClient}> */}


      <Router>
        <Routes>
          <Route path="/*" element={<PagesRoute />} />
          <Route path="/memorial/*" element={<MemorialRoute />} />


          {/* Nested routes for auth */}
          <Route path="/auth/*" element={<AuthRoutes />} />
          {/* <Route path="/auth-test" element={<AuthTest />} /> */}
          {/* 404 catch-all - MUST BE LAST */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {/* </AuthProvider> */}
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      {/* </QueryClientProvider> */}
    </>
  );
}

export default App;
