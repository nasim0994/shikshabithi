import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CircularProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleArrowClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 24;
  const strokeWidth = 5;
  const normalizedRadius = radius - strokeWidth * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "18px",
        right: "18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{ position: "relative", width: radius * 2, height: radius * 2 }}
      >
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="lightgray"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke="var(--primary)"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.2 }}
          />
        </svg>
        <button
          onClick={handleArrowClick}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "var(--primary)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          ↑
        </button>
      </div>
    </div>
  );
}
