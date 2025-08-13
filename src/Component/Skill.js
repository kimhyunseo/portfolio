import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icons } from '../svg/index';
gsap.registerPlugin(ScrollTrigger);

const Skill = () => {
  const selectedIcons = [
    { name: 'ps', label: 'PhotoShop' },
    { name: 'ai', label: 'Illustrator' },
    { name: 'figma', label: 'Figma' },
    { name: 'procreate', label: 'Procreate' },
    { name: 'html', label: 'Html5' },
    { name: 'css', label: 'CSS3' },
    { name: 'js', label: 'JS(ES6)' },
    { name: 'scss', label: 'SCSS' },
    { name: 'react', label: 'REACT' },
    { name: 'supabase', label: 'Supabase' },
    { name: 'git2', label: 'Git & Github' },
    { name: 'slack', label: 'Slack' },
  ];

  const titleRef = useRef(null);
  const infoRef = useRef(null);
  const bubbleRef = useRef(null);

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
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
    // info-wrap 등장
    .fromTo(
      infoRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.2 },
      "-=0.4" // 타이틀 끝나기 전 조금 겹치게 시작
    )
    .fromTo(
      bubbleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.2 },
      "-=0.4"
    )
  }, []);

  return (
    
    <div className="skill">
      <div className='title' ref={titleRef}>
        <img src={`${process.env.PUBLIC_URL}/images/skill.png`}/>
      </div>
      <div className="item-wrap" ref={infoRef}>
        <div className="left">
          <div className="bubble" ref={bubbleRef}>
            <p>탐험을 떠나기 위해선<br />
              든든히 준비해야 해!</p>
          </div>
          <div className="character">
            <img src={`${process.env.PUBLIC_URL}/images/catskill.png`} alt="탐험 고양이" />
          </div>

        </div>
        <div className="right">
          <div className="icon-list">
            {selectedIcons.map(({ name, label }) => {
              const Icon = Icons[name];
              if (!Icon) return null;
              return (
                <div key={name} className="icon-item">
                  <Icon className="w-10 h-10" />
                  <p>{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skill;