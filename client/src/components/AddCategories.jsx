import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;


const AddCategories = () => {
  const [newCategory, setNewCategory] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(baseUrl + "/admin/categories", {newCategory: newCategory});
      if (data) {
        navigate("/admin/categories");
      } else {
        setError(data.message || "An unexpected error occurred" );
      }
    } catch (error) {
      // Handle category already exists
      console.error("Category already exists");
      setError("Category already exists");
  }
};

  return (
  <section className="d-flex flex-column h-75 justify-content-center align-items-center mt-5">
    <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center w-100 pt-5">
      <div 
        className="p-3 rounded border border-primary bg-primary-subtle"
        style={{ maxWidth: "25rem", width: "90%", height: "15rem" }}>
        <h2 className="pb-3">Add a New Category</h2>
        {error && <div className="text-danger">{error}</div> }
        <form onSubmit={createCategory}>
          <div className="pb-3">
            <label htmlFor="category"><b>Please enter a new category:</b></label>
            <input 
              onChange={(e) => setNewCategory(e.target.value)}
              className="form-control rounded" 
              type="text" 
              id="category" 
              name="category" 
              placeholder="New Category" 
            />
          </div>
          <button className="btn btn-primary w-100 rounded">Create New Category</button>
        </form>
      </div>
    </div>
  </section>
  )
}

export default AddCategories;
