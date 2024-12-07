import { useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_URL;

const Profile = () => {
  const [adminDetails, setAdminDetails] = useState([]);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = async () => {
    try {
      const { data } = await axios.get(baseUrl + "/admin/logout");
      if(data) {
        navigate("/");
      }
    }
    catch(error) {
      console.error(error);
    }
  };

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
        <h3>Welcome back admin</h3>
        <div className="d-flex align-items-center flex-column mt-4">
          <h4 className="text-center">Email: {adminDetails.email}</h4>
        </div>
        <div className="mt-2">
          <button className="btn btn-danger me-3" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </section>
  )

}

export default Profile;
