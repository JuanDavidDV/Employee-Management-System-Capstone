import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const EmployeePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.split(';').find(c => c.trim().startsWith('token='));
    if(!token) {
      navigate("/employee/login")
    }
  }, [navigate])
  return (
    <>
      <main className="bg-success bg-opacity-10 min-vh-100">
        <div className="col h-100">
          <div className="p-3 d-flex justify-content-center shadow ">
            <h3 className="text-primary">Employee Management System</h3>
          </div>
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default EmployeePage;
