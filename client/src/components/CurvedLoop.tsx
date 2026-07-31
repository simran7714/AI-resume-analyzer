import React, { useRef, useEffect, useState } from 'react';
import './CurvedLoop.css';

interface CurvedLoopProps {
  /** Text to loop along the curved path */
  marqueeText?: string;
  /** Font size in rem units */
  fontSize?: number;
  /** Speed multiplier – higher = faster (pixels per second) */
  speed?: number;
  /** Curve bend direction: 'up' | 'down' */
  curveDirection?: 'up' | 'down';
  /** Amplitude of the curve in viewBox units */
  curveAmount?: number;
  /** Gap between text repetitions */
  gap?: number;
  /** Fill color of text */
  color?: string;
  /** Wrapper className override */
  className?: string;
}

const CurvedLoop: React.FC<CurvedLoopProps> = ({
  marqueeText = 'AI Resume Analyzer • ATS Screening • Job Match • Skill Gap Analysis • ',
  fontSize = 6,
  speed = 60,
  curveDirection = 'up',
  curveAmount = 200,
  gap = 80,
  color = '#ffffff',
  className = '',
}) => {
  const textRef = useRef<SVGTextElement>(null);
  const animRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const [textWidth, setTextWidth] = useState(0);

  // Measure text width after first render
  useEffect(() => {
    if (textRef.current) {
      const w = textRef.current.getComputedTextLength();
      setTextWidth(w > 0 ? w : 800);
    }
  }, [marqueeText, fontSize]);

  // Animate the text offset
  useEffect(() => {
    if (textWidth === 0) return;

    const totalWidth = textWidth + gap;
    let lastTime: number | null = null;

    const animate = (timestamp: number) => {
      if (lastTime === null) lastTime = timestamp;
      const delta = timestamp - lastTime;
      lastTime = timestamp;

      offsetRef.current = (offsetRef.current + (speed * delta) / 1000) % totalWidth;

      const textEls = document.querySelectorAll<SVGTextElement>('.curved-loop-text');
      textEls.forEach((el, i) => {
        el.setAttribute('startOffset', `${-textWidth + offsetRef.current + i * totalWidth}`);
      });

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
    };
  }, [textWidth, speed, gap]);

  // SVG path for the curve
  const vbWidth = 1000;
  const vbHeight = 120;
  const controlY = curveDirection === 'up'
    ? vbHeight / 2 - curveAmount
    : vbHeight / 2 + curveAmount;

  const pathD = `M 0,${vbHeight / 2} Q ${vbWidth / 2},${controlY} ${vbWidth},${vbHeight / 2}`;

  return (
    <div className={`curved-loop-jacket ${className}`}>
      <svg
        className="curved-loop-svg"
        viewBox={`0 0 ${vbWidth} ${vbHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ fontSize: `${fontSize}rem`, fill: color }}
      >
        <defs>
          <path id="curvedPath" d={pathD} />
        </defs>

        {/* Hidden measuring element */}
        <text
          ref={textRef}
          className="curved-loop-text"
          style={{ visibility: 'hidden', fontSize: `${fontSize}rem` }}
        >
          <textPath href="#curvedPath">{marqueeText}</textPath>
        </text>

        {/* Visible looping text — 4 repetitions so loop is seamless */}
        {[0, 1, 2, 3].map((i) => (
          <text key={i} className="curved-loop-text" style={{ fontSize: `${fontSize}rem` }}>
            <textPath href="#curvedPath" startOffset={`${-textWidth + i * (textWidth + gap)}`}>
              {marqueeText}
            </textPath>
          </text>
        ))}
      </svg>
    </div>
  );
};

export default CurvedLoop;
