"use client";
import { useAnimation, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedFormSVG = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const barControls = useAnimation();

  useEffect(() => {
    const loopAnimation = async () => {
      while (true) {
        await barControls.start({ y: 260, transition: { duration: 1.2 } });
        await barControls.start({ y: 80, transition: { duration: 1.2 } });
      }
    };
    loopAnimation();

    const timeout = setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full max-w-[500px]  mx-auto">
      <motion.svg
        viewBox="0 0 500 400"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <defs>
          <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>

        <motion.rect
          x="80"
          y="40"
          width="340"
          height="350"
          rx="16"
          className="fill-white flex flex-col items-center dark:fill-zinc-900 stroke-zinc-200 dark:stroke-zinc-700"
          strokeWidth="1.5"
        />

        {loading && (
          <>
            <motion.rect
              x="100"
              y="80"
              rx="4"
              ry="4"
              width="300"
              height="20"
              fill="#e5e7eb"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.rect
              x="100"
              y="80"
              rx="4"
              ry="4"
              width="200"
              height="16"
              fill="#e5e7eb"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.rect
              x="100"
              y="120"
              rx="4"
              ry="4"
              width="280"
              height="20"
              fill="#e5e7eb"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.rect
              x="100"
              y="160"
              rx="4"
              ry="4"
              width="260"
              height="20"
              fill="#e5e7eb"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </>
        )}

        {/* Moving Rose Bar */}
        {loading && (
          <motion.rect
            x="85"
            width="330"
            height="4"
            fill="url(#roseGradient)"
            initial={{ y: 80 }}
            animate={barControls}
          />
        )}

        {/* Success Check Animation */}
        {submitted && (
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
          >
            <circle cx="250" cy="180" r="24" className="fill-green-500" />
            <motion.path
              d="M 242 180 L 248 186 L 260 172"
              stroke="white"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </motion.g>
        )}
      </motion.svg>
    </div>
  );
};
