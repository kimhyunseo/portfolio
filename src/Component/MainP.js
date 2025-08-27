import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

import data from '../json/mainprojectlist.json';
import { Icons } from '../svg/index';

gsap.registerPlugin(ScrollTrigger);

const MainP = () => {
  const titleRef = useRef(null);
  const itemWrapRef = useRef(null);


  useEffect(() => {
    // 1. 스크롤 트리거 애니메이션
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 50%",
      }
    });

    tl.fromTo(
      titleRef.current,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 1.3, ease: "power3.out" }
    )

    const items = itemWrapRef.current.querySelectorAll(".item");
    tl.fromTo(
      items,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.2 },
      "-=0.6"
    );
  }, []);

  return (
    <div className='main-project'>
      <div className='title' ref={titleRef}>
        <img src={`${process.env.PUBLIC_URL}/images/mainproject.png`} alt="메인 프로젝트 타이틀" />
      </div>
      <ul className="item-wrap" ref={itemWrapRef}>
        {data.map(({ id, title, description, icons, image }) => {
          return (
            <li
              
              key={id}
            >
              <Link
              className="item"
                to={{ pathname: "/projects", search: `?id=${id}` }}
                state={{ projectId: id, scrollTo: "cover" }} // ✅ 핵심
              >
                <div className="left">
                  <img src={`${process.env.PUBLIC_URL}/images/${image}`} alt={title} />
                </div>
                <div className="right">
                  <div className="txt-wrap">
                    <p>{title}</p>
                    <p>{description}</p>
                  </div>
                  <ul className="icon-list">
                    {icons.map((icon) => {
                      const IconComponent = Icons[icon.toLowerCase()];
                      return (
                        <li key={icon}>
                          {IconComponent ? <IconComponent /> : icon}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default MainP;