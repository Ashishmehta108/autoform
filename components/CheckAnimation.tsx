"use client";
import { motion } from "framer-motion";

export default function CheckAnimation() {
  return (
    <svg viewBox="0 0 48 48" width="24" height="24" className="mx-auto">
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
      >
        <circle cx="24" cy="24" r="22" className="fill-green-500" />

        <motion.path
          d="M16 24 L22 30 L34 16"
          stroke="white"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      </motion.g>
    </svg>
  );
}
