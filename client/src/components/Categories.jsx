import { Link } from "react-router-dom";

const Categories = () => {
return (
  <section className="px-5 mt-5">
    <div className="d-flex justify-content-center">
      <h2>Categories</h2>
    </div>
    <Link to="/admin/add-categories" className="btn btn-success "> Add a New Category</Link>
  </section>
)
}

export default Categories;