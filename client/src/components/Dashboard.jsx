import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [totalSalary, setTotalSalary] = useState();
  const [adminCount, setAdminCount] = useState();
  const [employeeCount, setEmployeeCount] = useState();
  const [admins, setAdmins] = useState([]);
  const navigate = useNavigate();

  const numAdmins = async () => {
    try {
      const { data } = await axios.get(baseUrl + "/admin/dashboard/admin");
      setAdminCount(data);
    } 
    catch(error) {
      console.error(error);
    }
  };

  const numEmployees = async () => {
    try {
      const { data } = await axios.get(baseUrl + "/admin/dashboard/employees");
      setEmployeeCount(data);
    } 
    catch(error) {
      console.error(error);
    }
  };

  const sumSalary = async () => {
    try {
      const { data } = await axios.get(baseUrl + "/admin/dashboard/salary");
      setTotalSalary(data);
    }
    catch(error) {
      console.error(error);
    }
  }

  const getAdmin = async () => {
    try {
      const { data } = await axios.get(baseUrl + "/admin/dashboard/admin-info");
      setAdmins(data);
    }
    catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    const token = document.cookie.split(';').find(c => c.trim().startsWith('token='));
    console.log(token)
    if(!token) {
      navigate("/admin/login")
    }

    getAdmin();
    numAdmins();
    numEmployees();
    sumSalary();
  }, [navigate]);

  return (
    <section>
      <div className="p-3 d-flex flex-wrap justify-content-around mt-3">
        <div className="px-3 bg-warning-subtle pt-2 pb-2 border shadow-sm col-12 col-md-4 col-lg-3 mb-3">
          <div className="text-center">
            <h4>Salary</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>${totalSalary}</h5>
          </div>
        </div>

        <div className="px-3 bg-warning-subtle pt-2 pb-2 border shadow-sm col-12 col-md-4 col-lg-3 mb-3">
          <div className="text-center">
            <h4>Administrators</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{adminCount}</h5>
          </div>
        </div>

        <div className="px-3 bg-warning-subtle pt-2 pb-2 border shadow-sm col-12 col-md-4 col-lg-3 mb-3">
          <div className="text-center">
            <h4>Employees</h4>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{employeeCount}</h5>
          </div>
        </div>
      </div>
      <div className="px-2 px-md-5">
        <h4 className="mt-5">The Administrators</h4> 
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="fs-6 fs-md-5">Email</th>
                <th className="fs-6 fs-md-5">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                admins.map((admin) => (
                  <tr key={admin.id}>
                    <td className="align-middle fs-6 fs-md-5">{admin.email}</td>
                    <td className="align-middle">
                      <button className="btn btn-danger me-2">Delete</button>
                      <Link className="btn btn-warning mt-md-0">Edit</Link>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Dashboard;
