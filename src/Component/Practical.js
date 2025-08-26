import data from '../json/practical.json';
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icons } from '../svg/index';

gsap.registerPlugin(ScrollTrigger);

const Practical = () => {
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
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.2 },
      "-=0.6"
    );
  }, []);

  return (
    <div className='practical'>
      <div className='title' ref={titleRef}> 
        <img src={`${process.env.PUBLIC_URL}/images/practical.png`} />
      </div>
      <ul className='item-wrap' ref={itemWrapRef}>
        {data.map(({ title, description, icons, image }, idx) => {
          return (
            <li className="item" key={idx}>
              <div className='top'>
                <div className="txt-wrap">
                  <p>{title}</p>
                  <ul>
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
                <img src={`../images/${image}`} alt={title} />
              </div>
              <div className='bottom'>
                <p>{description}</p>
              </div>
            </li>
          )
        })}
      </ul>

    </div>
  );
};

export default Practical;