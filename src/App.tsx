import './App.css'
import PagesRoute from './routes/PagesRoute'
import MemorialRoute from './routes/MemorialRoute'
import AuthRoutes from './routes/AuthRoutes'

function App() {

  return (
    <div>
      <PagesRoute />
      <MemorialRoute />
      <AuthRoutes/>
    </div>
  )
}

export default App
