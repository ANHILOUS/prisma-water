import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

export default function WordsPullUp({ text, className = '', showAsterisk = false }: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(' ');

  return (
    <span ref={ref} className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split('').map((char, charIndex) => {
            const isLastChar = wordIndex === words.length - 1 && charIndex === word.length - 1 && char === 'a';
            return (
              <span key={charIndex} className="inline-block relative">
                <motion.span
                  className="inline-block"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: (wordIndex * words.length + charIndex) * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {char}
                </motion.span>
                {showAsterisk && isLastChar && (
                  <motion.sup
                    className="absolute top-[0.45em] -right-[0.3em] text-[0.31em]"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: (wordIndex * words.length + charIndex + 2) * 0.08 }}
                  >
                    *
                  </motion.sup>
                )}
              </span>
            );
          })}
          {wordIndex < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
}
