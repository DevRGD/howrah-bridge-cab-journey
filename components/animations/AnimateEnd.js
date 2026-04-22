import gsap from 'gsap';

export default function AnimateEnd(container, content, isVisible) {
  if (!container || !content) return;

  if (isVisible) {
    const tl = gsap.timeline();
    tl.to(container, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.inOut',
    }).fromTo(
      content.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
      '-=0.2',
    );
  } else {
    gsap.to(container, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
    });
  }
}
