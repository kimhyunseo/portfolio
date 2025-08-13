import { useRef, useEffect } from "react";

const BackgroundAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 먼지 초기화
    const dust = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 2 + Math.random() * 3,
      speedY: 0.2 + Math.random() * 0.3,
      color: "rgba(255,255,255,0.2)", // 먼지 색
    }));

    let animationFrameId;

    const draw = () => {
      ctx.fillStyle = "#325029"; // 배경색
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 먼지 그리기
      dust.forEach((d) => {
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, 2 * Math.PI);
        ctx.fillStyle = d.color;
        ctx.fill();
        d.y += d.speedY; // ← 여기를 플러스
        if (d.y > canvas.height) d.y = 0; // 아래로 나가면 위에서 재등장
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }} />;
};

export default BackgroundAnimation;
