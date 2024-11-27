import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const NavBar = () => {

  const [menuStatus, setMenuStatus] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  const isMobile = width <= 768;

  const handleScroll = () => {
    let currentSection = "";
    SECTIONS.forEach((section) => {
      const element = document.getElementById(section);
      const rect = element.getBoundingClientRect();
      if ((section === "about" || section === "skills" || section === "awards") && rect.top <= 100 && rect.bottom >= 10) {
        currentSection = "about";
      }
      else if (rect.top <= 10 && rect.bottom >= 10) {
        currentSection = section;
      }
    });
    setActiveSection(currentSection);
  };

  useEffect(() => {
    // Listen for scroll events to detect which section is active
    window.addEventListener("scroll", handleScroll);
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const toggleMenu = () => {
    const menu = document.getElementById("toggle-menu");
    menu.name = menu.name === "menu" ? "close" : "menu";
    setMenuStatus(status => !status)
  };

  const closeMenu = () => {
    setMenuStatus(false);
    const menu = document.getElementById("toggle-menu");
    menu.name = "menu";  // Reset the menu icon to 'menu'
  };
  return (
    <header className="bg-dark py-3 fixed-top w-100 z-1000">
      <nav className="navbar navbar-expand-lg navbar-dark w-92 mx-auto">
        <div className="container-fluid">
          <Link onClick={closeMenu} to="about" className="navbar-brand">
            <button className="btn btn-warning text-white rounded-lg font-bold px-2 py-1">
              Dashboard
            </button>
          </Link>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={menuStatus ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={() => toggleMenu()}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${menuStatus || !isMobile ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="about" onClick={closeMenu} className={`nav-link ${activeSection === "about" ? "bg-primary text-white" : ""}`}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="projects" onClick={closeMenu} className={`nav-link ${activeSection === "projects" ? "bg-primary text-white" : ""}`}>
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link to="experience" onClick={closeMenu} className={`nav-link ${activeSection === "experience" ? "bg-primary text-white" : ""}`}>
                  Experience
                </Link>
              </li>
              <li className="nav-item">
                <Link to="contact" onClick={closeMenu} className={`nav-link ${activeSection === "contact" ? "bg-primary text-white" : ""}`}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default NavBar;