import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const cursorRef = useRef<HTMLDivElement>(null);
  const trailElementRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const isClickedRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsMobile(!mediaQuery.matches);

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsMobile(!event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (isMobile || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const updateTrail = () => {
      requestRef.current = null;
      const { x: targetX, y: targetY } = mouseRef.current;
      trailRef.current.x += (targetX - trailRef.current.x) * 0.15;
      trailRef.current.y += (targetY - trailRef.current.y) * 0.15;

      if (trailElementRef.current) {
        trailElementRef.current.style.transform =
          `translate3d(${trailRef.current.x}px, ${trailRef.current.y}px, 0) translate(-50%, -50%) scale(${isClickedRef.current ? 0.75 : 1})`;
      }

      const distance = Math.hypot(
        targetX - trailRef.current.x,
        targetY - trailRef.current.y,
      );
      if (distance > 0.1) {
        requestRef.current = requestAnimationFrame(updateTrail);
      }
    };

    const scheduleTrail = () => {
      if (requestRef.current === null) {
        requestRef.current = requestAnimationFrame(updateTrail);
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%) scale(${isClickedRef.current ? 0.6 : 1})`;
      }

      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        trailRef.current = mouseRef.current;
        setIsVisible(true);
      }
      scheduleTrail();
    };

    const onMouseDown = () => {
      isClickedRef.current = true;
      setIsClicked(true);
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0) translate(-50%, -50%) scale(0.6)`;
      }
      if (trailElementRef.current) {
        trailElementRef.current.style.transform =
          `translate3d(${trailRef.current.x}px, ${trailRef.current.y}px, 0) translate(-50%, -50%) scale(0.75)`;
      }
    };
    const onMouseUp = () => {
      isClickedRef.current = false;
      setIsClicked(false);
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (trailElementRef.current) {
        trailElementRef.current.style.transform =
          `translate3d(${trailRef.current.x}px, ${trailRef.current.y}px, 0) translate(-50%, -50%)`;
      }
    };
    const onMouseLeave = () => {
      hasMovedRef.current = false;
      isClickedRef.current = false;
      setIsVisible(false);
      setIsClicked(false);
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.body.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.classList.add('custom-cursor-enabled');

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.classList.remove('custom-cursor-enabled');
      if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
    };
  }, [isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ease-out bg-white"
        aria-hidden="true"
      />
      <div
        ref={trailElementRef}
        className={`fixed top-0 left-0 w-7 h-7 rounded-full pointer-events-none z-[9999] transition-transform duration-150 ease-out border border-slate-900/30 dark:border-white/30 ${
          isClicked ? 'border-teal-500/80 dark:border-teal-400/80' : ''
        }`}
        aria-hidden="true"
      />
    </>
  );
}
