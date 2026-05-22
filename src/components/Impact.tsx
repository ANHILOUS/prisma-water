import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ShieldCheck, Database, Leaf, Cpu } from 'lucide-react';

interface StatItem {
  type: string;
  figure: string;
  label?: string;
  desc: string;
  number?: string;
  title?: string;
  icon?: any;
}

interface StatProps {
  stat: any;
  idx: number;
  isInView: boolean;
  key?: any;
}

function ImpactCard({ stat, idx, isInView }: StatProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (stat.type === 'featured') {
    return (
      <motion.div
        className="relative flex flex-col justify-between w-[290px] sm:w-[330px] h-[450px] rounded-3xl bg-[#0e0e11] border border-neutral-900/80 overflow-hidden shrink-0 p-6 snap-start shadow-xl cursor-default"
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
        transition={{ delay: idx * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          borderColor: isHovered ? "rgba(245, 158, 11, 0.35)" : "rgba(23, 23, 23, 0.8)",
          backgroundColor: isHovered ? "rgba(14, 14, 17, 0.9)" : "rgba(14, 14, 17, 1)",
          transition: "border-color 0.5s ease, background-color 0.5s ease"
        }}
      >
        {/* Ambient Golden Amber Hover Shader */}
        <div 
          className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden z-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          {/* Fluid overlapping glow blobs mimicking the reference image shader */}
          <motion.div 
            className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-tr from-amber-600/40 via-orange-500/25 to-yellow-500/10 blur-3xl"
            animate={isHovered ? {
              scale: [1, 1.25, 1.15, 1.3, 1],
              x: [0, 15, -10, 12, 0],
              y: [0, -25, 15, -18, 0]
            } : {
              scale: 1,
              x: 0,
              y: 0
            }}
            transition={isHovered ? {
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            } : {
              duration: 0.8,
              ease: "easeOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-28 -left-16 w-52 h-52 rounded-full bg-gradient-to-br from-yellow-500/25 via-pink-600/10 to-transparent blur-3xl"
            animate={isHovered ? {
              scale: [1, 1.18, 1.05, 1.22, 1],
              x: [0, -12, 18, -8, 0],
              y: [0, 15, -20, 10, 0]
            } : {
              scale: 1,
              x: 0,
              y: 0
            }}
            transition={isHovered ? {
              duration: 10,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            } : {
              duration: 0.8,
              ease: "easeOut"
            }}
          />
          <div className="absolute inset-0 bg-neutral-950/20 backdrop-blur-[1px]" />
        </div>

        {/* Modern abstract high-contrast gradient illustration inside block */}
        <div className="relative h-[220px] rounded-2.5xl overflow-hidden bg-gradient-to-br from-indigo-950 via-blue-900 to-[#122e5a] p-5 flex flex-col justify-between border border-white/5 z-10 transition-all duration-500 hover:shadow-[0_4px_30px_rgba(245,158,11,0.06)]">
          {/* Interactive floating elements inside */}
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-cyan-400/10 blur-2xl transition-all duration-700" />
          <div className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full bg-emerald-400/5 blur-3xl transition-all duration-700" />
          
          {/* Grid design lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          {/* Text Overlay */}
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono tracking-widest text-[#DEDBC8]/70 uppercase">Daily Capacity</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div className="relative z-10 font-sans">
            <h3 className="text-4xl sm:text-5xl font-light font-serif italic text-[#E1E0CC] tracking-tight leading-none mb-2">
              {stat.figure}
            </h3>
            <p className="text-xs font-light text-white/80 leading-tight">
              Pure Science. Absolute Flow.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-7 h-[1.5px] bg-[#DEDBC8]/40 my-4 z-10 relative" />

        {/* Description */}
        <div className="space-y-2 z-10 relative">
          <h4 className="text-xs uppercase tracking-wider font-semibold text-[#DEDBC8]/90 font-sans">
            {stat.label}
          </h4>
          <p className="text-xs sm:text-sm font-light text-neutral-300 leading-relaxed">
            {stat.desc}
          </p>
        </div>
      </motion.div>
    );
  }

  const Icon = stat.icon;

  return (
    <motion.div
      className="relative flex flex-col justify-between w-[290px] sm:w-[330px] h-[450px] rounded-3xl bg-[#0c0c0e] border border-neutral-900/60 transition-all duration-500 shrink-0 p-6 snap-start shadow-md cursor-default overflow-hidden"
      initial={{ opacity: 0, x: 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
      transition={{ delay: idx * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderColor: isHovered ? "rgba(245, 158, 11, 0.35)" : "rgba(23, 23, 23, 0.6)",
        backgroundColor: isHovered ? "rgba(14, 14, 17, 0.95)" : "rgba(12, 12, 14, 1)",
        transition: "border-color 0.5s ease, background-color 0.5s ease"
      }}
    >
      {/* Ambient Golden Amber Hover Shader */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden z-0 transition-opacity duration-700 ease-in-out"
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        {/* Fluid overlapping glow blobs mimicking the reference image shader */}
        <motion.div 
          className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-tr from-amber-600/40 via-orange-500/25 to-yellow-500/10 blur-3xl"
          animate={isHovered ? {
            scale: [1, 1.25, 1.15, 1.3, 1],
            x: [0, 15, -10, 12, 0],
            y: [0, -25, 15, -18, 0]
          } : {
            scale: 1,
            x: 0,
            y: 0
          }}
          transition={isHovered ? {
            duration: 8,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          } : {
            duration: 0.8,
            ease: "easeOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-28 -left-16 w-52 h-52 rounded-full bg-gradient-to-br from-yellow-500/25 via-pink-600/10 to-transparent blur-3xl"
          animate={isHovered ? {
            scale: [1, 1.18, 1.05, 1.22, 1],
            x: [0, -12, 18, -8, 0],
            y: [0, 15, -20, 10, 0]
          } : {
            scale: 1,
            x: 0,
            y: 0
          }}
          transition={isHovered ? {
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut"
          } : {
            duration: 0.8,
            ease: "easeOut"
          }}
        />
        <div className="absolute inset-0 bg-neutral-950/20 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 font-sans">
        {/* Card Title figure / badge */}
        <div className="flex items-baseline gap-1.5 mb-1 text-left">
          <span 
            className="text-2xl sm:text-3xl font-light font-serif italic select-none transition-colors duration-300"
            style={{ color: isHovered ? "#ffffff" : "#E1E0CC" }}
          >
            {stat.figure}
          </span>
        </div>

        {/* Small line divider */}
        <div 
          className="w-6 h-[1px] transition-colors duration-300 my-4"
          style={{ backgroundColor: isHovered ? "rgba(222, 219, 200, 0.4)" : "rgba(38, 38, 38, 1)" }}
        />

        <h3 className="font-semibold text-sm sm:text-base text-[#DEDBC8] uppercase tracking-wide mb-3 text-left">
          {stat.title}
        </h3>

        <p 
          className="text-xs sm:text-sm font-light leading-relaxed transition-colors duration-300 text-left"
          style={{ color: isHovered ? "#e5e5e5" : "#a3a3a3" }}
        >
          {stat.desc}
        </p>
      </div>

      {/* Bottom layout emblem */}
      {Icon && (
        <div 
          className="relative z-10 flex items-center justify-between mt-6 border-t pt-4 transition-colors duration-300"
          style={{ borderColor: isHovered ? "rgba(38, 38, 38, 1)" : "rgba(23, 23, 23, 0.6)" }}
        >
          <div 
            className="w-9 h-9 rounded-full bg-neutral-900/80 border flex items-center justify-center transition-all duration-300"
            style={{ 
              borderColor: isHovered ? "rgba(222, 219, 200, 0.4)" : "rgba(38, 38, 38, 1)",
              color: isHovered ? "#ffffff" : "rgba(222, 219, 200, 0.7)"
            }}
          >
            <Icon className="w-4 h-4" />
          </div>
          <span 
            className="font-mono text-[9px] uppercase tracking-widest transition-colors duration-300"
            style={{ color: isHovered ? "rgba(222, 219, 200, 0.7)" : "#737373" }}
          >
            Specification {stat.number}
          </span>
         </div>
      )}
    </motion.div>
  );
}

export default function Impact() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [scrollProgress, setScrollProgress] = useState(0);

  const stats = [
    {
      type: "featured",
      figure: "1.2B+",
      label: "Liters Purified Daily",
      desc: "Providing continuous, high-fidelity drinking water supply to major cities and industrial hubs around the globe."
    },
    {
      type: "standard",
      number: "01",
      figure: "99.99%",
      title: "Contaminant Stripping",
      desc: "Absolute physical and molecular extraction of heavy micro-metals, organic toxins, microplastics, and trace chemical residues under WHO regulations.",
      icon: ShieldCheck
    },
    {
      type: "standard",
      number: "02",
      figure: "140+",
      title: "Active Plants Commissioned",
      desc: "Robust physical utility systems in active operation across 18 countries, fully automated with custom SCADA integrations and satellite backhauls.",
      icon: Database
    },
    {
      type: "standard",
      number: "03",
      figure: "0%",
      title: "Eco Residual Footprint",
      desc: "Harnessing advanced natural physical processes like electro-coagulation and continuous UV-C to prevent downstream ecosystem damage without chemicals.",
      icon: Leaf
    },
    {
      type: "standard",
      number: "04",
      figure: "100%",
      title: "Autonomous Controls",
      desc: "Redundant edge control loops streaming continuous pressure, cellular membrane integrity, and molecular flux metrics to sovereign SCADA dashboards.",
      icon: Cpu
    }
  ];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const totalScroll = scrollWidth - clientWidth;
      if (totalScroll > 0) {
        setScrollProgress(scrollLeft / totalScroll);
      }
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  // Trigger one scroll height update initially
  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <section id="impact" ref={ref} className="bg-black py-28 px-4 md:px-8 border-t border-neutral-900 scroll-mt-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column (Sticky Title & info) */}
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-[#DEDBC8]/50 text-[10px] sm:text-xs tracking-widest uppercase mb-3 block font-medium">
                  Global Footprint ↴
                </span>
                
                <h2 className="text-4xl sm:text-5xl font-light text-[#E1E0CC] tracking-tight font-serif italic leading-tight">
                  What We Do ↴
                </h2>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <a 
                  href="#inquiries"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2 border border-neutral-800 bg-neutral-900/60 text-xs text-[#DEDBC8] hover:bg-[#DEDBC8] hover:text-black hover:border-[#DEDBC8] transition-all duration-300 font-medium whitespace-nowrap cursor-pointer group shadow-md"
                >
                  Request Specifications
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </motion.div>
            </div>

            {/* Bottom Section of Left Column */}
            <div className="mt-12 lg:mt-32 space-y-6">
              <p className="text-neutral-400 font-light text-xs sm:text-sm leading-relaxed max-w-sm">
                Empirical proof of macro-scale engineering robustness. We track continuous throughput, molecular purity levels, and plant automation loops globally.
              </p>

              {/* Slider Controls */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={scrollLeft}
                    className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-800 text-[#DEDBC8] flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
                    aria-label="Scroll left"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={scrollRight}
                    className="w-10 h-10 rounded-full border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-800 text-[#DEDBC8] flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
                    aria-label="Scroll right"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="flex-grow max-w-[120px] h-[1.5px] bg-neutral-900 relative rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-[#DEDBC8] transition-all duration-300 ease-out"
                    style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Cards horizontal scroll layout) */}
          <div className="col-span-12 lg:col-span-8 overflow-hidden relative">
            
            {/* Visual gradient overlay on the right side to signal overflow */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black via-black/10 to-transparent pointer-events-none z-10 hidden md:block" />

            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              data-lenis-prevent
              className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-none snap-x snap-mandatory py-4 touch-pan-x"
            >
              {stats.map((stat, idx) => (
                <ImpactCard key={idx} stat={stat} idx={idx} isInView={isInView} />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

