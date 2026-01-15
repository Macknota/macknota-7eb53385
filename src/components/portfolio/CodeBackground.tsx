import { useEffect, useRef } from "react";

const CodeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Code snippets to display
    const codeSnippets = [
      "public class",
      "async Task",
      ".NET Core",
      "Entity Framework",
      "LINQ",
      "API",
      "Repository",
      "interface",
      "DbContext",
      "HttpClient",
      "Controller",
      "Model",
      "View",
      "Service",
      "{ }",
      "=>",
      "();",
      "namespace",
      "using",
      "var",
      "const",
      "return",
      "await",
      "new()",
      "[HttpGet]",
      "[HttpPost]",
      "DI",
      "SOLID",
      "Clean Code",
      "SQL",
      "Redis",
      "JWT",
      "Auth",
    ];

    interface Particle {
      x: number;
      y: number;
      text: string;
      speed: number;
      opacity: number;
      size: number;
    }

    const particles: Particle[] = [];
    const particleCount = 40;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        speed: 0.2 + Math.random() * 0.5,
        opacity: 0.03 + Math.random() * 0.08,
        size: 10 + Math.random() * 6,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get primary color from CSS variable
      const computedStyle = getComputedStyle(document.documentElement);
      const primaryHsl = computedStyle.getPropertyValue("--primary").trim();

      particles.forEach((particle) => {
        ctx.font = `${particle.size}px "Space Mono", monospace`;
        ctx.fillStyle = `hsla(${primaryHsl}, ${particle.opacity})`;
        ctx.fillText(particle.text, particle.x, particle.y);

        // Move particle upward
        particle.y -= particle.speed;

        // Reset particle when it goes off screen
        if (particle.y < -20) {
          particle.y = canvas.height + 20;
          particle.x = Math.random() * canvas.width;
          particle.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        }
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default CodeBackground;
