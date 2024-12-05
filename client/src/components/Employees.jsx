import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const Employees = () => {

  const [employee, setEmployee] = useState([]);

  const fetchEmployees = async () => {
    try {
      const {data} = await axios.get(baseUrl + "/admin/employees")
      setEmployee(data);
    } 
    catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  console.log(employee)

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
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>

    <Link to="/admin/employees/new" className="btn btn-success mt-3"> Add a New Employee</Link>
  </section>
  )
}

export default Employees;
