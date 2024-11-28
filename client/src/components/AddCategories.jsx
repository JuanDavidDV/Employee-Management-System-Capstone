import { useState } from "react";

const baseUrl = import.meta.env.VITE_API_URL;


const AddCategories = () => {
  const [newCategory, setNewCategory] = useState(null);

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(baseUrl + "/admin/add-categories", newCategory)
      console.log(data);
    }
    catch(error) {
      console.error(error);
    }
  }

  return (
  <section className="d-flex flex-column h-75 justify-content-center align-items-center mt-5">
    <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center w-100 pt-5">
      <div 
        className="p-3 rounded border border-primary bg-primary-subtle"
        style={{ maxWidth: "25rem", width: "90%", height: "15rem" }}>
        <h2 className="pb-3">Add a New Category</h2>
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