import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ArrowRight, Sparkles, Activity, ShieldCheck, Cpu, Waves } from 'lucide-react';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';

interface PhaseDetail {
  id: string;
  number: string;
  header: string;
  title: string;
  subtitle: string;
  desc: string;
  stats: { label: string; value: string }[];
  accentGradient: string;
  glowColor: string;
  icon: React.ComponentType<any>;
}

const phases: PhaseDetail[] = [
  {
    id: "stage-01",
    number: "01",
    header: "PHYSICAL SCREENING",
    title: "Molecular Ultrafiltration",
    subtitle: "High-flux ceramic nano-cellular membrane array",
    desc: "Rigorous physical isolation of suspended microscopic particles. Delivers continuous pressurized reverse osmosis directly screening heavy industrial compounds and biological solid matter down to 0.1 nanometers.",
    stats: [
      { label: "Purity Ratio", value: "99.98% Absolute" },
      { label: "Water Flux Output", value: "240 L/m²/hr" },
      { label: "Membrane Pore Gauge", value: "0.1 Nanometer" }
    ],
    accentGradient: "linear-gradient(to bottom, #22d3ee 0%, #06b6d4 50%, #2563eb 100%)",
    glowColor: "rgba(6, 182, 212, 0.22)",
    icon: Waves
  },
  {
    id: "stage-02",
    number: "02",
    header: "SELECTIVE EXTRACTION",
    title: "Catalytic Ion Adsorption",
    subtitle: "Heavy mineral and chemical compound stripping",
    desc: "Polarized crystalline chelation chambers engineered to filter out persistent waterborne heavy metal molecules. Actively extracts arsenic, lead, chromium, and synthetic herbicide compounds securely.",
    stats: [
      { label: "Adsorption Efficiency", value: "99.54% Extraction" },
      { label: "Containment Pressure", value: "8.4 Bar Nominal" },
      { label: "Crystalline Bed Height", value: "1.2 Meters Active" }
    ],
    accentGradient: "linear-gradient(to bottom, #fbbf24 0%, #f97316 50%, #ea580c 100%)",
    glowColor: "rgba(249, 115, 22, 0.22)",
    icon: Cpu
  },
  {
    id: "stage-03",
    number: "03",
    header: "BIOLOGICAL CLEANSE",
    title: "Quantum UV-C Sterilization",
    subtitle: "Absolute chemical-free pathogen destruction",
    desc: "Targeted short-wave ultraviolet sparging arrays that disrupt bacterial cellular structures and nucleic acids. Decimates micro-pathogens and organic biofilms instantly without raw chlorine dosing.",
    stats: [
      { label: "Bio-Neutralization", value: "99.9999% Sterility" },
      { label: "UV Irradiation Dose", value: "120 Watts/cm²" },
      { label: "Chemical Runoff Delta", value: "0% Raw Byproducts" }
    ],
    accentGradient: "linear-gradient(to bottom, #ec4899 0%, #a855f7 50%, #10b981 100%)",
    glowColor: "rgba(168, 85, 247, 0.22)",
    icon: ShieldCheck
  }
];

// Tasks mapped to diagonal staggering offsets just like the white part of the image
const staggeredTasks = [
  { phaseIdx: 0, text: "Ceramic membrane grid alignment", yOffset: "mt-0" },
  { phaseIdx: 0, text: "Micro-pore hydraulic sweep", yOffset: "mt-3" },
  { phaseIdx: 0, text: "High-yield RO pressure check", yOffset: "mt-3" },
  { phaseIdx: 0, text: "Colloid organic separation logs", yOffset: "mt-3" },

  { phaseIdx: 1, text: "Crystalline chelation sizing", yOffset: "mt-0" },
  { phaseIdx: 1, text: "Heavy metal compound strip loop", yOffset: "mt-3" },
  { phaseIdx: 1, text: "Polarized binding grid calibration", yOffset: "mt-3" },
  { phaseIdx: 1, text: "Realtime chromatography scan", yOffset: "mt-3" },

  { phaseIdx: 2, text: "UV-C irradiance field sweep", yOffset: "mt-0" },
  { phaseIdx: 2, text: "Ozone oxidation cell pulse", yOffset: "mt-3" },
  { phaseIdx: 2, text: "Biofilm organic prevention logs", yOffset: "mt-3" },
  { phaseIdx: 2, text: "Chlorine alternative verify", yOffset: "mt-3" }
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeIdx, setActiveIdx] = useState(0);

  const headerSegments = [
    { text: "Purification Protocols. ", className: "text-[#DEDBC8]" },
    { text: "Engineered for absolute chemical-free water restoration.", className: "text-[#DEDBC8]/60" }
  ];

  const activePhase = phases[activeIdx];
  const IconComponent = activePhase.icon;

  return (
    <section id="process" ref={containerRef} className="bg-black relative py-28 px-4 md:px-8 border-t border-neutral-900 scroll-mt-6 overflow-hidden">
      {/* Background Visual Grid Lines */}
      <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-neutral-950/40 pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-neutral-950/40 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Dynamic Typography Section */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <WordsPullUpMultiStyle
            segments={headerSegments}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light leading-snug text-[#DEDBC8]"
          />
        </div>

        {/* Outer Split Layout - Grid System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT HALF: Sleek modern roadmap matching the WHITE part of the reference image */}
          <div className="lg:col-span-7 bg-[#FAF9F5] text-neutral-900 rounded-3xl p-6 sm:p-10 border border-neutral-200 shadow-2xl flex flex-col justify-between overflow-hidden relative group/whiteboard min-h-[600px] select-none">
            {/* Tech Grid Paper Texture Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            
            {/* Whiteboard Header info */}
            <div className="relative z-10 flex items-center justify-between border-b border-neutral-200/80 pb-5">
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase py-1 px-3 bg-neutral-900 text-white rounded-full">
                  STAGE PROTOCOLS
                </span>
                <span className="text-[10.5px] font-mono text-neutral-500 tracking-wider">
                  SYSTEM BLUEPRINT V3.0
                </span>
              </div>
              <div className="text-right">
                <span className="text-[9.5px] font-mono font-semibold text-neutral-400 uppercase tracking-widest block">
                  PHYSICAL TIMELINE
                </span>
              </div>
            </div>

            {/* Core Diagram: Vertical columns with line paths and waterfall bubbles */}
            <div className="relative z-10 grid grid-cols-3 gap-2 sm:gap-4 my-8 min-h-[460px] h-auto items-stretch pb-12">
              {phases.map((phase, pIdx) => {
                const isActive = activeIdx === pIdx;
                // Gather task items corresponding specifically to this stage
                const phaseTasks = staggeredTasks.filter(item => item.phaseIdx === pIdx);
                
                // Cascade stagger by offsetting the padding of each subsequent column
                const colPadding = pIdx === 0 
                  ? 'pt-2' 
                  : pIdx === 1 
                    ? 'pt-14 sm:pt-16' 
                    : 'pt-28 sm:pt-32';

                return (
                  <div 
                    key={phase.id} 
                    className="relative flex flex-col items-center group/col cursor-pointer h-full"
                    onClick={() => setActiveIdx(pIdx)}
                  >
                    {/* Column Line Path */}
                    <div 
                      className={`absolute top-10 bottom-0 w-[1.5px] transition-all duration-700 pointer-events-none ${
                        isActive 
                          ? 'bg-neutral-800 shadow-[0_0_8px_rgba(0,0,0,0.3)]' 
                          : 'bg-neutral-200/70 group-hover/col:bg-neutral-400'
                      }`} 
                    />

                    {/* Column Interactive Header */}
                    <motion.div 
                      className="relative z-20 text-center pb-2 flex flex-col items-center"
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className={`text-xs font-mono tracking-widest block font-bold transition-colors ${
                        isActive ? 'text-neutral-900' : 'text-neutral-400'
                      }`}>
                        {phase.number}
                      </span>
                      <h4 className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider mt-1 transition-colors ${
                        isActive ? 'text-neutral-950 underline underline-offset-4 decoration-neutral-800 decoration-2' : 'text-neutral-400/80 group-hover/col:text-neutral-600'
                      }`}>
                        {phase.header.split(" ")[0]}
                      </h4>
                    </motion.div>

                    {/* Waterfalling pills aligned cleanly inside each column */}
                    <div className={`w-full relative flex flex-col items-center gap-1.5 ${colPadding}`}>
                      {phaseTasks.map((task, tIdx) => {
                        const isTaskActive = isActive;
                        return (
                          <motion.div
                            key={tIdx}
                            className={`w-full max-w-[105px] sm:max-w-[160px] text-center rounded-full border px-2 sm:px-3 py-1.5 text-[8.5px] sm:text-[11px] font-sans font-medium hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 shadow-sm text-neutral-800 leading-tight relative z-20 border-neutral-200 bg-white hover:shadow-md cursor-pointer ${task.yOffset} ${
                              isTaskActive 
                                ? 'ring-2 ring-neutral-950 ring-offset-2 border-neutral-900 shadow font-semibold bg-white' 
                                : 'opacity-70 hover:opacity-100 hover:border-neutral-300'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveIdx(pIdx);
                            }}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: isTaskActive ? 1 : 0.7, y: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            {task.text}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Diagram Footer */}
            <div className="relative z-10 border-t border-neutral-200/80 mt-auto pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-500 gap-2">
              <span className="text-center sm:text-left">
                * Staggered sequence maps chemical-free isolation loops
              </span>
              <span className="uppercase text-neutral-400 tracking-wider">
                Interactive Multi-Column Flow
              </span>
            </div>
          </div>


          {/* RIGHT HALF: Gorgeous elegant console screen matching the BLACK part of the reference image */}
          <div className="lg:col-span-5 bg-[#0A0A0C] text-[#DEDBC8] rounded-3xl p-6 sm:p-10 border border-neutral-900 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[600px] group/console">
            
            {/* Dynamic Ambient Glowing Fluid Capsule Shape inside the dark card */}
            <div className="absolute top-10 bottom-10 right-4 sm:right-6 w-36 sm:w-44 rounded-full pointer-events-none select-none overflow-hidden blur-[60px] opacity-[0.22] z-0 transition-all duration-1000 ease-out" />
            
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0">
              <motion.div 
                className="absolute top-1/2 -translate-y-1/2 right-[-60px] w-56 h-[85%] rounded-full opacity-30 blur-3xl"
                animate={{
                  scale: [1, 1.15, 0.95, 1.05, 1],
                  y: ["-50%", "-42%", "-56%", "-48%", "-50%"]
                }}
                style={{
                  background: activePhase.accentGradient
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            {/* Overlay Grid lines for precision look */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0" />

            {/* Console Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-neutral-900/80 pb-5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#DEDBC8]/60">
                  DIAGNOSTIC TELEMETRY
                </span>
              </div>
              <span className="text-[9.5px] font-mono text-neutral-500 italic">
                Active State Realtime
              </span>
            </div>

            {/* Dynamic Console Phase Text and details with smooth AnimatePresence */}
            <div className="relative z-10 my-6 sm:my-8 flex-grow flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  {/* Glowing dynamic phase capsule mimicking Phase 3 Expansion container in image */}
                  <div className="relative overflow-hidden inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-neutral-950/80 shadow-md">
                    {/* Mini fluid pulsing bar inside indicator tag */}
                    <div 
                      className="absolute inset-0 opacity-10 blur-xs transition-colors duration-700"
                      style={{ background: activePhase.accentGradient }}
                    />
                    <span 
                      className="w-2 h-2 rounded-full transition-all duration-700" 
                      style={{ background: activePhase.accentGradient }}
                    />
                    <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase">
                      PHASE {activePhase.number} // {activePhase.header}
                    </span>
                  </div>

                  {/* Elegant big title */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#DEDBC8]/50 uppercase tracking-wider block">
                      PURIFICATION COMPONENT SYSTEM
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-serif italic font-light text-white tracking-tight leading-tight">
                      {activePhase.title}
                    </h3>
                  </div>

                  {/* Main spec descriptive text */}
                  <p className="text-[#a3a3a3] text-xs sm:text-sm font-light leading-relaxed">
                    {activePhase.desc}
                  </p>

                  {/* Mini physical specs index inside a technical diagnostic grid block */}
                  <div className="bg-neutral-950/80 border border-neutral-900/60 rounded-2xl p-4 space-y-3 relative overflow-hidden shadow-lg mt-8">
                    {/* Visual watermark logo representing molecule */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/5 select-none pointer-events-none">
                      <IconComponent className="w-16 h-16" />
                    </div>

                    <div className="flex items-center gap-2 border-b border-neutral-900/40 pb-2">
                      <Activity className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="text-[9.5px] font-mono text-[#DEDBC8]/40 uppercase tracking-widest">
                        METRIC SPECIFICATION INDICES
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {activePhase.stats.map((stat, sIdx) => (
                        <div key={sIdx} className="flex justify-between items-center text-xs font-mono border-b border-neutral-950 pb-1.5 last:border-none last:pb-0">
                          <span className="text-neutral-500 uppercase">{stat.label}</span>
                          <span className="text-[#E1E0CC] font-semibold">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Console Footer containing learn core specifications CTA */}
            <div className="relative z-10 border-t border-neutral-900/80 pt-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl transition-all duration-500 flex items-center justify-center border border-white/5 bg-neutral-950 text-white shadow-inner"
                  style={{ boxShadow: `0 0 15px ${activePhase.glowColor}` }}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-[9.5px] font-mono text-neutral-500 uppercase block leading-none mb-1">Ecosystem Grade</span>
                  <span className="text-[11px] font-sans font-medium text-white">Sovereign Compliance</span>
                </div>
              </div>

              <a
                href="#inquiries"
                className="inline-flex items-center gap-2 text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#DEDBC8] hover:text-white transition-colors duration-300 group"
              >
                Blueprints
                <ArrowRight className="w-3.5 h-3.5 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
