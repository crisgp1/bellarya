import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Registrar plugins de GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Configuración global de GSAP
export const initGSAP = () => {
  gsap.config({
    nullTargetWarn: false,
  });
};

// Animaciones comunes reutilizables
export const fadeIn = (element: string | Element, options = {}) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      ...options,
    }
  );
};

export const slideIn = (element: string | Element, direction: 'left' | 'right' = 'left') => {
  const xValue = direction === 'left' ? -100 : 100;
  return gsap.fromTo(
    element,
    { opacity: 0, x: xValue },
    {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power4.out',
    }
  );
};

export const scaleIn = (element: string | Element) => {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'back.out(1.7)',
    }
  );
};
