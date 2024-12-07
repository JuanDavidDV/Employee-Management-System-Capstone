import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import axios from "axios";
import "./Employees.css";

const baseUrl = import.meta.env.VITE_API_URL;

const Employees = () => {

  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const {data} = await axios.get(baseUrl + "/admin/employees")
      setEmployees(data);
    } 
    catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);
  

  const deleteEmployee = async (id) => {
    try {
      const {data} = await axios.delete(baseUrl + "/admin/employee/" + id);
      const employee = document.getElementById(id); //selects employee by ID to be deleted in the UI
      fetchEmployees();
      return employee.remove();
    }
    catch(error) {
      console.error(error)
    }
  }

  return (
<section className="px-5 mt-5">
  <div className="d-flex justify-content-center">
    <h2 className="fs-4 fs-md-2 fs-lg-1">Employees</h2>
  </div>
  <div className="mt-4">
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="fs-6 fs-md-5">Name</th>
            <th className="fs-6 fs-md-5">Email</th>
            <th className="fs-6 fs-md-5">Salary</th>
            <th className="fs-6 fs-md-5">Image</th>
            <th className="fs-6 fs-md-5">Address</th>
            <th className="fs-6 fs-md-5">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            employees.map((employee) => (
              <tr key={employee.id}>
                <td className="align-middle fs-6 fs-md-5">{employee.name}</td>
                <td className="align-middle fs-6 fs-md-5">{employee.email}</td>
                <td className="align-middle fs-6 fs-md-5">{employee.salary}</td>
                <td className="align-middle" >
                  <img src={baseUrl + employee.image} alt={employee.name} className="employee_picture" />
                </td>
                <td className="align-middle fs-6 fs-md-5">{employee.address}</td>
                <td className="align-middle">
                  <button className="btn btn-danger me-2" onClick={() => deleteEmployee(employee.id)}>Delete</button>
                  <Link to={`/admin/employees/edit/` + employee.id} className="btn btn-warning mt-3 mt-md-0">Edit</Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>

  <Link to="/admin/employees/new" className="btn btn-success mt-3"> Add a New Employee</Link>
</section>

  )
}

export default Employees;
