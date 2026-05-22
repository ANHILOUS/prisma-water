import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';

interface CharProps {
  key?: any;
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Char({ char, progress, range }: CharProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <motion.span style={{ opacity }} className="inline-block whitespace-pre">{char}</motion.span>;
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  const segments = [
    { text: "We are Splash,", className: "font-normal" },
    { text: "architects of pure water.", className: "italic font-serif font-semibold text-[#E1E0CC]" },
    { text: " We construct and automate high-fidelity, high-throughput water treatment plants worldwide.", className: "font-normal" }
  ];

  const bodyText = "Over the last twenty years, Splash has engineered municipal water assets and specialized industrial wastewater systems from Geneva to Tokyo. By integrating electro-coagulation with molecular ultrafiltration, our facilities return trillions of liters of pristine, life-grade drinking water to local grids and global ecosystems with zero chemical additives.";

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ['start 0.85', 'end 0.45']
  });

  const totalChars = bodyText.length;

  return (
    <section id="about" ref={containerRef} className="bg-black py-28 px-4 md:px-8 border-t border-neutral-900 scroll-mt-6">
      <div className="bg-[#121212]/50 border border-neutral-900 max-w-6xl mx-auto rounded-3xl p-8 md:p-16 text-center backdrop-blur-md relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
        
        <div className="text-[#DEDBC8]/50 text-[10px] sm:text-xs tracking-widest uppercase mb-8 font-medium">
          ECOLOGICAL VISION & INTEGRITY
        </div>

        <WordsPullUpMultiStyle
          segments={segments}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#E1E0CC] max-w-4xl mx-auto leading-[1.05] sm:leading-[1] mb-12"
        />

        <p
          ref={textRef}
          className="text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto font-light leading-relaxed select-none"
          style={{ color: '#DEDBC8' }}
        >
          {bodyText.split('').map((char, index) => {
            // Allocate each character's fade-in window.
            const startFraction = index / totalChars;
            // Let it fade-in over a small window of the total scroll progression.
            const endFraction = Math.min(1, startFraction + 0.15);
            
            return (
              <Char
                key={index}
                char={char === ' ' ? ' \u200B' : char} // Ensure spacer is correctly spaced
                progress={scrollYProgress}
                range={[startFraction, endFraction]}
              />
            );
          })}
        </p>
      </div>
    </section>
  );
}
