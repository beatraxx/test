import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, ShieldCheck, Cpu, ArrowUpRight, ChevronRight, Eye, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const scenes = [
  {
    tag: "01 // ECOSYSTEM OVERVIEW",
    title: "ONE PLATFORM. THE ENTIRE ECOSYSTEM.",
    description: "Centralized visibility connecting builders, developers, contractors, and brokers in one digital canvas.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85",
    metricTitle: "CONNECTED ENTITIES",
    metricVal: "100% UNIFIED",
    cameraScale: 1,
    cameraX: 0,
    cameraY: 0
  },
  {
    tag: "02 // CONTROL & ORCHESTRATION",
    title: "AUTHORITY FOLLOWS THE JOURNEY.",
    description: "Granular role-based permissions, automated lead distribution, and real-time construction milestones.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85",
    metricTitle: "PIPELINE VELOCITY",
    metricVal: "+42% CONVERSION",
    cameraScale: 1.35,
    cameraX: -4,
    cameraY: -8
  },
  {
    tag: "03 // CLIENT IMMERSION",
    title: "THE EXPERIENCE WAS DESIGNED FIRST.",
    description: "Interactive 3D tours, private customer communication, and intelligent AI-powered inquiries.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=85",
    metricTitle: "AI RESPONSE LATENCY",
    metricVal: "< 240 MS",
    cameraScale: 1.65,
    cameraX: 6,
    cameraY: -12
  },
  {
    tag: "04 // ARCHITECTURAL TRUTH",
    title: "SINGLE SOURCE OF LIFECYCLE TRUTH.",
    description: "From foundation laying and material logistics to final escrow booking and asset handover.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85",
    metricTitle: "LIFECYCLE COVERAGE",
    metricVal: "END-TO-END",
    cameraScale: 1.1,
    cameraX: 0,
    cameraY: 0
  }
];

export default function EstateOSScroller() {
  const containerRef = useRef(null);
  const slidesRef = useRef([]);
  const textBlocksRef = useRef([]);
  const pathRef = useRef(null);
  const [activeMode, setActiveMode] = useState("DEVELOPER");
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalSteps = scenes.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalSteps * 100}%`,
          pin: true,
          scrub: 1.2,
          onUpdate: (self) => {
            const step = Math.min(
              Math.floor(self.progress * totalSteps),
              totalSteps - 1
            );
            setActiveStep(step);
          }
        }
      });

      // Animate line path progression along with scroll
      if (pathRef.current) {
        tl.to(pathRef.current, { strokeDashoffset: 0, ease: "none" }, 0);
      }

      // Chain camera shifts and text crossfades
      scenes.forEach((scene, i) => {
        if (i > 0) {
          const stepTime = i;

          // Crossfade images with perspective zooming
          tl.to(slidesRef.current[i], {
            opacity: 1,
            scale: 1,
            ease: "power2.inOut",
            duration: 1
          }, stepTime)
          .to(slidesRef.current[i - 1], {
            opacity: 0,
            scale: scenes[i].cameraScale,
            xPercent: scenes[i].cameraX,
            yPercent: scenes[i].cameraY,
            ease: "power2.inOut",
            duration: 1
          }, stepTime);

          // Animate typography
          tl.to(textBlocksRef.current[i - 1], {
            opacity: 0,
            y: -30,
            duration: 0.5,
            ease: "power2.in"
          }, stepTime)
          .fromTo(textBlocksRef.current[i],
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
            stepTime + 0.3
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#0b0c0e] text-[#f2ede4] font-sans antialiased selection:bg-[#dfc08a]/20">
      {/* 1. Luxury Floating Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-14 py-6 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
        <div className="flex items-center gap-3">
          <span className="font-serif tracking-[0.28em] text-lg font-light text-white uppercase">
            Estate<span className="text-[#dfc08a] font-normal">OS</span>
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase tracking-[0.25em] text-[#dfc08a]/70 px-2 py-0.5 border border-[#dfc08a]/30 rounded">
            v1.1 Core
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-10 text-[11px] tracking-[0.25em] uppercase text-zinc-300">
          <a href="#ecosystem" className="hover:text-[#dfc08a] transition-colors">Ecosystem</a>
          <a href="#authority" className="hover:text-[#dfc08a] transition-colors">Authority</a>
          <a href="#brokerage" className="hover:text-[#dfc08a] transition-colors">Brokerage</a>
          <a href="#intelligence" className="hover:text-[#dfc08a] transition-colors">AI Engine</a>
        </nav>

        <button className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase border border-[#dfc08a]/50 text-[#dfc08a] hover:bg-[#dfc08a] hover:text-black transition-all px-5 py-2.5 rounded-full">
          <span>Book Private Demo</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* 2. Pinned 3D Scrollytelling Viewport */}
      <div ref={containerRef} className="h-screen w-full relative overflow-hidden flex items-center justify-center">
        {/* Visual Scene Canvas Layers */}
        {scenes.map((scene, idx) => (
          <div
            key={idx}
            ref={(el) => (slidesRef.current[idx] = el)}
            className="absolute inset-0 w-full h-full overflow-hidden will-change-transform"
            style={{
              opacity: idx === 0 ? 1 : 0,
              zIndex: 1,
            }}
          >
            {/* Cinematic High-Res Architectural Imagery */}
            <img
              src={scene.image}
              alt={scene.title}
              className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-[1.12]"
            />

            {/* Luxury Vignettes and Ambient Lighting */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-[#0b0c0e]/40 to-[#0b0c0e]/80" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0b0c0e]/30 to-[#0b0c0e]/95 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(#dfc08a_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.05] pointer-events-none" />
          </div>
        ))}

        {/* Ambient SVG Progression Path */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-35"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d="M 120,780 C 420,720 320,280 720,440 C 1120,600 1020,160 1340,120"
            fill="none"
            stroke="#dfc08a"
            strokeWidth="1.5"
            strokeDasharray="2000"
            strokeDashoffset="2000"
          />
        </svg>

        {/* Overlaid Scrollytelling Canvas Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-14 flex flex-col md:flex-row items-start md:items-end justify-between pointer-events-none">
          {/* Left Typography Block Stack */}
          <div className="relative w-full md:w-3/5 min-h-[360px] pointer-events-auto">
            {scenes.map((scene, idx) => (
              <div
                key={idx}
                ref={(el) => (textBlocksRef.current[idx] = el)}
                className="absolute inset-0 flex flex-col justify-end will-change-transform"
                style={{
                  opacity: idx === 0 ? 1 : 0,
                  transform: idx === 0 ? "translateY(0)" : "translateY(35px)",
                }}
              >
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#dfc08a] animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#dfc08a]">
                    {scene.tag}
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-[1.08] mb-5">
                  {scene.title}
                </h2>

                <p className="text-zinc-300/85 text-sm md:text-base leading-relaxed max-w-xl font-light">
                  {scene.description}
                </p>

                {/* Micro Actions */}
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#dfc08a] text-black font-medium text-xs tracking-wider uppercase hover:bg-white transition-all shadow-[0_0_24px_rgba(223,192,138,0.3)]">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Explore Layer</span>
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white/90 text-xs tracking-wider uppercase hover:border-[#dfc08a] hover:text-[#dfc08a] transition-all bg-black/40 backdrop-blur-sm">
                    <span>Telemetry Node</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Live Telemetry & Role Matrix */}
          <div className="mt-8 md:mt-0 w-full md:w-auto flex flex-col items-start md:items-end gap-5 pointer-events-auto">
            {/* Target Mode Switcher */}
            <div className="bg-black/60 backdrop-blur-md border border-white/10 p-1.5 rounded-2xl flex items-center gap-1 shadow-2xl">
              {["DEVELOPER", "BROKER", "CONTRACTOR", "BUYER"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setActiveMode(mode)}
                  className={`px-3.5 py-1.5 rounded-xl text-[10px] tracking-[0.2em] uppercase transition-all ${
                    activeMode === mode
                      ? "bg-[#dfc08a] text-black font-semibold shadow-md"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Live Dynamic Metric HUD */}
            <div className="bg-black/75 backdrop-blur-xl border border-[#dfc08a]/30 p-6 rounded-2xl w-full md:w-72 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-zinc-400 mb-2">
                <span>{scenes[activeStep]?.metricTitle}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="text-2xl font-serif text-[#dfc08a] font-normal tracking-wide">
                {scenes[activeStep]?.metricVal}
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3 h-3 text-[#dfc08a]" />
                  SYNC: {activeMode}
                </span>
                <span className="font-mono text-zinc-400">0{activeStep + 1} / 0{scenes.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Stepper Timeline (Right Edge) */}
        <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-4 pointer-events-auto">
          <span className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase [writing-mode:vertical-lr] mb-2">
            SEQUENCE
          </span>
          {scenes.map((_, idx) => (
            <div
              key={idx}
              className="group relative flex items-center cursor-pointer"
              onClick={() => {
                const totalHeight = containerRef.current
                  ? containerRef.current.offsetHeight * scenes.length
                  : window.innerHeight * scenes.length;
                const targetY = (idx / (scenes.length - 1)) * totalHeight;
                window.scrollTo({ top: targetY, behavior: 'smooth' });
              }}
            >
              <div
                className={`w-2 rounded-full transition-all duration-300 ${
                  activeStep === idx
                    ? "h-8 bg-[#dfc08a] shadow-[0_0_14px_#dfc08a]"
                    : "h-2 bg-white/20 hover:bg-white/50"
                }`}
              />
              <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[10px] tracking-widest text-[#dfc08a] whitespace-nowrap bg-black/80 px-2 py-0.5 rounded border border-white/10">
                SCENE 0{idx + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Ambient Telemetry Bar */}
        <div className="absolute bottom-6 left-0 w-full z-30 px-8 md:px-14 flex items-center justify-between text-[10px] tracking-[0.25em] text-zinc-500 uppercase pointer-events-none">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dfc08a]" />
              ESTATEOS CORE 1.1
            </span>
            <span className="hidden md:inline-block">NODE: CONNECTED</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-400">
            <span className="text-[#dfc08a]">SCROLL TO EXPLORE</span>
            <ChevronRight className="w-3 h-3 rotate-90 text-[#dfc08a]" />
          </div>
        </div>
      </div>

      {/* 3. Smooth Subsequent Ecosystem Section */}
      <section id="ecosystem" className="relative z-20 py-32 px-8 md:px-14 bg-[#0e1013] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#dfc08a] mb-3 block">
              ECOSYSTEM CAPABILITIES
            </span>
            <h3 className="font-serif text-3xl md:text-5xl text-white font-normal leading-tight">
              A single digital spine replacing dozens of disconnected software silos.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#dfc08a]/50 transition-all">
              <Layers className="w-6 h-6 text-[#dfc08a] mb-4" />
              <h4 className="font-serif text-xl text-white mb-2">Construction Pulse</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Live field milestone sync, subcontractor logistics, and automated escrow phase release triggers.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#dfc08a]/50 transition-all">
              <ShieldCheck className="w-6 h-6 text-[#dfc08a] mb-4" />
              <h4 className="font-serif text-xl text-white mb-2">Authority Matrix</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Deterministic permissions ensuring brokers, developers, and buyers see only authorized lifecycle views.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#dfc08a]/50 transition-all">
              <Cpu className="w-6 h-6 text-[#dfc08a] mb-4" />
              <h4 className="font-serif text-xl text-white mb-2">AI Brokerage Engine</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Sub-240ms automated inquiry parsing, qualification scoring, and direct agent matchmaking.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
