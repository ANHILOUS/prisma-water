import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { 
  ShieldCheck, 
  Flame, 
  Trees, 
  ArrowUpRight, 
  Activity, 
  Cpu, 
  Layers, 
  Compass, 
  Waves, 
  Zap, 
  CheckCircle2, 
  Database 
} from 'lucide-react';

interface SectorItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  desc: string;
  metrics: string[];
  details: string;
  styleType: string;
  badge: string;
  schemaLabel: string;
  schematic: { label: string; val: string }[];
  metricsList: { label: string; value: string }[];
}

const sectors: SectorItem[] = [
  {
    id: "SYS-1.0",
    number: "1.0",
    title: "MUNICIPAL UTILITIES",
    subtitle: "Large-Scale Civil Infrastructure",
    desc: "Sovereign physical grids designed for high-throughput city drinking water. Powered by gravity recovery loops and automated municipal quartz filtration systems.",
    metrics: ["99.9% Gravity Recovery", "No chemical residues", "Autonomous backwash filters"],
    details: "Sovereign metropolitan layouts require extreme structural security. Prisma municipal designs incorporate integrated triple-redundant pre-settlement grids, active quartz-sand layers, and high-intensity ozone infusers, engineered to supply consistent water volumes safely without synthetic chemicals.",
    styleType: "obsidian", // Charcoal, amber telemetry, circular radar dial, mini-logs
    badge: "SYS // MUNI INTAKE",
    schemaLabel: "MUNICIPAL CONDUIT V1",
    schematic: [
      { label: "PRIMARY INTAKE CONDUIT", val: "ACTIVE // 98.4 L/s" },
      { label: "QUARTZ FILTER PRESSURE", val: "NOMINAL // 4.5 Bar" },
      { label: "OZONE DENSITY SENSOR", val: "12.8 ppm // OK" },
      { label: "GRAVITY RETURN BYPASS", val: "99.8% EFFICIENCY" }
    ],
    metricsList: [
      { label: "Effective Grid Capacity", value: "1,200,000 Liters / hr" },
      { label: "Filtration Threshold", value: "0.2 Microns" },
      { label: "Pneumatic Autowash Cycle", value: "Active / 4h Interval" }
    ]
  },
  {
    id: "SYS-2.0",
    number: "2.0",
    title: "HEAVY INDUSTRIES",
    subtitle: "Zero-Liquid-Discharge (ZLD) Systems",
    desc: "Bespoke ionic heavy metal extractors and vacuum crystallization units designed to achieve 99.5% continuous closed-loop recycling.",
    metrics: ["99.5% Water recovery", "Heavy metal ion extraction", "Titanium-reinforced tubing"],
    details: "Industrial chemical treatment demands severe structural durability. Our titanium-sheathed vapor compressions, high-density electro-coagulators, and physical crystallizers separate chemical compounds and toxic micro-particles, permitting fully active loops that cut costs.",
    styleType: "solar-red", // Intense reddish orange, bold typography, pitch-deck aesthetic
    badge: "ZLD // INDUSTRIAL LOOP",
    schemaLabel: "HEAVY COMPLIANCE EXTRACTION",
    schematic: [
      { label: "IONIC SEPARATION V3", val: "HIGH MOLECULAR FLUX" },
      { label: "ELECTRO-CELL POTENTIAL", val: "94.2 V // 35.0 Amps" },
      { label: "VACUUM EVAPORATION SOLIDS", val: "99.52% DRIED SLUDGE" },
      { label: "TITANIUM CASING COOLING", val: "TEMPERATURE STEADY" }
    ],
    metricsList: [
      { label: "ZLD Recycling Efficiency", value: "99.52% Closed-Loop" },
      { label: "Ionic Purity Grade", value: "99.98% Metals Excluded" },
      { label: "Extreme TDS Tolerance", value: "250,000 ppm Capable" }
    ]
  },
  {
    id: "SYS-3.0",
    number: "3.0",
    title: "ECOLOGICAL SYSTEMS",
    subtitle: "Aquatic Habitat Life Systems",
    desc: "Turnkey ecological recovery pods engineered to restore dissolved oxygen levels, control algae blooms, and stabilize aquatic biology.",
    metrics: ["DO levels boosted +140%", "Organic algae neutralizer", "Solar autonomous telemetry"],
    details: "Delicate aquatic habitats require biological precision. Prisma environmental pods float directly on fragile reservoirs, utilizing micro-spargers, bio-extraction cycles, and sovereign solar power arrays to restore pristine water quality without introducing toxic chemical residues.",
    styleType: "alabaster", // Off-white warm stone texture, dark typography, environmental charts
    badge: "ECO // RECOVERY UNIT",
    schemaLabel: "BIOTA OXIDATION DECK",
    schematic: [
      { label: "HIGH-PRESSURE SPARGER", val: "94.8% DISPERSAL" },
      { label: "AMMONIUM SHIFT VALUE", val: "0.02 mg/L // DECREASE" },
      { label: "ALGAE SEDIMENT CAPTURE", val: "ACTIVE RECOVERY" },
      { label: "REDUNDANT BATTERY CELL", val: "84.2% CHARGED" }
    ],
    metricsList: [
      { label: "Operational Coverage Area", value: "4.5 Hectares / Pod" },
      { label: "Dissolved Oxygen Saturation", value: "+12.4 mg / Liter" },
      { label: "Power Independence", value: "100% Core Solar Fed" }
    ]
  },
  {
    id: "SYS-4.0",
    number: "4.0",
    title: "QUANTUM MEMBRANES",
    subtitle: "Acoustic Nanofiltration Matrix",
    desc: "Next-generation carbon-nanotube filters screening ions, heavy salts, and impurities via continuous high-frequency physical vibrations.",
    metrics: ["Desalination Flux x2.5", "Zero synthetic reject chemistry", "Modular cartridge grid"],
    details: "Our quantum R&D division has engineered layered carbon matrices vibrating at precise gigahertz frequencies. This excludes sodium, boron, and sulfates purely through mechanical alignment, conserving up to 45% more electrical energy than legacy reverse osmosis setups.",
    styleType: "cyber-blue", // Dark midnight navy, electric cyan, active particle arrays
    badge: "QU_FLUX // CORE SENSOR",
    schemaLabel: "GRAPHENE SELECTOR ARRAY",
    schematic: [
      { label: "CARBON NANOTUBE MESH", val: "99.98% ION SHIELD" },
      { label: "HIGH-FREQ TRANSDUCER", val: "42.5 kHz CONTINUOUS" },
      { label: "MEMBRANE MECHANICAL STRAIN", val: "0.04% // INSIGNIFICANT" },
      { label: "reject salt discharge", val: "0% TOXIC ADDED" }
    ],
    metricsList: [
      { label: "Salt Rejection Threshold", value: "99.98% Absolute" },
      { label: "Operational Hydro-Flux", value: "240 L / m² / hr / bar" },
      { label: "Energy Consumption Delta", value: "-45.2% vs Legacy RO" }
    ]
  }
];

export default function Solutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [activeTab, setActiveTab] = useState<number>(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(550);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Synchronize custom scroll height and binds listeners
  useEffect(() => {
    const container = cardContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollTop(container.scrollTop);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    setContainerHeight(container.offsetHeight);

    const observer = new ResizeObserver(() => {
      if (container) {
        setContainerHeight(container.offsetHeight);
      }
    });
    observer.observe(container);

    // Initial position trigger
    setScrollTop(container.scrollTop);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Update active tab on physical scroll position to synchronize right panel
  const handleScrollUpdate = () => {
    const container = cardContainerRef.current;
    if (!container || containerHeight === 0) return;

    const currentScroll = container.scrollTop;
    setScrollTop(currentScroll);

    const containerCenter = currentScroll + containerHeight / 2;
    let closestIdx = activeTab;
    let minDifference = Infinity;

    sectors.forEach((_, idx) => {
      const card = cardRefs.current[idx];
      if (card) {
        const cardCenter = card.offsetTop + card.offsetHeight / 2;
        const difference = Math.abs(cardCenter - containerCenter);
        if (difference < minDifference) {
          minDifference = difference;
          closestIdx = idx;
        }
      }
    });

    if (closestIdx !== activeTab) {
      setActiveTab(closestIdx);
    }
  };

  // Click card to scroll it smoothly to the center of the viewport
  const handleCardClick = (idx: number) => {
    setActiveTab(idx);
    const container = cardContainerRef.current;
    const card = cardRefs.current[idx];
    if (container && card) {
      const cardTop = card.offsetTop;
      const cardHeight = card.offsetHeight;
      const targetScroll = cardTop - (containerHeight / 2) + (cardHeight / 2);

      container.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="solutions" ref={containerRef} className="bg-black py-28 px-4 md:px-8 border-t border-neutral-900 scroll-mt-6 relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute inset-0 bg-[#0c0d12]/20 opacity-20 pointer-events-none" />
      <div className="noise-overlay absolute inset-0 opacity-[0.02] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Layout */}
        <div className="mb-16">
          <span className="text-[#DEDBC8]/50 text-[10px] sm:text-xs tracking-widest uppercase mb-4 block font-medium">
            Project Scopes ↴
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#E1E0CC] tracking-tight font-serif italic max-w-2xl leading-tight">
            Integrated engineering systems for critical ecosystems.
          </h2>
        </div>

        {/* Core Screen Split Grid */}
        {isMobile ? (
          /* Mobile Experience: Beautiful vertical accordion stack list avoiding any scrolling capture conflicts */
          <div className="space-y-6">
            {sectors.map((sector, idx) => {
              const isActive = activeTab === idx;
              const isObsidian = sector.styleType === "obsidian";
              const isSolarRed = sector.styleType === "solar-red";
              const isAlabaster = sector.styleType === "alabaster";
              const isCyberBlue = sector.styleType === "cyber-blue";

              let bgClass = "";
              let borderClass = "";
              let textClass = "";
              let subtextClass = "";
              
              if (isObsidian) {
                bgClass = "bg-[#090a0c]";
                borderClass = isActive ? "border-[#DEDBC8]/60 shadow-[0_12px_40px_rgba(0,0,0,0.85)]" : "border-neutral-900";
                textClass = "text-white";
                subtextClass = "text-[#DEDBC8]/60";
              } else if (isSolarRed) {
                bgClass = "bg-[#DA3B26]";
                borderClass = isActive ? "border-[#FF6854] shadow-[0_12px_45px_rgba(218,59,38,0.35)]" : "border-[#B22312]";
                textClass = "text-white";
                subtextClass = "text-white/70";
              } else if (isAlabaster) {
                bgClass = "bg-[#DCD9C4]";
                borderClass = isActive ? "border-white shadow-[0_12px_40px_rgba(220,217,196,0.3)]" : "border-neutral-700/10";
                textClass = "text-neutral-900";
                subtextClass = "text-neutral-800/70";
              } else if (isCyberBlue) {
                bgClass = "bg-[#04060b]";
                borderClass = isActive ? "border-cyan-500/60 shadow-[0_12px_40px_rgba(6,182,212,0.25)]" : "border-neutral-950";
                textClass = "text-white";
                subtextClass = "text-cyan-400/60";
              }

              return (
                <div
                  key={sector.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full rounded-3xl p-5 sm:p-6 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${bgClass} ${borderClass} cursor-pointer`}
                >
                  {/* Decorative backgrounds */}
                  {isObsidian && (
                    <div className="absolute right-[-10px] top-4 w-28 h-28 opacity-[0.06] text-[#DEDBC8] pointer-events-none">
                      <svg className="w-full h-full animate-[spin_30s_linear_infinite]" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3, 3" />
                        <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="15, 8" />
                        <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      </svg>
                    </div>
                  )}
                  {isSolarRed && (
                    <div className="absolute right-0 top-0 bottom-0 w-24 opacity-10 pointer-events-none">
                      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                        <path d="M0,0 L100,100 M20,-30 L120,70 M-20,30 L80,130" strokeWidth="0.8" />
                      </svg>
                    </div>
                  )}
                  {isAlabaster && (
                    <div className="absolute right-2 top-10 w-24 h-24 opacity-[0.1] text-black pointer-events-none">
                      <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                        <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.8" />
                        <path d="M10,50 Q50,15 90,50 Q50,85 10,50 Z" strokeWidth="0.8" strokeDasharray="3, 3" />
                        <circle cx="50" cy="50" r="16" strokeWidth="1" />
                      </svg>
                    </div>
                  )}
                  {isCyberBlue && (
                    <div className="absolute right-0 top-6 w-28 h-28 opacity-[0.05] text-cyan-400 pointer-events-none">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <pattern id="m-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100" height="100" fill="url(#m-grid)" />
                      </svg>
                    </div>
                  )}

                  {/* Badges row */}
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-wider mb-2">
                    <span className={subtextClass}>{sector.badge}</span>
                    <span className={`font-semibold ${isSolarRed ? "text-white font-bold" : isAlabaster ? "text-neutral-900" : isCyberBlue ? "text-cyan-400 font-bold" : "text-amber-500 font-bold"}`}>
                      PHASE {sector.number}
                    </span>
                  </div>

                  {/* Title & subtitle */}
                  <div className="mb-3">
                    <span className={`text-[9px] font-mono ${isSolarRed ? "text-white/60" : isAlabaster ? "text-neutral-800/60" : "text-neutral-500"} uppercase tracking-wider block mb-0.5`}>
                      {sector.subtitle}
                    </span>
                    <h3 className={`text-xl sm:text-2xl font-serif italic tracking-tight ${isAlabaster ? "text-neutral-950" : "text-white"}`}>
                      {sector.title}
                    </h3>
                  </div>

                  {/* Summary row if collapsed */}
                  {!isActive && (
                    <p className={`text-xs font-light line-clamp-1 opacity-70 mb-2 ${isAlabaster ? "text-neutral-800" : "text-neutral-400"}`}>
                      {sector.desc}
                    </p>
                  )}

                  {/* Collapsible Panel */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden space-y-5 text-left border-t pt-4"
                        style={{ borderTopColor: isSolarRed ? "rgba(255,255,255,0.15)" : isAlabaster ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.05)" }}
                      >
                        {/* Descriptive words */}
                        <p className={`text-xs sm:text-sm font-light leading-relaxed ${isAlabaster ? "text-neutral-800" : "text-neutral-300"}`}>
                          {sector.details}
                        </p>

                        {/* Kinetic Feed Screen */}
                        <div className={`rounded-xl p-3 border ${
                          isSolarRed 
                            ? "bg-[#121214] border-white/10" 
                            : isAlabaster 
                              ? "bg-[#ffffff]/50 border-neutral-300" 
                              : isCyberBlue 
                                ? "bg-cyan-950/20 border-cyan-500/10" 
                                : "bg-[#090a0c] border-neutral-900"
                        }`}>
                          <div className="flex items-center justify-between mb-2 pb-1 border-b" style={{ borderBottomColor: isAlabaster ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)" }}>
                            <span className={`text-[8.5px] font-mono uppercase tracking-widest ${isAlabaster ? "text-neutral-500" : "text-neutral-400"}`}>
                              SYSTEM_DYNAMICS_MONITOR
                            </span>
                            <span className={`text-[8px] font-mono ${isSolarRed ? "text-[#DA3B26]" : isAlabaster ? "text-neutral-800" : isCyberBlue ? "text-cyan-400" : "text-amber-500"}`}>
                              LIVE_FEED
                            </span>
                          </div>

                          <div className="h-10 flex items-center justify-center relative w-full overflow-hidden">
                            {idx === 0 && (
                              <div className="w-full flex items-end justify-between h-8 px-1 gap-[2px]">
                                {[...Array(16)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="bg-sky-500/30 w-full rounded-t"
                                    animate={{ height: ["20%", "80%", "40%", "95%", "20%"] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.06, ease: "easeInOut" }}
                                  />
                                ))}
                              </div>
                            )}

                            {idx === 1 && (
                              <div className="w-full flex items-center justify-around h-8 relative">
                                <div className="absolute inset-x-2 h-[1px] bg-red-650/20" />
                                {[...Array(4)].map((_, i) => (
                                  <motion.div
                                    key={i}
                                    className="w-3 h-3 rounded-full border border-red-500/20 bg-red-500/10 flex items-center justify-center relative z-10"
                                    animate={{ scale: [1, 1.3, 0.9, 1.1, 1], opacity: [0.4, 0.8, 0.4, 0.8, 0.4] }}
                                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.25 }}
                                  >
                                    <span className="w-1 h-1 rounded-full bg-[#DA3B26]" />
                                  </motion.div>
                                ))}
                              </div>
                            )}

                            {idx === 2 && (
                              <div className="flex items-center justify-center gap-3 h-8">
                                <motion.div
                                  className="w-6 h-6 rounded-full border border-neutral-600/35 flex items-center justify-center text-neutral-800"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                >
                                  <Trees className="w-3.5 h-3.5" />
                                </motion.div>
                                <span className={`text-[9px] font-mono font-semibold uppercase ${isAlabaster ? "text-neutral-800" : "text-neutral-300"}`}>Restoration: Active</span>
                              </div>
                            )}

                            {idx === 3 && (
                              <div className="w-full flex justify-between px-2 items-center h-8 font-mono text-[9px] text-cyan-400/80">
                                <span>DESAL FLUX: 240/hr</span>
                                <div className="flex gap-[3px] h-4 items-center">
                                  {[...Array(8)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      className="w-[1.5px] h-full bg-cyan-400"
                                      animate={{ scaleY: [0.1, 1, 0.2, 0.8, 0.1] }}
                                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.05 }}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Telemetry diagnostics indices table */}
                        <div className={`rounded-xl border border-white/5 overflow-hidden text-left bg-black/35 ${isAlabaster ? "border-neutral-200 bg-[#ffffff]/30" : ""}`}>
                          <div className={`px-3 py-1 border-b border-white/5 flex items-center justify-between text-[8px] font-mono ${isAlabaster ? "border-neutral-200 text-neutral-600" : "text-neutral-500"}`}>
                            <span>{sector.schemaLabel}</span>
                            <span>DIAG_READOUT</span>
                          </div>
                          <div className="divide-y divide-white/5" style={{ divideColor: isAlabaster ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)" }}>
                            {sector.schematic.map((sc, scIdx) => (
                              <div key={scIdx} className="p-2 flex items-center justify-between text-[10px] font-mono">
                                <span className={`text-left uppercase ${isAlabaster ? "text-neutral-500" : "text-neutral-400"}`}>{sc.label}</span>
                                <span className={`font-semibold ${isAlabaster ? "text-neutral-900" : "text-[#DEDBC8]"}`}>{sc.val}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Key efficiencies statistics items */}
                        <div className="grid grid-cols-1 gap-2">
                          {sector.metricsList.map((metric, mIdx) => (
                            <div key={mIdx} className={`rounded-xl p-3 border flex flex-col justify-between text-left ${
                              isSolarRed 
                                ? "bg-red-950/20 border-white/10" 
                                : isAlabaster 
                                  ? "bg-neutral-850/5 border-neutral-400/25" 
                                  : isCyberBlue 
                                    ? "bg-cyan-950/10 border-cyan-950" 
                                    : "bg-neutral-900/10 border-neutral-900/60"
                            }`}>
                              <span className={`text-[8.5px] font-mono tracking-widest uppercase mb-0.5 ${isAlabaster ? "text-neutral-500" : "text-neutral-400"}`}>
                                {metric.label}
                              </span>
                              <span className={`text-[10px] font-mono tracking-wider font-semibold ${isAlabaster ? "text-neutral-900" : "text-white"}`}>
                                ✓ {metric.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Direct Anchor blueprint button */}
                        <div className="pt-2 flex justify-end">
                          <a
                            href="#inquiries"
                            className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider ${isAlabaster ? "text-neutral-950 hover:text-black" : "text-[#DEDBC8] hover:text-white"}`}
                          >
                            GET BLUEPRINTS &rarr;
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Footer expand state instructions */}
                  {!isActive && (
                    <div className="flex justify-between items-center border-t border-white/5 pt-3 mt-1" style={{ borderTopColor: isSolarRed ? "rgba(255,255,255,0.1)" : isAlabaster ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)" }}>
                      <span className={`text-[9px] font-mono uppercase tracking-widest ${isAlabaster ? "text-neutral-600" : "text-neutral-500"}`}>TAP TO VIEW DETAILED DIAGNOSTICS</span>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isSolarRed ? "#ffffff" : isAlabaster ? "#1a1a1a" : isCyberBlue ? "#06b6d4" : "#f59e0b" }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Side: Curved 3D Cylinder Deck */}
          <div className="lg:col-span-6 xl:col-span-5 h-[620px] relative flex flex-col justify-center overflow-hidden">
            
            {/* Visual indicator lines on edge to accentuate curvature */}
            <div className="absolute left-1/2 -translate-x-[150px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-transparent via-neutral-900 to-transparent pointer-events-none" />
            
            {/* Gradient Mask mimicking atmospheric depth of the scrolling drum */}
            <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-20" />
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-20" />
            
            {/* Hidden Scrollbar scroll container with Perspective styling */}
            <div 
              ref={cardContainerRef}
              onScroll={handleScrollUpdate}
              data-lenis-prevent
              className="h-full overflow-y-auto scrollbar-none py-10 px-6 space-y-8 select-none relative scroll-smooth snap-y snap-mandatory"
              style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
            >
              {/* Spacer blocks on top and bottom so that we can center any card */}
              <div className="h-[180px] shrink-0 pointer-events-none flex-none snap-start" />
              
              {sectors.map((sector, idx) => {
                const cardRef = (el: HTMLDivElement | null) => { cardRefs.current[idx] = el; };
                
                // Real-time calculation of curved translation, tilt, scale, and z-indexing
                let transformStyle: React.CSSProperties = {
                  transform: "perspective(1200px) rotateZ(-12deg)",
                  opacity: 1,
                  zIndex: 10 + idx
                };

                const cardEl = cardRefs.current[idx];
                if (cardEl && cardContainerRef.current) {
                  const cardTop = cardEl.offsetTop;
                  const cardHeight = cardEl.offsetHeight;
                  const containerCenter = scrollTop + containerHeight / 2;
                  const cardCenter = cardTop + cardHeight / 2;
                  
                  const deltaY = cardCenter - containerCenter;
                  const ratio = deltaY / (containerHeight / 2); // Ranges roughly -1.5 ~ +1.5
                  
                  const rotateX = ratio * 24; // Cylinder curl back or forward
                  const rotateY = ratio * -6; // Slight yaw rotate
                  const rotateZ = -12 + (ratio * 1.5); // Base -12deg tilt wiggling slightly
                  const scale = 1 - Math.min(0.12, Math.abs(ratio) * 0.08); // Focus scales inside center
                  const translateY = ratio * 14; 
                  const translateZ = -Math.abs(ratio) * 70; // Ambient depth mapping
                  
                  const computedZ = 100 - Math.round(Math.abs(ratio) * 15);
                  const computedOpacity = 1 - Math.min(0.5, Math.abs(ratio) * 0.35);

                  transformStyle = {
                    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale}) translateY(${translateY}px) translateZ(${translateZ}px)`,
                    opacity: computedOpacity,
                    zIndex: computedZ
                  };
                }

                const isActive = activeTab === idx;

                return (
                  <div
                    key={sector.id}
                    ref={cardRef}
                    onClick={() => handleCardClick(idx)}
                    className="snap-center transform-gpu transition-all duration-300 relative"
                    style={transformStyle}
                  >
                    {/* Different custom textures / character based on sector styleType */}
                    {sector.styleType === "obsidian" && (
                      <div className={`w-[290px] sm:w-[330px] h-[330px] rounded-3xl p-6 bg-[#090a0c] border relative flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 hover:border-[#DEDBC8]/40 ${
                        isActive ? "border-[#DEDBC8]/60 shadow-[0_12px_40px_rgba(0,0,0,0.85)]" : "border-neutral-900"
                      }`}>
                        {/* Interactive rotating mechanical log disk */}
                        <div className="absolute right-[-20px] top-4 w-32 h-32 opacity-[0.08] text-[#DEDBC8] pointer-events-none">
                          <svg className="w-full h-full animate-[spin_25s_linear_infinite]" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3, 3" />
                            <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="15, 8" />
                            <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4, 4" />
                            <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4, 4" />
                          </svg>
                        </div>

                        {/* Top row diagnostic tag */}
                        <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#DEDBC8]/50 uppercase">
                          <span>{sector.badge}</span>
                          <span className="flex items-center gap-1.5 text-amber-500/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                            SCADA_LIVE_FLOW
                          </span>
                        </div>

                        {/* Large diagnostic graphic */}
                        <div className="my-2 relative">
                          <div className="text-[100px] font-light leading-none font-sans text-neutral-850 select-none tracking-tighter opacity-15">
                            {sector.number}
                          </div>
                          <div className="absolute left-0 bottom-4">
                            <span className="text-[9px] font-mono text-amber-500/60 block tracking-widest uppercase">SECTION SPECIFICATION</span>
                            <h3 className="text-xl font-semibold tracking-wider text-neutral-200 mt-0.5 uppercase">
                              {sector.title}
                            </h3>
                          </div>
                        </div>

                        {/* Bottom specifications index */}
                        <div className="border-t border-neutral-900/60 pt-4 flex justify-between items-end">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-neutral-500 block">THROUGHPUT RATIO</span>
                            <span className="text-xs text-neutral-400 font-light">Municipal Intake Conduits</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-neutral-900 text-[#DEDBC8] border border-neutral-850">
                            <Database className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    )}

                    {sector.styleType === "solar-red" && (
                      <div className={`w-[290px] sm:w-[330px] h-[330px] rounded-3xl p-6 bg-[#DA3B26] border relative flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 ${
                        isActive ? "border-[#FF6854] shadow-[0_12px_45px_rgba(218,59,38,0.35)]" : "border-[#B22312]"
                      }`}>
                        
                        {/* Diagonal mechanical vector line */}
                        <div className="absolute right-0 top-0 bottom-0 w-32 opacity-15 pointer-events-none">
                          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                            <path d="M0,0 L100,100 M20,-30 L120,70 M-20,30 L80,130" strokeWidth="0.8" />
                          </svg>
                        </div>

                        {/* Top layout parameters */}
                        <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#ffffff]/60 uppercase font-semibold">
                          <span>{sector.badge}</span>
                          <span className="text-black bg-[#ffffff]/80 px-2 py-0.5 rounded-full text-[8px] font-bold">
                            ZLD_HEAVY
                          </span>
                        </div>

                        {/* Block processes table mimicking the screenshot card graphic */}
                        <div className="bg-[#121214] rounded-2xl p-4 my-2 border border-white/10 relative z-10 shadow-lg">
                          <span className="text-[8px] font-mono text-[#ffffff]/40 block mb-1">LOOP SEQUENCINGS / SEC-2</span>
                          <div className="space-y-1.5 font-mono text-[9px] text-[#ffffff]/80">
                            <div className="flex justify-between items-center border-b border-white/[0.04] pb-1">
                              <span>01 IONIC CHAMBER FLUX</span>
                              <span className="text-[#DA3B26] font-bold">99.5%</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/[0.04] pb-1">
                              <span>02 ELECTRO-COAG CELL</span>
                              <span className="text-[#DA3B26]">94.2 V</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>03 CATALYST RECOVERY</span>
                              <span className="text-[#DA3B26]">ACTIVE</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom details label */}
                        <div className="border-t border-[#ffffff]/20 pt-4 flex justify-between items-end">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-[#ffffff]/60 block uppercase">SYSTEM PRESSURE</span>
                            <span className="text-xs text-[#ffffff] font-semibold tracking-wide uppercase">SYS-2.0 CORE UNIT</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-[#121214] text-[#DA3B26] border border-white/15">
                            <Flame className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    )}

                    {sector.styleType === "alabaster" && (
                      <div className={`w-[290px] sm:w-[330px] h-[330px] rounded-3xl p-6 bg-[#DCD9C4] border relative flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 hover:border-[#ffffff]/90 ${
                        isActive ? "border-white shadow-[0_12px_40px_rgba(220,217,196,0.3)] text-black" : "border-neutral-700/10 text-neutral-900"
                      }`}>
                        
                        {/* Micro bioorganic structural drawing */}
                        <div className="absolute right-2 top-10 w-28 h-28 opacity-[0.14] text-black pointer-events-none">
                          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                            <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.8" />
                            <path d="M10,50 Q50,15 90,50 Q50,85 10,50 Z" strokeWidth="0.8" strokeDasharray="3, 3" />
                            <circle cx="50" cy="50" r="16" strokeWidth="1" />
                            <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.8" />
                          </svg>
                        </div>

                        {/* Top tag details */}
                        <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-neutral-800/60 uppercase font-bold">
                          <span>{sector.badge}</span>
                          <span className="text-white bg-neutral-900 px-2 py-0.5 rounded-full text-[8.5px] font-medium tracking-wide">
                            ECO_COMPLIANT
                          </span>
                        </div>

                        {/* Bio-stable microchart layout */}
                        <div className="my-2">
                          <span className="text-[9px] font-mono text-neutral-800/50 block tracking-widest uppercase">ECOLOGICAL RESTORATION</span>
                          <h3 className="text-xl font-semibold tracking-wider font-sans text-neutral-950 uppercase mt-0.5">
                            {sector.title}
                          </h3>
                          <div className="flex gap-2 mt-4">
                            <span className="text-[8.5px] font-mono border border-neutral-800/20 px-2 py-1 rounded bg-[#ffffff]/40 text-neutral-900">
                              DO_BOOST: +140%
                            </span>
                            <span className="text-[8.5px] font-mono border border-neutral-800/20 px-2 py-1 rounded bg-[#ffffff]/40 text-neutral-900">
                              CHEM: 0% ADDED
                            </span>
                          </div>
                        </div>

                        {/* Bottom layout elements */}
                        <div className="border-t border-neutral-800/20 pt-4 flex justify-between items-end">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-neutral-800/60 block uppercase">AUTONOMOUS RUN</span>
                            <span className="text-xs text-neutral-950 font-bold tracking-wide">SYS-3.0 BIOTA POD</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-[#ffffff]/80 text-[#1e3f22] border border-neutral-800/10">
                            <Trees className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    )}

                    {sector.styleType === "cyber-blue" && (
                      <div className={`w-[290px] sm:w-[330px] h-[330px] rounded-3xl p-6 bg-[#04060b] border relative flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 hover:border-cyan-500/40 ${
                        isActive ? "border-cyan-500/60 shadow-[0_12px_40px_rgba(6,182,212,0.25)]" : "border-neutral-950"
                      }`}>
                        
                        {/* High density electric carbon matrix grid */}
                        <div className="absolute right-0 top-6 w-36 h-36 opacity-[0.06] text-cyan-400 pointer-events-none">
                          <svg className="w-full h-full" viewBox="0 0 100 100">
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            </pattern>
                            <rect width="100" height="100" fill="url(#grid)" />
                            <circle cx="40" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5, 3" />
                          </svg>
                        </div>

                        {/* Dynamic parameters tag */}
                        <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-cyan-400/50 uppercase">
                          <span>{sector.badge}</span>
                          <span className="flex items-center gap-1 text-[8.5px] text-cyan-400 font-bold bg-cyan-950/50 px-2 py-0.5 rounded-full border border-cyan-500/15">
                            QUANTUM_MATRIX
                          </span>
                        </div>

                        {/* Mid core readout */}
                        <div className="my-2 relative">
                          <div className="text-[100px] font-light leading-none font-sans text-cyan-950 select-none tracking-tighter opacity-15">
                            {sector.number}
                          </div>
                          <div className="absolute left-0 bottom-4">
                            <span className="text-[9px] font-mono text-cyan-400/50 block tracking-widest uppercase">MEMBRANE REACTION CELL</span>
                            <h3 className="text-xl font-bold tracking-wider text-white mt-0.5 uppercase">
                              {sector.title}
                            </h3>
                          </div>
                        </div>

                        {/* Bottom alignment parameters */}
                        <div className="border-t border-cyan-950 pt-4 flex justify-between items-end">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono text-cyan-400/40 block">ION BARRIER SYSTEM</span>
                            <span className="text-xs text-neutral-400 font-light">Layered Nanotube Matrix</span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-cyan-950/20 text-cyan-400 border border-cyan-500/20 shadow-md">
                            <Cpu className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                );
              })}

              <div className="h-[180px] shrink-0 pointer-events-none flex-none" />
            </div>
          </div>

          {/* Right Side: Showcase Panel Console Sheet */}
          <div className="lg:col-span-6 xl:col-span-7 h-[600px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="bg-[#0b0c10]/40 border border-neutral-900/90 rounded-3xl p-6 sm:p-10 md:p-12 h-full flex flex-col justify-between backdrop-blur-md shadow-2xl overflow-y-auto overflow-x-hidden scrollbar-thin relative group/panel"
                initial={{ opacity: 0, x: 25, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -25, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                
                {/* Embedded technical corner crosses mimicking premium blueprint panels */}
                <div className="absolute top-4 left-4 w-2.5 h-2.5 border-t border-l border-neutral-800" />
                <div className="absolute top-4 right-4 w-2.5 h-2.5 border-t border-r border-neutral-800" />
                <div className="absolute bottom-4 left-4 w-2.5 h-2.5 border-b border-l border-neutral-800" />
                <div className="absolute bottom-4 right-4 w-2.5 h-2.5 border-b border-r border-neutral-850" />

                {/* Top Section */}
                <div className="space-y-6">
                  
                  {/* Console code pill */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-900/80">
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-mono text-[#DEDBC8] tracking-widest uppercase bg-neutral-900/60 px-3.5 py-1.5 rounded-full border border-neutral-850">
                        {sectors[activeTab].badge}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#DEDBC8]/40 uppercase tracking-widest">
                      ID // {sectors[activeTab].id}
                    </span>
                  </div>

                  {/* Title & subtitle */}
                  <div>
                    <span className="text-[10px] font-mono text-[#DEDBC8]/50 uppercase tracking-widest block mb-1">
                      {sectors[activeTab].subtitle}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-light text-[#E1E0CC] font-serif italic tracking-tight leading-tight">
                      {sectors[activeTab].title}
                    </h3>
                  </div>

                  {/* Mechanical description details */}
                  <p className="text-neutral-400 text-xs sm:text-sm md:text-base font-light leading-relaxed">
                    {sectors[activeTab].details}
                  </p>

                  {/* Dynamic interactive animation visualizer block */}
                  <div className="bg-neutral-950/60 border border-neutral-900/80 rounded-2xl p-4 flex flex-col justify-between overflow-hidden relative">
                    <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none" />
                    
                    <div className="flex items-center justify-between mb-4 border-b border-neutral-900/40 pb-2">
                      <span className="text-[9px] font-mono text-[#DEDBC8]/50 tracking-wider uppercase flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 text-neutral-400 animate-pulse" />
                        SYSTEM_DYNAMICS_MONITOR
                      </span>
                      <span className="text-[8.5px] font-mono text-emerald-400/80 uppercase">
                        Continuous Feed
                      </span>
                    </div>

                    {/* Highly responsive custom fluid kinetic animation representing mechanical states */}
                    <div className="h-16 flex items-center justify-center relative w-full pt-1">
                      {activeTab === 0 && (
                        /* Municipal: smooth flowing blue-ish wave */
                        <div className="w-full flex items-end justify-between h-10 px-2 gap-[3px]">
                          {[...Array(24)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="bg-sky-500/30 w-full rounded-t"
                              animate={{ height: ["20%", "75%", "35%", "90%", "20%"] }}
                              transition={{
                                duration: 2.2,
                                repeat: Infinity,
                                delay: i * 0.08,
                                ease: "easeInOut"
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {activeTab === 1 && (
                        /* Heavy ZLD: high-pulse intense sparks and heavy compression bars */
                        <div className="w-full flex items-center justify-around h-12 relative">
                          <div className="absolute inset-x-4 h-[1px] bg-red-650/40" />
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-4 h-4 rounded-full border border-red-500/20 bg-red-500/10 flex items-center justify-center relative z-10"
                              animate={{ scale: [1, 1.4, 0.9, 1.1, 1], opacity: [0.3, 0.9, 0.4, 0.8, 0.3] }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.25,
                                ease: "circIn"
                              }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#DA3B26]" />
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {activeTab === 2 && (
                        /* Ecological: smooth breathing organic loop scale */
                        <div className="flex items-center justify-center gap-6 h-12">
                          <motion.div
                            className="w-12 h-12 rounded-full border border-[#DCD9C4]/30 flex items-center justify-center text-[#DCD9C4]/60"
                            animate={{ scale: [1, 1.18, 1], rotate: [0, 45, 90, 135, 180] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Trees className="w-5 h-5" />
                          </motion.div>
                          <div className="flex flex-col text-left">
                            <span className="text-[10px] font-mono text-[#DCD9C4] font-semibold">ECO_BIOME_POD STABLE</span>
                            <span className="text-[8.5px] font-mono text-neutral-500 tracking-wider">NITROGEN BALANCE RATIO // 1.04</span>
                          </div>
                        </div>
                      )}

                      {activeTab === 3 && (
                        /* Quantum flux: floating chemical particles and fast cyber arrays */
                        <div className="w-full flex justify-between px-6 items-center h-10 font-mono text-[10px] text-cyan-400/80">
                          <div className="flex flex-col items-start gap-1">
                            <span>Na+ REJECT: 0%</span>
                            <span>H2O FLUX: 240/hr</span>
                          </div>
                          <div className="flex gap-[4px] h-6 items-center">
                            {[...Array(12)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="w-[1.5px] h-full bg-cyan-400"
                                animate={{ scaleY: [0.1, 1, 0.2, 0.8, 0.1] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
                              />
                            ))}
                          </div>
                          <span>ACOUSTIC: 42.5k Hz</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* System operational schematic table */}
                  <div className="rounded-2xl border border-neutral-900/60 overflow-hidden bg-black/40">
                    <div className="bg-neutral-900/50 px-4 py-2 border-b border-neutral-900/60 flex items-center justify-between">
                      <span className="text-[9px] font-mono text-[#DEDBC8]/50 uppercase tracking-widest">
                        {sectors[activeTab].schemaLabel}
                      </span>
                      <span className="text-[8px] font-mono text-neutral-500 uppercase">
                        REALTIME TELEMETRY DIAGNOSTIC
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-900/60">
                      {sectors[activeTab].schematic.map((sc, scIdx) => (
                        <div key={scIdx} className="p-3.5 flex items-center justify-between text-[11px] font-mono">
                          <span className="text-neutral-500 text-left uppercase">{sc.label}</span>
                          <span className="text-[#DEDBC8]/90 font-semibold">{sc.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Bottom Core efficiencies specifications rows */}
                <div className="border-t border-neutral-900/80 pt-6 mt-8">
                  <span className="text-[#DEDBC8]/50 text-[10px] font-sans font-bold tracking-widest uppercase block mb-3.5 text-left">
                    Empirical Efficiencies Achieved &mdash; Key Indices
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {sectors[activeTab].metricsList.map((metric, mIdx) => (
                      <div key={mIdx} className="bg-neutral-900/20 rounded-xl p-4 border border-neutral-900/60 hover:border-neutral-850/80 transition-colors flex flex-col justify-between text-left">
                        <span className="text-neutral-500 text-[9px] font-mono tracking-widest uppercase mb-1">
                          {metric.label}
                        </span>
                        <span className="text-[#DEDBC8] text-[11px] font-mono tracking-wider font-semibold">
                          ✓ {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      )}

      </div>
    </section>
  );
}
