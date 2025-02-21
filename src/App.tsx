import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MemorialRoute from './routes/MemorialRoute';
import PagesRoute from './routes/PageRoute';
import AuthRoutes from './routes/AuthRoutes';
import AuthTest from './components/Auth/AuthTest';

function App() {
  return (
    <Router>
      <Routes>
        {/* Example top-level route */}
        <Route path="/*" element={<PagesRoute />} />

        {/* Nested routes for memorial features */}
        <Route path="/memorial/*" element={<MemorialRoute />} />


        {/* Nested routes for auth */}
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/auth-test" element={<AuthTest />} />
      </Routes>
    </Router>
  );
}

export default App;
