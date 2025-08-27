import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


import { FaBook } from "react-icons/fa";
import { IoIosBaseball } from "react-icons/io";
import { TbPlayCardStarFilled } from "react-icons/tb";

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const titleRef = useRef(null);
  const infoRef = useRef(null);

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
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 1.3, ease: "power3.out" }
    )
      // info-wrap 등장
      .fromTo(
        infoRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.2 },
        "-=0.6" // 타이틀 끝나기 전 조금 겹치게 시작
      );
  }, []);

  return (
    <div className='aboutme'>
      <div className='title' ref={titleRef}>
        <img src={`${process.env.PUBLIC_URL}/images/aboutme.png`} />
      </div>
      <div className="info-wrap" ref={infoRef}>
        <div className="character">
          <img src={`${process.env.PUBLIC_URL}/images/character.png`} alt="고양이" />
        </div>
        <div className="right">
          <div className="top">
            <div className="bubble">
              <p>멈추지 않는 탐험가</p>
            </div>

            <p>새로운 것에 대한 <span>호기심</span>이 많아 항상 배우고 <span>도전</span>하는 사람입니다. 사용자의 입장에서 문제를 살피고 실용적이고 효과적인 해결책을 만드는 데 집중합니다. 혼자보다는 함께 <span>협업</span>하며 서로의
              강점을 살려 <span>성장</span>하는 것을 중요하게 생각하며 빠르게 변화하는 환경 속에서도 흔들림 없이 길을
              찾아가는 <span>탐험가</span> 같은 자세로 임합니다.</p>
          </div>
          <div className="bottom">
            <div className="like">
              <p>LIKES</p>
              <div className="item-wrap">
                <div className="item">
                  <IoIosBaseball />
                  <p>Baseball</p>
                </div>
                <div className="item">
                  <TbPlayCardStarFilled />
                  <p>Boardgame</p>
                </div>
                <div className="item">
                  <FaBook />
                  <p>Books</p>
                </div>
              </div>
            </div>
            <div className="exp">
              <p>EXPERIENCE</p>
              <div className="item-wrap">
                <div className="item">
                  <p>콘텐츠 창의인재동반사업 (보드게임)</p>
                  <p>2022</p>
                </div>
                <div className="item">
                  <p>콘텐츠 창의인재동반사업 (보드게임)</p>
                  <p>2023</p>
                </div>
                <div className="item">
                  <p>콘텐츠 창의인재동반사업 사업화 프로젝트</p>
                  <p>2024</p>
                </div>
                <div className="item">
                  <p>웹디자인, 웹퍼블리셔 전문가 양성 직업 훈련</p>
                  <p>2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
