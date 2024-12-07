import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomePage from "./pages/HomePage/HomePage";
import AdminLoginPage from './pages/AdminLoginPage/AdminLoginPage';
import EmployeeLoginPage from "./pages/EmployeeLoginPage/EmployeeLoginPage";
import AdminPage from "./pages/AdminPage";
import Dashboard from "./components/Dashboard";
import Employees from "./components/Employees/Employees";
import AddEmployees from "./components/AddEmployees";
import EditEmployee from "./components/EditEmployee";
import Categories from "./components/Categories";
import AddCategories from "./components/AddCategories";
import Profile from "./components/Profile";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/employee/login" element={<EmployeeLoginPage />} />
        <Route path="/admin" element={<AdminPage />}> 
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/new" element={<AddCategories /> } />
          <Route path="employees" element={<Employees />} />
          <Route path="employees/new" element={<AddEmployees />} />
          <Route path="employees/edit/:id" element={<EditEmployee />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
