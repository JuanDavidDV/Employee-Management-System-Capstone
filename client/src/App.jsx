import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './pages/LoginPage';
import AdminPage from "./pages/AdminPage";
import Dashboard from "./components/Dashboard";
import Employees from "./components/Employees";
import Categories from "./components/Categories";
import Profile from "./components/Profile";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminPage />}> 
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="add-categories" />
          <Route path="employees" element={<Employees />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
