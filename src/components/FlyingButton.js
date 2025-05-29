// components/FlyingButton.js
"use client";
import { motion, useAnimation } from "framer-motion";
import { useRef, useState } from "react";

export default function FlyingButton({ children, src }) {
  const controls = useAnimation();
  const [showFlyImage, setShowFlyImage] = useState(false);

  const handleFly = async () => {
    setShowFlyImage(true);
    await controls.start({
      x: 200, // adjust to your cart position
      y: -300,
      scale: 0.2,
      opacity: 0,
      transition: { duration: 1 },
    });
    setShowFlyImage(false);
  };

  return (
    <div className="relative inline-block" onClick={handleFly}>
      {children}
      {showFlyImage && (
        <motion.img
          src={src}
          className="w-24 h-24 rounded-full object-cover absolute top-0 left-0 z-50 pointer-events-none"
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={controls}
        />
      )}
    </div>
  );
}
