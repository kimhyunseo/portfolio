import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import data from "../json/mainpin.json";
import CoverPage from "./pages/CoverPage";
import OverviewPage from "./pages/OverviewPage";
import DesignSystemPage from "./pages/DesignSystemPage";
import RetrospectivePage from "./pages/RetrospectivePage";
import ResponsivePage from "./pages/ResponsivePage";
import Userflow from "./pages/Userflow";
import MenuBar from "./pages/MenuBar";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const ProjectPage = () => {
  const location = useLocation();
  const projectId = new URLSearchParams(location.search).get("id");
  const refs = useRef({});
  const scrollTriggersRef = useRef({});
  const isInitialLoad = useRef(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1440);

  // ScrollTriggers 생성
  const createScrollTriggers = () => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
    scrollTriggersRef.current = {};

    data.projects.forEach((project) => {
      const section = refs.current[project.id];
      if (!section) return;

      const pages = section.querySelectorAll(".page");
      if (!pages.length) return;

      const totalWidth = (pages.length - 1) * window.innerWidth;
      
      const tween = gsap.to(pages, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      });

      scrollTriggersRef.current[project.id] = tween.scrollTrigger;
    });
  };

  // 반응형 처리 및 초기 로드
  useEffect(() => {
    if (isDesktop) createScrollTriggers();

    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1440);
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, [isDesktop]);

  // 메뉴 클릭 시 이동 - 기존 코드 유지
  const handleScroll = (targetProjectId) => {
    const targetSection = refs.current[targetProjectId];

    if (!isDesktop) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    
    const resetAndScroll = () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      
      data.projects.forEach((project) => {
        const section = refs.current[project.id];
        if (section) {
          const pages = section.querySelectorAll(".page");
          gsap.set(pages, { x: 0, clearProps: "transform" });
        }
      });

      const sectionOffsetTop = targetSection.offsetTop;
      window.scrollTo({
        top: sectionOffsetTop,
        behavior: 'smooth'
      });

      setTimeout(() => {
        createScrollTriggers();
        ScrollTrigger.refresh();
      }, 800);
    };

    resetAndScroll();
  };

  // ✅ 메인에서 들어올 때만 간단하게 처리
  useEffect(() => {
    if (!isInitialLoad.current || !projectId) return;

    // DOM이 완전히 렌더링될 때까지 기다리기
    const checkAndScroll = () => {
      const targetSection = refs.current[projectId];

      if (!targetSection) {
        // 섹션을 못 찾으면 다시 시도
        setTimeout(checkAndScroll, 100);
        return;
      }

      // 첫 번째 프로젝트(id가 "1")인 경우 맨 위로
      if (projectId === "1") {
        // 1. 모든 ScrollTrigger 완전히 제거
        ScrollTrigger.killAll();
        
        // 2. GSAP 애니메이션도 모두 정리
        gsap.killTweensOf("*");
        
        // 3. 모든 페이지 transform과 스타일 완전 초기화
        data.projects.forEach((project) => {
          const section = refs.current[project.id];
          if (section) {
            const pages = section.querySelectorAll(".page");
            pages.forEach(page => {
              page.style.transform = "";
              page.style.x = "";
            });
            gsap.set(pages, { x: 0, clearProps: "all" });
          }
        });

        // 4. 강제로 맨 위로 이동 (여러 방법 시도)
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo({ top: 0, behavior: 'auto' });
        
        if (isDesktop) {
          // 5. ScrollTrigger를 훨씬 늦게 생성
          setTimeout(() => {
            createScrollTriggers();
            ScrollTrigger.refresh();
          }, 1000);
        }
        return;
      }

      if (isDesktop) {
        // 데스크톱: ScrollTrigger 먼저 생성
        createScrollTriggers();
        
        setTimeout(() => {
          // 더 간단한 방법: 섹션의 data-id로 찾아서 scrollIntoView 사용
          const allSections = document.querySelectorAll('.project-section');
          const targetSectionByQuery = document.querySelector(`[data-id="${projectId}"]`);

          if (targetSectionByQuery) {
            targetSectionByQuery.scrollIntoView({ behavior: 'auto', block: 'start' });
          } else {
            // 백업: 인덱스로 계산
            const projectIndex = parseInt(projectId) - 1;
            const scrollPosition = projectIndex * window.innerHeight;
            window.scrollTo(0, scrollPosition);
          }
        }, 100);
      } else {
        // 모바일: 바로 스크롤
        targetSection.scrollIntoView({ behavior: "auto", block: "start" });
      }
    };

    // 약간의 지연 후 시작
    setTimeout(checkAndScroll, 300);
    
    isInitialLoad.current = false;
  }, [projectId, isDesktop]);

  // 페이지 렌더링 함수
  const renderPage = (page) => {
    switch (page.title.toLowerCase()) {
      case "cover":
        return <CoverPage page={page} />;
      case "overview":
        return <OverviewPage page={page} />;
      case "design system":
        return <DesignSystemPage page={page} />;
      case "user flow":
        return <Userflow page={page} />;
      case "반응형 디자인":
        return <ResponsivePage page={page} />;
      case "retrospective":
        return <RetrospectivePage page={page} />;
      default:
        return null;
    }
  };

  return (
    <div className="project-page">
      <MenuBar
        projects={data.projects}
        handleScroll={handleScroll}
        isDesktop={isDesktop}
      />
      {data.projects.map((project) => (
        <section
          key={project.id}
          data-id={project.id}
          ref={(el) => {
            if (el) {
              refs.current[project.id] = el;
            }
          }}
          className="project-section"
          style={{
            backgroundColor: project.bg,
            backgroundImage: project.bgimg
              ? `url(${process.env.PUBLIC_URL}/images/${project.bgimg}.png)`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: project.color,
          }}
        >
          {project.pages.map((page) => (
            <div className="page" key={page.pageNumber}>
              {renderPage(page)}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};

export default ProjectPage;