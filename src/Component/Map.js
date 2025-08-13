import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Map = () => {
  const mapRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const hoverPoints = [
    { x: 420, y: 348 },
    { x: 610, y: 740 },
    { x: 983, y: 415 },
    { x: 1240, y: 650 },
    { x: 1421, y: 360 },
  ];

  const getPercentPos = (point) => ({
    left: `${(point.x / 1788) * 100}%`,
    top: `${(point.y / 993) * 100}%`,
  });

  useEffect(() => {
    if (!mapRef.current) return;

    gsap.fromTo(
      mapRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 50%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div className="map-wrap" >
      <div className='map' ref={mapRef}>
        <img
        src={`${process.env.PUBLIC_URL}/images/map.png`}
        alt="map"
        className="map-image"


      />

      {hoverPoints.map((point, i) => {
        const pos = getPercentPos(point);
        return (
          <div
            key={i}
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
            className="hover-area"
            style={{
              ...pos,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
      </div>
      

      

      <div className={`map-info ${activeIndex !== null ? 'active' : ''}`}>
        {activeIndex === 0 && (
          <>
            <h2>1. ABOUT ME</h2>
            <ul>
              <li>SKILLS & TOOLS</li>
            </ul>
          </>
        )}
        {activeIndex === 1 && (
          <>
            <h2>2. MAIN-PROJECT</h2>
            <ul>
              <li>PARKING</li>
              <li>SHOPPINGMALL</li>
              <li>WORD GAME</li>
              <li>QUIZ GAME</li>
              <li>BLOG WEBPAGE</li>
              <li>UX/UI DESIGN</li>
            </ul>
          </>
        )}
        {activeIndex === 2 && (
          <>
            <h2>3. CLONE-CODING</h2>
            <ul>
              <li>NETFLIX</li>
              <li>MOMENTUM</li>
              <li>ARIBNB</li>
              <li>TESLA</li>
            </ul>
          </>
        )}
        {activeIndex === 3 && <h2>4. PRACTICAL-PUBLISHING</h2>}
        {activeIndex === 4 && <h2>5. BOARDGAME-DESIGN</h2>}
      </div>
    </div>
  );
};

export default Map;
