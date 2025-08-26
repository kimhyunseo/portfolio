import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import data from "../json/boardgame.json";

gsap.registerPlugin(ScrollTrigger);


const BoardGame = () => {
  const titleRef = useRef(null);
  const itemWrapRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 50%", // 타이틀이 화면에 80% 올라왔을 때 시작
      }
    });

    // 타이틀 등장
    tl.fromTo(
      titleRef.current,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 1.3, ease: "power3.out" }
    )
    // info-wrap 등장
    const items = itemWrapRef.current.querySelectorAll(".item");
    tl.fromTo(
      items,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.2 },
      "-=0.4" // 타이틀 끝나기 전 조금 겹치게 시작
    );
  }, []);


  return (
    <div className="boardgame">
      <div className='title' ref={titleRef}>
        <img src={`${process.env.PUBLIC_URL}/images/boardgame.png`} alt="title" />
      </div>
      <ul className="info-wrap" ref={itemWrapRef}>
        {
          data.map(({ title, description, icons, image, url }, idx) => {
            return (
              <li className="item" key={idx}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <p>{title}</p>
                  <div className="img-wrap">
                    <img src={`${process.env.PUBLIC_URL}/images/${image}.png`} alt={title} />
                  </div>
                </a>

                <ul className="icons">
                  {icons.map((icon, i) => (
                    <li key={i}>
                      <img src={`${process.env.PUBLIC_URL}/images/${icon}`} alt={`${title} icon ${i}`} />
                    </li>
                  ))}
                </ul>

                <div className="tooltip">
                  <p>{description}</p>
                </div>
              </li>
            )
          })
        }
      </ul>

    </div>
  );
};

export default BoardGame;