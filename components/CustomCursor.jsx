"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    const mouseOver = () => setHovering(true);
    const mouseOut = () => setHovering(false);

    window.addEventListener("mousemove", move);

  
    const clickableEls = document.querySelectorAll("a, button, input");
    clickableEls.forEach((el) => {
      el.addEventListener("mouseenter", mouseOver);
      el.addEventListener("mouseleave", mouseOut);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      clickableEls.forEach((el) => {
        el.removeEventListener("mouseenter", mouseOver);
        el.removeEventListener("mouseleave", mouseOut);
      });
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
      animate={{
        x: position.x - 12, 
        y: position.y - 12,
        scale: hovering ? 2 : 1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        className={`w-6 h-6 rounded-full ${
          hovering ? "bg-[#EC7C3C]" : "bg-white"
        } opacity-80`}
      />
    </motion.div>
  );
}
