/**
 * Entry JSX File for the Application
 * 
 * Initalizes Browser Routing and Includes main CSS file
 * Also Includes Font Families Source Sans Pro and Source Sans 3
 * The most optimal approach would be self hosting the required font in woff2 to reduce dependancy on external APIs
 * Is used for quick prototyping
 */
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import '@fontsource/source-sans-3'
import '@fontsource/source-sans-pro' 

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
