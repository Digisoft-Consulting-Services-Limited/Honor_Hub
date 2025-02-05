import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MemorialRoute from './routes/MemorialRoute';
import PagesRoute from './routes/PageRoute';
import AuthRoutes from './routes/AuthRoutes';

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
      </Routes>
    </Router>
  );
}

export default App;
