import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './pages/LoginPage';
import AdminPage from "./pages/AdminPage";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminPage />} />          
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
