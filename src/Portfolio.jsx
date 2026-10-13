import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useScroll, AnimatePresence } from "motion/react";
import {
  GithubLogo, LinkedinLogo, InstagramLogo, Envelope,
  ArrowUpRight, ArrowDown, DownloadSimple, Certificate,
  Code, Robot, Brain, Eye, Microphone, Terminal,
  ArrowRight, Star, Hash
} from "@phosphor-icons/react";

/* ─────────────────────────── DATA ─────────────────────────────────── */

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
    emoji: "🔐",
    desc: "Production-grade desktop security combining face-recognition auth, liveness detection, and AES file encryption. Vault keys are session-bound and never touch disk.",
    tags: ["Python", "PyQt5", "face_recognition", "dlib", "SQLite"],
    link: "https://github.com/ankit-k26/SecureVault",
    icon: Eye,
    color: "#00f0ff",
  },
  {
    title: "SignSpeak",
    emoji: "🤟",
    desc: "Real-time sign language to speech — stacked LSTM over MediaPipe 3D landmarks, Gemini sentence reconstruction, React frontend streaming over WebSockets.",
    tags: ["FastAPI", "React", "TensorFlow", "MediaPipe", "Gemini", "WebSockets", "LSTM"],
    link: "https://github.com/ankit-k26/Real-Time-Sign-Language-to-Speech-System",
    icon: Microphone,
    color: "#b6f000",
  },
  {
    title: "Stacks",
    emoji: "💬",
    desc: "Full-stack RAG chatbot with React/Vite frontend, Express backend, Gemini embeddings, Qdrant Cloud vectors. Google OAuth, guest sessions, live admin analytics.",
    tags: ["React", "Express.js", "Node.js", "MongoDB", "Qdrant", "Gemini API"],
    link: "https://github.com/ankit-k26?tab=repositories",
    icon: Brain,
    color: "#8b5cf6",
  },
  {
    title: "Hand Gesture Mouse",
    emoji: "✋",
    desc: "Full mouse control via hand gestures over webcam — palm to move, pinch to click, peace sign to right-click. No extra hardware required.",
    tags: ["MediaPipe", "TensorFlow", "PyAutoGUI"],
    link: "https://github.com/ankit-k26/HandGestureSystemControl",
    icon: Robot,
    color: "#00f0ff",
  },
  {
    title: "Face Recognition Security",
    emoji: "👤",
    desc: "Real-time face-recognition access control using OpenCV's LBPH algorithm — live enrollment, confidence scoring, access logs.",
    tags: ["Python", "OpenCV", "Tkinter"],
    link: "https://github.com/ankit-k26/FaceRecognitionSystem",
    icon: Eye,
    color: "#b6f000",
  },
  {
    title: "VoiceFlow",
    emoji: "🎙️",
    desc: "Local, on-device voice assistant with a tool-calling agent loop that dispatches real system actions — entirely offline.",
    tags: ["LangChain", "Ollama", "SpeechRecognition"],
    link: "https://github.com/ankit-k26/VoiceAssistant",
    icon: Microphone,
    color: "#8b5cf6",
  },
];

const MINOR_PROJECTS = [
  { title: "Crossword Puzzle Game", tags: ["C", "GTK4"], link: "https://github.com/ankit-k26?tab=repositories" },
  { title: "Sudoku Game", tags: ["HTML", "CSS", "JS"], link: "https://github.com/ankit-k26?tab=repositories" },
  { title: "Custom New Tab Page", tags: ["HTML", "CSS", "JS"], link: "https://github.com/ankit-k26?tab=repositories" },
];

const STACK_CATEGORIES = [
  { label: "Languages",  items: ["Python", "JavaScript", "C"], icon: Code },
  { label: "Frontend",   items: ["React.js", "Vite", "Tailwind CSS"], icon: Code },
  { label: "Backend",    items: ["Node.js", "Express.js", "MongoDB", "SQLite"], icon: Terminal },
  { label: "AI / ML",    items: ["OpenCV", "TensorFlow", "MediaPipe", "LangChain", "Ollama"], icon: Brain },
  { label: "Tools",      items: ["Git", "PyQt5", "FastAPI"], icon: Robot },
];

const CONTACTS = [
  { icon: GithubLogo,    label: "GitHub",    href: "https://github.com/ankit-k26" },
  { icon: LinkedinLogo,  label: "LinkedIn",  href: "https://www.linkedin.com/in/ankit-kumar-10o26/" },
  { icon: Envelope,      label: "Email",     href: "mailto:ankitmukesh2003@email.com" },
  { icon: InstagramLogo, label: "Instagram", href: "https://www.instagram.com/_.ken_k_/" },
];

/* ─────────────────────────── MOTION VARIANTS ───────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 18 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const staggerFast = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

/* ─────────────────────────── HOOKS ─────────────────────────────────── */

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─────────────────────────── COMPONENTS ────────────────────────────── */

/* Animated section wrapper */
function Section({ children, id, className = "", style = {} }) {
  const [ref, inView] = useInView(0.07);
  return (
    <motion.section
      id={id}
      ref={ref}
      className={className}
      style={style}
      variants={stagger}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {children}
    </motion.section>
  );
}

/* Role typewriter */
function RoleRotator() {
  const [idx, setIdx] = useState(0);
  const [display, setDisplay] = useState("");
  const [phase, setPhase] = useState("typing");
  useEffect(() => {
    const current = ROLES[idx];
    let t;
    if (phase === "typing") {
      if (display.length < current.length) {
        t = setTimeout(() => setDisplay(current.slice(0, display.length + 1)), 52);
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
    <span style={{ color: "var(--cyan)", fontFamily: "'JetBrains Mono', monospace", fontSize: "1rem" }}>
      {display}
      <span className="cursor-blink" style={{
        display: "inline-block", width: "2px", height: "1.1em",
        background: "var(--cyan)", marginLeft: "3px",
        verticalAlign: "middle", borderRadius: "1px",
      }} />
    </span>
  );
}

/* SVG Doodle elements */
function DoodleArrow({ style }) {
  return (
    <svg width="60" height="40" viewBox="0 0 60 40" fill="none" style={style} className="doodle">
      <path d="M4 20 Q30 4 52 20" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" fill="none" strokeDasharray="4 3" />
      <path d="M44 12 L52 20 L44 28" stroke="#00f0ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function DoodleStar({ style, color = "#b6f000" }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={style} className="doodle">
      <path d="M16 2 L18.8 12.2 L29.2 12.2 L21 18.8 L23.8 29 L16 22.4 L8.2 29 L11 18.8 L2.8 12.2 L13.2 12.2 Z"
        fill={color} opacity="0.85" />
    </svg>
  );
}

function DoodleZigzag({ style }) {
  return (
    <svg width="80" height="24" viewBox="0 0 80 24" fill="none" style={style} className="doodle">
      <polyline points="0,20 16,4 32,20 48,4 64,20 80,4"
        stroke="#b6f000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function DoodleCircle({ style, color = "var(--cyan)" }) {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" style={style} className="doodle">
      <circle cx="22" cy="22" r="18" stroke={color} strokeWidth="2.5" strokeDasharray="6 4" fill="none" />
    </svg>
  );
}

function DoodleBrackets({ style }) {
  return (
    <svg width="48" height="36" viewBox="0 0 48 36" fill="none" style={style} className="doodle">
      <path d="M14 4 L4 18 L14 32" stroke="var(--violet)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M34 4 L44 18 L34 32" stroke="var(--violet)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* Floating background orbs */
function BgOrbs() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: "10%", right: "5%",
        width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 70%)",
        borderRadius: "50%",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", left: "-5%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
        borderRadius: "50%",
      }} />
      <div style={{
        position: "absolute", top: "55%", right: "30%",
        width: "350px", height: "350px",
        background: "radial-gradient(circle, rgba(182,240,0,0.04) 0%, transparent 70%)",
        borderRadius: "50%",
      }} />
    </div>
  );
}

/* ─────────────────────────── NAV ────────────────────────────────────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["About", "Projects", "Stack", "Certifications", "Contact"];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        transition: "background 0.4s ease, border-color 0.4s ease",
      }}
      className={scrolled ? "nav-glass" : ""}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "68px" }}>

          {/* Monogram */}
          <a href="#" className="focus-ring" aria-label="Home"
            style={{ display: "flex", alignItems: "center", gap: "0.65rem", textDecoration: "none" }}>
            <motion.span
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: "40px", height: "40px",
                border: "2px solid var(--cyan)", borderRadius: "50%",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700, fontSize: "0.85rem",
                color: "var(--cyan)",
                background: "rgba(0,240,255,0.05)",
              }}>
              AK
            </motion.span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text)" }}>
              Ankit Kumar
            </span>
          </a>

          {/* Desktop nav */}
          <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            {navLinks.map((link) => (
              <motion.a
                key={link}
                href={`#${link}`}
                className="focus-ring hover-line"
                whileHover={{ color: "var(--text)" }}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.82rem", color: "var(--muted)",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  fontWeight: 500,
                }}
              >
                {link}
              </motion.a>
            ))}
            <motion.a
              href="/resume.pdf"
              download
              className="focus-ring btn-primary"
              whileTap={{ scale: 0.96 }}
              style={{ fontSize: "0.8rem", padding: "0.5rem 1.1rem" }}
            >
              <DownloadSimple size={14} weight="bold" /> Resume
            </motion.a>
          </div>

        </div>
      </div>
    </motion.nav>
  );
}

/* ─────────────────────────── HERO ───────────────────────────────────── */

function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [6, -6]);
  const rotateY = useTransform(mouseX, [-300, 300], [-6, 6]);

  function onMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  return (
    <section
      id="home"
      onMouseMove={onMouseMove}
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "0 2rem",
      }}
    >
      {/* Decorative doodles */}
      <DoodleStar style={{ top: "14%", left: "8%", animation: "floatDoodle 4s ease-in-out infinite" }} color="#00f0ff" />
      <DoodleStar style={{ top: "22%", right: "22%", animation: "floatDoodle 5s ease-in-out infinite 0.8s", width: 20, height: 20 }} color="#b6f000" />
      <DoodleArrow style={{ top: "62%", left: "4%", animation: "floatDoodle 6s ease-in-out infinite 0.5s" }} />
      <DoodleZigzag style={{ bottom: "28%", right: "6%", animation: "floatDoodle 5s ease-in-out infinite 1.2s" }} />
      <DoodleCircle style={{ top: "40%", left: "2%", animation: "floatDoodle 7s ease-in-out infinite 2s", width: 60, height: 60 }} />
      <DoodleBrackets style={{ bottom: "18%", left: "14%", animation: "floatDoodle 5.5s ease-in-out infinite 1s", opacity: 0.6 }} />

      {/* Speech bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
        style={{
          position: "absolute", top: "16%", right: "9%",
          background: "var(--lime)", color: "#000",
          borderRadius: "16px 16px 4px 16px",
          padding: "0.85rem 1.1rem",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 800, fontSize: "0.85rem",
          lineHeight: 1.3, textAlign: "center",
          textTransform: "uppercase", letterSpacing: "0.02em",
          maxWidth: "140px",
          boxShadow: "0 4px 20px rgba(182,240,0,0.35)",
          zIndex: 5,
        }}
        className="doodle-hide-mobile"
      >
        Let's Build<br />Something<br />Awesome!
      </motion.div>

      {/* Main content */}
      <div style={{ maxWidth: "1280px", width: "100%", margin: "0 auto", paddingTop: "80px", position: "relative", zIndex: 2 }}>
        <div
          className="hero-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "2rem",
            alignItems: "center",
            minHeight: "80vh",
          }}
        >
          {/* Left — text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
          >
            {/* Status pill */}
            <motion.div variants={fadeUp}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.55rem", marginBottom: "1.75rem" }}>
                <span className="status-dot" style={{
                  display: "inline-block", width: "8px", height: "8px",
                  borderRadius: "50%", background: "var(--cyan)",
                }} />
                <span className="section-label">Open to Full-Stack &amp; AI/ML Roles</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeUp}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, color: "var(--muted)", marginBottom: "0.25rem", fontSize: "1rem" }}>
                Hey, I'm
              </p>
              <h1
                className="font-display"
                style={{
                  fontSize: "clamp(4.5rem, 12vw, 10rem)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.01em",
                  color: "var(--text)",
                  margin: "0 0 0.25rem",
                }}
              >
                ANKIT<br />
                <span style={{
                  WebkitTextStroke: "2px var(--cyan)",
                  color: "transparent",
                }}>
                  KUMAR
                </span>
              </h1>
            </motion.div>

            {/* Role rotator */}
            <motion.div variants={fadeUp} style={{ marginBottom: "1.75rem", marginTop: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ color: "var(--muted)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.9rem" }}>&gt;</span>
                <RoleRotator />
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.div variants={fadeUp}>
              <p style={{
                maxWidth: "480px", color: "var(--text-warm)", lineHeight: 1.75,
                fontSize: "0.95rem", marginBottom: "2.25rem",
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400,
              }}>
                I build things at the intersection of AI, computer vision, and thoughtful software —
                face-authenticated vaults, gesture-controlled interfaces, and local LLM tools that actually ship.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
                <motion.a
                  href="#Projects"
                  className="focus-ring btn-primary"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Projects <ArrowUpRight size={16} weight="bold" />
                </motion.a>
                <motion.a
                  href="https://github.com/ankit-k26"
                  target="_blank" rel="noopener noreferrer"
                  className="focus-ring btn-ghost"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <GithubLogo size={16} weight="fill" /> GitHub
                </motion.a>
                <motion.a
                  href="/resume.pdf"
                  download
                  className="focus-ring btn-ghost"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <DownloadSimple size={16} weight="bold" /> Resume
                </motion.a>
              </div>
            </motion.div>

            {/* Scroll cue */}
            <motion.div variants={fadeUp} style={{ marginTop: "3.5rem" }}>
              <motion.a
                href="#About"
                aria-label="Scroll down"
                className="focus-ring"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  color: "var(--muted)", textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                }}
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <ArrowDown size={14} />
                SCROLL DOWN
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right — hero character */}
          <motion.div
            className="hero-art"
            style={{
              position: "relative",
              width: "clamp(280px, 36vw, 520px)",
              flexShrink: 0,
              perspective: "1000px",
            }}
            style3d={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="float-character"
              style={{ rotateX, rotateY }}
            >
              <img
                src="/hero-character.jpg"
                alt="Ankit Kumar — AI developer illustrated character"
                style={{
                  width: "100%",
                  borderRadius: "24px",
                  display: "block",
                }}
              />
            </motion.div>

            {/* Decorative badge floating on character */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.4, type: "spring", stiffness: 80 }}
              style={{
                position: "absolute",
                bottom: "12%", left: "-15%",
                background: "var(--surface)",
                border: "1px solid var(--border-bright)",
                borderRadius: "12px",
                padding: "0.85rem 1.1rem",
                display: "flex", alignItems: "center", gap: "0.65rem",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
              className="doodle-hide-mobile"
            >
              <span style={{ fontSize: "1.4rem" }}>🤖</span>
              <div>
                <p style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "var(--text)" }}>
                  6 Projects
                </p>
                <p style={{ margin: 0, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "var(--cyan)" }}>
                  Shipped &amp; Live
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.6, type: "spring", stiffness: 80 }}
              style={{
                position: "absolute",
                top: "8%", right: "-12%",
                background: "var(--lime)",
                borderRadius: "10px",
                padding: "0.6rem 0.9rem",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800, fontSize: "0.7rem",
                color: "#000", letterSpacing: "0.04em",
                boxShadow: "0 4px 16px rgba(182,240,0,0.4)",
              }}
              className="doodle-hide-mobile"
            >
              🧠 AI/ML
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── ABOUT ──────────────────────────────────── */

function About() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="About" style={{ padding: "6rem 2rem", position: "relative" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Section header */}
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
            <span className="section-label">About Me</span>
            <DoodleZigzag style={{ opacity: 0.7 }} />
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}
            className="md-grid-2-about">

            {/* Big quote */}
            <motion.div variants={fadeUp}>
              <h2 className="font-display" style={{
                fontSize: "clamp(3.5rem, 7vw, 5.5rem)",
                lineHeight: 1,
                color: "var(--text)",
                margin: "0 0 2rem",
                letterSpacing: "0.01em",
              }}>
                I BUILD<br />
                <span style={{ WebkitTextStroke: "2px var(--lime)", color: "transparent" }}>
                  TO LEARN,
                </span><br />
                AND SHIP<br />
                <span style={{ color: "var(--cyan)" }}>TO GROW.</span>
              </h2>

              {/* Stat grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { num: "6+", label: "Projects Shipped" },
                  { num: "AI", label: "Local-First Tools" },
                  { num: "CV", label: "Computer Vision" },
                  { num: "FS", label: "Full-Stack Dev" },
                ].map((s) => (
                  <motion.div
                    key={s.num}
                    whileHover={{ scale: 1.05, borderColor: "var(--cyan-dim)" }}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      borderRadius: "10px",
                      padding: "1.25rem 1rem",
                    }}
                  >
                    <p className="font-display" style={{ fontSize: "2.5rem", color: "var(--cyan)", margin: 0, lineHeight: 1 }}>{s.num}</p>
                    <p style={{ margin: "0.35rem 0 0", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.78rem", color: "var(--muted)", fontWeight: 500 }}>{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bio */}
            <motion.div variants={fadeUp} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <p style={{ color: "var(--text-warm)", lineHeight: 1.85, fontSize: "0.95rem", fontWeight: 400, margin: 0 }}>
                I'm Ankit, an MCA graduate who builds at the intersection of full-stack development and applied AI.
                I like taking a project from database schema to production-ready UI, and I'm just as comfortable
                designing a REST API as wiring a retrieval-augmented generation pipeline into a working chatbot.
              </p>
              <p style={{ color: "var(--muted)", lineHeight: 1.85, fontSize: "0.95rem", fontWeight: 400, margin: 0 }}>
                My recent work spans a full-stack RAG chatbot built solo with React, Express, and Qdrant Cloud;
                a real-time computer vision system that translates hand gestures into speech; and a local, offline
                voice assistant with LangChain's tool-calling. I'm currently sharpening my grasp of relational
                databases and cloud deployment to round out the full stack.
              </p>

              {/* Tech chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem" }}>
                {["Python", "React.js", "TensorFlow", "FastAPI", "LangChain", "OpenCV", "MongoDB"].map(s => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>

              {/* Currently line */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginTop: "0.5rem", padding: "0.9rem 1.1rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                <span className="status-dot" style={{ display: "inline-block", width: "7px", height: "7px", borderRadius: "50%", background: "var(--lime)", flexShrink: 0 }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.1em" }}>CURRENTLY →</span>
                <RoleRotator />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Inline responsive style */}
      <style>{`
        @media (max-width: 768px) {
          .md-grid-2-about { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────── PROJECTS ───────────────────────────────── */

function Projects() {
  const [ref, inView] = useInView(0.06);

  return (
    <section id="Projects" style={{ padding: "6rem 2rem", position: "relative" }}>
      {/* Background texture */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/projects-bg.jpg')",
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.04,
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          ref={ref}
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span className="section-label">Featured Projects</span>
              <DoodleZigzag style={{ opacity: 0.7 }} />
            </div>
            <motion.a
              href="https://github.com/ankit-k26"
              target="_blank" rel="noopener noreferrer"
              className="focus-ring"
              whileHover={{ x: 4, color: "var(--cyan)" }}
              style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.82rem", color: "var(--muted)", textDecoration: "none" }}
            >
              View All Projects <ArrowRight size={14} />
            </motion.a>
          </motion.div>

          <motion.h2 variants={fadeUp} className="font-display" style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            lineHeight: 1, color: "var(--text)", margin: "0 0 3rem",
          }}>
            THINGS I'VE BUILT
          </motion.h2>
        </motion.div>

        {/* Project grid */}
        <motion.div
          variants={staggerFast}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {PROJECTS.map((p) => {
            const Icon = p.icon;
            return (
              <motion.a
                key={p.title}
                href={p.link}
                target="_blank" rel="noopener noreferrer"
                className="project-card focus-ring"
                variants={fadeUp}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Card header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div style={{
                    width: "48px", height: "48px",
                    background: `rgba(${p.color === "#00f0ff" ? "0,240,255" : p.color === "#b6f000" ? "182,240,0" : "139,92,246"},0.1)`,
                    border: `1px solid ${p.color}33`,
                    borderRadius: "10px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <Icon size={22} weight="duotone" style={{ color: p.color }} />
                  </div>
                  <span style={{ fontSize: "1.6rem" }}>{p.emoji}</span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                  fontSize: "1.1rem", color: "var(--text)", margin: 0,
                }}>
                  {p.title}
                </h3>

                {/* Desc */}
                <p style={{
                  color: "var(--muted)", fontSize: "0.875rem",
                  lineHeight: 1.7, margin: 0, flexGrow: 1,
                }}>
                  {p.desc}
                </p>

                {/* Tags + arrow */}
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "0.75rem" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {p.tags.slice(0, 4).map(t => <span key={t} className="tag">{t}</span>)}
                    {p.tags.length > 4 && <span className="tag">+{p.tags.length - 4}</span>}
                  </div>
                  <ArrowUpRight size={18} style={{ color: "var(--muted)", flexShrink: 0 }} />
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Minor projects */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{ marginTop: "3rem" }}
        >
          <motion.p variants={fadeUp} style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem",
            color: "var(--muted)", letterSpacing: "0.12em", textTransform: "uppercase",
            marginBottom: "1rem",
          }}>
            // Smaller builds
          </motion.p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "0.75rem" }}>
            {MINOR_PROJECTS.map((p) => (
              <motion.a
                key={p.title}
                href={p.link}
                target="_blank" rel="noopener noreferrer"
                className="focus-ring"
                variants={fadeUp}
                whileHover={{ y: -4, borderColor: "var(--cyan-dim)" }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: "8px", padding: "0.9rem 1.1rem", textDecoration: "none",
                }}
              >
                <div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "var(--text-warm)", margin: "0 0 0.35rem" }}>
                    {p.title}
                  </p>
                  <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
                <ArrowUpRight size={14} style={{ color: "var(--muted)", flexShrink: 0, marginLeft: "0.5rem" }} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── STACK ──────────────────────────────────── */

function Stack() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="Stack" style={{ background: "var(--surface)", padding: "6rem 2rem", position: "relative", overflow: "hidden" }}>
      {/* Decorative doodles */}
      <DoodleCircle style={{ top: "10%", right: "5%", opacity: 0.3, width: 80, height: 80, animation: "spinSlow 15s linear infinite" }} color="var(--lime)" />
      <DoodleStar style={{ bottom: "15%", left: "3%", opacity: 0.4, animation: "floatDoodle 6s ease-in-out infinite" }} color="var(--violet)" />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>

          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
            <span className="section-label">Tech Stack</span>
            <DoodleArrow style={{ opacity: 0.7 }} />
          </motion.div>

          <motion.h2 variants={fadeUp} className="font-display" style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1,
            color: "var(--text)", margin: "0 0 3rem",
          }}>
            SKILLS
          </motion.h2>

          <motion.div
            variants={staggerFast}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1.25rem" }}
          >
            {STACK_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.div key={cat.label} variants={fadeUp} className="skill-chip">
                  <Icon size={28} weight="duotone" style={{ color: "var(--cyan)" }} />
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "var(--text)", margin: 0, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {cat.label}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", justifyContent: "center" }}>
                    {cat.items.map(item => (
                      <span key={item} className="tag" style={{ fontSize: "0.58rem" }}>{item}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Marquee strip */}
        <motion.div variants={fadeUp} style={{ marginTop: "4rem", overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, left: 0, width: "6rem", background: "linear-gradient(to right, var(--surface), transparent)", zIndex: 1, pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, right: 0, left: "auto", width: "6rem", background: "linear-gradient(to left, var(--surface), transparent)", zIndex: 1, pointerEvents: "none" }} />
          <div className="marquee-track" style={{ display: "flex", width: "max-content", alignItems: "center" }}>
            {[...STACK_CATEGORIES.flatMap(c => c.items), ...STACK_CATEGORIES.flatMap(c => c.items)].map((s, i) => (
              <span key={i} className="tag" style={{ margin: "0 0.75rem", padding: "0.35rem 0.9rem" }}>{s}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── CERTIFICATIONS ─────────────────────────── */

function Certifications() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="Certifications" style={{ padding: "6rem 2rem", position: "relative" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>

          <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.75rem" }}>
            <span className="section-label">Certifications</span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="font-display" style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1,
            color: "var(--text)", margin: "0 0 3rem",
          }}>
            VERIFIED<br />LEARNING
          </motion.h2>

          <motion.div variants={staggerFast} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {CERTIFICATIONS.map((c) => (
              <motion.a
                key={c.title}
                href={c.link}
                target="_blank" rel="noopener noreferrer"
                className="cert-row focus-ring"
                variants={fadeUp}
                whileTap={{ scale: 0.99 }}
              >
                {/* Icon */}
                <div style={{
                  width: "52px", height: "52px", flexShrink: 0,
                  background: "rgba(0,240,255,0.07)",
                  border: "1px solid var(--border-bright)",
                  borderRadius: "10px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Certificate size={26} weight="duotone" style={{ color: "var(--cyan)" }} />
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--text)", margin: "0 0 0.3rem" }}>
                    {c.title}
                  </p>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "var(--muted)", margin: 0, letterSpacing: "0.05em" }}>
                    {c.issuer} · {c.meta}
                  </p>
                </div>

                {/* Arrow */}
                <ArrowUpRight size={18} style={{ color: "var(--muted)", flexShrink: 0 }} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── CONTACT ────────────────────────────────── */

function Contact() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="Contact" style={{ padding: "7rem 2rem", background: "var(--surface)", position: "relative", overflow: "hidden" }}>
      {/* Big decorative text */}
      <div style={{
        position: "absolute", bottom: "-2rem", left: "50%", transform: "translateX(-50%)",
        fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(6rem, 15vw, 12rem)",
        color: "rgba(0,240,255,0.03)", whiteSpace: "nowrap", pointerEvents: "none",
        userSelect: "none", lineHeight: 1,
      }}>
        CONTACT ME
      </div>

      <DoodleStar style={{ top: "15%", left: "6%", animation: "floatDoodle 5s ease-in-out infinite", opacity: 0.5 }} color="var(--cyan)" />
      <DoodleArrow style={{ bottom: "25%", right: "8%", opacity: 0.5, animation: "floatDoodle 6s ease-in-out infinite 1s", transform: "scaleX(-1) rotate(180deg)" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"} style={{ textAlign: "center" }}>

          <motion.div variants={fadeUp}>
            <span className="section-label" style={{ marginBottom: "1rem", display: "block" }}>Get In Touch</span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="font-display" style={{
            fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 1,
            color: "var(--text)", margin: "0 0 0.5rem",
          }}>
            LET'S MAKE
          </motion.h2>
          <motion.h2 variants={fadeUp} className="font-display" style={{
            fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 1,
            margin: "0 0 2rem",
          }}>
            <span style={{ WebkitTextStroke: "2px var(--lime)", color: "transparent" }}>SOMETHING </span>
            <span style={{
              color: "var(--bg)", background: "var(--lime)",
              borderRadius: "8px", padding: "0 0.4rem",
            }}>DOPE!</span>
          </motion.h2>

          <motion.p variants={fadeUp} style={{
            color: "var(--muted)", fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1rem", maxWidth: "500px", margin: "0 auto 3rem", lineHeight: 1.7,
          }}>
            Open to full-stack and AI/ML roles. Let's build something that actually ships.
          </motion.p>

          {/* Contact links */}
          <motion.div variants={staggerFast} style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center", marginBottom: "3rem" }}>
            {CONTACTS.map((c) => {
              const Icon = c.icon;
              return (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target="_blank" rel="noopener noreferrer"
                  className="contact-pill focus-ring"
                  variants={fadeUp}
                  whileTap={{ scale: 0.96 }}
                >
                  <Icon size={18} weight="fill" />
                  {c.label}
                </motion.a>
              );
            })}
          </motion.div>

          <motion.a
            href="mailto:ankitmukesh2003@email.com"
            className="focus-ring btn-primary"
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{ fontSize: "1rem", padding: "0.9rem 2.5rem" }}
          >
            Say Hello <ArrowUpRight size={18} weight="bold" />
          </motion.a>

        </motion.div>
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
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: "1rem",
    }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.08em" }}>
        ANKIT KUMAR · 2026
      </span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "var(--muted-2)", letterSpacing: "0.05em" }}>
        Built with React + Framer Motion
      </span>
    </footer>
  );
}

/* ─────────────────────────── APP ────────────────────────────────────── */

export default function Portfolio() {
  return (
    <div className="grain" style={{ position: "relative", zIndex: 1 }}>
      <BgOrbs />
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
