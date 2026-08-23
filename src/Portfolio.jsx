import React, { useState, useEffect, useRef, useCallback } from "react";
import { Github, Linkedin, Instagram, Mail, ExternalLink, ArrowUpRight, ArrowDown, MessageCircle, Download, Menu, X, Award } from "lucide-react";

const CERTIFICATIONS = [
  {
    title: "The Complete Full-Stack Web Development Bootcamp",
    issuer: "Udemy — Dr. Angela Yu",
    meta: "62 hours · Aug 2026",
    link: "https://www.udemy.com/certificate/UC-d5ffbf18-45c9-4296-85ae-f735ab6d1437/",
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic Education",
    meta: "May 2026",
    link: "https://verify.skilljar.com/c/75u2sbswdk97",
  },
];

const ROLES = ["Full-Stack Developer", "AI / ML Engineer", "Computer Vision Builder", "GenAI Tinkerer"];

const PROJECTS = [
  {
    title: "SecureVault",
    desc: "A production-grade desktop security app combining face-recognition auth with liveness detection and AES file encryption. Vault keys are session-bound and never touch disk.",
    tags: ["Python", "PyQt5", "face_recognition", "dlib", "SQLite"],
    link: "https://github.com/ankit-k26/SecureVault",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Sign Language → Speech",
    desc: "Real-time pipeline classifying hand gestures via webcam with an LSTM model, then speaking them as natural English sentences.",
    tags: ["MediaPipe", "TensorFlow", "LangChain", "PyQt5"],
    link: "https://github.com/ankit-k26?tab=repositories",
    accent: "from-cyan-400 to-blue-500",
  },
  {
    title: "Stacks — Full-Stack RAG Chatbot",
    desc: "A full-stack retrieval-augmented generation chatbot built end-to-end solo, with a React/Vite frontend and an Express/Node.js backend. Ollama-hosted Gemma handles generation while Qwen3-Embedding powers semantic search over Qdrant-stored vectors.",
    tags: ["React", "Vite", "Express.js", "Node.js", "MongoDB", "Qdrant", "Ollama"],
    link: "https://github.com/ankit-k26?tab=repositories",
    accent: "from-teal-300 to-cyan-500",
  },
  {
    title: "Hand Gesture Mouse Controller",
    desc: "Full mouse control via hand gestures over webcam — palm to move, pinch to click, peace sign to right-click. No extra hardware.",
    tags: ["MediaPipe", "TensorFlow", "PyAutoGUI"],
    link: "https://github.com/ankit-k26/HandGestureSystemControl",
    accent: "from-amber-400 to-orange-500",
  },
  {
    title: "Face Recognition Security System",
    desc: "Real-time face-recognition access control using OpenCV's LBPH algorithm — live enrollment, confidence scoring, access logs.",
    tags: ["Python", "OpenCV", "Tkinter"],
    link: "https://github.com/ankit-k26/FaceRecognitionSystem",
    accent: "from-rose-400 to-pink-500",
  },
  {
    title: "VoiceFlow — AI Voice Assistant",
    desc: "A local, on-device voice assistant with a tool-calling agent loop that dispatches real system actions, entirely offline.",
    tags: ["LangChain", "Ollama", "SpeechRecognition"],
    link: "https://github.com/ankit-k26/VoiceAssistant",
    accent: "from-indigo-400 to-violet-500",
  },
];

const MINOR_PROJECTS = [
  { title: "Crossword Puzzle Game", tags: ["C", "GTK4"], link: "https://github.com/ankit-k26?tab=repositories" },
  { title: "Sudoku Game", tags: ["HTML", "CSS", "JS"], link: "https://github.com/ankit-k26?tab=repositories" },
  { title: "Custom New Tab Page", tags: ["HTML", "CSS", "JS"], link: "https://github.com/ankit-k26?tab=repositories" },
];

const STACK = [
  "Python", "JavaScript", "C", "React.js", "Node.js", "Express.js",
  "MongoDB", "OpenCV", "TensorFlow", "MediaPipe", "LangChain", "Ollama",
  "PyQt5", "Git", "SQLite", "Tailwind CSS",
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setStyle({
      transform: `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(0)`,
    });
  };
  const onLeave = () => setStyle({ transform: "perspective(800px) rotateY(0deg) rotateX(0deg)" });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ ...style, transition: "transform 0.15s ease-out" }}
      className={className}
    >
      {children}
    </div>
  );
}

function RoleRotator() {
  const [idx, setIdx] = useState(0);
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | pausing | deleting

  useEffect(() => {
    const current = ROLES[idx];
    let t;
    if (phase === "typing") {
      if (display.length < current.length) {
        t = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 45);
      } else {
        t = setTimeout(() => setPhase("pausing"), 1300);
      }
    } else if (phase === "pausing") {
      t = setTimeout(() => setPhase("deleting"), 200);
    } else if (phase === "deleting") {
      if (display.length > 0) {
        t = setTimeout(() => setDisplay(display.slice(0, -1)), 25);
      } else {
        setIdx((idx + 1) % ROLES.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [display, phase, idx]);

  return (
    <span className="text-cyan-300">
      {display}
      <span className="inline-block w-[2px] h-[1em] bg-cyan-300 ml-1 align-middle animate-pulse" />
    </span>
  );
}

function Waveform() {
  // A gentle animated sine-wave divider — nods to the voice-assistant / signal-processing work.
  return (
    <div className="relative w-full h-16 overflow-hidden opacity-70">
      <svg className="wave-svg" viewBox="0 0 1200 100" preserveAspectRatio="none">
        <path
          d="M0,50 C150,10 350,90 600,50 C850,10 1050,90 1200,50 L1200,100 L0,100 Z"
          fill="url(#waveGrad)"
        />
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function Portfolio() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.3 });
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef(null);

  const onHeroMove = useCallback((e) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  }, []);

  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen font-sans antialiased overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Sora', sans-serif; }
        .font-mono2 { font-family: 'JetBrains Mono', monospace; }
        .wave-svg { width: 100%; height: 100%; animation: waveShift 10s ease-in-out infinite alternate; }
        @keyframes waveShift { 0% { transform: translateX(0) scaleY(1); } 100% { transform: translateX(-40px) scaleY(1.15); } }
        @keyframes blobFloat { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(20px,-30px) scale(1.08); } 66% { transform: translate(-25px,15px) scale(0.95); } }
        .blob { animation: blobFloat 14s ease-in-out infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 22s linear infinite; }
        @keyframes fadeSlide { from { opacity:0; transform: translateY(14px);} to { opacity:1; transform: translateY(0);} }
        .fade-slide { animation: fadeSlide 0.8s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .blob, .wave-svg, .marquee-track { animation: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-slate-950/60 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-display font-bold text-lg tracking-tight text-white">Ankit<span className="text-cyan-400">.</span></span>
          <div className="hidden sm:flex items-center gap-8 text-sm text-slate-400 font-mono2">
            <a href="#about" className="hover:text-cyan-300 transition-colors">about</a>
            <a href="#projects" className="hover:text-cyan-300 transition-colors">projects</a>
            <a href="#stack" className="hover:text-cyan-300 transition-colors">stack</a>
            <a href="#certifications" className="hover:text-cyan-300 transition-colors">certs</a>
            <a href="#contact" className="hover:text-cyan-300 transition-colors">contact</a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-1.5 border border-cyan-400/30 text-cyan-300 rounded-full px-3.5 py-1.5 hover:bg-cyan-400/10 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Resume
            </a>
          </div>
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="sm:hidden text-slate-300 hover:text-cyan-300 transition-colors"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="sm:hidden border-t border-white/5 bg-slate-950/95 px-6 py-4 flex flex-col gap-4 text-sm font-mono2 text-slate-300">
            <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-cyan-300">about</a>
            <a href="#projects" onClick={() => setMenuOpen(false)} className="hover:text-cyan-300">projects</a>
            <a href="#stack" onClick={() => setMenuOpen(false)} className="hover:text-cyan-300">stack</a>
            <a href="#certifications" onClick={() => setMenuOpen(false)} className="hover:text-cyan-300">certifications</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-cyan-300">contact</a>
            <a href="/resume.pdf" download className="inline-flex items-center gap-1.5 text-cyan-300 w-fit">
              <Download className="w-3.5 h-3.5" /> Download Resume
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        ref={heroRef}
        onMouseMove={onHeroMove}
        className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
      >
        {/* Signal field: cursor-reactive gradient blobs */}
        <div
          className="pointer-events-none absolute w-[36rem] h-[36rem] rounded-full bg-cyan-500/20 blur-3xl blob"
          style={{ left: `calc(${mouse.x * 100}% - 18rem)`, top: `calc(${mouse.y * 100}% - 18rem)`, transition: "left 0.4s ease-out, top 0.4s ease-out" }}
        />
        <div className="pointer-events-none absolute w-[28rem] h-[28rem] rounded-full bg-violet-500/20 blur-3xl blob top-1/3 right-0" style={{ animationDelay: "2s" }} />
        <div className="pointer-events-none absolute w-[24rem] h-[24rem] rounded-full bg-fuchsia-500/10 blur-3xl blob bottom-0 left-10" style={{ animationDelay: "4s" }} />

        <div className="relative z-10 max-w-4xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 font-mono2 text-xs text-cyan-300/80 border border-cyan-400/20 bg-cyan-400/5 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> Open to full-stack &amp; AI/ML roles
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="font-display font-extrabold text-5xl sm:text-7xl text-white tracking-tight leading-[1.05]">
              Ankit Kumar
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 font-mono2 text-lg sm:text-2xl text-slate-300 h-8">
              <RoleRotator />
            </p>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-6 text-slate-400 max-w-xl mx-auto leading-relaxed">
              I build things at the intersection of AI, computer vision, and thoughtful software —
              face-authenticated vaults, gesture-controlled interfaces, and local LLM tooling that actually ships.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a href="#projects" className="group inline-flex items-center gap-2 bg-cyan-400 text-slate-950 font-semibold px-6 py-3 rounded-full hover:bg-cyan-300 transition-all hover:-translate-y-0.5">
                View Projects <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a href="https://github.com/ankit-k26" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/15 text-slate-200 px-6 py-3 rounded-full hover:border-cyan-400/50 hover:text-cyan-300 transition-colors">
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href="/resume.pdf" download className="inline-flex items-center gap-2 border border-white/15 text-slate-200 px-6 py-3 rounded-full hover:border-cyan-400/50 hover:text-cyan-300 transition-colors">
                <Download className="w-4 h-4" /> Resume
              </a>
            </div>
          </Reveal>
        </div>

        <a href="#about" aria-label="Scroll down" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-cyan-300 transition-colors">
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </section>

      <Waveform />

      {/* ABOUT */}
      <section id="about" className="max-w-5xl mx-auto px-6 py-24">
        <Reveal>
          <p className="font-mono2 text-xs text-cyan-400/80 mb-3">// about</p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Reveal delay={100}>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              I build to learn,<br /> and ship to grow.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                I'm a self-driven developer working across full-stack web development and applied AI — most of my
                projects run real-time inference over a webcam feed, or a local LLM through Ollama, with nothing
                phoned home to a third-party API unless it needs to be.
              </p>
              <p>
                Currently building <span className="text-slate-200 font-medium">AI SecureVault</span>, a desktop
                security app pairing face recognition with AES encryption, and exploring RAG pipelines and local
                AI tooling more broadly.
              </p>
              <p className="font-mono2 text-sm text-cyan-300/90 pt-2">"The only way to learn is to build."</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STACK — marquee */}
      <section id="stack" className="py-16 border-y border-white/5 bg-white/[0.02]">
        <Reveal>
          <p className="font-mono2 text-xs text-cyan-400/80 mb-8 text-center">// tech stack</p>
        </Reveal>
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10" />
          <div className="flex w-max marquee-track">
            {[...STACK, ...STACK].map((s, i) => (
              <span key={i} className="mx-4 font-mono2 text-sm text-slate-400 border border-white/10 rounded-full px-5 py-2 whitespace-nowrap">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
        <Reveal>
          <p className="font-mono2 text-xs text-cyan-400/80 mb-3">// projects</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-14">Things I've built</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <TiltCard className="h-full">
                <div className="group h-full flex flex-col bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors relative overflow-hidden">
                  <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${p.accent} opacity-20 blur-2xl group-hover:opacity-35 transition-opacity`} />
                  <h3 className="font-display font-bold text-lg text-white relative z-10">{p.title}</h3>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed flex-1 relative z-10">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2 relative z-10">
                    {p.tags.map((t) => (
                      <span key={t} className="font-mono2 text-[11px] text-slate-400 border border-white/10 rounded-full px-2.5 py-1">{t}</span>
                    ))}
                  </div>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 hover:text-cyan-200 relative z-10 w-fit"
                  >
                    View on GitHub <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <h3 className="font-display font-semibold text-white mt-16 mb-6">A few smaller builds</h3>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-5">
          {MINOR_PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 hover:border-cyan-400/30 transition-colors"
              >
                <div>
                  <p className="text-slate-200 font-medium text-sm">{p.title}</p>
                  <div className="mt-1.5 flex gap-1.5">
                    {p.tags.map((t) => <span key={t} className="font-mono2 text-[10px] text-slate-500">{t}</span>)}
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 transition-colors" />
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <Waveform />

      {/* CERTIFICATIONS */}
      <section id="certifications" className="max-w-4xl mx-auto px-6 py-20">
        <Reveal>
          <p className="font-mono2 text-xs text-cyan-400/80 mb-3">// certifications</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-10">Verified learning</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-5">
          {CERTIFICATIONS.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-cyan-400/30 transition-colors h-full"
              >
                <div className="mt-0.5 shrink-0 w-9 h-9 rounded-full bg-cyan-400/10 flex items-center justify-center">
                  <Award className="w-4.5 h-4.5 text-cyan-300" />
                </div>
                <div>
                  <p className="text-slate-100 font-medium leading-snug">{c.title}</p>
                  <p className="text-sm text-slate-400 mt-1">{c.issuer}</p>
                  <p className="font-mono2 text-xs text-slate-500 mt-1">{c.meta}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-cyan-300 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Verify <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-28 text-center">
        <Reveal>
          <p className="font-mono2 text-xs text-cyan-400/80 mb-3">// connect</p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white">Let's build something.</h2>
          <p className="mt-4 text-slate-400 max-w-md mx-auto">
            Open to interesting project ideas, collaborations, or a good tech conversation.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {[
              { icon: Github, label: "GitHub", href: "https://github.com/ankit-k26" },
              { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ankit-kumar-10o26/" },
              { icon: Mail, label: "Email", href: "mailto:ankitmukesh2003@email.com" },
              { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/_.ken_k_/" },
              { icon: MessageCircle, label: "Discord", href: "https://discord.gg/WBBYCyJbrb" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-white/10 rounded-full px-5 py-2.5 text-sm text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
              >
                <Icon className="w-4 h-4" /> {label}
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-white/5 py-8 text-center font-mono2 text-xs text-slate-600">
        © 2026 Ankit Kumar — built with React &amp; Tailwind CSS
      </footer>
    </div>
  );
}
