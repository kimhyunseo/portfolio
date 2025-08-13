import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { IoIosArrowDown } from "react-icons/io";

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



  useEffect(() => {
    const speeds = [0.7, 1.5, 0.2, 0.5];
    const id = setInterval(() => {
      setOffsets((prev) =>
        prev.map((offset, i) => (offset + speeds[i]) % IMG_WIDTH)
      );
    }, 16);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // gsap
  useEffect(() => {
    const letters = mainTitleRef.current.querySelectorAll("span");
    const tl = gsap.timeline({ delay: 0.2 });

    // 1. 글자가 하나씩 통통 튀게 (먼저 실행)
    tl.to(letters, {
      opacity: 1, // 최종 상태를 1로 명확히 지정
      y: 0,
      scale: 1,
      stagger: 0.08,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });

    // 2. title-top이 스르륵 나오게 (나중에 실행)
    tl.to(
      titleTopRef.current,
      {
        opacity: 1, // 최종 상태를 1로 명확히 지정
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "+=0.2" // 이전 애니메이션이 끝난 후 0.2초 뒤에 시작
    );
  }, []);

  // 스크롤 애니
  useEffect(() => {
    gsap.to(".scroll-down-icon", {
      y: 8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 0.8
    });
  }, []);

  return (
    <div className="cover">
      <div className="title-container">
        <div className="title-top" ref={titleTopRef}>
          <span className="left-text">frontend</span>
          <hr className="divider" />
          <span className="right-text">2025 김현서</span>
        </div>
        <h1 className="main-title" ref={mainTitleRef}>
          {"PORTFOLIO".split("").map((char, i) => (
            <span key={i}>{char}</span>
          ))}
        </h1>
      </div>
        {backImages.map((item, idx) => (
      <div
        key={idx}
        className={`layer back${idx + 1}`}
        style={{ transform: `translateX(${-offsets[idx]}px)` }}
      >
        <img src={item} alt={`background${idx + 1}_1`} />
        <img src={item} alt={`background${idx + idx}_2`} />
        <img src={item} alt={`background${idx + 1}_3`} />
      </div>
    ))}
      <img src={frames[frame]} alt="cat walking" className="cat-img" />

      <div className="scroll-down">
        <span>출발하기</span>
        <IoIosArrowDown className="scroll-down-icon" />
      </div>

    </div>
  );
};

export default Cover;
