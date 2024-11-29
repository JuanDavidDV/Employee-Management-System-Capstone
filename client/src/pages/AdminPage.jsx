import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

const AdminPage = () => {
  return (
    <>
      <NavBar />
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

export default AdminPage;
