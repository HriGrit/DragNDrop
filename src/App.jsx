import { Route, Routes, useLocation } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import LandingPage from "./pages/LandingPage"
import DragPage from "./pages/DragPage";
import Sidebar from "./components/Sidebar";
import EditorSidebar from "./components/DragSidebar";

function App() {
  const deploymentBase = import.meta.env.VITE_DEPLOYMENT_KEY || '';
  
  const { pathname } = useLocation()

  const showSideBar = pathname === `/${deploymentBase}site-editor`;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        { !showSideBar ? 
          <Sidebar /> : 
          <EditorSidebar /> 
        }
        <main className="flex-1">
          <Routes>
            <Route path={`/${deploymentBase}`} element={<LandingPage />} />
            <Route path={`/${deploymentBase}site-editor`} element={<DragPage />} />
          </Routes>
          <Footer /> 
        </main>
      </div>
    </div>
  )
}

export default App
