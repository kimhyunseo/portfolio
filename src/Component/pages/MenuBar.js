import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { HiHome } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const MenuBar = ({ projects, handleScroll, isDesktop }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const navigate = useNavigate();

  if (isDesktop) {
    return (
      <div className="menu-bar desktop-menu">
        <button onClick={() => navigate('/')} className="home">
            <HiHome />
          </button>
        {projects.map((project) => (
          <button key={project.id} onClick={() => handleScroll(project.id)}>
            {project.id}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`menu-bar mobile-menu ${isMenuOpen ? "open" : "closed"}`}>
      <button className="menu-toggle-button" onClick={toggleMenu}>
        {isMenuOpen ? <IoClose /> : <IoMenu />}
      </button>
      {isMenuOpen && (
        <div className="menu-list">
          <button onClick={() => navigate('/')} className="home">
            <HiHome />
          </button>
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => {
                handleScroll(project.id);
                toggleMenu();
              }}
            >
              {project.id}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuBar;
