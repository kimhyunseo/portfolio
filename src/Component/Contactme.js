import { useEffect, useRef, useState } from "react";
import { IoCall } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contactme = () => {
  const frames = [
    `${process.env.PUBLIC_URL}/images/cm4-2.png`,
    `${process.env.PUBLIC_URL}/images/cm4-3.png`,
    `${process.env.PUBLIC_URL}/images/cm4-4.png`,
  ];

  const titleRef = useRef(null);
  const txtRef = useRef(null);

  // 이미지 애니메이션
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % frames.length);
    }, 200);
    return () => clearInterval(interval);
  }, [frames.length]);

  // 스크롤 애니메이션
useEffect(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".contcatme",
      start: "top 80%",
    }
  });

  // 제목 fromTo
  tl.fromTo(
    ".title",
    { y: 50, opacity: 0 },   // 시작 상태
    { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" } // 끝 상태
  );

  // txt-wrap fromTo
  tl.fromTo(
    ".txt-wrap",
    { y: 50, opacity: 0 },  
    { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" } 
  );
}, []);


  return (
    <div className='contcatme'>
      <div className="img-wrap">
        <img className="back" src={`${process.env.PUBLIC_URL}/images/cm1.png`} alt="cl1" />
        <img className="fire" src={frames[index]} alt="fire"/>
        <img className="title" src={`${process.env.PUBLIC_URL}/images/cm2.png`} alt="cl2" ref={titleRef}/>
      </div>

      <div className="txt-wrap" ref={txtRef}>
        <p>사용자의 문제를 끝까지 탐험하며 최적의 해결책을 찾아내겠습니다.</p>
        <ul>
          <li><IoCall/><p>010-2110-4840</p></li>
          <li><IoIosMail/><p>rlagustj14@gmail.com</p></li>
        </ul>
      </div>
    </div>
  );
};

export default Contactme;
