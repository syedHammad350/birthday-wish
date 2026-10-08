import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) { element.classList.add('is-visible'); observer.unobserve(element); }
    }, { threshold: .12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}
export function Particles({ burst = false }: { burst?: boolean }) {
  return <div className={burst ? 'particles burst' : 'particles ambient'} aria-hidden="true">
    {Array.from({ length: burst ? 44 : 24 }, (_, i) => <span key={i} className={`particle particle-${i % 4}`} style={{ '--x': `${(i * 37 + 9) % 100}%`, '--delay': `${burst ? (i % 5) * .08 : (i % 9) * -.8}s`, '--duration': `${4 + i % 5}s`, '--drift': `${(i % 7 - 3) * 35}px`, '--turn': `${i * 47}deg` } as CSSProperties}>{i % 4 === 0 ? '♥' : i % 4 === 1 ? '✦' : i % 4 === 2 ? '·' : '❀'}</span>)}
  </div>;
}
export function Fireworks() {
  return <div className="fireworks" aria-hidden="true">{[0, 1, 2].map(n => <div className={`firework firework-${n}`} key={n}>{Array.from({length: 12}, (_, i) => <i key={i} style={{ '--turn': `${i * 30}deg` } as CSSProperties} />)}</div>)}</div>;
}
