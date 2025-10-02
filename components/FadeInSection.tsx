import { useInView, motion } from "framer-motion";
import React from "react";

export const FadeInSection = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay: number;
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};
