import gsap from 'gsap';
import useStore from '@/store/useStore';

export default function AnimateJourney(element, isVisible) {
  if (!element) return;

  if (isVisible) {
    gsap.to(element, {
      opacity: 1,
      duration: 2.0,
      ease: 'power2.inOut',
      delay: 4.0,
      onStart: () => useStore.setState({ isEndScreen: true }),
    });
  } else {
    gsap.set(element, {
      opacity: 0,
    });
  }
}
