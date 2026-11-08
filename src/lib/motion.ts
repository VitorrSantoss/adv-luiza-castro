import type { Variants } from 'framer-motion';

/** Mesma curva do design original */
export const ease = [0.22, 0.61, 0.36, 1] as const;

/** Container que escalona a entrada dos filhos (70ms entre itens, como no original) */
export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

/** Fade + slide de baixo (14px, 0.7s). Com prefers-reduced-motion, o
 *  <MotionConfig reducedMotion="user"> remove o deslocamento. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
