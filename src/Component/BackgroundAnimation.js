import { useRef, useEffect } from "react";

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // 캔버스 크기 설정 및 애니메이션 재시작 함수
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // 먼지 초기화
      const dust = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 1 + Math.random() * 3,
        speedY: 0.2 + Math.random() * 0.3,
        color: "rgba(255,255,255,0.2)",
      }));

      // 기존 애니메이션 프레임 취소
      cancelAnimationFrame(animationFrameId);

      // 먼지 그리기 및 애니메이션 루프
      const draw = () => {
        ctx.fillStyle = "#325029";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        dust.forEach((d) => {
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.size, 0, 2 * Math.PI);
          ctx.fillStyle = d.color;
          ctx.fill();
          d.y += d.speedY;
          if (d.y > canvas.height) d.y = 0;
        });

        animationFrameId = requestAnimationFrame(draw);
      };

      draw();
    };

    // 초기 실행
    handleResize();

    // 윈도우 'resize' 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }} />;
};

export default BackgroundAnimation;