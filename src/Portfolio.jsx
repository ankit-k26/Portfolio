import React, { useState, useEffect, useRef } from "react";
import {
  Github, Linkedin, Instagram, Mail, ExternalLink,
  ArrowUpRight, ArrowDown, MessageCircle, Download, Award
} from "lucide-react";

/* ─────────────────────────── DATA (unchanged) ──────────────────────── */

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
  },
  {
    title: "SignSpeak",
    subtitle: "Real-Time Sign Language to Speech",
    desc: "A full-stack system that translates live hand gestures into spoken sentences — an LSTM classifier over MediaPipe landmarks, a LangChain/Ollama agent for sentence generation, and a React frontend streaming webcam frames to a FastAPI backend over WebSockets.",
    tags: ["FastAPI", "React", "TensorFlow", "MediaPipe", "LangChain", "Ollama"],
    link: "https://github.com/ankit-k26/Real-Time-Sign-Language-to-Speech-System",
  },
  {
    title: "Stacks",
    subtitle: "Full-Stack RAG Chatbot",
    desc: "A full-stack retrieval-augmented generation chatbot built end-to-end solo, with a React/Vite frontend and an Express/Node.js backend. Ollama-hosted Gemma handles generation while Qwen3-Embedding powers semantic search over Qdrant-stored vectors.",
    tags: ["React", "Vite", "Express.js", "Node.js", "MongoDB", "Qdrant", "Ollama"],
    link: "https://github.com/ankit-k26?tab=repositories",
  },
  {
    title: "Hand Gesture Mouse Controller",
    desc: "Full mouse control via hand gestures over webcam — palm to move, pinch to click, peace sign to right-click. No extra hardware.",
    tags: ["MediaPipe", "TensorFlow", "PyAutoGUI"],
    link: "https://github.com/ankit-k26/HandGestureSystemControl",
  },
  {
    title: "Face Recognition Security System",
    desc: "Real-time face-recognition access control using OpenCV's LBPH algorithm — live enrollment, confidence scoring, access logs.",
    tags: ["Python", "OpenCV", "Tkinter"],
    link: "https://github.com/ankit-k26/FaceRecognitionSystem",
  },
  {
    title: "VoiceFlow",
    subtitle: "AI Voice Assistant",
    desc: "A local, on-device voice assistant with a tool-calling agent loop that dispatches real system actions, entirely offline.",
    tags: ["LangChain", "Ollama", "SpeechRecognition"],
    link: "https://github.com/ankit-k26/VoiceAssistant",
  },
];

const MINOR_PROJECTS = [
  { title: "Crossword Puzzle Game", tags: ["C", "GTK4"], link: "https://github.com/ankit-k26?tab=repositories" },
  { title: "Sudoku Game", tags: ["HTML", "CSS", "JS"], link: "https://github.com/ankit-k26?tab=repositories" },
  { title: "Custom New Tab Page", tags: ["HTML", "CSS", "JS"], link: "https://github.com/ankit-k26?tab=repositories" },
];

const STACK_CATEGORIES = [
  { label: "Languages",  items: ["Python", "JavaScript", "C"] },
  { label: "Frontend",   items: ["React.js", "Vite", "Tailwind CSS"] },
  { label: "Backend",    items: ["Node.js", "Express.js", "MongoDB", "SQLite"] },
  { label: "AI / ML",    items: ["OpenCV", "TensorFlow", "MediaPipe", "LangChain", "Ollama"] },
  { label: "Tools",      items: ["Git", "PyQt5", "FastAPI"] },
];

const CONTACTS = [
  { icon: Github,        label: "GitHub",    href: "https://github.com/ankit-k26" },
  { icon: Linkedin,      label: "LinkedIn",  href: "https://www.linkedin.com/in/ankit-kumar-10o26/" },
  { icon: Mail,          label: "Email",     href: "mailto:ankitmukesh2003@email.com" },
  { icon: Instagram,     label: "Instagram", href: "https://www.instagram.com/_.ken_k_/" },
];

/* ─────────────────────────── HOOKS ─────────────────────────────────── */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

/* ─────────────────────────── COMPONENTS ────────────────────────────── */

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
      }}
    >
      {children}
    </div>
  );
}

function RoleRotator() {
  const [idx, setIdx] = useState(0);
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    const current = ROLES[idx];
    let t;
    if (phase === "typing") {
      if (display.length < current.length) {
        t = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 50);
      } else {
        t = setTimeout(() => setPhase("pausing"), 1600);
      }
    } else if (phase === "pausing") {
      t = setTimeout(() => setPhase("deleting"), 200);
    } else if (phase === "deleting") {
      if (display.length > 0) {
        t = setTimeout(() => setDisplay(display.slice(0, -1)), 28);
      } else {
        setIdx((idx + 1) % ROLES.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [display, phase, idx]);

  return (
    <span style={{ color: "var(--amber)", fontFamily: "'Azeret Mono', monospace", fontSize: "0.9rem", letterSpacing: "0.02em" }}>
      {display}
      <span className="cursor-blink" style={{ display: "inline-block", width: "2px", height: "1.1em", background: "var(--amber)", marginLeft: "3px", verticalAlign: "middle", borderRadius: "1px" }} />
    </span>
  );
}

/* Amber ruled line */
function Rule({ className = "" }) {
  return <div className={`ruled-amber ${className}`} />;
}

/* ─────────────────────────── NAV ────────────────────────────────────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["About", "Projects", "Stack", "Certifications", "Contact"];

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        background: scrolled ? "rgba(15,12,9,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "background 0.4s ease, border-color 0.4s ease",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>

          {/* Monogram logo */}
          <a href="#" className="focus-ring" aria-label="Home" style={{ display: "flex", alignItems: "center", gap: "0.65rem", textDecoration: "none" }}>
            {/* Sun circle mark */}
            <span style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: "38px", height: "38px",
              border: "2px solid var(--amber)",
              borderRadius: "50%",
              fontFamily: "'Zen Old Mincho', serif",
              fontWeight: 700, fontSize: "0.8rem",
              color: "var(--amber)",
              letterSpacing: "0.02em",
              userSelect: "none",
              position: "relative",
            }}>
              AK
            </span>
            <span style={{ fontFamily: "'Zen Old Mincho', serif", fontWeight: 600, fontSize: "0.95rem", color: "var(--text)", letterSpacing: "0.03em" }}>
              Ankit Kumar
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden sm:flex" style={{ alignItems: "center", gap: "2.5rem" }}>
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className="focus-ring hover-line"
                style={{
                  fontFamily: "'Chakra Petch', sans-serif",
                  fontSize: "0.78rem", color: "var(--muted)",
                  textDecoration: "none",
                  transition: "color 0.25s",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
                onMouseEnter={e => e.target.style.color = "var(--text-warm)"}
                onMouseLeave={e => e.target.style.color = "var(--muted)"}
              >
                {link}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              className="focus-ring btn-primary"
              style={{ fontSize: "0.78rem", padding: "0.5rem 1.1rem" }}
            >
              <Download size={13} /> Resume
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
}

/* ─────────────────────────── HERO ───────────────────────────────────── */

function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "0 2rem",
      }}
    >
      {/* Warm radial glow from center-right */}
      <div style={{
        position: "absolute", top: "10%", right: "-5%",
        width: "55vw", height: "55vw", maxWidth: "700px", maxHeight: "700px",
        background: "radial-gradient(circle, rgba(212,146,42,0.07) 0%, rgba(139,26,26,0.04) 50%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      {/* Vertical left accent */}
      <div className="vertical-accent" style={{
        position: "absolute", left: "1.5rem", top: "50%",
        transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem",
      }}>
        <div style={{ width: "1px", height: "80px", background: "linear-gradient(to bottom, transparent, var(--amber-rule), transparent)" }} />
        <span className="vertical-text" style={{ fontSize: "0.6rem", opacity: 0.3 }}>2026</span>
      </div>

      {/* Main content wrapper */}
      <div style={{ maxWidth: "1280px", width: "100%", margin: "0 auto", paddingTop: "80px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "3rem",
          alignItems: "center",
          minHeight: "80vh",
        }} className="hero-main-grid">

          {/* Left — text column */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>

            {/* Status pill */}
            <Reveal>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "2.5rem" }}>
                <span style={{
                  display: "inline-block", width: "6px", height: "6px",
                  borderRadius: "50%", background: "var(--amber)",
                  boxShadow: "0 0 8px var(--amber)",
                  animation: "pulseAmber 2s ease-in-out infinite",
                }} />
                <span className="section-label" style={{ color: "var(--muted)", fontSize: "0.62rem" }}>
                  OPEN TO FULL-STACK &amp; AI/ML ROLES
                </span>
              </div>
            </Reveal>

            {/* Large display name */}
            <Reveal delay={80}>
              <h1
                className="font-display"
                style={{
                  fontSize: "clamp(3.5rem, 10vw, 8.5rem)",
                  fontWeight: 700,
                  lineHeight: 0.92,
                  letterSpacing: "-0.02em",
                  color: "var(--text)",
                  margin: "0 0 0.6rem",
                }}
              >
                Ankit<br />
                <span style={{ color: "var(--amber)" }}>Kumar</span>
              </h1>
            </Reveal>

            {/* Role rotator */}
            <Reveal delay={160}>
              <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="section-label" style={{ color: "var(--muted-2)" }}>—</span>
                <RoleRotator />
              </div>
            </Reveal>

            {/* Tagline */}
            <Reveal delay={220}>
              <p style={{
                maxWidth: "480px",
                color: "var(--muted)",
                lineHeight: 1.8,
                fontSize: "0.95rem",
                marginBottom: "2.75rem",
                fontFamily: "'Chakra Petch', sans-serif",
                fontWeight: 300,
              }}>
                I build things at the intersection of AI, computer vision, and thoughtful software —
                face-authenticated vaults, gesture-controlled interfaces, and local LLM tooling that actually ships.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={290}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
                <a href="#Projects" className="focus-ring btn-primary">
                  View Projects <ArrowUpRight size={15} />
                </a>
                <a
                  href="https://github.com/ankit-k26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring btn-ghost"
                >
                  <Github size={15} /> GitHub
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="focus-ring btn-ghost"
                >
                  <Download size={15} /> Resume
                </a>
              </div>
            </Reveal>

            {/* Scroll cue */}
            <Reveal delay={420}>
              <a
                href="#About"
                aria-label="Scroll down"
                className="focus-ring"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  marginTop: "4rem", color: "var(--muted)", textDecoration: "none",
                  fontFamily: "'Azeret Mono', monospace", fontSize: "0.62rem",
                  letterSpacing: "0.1em", transition: "color 0.25s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--amber)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
              >
                <ArrowDown size={13} style={{ animation: "floatY 2.5s ease-in-out infinite" }} />
                SCROLL
              </a>
            </Reveal>
          </div>

          {/* Right — geometric sun motif */}
          <div
            className="float-y hero-art-col"
            style={{
              position: "relative",
              width: "clamp(280px, 35vw, 480px)",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              aspectRatio: "1 / 1",
            }}
          >
            {/* Inline SVG sun — no background artifact */}
            <svg
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
              className="spin-slow"
              aria-hidden="true"
              style={{ width: "100%", height: "100%", opacity: 0.55 }}
            >
              {/* Concentric rings */}
              {[180, 150, 122, 96, 72, 50].map((r, i) => (
                <circle
                  key={r}
                  cx="200" cy="200" r={r}
                  fill="none"
                  stroke="#D4922A"
                  strokeWidth={i === 0 ? 1 : 0.6}
                  opacity={0.18 + i * 0.06}
                />
              ))}
              {/* Radiating lines */}
              {Array.from({ length: 36 }, (_, i) => {
                const angle = (i * 10 * Math.PI) / 180;
                const x1 = 200 + Math.cos(angle) * 96;
                const y1 = 200 + Math.sin(angle) * 96;
                const x2 = 200 + Math.cos(angle) * (i % 3 === 0 ? 178 : 162);
                const y2 = 200 + Math.sin(angle) * (i % 3 === 0 ? 178 : 162);
                return (
                  <line
                    key={i}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#D4922A"
                    strokeWidth="0.8"
                    opacity={i % 3 === 0 ? 0.5 : 0.28}
                  />
                );
              })}
              {/* Solid inner disc */}
              <circle cx="200" cy="200" r="38" fill="#D4922A" opacity="0.14" />
              <circle cx="200" cy="200" r="28" fill="#D4922A" opacity="0.22" />
              {/* Outer thin ring */}
              <circle cx="200" cy="200" r="194" fill="none" stroke="#D4922A" strokeWidth="0.4" opacity="0.1" />
            </svg>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── ABOUT ──────────────────────────────────── */

function About() {
  return (
    <section id="About" style={{ position: "relative", overflow: "hidden" }}>
      {/* Illustrated city art — full width top banner */}
      <div style={{
        width: "100%", height: "280px",
        overflow: "hidden",
        position: "relative",
      }}>
        <img
          src="/about-art.jpg"
          alt="Illustrated warm futurist cityscape"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center 60%",
            opacity: 0.65,
          }}
        />
        {/* Fade-to-dark at bottom */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 40%, var(--bg) 100%)",
        }} />
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem 6rem" }}>
        <Reveal>
          <span className="section-label" style={{ display: "block", marginBottom: "1rem" }}>
            001 / ABOUT
          </span>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="md-grid-2">

          {/* Pull quote */}
          <Reveal delay={80}>
            <blockquote
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: "var(--text)",
                margin: 0,
                borderLeft: "3px solid var(--amber)",
                paddingLeft: "1.5rem",
              }}
            >
              I build to learn,<br />
              <span style={{ color: "var(--amber)" }}>and ship</span><br />
              to grow.
            </blockquote>
          </Reveal>

          {/* Body + stats */}
          <Reveal delay={160}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <p style={{ color: "var(--muted)", lineHeight: 1.85, fontSize: "0.95rem", fontWeight: 300 }}>
                I'm Ankit, an MCA graduate who builds at the intersection of full-stack development and applied AI.
                I like taking a project from database schema to production-ready UI, and I'm just as comfortable
                designing a REST API as I am wiring a retrieval-augmented generation pipeline into a working chatbot.
                My recent work spans a full-stack RAG chatbot built solo with React, Express, and Qdrant, a real-time
                computer vision system that turns hand gestures into speech, and an agentic voice assistant that
                routes commands through LangChain's tool-calling.
              </p>
              <p style={{ color: "var(--muted)", lineHeight: 1.85, fontSize: "0.95rem", fontWeight: 300 }}>
                What ties these together is a preference for understanding why a piece of a system
                works the way it does — not just that it runs. I'm currently sharpening my grasp of relational
                databases and cloud deployment to round out the full picture, and I'm looking for a role where I
                can keep building things that solve real problems.
              </p>

              {/* Stat chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.25rem" }}>
                {["6 Projects shipped", "Local-first AI", "Full-stack + CV", "Open to hire"].map(s => (
                  <span key={s} style={{
                    fontFamily: "'Azeret Mono', monospace", fontSize: "0.65rem",
                    color: "var(--text-warm)", background: "var(--surface-2)",
                    border: "1px solid var(--border)", borderRadius: "3px",
                    padding: "0.28rem 0.7rem",
                    letterSpacing: "0.03em",
                  }}>
                    {s}
                  </span>
                ))}
              </div>

              {/* Currently line */}
              <div style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span className="section-label" style={{ color: "var(--muted-2)", fontSize: "0.6rem" }}>currently →</span>
                <RoleRotator />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── STACK ──────────────────────────────────── */

function Stack() {
  return (
    <section id="Stack" style={{ background: "var(--surface)", padding: "5rem 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        <Rule />
        <Reveal>
          <span className="section-label" style={{ display: "block", marginTop: "2.5rem", marginBottom: "3rem" }}>
            002 / TECH STACK
          </span>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "2.5rem 3rem" }}>
          {STACK_CATEGORIES.map((cat, i) => (
            <Reveal key={cat.label} delay={i * 80}>
              <div>
                <p className="section-label" style={{ fontSize: "0.6rem", marginBottom: "0.9rem", color: "var(--amber-dim)" }}>
                  {cat.label.toUpperCase()}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  {cat.items.map(item => (
                    <span key={item} style={{
                      fontFamily: "'Chakra Petch', sans-serif", fontWeight: 500,
                      fontSize: "0.95rem", color: "var(--text-warm)",
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Scrolling marquee */}
        <div style={{ marginTop: "4.5rem", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, left: 0, width: "8rem", background: "linear-gradient(to right, var(--surface), transparent)", zIndex: 1, pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, right: 0, left: "auto", width: "8rem", background: "linear-gradient(to left, var(--surface), transparent)", zIndex: 1, pointerEvents: "none" }} />
          <div className="marquee-track" style={{ display: "flex", width: "max-content", alignItems: "center", gap: "0" }}>
            {[...STACK_CATEGORIES.flatMap(c => c.items), ...STACK_CATEGORIES.flatMap(c => c.items)].map((s, i) => (
              <span key={i} className="tag" style={{ margin: "0 0.6rem" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── PROJECTS ──────────────────────────────── */

function Projects() {
  return (
    <section id="Projects" style={{ maxWidth: "1280px", margin: "0 auto", padding: "6rem 2rem" }}>
      <Rule />
      <Reveal>
        <span className="section-label" style={{ display: "block", marginTop: "2.5rem" }}>
          003 / PROJECTS
        </span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="font-display" style={{
          fontSize: "clamp(2.25rem, 5.5vw, 4rem)", fontWeight: 600,
          letterSpacing: "-0.02em", color: "var(--text)", margin: "0.75rem 0 3.5rem",
          lineHeight: 1.05,
        }}>
          Things I've built
        </h2>
      </Reveal>

      {/* Main project list */}
      <div>
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 55}>
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-row focus-ring"
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: "1.5rem 2.5rem",
                alignItems: "start",
                padding: "1.75rem 0.5rem",
                borderBottom: "1px solid var(--border)",
                textDecoration: "none",
                transition: "background 0.25s",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(212,146,42,0.04)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {/* Number */}
              <span className="project-num">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div>
                <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.6rem" }}>
                  <h3 className="font-display" style={{
                    fontSize: "1.3rem", fontWeight: 600, color: "var(--text)",
                    letterSpacing: "-0.01em", margin: 0,
                    transition: "color 0.2s",
                  }}>
                    {p.title}
                  </h3>
                  {p.subtitle && (
                    <span style={{ color: "var(--muted)", fontSize: "0.85rem", fontWeight: 300, fontFamily: "'Chakra Petch', sans-serif" }}>
                      — {p.subtitle}
                    </span>
                  )}
                </div>
                <p style={{ color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.72, marginBottom: "0.8rem", maxWidth: "580px", fontWeight: 300 }}>
                  {p.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>

              {/* Arrow icon */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "40px", height: "40px",
                border: "1px solid var(--border)",
                borderRadius: "50%", color: "var(--muted)",
                transition: "border-color 0.25s, color 0.25s, transform 0.25s",
                flexShrink: 0, marginTop: "6px",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--amber)"; e.currentTarget.style.color = "var(--amber)"; e.currentTarget.style.transform = "rotate(45deg)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.transform = "rotate(0deg)"; }}
              >
                <ArrowUpRight size={16} />
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      {/* Minor projects */}
      <Reveal delay={120}>
        <h3 className="font-display" style={{
          fontSize: "1rem", fontWeight: 500, color: "var(--muted)",
          letterSpacing: "0.01em", margin: "3.5rem 0 1.25rem",
        }}>
          A few smaller builds
        </h3>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.75rem" }}>
        {MINOR_PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 60}>
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring"
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: "4px", padding: "0.9rem 1.1rem",
                textDecoration: "none", transition: "border-color 0.25s, transform 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--amber-rule)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div>
                <p className="font-display" style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-warm)", margin: "0 0 0.35rem" }}>
                  {p.title}
                </p>
                <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <ExternalLink size={13} style={{ color: "var(--muted)", flexShrink: 0, marginLeft: "0.75rem" }} />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────── CERTIFICATIONS ─────────────────────────── */

function Certifications() {
  return (
    <section id="Certifications" style={{ background: "var(--surface)", padding: "5rem 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        <Rule />
        <Reveal>
          <span className="section-label" style={{ display: "block", marginTop: "2.5rem" }}>
            004 / CERTIFICATIONS
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display" style={{
            fontSize: "clamp(2rem, 4.5vw, 3.25rem)", fontWeight: 600,
            letterSpacing: "-0.02em", color: "var(--text)", margin: "0.75rem 0 3rem",
            lineHeight: 1.08,
          }}>
            Verified learning
          </h2>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {CERTIFICATIONS.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring"
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  gap: "1.5rem 2rem",
                  alignItems: "center",
                  padding: "1.75rem 0.75rem",
                  borderBottom: "1px solid var(--border)",
                  textDecoration: "none",
                  borderRadius: "4px",
                  transition: "background 0.25s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(212,146,42,0.04)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                {/* Award icon with amber glow box */}
                <div style={{
                  width: "48px", height: "48px", borderRadius: "4px",
                  background: "rgba(212,146,42,0.08)",
                  border: "1px solid var(--border-warm)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Award size={20} style={{ color: "var(--amber)" }} />
                </div>

                {/* Text */}
                <div>
                  <p className="font-display" style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text)", margin: "0 0 0.35rem", letterSpacing: "-0.01em" }}>
                    {c.title}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
                    <span style={{ color: "var(--muted)", fontSize: "0.875rem", fontFamily: "'Chakra Petch', sans-serif", fontWeight: 300 }}>{c.issuer}</span>
                    <span className="font-mono" style={{ fontSize: "0.65rem", color: "var(--muted-2)", letterSpacing: "0.06em" }}>{c.meta}</span>
                  </div>
                </div>

                {/* Verify badge */}
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  fontFamily: "'Azeret Mono', monospace", fontSize: "0.65rem",
                  color: "var(--muted)", transition: "color 0.2s",
                  whiteSpace: "nowrap", letterSpacing: "0.04em",
                }}>
                  Verify <ExternalLink size={11} />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── CONTACT ───────────────────────────────── */

function Contact() {
  return (
    <section id="Contact" style={{ padding: "0 2rem 6rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "6px",
          padding: "clamp(2.5rem, 6vw, 5.5rem)",
          marginTop: "3rem",
          position: "relative",
          overflow: "hidden",
        }}>

          {/* Background sun motif — inline SVG, no background artifact */}
          <svg
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
            className="spin-slow"
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-20%",
              right: "-8%",
              width: "420px",
              height: "420px",
              opacity: 0.09,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {[180, 150, 122, 96, 72].map((r, i) => (
              <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#D4922A" strokeWidth={i === 0 ? 1 : 0.7} />
            ))}
            {Array.from({ length: 36 }, (_, i) => {
              const angle = (i * 10 * Math.PI) / 180;
              const x1 = 200 + Math.cos(angle) * 96;
              const y1 = 200 + Math.sin(angle) * 96;
              const x2 = 200 + Math.cos(angle) * (i % 3 === 0 ? 178 : 162);
              const y2 = 200 + Math.sin(angle) * (i % 3 === 0 ? 178 : 162);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#D4922A" strokeWidth="0.8" />;
            })}
            <circle cx="200" cy="200" r="38" fill="#D4922A" opacity="0.5" />
          </svg>

          {/* Amber accent rule */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
            background: "linear-gradient(to right, transparent, var(--amber), transparent)",
            opacity: 0.5,
          }} />

          <Reveal>
            <span className="section-label">005 / CONTACT</span>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="font-display" style={{
              fontSize: "clamp(2.75rem, 9vw, 7rem)", fontWeight: 600,
              letterSpacing: "-0.03em", color: "var(--text)",
              margin: "0.75rem 0 1rem", lineHeight: 0.92,
            }}>
              Let's build<br />
              <span style={{ color: "var(--amber)" }}>something.</span>
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p style={{ color: "var(--muted)", maxWidth: "400px", lineHeight: 1.8, marginBottom: "2.75rem", fontWeight: 300, fontSize: "0.95rem" }}>
              Open to interesting project ideas, collaborations, or a good tech conversation.
            </p>
          </Reveal>

          <Reveal delay={210}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem" }}>
              {CONTACTS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    border: "1px solid var(--border-warm)", borderRadius: "3px",
                    padding: "0.6rem 1.2rem",
                    fontFamily: "'Chakra Petch', sans-serif", fontWeight: 500,
                    fontSize: "0.875rem", color: "var(--text-warm)",
                    textDecoration: "none", minHeight: "44px",
                    transition: "border-color 0.2s, color 0.2s, background 0.2s, transform 0.15s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "var(--amber)";
                    e.currentTarget.style.color = "var(--amber)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--border-warm)";
                    e.currentTarget.style.color = "var(--text-warm)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={15} />
                  {label}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FOOTER ────────────────────────────────── */

function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      padding: "1.75rem 2rem",
    }}>
      <div style={{
        maxWidth: "1280px", margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "0.75rem",
      }}>
        {/* Left — monogram + year */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span className="font-mono" style={{ fontSize: "0.65rem", color: "var(--muted-2)", letterSpacing: "0.05em" }}>
            © 2026 Ankit Kumar
          </span>
        </div>

        <span className="font-mono" style={{ fontSize: "0.65rem", color: "var(--muted-2)", letterSpacing: "0.04em" }}>
          Built with React &amp; Tailwind CSS v4
        </span>
      </div>
    </footer>
  );
}

/* ─────────────────────────── ROOT ──────────────────────────────────── */

export default function Portfolio() {
  return (
    <div className="grain" style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh", overflowX: "hidden" }}>
      <Nav />
      <Hero />
      <About />
      <Stack />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}
