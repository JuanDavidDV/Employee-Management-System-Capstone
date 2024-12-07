import "./HomePage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <section className="d-flex flex-column vh-100 bg-body-secondary justify-content-center align-items-center homepage">
      <h1 className="text-center bg-dark p-2 text-white mb-5 rounded">Employee Management System JD</h1>
      <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center w-100">
        <div 
          className="p-2 rounded border border-primary bg-primary-subtle"
          style={{ maxWidth: "20rem", width: "90%", height: "10rem" }}>
          <h2 className="pb-3 text-center">Login As</h2>
          <div className="d-flex justify-content-between mt-3 mb-2">
            <button className="btn btn-info" onClick={() => {navigate("/admin/login")}}>Administrator</button>
            <button className="btn btn-info" onClick={() => {navigate("/employee/login")}}>Employee</button>
          </div>
        </div>
      </div>
    </section>
  )
};

export default HomePage;
