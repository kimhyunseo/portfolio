import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TiArrowDownThick } from "react-icons/ti";

const IMG_WIDTH = 3840;

const Cover = () => {
  const frames = [
    `${process.env.PUBLIC_URL}/images/cat1.png`,
    `${process.env.PUBLIC_URL}/images/cat2.png`,
  ];
  const backImages = [
    `${process.env.PUBLIC_URL}/images/back1.png`,
    `${process.env.PUBLIC_URL}/images/back2.png`,
    `${process.env.PUBLIC_URL}/images/back3.png`,
    `${process.env.PUBLIC_URL}/images/back4.png`,
  ];
  const [frame, setFrame] = useState(0);
  const [offsets, setOffsets] = useState([0, 0, 0, 0]);
  const titleTopRef = useRef(null);
  const mainTitleRef = useRef(null);

  // 배경 이동
  useEffect(() => {
    const speeds = [0.7, 1.5, 0.2, 0.5];
    const id = setInterval(() => {
      setOffsets((prev) =>
        prev.map((offset, i) => (offset - speeds[i] + IMG_WIDTH) % IMG_WIDTH)
      );
    }, 16);
    return () => clearInterval(id);
  }, []);

  // 고양이 프레임 애니메이션
  useEffect(() => {
    const id = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // GSAP 텍스트 애니
  useEffect(() => {
    const letters = mainTitleRef.current.querySelectorAll("span");
    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(letters, {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.08,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });

    tl.to(
      titleTopRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "+=0.2"
    );
  }, []);

  // 스크롤 아이콘 애니
  useEffect(() => {
    gsap.to(".scroll-down-icon", {
      y: 8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 0.5,
    });
  }, []);

  return (
    <div className="cover">
      <div className="title-container">
        <div className="title-top" ref={titleTopRef}>
          <span className="left-text">FRONTEND</span>
          <hr className="divider" />
          <span className="right-text">2025 김현서</span>
        </div>
        <h1 className="main-title" ref={mainTitleRef}>
          {"PORTFOLIO".split("").map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </h1>
      </div>

      {/* 배경 레이어 */}
      {backImages.map((item, idx) => (
  <div
    key={idx}
    className={`layer back${idx + 1}`}
    style={{
      display: "flex",              // 가로로 이어붙이기
      transform: `translateX(${-offsets[idx]}px)`,
    }}
  >
    <img src={item} alt={`background${idx + 1}_1`} style={{ width: IMG_WIDTH }} />
    <img src={item} alt={`background${idx + 1}_2`} style={{ width: IMG_WIDTH }} />
  </div>
))}

      <img src={frames[frame]} alt="cat walking" className="cat-img" />

      <div className="scroll-down">
        <span>출발하기</span>
        <TiArrowDownThick className="scroll-down-icon" />
      </div>
    </div>
  );
};

export default Cover;
