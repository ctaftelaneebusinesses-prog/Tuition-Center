import { motion } from 'framer-motion';
import { SITE, waLink } from './data';

const ease = [0.22, 1, 0.36, 1];

// Line-art characters, feet at y=0. Classes: f = paper fill, d = ink fill, y = highlighter fill, n = stroke only.
const FIGURES = [
  // Teacher in saree holding a book
  { x: 110, el: (
    <>
      <circle className="d" cx="0" cy="-176" r="7" />
      <path className="f" d="M-18 -136 Q-24 -70 -30 0 H30 Q24 -70 18 -136 Q0 -142 -18 -136Z" />
      <path className="n" d="M-6 -60 L-10 0 M4 -60 L6 0 M14 -60 L18 0" />
      <path className="f" d="M-18 -136 L-4 -138 L26 -76 L12 -70Z" />
      <path className="n" d="M0 -144 V-138" />
      <circle className="f" cx="0" cy="-158" r="14" />
      <path className="d" d="M-14 -158 Q-14 -174 0 -174 Q14 -174 14 -158 Q8 -168 0 -167 Q-8 -168 -14 -158Z" />
      <circle className="d" cx="-5" cy="-156" r="1.4" /><circle className="d" cx="5" cy="-156" r="1.4" />
      <path className="n" d="M-4 -150 Q0 -147 4 -150" />
      <circle className="d" cx="0" cy="-164" r="1.5" />
      <path className="n" d="M-18 -130 Q-30 -104 -12 -92" />
      <rect className="y" x="-26" y="-104" width="26" height="18" rx="2" transform="rotate(-10 -13 -95)" />
      <path className="n" d="M18 -130 Q28 -106 22 -84" />
      <path className="n" d="M-14 0 h-8 M14 0 h8" />
    </>
  ) },
  // Boy with backpack, waving
  { x: 235, el: (
    <>
      <rect className="y" x="-22" y="-86" width="14" height="34" rx="5" />
      <path className="f" d="M-10 -86 Q2 -90 12 -86 L12 -48 L-10 -48Z" />
      <path className="n" d="M-8 -86 L-6 -52" />
      <path className="f" d="M-10 -48 H12 L14 -32 H2 L1 -40 L0 -32 H-12Z" />
      <path className="n" d="M-6 -32 L-10 -3 M8 -32 L14 -3" />
      <ellipse className="d" cx="-12" cy="-2" rx="6" ry="3" /><ellipse className="d" cx="16" cy="-2" rx="6" ry="3" />
      <path className="n" d="M12 -82 Q26 -96 30 -112" /><circle className="f" cx="30" cy="-115" r="3.5" />
      <path className="n" d="M-10 -80 Q-16 -66 -12 -54" />
      <circle className="f" cx="2" cy="-100" r="12" />
      <path className="d" d="M-10 -102 Q-8 -116 4 -114 Q14 -114 14 -102 Q8 -108 2 -106 Q-4 -110 -10 -102Z" />
      <circle className="d" cx="-2" cy="-99" r="1.3" /><circle className="d" cx="7" cy="-99" r="1.3" />
      <path className="n" d="M-1 -93 Q3 -90 7 -93" />
    </>
  ) },
  // Father holding daughter's hand
  { x: 345, el: (
    <>
      <path className="f" d="M-16 -84 H16 L14 0 H3 L0 -60 L-3 0 H-14Z" />
      <path className="f" d="M-18 -140 Q0 -146 18 -140 L16 -84 H-16Z" />
      <path className="n" d="M-6 -142 L0 -134 L6 -142" />
      <path className="n" d="M-18 -136 Q-26 -112 -22 -90 M18 -136 Q30 -112 41 -94" />
      <ellipse className="d" cx="-9" cy="-1" rx="8" ry="3" /><ellipse className="d" cx="9" cy="-1" rx="8" ry="3" />
      <circle className="f" cx="0" cy="-158" r="14" />
      <path className="d" d="M-14 -160 Q-12 -176 2 -174 Q14 -174 14 -160 Q6 -168 -2 -166 Q-8 -168 -14 -160Z" />
      <circle className="d" cx="-5" cy="-157" r="1.4" /><circle className="d" cx="5" cy="-157" r="1.4" />
      <path className="d" d="M-5 -151 Q0 -154 5 -151 Q0 -149 -5 -151Z" />
    </>
  ) },
  { x: 392, el: (
    <>
      <path className="y" d="M-9 -68 Q0 -72 9 -68 L16 -30 H-16Z" />
      <path className="n" d="M-5 -30 V-3 M5 -30 V-3" />
      <ellipse className="d" cx="-6" cy="-2" rx="5" ry="2.5" /><ellipse className="d" cx="6" cy="-2" rx="5" ry="2.5" />
      <path className="n" d="M-8 -64 Q-10 -80 -6 -88 M8 -64 Q14 -52 12 -42" />
      <circle className="d" cx="-13" cy="-82" r="6" /><circle className="d" cx="13" cy="-82" r="6" />
      <circle className="f" cx="0" cy="-80" r="11" />
      <path className="d" d="M-11 -82 Q-10 -94 0 -93 Q10 -94 11 -82 Q5 -88 0 -87 Q-5 -88 -11 -82Z" />
      <circle className="d" cx="-4" cy="-79" r="1.2" /><circle className="d" cx="4" cy="-79" r="1.2" />
      <path className="n" d="M-3 -74 Q0 -71 3 -74" />
    </>
  ) },
  // Bench with a child reading
  { x: 565, el: (
    <>
      <rect className="d" x="-74" y="-90" width="148" height="8" rx="2" />
      <rect className="d" x="-74" y="-76" width="148" height="8" rx="2" />
      <rect className="d" x="-66" y="-90" width="6" height="42" />
      <rect className="d" x="60" y="-90" width="6" height="42" />
      <path className="f" d="M2 -92 Q12 -96 22 -92 L22 -52 L2 -52Z" />
      <path className="n" d="M6 -50 L4 -8 M18 -50 L18 -8" />
      <ellipse className="d" cx="2" cy="-6" rx="6" ry="3" /><ellipse className="d" cx="20" cy="-6" rx="6" ry="3" />
      <rect className="d" x="-78" y="-52" width="156" height="8" rx="2" />
      <rect className="d" x="-68" y="-44" width="6" height="44" />
      <rect className="d" x="62" y="-44" width="6" height="44" />
      <circle className="f" cx="12" cy="-106" r="12" />
      <path className="d" d="M0 -108 Q2 -122 12 -120 Q22 -122 24 -108 Q18 -114 12 -112 Q6 -114 0 -108Z" />
      <path className="n" d="M8 -103 h3 M15 -103 h3" />
      <path className="n" d="M2 -88 Q-6 -78 0 -72 M22 -88 Q30 -78 24 -72" />
      <path className="y" d="M-2 -82 L12 -76 L26 -82 L26 -66 L12 -60 L-2 -66Z" />
      <path className="n" d="M12 -76 V-60" />
    </>
  ) },
  // Girl hugging books
  { x: 700, el: (
    <>
      <path className="d" d="M-14 -104 Q-16 -70 -12 -66 H12 Q16 -70 14 -104Z" />
      <path className="f" d="M-12 -92 Q0 -96 12 -92 L20 -36 H-20Z" />
      <path className="n" d="M-6 -36 V-3 M6 -36 V-3" />
      <ellipse className="d" cx="-7" cy="-2" rx="5" ry="2.5" /><ellipse className="d" cx="7" cy="-2" rx="5" ry="2.5" />
      <rect className="y" x="-13" y="-82" width="26" height="8" rx="1.5" />
      <rect className="f" x="-11" y="-74" width="22" height="8" rx="1.5" />
      <rect className="y" x="-13" y="-66" width="26" height="7" rx="1.5" />
      <path className="n" d="M-12 -90 Q-20 -76 -10 -68 M12 -90 Q20 -76 10 -68" />
      <circle className="f" cx="0" cy="-106" r="12" />
      <path className="d" d="M-12 -108 Q-10 -120 0 -119 Q10 -120 12 -108 Q6 -112 0 -111 Q-6 -112 -12 -108Z" />
      <circle className="d" cx="-4" cy="-105" r="1.3" /><circle className="d" cx="4" cy="-105" r="1.3" />
      <path className="n" d="M-3 -99 Q0 -96 3 -99" />
    </>
  ) },
  // Graduate jumping with a certificate
  { x: 815, y: -14, el: (
    <>
      <path className="f" d="M-12 -90 Q0 -94 12 -90 L16 -40 H-16Z" />
      <path className="n" d="M-6 -40 L-12 -12 M6 -40 L12 -12" />
      <ellipse className="d" cx="-14" cy="-11" rx="5" ry="2.5" /><ellipse className="d" cx="14" cy="-11" rx="5" ry="2.5" />
      <path className="n" d="M-12 -88 L-26 -118 M12 -88 L26 -118" />
      <circle className="f" cx="-26" cy="-120" r="3.5" />
      <rect className="y" x="22" y="-140" width="9" height="22" rx="3" transform="rotate(20 26 -129)" />
      <circle className="f" cx="0" cy="-104" r="12" />
      <path className="d" d="M-18 -118 L0 -127 L18 -118 L0 -110Z" />
      <path className="n" d="M13 -118 V-104" />
      <circle className="d" cx="-4" cy="-104" r="1.3" /><circle className="d" cx="4" cy="-104" r="1.3" />
      <path className="n" d="M-5 -98 Q0 -93 5 -98" />
      <path className="n" d="M-34 6 h-12 M34 6 h12" opacity=".5" />
    </>
  ) },
  // Teen with laptop and headphones
  { x: 935, el: (
    <>
      <path className="f" d="M-16 -64 H16 L14 0 H4 L0 -44 L-4 0 H-14Z" />
      <ellipse className="d" cx="-9" cy="-1" rx="8" ry="3" /><ellipse className="d" cx="9" cy="-1" rx="8" ry="3" />
      <path className="f" d="M-18 -124 Q0 -130 18 -124 L16 -64 H-16Z" />
      <path className="n" d="M-6 -126 Q0 -116 6 -126" />
      <rect className="y" x="-24" y="-104" width="32" height="22" rx="2" transform="rotate(-12 -8 -93)" />
      <path className="n" d="M-18 -120 Q-28 -100 -18 -88 M18 -120 Q22 -100 6 -90" />
      <circle className="f" cx="0" cy="-140" r="13" />
      <path className="d" d="M-13 -142 Q-14 -158 0 -156 Q14 -158 13 -142 Q8 -150 0 -148 Q-8 -150 -13 -142Z" />
      <path className="n" d="M-15 -140 Q-15 -161 0 -161 Q15 -161 15 -140" />
      <rect className="d" x="-18" y="-146" width="5" height="11" rx="2" /><rect className="d" x="13" y="-146" width="5" height="11" rx="2" />
      <circle className="d" cx="-4" cy="-139" r="1.3" /><circle className="d" cx="4" cy="-139" r="1.3" />
      <path className="n" d="M-3 -133 Q0 -131 3 -133" />
    </>
  ) },
  // Teacher at an easel
  { x: 1085, el: (
    <>
      <path className="n" d="M-62 -98 L-72 0 M-10 -98 L0 0 M-36 -98 V-10" />
      <rect className="f" x="-74" y="-152" width="76" height="56" rx="3" />
      <text x="-36" y="-117" textAnchor="middle" className="ftr-chalk">a+b=c</text>
      <path className="f" d="M8 -64 H38 L36 0 H26 L23 -44 L20 0 H10Z" />
      <ellipse className="d" cx="14" cy="-1" rx="8" ry="3" /><ellipse className="d" cx="32" cy="-1" rx="8" ry="3" />
      <path className="f" d="M6 -124 Q23 -130 40 -124 L38 -64 H8Z" />
      <path className="n" d="M8 -118 L-12 -130 M-12 -130 L-32 -138 M40 -118 Q48 -96 40 -80" />
      <circle className="f" cx="23" cy="-140" r="13" />
      <path className="d" d="M12 -134 Q14 -122 23 -121 Q32 -122 34 -134 Q28 -128 23 -129 Q18 -128 12 -134Z" />
      <path className="d" d="M10 -144 Q12 -156 23 -155 Q34 -156 36 -144 Q30 -150 23 -149 Q16 -150 10 -144Z" />
      <circle className="n" cx="18" cy="-141" r="4" /><circle className="n" cx="28" cy="-141" r="4" />
    </>
  ) },
  // Plant
  { x: 1165, el: (
    <>
      <path className="f" d="M-14 0 L-18 -30 H18 L14 0Z" />
      <path className="y" d="M0 -30 C-22 -50 -24 -74 -6 -88 C-2 -64 0 -50 0 -30Z" />
      <path className="f" d="M0 -30 C18 -46 28 -70 14 -86 C8 -62 4 -50 0 -30Z" />
    </>
  ) },
];

const LINKS = [
  ['Explore', [['About', '#about'], ['Courses', '#courses'], ['Computer Lab', '#lab'], ['Gallery', '#gallery']]],
  ['Learn', [['Teaching method', '#method'], ['Faculty', '#faculty'], ['Facilities', '#facilities'], ['Results', '#results']]],
];

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="container ftr-top">
        <div className="ftr-intro">
          <span className="ftr-tag">Since 2011 · Classes 1–12 · Computers</span>
          <p>From the first day at our door to the day the results come out, we walk with every child.</p>
          <div className="ftr-actions">
            <a href={waLink()} target="_blank" rel="noopener" className="btn btn--green"><i className="ri-whatsapp-line" /> WhatsApp us</a>
            <a href={`tel:+${SITE.phoneRaw}`} className="btn btn--ghost"><i className="ri-phone-line" /> {SITE.phone}</a>
          </div>
        </div>
        {LINKS.map(([h, items]) => (
          <div key={h} className="ftr-col">
            <h4>{h}</h4>
            {items.map(([l, href]) => <a key={href} href={href}>{l}</a>)}
          </div>
        ))}
        <div className="ftr-col">
          <h4>Visit</h4>
          <p>{SITE.address}</p>
          <p>{SITE.timings[0]}</p>
          <div className="ftr-social">
            <a href="#" aria-label="Instagram"><i className="ri-instagram-line" /></a>
            <a href="#" aria-label="Facebook"><i className="ri-facebook-fill" /></a>
            <a href="#" aria-label="YouTube"><i className="ri-youtube-fill" /></a>
          </div>
        </div>
      </div>

      <div className="ftr-stage">
        <h2 className="ftr-word" aria-label={SITE.name}>
          {SITE.name.split('').map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: '60%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.05, ease }}
            >
              {ch === ' ' ? ' ' : ch}
            </motion.span>
          ))}
        </h2>

        <svg className="ftr-art" viewBox="0 0 1200 430" aria-hidden="true">
          {/* doodle string with notebook, test paper, pencil and report card */}
          <motion.path
            className="n ftr-string"
            d="M30 120 C110 60 160 170 235 115 S340 40 390 100 C430 150 480 92 460 70 C440 50 405 92 445 112 S565 132 625 102 C685 72 705 142 765 122 C805 107 795 72 775 82 C755 94 785 127 835 112 S965 62 1015 102 C1065 142 1105 82 1170 92"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.4, ease: 'easeInOut' }}
          />
          <g transform="translate(70 62) rotate(-12)">
            <rect className="f" width="92" height="66" rx="4" />
            <path className="n" d="M14 -4 v10 M30 -4 v10 M46 -4 v10 M62 -4 v10 M78 -4 v10" />
            <path className="n" d="M12 24 q8 -6 16 0 t16 0 t16 0 M12 38 q8 -6 16 0 t16 0 t16 0 t14 0 M12 52 q8 -6 16 0 t16 0" />
          </g>
          <g transform="translate(330 30) rotate(10)">
            <rect className="f" width="78" height="96" rx="3" />
            <path className="y" d="M10 16 h40 v20 h-40z" opacity=".9" />
            <text x="14" y="34" className="ftr-grade">A+</text>
            <path className="n" d="M10 52 h56 M10 64 h48 M10 76 h52" />
          </g>
          <g transform="translate(560 18) rotate(32)">
            <rect className="f" x="0" y="0" width="120" height="22" rx="2" />
            <path className="n" d="M0 7 h120 M0 15 h120" />
            <rect className="y" x="-18" y="0" width="18" height="22" rx="4" />
            <path className="f" d="M120 0 L148 11 L120 22Z" />
            <path className="d" d="M141 8 L148 11 L141 14Z" />
          </g>
          <g transform="translate(880 44) rotate(-8)">
            <rect className="f" width="88" height="72" rx="4" />
            <path className="y" d="M44 12 l5 10 11 2 -8 8 2 11 -10 -5 -10 5 2 -11 -8 -8 11 -2z" />
            <path className="n" d="M12 56 h64" />
          </g>

          {/* highlighter loop behind the characters */}
          <motion.path
            className="ftr-highlight"
            d="M430 420 C380 300 470 200 545 228 C620 256 570 362 505 342 C445 322 520 248 645 296 C725 326 765 380 830 408"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: 0.6, ease: 'easeInOut' }}
          />

          <path className="n" d="M10 412 H1190" opacity=".25" />
          {FIGURES.map((f, i) => (
            <motion.g
              key={i}
              className="ftr-fig"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease }}
            >
              <g transform={`translate(${f.x} ${410 + (f.y || 0)})`}>{f.el}</g>
            </motion.g>
          ))}
        </svg>
      </div>

      <div className="container ftr-bottom">
        <span>© {new Date().getFullYear()} {SITE.name} {SITE.tagline}. All rights reserved.</span>
        <span>Made with <i className="ri-heart-3-fill" /> for our students</span>
      </div>
    </footer>
  );
}
