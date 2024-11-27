import { NavLink } from "react-router-dom";
import "./NavBar.css"

const NavBar = () => {
  return (
    <header className="bg-body-secondary py-3">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/admin/dashboard">Dashboard</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink className="nav-link mx-3" to="/admin/categories">Categories</NavLink>
              <NavLink className="nav-link mx-3" to="/admin/employees">Administrate Employees</NavLink>
              <NavLink className="nav-link mx-3" to="/admin/profile">Profile</NavLink>
              <NavLink className="nav-link mx-3" to="/admin/login">Logout</NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default NavBar;