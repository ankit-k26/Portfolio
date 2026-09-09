import React, { useState, useEffect, useRef, useCallback } from "react";
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
  { icon: MessageCircle, label: "Discord",   href: "https://discord.gg/WBBYCyJbrb" },
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
      { threshold: 0.12 }
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
        transition: `opacity 0.65s ease-out ${delay}ms, transform 0.65s ease-out ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
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
        t = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 45);
      } else {
        t = setTimeout(() => setPhase("pausing"), 1400);
      }
    } else if (phase === "pausing") {
      t = setTimeout(() => setPhase("deleting"), 200);
    } else if (phase === "deleting") {
      if (display.length > 0) {
        t = setTimeout(() => setDisplay(display.slice(0, -1)), 22);
      } else {
        setIdx((idx + 1) % ROLES.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [display, phase, idx]);

  return (
    <span style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.95rem" }}>
      {display}
      <span className="cursor-blink" style={{ display: "inline-block", width: "2px", height: "1em", background: "var(--accent)", marginLeft: "3px", verticalAlign: "middle" }} />
    </span>
  );
}

/* Thin horizontal ruled divider */
function Rule({ className = "" }) {
  return <div className={`ruled ${className}`} />;
}

/* ─────────────────────────── NAV ────────────────────────────────────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["About", "Projects", "Stack", "Certifications", "Contact"];


  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        background: scrolled ? "rgba(10,10,15,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          {/* Monogram logo */}
          <a href="#" className="focus-ring" aria-label="Home" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <span
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: "34px", height: "34px",
                background: "var(--accent)",
                borderRadius: "6px",
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontWeight: 900, fontSize: "0.9rem",
                color: "#000", letterSpacing: "-0.03em",
                userSelect: "none",
              }}
            >
              AK
            </span>
            <span style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text)", letterSpacing: "-0.02em" }}>
              Ankit Kumar
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden sm:flex" style={{ alignItems: "center", gap: "2rem" }}>
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className="focus-ring hover-line"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem", color: "var(--muted)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  paddingBottom: "2px",
                }}
                onMouseEnter={e => e.target.style.color = "var(--text)"}
                onMouseLeave={e => e.target.style.color = "var(--muted)"}
              >
                {link}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              className="focus-ring"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                background: "var(--accent)", color: "#000",
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontWeight: 700, fontSize: "0.8rem",
                padding: "0.45rem 1rem", borderRadius: "9999px",
                textDecoration: "none",
                transition: "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#d4ff5a"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <Download size={12} /> Resume
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
      style={{
        minHeight: "100vh", display: "flex", alignItems: "flex-end",
        padding: "0 1.5rem 5rem", position: "relative", overflow: "hidden",
      }}
    >
      {/* Vertical accent line */}
      <div style={{
        position: "absolute", left: "1.5rem", top: "30%", bottom: "20%",
        width: "1px", background: "linear-gradient(to bottom, transparent, var(--accent), transparent)",
        opacity: 0.35,
      }} />

      {/* Scanline sweep effect */}
      <div
        className="scanline"
        style={{
          position: "absolute", left: 0, right: 0, height: "1px",
          background: "linear-gradient(to right, transparent, var(--accent), transparent)",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      {/* Large background year — decorative */}
      <div
        className="font-display float-y"
        style={{
          position: "absolute", right: "-2rem", bottom: "-1rem",
          fontSize: "clamp(8rem, 25vw, 18rem)",
          fontWeight: 900, color: "transparent",
          WebkitTextStroke: "1px rgba(186,255,41,0.07)",
          userSelect: "none", pointerEvents: "none",
          lineHeight: 1, letterSpacing: "-0.04em",
        }}
      >
        2026
      </div>

      <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", paddingTop: "80px" }}>
        {/* Status badge */}
        <Reveal>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
            <span style={{
              display: "inline-block", width: "7px", height: "7px",
              borderRadius: "50%", background: "var(--accent)",
              boxShadow: "0 0 8px var(--accent)",
              animation: "blink 2s step-end infinite",
            }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.08em" }}>
              OPEN TO FULL-STACK &amp; AI/ML ROLES
            </span>
          </div>
        </Reveal>

        {/* Name — large editorial display */}
        <Reveal delay={80}>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 9rem)",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              color: "var(--text)",
              margin: "0 0 0.5rem",
            }}
          >
            Ankit<br />
            <span style={{ color: "var(--accent)" }}>Kumar</span>
          </h1>
        </Reveal>

        {/* Role rotator line */}
        <Reveal delay={160}>
          <div style={{ marginBottom: "2rem" }}>
            <RoleRotator />
          </div>
        </Reveal>

        {/* Tagline */}
        <Reveal delay={220}>
          <p style={{
            maxWidth: "520px", color: "var(--muted)", lineHeight: 1.7,
            fontSize: "1rem", marginBottom: "2.5rem",
          }}>
            I build things at the intersection of AI, computer vision, and thoughtful software —
            face-authenticated vaults, gesture-controlled interfaces, and local LLM tooling that actually ships.
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={280}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
            <a
              href="#Projects"
              className="focus-ring"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.45rem",
                background: "var(--accent)", color: "#000",
                fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 700,
                fontSize: "0.9rem", padding: "0.7rem 1.5rem", borderRadius: "9999px",
                textDecoration: "none", transition: "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#d4ff5a"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              View Projects <ArrowUpRight size={15} />
            </a>
            <a
              href="https://github.com/ankit-k26"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.45rem",
                border: "1px solid var(--border)", color: "var(--text)",
                fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 600,
                fontSize: "0.9rem", padding: "0.7rem 1.5rem", borderRadius: "9999px",
                textDecoration: "none", transition: "border-color 0.2s, color 0.2s, transform 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <Github size={15} /> GitHub
            </a>
            <a
              href="/resume.pdf"
              download
              className="focus-ring"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.45rem",
                border: "1px solid var(--border)", color: "var(--text)",
                fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 600,
                fontSize: "0.9rem", padding: "0.7rem 1.5rem", borderRadius: "9999px",
                textDecoration: "none", transition: "border-color 0.2s, color 0.2s, transform 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <Download size={15} /> Resume
            </a>
          </div>
        </Reveal>

        {/* Scroll cue */}
        <Reveal delay={400}>
          <a
            href="#About"
            aria-label="Scroll down"
            className="focus-ring"
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              marginTop: "4rem", color: "var(--muted)", textDecoration: "none",
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem",
              letterSpacing: "0.08em", transition: "color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--accent)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
          >
            <ArrowDown size={14} style={{ animation: "floatY 2s ease-in-out infinite" }} />
            SCROLL
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────── ABOUT ──────────────────────────────────── */

function About() {
  return (
    <section id="About" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 1.5rem" }}>
      <Rule />
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", marginTop: "3rem" }}>
        {/* Label */}
        <Reveal>
          <span className="font-mono2" style={{ fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em" }}>
            001 / ABOUT
          </span>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }} className="md-grid-2">
          {/* Pull quote */}
          <Reveal delay={100}>
            <blockquote
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                fontWeight: 800, lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "var(--text)", margin: 0,
                borderLeft: "none",
              }}
            >
              I build to learn,<br />
              <span style={{ color: "var(--accent)" }}>and ship</span><br />
              to grow.
            </blockquote>
          </Reveal>

          {/* Body text + stats */}
          <Reveal delay={180}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: "1rem" }}>
                I'm Ankit, an MCA graduate who builds at the intersection of full-stack development and applied AI.
                I like taking a project from database schema to production-ready UI, and I'm just as comfortable
                designing a REST API as I am wiring a retrieval-augmented generation pipeline into a working chatbot.
                My recent work spans a full-stack RAG chatbot built solo with React, Express, and Qdrant, a real-time
                computer vision system that turns hand gestures into speech, and an agentic voice assistant that
                routes commands through LangChain's tool-calling.
              </p>
              <p style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: "1rem" }}>
                What ties these together is a preference for understanding why a piece of a system
                works the way it does — not just that it runs. I'm currently sharpening my grasp of relational
                databases and cloud deployment to round out the full picture, and I'm looking for a role where I
                can keep building things that solve real problems.
              </p>

              {/* Stat chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                {["6 Projects shipped", "Local-first AI", "Full-stack + CV", "Open to hire"].map(s => (
                  <span key={s} style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem",
                    color: "var(--text)", background: "var(--surface-2)",
                    border: "1px solid var(--border)", borderRadius: "9999px",
                    padding: "0.3rem 0.8rem",
                  }}>
                    {s}
                  </span>
                ))}
              </div>

              {/* Currently line */}
              <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <span className="font-mono2" style={{ fontSize: "0.7rem", color: "var(--muted)", paddingTop: "2px", whiteSpace: "nowrap" }}>currently →</span>
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
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        <Rule />
        <Reveal>
          <span className="font-mono2" style={{ fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em", display: "block", marginTop: "2rem", marginBottom: "2.5rem" }}>
            002 / TECH STACK
          </span>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "2rem" }}>
          {STACK_CATEGORIES.map((cat, i) => (
            <Reveal key={cat.label} delay={i * 60}>
              <div>
                <p className="font-mono2" style={{ fontSize: "0.65rem", color: "var(--accent)", letterSpacing: "0.1em", marginBottom: "0.75rem", fontWeight: 500 }}>
                  {cat.label.toUpperCase()}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {cat.items.map(item => (
                    <span key={item} style={{
                      fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 600,
                      fontSize: "0.95rem", color: "var(--text)",
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Scrolling marquee strip below */}
        <div style={{ marginTop: "4rem", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, left: 0, width: "6rem", background: "linear-gradient(to right, var(--surface), transparent)", zIndex: 1, pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, right: 0, left: "auto", width: "6rem", background: "linear-gradient(to left, var(--surface), transparent)", zIndex: 1, pointerEvents: "none" }} />
          <div className="marquee-track" style={{ display: "flex", width: "max-content" }}>
            {[...STACK_CATEGORIES.flatMap(c => c.items), ...STACK_CATEGORIES.flatMap(c => c.items)].map((s, i) => (
              <span key={i} className="tag" style={{ margin: "0 0.5rem" }}>{s}</span>
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
    <section id="Projects" style={{ maxWidth: "1200px", margin: "0 auto", padding: "6rem 1.5rem" }}>
      <Rule />
      <Reveal>
        <span className="font-mono2" style={{ fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em", display: "block", marginTop: "2rem" }}>
          003 / PROJECTS
        </span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="font-display" style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900,
          letterSpacing: "-0.03em", color: "var(--text)", margin: "0.5rem 0 3rem",
        }}>
          Things I've built
        </h2>
      </Reveal>

      {/* Main project list */}
      <div>
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 60}>
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-row focus-ring"
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: "1.5rem 2rem",
                alignItems: "start",
                padding: "1.75rem 0",
                borderBottom: "1px solid var(--border)",
                textDecoration: "none",
                transition: "background 0.2s",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(186,255,41,0.03)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {/* Number */}
              <span className="project-num" style={{ minWidth: "3.5rem" }}>
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div>
                <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <h3 className="font-display" style={{
                    fontSize: "1.25rem", fontWeight: 800, color: "var(--text)",
                    letterSpacing: "-0.02em", margin: 0,
                    transition: "color 0.2s",
                  }}>
                    {p.title}
                  </h3>
                  {p.subtitle && (
                    <span style={{ color: "var(--muted)", fontSize: "0.85rem", fontWeight: 400 }}>
                      — {p.subtitle}
                    </span>
                  )}
                </div>
                <p style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.65, marginBottom: "0.75rem", maxWidth: "600px" }}>
                  {p.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>

              {/* Arrow */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "40px", height: "40px", border: "1px solid var(--border)",
                borderRadius: "50%", color: "var(--muted)",
                transition: "border-color 0.2s, color 0.2s, transform 0.2s",
                flexShrink: 0, marginTop: "4px",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.transform = "rotate(45deg)"; }}
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
          fontSize: "1rem", fontWeight: 700, color: "var(--muted)",
          letterSpacing: "-0.01em", margin: "3rem 0 1rem",
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
                borderRadius: "10px", padding: "0.9rem 1rem",
                textDecoration: "none", transition: "border-color 0.2s, transform 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div>
                <p className="font-display" style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--text)", margin: "0 0 0.3rem" }}>
                  {p.title}
                </p>
                <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <ExternalLink size={14} style={{ color: "var(--muted)", flexShrink: 0 }} />
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
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        <Rule />
        <Reveal>
          <span className="font-mono2" style={{ fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em", display: "block", marginTop: "2rem" }}>
            004 / CERTIFICATIONS
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display" style={{
            fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 900,
            letterSpacing: "-0.03em", color: "var(--text)", margin: "0.5rem 0 2.5rem",
          }}>
            Verified learning
          </h2>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column" }}>
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
                  gap: "1.25rem 2rem",
                  alignItems: "center",
                  padding: "1.5rem 0.75rem",
                  borderBottom: "1px solid var(--border)",
                  textDecoration: "none",
                  borderRadius: "4px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(186,255,41,0.03)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                {/* Icon */}
                <div style={{
                  width: "40px", height: "40px", borderRadius: "10px",
                  background: "rgba(186,255,41,0.08)", border: "1px solid rgba(186,255,41,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Award size={18} style={{ color: "var(--accent)" }} />
                </div>

                {/* Text */}
                <div>
                  <p className="font-display" style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", margin: "0 0 0.25rem", letterSpacing: "-0.01em" }}>
                    {c.title}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
                    <span style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{c.issuer}</span>
                    <span className="font-mono2" style={{ fontSize: "0.68rem", color: "var(--muted-2)" }}>{c.meta}</span>
                  </div>
                </div>

                {/* Verify link */}
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.35rem",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem",
                  color: "var(--muted)", transition: "color 0.2s",
                  whiteSpace: "nowrap",
                }}>
                  Verify <ExternalLink size={12} />
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
    <section id="Contact" style={{ padding: "0 1.5rem 6rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          padding: "clamp(2.5rem, 6vw, 5rem)",
          marginTop: "3rem",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* BG accent glow */}
          <div style={{
            position: "absolute", top: "-80px", right: "-80px",
            width: "300px", height: "300px",
            background: "radial-gradient(circle, rgba(186,255,41,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <Reveal>
            <span className="font-mono2" style={{ fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em" }}>
              005 / CONTACT
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="font-display" style={{
              fontSize: "clamp(2.5rem, 8vw, 6rem)", fontWeight: 900,
              letterSpacing: "-0.04em", color: "var(--text)",
              margin: "0.5rem 0 0.75rem", lineHeight: 0.95,
            }}>
              Let's build<br />
              <span style={{ color: "var(--accent)" }}>something.</span>
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p style={{ color: "var(--muted)", maxWidth: "400px", lineHeight: 1.7, marginBottom: "2.5rem" }}>
              Open to interesting project ideas, collaborations, or a good tech conversation.
            </p>
          </Reveal>

          <Reveal delay={200}>
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
                    border: "1px solid var(--border)", borderRadius: "9999px",
                    padding: "0.55rem 1.1rem",
                    fontFamily: "'Cabinet Grotesk', sans-serif", fontWeight: 600,
                    fontSize: "0.85rem", color: "var(--text)",
                    textDecoration: "none", minHeight: "44px",
                    transition: "border-color 0.2s, color 0.2s, background 0.2s, transform 0.15s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.color = "var(--accent)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--text)";
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
      padding: "1.5rem",
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "0.5rem",
      }}>
        <span className="font-mono2" style={{ fontSize: "0.7rem", color: "var(--muted-2)" }}>
          © 2026 Ankit Kumar
        </span>
        <span className="font-mono2" style={{ fontSize: "0.7rem", color: "var(--muted-2)" }}>
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
