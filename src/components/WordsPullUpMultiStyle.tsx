import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface TextSegment {
  text: string;
  className: string;
}

interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  className?: string;
}

export default function WordsPullUpMultiStyle({ segments, className = '' }: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  
  let globalWordIndex = 0;
  
  const allWords = segments.flatMap(segment => 
    segment.text.split(' ').map(word => ({
      word,
      className: segment.className
    }))
  );

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {allWords.map((item, index) => {
        const currentWordIndex = globalWordIndex;
        if (item.word.length > 0) {
          globalWordIndex++;
        }
        return (
          <span key={index} className={`${item.className} inline-block`}>
            <span className="inline-block">
              {item.word.split('').map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  className="inline-block"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: (currentWordIndex * 3 + charIndex) * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
            {index < allWords.length - 1 && '\u00A0'}
          </span>
        );
      })}
    </div>
  );
}
