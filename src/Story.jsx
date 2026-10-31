import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { STORY, SITE } from './data';

const CONFETTI_COLORS = ['#f5c518', '#ff6b4a', '#1f8a5b', '#4f8cff', '#ffffff', '#e84a8a'];

function Stage({ scene, walking }) {
  const confetti = useMemo(
    () =>
      Array.from({ length: 70 }, (_, i) => ({
        x: Math.random() * 1000,
        delay: Math.random() * 1.6,
        dur: 2.2 + Math.random() * 1.8,
        rot: Math.random() * 360,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        w: 6 + Math.random() * 6,
      })),
    []
  );

  return (
    <svg
      className={`stage${walking ? ' is-walking' : ''}`}
      data-scene={scene}
      viewBox="0 0 1000 560"
      role="img"
      aria-label="Animated story: the door opens, children arrive with a parent, the parent meets Ma'am, Ma'am teaches, children study and get top marks."
    >
      <defs>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff8e8" />
          <stop offset="1" stopColor="#fdebc4" />
        </linearGradient>
        <pattern id="floorBoards" width="90" height="120" patternUnits="userSpaceOnUse">
          <rect width="90" height="120" fill="#d9a066" />
          <rect width="2" height="120" fill="#c4874d" />
          <rect x="44" y="60" width="2" height="60" fill="#c4874d" opacity=".6" />
        </pattern>
        <radialGradient id="doorLight" cx="0.5" cy="0.6" r="0.7">
          <stop offset="0" stopColor="#fffbe0" />
          <stop offset="1" stopColor="#ffd66b" />
        </radialGradient>
      </defs>

      {/* Room */}
      <rect width="1000" height="440" fill="url(#wallGrad)" />
      <rect y="396" width="1000" height="44" fill="#0f3d2e" opacity=".9" />
      <rect y="440" width="1000" height="120" fill="url(#floorBoards)" />
      <rect y="436" width="1000" height="7" fill="#b9773f" />

      {/* Bunting */}
      <path d="M0 22 Q250 52 500 22 T1000 22" fill="none" stroke="#a0693a" strokeWidth="2" />
      <g>
        <path d="M40 27 l24 2 -10 26z" fill="#ff6b4a" />
        <path d="M110 34 l24 2 -12 26z" fill="#f5c518" />
        <path d="M180 38 l24 1 -12 26z" fill="#1f8a5b" />
        <path d="M250 38 l24 -1 -12 26z" fill="#4f8cff" />
        <path d="M320 34 l24 -2 -10 26z" fill="#ff6b4a" />
        <path d="M820 34 l24 -2 -12 26z" fill="#f5c518" />
        <path d="M890 30 l24 -3 -12 26z" fill="#1f8a5b" />
        <path d="M955 25 l24 -2 -10 26z" fill="#4f8cff" />
      </g>

      {/* Clock */}
      <g transform="translate(300 120)">
        <circle r="30" fill="#fff" stroke="#0f3d2e" strokeWidth="5" />
        <line className="clock-hand-h" x1="0" y1="0" x2="0" y2="-15" stroke="#0f3d2e" strokeWidth="4" strokeLinecap="round" />
        <line className="clock-hand-m" x1="0" y1="0" x2="0" y2="-22" stroke="#ff6b4a" strokeWidth="3" strokeLinecap="round" />
        <circle r="3" fill="#0f3d2e" />
      </g>

      {/* Window */}
      <g transform="translate(850 90)">
        <rect width="120" height="150" rx="8" fill="#8fd3ff" stroke="#fff" strokeWidth="8" />
        <circle cx="85" cy="40" r="18" fill="#ffd34d" />
        <path d="M10 120 Q40 95 70 118 T120 110 V150 H0Z" fill="#7bd389" />
        <path d="M60 0 V150 M0 75 H120" stroke="#fff" strokeWidth="6" />
      </g>

      {/* Plant */}
      <g transform="translate(945 440)">
        <path d="M-22 0 L-18 -40 H18 L22 0Z" fill="#e2725b" />
        <path d="M0 -40 C-30 -70 -34 -100 -8 -120 C-4 -90 0 -70 0 -40Z" fill="#3fa36b" />
        <path d="M0 -40 C26 -64 40 -95 20 -118 C10 -88 6 -70 0 -40Z" fill="#52b788" />
      </g>

      {/* Blackboard */}
      <g>
        <rect x="400" y="58" width="400" height="206" rx="10" fill="#7a4a28" />
        <rect x="412" y="70" width="376" height="182" rx="4" fill="#1d4a37" />
        <rect x="420" y="258" width="360" height="8" rx="3" fill="#5c3519" />
        <rect x="700" y="252" width="22" height="7" rx="2" fill="#fff" />
        <g className="chalk chalk--welcome">
          <text x="600" y="150" textAnchor="middle" className="chalk-big">Welcome!</text>
          <text x="600" y="196" textAnchor="middle" className="chalk-small">Learn · Practise · Shine ✦</text>
        </g>
        <g className="chalk chalk--lesson">
          <text x="432" y="112" className="chalk-small">Today: Pythagoras</text>
          <text x="432" y="160" className="chalk-mid">a² + b² = c²</text>
          <text x="432" y="205" className="chalk-small">3² + 4² = 5² ✓</text>
          <path className="chalk-draw" d="M660 225 L760 225 L660 105 Z" fill="none" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
          <path className="chalk-draw" d="M660 210 H675 V225" fill="none" stroke="#fff" strokeWidth="2" />
        </g>
        <g className="chalk chalk--study">
          <text x="600" y="128" textAnchor="middle" className="chalk-mid">Practice Time ✎</text>
          <text x="600" y="172" textAnchor="middle" className="chalk-small">Worksheet 12 · Lab: MS Excel</text>
          <text x="600" y="210" textAnchor="middle" className="chalk-small">Weekly Test – Saturday</text>
        </g>
      </g>

      {/* Door */}
      <g>
        <rect x="48" y="176" width="156" height="264" rx="6" fill="#7a4a28" />
        <rect x="58" y="188" width="136" height="252" fill="url(#doorLight)" />
        <path className="door-rays" d="M126 440 L50 560 H202Z" fill="#fff3b0" opacity=".55" />
        <g className="door-panel">
          <rect x="58" y="188" width="136" height="252" fill="#0f3d2e" />
          <rect x="72" y="204" width="108" height="96" rx="5" fill="none" stroke="#d4a017" strokeWidth="4" />
          <rect x="72" y="316" width="108" height="108" rx="5" fill="none" stroke="#d4a017" strokeWidth="4" />
          <circle cx="178" cy="318" r="7" fill="#f5c518" />
          <g transform="translate(126 252)">
            <rect x="-40" y="-16" width="80" height="30" rx="6" fill="#f5c518" />
            <text textAnchor="middle" y="5" className="door-sign">OPEN</text>
          </g>
        </g>
        <rect x="40" y="166" width="172" height="14" rx="4" fill="#5c3519" />
        <text x="126" y="160" textAnchor="middle" className="door-name">{SITE.name.toUpperCase()}</text>
      </g>

      {/* Teacher: yellow saree with green border, like Ma'am */}
      <g className="actor actor--teacher">
        <g className="bob">
          <ellipse cx="0" cy="0" rx="44" ry="8" fill="#000" opacity=".14" />
          <ellipse cx="-12" cy="-4" rx="11" ry="5" fill="#5a3a22" />
          <ellipse cx="12" cy="-4" rx="11" ry="5" fill="#5a3a22" />
          <path d="M-30 -112 L-42 -6 Q0 2 42 -6 L30 -112Z" fill="#e8c21a" />
          <path d="M-42 -12 Q0 -4 42 -12" stroke="#0f5132" strokeWidth="8" fill="none" />
          <path d="M-42 -12 Q0 -4 42 -12" stroke="#d4a017" strokeWidth="2" fill="none" />
          <path d="M-8 -100 L-12 -16 M4 -100 L6 -16 M16 -100 L22 -16" stroke="#c9a40c" strokeWidth="2" />
          <g className="arm arm-l">
            <rect x="-40" y="-162" width="13" height="64" rx="6.5" fill="#a86d47" />
            <rect x="-41" y="-163" width="15" height="20" rx="6" fill="#0f5132" />
            <circle cx="-33.5" cy="-101" r="2.2" fill="#d4a017" />
          </g>
          <g className="arm arm-r">
            <line className="pointer" x1="33" y1="-104" x2="33" y2="-20" stroke="#6b3e1f" strokeWidth="4" strokeLinecap="round" />
            <rect x="27" y="-162" width="13" height="64" rx="6.5" fill="#a86d47" />
            <rect x="26" y="-163" width="15" height="20" rx="6" fill="#0f5132" />
            <rect x="28" y="-108" width="11" height="5" rx="2" fill="#c0c7d2" />
          </g>
          <path d="M-27 -160 Q0 -170 27 -160 L31 -108 L-31 -108Z" fill="#0f5132" />
          <path d="M-27 -162 L-4 -164 L33 -104 L12 -96Z" fill="#e8c21a" />
          <path d="M-4 -164 L33 -104" stroke="#0f5132" strokeWidth="6" />
          <path d="M-4 -164 L33 -104" stroke="#d4a017" strokeWidth="1.5" />
          <rect x="-6" y="-176" width="12" height="16" fill="#9a603d" />
          <g className="head">
            <circle cx="0" cy="-196" r="27" fill="#1b1b1b" />
            <circle cx="0" cy="-224" r="12" fill="#1b1b1b" />
            <circle cx="0" cy="-192" r="23" fill="#a86d47" />
            <circle cx="-23" cy="-186" r="3" fill="#f5c518" />
            <circle cx="23" cy="-186" r="3" fill="#f5c518" />
            <path d="M-24 -194 Q-21 -220 0 -218 Q21 -220 24 -194 Q12 -208 0 -205 Q-12 -208 -24 -194Z" fill="#1b1b1b" />
            <circle cx="-8" cy="-191" r="2.6" fill="#2b1a12" />
            <circle cx="8" cy="-191" r="2.6" fill="#2b1a12" />
            <path d="M-12 -198 Q-8 -201 -4 -198 M4 -198 Q8 -201 12 -198" stroke="#1b1b1b" strokeWidth="1.5" fill="none" />
            <circle cx="-14" cy="-184" r="3.5" fill="#ff8a8a" opacity=".35" />
            <circle cx="14" cy="-184" r="3.5" fill="#ff8a8a" opacity=".35" />
            <path d="M-7 -180 Q0 -174 7 -180" stroke="#7a3b2e" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <circle cx="0" cy="-204" r="2.4" fill="#c62828" />
          </g>
        </g>
      </g>

      {/* Parent */}
      <g className="actor actor--parent">
        <g className="bob">
          <ellipse cx="0" cy="0" rx="42" ry="8" fill="#000" opacity=".14" />
          <g className="leg leg-l"><rect x="-20" y="-96" width="17" height="92" rx="4" fill="#4a5568" /><ellipse cx="-12" cy="-4" rx="12" ry="5" fill="#222" /></g>
          <g className="leg leg-r"><rect x="3" y="-96" width="17" height="92" rx="4" fill="#4a5568" /><ellipse cx="12" cy="-4" rx="12" ry="5" fill="#222" /></g>
          <g className="arm arm-l"><rect x="-41" y="-168" width="14" height="72" rx="7" fill="#4f8cff" /><circle cx="-34" cy="-94" r="7" fill="#a8714a" /></g>
          <g className="arm arm-r"><rect x="27" y="-168" width="14" height="72" rx="7" fill="#4f8cff" /><circle cx="34" cy="-94" r="7" fill="#a8714a" /></g>
          <path d="M-30 -170 Q0 -180 30 -170 L28 -92 L-28 -92Z" fill="#4f8cff" />
          <path d="M0 -164 V-96" stroke="#2f6fe0" strokeWidth="2" />
          <rect x="-28" y="-100" width="56" height="8" fill="#2d3748" />
          <rect x="-6" y="-182" width="12" height="14" fill="#96613d" />
          <path d="M-11 -174 L0 -160 L11 -174" fill="#fff" />
          <circle cx="0" cy="-202" r="24" fill="#a8714a" />
          <path d="M-25 -206 Q-24 -232 0 -230 Q24 -232 25 -206 Q20 -219 0 -217 Q-20 -219 -25 -206Z" fill="#1b1b1b" />
          <circle cx="-8" cy="-203" r="2.6" fill="#1b1b1b" />
          <circle cx="8" cy="-203" r="2.6" fill="#1b1b1b" />
          <path d="M-10 -192 Q0 -197 10 -192 Q0 -188 -10 -192Z" fill="#1b1b1b" />
          <path d="M-6 -185 Q0 -181 6 -185" stroke="#5c2e1a" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      </g>

      {/* Boy */}
      <g className="actor actor--boy">
        <g className="bob">
          <ellipse cx="0" cy="0" rx="28" ry="6" fill="#000" opacity=".14" />
          <rect x="-24" y="-100" width="48" height="44" rx="10" fill="#ff6b4a" />
          <g className="leg leg-l"><rect x="-13" y="-42" width="10" height="38" rx="4" fill="#b07a52" /><ellipse cx="-8" cy="-4" rx="9" ry="4.5" fill="#222" /></g>
          <g className="leg leg-r"><rect x="3" y="-42" width="10" height="38" rx="4" fill="#b07a52" /><ellipse cx="8" cy="-4" rx="9" ry="4.5" fill="#222" /></g>
          <rect x="-17" y="-64" width="34" height="26" rx="4" fill="#1e3a8a" />
          <g className="arm arm-l"><rect x="-27" y="-98" width="10" height="40" rx="5" fill="#fff" stroke="#dbe4f0" /><circle cx="-22" cy="-57" r="5" fill="#b07a52" /></g>
          <g className="arm arm-r"><rect x="17" y="-98" width="10" height="40" rx="5" fill="#fff" stroke="#dbe4f0" /><circle cx="22" cy="-57" r="5" fill="#b07a52" /></g>
          <path d="M-18 -100 Q0 -106 18 -100 L17 -60 L-17 -60Z" fill="#fff" stroke="#dbe4f0" />
          <path d="M-12 -100 V-62 M12 -100 V-62" stroke="#e0502f" strokeWidth="4" />
          <path d="M0 -100 L-4 -92 L0 -76 L4 -92Z" fill="#dc2626" />
          <circle cx="0" cy="-120" r="19" fill="#b07a52" />
          <path d="M-20 -122 Q-18 -144 2 -142 Q20 -142 20 -122 L14 -132 L8 -126 L2 -134 L-6 -127 L-12 -133Z" fill="#1b1b1b" />
          <circle cx="-6" cy="-119" r="2.3" fill="#1b1b1b" />
          <circle cx="6" cy="-119" r="2.3" fill="#1b1b1b" />
          <path d="M-5 -111 Q0 -107 5 -111" stroke="#5c2e1a" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      </g>

      {/* Girl */}
      <g className="actor actor--girl">
        <g className="bob">
          <ellipse cx="0" cy="0" rx="28" ry="6" fill="#000" opacity=".14" />
          <rect x="-24" y="-100" width="48" height="44" rx="10" fill="#e84a8a" />
          <g className="leg leg-l"><rect x="-12" y="-42" width="9" height="38" rx="4" fill="#c08a60" /><ellipse cx="-8" cy="-4" rx="9" ry="4.5" fill="#222" /></g>
          <g className="leg leg-r"><rect x="3" y="-42" width="9" height="38" rx="4" fill="#c08a60" /><ellipse cx="8" cy="-4" rx="9" ry="4.5" fill="#222" /></g>
          <path d="M-16 -66 L-24 -36 H24 L16 -66Z" fill="#1e3a8a" />
          <g className="arm arm-l"><rect x="-26" y="-98" width="9" height="38" rx="4.5" fill="#fff" stroke="#dbe4f0" /><circle cx="-21.5" cy="-59" r="5" fill="#c08a60" /></g>
          <g className="arm arm-r"><rect x="17" y="-98" width="9" height="38" rx="4.5" fill="#fff" stroke="#dbe4f0" /><circle cx="21.5" cy="-59" r="5" fill="#c08a60" /></g>
          <path d="M-17 -100 Q0 -106 17 -100 L16 -64 L-16 -64Z" fill="#fff" stroke="#dbe4f0" />
          <path d="M-11 -100 V-66 M11 -100 V-66" stroke="#c43a74" strokeWidth="4" />
          <circle cx="-22" cy="-112" r="9" fill="#1b1b1b" />
          <circle cx="22" cy="-112" r="9" fill="#1b1b1b" />
          <circle cx="-20" cy="-122" r="4" fill="#ef4444" />
          <circle cx="20" cy="-122" r="4" fill="#ef4444" />
          <circle cx="0" cy="-120" r="18" fill="#c08a60" />
          <path d="M-19 -120 Q-18 -142 0 -141 Q18 -142 19 -120 Q10 -132 0 -130 Q-10 -132 -19 -120Z" fill="#1b1b1b" />
          <circle cx="-6" cy="-118" r="2.3" fill="#1b1b1b" />
          <circle cx="6" cy="-118" r="2.3" fill="#1b1b1b" />
          <circle cx="-11" cy="-112" r="3" fill="#ff8a8a" opacity=".6" />
          <circle cx="11" cy="-112" r="3" fill="#ff8a8a" opacity=".6" />
          <path d="M-5 -110 Q0 -106 5 -110" stroke="#5c2e1a" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      </g>

      {/* Desks + props */}
      <g className="desks">
        <g transform="translate(560 0)">
          <rect x="-66" y="428" width="132" height="12" rx="3" fill="#8b5a2b" />
          <rect x="-60" y="440" width="120" height="74" rx="4" fill="#a0693a" />
          <rect x="-48" y="452" width="96" height="10" rx="3" fill="#8b5a2b" />
          <g className="prop">
            <path d="M-30 428 Q-15 418 0 426 Q15 418 30 428Z" fill="#fff" stroke="#1f8a5b" strokeWidth="2" />
          </g>
        </g>
        <g transform="translate(740 0)">
          <rect x="-66" y="428" width="132" height="12" rx="3" fill="#8b5a2b" />
          <rect x="-60" y="440" width="120" height="74" rx="4" fill="#a0693a" />
          <rect x="-48" y="452" width="96" height="10" rx="3" fill="#8b5a2b" />
          <g className="prop">
            <path d="M-28 428 L-22 396 H22 L28 428Z" fill="#0f3d2e" />
            <rect x="-18" y="400" width="36" height="22" fill="#1f8a5b" />
            <path d="M-14 406 H4 M-14 411 H10 M-14 416 H0" stroke="#fff" strokeWidth="2" />
            <rect x="-34" y="426" width="68" height="4" rx="2" fill="#64748b" />
          </g>
        </g>
      </g>

      {/* Ideas */}
      {[560, 740].map((x, i) => (
        <g key={x} transform={`translate(${x} 335)`}>
          <g className={`idea idea--${i + 1}`}>
            <circle r="15" fill="#ffd34d" />
            <rect x="-6" y="13" width="12" height="8" rx="2" fill="#94a3b8" />
            <path d="M-24 -14 l-8 -6 M24 -14 l8 -6 M0 -22 v-10" stroke="#ffd34d" strokeWidth="3" strokeLinecap="round" />
          </g>
        </g>
      ))}

      {/* Speech bubbles */}
      <g className="bubble bubble--parent">
        <path d="M330 160 h210 a14 14 0 0 1 14 14 v46 a14 14 0 0 1 -14 14 h-80 l-10 18 -14 -18 h-106 a14 14 0 0 1 -14 -14 v-46 a14 14 0 0 1 14 -14z" fill="#fff" stroke="#0f3d2e" strokeWidth="2.5" />
        <text x="435" y="190" textAnchor="middle" className="bubble-text">Will my child get</text>
        <text x="435" y="212" textAnchor="middle" className="bubble-text">personal attention?</text>
      </g>
      <g className="bubble bubble--teacher">
        <path d="M600 112 h230 a14 14 0 0 1 14 14 v46 a14 14 0 0 1 -14 14 h-130 l-14 18 -8 -18 h-78 a14 14 0 0 1 -14 -14 v-46 a14 14 0 0 1 14 -14z" fill="#fff8e1" stroke="#d4a017" strokeWidth="2.5" />
        <text x="715" y="142" textAnchor="middle" className="bubble-text">Of course! Small batches</text>
        <text x="715" y="164" textAnchor="middle" className="bubble-text">&amp; daily progress reports.</text>
      </g>

      {/* Result */}
      <g className="result">
        <g className="result-card">
          <rect x="380" y="48" width="240" height="214" rx="14" fill="#fff" stroke="#0f3d2e" strokeWidth="3" />
          <path d="M380 92 V62 a14 14 0 0 1 14 -14 h212 a14 14 0 0 1 14 14 V92Z" fill="#0f3d2e" />
          <text x="500" y="78" textAnchor="middle" className="card-title">REPORT CARD</text>
          {['Maths', 'Science', 'English', 'Computers'].map((s, i) => (
            <g key={s}>
              <text x="402" y={124 + i * 30} className="card-row">{s}</text>
              <text x="520" y={124 + i * 30} className="card-grade">A+</text>
            </g>
          ))}
          <g transform="translate(578 222) rotate(-14)">
            <circle r="30" fill="#fff" stroke="#e11d48" strokeWidth="4" />
            <text textAnchor="middle" y="7" className="stamp-text">98%</text>
          </g>
        </g>
        <g transform="translate(690 180)">
          <g className="trophy">
            <path d="M-26 -50 H26 V-22 A26 26 0 0 1 -26 -22Z" fill="#f5c518" />
            <path d="M-26 -44 H-40 Q-42 -20 -20 -16 M26 -44 H40 Q42 -20 20 -16" fill="none" stroke="#f5c518" strokeWidth="6" />
            <rect x="-6" y="4" width="12" height="18" fill="#d4a017" />
            <rect x="-22" y="22" width="44" height="12" rx="3" fill="#7a4a28" />
            <path d="M0 -42 l4 9 10 1 -7 7 2 10 -9 -5 -9 5 2 -10 -7 -7 10 -1z" fill="#fff6c2" />
          </g>
        </g>
        <g className="confetti">
          {confetti.map((c, i) => (
            <rect
              key={i}
              x={c.x}
              y={-20}
              width={c.w}
              height={c.w * 0.5}
              fill={c.color}
              style={{ animationDelay: `${c.delay}s`, animationDuration: `${c.dur}s`, '--r': `${c.rot}deg` }}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}

// First part of the scroll is the "walk through the door" reveal; chapters share the rest.
const DOOR_VH = 60;
const CHAPTER_VH = 110;
const SECTION_VH = 100 + DOOR_VH + STORY.length * CHAPTER_VH;
const DOOR = DOOR_VH / (SECTION_VH - 100);
const SPAN = (1 - DOOR) / STORY.length;
// Scroll progress -> video time, so each chapter's text plays over its own scene.
const videoTime = (p) => {
  if (p <= DOOR) return STORY[0].from;
  const x = Math.min(STORY.length - 1e-6, (p - DOOR) / SPAN);
  const s = STORY[Math.floor(x)];
  return s.from + (x - Math.floor(x)) * (s.to - s.from);
};
const chapterAt = (p) => (p < DOOR ? 0 : Math.min(STORY.length, Math.floor((p - DOOR) / SPAN) + 1));
const chapterCenter = (i) => DOOR + (i + 0.5) * SPAN;

export default function Story() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const [scene, setScene] = useState(0);
  const [walking, setWalking] = useState(false);
  // Story video (public/videos/story.mp4) plays muted and scrubs with scroll; falls back to the illustration if missing.
  const [hasVideo, setHasVideo] = useState(true);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // Doorway reveal: an arch opens to full screen while the camera eases in.
  const [narrow] = useState(() => window.innerWidth < 700);
  const inset = useTransform(progress, [0, DOOR], [narrow ? 30 : 22, 0]);
  const sideInset = useTransform(progress, [0, DOOR], [narrow ? 10 : 32, 0]);
  const radius = useTransform(progress, [0, DOOR * 0.9, DOOR], [50, 50, 0]);
  const clipPath = useTransform([inset, sideInset, radius], ([t, s, r]) => `inset(${t}% ${s}% 0% ${s}% round ${r}vw ${r}vw 0 0)`);
  const scale = useTransform(progress, [0, DOOR, 1], [1.25, 1.05, 1.18]);
  const introOpacity = useTransform(progress, [0, DOOR * 0.6], [1, 0]);
  const uiOpacity = useTransform(progress, [DOOR * 0.7, DOOR], [0, 1]);
  const bar = useTransform(progress, [DOOR, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const next = p <= 0 ? 0 : chapterAt(p);
    setScene((prev) => (prev === next ? prev : next));
  });

  useMotionValueEvent(progress, 'change', (p) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    v.currentTime = Math.min(v.duration - 0.05, videoTime(p));
  });

  // Mobile browsers (iOS Safari especially) won't paint frames from currentTime seeks until the
  // video has played once, so play-then-pause it on load and again on the first touch.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const unlock = () => {
      v.muted = true;
      const p = v.play();
      if (p) p.then(() => { v.pause(); v.currentTime = videoTime(scrollYProgress.get()); }).catch(() => {});
    };
    unlock();
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
    return () => window.removeEventListener('touchstart', unlock);
  }, [hasVideo, scrollYProgress]);

  useEffect(() => {
    if (!scene) return;
    setWalking(true);
    const t = setTimeout(() => setWalking(false), 1400);
    return () => clearTimeout(t);
  }, [scene]);

  const jumpTo = (i) => {
    const el = ref.current;
    window.scrollTo({ top: el.offsetTop + (el.offsetHeight - window.innerHeight) * chapterCenter(i), behavior: 'smooth' });
  };

  const active = Math.max(0, scene - 1);
  const step = STORY[active];

  return (
    <section className="story" id="story" ref={ref} style={{ height: `${SECTION_VH}vh` }}>
      {/* Snap points: each scroll settles on the next chapter */}
      {[0, ...STORY.map((_, i) => chapterCenter(i))].map((p, i) => (
        <span key={i} className="story-snap" style={{ top: `${p * (SECTION_VH - 100)}vh` }} />
      ))}

      <div className="story-sticky">
        <motion.div className="story-frame" style={{ clipPath }}>
          <motion.div className="story-media" style={{ scale }}>
            {hasVideo ? (
              <video
                ref={videoRef}
                className="story-video"
                src="videos/story.mp4"
                poster="videos/story-poster.jpg"
                muted
                playsInline
                webkit-playsinline="true"
                preload="auto"
                disablePictureInPicture
                onError={() => setHasVideo(false)}
              />
            ) : (
              <Stage scene={scene ? [3, 4, 6][scene - 1] : 0} walking={walking} />
            )}
          </motion.div>
          <div className="story-shade" />
        </motion.div>

        <motion.div className="story-intro" style={{ opacity: introOpacity }}>
          <span className="eyebrow">A day at {SITE.name}</span>
          <h2>Step inside <em>SRS Institution Center</em></h2>
          <p><i className="ri-mouse-line" /> Scroll to walk in</p>
        </motion.div>

        <motion.div className="story-ui" style={{ opacity: uiOpacity }}>
          <div className="story-num" aria-hidden="true">0{active + 1}</div>
          <div className="story-panel">
            <span className="story-kicker">From our door to top marks</span>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="story-card"
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="story-chapter"><i className={step.icon} /> Chapter {active + 1} of {STORY.length}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </motion.div>
            </AnimatePresence>
            <div className="story-dots">
              {STORY.map((s, i) => (
                <button
                  key={s.title}
                  className={i === active ? 'is-active' : i < active ? 'is-done' : ''}
                  onClick={() => jumpTo(i)}
                  aria-label={`Go to chapter ${i + 1}: ${s.title}`}
                >
                  <span>{s.title}</span>
                </button>
              ))}
            </div>
          </div>
          <motion.div className="story-progress" style={{ scaleX: bar }} />
        </motion.div>
      </div>
    </section>
  );
}
