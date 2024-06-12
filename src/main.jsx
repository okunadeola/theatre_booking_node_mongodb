import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ToastProvider from './providers/ToastProvider.jsx'
import ShowModal from './pages/admin/movie/components/ShowModal.jsx'
import Receipt from './pages/admin/movie/components/Receipt.jsx'
import QueryProvider from './providers/QueryProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider/>
      <QueryProvider>
        <App />
      </QueryProvider>
      <ShowModal/>
      <Receipt />
    </BrowserRouter>
  </React.StrictMode>,
)
