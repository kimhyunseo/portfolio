import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoClose } from "react-icons/io5";
import data from "../json/clonecoding.json";
import { Icons } from '../svg/index';




gsap.registerPlugin(ScrollTrigger);

const Clone = () => {
  const titleRef = useRef(null);
  const infoRefs = useRef([]);
  const popupRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 50%",
      },
    });

    // 타이틀
    tl.fromTo(
      titleRef.current,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 1.3, ease: "power3.out" }
    );

    // ul의 자식 li들 이동
    tl.fromTo(
      infoRefs.current,
      {
        x: (i) => (i < 2 ? 90 : -90), 
        opacity: 0
      },
      {
        x: 0,
        duration: 1,
        opacity: 1,
        ease: "power3.out",
        stagger: 0.2,
      },
      "-=0.6"
    );

    return () => tl.kill();
  }, []);

  // 팝업 열릴 때 애니메이션
  useEffect(() => {
    if (selectedProject && popupRef.current) {
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [selectedProject]);

  // 닫기 버튼 누를 때 애니메이션 후 종료
  const handleClose = () => {
    gsap.to(popupRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => setSelectedProject(null),
    });
  };

  return (
    <div className="clone">
      <div className="title" ref={titleRef}>
        <img src={`${process.env.PUBLIC_URL}/images/clonecoding.png`} />
      </div>

      <ul className="item-wrap">
        {data.map(({ title, cover_description, cover_img }, idx) => (
          <li
            className="item"
            key={idx}
            ref={(el) => (infoRefs.current[idx] = el)}
            onClick={() => setSelectedProject(data[idx])}
          >
            <img src={`${process.env.PUBLIC_URL}/images/${cover_img}`} alt={title} />
            <div className="txt-wrap">
              <div className="left">
                <p>0{idx + 1}</p>
              </div>
              <div className="right">
                <p>{title.toUpperCase()}</p>
                <p>{cover_description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* 팝업 */}
      {selectedProject && (
        <div
          className="popup-overlay"
          onClick={handleClose}  // overlay 클릭시 닫기
        >
          <div
            className="popup-content"
            ref={popupRef}
            style={{
              background: selectedProject.bg,
              color: selectedProject.color,
            }}
            onClick={(e) => e.stopPropagation()} // 내부 클릭시 닫힘 방지
          >
            <button className="close-btn"
              onClick={handleClose}
              style={{ color: selectedProject.color }}
            ><IoClose /></button>

            <div className="left">
              <div className="top">
                <div className="title-wrap">
                  <h2>{selectedProject.title}</h2>
                  <p>{selectedProject.url}</p>
                </div>

                <p>{selectedProject.description}</p>

                <div className="project-container">
                  <div className="project-item"><span className="label">Date</span><span className="content">{selectedProject.date}</span></div>
                  <div className="project-item"><span className="label">Ui design</span><span className="content">{selectedProject.ui_design}</span></div>
                  <div className="project-item"><span className="label">Layout</span><span className="content">{selectedProject.layout}</span></div>
                  <div className="project-item"><span className="label">Type</span><span className="content">{selectedProject.type}</span></div>

                </div>

              </div>

              <div className="bottom">
                <ul className="icon-list">
                  {selectedProject.icons.map((icon) => {
                    const IconComponent = Icons[icon.toLowerCase()];
                    return (
                      <li key={icon}>
                        {IconComponent ? <IconComponent /> : icon}
                      </li>
                    );
                  })}
                </ul>

                {selectedProject.libraries && (
                  <div className="libs">
                    {selectedProject.libraries.map((lib, i) => (
                      <span key={i}>{lib}</span>
                    ))}
                  </div>
                )}

              </div>
            </div>
            <div className="right">
              <div className="img-wrap">
                <img src={`${process.env.PUBLIC_URL}/images/${selectedProject.img}.png`} alt={selectedProject.title} />
              </div>

            </div>

            <div className="btn-wrap">
              {selectedProject.btnwrap?.map((btn, i) => (
                <a
                  key={i}
                  href={btn.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: btn.background, color: btn.color }}
                >
                  {btn.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clone;
