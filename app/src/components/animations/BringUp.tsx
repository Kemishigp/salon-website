"use client";
import { motion, Variants } from "framer-motion";

export const BringUp = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  // Define the animation steps
  const cardVariants: Variants = {
    offscreen: {
      y: 30,       // Start 30px lower
      opacity: 0   // Start invisible
    },
    onscreen: {
      y: 0,        // Float up to original position
      opacity: 1,  // Fade in to full visibility
      transition: {
        type: "spring",      // Use a spring for a more "natural" float
        bounce: 0.4,
        duration: 1,
        delay: delay         // Use a custom delay param
      }
    }
  };

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }} // amount: 0.2 means trigger when 20% is visible
      variants={cardVariants}
    >
      {children}
    </motion.div>
  );
};