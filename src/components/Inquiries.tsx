import { useRef, useState, FormEvent } from 'react';
import { motion, useInView } from 'motion/react';
import { Send, FileText, CheckCircle2, ChevronDown } from 'lucide-react';

export default function Inquiries() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Stateful Form Handler
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sector: 'Municipal Plant Upgrade',
    capacity: '1M to 10M Liters / day',
    msg: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate high-fidelity api response
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1800);
  };

  return (
    <section id="inquiries" className="bg-black py-28 px-4 md:px-8 border-t border-neutral-900 scroll-mt-6 relative">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Left Column information */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-[#DEDBC8]/50 text-[10px] sm:text-xs tracking-widest uppercase mb-4 block font-medium">
              Consulting Portal
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-[#E1E0CC] font-serif italic tracking-tight leading-tight mb-6">
              Initiate a custom plant build proposal.
            </h2>
            <p className="text-neutral-400 font-light text-xs sm:text-sm md:text-base leading-relaxed mb-8">
              Prisma’s engineering team designs turnkey purification infrastructure for governments, industries, and cities. Submit your specifications to request a mechanical blueprint outline and initial capital expenditure estimation.
            </p>
 
            <div className="border-t border-neutral-900 pt-8 space-y-5">
              <div className="flex items-center gap-4 text-xs">
                <FileText className="w-5 h-5 text-[#DEDBC8]/70 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-[#E1E0CC] block">Preliminary Mechanical Review</span>
                  <span className="text-[#DEDBC8]/50 font-light">Delivered within 7 business days following submission</span>
                </div>
              </div>
            </div>
          </div>
 
          {/* Right Column Form */}
          <div className="lg:col-span-7">
            <motion.div 
              className="bg-[#121212]/30 border border-neutral-900/90 rounded-3xl p-8 sm:p-12 backdrop-blur-md relative shadow-sm"
              initial={{ scale: 0.98, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {success ? (
                <motion.div 
                  className="text-center py-12 flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-16 h-16 rounded-full bg-[#DEDBC8]/10 text-[#DEDBC8] border border-[#DEDBC8]/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-light text-[#E1E0CC] font-serif italic mb-3">
                    Specifications Received
                  </h3>
                  <p className="text-neutral-400 font-light text-sm max-w-sm mx-auto leading-relaxed mb-8">
                    An expert process control systems engineer from our Zürich team will email you at <strong className="text-[#DEDBC8] font-medium">{formData.email}</strong> to coordinate a screen sharing consultation.
                  </p>
                  <button 
                    onClick={() => {
                      setSuccess(false);
                      setFormData({ name: '', email: '', sector: 'Municipal Plant Upgrade', capacity: '1M to 10M Liters / day', msg: '' });
                    }}
                    className="text-[11px] font-sans font-bold tracking-widest uppercase bg-[#DEDBC8] hover:bg-white text-black px-6 py-2.5 rounded-full transition-all cursor-pointer shadow-md"
                  >
                    Send Another Specifications Sheet
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-neutral-400 text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
                        ORGANIZATION / CITY NAME
                      </label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="e.g. Zurich Water Dept" 
                        className="w-full bg-[#181818] border border-[#2c2c2c] rounded-xl text-xs sm:text-sm px-4 py-3 placeholder:text-neutral-600 text-white focus:outline-none focus:border-neutral-500 focus:bg-neutral-900/60 transition-colors shadow-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-neutral-400 text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
                        CONTACT PERSON EMAIL
                      </label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="e.g. administrator@zurich.ch" 
                        className="w-full bg-[#181818] border border-[#2c2c2c] rounded-xl text-xs sm:text-sm px-4 py-3 placeholder:text-neutral-600 text-white focus:outline-none focus:border-neutral-500 focus:bg-neutral-900/60 transition-colors shadow-xs"
                      />
                    </div>
                  </div>
 
                  {/* Operational Settings */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-neutral-400 text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
                        SYSTEM TYPE OR SECTOR
                      </label>
                      <div className="relative">
                        <select 
                          value={formData.sector}
                          onChange={(e) => setFormData({...formData, sector: e.target.value})}
                          className="w-full appearance-none bg-[#181818] border border-[#2c2c2c] rounded-xl text-xs sm:text-sm px-4 py-3 pr-10 text-white focus:outline-none focus:border-neutral-500 focus:bg-neutral-900/60 transition-colors shadow-xs"
                        >
                          <option className="bg-[#181818] text-white">Municipal Plant Upgrade</option>
                          <option className="bg-[#181818] text-white">Industrial ZLD Loop Integration</option>
                          <option className="bg-[#181818] text-white">Local Ecological Recovery Pod</option>
                          <option className="bg-[#181818] text-white">Custom Mechanical Engineering Consultation</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-neutral-400/85 absolute right-3.5 top-[14px] pointer-events-none" />
                      </div>
                    </div>
 
                    <div className="flex flex-col gap-2">
                      <label className="text-neutral-400 text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
                        ESTIMATED WATER CAPACITY
                      </label>
                      <div className="relative">
                        <select 
                          value={formData.capacity}
                          onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                          className="w-full appearance-none bg-[#181818] border border-[#2c2c2c] rounded-xl text-xs sm:text-sm px-4 py-3 pr-10 text-white focus:outline-none focus:border-neutral-500 focus:bg-neutral-900/60 transition-colors shadow-xs"
                        >
                          <option className="bg-[#181818] text-white">Under 1,000,000 Liters / day</option>
                          <option className="bg-[#181818] text-white">1M to 10M Liters / day</option>
                          <option className="bg-[#181818] text-white">10M to 100M Liters / day</option>
                          <option className="bg-[#181818] text-white">Over 100,000,000 Liters / day</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-neutral-400/85 absolute right-3.5 top-[14px] pointer-events-none" />
                      </div>
                    </div>
                  </div>
 
                  {/* Message Detail Box */}
                  <div className="flex flex-col gap-2">
                    <label className="text-neutral-400 text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
                      PROJECT NARRATIVE & SPECIFICATIONS
                    </label>
                    <textarea 
                      rows={4}
                      value={formData.msg}
                      onChange={(e) => setFormData({...formData, msg: e.target.value})}
                      placeholder="Outline any special organic chemicals, discharge directives, or grid challenges..."
                      className="w-full bg-[#181818] border border-[#2c2c2c] rounded-xl text-xs sm:text-sm px-4 py-3 placeholder:text-neutral-600 text-white focus:outline-none focus:border-neutral-500 focus:bg-neutral-900/60 transition-colors resize-none shadow-xs"
                    />
                  </div>
 
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full group mt-4 flex items-center justify-center gap-3 bg-[#DEDBC8] hover:bg-white text-black font-semibold text-xs py-3.5 rounded-full tracking-widest uppercase transition-all duration-300 transform active:scale-[0.99] disabled:opacity-50 cursor-pointer shadow-lg"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        EVALUATING SCHEMATICS...
                      </span>
                    ) : (
                      <>
                        File Engineering Specs
                        <Send className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
 
      </div>
    </section>
  );
}
