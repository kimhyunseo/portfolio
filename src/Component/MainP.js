import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

import data from '../json/mainprojectlist.json';
import { Icons } from '../svg/index';

gsap.registerPlugin(ScrollTrigger);

const MainP = () => {
  const titleRef = useRef(null);
  const itemWrapRef = useRef(null);

  useEffect(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: titleRef.current,
      start: "top 50%",
    }
  });

  // 1. 타이틀 애니메이션
  tl.fromTo(
    titleRef.current,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
  );

  // 2. item 순차 애니메이션 (타이틀 끝나면 실행)
  const items = itemWrapRef.current.querySelectorAll(".item");
  tl.fromTo(
    items,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1.3, ease: "power2.out", stagger: 0.2 },
    "-=0.4"
  );

}, []);

  return (
    <div className='main-project'>
      <div className='title' ref={titleRef}>
        <img src={`${process.env.PUBLIC_URL}/images/mainproject.png`}/>
      </div>
      <ul className="item-wrap" ref={itemWrapRef}>

        {data.map(({ title, description, icons, image }, idx) => {
          return (
            <li className="item" key={idx}>
              <div className="left">
                <img src={`../images/${image}`} alt={title} />
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
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default MainP;