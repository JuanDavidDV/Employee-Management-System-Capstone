import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [adminDetails, setAdminDetails] = useState([]);

  const fetchAdmin = async () => {
    try {
      const { data } = await axios.get(baseUrl + "/admin/profile")
      setAdminDetails(data);
    }
    catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, []);

  return (
    <section>
      <div className="d-flex justify-content-center flex-column align-items-center mt-3">
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

}

export default Profile;
