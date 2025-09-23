export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1, // delay giữa các child
      delayChildren: 0.2
    }
  }
};

export const fadeIn = {
  up: {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] // custom easing
      }
    }
  },
  down: {
    hidden: {
      opacity: 0,
      y: -40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] // custom easing
      }
    }
  },
  left: {
    hidden: {
      opacity: 0,
      x: -40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] // custom easing
      }
    }
  },
  right: {
    hidden: {
      opacity: 0,
      x: 40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] // custom easing
      }
    }
  }
}