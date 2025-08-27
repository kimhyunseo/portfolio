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


  // 이미지 애니메이션
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % frames.length);
    }, 200);
    return () => clearInterval(interval);
  }, [frames.length]);

  

  return (
    <div className='contcatme'>
      <div className="img-wrap">
        <img className="back" src={`${process.env.PUBLIC_URL}/images/cm1.png`} alt="cl1" />
        <img className="fire" src={frames[index]} alt="fire"/>
        <img className="title" src={`${process.env.PUBLIC_URL}/images/cm2.png`} alt="cl2"/>
      </div>

      <div className="txt-wrap">
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
