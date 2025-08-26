import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { FaMapMarkerAlt } from "react-icons/fa";

const MainMenuvar = () => {
  const [show, setShow] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // cover + map 높이 합치기
      const coverHeight = document.getElementById("cover")?.offsetHeight || 0;
      const mapHeight = document.getElementById("map")?.offsetHeight || 0;
      const threshold = coverHeight + mapHeight;

      if (currentScroll < threshold) {
        // cover + map 영역 안에서는 숨김
        setShow(false);
      } else {
        if (currentScroll > lastScroll) {
          // 스크롤 내리는 중 → 보이게
          setShow(true);
        } else {
          // 스크롤 올리는 중 → 숨김
          setShow(false);
        }
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <nav className={`navbar ${show ? "visible" : "hidden"}`}>
      <ul>
        <li><Link to="map" smooth={true} duration={300}><FaMapMarkerAlt /></Link></li>
        <li><Link to="about" smooth={true} duration={300} offset={-80}>About Me</Link></li>
        <li><Link to="main-project" smooth={true} duration={300} offset={-80}>Main Project</Link></li>
        <li><Link to="clone" smooth={true} duration={300} offset={-80}>Clone</Link></li>
        <li><Link to="practical" smooth={true} duration={300} offset={-80}>Practical</Link></li>
        <li><Link to="boardgame" smooth={true} duration={300} offset={-80}>BoardGame</Link></li>
      </ul>
    </nav>
  );
};

export default MainMenuvar;