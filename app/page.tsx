"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from 'next/dynamic';
import { useTheme } from "next-themes";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Lazily fetch Lottie JSON from /public — avoids bundling heavy JSON into the
// main JS chunk and forces Chrome's V8 to parse it async, not at page load.
function DynamicLottie({ src, style }: { src: string; style?: React.CSSProperties }) {
  const [animData, setAnimData] = useState<object | null>(null);
  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setAnimData(d); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [src]);
  if (!animData) return <div style={{ width: style?.width, height: style?.height }} />;
  return <Lottie animationData={animData} style={style} />;
}
import zidanBg from "../public/zidan-bg.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STICKERS = [
  // name, css-width, left%, top%, initial-rotation, parallax-speed, parallax-direction
  { src: "/stickers/carrot.png", w: 160, l: 2, t: 6, r: -15, spd: 0.3, dir: 1 },
  { src: "/stickers/broccoli.png", w: 160, l: 82, t: 3, r: 12, spd: 0.45, dir: -1 },
  { src: "/stickers/apple.png", w: 180, l: 90, t: 35, r: 20, spd: 0.25, dir: 1 },
  { src: "/stickers/avocado.png", w: 220, l: 1, t: 45, r: -10, spd: 0.35, dir: -1 },
  { src: "/stickers/strawberry.png", w: 220, l: 75, t: 65, r: 18, spd: 0.2, dir: 1 },
  { src: "/stickers/lemon.png", w: 180, l: 10, t: 72, r: -22, spd: 0.4, dir: -1 },
  { src: "/stickers/tomato.png", w: 95, l: 55, t: 2, r: 15, spd: 0.3, dir: 1 },
  { src: "/stickers/corn.png", w: 220, l: 35, t: 80, r: -8, spd: 0.5, dir: -1 },
  { src: "/stickers/pepper.png", w: 180, l: 65, t: 85, r: 25, spd: 0.28, dir: 1 },
  // duplicates at different positions for density
  { src: "/stickers/carrot.png", w: 75, l: 42, t: 10, r: 30, spd: 0.35, dir: -1 },
  { src: "/stickers/lemon.png", w: 70, l: 25, t: 18, r: -18, spd: 0.22, dir: 1 },
  { src: "/stickers/strawberry.png", w: 65, l: 88, t: 50, r: 14, spd: 0.38, dir: -1 },
  { src: "/stickers/avocado.png", w: 80, l: 48, t: 55, r: -25, spd: 0.32, dir: 1 },
  { src: "/stickers/tomato.png", w: 70, l: 15, t: 90, r: 20, spd: 0.42, dir: -1 },
  { src: "/stickers/broccoli.png", w: 65, l: 72, t: 42, r: -12, spd: 0.26, dir: 1 },
  { src: "/stickers/corn.png", w: 75, l: 5, t: 30, r: 16, spd: 0.44, dir: -1 },
  { src: "/stickers/pepper.png", w: 60, l: 30, t: 60, r: -20, spd: 0.3, dir: 1 },
  { src: "/stickers/apple.png", w: 180, l: 60, t: 20, r: 22, spd: 0.48, dir: -1 },
];

const TICKER = [
  "Mobile Dev", "HomeCycle", "Flutter",
  "Firebase", "Eco-Tech", "UI/UX",
];

const SKILLS = [
  { label: "Flutter",        icon: "lottie", src: "/lottie-assets/flutter.json" },
  { label: "Figma",          icon: "lottie", src: "/lottie-assets/figma.json"   },
  { label: "SQLite",         icon: "img",    src: "/lottie-assets/sqlite.svg"   },
  { label: "Git & GitHub",   icon: "lottie", src: "/lottie-assets/github.json"  },
  { label: "TensorFlow Lite",icon: "img",    src: "/lottie-assets/tflite.png"   },
  { label: "FastAPI",        icon: "img",    src: "/lottie-assets/fastapi.svg"  },
  { label: "Python",         icon: "lottie", src: "/lottie-assets/python.json"  },
];

const FEATURES = [
  { lottie: "/lottie-assets/ai.json", text: "Use AI to automatically track product expiration dates" },
  { lottie: "/lottie-assets/inventory.json", text: "Manage your household food inventory more effectively" },
  { lottie: "/lottie-assets/recycle.json", text: "Reduce household food waste with proactive tracking" },
  { lottie: "/lottie-assets/games.json", text: "Complete gamified challenges to earn unique badges" },
  { lottie: "/lottie-assets/reward.json", text: "Collect points and redeem them for vouchers" },
  { lottie: "/lottie-assets/globe.json", text: "Make more sustainable consumption decisions every day" },
];

function Preloader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div id="preloader" className={hidden ? "hidden" : ""}>
      <div className="loader-logo" style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <Image src="/logo-bg.png" alt="HomeCycle Logo" width={80} height={80} style={{ borderRadius: "20px" }} priority />
        HomeCycle
      </div>
    </div>
  );
}

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <button className="theme-toggle" aria-label="Toggle Dark Mode" style={{ width: 40, height: 40 }} />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button 
      className="theme-toggle" 
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle Dark Mode"
    >
      {isDark ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      )}
    </button>
  );
}

function Header({ scrolled }: { scrolled: boolean }) {
  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`} id="main-header">
      <a href="#hero" className="header-logo">
        Zidan <span>Masadita</span><span>.</span>
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <ul className="header-nav">
          <li><a href="#about">About</a></li>
          <li><a href="#homecycle">HomeCycle</a></li>
        </ul>
        <ThemeToggle />
      </div>
    </header>
  );
}

/* BANNER STICKERS (Small) */
function BannerStickers() {
  const refs = useRef<(HTMLImageElement | null)[]>([]);
  const smallStickers = STICKERS.filter(s => s.w < 180);

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const enableWillChange = () => {
      refs.current.forEach((el) => {
        if (el) el.style.willChange = 'transform';
      });
    };
    const disableWillChange = () => {
      refs.current.forEach((el) => {
        if (el) el.style.willChange = 'auto';
      });
    };

    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".banner",
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          enableWillChange();
          if (idleTimer) clearTimeout(idleTimer);
          idleTimer = setTimeout(disableWillChange, 200);

          const p = self.progress;
          refs.current.forEach((el, i) => {
            if (!el) return;
            const s = smallStickers[i];
            const rot = s.r + p * 180 * s.dir;
            const yShift = p * -320 * s.spd;
            gsap.set(el, { y: yShift, rotation: rot });
          });
        },
      });
    });

    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      ctx.revert();
    };
  }, [smallStickers]);


  return (
    <>
      {smallStickers.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          src={s.src}
          alt=""
          className="banner-sticker"
          style={{
            width: `${s.w}px`,
            left: `${s.l}%`,
            top: `${s.t}%`,
            transform: `rotate(${s.r}deg)`,
          }}
          loading="lazy"
          draggable={false}
        />
      ))}
    </>
  );
}

/* GLOBAL STICKERS (Large) */
function GlobalStickers() {
  const refs = useRef<(HTMLImageElement | null)[]>([]);
  const largeStickers = STICKERS.filter(s => s.w >= 180);

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          refs.current.forEach((el, i) => {
            if (!el) return;
            const s = largeStickers[i];
            const yShift = p * window.innerHeight * 1.5 * s.spd * s.dir;
            gsap.set(el, { y: yShift });
          });
        },
      });
    });

    return () => ctx.revert();
  }, [largeStickers]);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", pointerEvents: "none", zIndex: -1 }}>
      {largeStickers.map((s, i) => (
        <div
          key={i}
          ref={(el) => { refs.current[i] = el as unknown as HTMLImageElement; }}
          style={{
            position: "absolute",
            width: `${s.w}px`,
            left: `${s.l}%`,
            top: `${s.t}%`,
            // Offset rotation applied to wrapper so it doesn't conflict
            // with the CSS spin animation's own transform on the img
            transform: `rotate(${s.r}deg)`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.src}
            alt=""
            className={`banner-sticker ${s.dir > 0 ? 'spin-slow' : 'spin-slow-reverse'}`}
            style={{
              position: "relative",
              width: "100%",
              height: "auto",
            }}
            loading="lazy"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}

/* TICKER */
function TickerBar() {
  const items = [...TICKER, ...TICKER, ...TICKER];
  return (
    <div style={{ background: "#74a830", padding: "14px 0", overflow: "clip" }} aria-hidden="true">
      <div className="ticker-track" style={{ display: "flex", whiteSpace: "nowrap", animation: "tickerScroll 20s linear infinite", width: "max-content" }}>
        {items.map((t, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 18, padding: "0 26px", fontWeight: 800, fontSize: ".88rem", color: "#fff", letterSpacing: "1px", textTransform: "uppercase" as const }}>
            <span style={{ width: 6, height: 6, background: "rgba(255,255,255,.45)", borderRadius: "50%", flexShrink: 0 }} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* MAIN PAGE */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true });

    let ctx = gsap.context(() => {
      // Hero text staggered reveal
      gsap.fromTo(".banner-title",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(".banner-subtitle",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.4 }
      );

      const aboutImg = document.querySelector(".about-parallax-img") as HTMLElement | null;
      if (aboutImg) {
        gsap.fromTo(aboutImg,
          { y: -60 },
          {
            y: 60,
            ease: "none",
            scrollTrigger: {
              trigger: ".about-section",
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
              // Apply will-change only while the section is visible to avoid
              // the static will-change + filter GPU/CPU conflict in Chrome
              onEnter: () => { aboutImg.style.willChange = "transform"; },
              onLeave: () => { aboutImg.style.willChange = "auto"; },
              onEnterBack: () => { aboutImg.style.willChange = "transform"; },
              onLeaveBack: () => { aboutImg.style.willChange = "auto"; },
            }
          }
        );
      }

      // Pin Hero and About sections briefly
      gsap.utils.toArray<HTMLElement>([".banner", ".about-section"]).forEach((sec) => {
        ScrollTrigger.create({
          trigger: sec,
          pin: true,
          start: "center center",
          end: "+=25%",
          pinSpacing: true,
        });
      });

      // Pin Skills section and animate the grid items one by one as you scroll
      const skillsSection = document.querySelector(".skills-section");
      if (skillsSection) {
        gsap.fromTo(".skill-pill", 
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1, 
            scale: 1, 
            stagger: 0.1,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: skillsSection,
              pin: true,
              scrub: 1,
              start: "center center",
              end: () => "+=" + (window.innerHeight * 0.8), // Use absolute window height to prevent container height recalculation loop
              pinSpacing: true,
            }
          }
        );
      }

      // Case Study Bento Animation Sequence
      const caseStudySection = document.querySelector(".case-study-section");
      
      if (caseStudySection) {
        gsap.fromTo(".case-rv", 
          { opacity: 0, scale: 0.9, y: 30 },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            stagger: 0.1, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".case-study-section",
              pin: true,
              scrub: 1,
              start: "center center",
              end: () => `+=${window.innerHeight * 0.8}`,
              pinSpacing: true,
            }
          }
        );
      }

      const discoverTrack = document.querySelector(".slider-track") as HTMLElement;
      if (discoverTrack) {
        gsap.to(discoverTrack, {
          x: () => -(discoverTrack.scrollWidth - window.innerWidth + 80),
          ease: "none",
          scrollTrigger: {
            trigger: ".discover-section",
            pin: true,
            scrub: 1,
            start: "center center",
            end: () => `+=${discoverTrack.scrollWidth - window.innerWidth + 80}`,
            invalidateOnRefresh: true,
          }
        });
      }

      // HomeCycle horizontal scroll
      const hcTrack = document.getElementById("homecycle-track");
      if (hcTrack) {
        const mm = gsap.matchMedia();
        mm.add("(min-width: 901px)", () => {
          gsap.to(hcTrack, {
            x: () => -(hcTrack.scrollWidth - window.innerWidth + 100),
            ease: "none",
            scrollTrigger: {
              trigger: "#homecycle",
              pin: true,
              scrub: 1,
              start: "center center",
              end: () => `+=${hcTrack.scrollWidth - window.innerWidth + 100}`,
              invalidateOnRefresh: true,
            }
          });
        });
      }

      // Scroll Reveal Batch (Run this LAST so markers account for pins)
      ScrollTrigger.batch(".rv, .rv-l, .rv-r", {
        onEnter: (elements) => elements.forEach((e) => e.classList.add("in")),
        start: "top 85%",
      });

      // Force GSAP to recalculate all triggers in the correct order
      ScrollTrigger.refresh();
    });

    return () => {
      window.removeEventListener("scroll", h);
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* Global Background Layer */}
      <div style={{ position: "fixed", inset: 0, background: "var(--bg-primary)", zIndex: -2, pointerEvents: "none" }} />

      <Preloader />
      <Header scrolled={scrolled} />

      {/* BANNER */}
      <section id="hero" className="banner" style={{ zIndex: 1, position: "relative" }}>
        <BannerStickers />

        <div className="banner-content">
          <h1 className="banner-title">
            Hi, I&apos;m <span className="hl">Zidan</span>
          </h1>
          <p className="banner-subtitle">
            Mobile developer &amp; creator of <strong>HomeCycle</strong> — an
            app that uses AI to track product expiration dates, enabling you to
            manage food inventory and make sustainable decisions.
          </p>
          <a href="#homecycle" className="banner-cta" id="banner-cta">
            Discover HomeCycle ↓
          </a>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <TickerBar />
      </div>


      {/* ABOUT */}
      <section id="about" className="about-section" style={{ position: "relative", zIndex: 2, background: "var(--bg-secondary)" }}>
        <div className="about-box rv">
          <div className="about-box-visual">
            <Image
              src={zidanBg}
              alt="Zidan using mobile app"
              priority
              style={{ width: "100%", height: "auto", maxWidth: "420px", objectFit: "contain" }}
              className="about-parallax-img"
            />
          </div>
          <div className="about-box-content">
            <h3>
              Learning, building, and growing  <span className="hl">every day.</span>
            </h3>
            <p>
              I&apos;m Zidan Masadita, a mobile developer from Indonesia who enjoys turning ideas into meaningful mobile experiences.
            </p>
            <p>
              Using Flutter, I build clean, scalable, and high-performance applications with a strong focus on usability, design, and long-term maintainability.
            </p>
            <a href="#contact" className="about-cta" id="about-learn-more">
              Let's Connect
            </a>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="skills-section" style={{ position: "relative", zIndex: 2, background: "var(--bg-secondary)" }}>
        <div className="skills-header">
          <h2 style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
            <DynamicLottie src="/lottie-assets/tech.json" style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden" }} />
            <span style={{ color: "inherit" }}>
              Home<span style={{ color: "var(--green)" }}>Cycle</span> Tech Stack
            </span>
          </h2>
        </div>
        <div className="skills-grid">
          {SKILLS.map((s) => (
            <span key={s.label} className="skill-pill">
              <span className="skill-pill-icon">
                {s.icon === "lottie" ? (
                  <DynamicLottie src={s.src} style={{ width: 36, height: 36 }} />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.src} alt="" width={36} height={36} style={{ objectFit: "contain", borderRadius: "50%" }} loading="eager" />
                )}
              </span>
              {s.label}
            </span>
          ))}
        </div>
      </section>

      {/* CASE STUDY SECTION */}
      <section className="case-study-section">
        <div className="case-study-header">
          <h2 style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--text-primary)" }}>
            The Research <span style={{ color: "var(--green)" }}>Behind It</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", marginTop: "12px", fontSize: "1.1rem" }}>
            Key insights shaping HomeCycle's user experience.
          </p>
        </div>

        <div className="case-study-content">
          <div className="case-bento-grid">
            {/* Row 1: 8:4 ratio */}
            <div className="case-bento-card span-8 case-rv">
              <div className="case-card-author">By Jimmy</div>
              <h3 className="case-card-title">The Reality of Food Waste</h3>
              <p className="case-card-content">
                Based on the UNEP Food Waste Index Report 2024, the average individual wastes 70-80kg of food per year at home. The biggest waste happens domestically due to poor consumption behavior, shopping planning, and inventory management.
              </p>
            </div>

            <div className="case-bento-card span-4 case-rv">
              <div className="case-card-author">By Siti Srihartina Faujiah</div>
              <h3 className="case-card-title">The Expiry Disconnect</h3>
              <p className="case-card-content">
                Users check expiry dates when buying, but forget them once stored. HomeCycle acts as a proactive reminder before items spoil.
              </p>
            </div>

            {/* Row 2: 3:3:6 ratio */}
            <div className="case-bento-card span-3 case-rv">
              <div className="case-card-author">By Kharis Ogotan</div>
              <h3 className="case-card-title">A "Second Brain"</h3>
              <p className="case-card-content">
                Food waste is a memory failure. HomeCycle sends automated notifications (e.g., "2 days left for chicken!").
              </p>
            </div>

            <div className="case-bento-card span-3 case-rv">
              <div className="case-card-author">By Zidan Masadita</div>
              <h3 className="case-card-title">AI Simplicity</h3>
              <p className="case-card-content">
                Clutter causes stress. HomeCycle uses an instant AI camera scanner, eliminating manual data entry.
              </p>
            </div>

            <div className="case-bento-card span-6 case-rv">
              <div className="case-card-author">By Rishanda Faliha Sahla</div>
              <h3 className="case-card-title">Changing Behaviors</h3>
              <p className="case-card-content">
                Overbuying and lack of planning are root causes. HomeCycle aims to fundamentally shift household consumption patterns towards sustainable, planned management by addressing environmental and economic impacts.
              </p>
            </div>
          </div>

          {/* Problem Solving Side Card */}
          <div className="problem-solving-side case-rv">
            <div className="case-bento-card" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "32px" }}>
              <h3 className="case-card-title" style={{ fontSize: "1.75rem", marginBottom: "16px", color: "var(--green)" }}>The Solution</h3>
              <p className="case-card-content" style={{ fontSize: "1rem", fontWeight: 500, margin: 0, lineHeight: 1.6 }}>
                <span style={{ color: "var(--green)", fontWeight: 800 }}>HomeCycle</span> is an AI-based household management app designed to help young professionals and urban families tackle food waste, overbuying, and clutter caused by a lack of structured inventory management systems. Through food shelf-life prediction, anti-overbuy shopping lists, zero-waste recipe recommendations, AI-based used item classification, and a sustainable reward system, HomeCycle offers a <span style={{ color: "var(--green)", fontWeight: 800 }}>preventive and personalized solution</span> that not only reduces waste but also builds smarter, eco-friendly consumption habits compared to solutions that only focus on waste management after the fact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DISCOVER (horizontal slider) */}
      <section className="discover-section">
        <div className="discover-title-wrap">
          <h2 className="discover-title">Discover what I do</h2>
        </div>
        <div className="discover-subtitle-wrap">
          <h4 className="discover-subtitle">UI/UX Designer for HomeCycle — transforming user needs into clean, engaging, and functional interfaces.</h4>
        </div>
        <div className="slider-track" id="discover-slider">
          {[
            { img: "/Dashboard.png", label: "HomeCycle Dashboard" },
            { img: "/Inventory.png", label: "HomeCycle Inventory" },
            { img: "/Badge.png", label: "HomeCycle Badge" },
            { img: "/Badge Progression.png", label: "HomeCycle Badge Progression" },
            { img: "/Filter.png", label: "HomeCycle Filters" },
            { img: "/Detail Item.png", label: "HomeCycle Item Details" },
            { img: "/Add-popup.png", label: "HomeCycle Add Item Pop Up" },
            { img: "/Item Scanned.png", label: "HomeCycle Item Scanned" },
            { img: "/Shop.png", label: "HomeCycle Shop" },
            { img: "/Voucher Detail.png", label: "HomeCycle Voucher Reward Detail" },
          ].map((card, i) => (
            <div key={i} className="slider-card" id={`slider-card-${i}`}>
              <Image
                src={card.img}
                alt={card.label}
                width={320}
                height={346}
                className="slider-card-img"
                style={{ width: "100%", height: "auto" }}
                priority={i === 0}
              />
              <div className="slider-card-label">{card.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOMECYCLE PROJECT */}
      <section id="homecycle" className="project-section" style={{ zIndex: 10, position: "relative" }}>
        <div className="project-header">
          <span className="project-eyebrow">Featured Project</span>
          <h2 className="project-title">Meet <span style={{ color: "inherit" }}>
            Home<span style={{ color: "var(--green)" }}>Cycle</span>
          </span></h2>
        </div>

        <div className="homecycle-track" id="homecycle-track">
          {/* Col 1: Phone */}
          <div className="homecycle-col phone-col">
            <div className="phone-frame rv-l">
              <div className="phone-orbit" />
              <div className="phone-orbit phone-orbit-2" />
              <Image
                src="/homecycle_phone_dashboard.png"
                alt="HomeCycle mobile app UI"
                width={260}
                height={520}
                className="phone-frame-img"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>

          {/* Col 2: Info */}
          <div className="homecycle-col info-col">
            <div className="project-info rv-r">
              <h2 className="project-name" id="homecycle-name"><span style={{ color: "inherit" }}>
                Home<span style={{ color: "var(--green)" }}>Cycle</span>
              </span></h2>
              <div className="project-tagline" style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <DynamicLottie src="/lottie-assets/ai.json" style={{ width: 24, height: 24 }} /> AI Tracking <span style={{ opacity: 0.5 }}>·</span>
                <DynamicLottie src="/lottie-assets/games.json" style={{ width: 24, height: 24 }} /> Gamification <span style={{ opacity: 0.5 }}>·</span>
                <DynamicLottie src="/lottie-assets/reward.json" style={{ width: 24, height: 24 }} /> Rewards
              </div>
              <p className="project-desc">
                HomeCycle helps reduce household food waste by using AI to track product expiration dates and manage food inventory more effectively. Through gamified challenges and badges, users can collect points to redeem for vouchers, making sustainable consumption decisions both fun and rewarding.
              </p>

              <div className="tech-tags rv">
                {SKILLS.map((s) => (
                  <span key={s.label} className="tech-tag">
                    <span className="tech-tag-icon">
                      {s.icon === "lottie" ? (
                        <DynamicLottie src={s.src} style={{ width: 24, height: 24 }} />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={s.src} alt="" width={24} height={24} style={{ objectFit: "contain" }} loading="eager" />
                      )}
                    </span>
                    {s.label}
                  </span>
                ))}
              </div>

              <div className="project-btns">
                <a href="#contact" className="btn-outline-dark" id="project-learn-more">
                  Learn More
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Bento Grid */}
          <div className="homecycle-col bento-col">
            <div className="bento-features">
              {FEATURES.map((f, i) => (
                <div key={i} className="bento-card rv">
                  <div className="bento-icon-wrapper">
                    <DynamicLottie src={f.lottie} style={{ width: 80, height: 80 }} />
                  </div>
                  <p>{f.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Badges */}
          <div className="homecycle-col badges-col">
            <h3 className="badges-title" style={{ display: "flex", alignItems: "center", gap: "16px", justifyContent: "center" }}>
              <Image src="/logo-bg.png" alt="HomeCycle Logo" width={48} height={48} style={{ borderRadius: "12px" }} />
              <span style={{ color: "inherit" }}>
                Home<span style={{ color: "var(--green)" }}>Cycle</span> Badges
              </span>
            </h3>
            <div className="badges-grid rv">
              <div className="badge-wrapper">
                <Image src="/Eco-Starter Badge.png" alt="Eco-Starter Unlocked" fill sizes="180px" className="badge-img unlocked" />
                <Image src="/Eco-Starter Locked Badge.png" alt="Eco-Starter Locked" fill sizes="180px" className="badge-img locked" />
              </div>
              <div className="badge-wrapper">
                <Image src="/Eco-Hero Badge.png" alt="Eco-Hero Unlocked" fill sizes="180px" className="badge-img unlocked" />
                <Image src="/Eco-Hero Locked Badge.png" alt="Eco-Hero Locked" fill sizes="180px" className="badge-img locked" />
              </div>
              <div className="badge-wrapper">
                <Image src="/Eco-Champion Badge.png" alt="Eco-Champion Unlocked" fill sizes="180px" className="badge-img unlocked" />
                <Image src="/Eco-Champion Locked Badge.png" alt="Eco-Champion Locked" fill sizes="180px" className="badge-img locked" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="contact-section"
        style={{
          position: "relative",
          zIndex: 20,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center"
        }}
      >
        <div className="rv" style={{ width: "100%", maxWidth: "600px" }}>
          <h2 className="contact-title">
            Let's build something meaningful<span className="hl"> together.</span>
          </h2>
          <p className="contact-sub">
            Want to collaborate on eco-tech, chat about HomeCycle, or just say
            hi? My inbox is always open.
          </p>
          <div className="contact-btns">
            <a href="mailto:masadita20@gmail.com" className="btn-green-fill" id="contact-email">
              <span className="contact-btn-icon">
                <DynamicLottie src="/lottie-assets/gmail.json" style={{ width: 28, height: 28 }} />
              </span>
              Send an Email
            </a>
            <a
              href="https://www.linkedin.com/in/zidan-masadita-586173384/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              id="contact-linkedin"
            >
              <span className="contact-btn-icon">
                <DynamicLottie src="/lottie-assets/linkedin.json" style={{ width: 28, height: 28 }} />
              </span>
              LinkedIn
            </a>
            <a
              href="https://github.com/zidanmasadita"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              id="contact-github"
            >
              <span className="contact-btn-icon">
                <DynamicLottie src="/lottie-assets/github.json" style={{ width: 28, height: 28 }} />
              </span>
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" style={{ position: "relative", zIndex: 20 }}>
        <p className="footer-text">
          Created by <strong>Zidan Masadita</strong> · HomeCycle Creator · {new Date().getFullYear()}
        </p>
      </footer>

      {/* GLOBAL STICKERS */}
      <GlobalStickers />
    </>
  );
}
