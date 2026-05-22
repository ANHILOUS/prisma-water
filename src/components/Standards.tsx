import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Award, Microscope, HeartHandshake, ShieldAlert } from 'lucide-react';

export default function Standards() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const categories = [
    {
      title: "EPA Drinking Standards",
      desc: "Splash processes consistently exceed federal primary drinking water contaminant limits. We maintain zero-tolerance levels for volatile organic compounds and coliforms.",
      icon: Award,
      badge: "US-EPA Compliant"
    },
    {
      title: "Ultra-precise Lab SCADA",
      desc: "Our automated telemetry platforms utilize advanced spectral optical loops to perform molecular analysis and record ppm values once every 3.5 seconds.",
      icon: Microscope,
      badge: "Real-time Telemetry"
    },
    {
      title: "WHO Biological Safety",
      desc: "Integrating zero-chemical pathogen eradication grids allows us to safely hit the absolute pathogen sterilizing coefficient recommended by the World Health Organization.",
      icon: HeartHandshake,
      badge: "WHO Certified"
    },
    {
      title: "Sovereign Water Security",
      desc: "Engineered to withstand external mechanical shocks, seismic events, and grid disruptions, ensuring safety and uptime when critical regional crises emerge.",
      icon: ShieldAlert,
      badge: "Grade 5 Infrastructure"
    }
  ];

  return (
    <section id="standards" className="bg-black py-28 px-4 md:px-8 border-t border-neutral-900 scroll-mt-6 relative">
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-24">
          <span className="text-[#DEDBC8]/50 text-[10px] sm:text-xs tracking-widest uppercase mb-4 block font-medium">
            Quality Integrity
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#E1E0CC] font-serif italic tracking-tight mb-8">
            Empirical standards to protect national public health.
          </h2>
          <p className="text-neutral-400 font-light text-sm sm:text-base leading-relaxed">
            Our treatment structures do not just clean water; we provide bulletproof physical systems certified by international regulatory boards. From localized utility pods to heavy-industry custom loops, we construct the highest density of security into every facility.
          </p>
        </div>

        {/* Categories Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-16">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={idx}
                className="flex items-start gap-5 group"
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
                transition={{ delay: idx * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Micro Icon Container */}
                <div className="p-3.5 rounded-xl border border-neutral-800 bg-[#121212] text-[#DEDBC8] group-hover:bg-[#DEDBC8] group-hover:text-black group-hover:border-[#DEDBC8] transition-all duration-300 flex-shrink-0 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2.5">
                    <h3 className="font-semibold text-[#E1E0CC] text-base md:text-lg">
                      {cat.title}
                    </h3>
                    <span className="text-[9px] font-mono tracking-wider font-semibold uppercase px-2 py-0.5 rounded-full border border-neutral-850 text-neutral-400 bg-neutral-900/40 shadow-xs">
                      {cat.badge}
                    </span>
                  </div>
                  <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Elegant visual quote strip */}
        <div className="mt-28 p-8 md:p-12 rounded-3xl border border-neutral-900 bg-[#121212]/30 backdrop-blur-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="max-w-2xl text-center md:text-left">
            <span className="text-[9px] font-mono text-[#DEDBC8]/50 tracking-widest uppercase mb-2 block font-bold">EMERGENCY SCADA LINK</span>
            <p className="text-[#E1E0CC]/85 font-light text-xs sm:text-sm leading-relaxed">
              &ldquo;All active Splash plants stream mechanical operation stats over secure satellite backhaul directly to sovereign state dashboards, satisfying ISO 27001 cybersecurity frameworks.&rdquo;
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
