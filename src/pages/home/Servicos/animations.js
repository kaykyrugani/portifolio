// Animações baseadas em Framer Motion
// Se preferir usar CSS puro, podemos converter para keyframes

export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 20,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export const drawLine = {
  hidden: { 
    pathLength: 0, 
    opacity: 0 
  },
  visible: {
    pathLength: 1,
    opacity: 0.5,
    transition: {
      pathLength: { 
        duration: 1.5, 
        ease: "easeInOut",
        delay: 0.3
      },
      opacity: { 
        duration: 0.01 
      }
    }
  }
};

export const scaleUp = {
  hidden: { 
    scale: 0.9, 
    opacity: 0 
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};
