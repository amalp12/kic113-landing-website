import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      baseColor: string;

      constructor(width: number, height: number, isDark: boolean) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.baseColor = isDark ? "#10B981" : "#3B82F6"; // Green for dark, Blue for light
        this.color = this.baseColor;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        if (!ctx) return;

        // Create gradient
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * 2
        );
        gradient.addColorStop(0, `${this.color}CC`);
        gradient.addColorStop(1, `${this.color}00`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles - adjusted count for better visibility
    const particles: Particle[] = [];
    const particleCount = Math.min(
      Math.max(
        30, // Minimum particles
        Math.floor((window.innerWidth * window.innerHeight) / 15000) // Scale with screen size
      ),
      120 // Maximum number of particles
    );

    for (let i = 0; i < particleCount; i++) {
      particles.push(
        new Particle(canvas.width, canvas.height, theme === "dark")
      );
    }

    // Animation loop with optimized rendering
    let animationId: number;
    const fps = 30; // Target FPS
    const interval = 1000 / fps;
    let then = 0;
    let frameCount = 0;

    const animate = (timestamp: number) => {
      if (!ctx) return;

      // Throttle FPS
      if (!then) then = timestamp;
      const delta = timestamp - then;
      frameCount++;

      if (delta > interval) {
        then = timestamp - (delta % interval);

        // Clear with theme-appropriate background
        const isDark = theme === "dark";
        ctx.fillStyle = isDark ? "#0F172A" : "#F8FAFC";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        for (let i = 0; i < particles.length; i++) {
          particles[i].baseColor = isDark ? "#10B981" : "#3B82F6";
          particles[i].color = particles[i].baseColor;
          particles[i].update();
          particles[i].draw();
        }

        // Draw connections on every 2nd frame for better performance
        if (frameCount % 2 === 0) {
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const dx = particles[i].x - particles[j].x;
              const dy = particles[i].y - particles[j].y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 150) {
                // Increased connection distance
                const opacity = Math.floor((1 - distance / 150) * 60); // Increased opacity
                ctx.strokeStyle = `${particles[i].baseColor}${opacity
                  .toString(16)
                  .padStart(2, "0")}`;
                ctx.lineWidth = 0.6; // Slightly thicker lines
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
              }
            }
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [theme]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.04] dark:bg-grid-gray-900/[0.05] [mask-image:linear-gradient(to_bottom,transparent_1px,white_1px)] [mask-size:40px_40px]" />
      <canvas
        ref={canvasRef}
        className="w-full h-full transition-colors duration-300"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background))_70%)]" />
    </div>
  );
};

export default AnimatedBackground;
