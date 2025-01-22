import  { MemorialProvider } from './context/memorial/memorialcontext'
import './App.css'
import Memorial from './pages/memorial'

function App() {

  return (
    <MemorialProvider>
      <Memorial/>
    </MemorialProvider>
  )
}

export default App
