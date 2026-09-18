import gsap from 'gsap';

export function attachMagnetic(el: HTMLElement, strength = 0.35) {
  const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
  const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });

  const onMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    xTo(relX * strength);
    yTo(relY * strength);
  };
  const onLeave = () => {
    xTo(0);
    yTo(0);
  };

  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', onLeave);

  return () => {
    el.removeEventListener('mousemove', onMove);
    el.removeEventListener('mouseleave', onLeave);
  };
}

export function attachPressSpring(el: HTMLElement) {
  const onDown = () => gsap.to(el, { scale: 0.93, duration: 0.15, ease: 'power2.out' });
  const onUp = () => gsap.to(el, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.4)' });

  el.addEventListener('mousedown', onDown);
  el.addEventListener('mouseup', onUp);
  el.addEventListener('mouseleave', onUp);
  el.addEventListener('touchstart', onDown, { passive: true });
  el.addEventListener('touchend', onUp);

  return () => {
    el.removeEventListener('mousedown', onDown);
    el.removeEventListener('mouseup', onUp);
    el.removeEventListener('mouseleave', onUp);
    el.removeEventListener('touchstart', onDown);
    el.removeEventListener('touchend', onUp);
  };
}

export function attachMotion(root: HTMLElement, opts?: { magneticStrength?: number }) {
  const cleanups: Array<() => void> = [];

  root.querySelectorAll<HTMLElement>('.magnetic').forEach((el) => {
    cleanups.push(attachMagnetic(el, opts?.magneticStrength ?? 0.35));
  });
  root.querySelectorAll<HTMLElement>('.press-spring').forEach((el) => {
    cleanups.push(attachPressSpring(el));
  });

  return () => cleanups.forEach((fn) => fn());
}
