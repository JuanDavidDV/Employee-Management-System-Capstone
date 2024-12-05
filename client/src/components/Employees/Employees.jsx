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

  console.log(employees)

  return (
  <section className="px-5 mt-5">
    <div className="d-flex justify-content-center">
      <h2>Employees</h2>
    </div>
    <div className="mt-4">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Salary $(CAD)</th>
            <th>Address</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {
            employees.map((employee) => (
              <tr key={employee.id}>
                <td className="align-middle">{employee.name}</td>
                <td className="align-middle">{employee.email}</td>
                <td className="align-middle">{employee.salary}</td>
                <td className="align-middle">{employee.address}</td>
                <td><img src={baseUrl + employee.image} alt={employee.name} className="employee_picture" />
                </td>
                <td className="align-middle">
                  <button>Delete</button>
                  <button>Edit</button>
                </td>
              </tr>
            ))

          }
        </tbody>
      </table>
    </div>

    <Link to="/admin/employees/new" className="btn btn-success mt-3"> Add a New Employee</Link>
  </section>
  )
}

export default Employees;
