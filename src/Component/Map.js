import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scroller } from "react-scroll";

gsap.registerPlugin(ScrollTrigger);

const Map = () => {
  const mapRef = useRef(null);
  const infoRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const hoverPoints = [
    { x: 420, y: 348, target: "about" },
    { x: 615, y: 740, target: "main-project" },
    { x: 983, y: 415, target: "clone" },
    { x: 1245, y: 650, target: "practical" },
    { x: 1421, y: 360, target: "boardgame" },
  ];

  const getPercentPos = (point) => ({
    left: `${(point.x / 1788) * 100}%`,
    top: `${(point.y / 993) * 100}%`,
  });


  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mapRef.current,
        start: "top 50%", // 타이틀이 화면에 80% 올라왔을 때 시작
      }
    });

    // 지도 등장
    tl.fromTo(
      mapRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
      // info-wrap 등장
      .fromTo(
        infoRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.2 },
        "-=0.6" // 타이틀 끝나기 전 조금 겹치게 시작
      );
  }, []);


  return (
    <div className="map-wrap" >
      <div className='map' ref={mapRef}>
        <img
          src={`${process.env.PUBLIC_URL}/images/map.png`}
          alt="map"
          className="map-image" />

        {hoverPoints.map((point, i) => {
          const pos = getPercentPos(point);
          return (
            <div
              key={i}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() =>
                scroller.scrollTo(hoverPoints[i].target, {
                  duration: 300,
                  smooth: true,
                  offset: -80,
                })
              }
              className="hover-area"
              style={{
                ...pos,
                transform: 'translate(-50%, -50%)',
              }}
            />
          );
        })}
      </div>

      <div className='cat' ref={infoRef}>
        <p>어디를 먼저 살펴볼까?</p>
        <img src={`${process.env.PUBLIC_URL}/images/mapcat.png`} alt='고양이맵' />
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
