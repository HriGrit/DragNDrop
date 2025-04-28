import { Route, Routes, useLocation } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import LandingPage from "./pages/LandingPage"
import DragPage from "./pages/DragPage";
import Sidebar from "./components/Sidebar";
import EditorSidebar from "./components/DragSidebar";

function App() {  
  const { pathname } = useLocation()

  const showSideBar = pathname === `/site-editor`;
  
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        { !showSideBar ? 
          <Sidebar /> : 
          <EditorSidebar /> 
        }
        <main className="flex-1">
          <Routes>
            <Route path={`/`} element={<LandingPage />} />
            <Route path={`/site-editor`} element={<DragPage />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </div>
  )
}

export default App
