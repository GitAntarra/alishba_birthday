"use client"

import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const ConfettiEffect = () => {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0">
      <Confetti width={windowSize.width} height={windowSize.height} />;
    </div>
  )
};

export default ConfettiEffect;
