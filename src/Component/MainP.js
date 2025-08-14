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
    // 1. 스크롤 트리거 애니메이션
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 50%",
      }
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    const items = itemWrapRef.current.querySelectorAll(".item");
    tl.fromTo(
      items,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.3, ease: "power2.out", stagger: 0.2 },
      "-=0.4"
    );

    // 2. 호버 애니메이션
    // GSAP.utils.toArray를 사용해 모든 .item 요소를 배열로 가져옵니다.
    const hoverItems = gsap.utils.toArray(items);

    hoverItems.forEach(item => {
      // 각 아이템에 대한 타임라인을 생성합니다.
      const hoverTimeline = gsap.timeline({ paused: true });

      hoverTimeline.to(item, {
        y: -10, // 위로 20px 이동
        duration: 0.2,
        ease: "power3.out"
      });

      // 마우스가 올라갔을 때(mouseenter) 타임라인 재생
      item.addEventListener("mouseenter", () => hoverTimeline.play());

      // 마우스가 벗어났을 때(mouseleave) 타임라인을 역재생
      item.addEventListener("mouseleave", () => hoverTimeline.reverse());
    });

    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    return () => {
      hoverItems.forEach(item => {
        // 이벤트 리스너 제거
        item.removeEventListener("mouseenter", () => {});
        item.removeEventListener("mouseleave", () => {});
      });
      // 생성된 GSAP 애니메이션들 정리 (ScrollTrigger 포함)
      gsap.killTweensOf(titleRef.current);
      gsap.killTweensOf(items);
    }

  }, []);

  return (
    <div className='main-project'>
      <div className='title' ref={titleRef}>
        <img src={`${process.env.PUBLIC_URL}/images/mainproject.png`} alt="메인 프로젝트 타이틀" />
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