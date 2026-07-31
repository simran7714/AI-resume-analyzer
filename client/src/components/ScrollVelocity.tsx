import React, { useRef, useEffect, useState, useCallback } from 'react';
import './ScrollVelocity.css';

interface ScrollVelocityProps {
  texts?: string[];
  velocity?: number;
  className?: string;
  damping?: number;
  clampMax?: number;
}

const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  texts = ['ResumeAI', 'ATS Score', 'Skill Match', 'AI Screening'],
  velocity = 5,
  className = '',
  damping = 50,
  clampMax = 3,
}) => {
  const baseX = useRef(0);
  const animationRef = useRef<number>(0);
  const scrollY = useRef(0);
  const prevScrollY = useRef(0);
  const scrollVelocityRef = useRef(0);
  const smoothVelocity = useRef(0);
  const directionFactor = useRef(1);

  const [x, setX] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const wrap = useCallback((min: number, max: number, val: number): number => {
    const range = max - min;
    return ((((val - min) % range) + range) % range) + min;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const rawVel = (scrollY.current - prevScrollY.current) / delta;
      prevScrollY.current = scrollY.current;

      scrollVelocityRef.current = rawVel;
      const maxVel = clampMax * 1000;
      const clampedVelocity = Math.max(-maxVel, Math.min(maxVel, scrollVelocityRef.current));
      const targetSmooth = clampedVelocity / 1000;

      smoothVelocity.current += (targetSmooth - smoothVelocity.current) * Math.min(delta * damping, 1);

      if (smoothVelocity.current < 0) directionFactor.current = -1;
      else if (smoothVelocity.current > 0) directionFactor.current = 1;

      baseX.current += (directionFactor.current * velocity * delta) + (smoothVelocity.current * velocity * 0.5);

      const wrapWidth = wrapperRef.current ? wrapperRef.current.offsetWidth / 2 : 200;
      const wrappedX = wrap(-wrapWidth, 0, baseX.current);
      setX(wrappedX);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [velocity, damping, clampMax, wrap]);

  // Build a long repeated string to fill viewport width
  const repeatedTexts = [...texts, ...texts, ...texts, ...texts];

  return (
    <div className={`parallax ${className}`}>
      <div className="scroller" style={{ transform: `translateX(${x}px)` }} ref={wrapperRef}>
        {repeatedTexts.map((text, i) => (
          <span key={i}>
            {text}
            <span className="scroll-velocity-dot" aria-hidden="true">&nbsp;•&nbsp;</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScrollVelocity;
