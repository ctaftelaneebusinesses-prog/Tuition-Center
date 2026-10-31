import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import Story from './Story';
import Footer from './Footer';
import {
  SITE, waLink, COURSES, COURSE_CATEGORIES, METHOD, FACULTY, FACILITIES, TOPPERS, STATS, GALLERY, TESTIMONIALS, FAQS, BAND, CTA_VIDEO,
} from './data';

const ease = [0.22, 1, 0.36, 1];

function Reveal({ children, delay = 0, y = 40, className, as = 'div' }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </M>
  );
}

function Counter({ value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, value, { duration: 2, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value]);
  return <span ref={ref}>{n.toLocaleString('en-IN')}{suffix}</span>;
}

function Head({ eyebrow, title, text, light, left }) {
  return (
    <Reveal className={`section-head${left ? ' section-head--left' : ''}${light ? ' section-head--light' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}

/* ───────────── Intro book ───────────── */
// Stages: 0 = closed book, 1 = cover opens and pages flip, 2 = camera zooms into the title page.
const LEAVES = [
  { note: 'a² + b² = c²', sub: 'Practise daily ✓' },
  { note: 'A for Ambition', sub: 'B for Belief' },
  { note: 'Chapter 1', sub: 'The first day…' },
];

function Intro({ onDone }) {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setStage((s) => Math.max(s, 1)), reduce ? 200 : 1500);
    return () => clearTimeout(t);
  }, [reduce]);
  useEffect(() => {
    if (stage === 1) {
      const t = setTimeout(() => setStage(2), reduce ? 300 : 2700);
      return () => clearTimeout(t);
    }
    if (stage === 2) {
      const t = setTimeout(onDone, reduce ? 200 : 950);
      return () => clearTimeout(t);
    }
  }, [stage, onDone, reduce]);

  const open = stage >= 1;
  const flip = { duration: 1.3, ease: [0.65, 0, 0.35, 1] };

  return (
    <motion.div className="intro" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <div className="intro-glow" />
      <motion.div
        className="book-stage"
        initial={{ opacity: 0, y: 60, rotateX: 18 }}
        animate={stage === 2 ? { opacity: 0, scale: 2.8, y: 0, rotateX: 0 } : { opacity: 1, y: 0, rotateX: open ? 8 : 14 }}
        transition={stage === 2 ? { duration: 0.95, ease: [0.7, 0, 0.84, 0] } : { duration: 1.2, ease }}
      >
        <motion.div
          className="book"
          animate={{ x: open ? '50%' : '0%' }}
          transition={flip}
          onClick={() => setStage((s) => Math.max(s, 1))}
        >
          {/* Title page, revealed under the cover */}
          <div className="book-page book-page--title">
            <small>Welcome to</small>
            <h1>{SITE.name}</h1>
            <span className="book-rule"><i className="ri-sparkling-2-fill" /></span>
            <p>{SITE.tagline}</p>
            <em>Where every child's story begins.</em>
          </div>

          {/* Pages that flip after the cover */}
          {LEAVES.map((l, i) => (
            <motion.div
              key={i}
              className="book-leaf"
              style={{ zIndex: 10 - i }}
              animate={{ rotateY: open ? -178 + i * 0.6 : 0 }}
              transition={{ ...flip, duration: 1, delay: open ? 0.45 + i * 0.28 : 0 }}
            >
              <div className="leaf-face leaf-front" />
              <div className="leaf-face leaf-back">
                <span className="leaf-note">{l.note}</span>
                <span className="leaf-sub">{l.sub}</span>
                <span className="leaf-no">{(i + 1) * 2}</span>
              </div>
            </motion.div>
          ))}

          {/* Hard cover */}
          <motion.div className="book-cover" style={{ zIndex: 20 }} animate={{ rotateY: open ? -179 : 0 }} transition={flip}>
            <div className="cover-face cover-front">
              <span className="cover-frame" />
              <span className="cover-emblem"><i className="ri-book-open-fill" /></span>
              <strong>{SITE.name}</strong>
              <span className="cover-sub">{SITE.tagline}</span>
              <span className="cover-est">Est. 2011</span>
            </div>
            <div className="cover-face cover-back">
              <div className="bookplate">
                <small>This book belongs to</small>
                <span>Every student of {SITE.name}</span>
              </div>
            </div>
          </motion.div>
          <span className="book-edges" />
        </motion.div>
        <div className="book-shadow" />
      </motion.div>

      <AnimatePresence>
        {stage === 0 && (
          <motion.button className="intro-hint" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.6 }} onClick={() => setStage(1)}>
            <i className="ri-book-open-line" /> Tap to open
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ───────────── Nav ───────────── */
const NAV = [
  ['About', '#about'], ['Courses', '#courses'], ['Method', '#method'], ['Computer Lab', '#lab'],
  ['Faculty', '#faculty'], ['Results', '#results'], ['Gallery', '#gallery'], ['Contact', '#contact'],
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="container nav-inner">
        <svg className="pencil-tip" viewBox="0 0 64 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M64 0 L0 30 L64 60Z" fill="#f7d354" />
          <path d="M64 0 Q57 7.5 64 15 Q57 22.5 64 30 Q57 37.5 64 45 Q57 52.5 64 60" fill="#fbe7a0" />
          <path d="M18 21.5 L0 30 L18 38.5Z" fill="#0b2a1c" />
        </svg>
        <div className="pencil-body">
          <a href="#home" className="brand">
            <span className="brand-mark"><i className="ri-book-open-fill" /></span>
            <span className="brand-text"><strong>{SITE.name}</strong></span>
          </a>
          <span className="pencil-badge">
            <i className="ri-award-line" />
            <span>Trusted by 1,200+<br />families since 2011</span>
          </span>
          <nav className="nav-links" onClick={() => setOpen(false)}>
            {NAV.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
          </nav>
          <a href="#admission" className="pencil-cta">Admissions</a>
          <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Menu">
            <i className={open ? 'ri-close-line' : 'ri-menu-3-line'} />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ───────────── Hero ───────────── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const archScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 15 });
  const sy = useSpring(my, { stiffness: 60, damping: 15 });
  const cardX = useTransform(sx, (v) => v * 30);
  const cardY = useTransform(sy, (v) => v * 30);
  const cardX2 = useTransform(sx, (v) => v * -24);
  const cardY2 = useTransform(sy, (v) => v * -24);

  const onMove = (e) => {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  };

  const words = ['Every', 'child', 'has', 'a', 'story.'];

  return (
    <section className="hero" id="home" ref={ref} onMouseMove={onMove}>
      <div className="hero-grain" />
      <div className="hero-glow" />
      <div className="container hero-grid">
        <motion.div className="hero-copy" style={{ y: textY }}>
          <motion.span className="pill" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
            <i className="ri-sparkling-2-fill" /> Admissions open · 2026–27
          </motion.span>
          <h1>
            {words.map((w, i) => (
              <motion.span key={i} className="word" initial={{ opacity: 0, y: 60, rotateX: -60 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 0.3 + i * 0.08, duration: 0.9, ease }}>
                {w}&nbsp;
              </motion.span>
            ))}
            <br />
            <motion.em initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.9, ease }}>
              We help write the happy ending.
            </motion.em>
          </h1>
          <motion.p className="lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 1 }}>
            For 15 years, {SITE.name} has been the place where nervous first-days turn into proud report cards, through personal attention, patient teaching and a mother's care.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.8 }}>
            <a href="#admission" className="btn btn--gold btn--lg">Book a Free Demo Class <i className="ri-arrow-right-line" /></a>
            <a href={waLink()} target="_blank" rel="noopener" className="btn btn--glass btn--lg"><i className="ri-whatsapp-line" /> WhatsApp Ma'am</a>
          </motion.div>
          <motion.div className="hero-trust" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
            <div className="avatars">
              {['#f5c518', '#ff6b4a', '#4f8cff', '#e84a8a'].map((c, i) => <span key={c} style={{ background: c }}>{['S', 'P', 'R', 'F'][i]}</span>)}
            </div>
            <div>
              <div className="stars">{'★★★★★'}</div>
              <small>Loved by <strong>1,200+ families</strong></small>
            </div>
          </motion.div>
        </motion.div>

        <div className="hero-visual">
          <motion.div className="hero-arch" style={{ scale: archScale }} initial={{ clipPath: 'inset(100% 0 0 0 round 300px 300px 0 0)' }} animate={{ clipPath: 'inset(0% 0 0 0 round 300px 300px 0 0)' }} transition={{ delay: 0.4, duration: 1.4, ease }}>
            <div className="arch-rings" />
          </motion.div>
          <motion.img
            className="hero-maam"
            src="images/maam-2.png"
            alt={`${SITE.founder}, ${SITE.founderTitle}`}
            style={{ y: photoY }}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease }}
          />
          <motion.div className="float-card float-card--1" style={{ x: cardX, y: cardY }} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5, type: 'spring' }}>
            <i className="ri-medal-fill" /><div><strong>98% A-Grade</strong><small>Board results 2025</small></div>
          </motion.div>
          <motion.div className="float-card float-card--2" style={{ x: cardX2, y: cardY2 }} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.7, type: 'spring' }}>
            <i className="ri-user-heart-fill" /><div><strong>Max 15 per batch</strong><small>Personal attention</small></div>
          </motion.div>
          <motion.div className="float-card float-card--3" style={{ x: cardX, y: cardY2 }} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.9, type: 'spring' }}>
            <i className="ri-computer-fill" /><div><strong>Computer Lab</strong><small>1 student : 1 PC</small></div>
          </motion.div>
          <motion.div className="hero-name" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }}>
            <span className="script">with love,</span>
            <strong>{SITE.founder}</strong>
            <small>{SITE.founderTitle}</small>
          </motion.div>
        </div>
      </div>
      <div className="hero-marquee">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>
              Classes 1–12 <i className="ri-star-s-fill" /> State · CBSE · ICSE <i className="ri-star-s-fill" /> IIT & NEET Foundation <i className="ri-star-s-fill" /> Computer Courses <i className="ri-star-s-fill" /> Spoken English <i className="ri-star-s-fill" /> Free Demo Class <i className="ri-star-s-fill" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── About ───────────── */
function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  return (
    <section className="section about" id="about" ref={ref}>
      <div className="container about-grid">
        <div className="about-media">
          <Reveal className="about-frame">
            <div className="about-arch" />
            <motion.img src="images/maam-1.png" alt={SITE.founder} style={{ y }} />
          </Reveal>
          <Reveal className="about-badge" delay={0.3}>
            <strong><Counter value={15} suffix="+" /></strong>
            <span>years of shaping<br />young minds</span>
          </Reveal>
          <Reveal className="about-quote" delay={0.45}>
            <i className="ri-double-quotes-l" />
            <p>Every child can learn. They just need the right teacher, the right time and a lot of encouragement.</p>
          </Reveal>
        </div>
        <div className="about-copy">
          <Reveal><span className="eyebrow">About our institution</span></Reveal>
          <Reveal delay={0.1}><h2>A second home where learning feels like <em>family</em></h2></Reveal>
          <Reveal delay={0.2}>
            <p>{SITE.name} {SITE.tagline} began as a small evening class in {SITE.founder}'s home with just six students. Parents saw the difference, and word spread. Today hundreds of families trust us with their children's education.</p>
            <p>We teach Classes 1 to 12 (State Board, CBSE &amp; ICSE), coach for competitive exams and run a modern computer lab, all under one roof and with the same patient, personal care.</p>
          </Reveal>
          <div className="values">
            {[
              ['ri-focus-3-line', 'Our Vision', 'Confident, curious learners who score well and think well.'],
              ['ri-rocket-2-line', 'Our Mission', 'Concept-first teaching, regular tests and close partnership with parents.'],
              ['ri-heart-3-line', 'Our Promise', 'No child is left behind. Every doubt gets an answer.'],
            ].map(([ic, t, d], i) => (
              <Reveal key={t} className="value" delay={0.25 + i * 0.1}>
                <i className={ic} /><div><h4>{t}</h4><p>{d}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Courses ───────────── */
function Courses() {
  const cats = Object.keys(COURSES);
  const [cat, setCat] = useState(cats[0]);
  const info = COURSE_CATEGORIES[cat];
  return (
    <section className="section courses" id="courses">
      <div className="container">
        <Head eyebrow="Courses & classes" title={<>Programs for every <em>stage</em> of learning</>} text="Choose a category to see each program's subjects, timings and batch size." />
        <div className="catalog">
          <Reveal className="catalog-nav">
            <div role="tablist" aria-label="Course categories">
              {cats.map((c) => (
                <button key={c} role="tab" aria-selected={c === cat} className={`catalog-tab${c === cat ? ' is-active' : ''}`} onClick={() => setCat(c)}>
                  {c === cat && <motion.span layoutId="catalogActive" className="catalog-tab-bg" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
                  <i className={COURSE_CATEGORIES[c].icon} />
                  <span className="catalog-tab-name">{c}</span>
                  <span className="catalog-tab-count">{COURSES[c].length}</span>
                </button>
              ))}
            </div>
            <a className="catalog-help" href={waLink("Hello Ma'am, could you help me choose the right course for my child?")} target="_blank" rel="noopener">
              <i className="ri-customer-service-2-line" />
              <div><strong>Not sure which program?</strong><small>Ma'am will guide you on WhatsApp</small></div>
            </a>
          </Reveal>

          <div className="catalog-main">
            <AnimatePresence mode="wait">
              <motion.div key={cat} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4, ease }}>
                <header className="catalog-head">
                  <h3>{cat}</h3>
                  <p>{info.blurb}</p>
                </header>
                <div className="programs">
                  {COURSES[cat].map((c, i) => (
                    <motion.article
                      key={c.title}
                      className="program"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease }}
                    >
                      <div className="program-main">
                        <span className="program-level">{c.level}</span>
                        <h4>{c.title}</h4>
                        <p>{c.desc}</p>
                        <div className="program-subjects">
                          {c.subjects.map((s) => <span key={s}>{s}</span>)}
                        </div>
                      </div>
                      <dl className="program-meta">
                        <div><dt><i className="ri-time-line" /> Timings</dt><dd>{c.time}</dd></div>
                        <div><dt><i className="ri-group-line" /> Batch size</dt><dd>{c.batch}</dd></div>
                      </dl>
                      <a className="program-cta" href={waLink(`Hello Ma'am, I'd like details about the ${c.title} (${c.level}) program.`)} target="_blank" rel="noopener">
                        Enquire <i className="ri-arrow-right-line" />
                      </a>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Method ───────────── */
function Method() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  return (
    <section className="section method" id="method" ref={ref}>
      <div className="container">
        <Head eyebrow="Teaching methodology" title={<>The <em>4-step</em> method behind every topper</>} text="A simple, proven cycle repeated for every chapter, so nothing is ever left to chance." />
        <div className="method-track">
          <div className="method-line"><motion.span style={{ scaleX: line }} /></div>
          {METHOD.map((m, i) => (
            <Reveal key={m.no} className="method-card" delay={i * 0.12}>
              <div className="method-icon"><i className={m.icon} /></div>
              <span className="method-no">{m.no}</span>
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Computer lab ───────────── */
const CODE = `# my_first_game.py
import random

secret = random.randint(1, 10)
guess = int(input("Guess 1-10: "))

if guess == secret:
    print("You win! 🎉")
else:
    print("Try again, champ!")`;

function Lab() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [typed, setTyped] = useState('');
  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const t = setInterval(() => {
      i += 2;
      setTyped(CODE.slice(0, i));
      if (i >= CODE.length) clearInterval(t);
    }, 35);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <section className="section lab" id="lab">
      <div className="container lab-grid">
        <div>
          <Head left light eyebrow="Our computer facilities" title={<>A modern <em>computer lab</em> for future-ready kids</>} text="Every student practises on their own system, from typing basics to coding real games." />
          <div className="lab-specs">
            {[[25, '', 'Desktop PCs'], [null, '1:1', 'Student to system'], [100, '', 'Mbps internet'], [null, 'UPS', 'Power backup']].map(([v, s, l], i) => (
              <Reveal key={l} className="spec" delay={i * 0.08}>
                <strong>{v ? <Counter value={v} /> : s}</strong><span>{l}</span>
              </Reveal>
            ))}
          </div>
          <Reveal as="ul" className="lab-list" delay={0.2}>
            <li><i className="ri-cpu-line" /> Intel i5 PCs with 8 GB RAM and SSD</li>
            <li><i className="ri-slideshow-3-line" /> Smart projector &amp; digital board</li>
            <li><i className="ri-temp-cold-line" /> Air-conditioned, dust-free lab</li>
            <li><i className="ri-shield-check-line" /> Safe, filtered internet for kids</li>
          </Reveal>
        </div>
        <div className="lab-visual" ref={ref}>
          <motion.div className="monitor" initial={{ rotateY: -25, rotateX: 10, opacity: 0 }} whileInView={{ rotateY: -8, rotateX: 4, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }}>
            <div className="monitor-screen">
              <div className="code-bar"><span /><span /><span /><em>my_first_game.py</em></div>
              <pre className="code">{typed}<b className="caret" /></pre>
            </div>
            <div className="monitor-stand" />
          </motion.div>
          <div className="lab-chips">
            {[['ri-keyboard-box-line', 'Typing'], ['ri-file-excel-2-line', 'MS Office'], ['ri-puzzle-line', 'Scratch'], ['ri-code-s-slash-line', 'Python'], ['ri-global-line', 'Web Design'], ['ri-calculator-line', 'Tally']].map(([ic, t], i) => (
              <motion.span key={t} initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 + i * 0.08, type: 'spring' }}>
                <i className={ic} /> {t}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── Faculty ───────────── */
function Faculty() {
  return (
    <section className="section faculty" id="faculty">
      <div className="container">
        <Head eyebrow="Faculty information" title={<>Meet the teachers who <em>care</em></>} text="Experienced, qualified and patient: our faculty treat every student like their own child." />
        <Reveal className="founder">
          <div className="founder-photo">
            <div className="founder-bg" />
            <img src="images/maam-1.png" alt={SITE.founder} />
          </div>
          <div className="founder-copy">
            <span className="tag">{SITE.founderTitle}</span>
            <h3>{SITE.founder}</h3>
            <p className="founder-meta">{SITE.founderQual}</p>
            <blockquote>"When a parent trusts us with their child, it's a responsibility, not a business. I personally track every student's progress and meet every parent every month."</blockquote>
            <div className="founder-badges">
              <span><i className="ri-award-line" /> Best Teacher Award 2022</span>
              <span><i className="ri-team-line" /> 1,200+ students mentored</span>
              <span><i className="ri-calculator-line" /> Maths specialist</span>
            </div>
          </div>
        </Reveal>
        <div className="faculty-grid">
          {FACULTY.map((f, i) => (
            <Reveal key={f.name} className="teacher" delay={i * 0.1}>
              <div className="teacher-avatar"><span>{f.initials}</span></div>
              <h4>{f.name}</h4>
              <p className="teacher-sub">{f.subject}</p>
              <div className="teacher-meta"><span><i className="ri-graduation-cap-line" /> {f.qual}</span><span><i className="ri-time-line" /> {f.exp}</span></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Facilities ───────────── */
function FacilityCard({ f, i }) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 200, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 200, damping: 18 });
  const glareX = useTransform(mx, [0, 1], ['0%', '100%']);
  const glareY = useTransform(my, [0, 1], ['0%', '100%']);
  const glare = useTransform([glareX, glareY], ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,.75), transparent 55%)`);

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.div
      className="fac3d-wrap"
      initial={{ opacity: 0, y: 60, rotateX: 25 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: (i % 4) * 0.1, ease }}
    >
      <motion.article
        className="fac3d"
        style={{ rotateX, rotateY }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={reduce ? undefined : { z: 30 }}
      >
        <motion.span className="fac3d-glare" style={{ background: glare }} />
        <div className="fac3d-icon" style={{ animationDelay: `${(i % 4) * -0.7}s` }}>
          <span className="fac3d-icon-base" />
          <span className="fac3d-icon-face"><i className={f.icon} /></span>
        </div>
        <span className="fac3d-no">{String(i + 1).padStart(2, '0')}</span>
        <h4>{f.title}</h4>
        <p>{f.text}</p>
      </motion.article>
      <span className="fac3d-shadow" />
    </motion.div>
  );
}

function Facilities() {
  return (
    <section className="section facilities" id="facilities">
      <div className="container">
        <Head eyebrow="Facilities & infrastructure" title={<>Everything a child needs to <em>focus &amp; grow</em></>} />
        <div className="facility-grid">
          {FACILITIES.map((f, i) => <FacilityCard key={f.title} f={f} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Results ───────────── */
function Results() {
  return (
    <section className="section results" id="results">
      <div className="container">
        <Head light eyebrow="Achievements" title={<>Marks that make <em>families proud</em></>} />
        <div className="stats">
          {STATS.map((s, i) => (
            <Reveal key={s.label} className="stat" delay={i * 0.1}>
              <strong><Counter value={s.value} suffix={s.suffix} /></strong>
              <span>{s.label}</span>
            </Reveal>
          ))}
        </div>
        <div className="toppers">
          {TOPPERS.map((t, i) => (
            <motion.div
              key={t.name}
              className={`topper topper--${t.hue}`}
              initial={{ opacity: 0, rotateY: 90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8, ease }}
            >
              <i className="ri-medal-fill topper-medal" />
              <div className="topper-avatar">{t.name[0]}</div>
              <h4>{t.name}</h4>
              <p>{t.cls}</p>
              <strong>{t.score}</strong>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Photo band (scroll-linked) ───────────── */
function PhotoBand() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-30%', '0%']);
  const rows = [BAND.slice(0, 6), BAND.slice(6)];
  return (
    <section className="band" ref={ref} aria-label="Moments from our centre">
      {rows.map((row, r) => (
        <motion.div key={r} className="band-row" style={{ x: r ? x2 : x1 }}>
          {[...row, ...row].map((src, i) => (
            <div key={i} className="band-item"><img src={src} alt="" loading="lazy" /></div>
          ))}
        </motion.div>
      ))}
      <div className="band-label">
        <span>Little moments.</span>
        <em>Big futures.</em>
      </div>
    </section>
  );
}

/* ───────────── Gallery ───────────── */
function GalleryTile({ g, onOpen }) {
  const vref = useRef(null);
  return (
    <motion.button
      layout
      className={`tile ${g.size ? `tile--${g.size}` : ''}`}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.45, ease }}
      onClick={() => onOpen(g)}
      onMouseEnter={() => vref.current?.play().catch(() => {})}
      onMouseLeave={() => vref.current?.pause()}
    >
      {g.type === 'video' ? (
        <video ref={vref} src={g.src} poster={g.poster} muted loop playsInline preload="none" />
      ) : (
        <img src={g.src} alt={g.title} loading="lazy" />
      )}
      {g.type === 'video' && <span className="tile-play"><i className="ri-play-fill" /></span>}
      <span className="tile-cap">
        <small>{g.cat}</small>
        {g.title}
      </span>
    </motion.button>
  );
}

function Gallery() {
  const [filter, setFilter] = useState('all');
  const [item, setItem] = useState(null);
  const items = GALLERY.filter((g) => filter === 'all' || g.type === filter);
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === 'Escape' && setItem(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item]);
  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <Head eyebrow="Gallery" title={<>Life at our <em>tuition centre</em></>} text="Photos and videos of our classrooms, lab, events and celebrations." />
        <Reveal className="tabs tabs--small">
          {[['all', 'All'], ['photo', 'Photos'], ['video', 'Videos']].map(([k, l]) => (
            <button key={k} className={`tab${filter === k ? ' is-active' : ''}`} onClick={() => setFilter(k)}>
              {filter === k && <motion.span layoutId="galPill" className="tab-pill" />}
              <span>{l}</span>
            </button>
          ))}
        </Reveal>
        <motion.div layout className="gallery-grid">
          <AnimatePresence>
            {items.map((g) => <GalleryTile key={g.title} g={g} onOpen={setItem} />)}
          </AnimatePresence>
        </motion.div>
      </div>
      <AnimatePresence>
        {item && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setItem(null)}>
            <motion.figure className="lightbox-body" initial={{ scale: 0.88, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0 }} transition={{ ease }} onClick={(e) => e.stopPropagation()}>
              {item.type === 'video'
                ? <video src={item.src} poster={item.poster} controls autoPlay playsInline />
                : <img src={item.src.replace('w=900', 'w=1600')} alt={item.title} />}
              <figcaption><small>{item.cat}</small>{item.title}</figcaption>
              <button className="lightbox-close" onClick={() => setItem(null)} aria-label="Close"><i className="ri-close-line" /></button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ───────────── Testimonials ───────────── */
function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, [i]);
  const t = TESTIMONIALS[i];
  return (
    <section className="section testimonials">
      <div className="container">
        <Head eyebrow="What parents say" title={<>Trusted by <em>1,200+ families</em></>} />
        <Reveal className="testi">
          <i className="ri-double-quotes-l testi-mark" />
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.5, ease }}>
              <div className="stars">★★★★★</div>
              <blockquote>{t.quote}</blockquote>
              <div className="testi-who">
                <span className="testi-avatar">{t.name[0]}</span>
                <div><strong>{t.name}</strong><small>{t.role}</small></div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="testi-nav">
            <button className="icon-btn" onClick={() => setI((i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} aria-label="Previous"><i className="ri-arrow-left-line" /></button>
            <div className="dots">{TESTIMONIALS.map((_, k) => <button key={k} className={k === i ? 'is-active' : ''} onClick={() => setI(k)} aria-label={`Testimonial ${k + 1}`} />)}</div>
            <button className="icon-btn" onClick={() => setI((i + 1) % TESTIMONIALS.length)} aria-label="Next"><i className="ri-arrow-right-line" /></button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────── Admission ───────────── */
function Admission() {
  return (
    <section className="section admission" id="admission">
      <div className="container admission-grid">
        <div>
          <Head left eyebrow="Admissions 2026–27" title={<>Start your child's <em>success story</em> today</>} text="Joining is simple. Message or call us, visit the centre, and let your child try a free demo class." />
          <ol className="process">
            {[
              ['Reach out', 'WhatsApp, call, or just walk in.'],
              ['Visit & counselling', 'Meet Ma\'am and see our classrooms and lab.'],
              ['Free demo class', 'Your child attends a class before you decide.'],
              ['Join the batch', 'Pick the timing that suits your family.'],
            ].map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 0.1}><span>{i + 1}</span><div><h4>{t}</h4><p>{d}</p></div></Reveal>
            ))}
          </ol>
        </div>
        <Reveal className="admit-card" delay={0.2}>
          <div className="admit-media">
            <img src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1000&q=75&auto=format&fit=crop" alt="Happy students" />
            <span className="admit-badge"><i className="ri-gift-fill" /> Free demo class</span>
          </div>
          <div className="admit-body">
            <h3>Seats are filling fast</h3>
            <p>Every batch has a maximum of 15 students. Reach out today and we'll reserve a demo seat for your child.</p>
            <div className="admit-actions">
              <a href={waLink("Hello Ma'am, I would like to book a free demo class for my child.")} target="_blank" rel="noopener" className="admit-btn admit-btn--wa">
                <i className="ri-whatsapp-fill" /><div><strong>WhatsApp us</strong><small>Replies within minutes</small></div><i className="ri-arrow-right-up-line" />
              </a>
              <a href={`tel:+${SITE.phoneRaw}`} className="admit-btn admit-btn--call">
                <i className="ri-phone-fill" /><div><strong>{SITE.phone}</strong><small>Call between 8 AM – 9 PM</small></div><i className="ri-arrow-right-up-line" />
              </a>
              <a href="#contact" className="admit-btn admit-btn--visit">
                <i className="ri-map-pin-2-fill" /><div><strong>Visit the centre</strong><small>Meet Ma'am in person</small></div><i className="ri-arrow-right-up-line" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────────── FAQ ───────────── */
function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq">
      <div className="container faq-grid">
        <Head left eyebrow="FAQs" title={<>Questions parents <em>often ask</em></>} text={<>Can't find your answer? <a className="link" href={waLink()} target="_blank" rel="noopener">Ask us on WhatsApp</a>.</>} />
        <div className="accordion">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} className={`acc${open === i ? ' is-open' : ''}`} delay={i * 0.05}>
              <button onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}<i className="ri-add-line" />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease }}>
                    <p>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────── Contact ───────────── */
function Contact() {
  const cards = [
    ['ri-map-pin-2-fill', 'Address', SITE.address],
    ['ri-phone-fill', 'Call us', SITE.phone, `tel:+${SITE.phoneRaw}`],
    ['ri-whatsapp-fill', 'WhatsApp', 'Quick replies, 8 AM – 9 PM', waLink()],
    ['ri-mail-fill', 'Email', SITE.email, `mailto:${SITE.email}`],
    ['ri-time-fill', 'Timings', SITE.timings.join(' · ')],
  ];
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <Head eyebrow="Contact & location" title={<>Come visit us. <em>We'd love to meet you.</em></>} />
        <div className="contact-grid">
          <div className="contact-cards">
            {cards.map(([ic, t, d, href], i) => {
              const Tag = href ? 'a' : 'div';
              return (
                <Reveal key={t} delay={i * 0.06}>
                  <Tag className="contact-card" {...(href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noopener' } : {})}>
                    <i className={ic} /><div><h4>{t}</h4><p>{d}</p></div>
                  </Tag>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="map" delay={0.2}>
            <iframe title="Location map" src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`} loading="lazy" />
            <a className="btn btn--green map-btn" href={`https://maps.google.com/?q=${encodeURIComponent(SITE.mapQuery)}`} target="_blank" rel="noopener"><i className="ri-direction-fill" /> Get directions</a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────────── CTA + Footer ───────────── */
function Cta() {
  return (
    <section className="cta-band">
      <video className="cta-video" src={CTA_VIDEO.src} poster={CTA_VIDEO.poster} autoPlay muted loop playsInline />
      <div className="container cta-inner">
        <Reveal>
          <h2>Every great story starts with a <em>first day.</em></h2>
          <p>Seats are limited for 2026–27. Book a free demo class today.</p>
        </Reveal>
        <Reveal className="cta-actions" delay={0.15}>
          <a href="#admission" className="btn btn--gold btn--lg">Book Free Demo</a>
          <a href={waLink()} target="_blank" rel="noopener" className="btn btn--glass btn--lg"><i className="ri-whatsapp-line" /> WhatsApp</a>
        </Reveal>
      </div>
    </section>
  );
}

function Floating() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 800);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <>
      <div className="fab">
        <a href={`tel:+${SITE.phoneRaw}`} className="fab-btn fab-btn--call" aria-label="Call"><i className="ri-phone-fill" /></a>
        <a href={waLink()} target="_blank" rel="noopener" className="fab-btn fab-btn--wa" aria-label="WhatsApp"><i className="ri-whatsapp-fill" /><span className="fab-tip">Chat with Ma'am!</span></a>
      </div>
      <AnimatePresence>
        {show && (
          <motion.button className="to-top" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
            <i className="ri-arrow-up-line" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  // `?nointro` in the URL skips the book intro (handy for previews and testing).
  const [intro, setIntro] = useState(() => !new URLSearchParams(window.location.search).has('nointro'));
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    document.body.style.overflow = intro ? 'hidden' : '';
  }, [intro]);


  return (
    <>
      <AnimatePresence>{intro && <Intro onDone={() => setIntro(false)} />}</AnimatePresence>
      <motion.div className="scroll-progress" style={{ scaleX: bar }} />
      <Nav />
      <main>
        <Hero />
        <Story />
        <About />
        <PhotoBand />
        <Courses />
        <Method />
        <Lab />
        <Faculty />
        <Facilities />
        <Results />
        <Gallery />
        <Testimonials />
        <Admission />
        <Faq />
        <Contact />
        <Cta />
      </main>
      <Footer />
      <Floating />
    </>
  );
}
