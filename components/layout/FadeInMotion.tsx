import { motion } from "framer-motion";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
  className: string;
}

export default function FadeInMotion({ className, children }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      {children}
    </motion.div>
  );
}
