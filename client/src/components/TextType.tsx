import React, { useEffect, useRef, useState } from 'react';
import './TextType.css';

export interface TextTypeProps {
  /** Array of strings to cycle through */
  texts: string[];
  /** Milliseconds per character while typing */
  typingSpeed?: number;
  /** Milliseconds per character while deleting */
  deletingSpeed?: number;
  /** Milliseconds to pause after fully typing a string */
  pauseAfterType?: number;
  /** Milliseconds to pause after fully deleting a string */
  pauseAfterDelete?: number;
  /** Custom className applied to the wrapper span */
  className?: string;
  /** Whether to show the blinking cursor */
  showCursor?: boolean;
  /** Character used as the cursor */
  cursorChar?: string;
  /** Cursor blink interval in ms */
  cursorBlinkSpeed?: number;
  /** Loop continuously */
  loop?: boolean;
}

const TextType: React.FC<TextTypeProps> = ({
  texts,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseAfterType = 1800,
  pauseAfterDelete = 400,
  className = '',
  showCursor = true,
  cursorChar = '|',
  cursorBlinkSpeed = 530,
  loop = true,
}) => {
  const [displayed, setDisplayed] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const phase = useRef<'typing' | 'pause-after-type' | 'deleting' | 'pause-after-delete'>('typing');
  const textIndex = useRef(0);
  const charIndex = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blinkRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (showCursor) {
      blinkRef.current = setInterval(() => {
        setCursorVisible(v => !v);
      }, cursorBlinkSpeed);
    }
    return () => {
      if (blinkRef.current) clearInterval(blinkRef.current);
    };
  }, [showCursor, cursorBlinkSpeed]);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const tick = () => {
      const currentText = texts[textIndex.current] || '';

      if (phase.current === 'typing') {
        charIndex.current += 1;
        setDisplayed(currentText.slice(0, charIndex.current));

        if (charIndex.current >= currentText.length) {
          phase.current = 'pause-after-type';
          timeoutRef.current = setTimeout(tick, pauseAfterType);
        } else {
          timeoutRef.current = setTimeout(tick, typingSpeed);
        }
      } else if (phase.current === 'pause-after-type') {
        phase.current = 'deleting';
        timeoutRef.current = setTimeout(tick, deletingSpeed);
      } else if (phase.current === 'deleting') {
        charIndex.current -= 1;
        setDisplayed(currentText.slice(0, charIndex.current));

        if (charIndex.current <= 0) {
          phase.current = 'pause-after-delete';
          timeoutRef.current = setTimeout(tick, pauseAfterDelete);
        } else {
          timeoutRef.current = setTimeout(tick, deletingSpeed);
        }
      } else if (phase.current === 'pause-after-delete') {
        if (loop || textIndex.current < texts.length - 1) {
          textIndex.current = (textIndex.current + 1) % texts.length;
          charIndex.current = 0;
          phase.current = 'typing';
          timeoutRef.current = setTimeout(tick, typingSpeed);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, typingSpeed);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [texts, typingSpeed, deletingSpeed, pauseAfterType, pauseAfterDelete, loop]);

  return (
    <span className={`text-type ${className}`}>
      {displayed}
      {showCursor && (
        <span
          className={`text-type__cursor${cursorVisible ? '' : ' text-type__cursor--hidden'}`}
          aria-hidden="true"
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
};

export default TextType;
