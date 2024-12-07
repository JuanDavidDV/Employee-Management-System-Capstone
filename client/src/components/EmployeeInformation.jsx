import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const EmployeeInformation = () => {
  const {id} = useParams();
  const [employeeDetails, setEmployeeDetails] = useState([]);
  axios.defaults.withCredentials = true;

  const fetchEmployee = async () => {
    try {
      const { data } = await axios.get(baseUrl + "/employee/information/" + id);
      setEmployeeDetails(data);      
    }
    catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const logoutEmployee = async () => {
    try {
      const { data } = await axios.get(baseUrl + "/employee/logout");
      if(data) {
        navigate("/");
      }
    }
    catch(error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
        <img
          src={baseUrl + employeeDetails.image}
          className="img-thumbnail w-50 w-sm-40 w-md-30 w-lg-25" // Resize the image based on screen size
          alt="Employee"
        />
        <div className="d-flex align-items-center flex-column mt-4">
          <h4 className="text-center">Name: {employeeDetails.name}</h4>
          <h4 className="text-center">Salary: ${employeeDetails.salary}</h4>
          <h4 className="text-center">Email: {employeeDetails.email}</h4>
        </div>
        <div className="mt-2">
          <button className="btn btn-danger me-3" onClick={logoutEmployee}>Logout</button>
          <button className="btn btn-warning">Edit</button>
        </div>
      </div>
    </section>
  )
};

export default EmployeeInformation;
