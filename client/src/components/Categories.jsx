import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const Categories = () => {
  const fetchCategories = async () => {
    try {
      const {data} = await axios.get(baseUrl + "/admin/categories")
      console.log(data)
    } 
    catch(error) {
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [])
  return (
    <section className="px-5 mt-5">
      <div className="d-flex justify-content-center">
        <h2>Categories</h2>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>

      <Link to="/admin/categories/new" className="btn btn-success "> Add a New Category</Link>
    </section>
  )
}

export default Categories;