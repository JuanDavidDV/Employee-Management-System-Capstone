import NavBar from "../components/NavBar/NavBar";
import Dashboard from "../components/Dashboard";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <>
      <NavBar />
      <main className="bg-success bg-opacity-10 vh-100">
        <div className="col">
          <div className="p-3 d-flex justify-content-center shadow ">
            <h3>Employee Management System</h3>
          </div>
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default AdminPage;