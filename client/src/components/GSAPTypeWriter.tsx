import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Props {
  words: string[];
  speed?: number;       // chars per second
  pauseDuration?: number; // ms to pause at each word
  cursor?: string;      // cursor character
  className?: string;
  loop?: boolean;
}

/**
 * GSAPTypeWriter – cycles through an array of words using GSAP,
 * applying .text-type and .text-type__cursor styles.
 */
export const GSAPTypeWriter: React.FC<Props> = ({
  words,
  speed = 50,
  pauseDuration = 1800,
  cursor = '|',
  className = '',
  loop = true,
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current || !cursorRef.current) return;

    let wordIndex = 0;
    let isCancelled = false;
    const charDelay = 1000 / speed;

    // Blinking cursor animation
    const cursorBlink = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });

    const typeWord = async (word: string) => {
      if (!textRef.current || isCancelled) return;
      textRef.current.textContent = '';

      // Type out
      for (let i = 0; i <= word.length; i++) {
        if (isCancelled) return;
        textRef.current.textContent = word.slice(0, i);
        await delay(charDelay);
      }

      await delay(pauseDuration);

      // Erase
      for (let i = word.length; i >= 0; i--) {
        if (isCancelled) return;
        textRef.current.textContent = word.slice(0, i);
        await delay(charDelay * 0.6);
      }

      await delay(300);
    };

    const run = async () => {
      while (!isCancelled) {
        await typeWord(words[wordIndex % words.length]);
        if (!loop && wordIndex >= words.length - 1) break;
        wordIndex++;
      }
    };

    run();

    return () => {
      isCancelled = true;
      cursorBlink.kill();
    };
  }, [words, speed, pauseDuration, loop]);

  return (
    <span className={`text-type ${className}`}>
      <span ref={textRef} />
      <span ref={cursorRef} className="text-type__cursor" aria-hidden="true">
        {cursor}
      </span>
    </span>
  );
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default GSAPTypeWriter;
