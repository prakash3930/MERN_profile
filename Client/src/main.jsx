// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./assets/css/index.css"
import { Toaster } from 'sonner';
import {AuthProvider} from "./contexts/Context.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <AuthProvider>
      <Toaster position="top-left" richColors toastOptions={{ style: { fontSize: '15px',textTransform:"capitalize" }}}></Toaster>
      <App />
    </AuthProvider>
  // </React.StrictMode>,
)
