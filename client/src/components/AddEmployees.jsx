import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const AddEmployees = () => {

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const {data} = await axios.get(baseUrl + "/admin/categories")
      setCategories(data);
    } 
    catch(error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <section className="d-flex flex-column h-75 justify-content-center align-items-center mt-2 pb-5">
      <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center w-100 pt-4">
        <div
          className="p-3 rounded border border-primary bg-primary-subtle"
          style={{ maxWidth: "28rem", width: "90%", minHeight: "45em" }}
        >
          <h2 className="pb-3">Add a New Employee</h2>

          <form>
            <div className="pb-3">
              <div className="pb-3">
                <label htmlFor="name" className="form-label"><b>Please enter the new employee's full name:</b></label>
                <input
                  className="form-control rounded"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Smith"
                />
              </div>

              <div className="pb-3">
                <label htmlFor="inputGroupFile01" className="form-label"><b>Please enter the new employee's profile picture:</b></label>
                <input
                  className="form-control rounded"
                  type="file"
                  id="inputGroupFile01"
                />
              </div>

              <div className="pb-3">
                <label htmlFor="password" className="form-label"><b>Please create a password for the new employee:</b></label>
                <input
                  className="form-control rounded"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                />
              </div>

              <div className="pb-3">
                <label htmlFor="email" className="form-label"><b>Please enter the new employee's email:</b></label>
                <input
                  className="form-control rounded"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="jsmith@email.com"
                />
              </div>

              <div className="pb-3">
                <label htmlFor="category" className="form-label"><b>Please select the new employee's category:</b></label>
                <select name="category" id="category" className="form-select">
                  <option value="" disable selected className="fst-italic text-muted">
                    Please select a category
                  </option>
                  {categories.map((category) => {
                    return <option key={category.id} value={category.name}>{category.name}</option>
                  })}
                </select>
              </div>

              <div className="pb-3">
                <label htmlFor="salary" className="form-label"><b>Please enter the new employee's salary:</b></label>
                <input
                  className="form-control rounded"
                  type="text"
                  id="salary"
                  name="salary"
                  placeholder="Enter salary"
                />
              </div>

              <div className="pb-3">
                <label htmlFor="address" className="form-label"><b>Please enter the new employee's address:</b></label>
                <input
                  className="form-control rounded"
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter address"
                />
              </div>

            </div>

            <button className="btn btn-primary w-100 rounded">Create New Employee</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default AddEmployees;
