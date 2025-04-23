import { Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import LandingPage from "./pages/LandingPage"

function App() {
  const deploymentBase = import.meta.env.VITE_DEPLOYMENT_KEY || '';
  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={`/${deploymentBase}`} element={<LandingPage />} />
      </Routes>
      <Footer /> 
    </div>
  )
}

export default App
