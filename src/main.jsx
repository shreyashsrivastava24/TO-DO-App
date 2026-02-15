import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Apply persisted theme (or system) before React mounts to avoid flash
;(function applyInitialTheme(){
  try{
    const saved = localStorage.getItem('theme')
    if(saved === 'dark'){
      document.documentElement.classList.add('dark')
    } else if(saved === 'light'){
      document.documentElement.classList.remove('dark')
    } else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
      document.documentElement.classList.add('dark')
    }
  }catch(e){
    // ignore
  }
})()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)