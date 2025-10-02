"use client";

import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";

export function UploadingIndicator() {
  return (
    <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
      <motion.div className="w-6 h-6 text-neutral-500 dark:text-neutral-400">
        <UploadCloud className="w-full h-full" />
      </motion.div>

      <motion.div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 bg-neutral-500 dark:bg-neutral-400 rounded-full"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 0.1,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      <span className="font-medium">Uploading...</span>
    </div>
  );
}
