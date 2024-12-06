import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_URL;

const EditEmployee = () => {
  const {id} = useParams();
  const [error, setError] = useState();
  const [categories, setCategories] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState({
    name: "", 
    email: "",
    category_id: "",
    salary: "", 
    address: ""
  });

  const navigate = useNavigate();

  const fetchEmployee = async () => {
    try {
      const { data } = await axios.get(baseUrl + "/admin/employee/" + id);
      setEmployeeDetails({
        ...employeeDetails, 
        name: data.name,
        email: data.email,
        category_id: data.category_id,
        salary: data.salary,
        address: data.address
      });
      
    }
    catch(error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(baseUrl + "/admin/categories");
      setCategories(data);
    } 
    catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchEmployee();
  }, []);

  const editEmployee = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await axios.put(baseUrl + "/admin/employee/" + id, employeeDetails);
      if(data) {
        navigate("/admin/employees")
      } else {
        setError(data.message || "An unexpected error occurred");
      }

    }
    catch(error) {
      console.error(error);
    }
  };

  return (
    <section className="d-flex flex-column h-75 justify-content-center align-items-center mt-2 pb-5">
      <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center w-100 pt-4">
        <div
          className="p-3 rounded border border-primary bg-primary-subtle"
          style={{ maxWidth: "28rem", width: "90%", minHeight: "33em" }}
        >
          <h2 className="pb-3">Edit Employee</h2>
          {error && <div className="text-danger">{error}</div> }
          <form onSubmit={editEmployee}>
            <div className="pb-3">
              <div className="pb-3">
                <label htmlFor="name" className="form-label"><b>Please enter the new employee's full name:</b></label>
                <input
                  onChange={(e) => setEmployeeDetails({...employeeDetails, name: e.target.value})}
                  className="form-control rounded"
                  type="text"
                  id="name"
                  name="name"
                  value={employeeDetails.name}
                />
              </div>

              <div className="pb-3">
                <label htmlFor="email" className="form-label"><b>Please enter the new employee's email:</b></label>
                <input
                  onChange={(e) => setEmployeeDetails({...employeeDetails, email: e.target.value})}
                  className="form-control rounded"
                  type="email"
                  id="email"
                  name="email"
                  value={employeeDetails.email}
                />
              </div>

              <div className="pb-3">
                <label htmlFor="category" className="form-label"><b>Please select the new employee's category:</b></label>
                <select 
                  name="category" 
                  id="category" 
                  className="form-select"
                  value={employeeDetails.category_id} // Bind this value to category_id
                  onChange={(e) => setEmployeeDetails({...employeeDetails, category_id: e.target.value})}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pb-3">
                <label htmlFor="salary" className="form-label"><b>Please enter the new employee's salary:</b></label>
                <input
                  onChange={(e) => setEmployeeDetails({...employeeDetails, salary: e.target.value})}
                  className="form-control rounded"
                  type="text"
                  id="salary"
                  name="salary"
                  value={employeeDetails.salary}
                />
              </div>

              <div className="pb-3">
                <label htmlFor="address" className="form-label"><b>Please enter the new employee's address:</b></label>
                <input
                  onChange={(e) => setEmployeeDetails({...employeeDetails, address: e.target.value})}
                  className="form-control rounded"
                  type="text"
                  id="address"
                  name="address"
                  value={employeeDetails.address}
                />
              </div>
            </div>

            <button className="btn btn-primary w-100 rounded">Update Employee</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default EditEmployee;
