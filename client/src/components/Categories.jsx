import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(baseUrl + "/admin/categories")
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
    <section className="px-5 mt-5">
      <div className="d-flex justify-content-center">
        <h2>Categories</h2>
      </div>
      <div className="mt-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Link to="/admin/categories/new" className="btn btn-success mt-3"> Add a New Category</Link>
    </section>
  )
}

export default Categories;
