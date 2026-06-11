"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ─── Single unified accent colour — matches home page exactly ─────────────────
const ACCENT = "#a855f7";
const ACCENT_DIM = "rgba(168,85,247,0.55)";
const ACCENT_GLOW = "rgba(168,85,247,0.9)";

// ─── domain data ──────────────────────────────────────────────────────────────
const DOMAINS = [
  {
    id: "tech", label: "Tech", angle: 270, emoji: "💻",
    tagline: "Build. Innovate. Solve.",
    description: "The Tech domain explores cutting-edge technologies and transforms ideas into impactful solutions.",
    motto: "We build the future.",
    mottoSub: "From code to product, we engineer solutions that make a real difference.",
    attrs: [
      { icon: "🛡️", label: "Cyber",    sub: "Security & Blockchain" },
      { icon: "⚙️",  label: "Hardware", sub: "Embedded systems"      },
      { icon: "{}",  label: "DSA",      sub: "Algorithms & data"     },
      { icon: "🤖",  label: "AI / ML",  sub: "Intelligent systems"   },
      { icon: "</>", label: "Web Dev",  sub: "Full-stack apps"       },
    ],
    Illus: () => (
      <svg viewBox="0 0 220 180" fill="none" style={{width:"100%",height:"100%"}}>
        <ellipse cx="110" cy="155" rx="70" ry="14" fill="#a855f7" fillOpacity="0.25"/>
        <rect x="40" y="55" width="140" height="92" rx="8" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1.5"/>
        <rect x="48" y="63" width="124" height="76" rx="4" fill="#0d0520"/>
        <rect x="54" y="70" width="60" height="5" rx="2" fill="#a855f7" fillOpacity="0.7"/>
        <rect x="54" y="79" width="90" height="3" rx="2" fill="#7c3aed" fillOpacity="0.5"/>
        <rect x="54" y="86" width="75" height="3" rx="2" fill="#7c3aed" fillOpacity="0.4"/>
        <rect x="54" y="93" width="85" height="3" rx="2" fill="#7c3aed" fillOpacity="0.35"/>
        <rect x="54" y="100" width="65" height="3" rx="2" fill="#7c3aed" fillOpacity="0.3"/>
        <rect x="54" y="107" width="80" height="3" rx="2" fill="#7c3aed" fillOpacity="0.25"/>
        <rect x="30" y="147" width="160" height="10" rx="4" fill="#1a0a3a" stroke="#7c3aed" strokeWidth="1"/>
        <rect x="148" y="34" width="28" height="28" rx="6" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1.2"/>
        <text x="162" y="52" textAnchor="middle" fill="#a855f7" fontSize="13" fontFamily="monospace">{"</>"}</text>
        <rect x="8" y="74" width="26" height="26" rx="6" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1.2"/>
        <text x="21" y="91" textAnchor="middle" fill="#a855f7" fontSize="11" fontFamily="monospace">{"{}"}</text>
        <rect x="182" y="86" width="26" height="26" rx="6" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1.2"/>
        <text x="195" y="104" textAnchor="middle" fill="#a855f7" fontSize="14">🛡️</text>
        <ellipse cx="110" cy="150" rx="50" ry="8" fill="#a855f7" fillOpacity="0.35"/>
      </svg>
    ),
  },
  {
    id: "design", label: "Design", angle: 208, emoji: "🎨",
    tagline: "Create. Visualize. Communicate.",
    description: "The Design domain brings ideas to life through creativity and visual storytelling. We design experiences that communicate, inspire and leave a lasting impact.",
    motto: "We design with purpose.",
    mottoSub: "Turning concepts into visual experiences that connect, communicate and captivate.",
    attrs: [
      { icon: "✏️", label: "Create",      sub: "Craft visuals that bring ideas to life" },
      { icon: "🖥️", label: "Design",      sub: "Design interfaces and experiences"      },
      { icon: "👁️", label: "Communicate", sub: "Use visual storytelling"                },
      { icon: "💜", label: "Inspire",     sub: "Design with empathy"                    },
    ],
    Illus: () => (
      <svg viewBox="0 0 220 180" fill="none" style={{width:"100%",height:"100%"}}>
        <ellipse cx="110" cy="158" rx="65" ry="12" fill="#a855f7" fillOpacity="0.2"/>
        <rect x="50" y="36" width="130" height="104" rx="10" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1.5"/>
        <rect x="58" y="44" width="114" height="88" rx="6" fill="#0d0520"/>
        <rect x="66" y="52" width="70" height="52" rx="4" fill="#1e0a40"/>
        <path d="M76 84 L91 64 L106 78 L116 68 L136 84Z" fill="#a855f7" fillOpacity="0.5"/>
        <circle cx="120" cy="64" r="6" fill="#7c3aed" fillOpacity="0.6"/>
        <rect x="144" y="52" width="20" height="8" rx="3" fill="#a855f7"/>
        <rect x="144" y="64" width="20" height="8" rx="3" fill="#c084fc"/>
        <rect x="144" y="76" width="20" height="8" rx="3" fill="#6366f1"/>
        <rect x="144" y="88" width="20" height="8" rx="3" fill="#7c3aed"/>
        <line x1="155" y1="26" x2="125" y2="106" stroke="#a855f7" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="125" cy="106" r="3" fill="#fff"/>
        <rect x="8" y="46" width="28" height="28" rx="6" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1.2"/>
        <text x="22" y="64" textAnchor="middle" fill="#a855f7" fontSize="13">Aa</text>
        <rect x="186" y="46" width="28" height="28" rx="6" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1.2"/>
        <text x="200" y="64" textAnchor="middle" fill="#a855f7" fontSize="14">✂</text>
        <ellipse cx="110" cy="154" rx="46" ry="8" fill="#a855f7" fillOpacity="0.3"/>
      </svg>
    ),
  },
  {
    id: "management", label: "Management", angle: 332, emoji: "👥",
    tagline: "Lead. Organize. Impact.",
    description: "The Management domain empowers leaders to turn ideas into action. From planning to execution, we drive initiatives that create real impact.",
    motto: "We plan, coordinate and lead with purpose",
    mottoSub: "to build communities and create meaningful change.",
    attrs: [
      { icon: "📋", label: "Plan",    sub: "Strategise and organise" },
      { icon: "🤝", label: "Lead",    sub: "Drive teams forward"      },
      { icon: "📊", label: "Execute", sub: "Deliver results"          },
      { icon: "💡", label: "Impact",  sub: "Create meaningful change" },
    ],
    Illus: () => (
      <svg viewBox="0 0 220 180" fill="none" style={{width:"100%",height:"100%"}}>
        <ellipse cx="110" cy="158" rx="65" ry="12" fill="#a855f7" fillOpacity="0.2"/>
        <circle cx="72" cy="80" r="18" fill="#5b21b6" fillOpacity="0.7"/>
        <ellipse cx="72" cy="108" rx="16" ry="22" fill="#5b21b6" fillOpacity="0.7"/>
        <circle cx="110" cy="70" r="22" fill="#a855f7" fillOpacity="0.85"/>
        <ellipse cx="110" cy="104" rx="20" ry="26" fill="#a855f7" fillOpacity="0.85"/>
        <circle cx="148" cy="80" r="18" fill="#5b21b6" fillOpacity="0.7"/>
        <ellipse cx="148" cy="108" rx="16" ry="22" fill="#5b21b6" fillOpacity="0.7"/>
        <ellipse cx="110" cy="150" rx="58" ry="10" fill="#a855f7" fillOpacity="0.4"/>
        <rect x="6" y="26" width="30" height="30" rx="6" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1.2"/>
        <text x="21" y="46" textAnchor="middle" fill="#a855f7" fontSize="14">📋</text>
        <rect x="186" y="26" width="30" height="30" rx="6" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1.2"/>
        <text x="201" y="46" textAnchor="middle" fill="#a855f7" fontSize="14">📅</text>
        <rect x="186" y="84" width="28" height="28" rx="6" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1.2"/>
        <text x="200" y="103" textAnchor="middle" fill="#a855f7" fontSize="14">📊</text>
      </svg>
    ),
  },
  {
    id: "editorial", label: "Editorial", angle: 152, emoji: "📝",
    tagline: "Write. Inform. Inspire.",
    description: "The Editorial domain crafts stories and content that inform, inspire and spark meaningful conversations.",
    motto: "We write to make an impact.",
    mottoSub: "From ideas to words, we shape content that connects and creates change.",
    attrs: [
      { icon: "✏️", label: "Write",    sub: "Craft clear, engaging content"  },
      { icon: "🔍", label: "Research", sub: "Explore and uncover insights"    },
      { icon: "📢", label: "Inform",   sub: "Share knowledge that educates"   },
      { icon: "💡", label: "Inspire",  sub: "Tell stories that drive impact"  },
    ],
    Illus: () => (
      <svg viewBox="0 0 220 180" fill="none" style={{width:"100%",height:"100%"}}>
        <ellipse cx="110" cy="158" rx="65" ry="12" fill="#a855f7" fillOpacity="0.2"/>
        <path d="M30 130 Q30 58 110 53 Q190 58 190 130 L190 145 L30 145Z" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1.5"/>
        <line x1="110" y1="53" x2="110" y2="145" stroke="#a855f7" strokeWidth="1.5"/>
        <line x1="45" y1="83" x2="100" y2="83" stroke="#7c3aed" strokeWidth="1.2" strokeOpacity="0.7"/>
        <line x1="45" y1="93" x2="100" y2="93" stroke="#7c3aed" strokeWidth="1.2" strokeOpacity="0.6"/>
        <line x1="45" y1="103" x2="100" y2="103" stroke="#7c3aed" strokeWidth="1.2" strokeOpacity="0.5"/>
        <line x1="45" y1="113" x2="100" y2="113" stroke="#7c3aed" strokeWidth="1.2" strokeOpacity="0.4"/>
        <line x1="120" y1="83" x2="175" y2="83" stroke="#7c3aed" strokeWidth="1.2" strokeOpacity="0.7"/>
        <line x1="120" y1="93" x2="175" y2="93" stroke="#7c3aed" strokeWidth="1.2" strokeOpacity="0.6"/>
        <line x1="120" y1="103" x2="175" y2="103" stroke="#7c3aed" strokeWidth="1.2" strokeOpacity="0.5"/>
        <path d="M150 8 Q170 38 130 78 Q120 88 115 98 L110 140" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M150 8 Q130 48 115 98" stroke="#c084fc" strokeWidth="1" strokeLinecap="round"/>
        <ellipse cx="110" cy="150" rx="52" ry="9" fill="#a855f7" fillOpacity="0.4"/>
        <rect x="6" y="32" width="28" height="28" rx="6" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1.2"/>
        <text x="20" y="50" textAnchor="middle" fill="#a855f7" fontSize="12">T≡</text>
        <rect x="186" y="32" width="28" height="28" rx="6" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1.2"/>
        <text x="200" y="50" textAnchor="middle" fill="#a855f7" fontSize="14">🖼</text>
      </svg>
    ),
  },
  {
    id: "projects", label: "Projects", angle: 28, emoji: "🗂️",
    tagline: "Ideate. Build. Impact.",
    description: "The Projects domain transforms ideas into impactful solutions through teamwork, innovation and real-world applications.",
    motto: "We collaborate. We create. We deliver.",
    mottoSub: "Turning concepts into projects that solve problems and create impact.",
    attrs: [
      { icon: "👥", label: "Collaborate", sub: "Work together across ideas"   },
      { icon: "🚀", label: "Innovate",    sub: "Build creative solutions"      },
      { icon: "🎯", label: "Impact",      sub: "Deliver meaningful change"     },
    ],
    Illus: () => (
      <svg viewBox="0 0 220 180" fill="none" style={{width:"100%",height:"100%"}}>
        <ellipse cx="110" cy="158" rx="65" ry="12" fill="#a855f7" fillOpacity="0.2"/>
        <rect x="38" y="52" width="145" height="94" rx="8" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1.5"/>
        <rect x="46" y="60" width="129" height="78" rx="4" fill="#0d0520"/>
        <rect x="54" y="67" width="55" height="42" rx="3" fill="#1e0a40" stroke="#a855f7" strokeWidth="0.8"/>
        <path d="M59 89 L74 75 L89 87 L99 79 L109 89Z" fill="#a855f7" fillOpacity="0.5"/>
        <rect x="116" y="67" width="52" height="18" rx="3" fill="#1e0a40" stroke="#a855f7" strokeWidth="0.8"/>
        <rect x="116" y="89" width="52" height="18" rx="3" fill="#1e0a40" stroke="#a855f7" strokeWidth="0.8"/>
        <line x1="122" y1="74" x2="162" y2="74" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.7"/>
        <line x1="122" y1="79" x2="155" y2="79" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.5"/>
        <line x1="122" y1="96" x2="162" y2="96" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.7"/>
        <rect x="28" y="146" width="164" height="10" rx="4" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1"/>
        <rect x="8" y="34" width="28" height="28" rx="8" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1.2"/>
        <text x="22" y="53" textAnchor="middle" fill="#a855f7" fontSize="16">💡</text>
        <rect x="186" y="34" width="28" height="28" rx="8" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1.2"/>
        <text x="200" y="52" textAnchor="middle" fill="#a855f7" fontSize="13">{"</>"}</text>
        <rect x="186" y="96" width="28" height="28" rx="8" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1.2"/>
        <text x="200" y="115" textAnchor="middle" fill="#a855f7" fontSize="14">📊</text>
        <ellipse cx="110" cy="154" rx="50" ry="8" fill="#a855f7" fillOpacity="0.4"/>
      </svg>
    ),
  },
  {
    id: "publicity", label: "Publicity", angle: 90, emoji: "📣",
    tagline: "Amplify. Connect. Inspire.",
    description: "The Publicity domain drives outreach and engagement through creative communication, branding and storytelling that amplifies impact.",
    motto: "We create visibility. We build connections.",
    mottoSub: "We share stories that inspire, engage and drive action.",
    attrs: [
      { icon: "📢", label: "Communicate", sub: "Share ideas clearly and creatively" },
      { icon: "👥", label: "Engage",      sub: "Connect with audiences"             },
      { icon: "🎨", label: "Create",      sub: "Design content that inspires"       },
      { icon: "📈", label: "Amplify",     sub: "Increase reach and impact"          },
    ],
    Illus: () => (
      <svg viewBox="0 0 220 180" fill="none" style={{width:"100%",height:"100%"}}>
        <ellipse cx="110" cy="158" rx="65" ry="12" fill="#a855f7" fillOpacity="0.25"/>
        <path d="M60 72 L60 116 L80 116 L80 72Z" fill="#a855f7" fillOpacity="0.8"/>
        <path d="M80 62 L155 32 L155 156 L80 126Z" fill="#7c3aed" fillOpacity="0.85"/>
        <path d="M160 67 Q175 94 160 119" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M165 57 Q185 94 165 129" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.65"/>
        <path d="M170 47 Q196 94 170 139" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4"/>
        <ellipse cx="110" cy="152" rx="55" ry="10" fill="#a855f7" fillOpacity="0.4"/>
        <rect x="6" y="26" width="30" height="30" rx="8" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1.2"/>
        <text x="21" y="46" textAnchor="middle" fill="#a855f7" fontSize="16">👥</text>
        <rect x="186" y="26" width="30" height="30" rx="8" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1.2"/>
        <text x="201" y="46" textAnchor="middle" fill="#a855f7" fontSize="16">❤</text>
        <rect x="6" y="96" width="30" height="30" rx="8" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1.2"/>
        <text x="21" y="116" textAnchor="middle" fill="#a855f7" fontSize="16">💬</text>
        <rect x="186" y="96" width="30" height="30" rx="8" fill="#1a0a3a" stroke="#a855f7" strokeWidth="1.2"/>
        <text x="201" y="116" textAnchor="middle" fill="#a855f7" fontSize="16">#</text>
      </svg>
    ),
  },
];

const toRad = (d: number) => (d * Math.PI) / 180;

// ─── star field ───────────────────────────────────────────────────────────────
function StarField() {
  const stars = useMemo(() => {
    let s = 77;
    const r = () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
    return Array.from({ length: 130 }, () => ({
      x: r() * 100, y: r() * 100,
      sz: r() * 1.4 + 0.3, op: r() * 0.45 + 0.08, dur: r() * 4 + 2,
    }));
  }, []);
  return (
    <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
      {stars.map((s, i) => (
        <motion.div key={i}
          style={{ position:"absolute", left:`${s.x}%`, top:`${s.y}%`, width:s.sz*2, height:s.sz*2, borderRadius:"50%", background:"#fff", opacity:s.op }}
          animate={{ opacity:[s.op, s.op*0.15, s.op] }}
          transition={{ duration:s.dur, repeat:Infinity, ease:"easeInOut", delay:i*0.025 }}
        />
      ))}
    </div>
  );
}

// ─── domain modal ─────────────────────────────────────────────────────────────
function DomainModal({ domain, onClose }: { domain: typeof DOMAINS[0]; onClose: () => void }) {
  const Illus = domain.Illus;
  return (
    <>
      <motion.div
        initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
        transition={{ duration:0.2 }}
        onClick={onClose}
        style={{ position:"fixed", inset:0, zIndex:100, background:"rgba(0,0,0,0.75)", backdropFilter:"blur(10px)", cursor:"pointer" }}
      />
      <motion.div
        initial={{ opacity:0, scale:0.88, y:24 }}
        animate={{ opacity:1, scale:1, y:0 }}
        exit={{ opacity:0, scale:0.92, y:12 }}
        transition={{ type:"spring", stiffness:340, damping:32 }}
        style={{ position:"fixed", inset:0, zIndex:101, display:"flex", alignItems:"center", justifyContent:"center", padding:20, pointerEvents:"none" }}
      >
        <div style={{
          width:"100%", maxWidth:820, pointerEvents:"all",
          background:"linear-gradient(145deg,rgba(10,4,28,0.97),rgba(5,2,16,0.98))",
          border:`1px solid ${ACCENT}50`,
          borderRadius:20,
          boxShadow:`0 0 0 1px ${ACCENT}15, 0 24px 80px rgba(0,0,0,0.8), 0 0 80px ${ACCENT}25`,
          backdropFilter:"blur(30px)", position:"relative", overflow:"hidden",
        }}>
          {/* top shimmer line */}
          <div style={{ position:"absolute", top:0, left:"5%", right:"5%", height:1.5, background:`linear-gradient(90deg,transparent,${ACCENT}dd,transparent)` }}/>
          {/* bg glow orb */}
          <div style={{ position:"absolute", top:-60, right:-60, width:260, height:260, background:`radial-gradient(circle,${ACCENT}20,transparent 65%)`, borderRadius:"50%", pointerEvents:"none" }}/>
          <div style={{ position:"absolute", bottom:-80, left:-40, width:220, height:220, background:`radial-gradient(circle,rgba(99,102,241,0.12),transparent 65%)`, borderRadius:"50%", pointerEvents:"none" }}/>

          {/* close button */}
          <button onClick={onClose} style={{ position:"absolute", top:16, right:16, width:34, height:34, borderRadius:"50%", background:"rgba(255,255,255,0.06)", border:`1px solid ${ACCENT}40`, color:"rgba(255,255,255,0.7)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:15, zIndex:10 }}>✕</button>

          {/* top section */}
          <div style={{ display:"flex", padding:"28px 28px 0", gap:8 }}>
            <div style={{ flex:"0 0 290px", paddingRight:20 }}>
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:14 }}>
                <div style={{ width:56, height:56, borderRadius:"50%", flexShrink:0, background:`radial-gradient(circle,${ACCENT}35,${ACCENT}08)`, border:`1.5px solid ${ACCENT}70`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, boxShadow:`0 0 20px ${ACCENT}55` }}>
                  {domain.emoji}
                </div>
                <div>
                  <h2 style={{ fontFamily:"'Inter','Segoe UI','Helvetica Neue',Arial,sans-serif", fontSize:26, fontWeight:800, color:"#fff", margin:0, letterSpacing:"0.05em", textTransform:"uppercase", textShadow:`0 0 24px ${ACCENT}90` }}>
                    {domain.label}
                  </h2>
                  <p style={{ fontFamily:"'Inter','Segoe UI','Helvetica Neue',Arial,sans-serif", fontSize:11, color:ACCENT, margin:"4px 0 0", letterSpacing:"0.05em" }}>
                    {domain.tagline}
                  </p>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
                <div style={{ flex:1, height:1, background:`linear-gradient(90deg,${ACCENT}55,transparent)` }}/>
                <span style={{ color:ACCENT, fontSize:9 }}>✦</span>
              </div>
              <p style={{ fontFamily:"'Inter','Segoe UI','Helvetica Neue',Arial,sans-serif", fontSize:13.5, color:"rgba(255,255,255,0.7)", lineHeight:1.8, margin:0 }}>
                {domain.description}
              </p>
            </div>
            <div style={{ flex:1, minHeight:175 }}><Illus /></div>
          </div>

          {/* bottom attrs bar */}
          <div style={{ padding:"18px 28px 26px" }}>
            <div style={{ background:"rgba(168,85,247,0.05)", border:`1px solid ${ACCENT}20`, borderRadius:14, padding:"14px 18px", display:"flex", gap:18, alignItems:"flex-start" }}>
              <div style={{ width:42, height:42, borderRadius:"50%", flexShrink:0, background:`radial-gradient(circle,${ACCENT}30,${ACCENT}06)`, border:`1.5px solid ${ACCENT}50`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, boxShadow:`0 0 14px ${ACCENT}40` }}>✦</div>
              <div style={{ flex:1 }}>
                <div style={{ marginBottom:12 }}>
                  <span style={{ fontFamily:"'Inter','Segoe UI','Helvetica Neue',Arial,sans-serif", fontSize:12.5, fontWeight:700, color:ACCENT }}>{domain.motto} </span>
                  <span style={{ fontFamily:"'Inter','Segoe UI','Helvetica Neue',Arial,sans-serif", fontSize:12.5, color:"rgba(255,255,255,0.6)" }}>{domain.mottoSub}</span>
                </div>
                <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
                  {domain.attrs.map(a => (
                    <div key={a.label} style={{ textAlign:"center", minWidth:64 }}>
                      <div style={{ fontSize:17, marginBottom:4, filter:`drop-shadow(0 0 6px ${ACCENT})` }}>{a.icon}</div>
                      <div style={{ fontFamily:"'Inter','Segoe UI','Helvetica Neue',Arial,sans-serif", fontSize:11, fontWeight:700, color:"#fff", marginBottom:2 }}>{a.label}</div>
                      <div style={{ fontFamily:"'Inter','Segoe UI','Helvetica Neue',Arial,sans-serif", fontSize:9.5, color:"rgba(255,255,255,0.42)", lineHeight:1.35 }}>{a.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ─── main ─────────────────────────────────────────────────────────────────────
export default function DomainsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once:true, margin:"-4%" });
  const [phase, setPhase] = useState(0);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const VW = 900, VH = 900;
  const CX = 450, CY = 450;
  const ORBIT  = 240;
  const NODE_R = 52;
  const GIRL_R = 72; // radius to start lines from (outside pixel girl body)

  const nodes = useMemo(() => DOMAINS.map(d => ({
    ...d,
    nx: parseFloat((CX + ORBIT * Math.cos(toRad(d.angle))).toFixed(2)),
    ny: parseFloat((CY + ORBIT * Math.sin(toRad(d.angle))).toFixed(2)),
  })), []);

  useEffect(() => {
    if (!inView) return;
    const ts = [
      setTimeout(() => setPhase(2), 400),
      setTimeout(() => setPhase(3), 900),
      setTimeout(() => setPhase(4), 1600),
      setTimeout(() => setPhase(5), 3000),
      setTimeout(() => setPhase(6), 3900),
      setTimeout(() => setPhase(7), 4700),
      setTimeout(() => setPhase(8), 5500),
    ];
    return () => ts.forEach(clearTimeout);
  }, [inView]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveModal(null); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  // Pre-compute line geometry for all 6 domains
  const lineGeom = useMemo(() => nodes.map(n => {
    const dx = n.nx - CX, dy = n.ny - CY;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const ux = dx/dist, uy = dy/dist;
    return {
      sx: parseFloat((CX + ux * GIRL_R).toFixed(2)),
      sy: parseFloat((CY + uy * GIRL_R).toFixed(2)),
      ex: parseFloat((n.nx - ux * (NODE_R + 8)).toFixed(2)),
      ey: parseFloat((n.ny - uy * (NODE_R + 8)).toFixed(2)),
    };
  }), [nodes]);

  const activeDomain = nodes.find(n => n.id === activeModal) ?? null;

  return (
    <>
      <AnimatePresence>
        {activeDomain && (
          <DomainModal key={activeDomain.id} domain={activeDomain} onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>

      <section ref={sectionRef} style={{
        position:"relative", width:"100%", minHeight:"100vh",
        display:"flex", flexDirection:"column", alignItems:"center",
        justifyContent:"flex-start", overflow:"hidden",
        background:"#050816", paddingTop:70, paddingBottom:40,
      }}>
        {/* ── Backgrounds matching home page exactly ── */}
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 60% at 50% 25%,#1d0d3f 0%,#120826 30%,#08051a 65%,#04030d 100%)" }}/>
        <div style={{ position:"absolute", inset:0, opacity:0.18, mixBlendMode:"screen" as const, background:"conic-gradient(from 210deg at 70% 10%,transparent 0deg,rgba(168,85,247,0.35) 18deg,transparent 36deg,transparent 180deg,rgba(139,92,246,0.25) 200deg,transparent 220deg)", filter:"blur(40px)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", inset:"50% 0 0 0", background:"radial-gradient(ellipse 60% 100% at 50% 100%,rgba(76,29,149,0.35),transparent 70%)", filter:"blur(20px)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at center,transparent 55%,rgba(0,0,0,0.55) 100%)", pointerEvents:"none" }}/>
        {/* hex grid */}
        <svg style={{ position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.04,pointerEvents:"none" }} aria-hidden>
          <defs><pattern id="hxgD" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse"><polygon points="30,4 56,18 56,46 30,60 4,46 4,18" fill="none" stroke="#a855f7" strokeWidth="0.8"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#hxgD)"/>
        </svg>
        <StarField />

        {/* ── Section title — same font/style as home page ── */}
        <motion.div
          style={{ position:"relative", zIndex:10, textAlign:"center", marginBottom:4 }}
          initial={{ opacity:0, y:-20 }}
          animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.85, ease:[0.22,1,0.36,1] }}
        >
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:5 }}>
            <span style={{ color:"rgba(255,255,255,0.28)", fontSize:12 }}>✦</span>
            <span style={{ fontFamily:"'Inter','Segoe UI','Helvetica Neue',Arial,sans-serif", fontSize:10, letterSpacing:"0.42em", color:"rgba(255,255,255,0.28)", textTransform:"uppercase" }}>Our Domains</span>
            <span style={{ color:"rgba(255,255,255,0.28)", fontSize:12 }}>✦</span>
          </div>
          <h2 style={{
            fontFamily:"'Inter','Segoe UI','Helvetica Neue',Arial,sans-serif",
            fontSize:"clamp(32px,4.5vw,60px)",
            color:"#fff", fontWeight:900, margin:0,
            lineHeight:1.08, letterSpacing:"0.06em", textTransform:"uppercase",
            textShadow:"0 0 50px rgba(168,85,247,0.7), 0 0 100px rgba(139,92,246,0.35), 0 2px 8px rgba(0,0,0,0.5)",
          }}>
            Our Domains
          </h2>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginTop:10 }}>
            <div style={{ width:68, height:1, background:"linear-gradient(90deg,transparent,rgba(168,85,247,0.6))" }}/>
            <div style={{ width:6, height:6, background:"#a855f7", transform:"rotate(45deg)", boxShadow:"0 0 10px #a855f7,0 0 22px #8b5cf6" }}/>
            <div style={{ width:68, height:1, background:"linear-gradient(90deg,rgba(168,85,247,0.6),transparent)" }}/>
          </div>
        </motion.div>

        {/* ── SVG diagram ── */}
        <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:1000, overflow:"visible" }}>
          <svg viewBox={`0 0 ${VW} ${VH}`} style={{ width:"100%", height:"auto", display:"block", overflow:"visible" }}>
            <defs>
              <filter id="gsmD" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="glgD" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="22" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="glnD" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <radialGradient id="cglwD" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35"/>
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="grndD" cx="50%" cy="20%" r="65%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0"/>
              </radialGradient>

              {/* motion paths for ALL 6 lines — 3 offset particles per line */}
              {nodes.map((n, i) => {
                const g = lineGeom[i];
                return [0, 0.65, 1.3].map(offset => (
                  <path
                    key={`mp-${n.id}-${offset}`}
                    id={`mp-${n.id}-${String(offset).replace(".","_")}`}
                    d={`M ${g.sx} ${g.sy} L ${g.ex} ${g.ey}`}
                    fill="none" stroke="none"
                  />
                ));
              })}
            </defs>

            {/* STEP 2 — center glow */}
            {phase >= 2 && (
              <motion.g initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1.2 }}>
                <circle cx={CX} cy={CY} r={300} fill="url(#cglwD)"/>
              </motion.g>
            )}

            {/* STEP 3 — pulse rings */}
            {phase >= 3 && [0, 0.6, 1.2].map(delay => (
              <motion.circle key={`pls-${delay}`}
                cx={CX} cy={CY} r={70} fill="none" stroke="#a855f7" strokeWidth={2.2}
                filter="url(#gsmD)"
                initial={{ scale:1, opacity:0.75 }}
                animate={{ scale:3.2, opacity:0 }}
                transition={{ duration:1.6, repeat:3, delay, ease:"easeOut" }}
              />
            ))}

            {/* STEP 4 — ALL 6 LINES drawn from girl-edge to node-edge */}
            {phase >= 4 && lineGeom.map((g, i) => {
              const n = nodes[i];
              const isActive = activeModal === n.id;
              return (
                <g key={`line-${n.id}`}>
                  {/* thick glow base */}
                  <motion.line
                    x1={g.sx} y1={g.sy} x2={g.ex} y2={g.ey}
                    stroke="#6b21a8" strokeWidth={isActive ? 5 : 3.5}
                    strokeOpacity={0.4} strokeLinecap="round"
                    filter="url(#glnD)"
                    initial={{ pathLength:0, opacity:0 }}
                    animate={{ pathLength:1, opacity:1 }}
                    transition={{ duration:0.7, delay:i*0.18, ease:"easeOut" }}
                  />
                  {/* bright shimmer line */}
                  <motion.line
                    x1={g.sx} y1={g.sy} x2={g.ex} y2={g.ey}
                    stroke="#a855f7" strokeWidth={isActive ? 2.5 : 1.8}
                    strokeLinecap="round"
                    filter="url(#glnD)"
                    initial={{ pathLength:0, opacity:0 }}
                    animate={{ pathLength:1, opacity:[0, 1, 0.6, 1, 0.8, 1] }}
                    transition={{
                      pathLength:{ duration:0.7, delay:i*0.18, ease:"easeOut" },
                      opacity:{ duration:3, repeat:Infinity, delay:i*0.35, ease:"easeInOut" }
                    }}
                  />
                  {/* sparkle highlight overlay — moves along line */}
                  <motion.line
                    x1={g.sx} y1={g.sy} x2={g.ex} y2={g.ey}
                    stroke="#e9d5ff" strokeWidth={0.8}
                    strokeLinecap="round" strokeOpacity={0.55}
                    strokeDasharray="6 18"
                    initial={{ opacity:0, strokeDashoffset:100 }}
                    animate={{ opacity:1, strokeDashoffset:[-100, 100] }}
                    transition={{
                      opacity:{ duration:0.4, delay:0.8+i*0.18 },
                      strokeDashoffset:{ duration:2.2, repeat:Infinity, ease:"linear", delay:i*0.25 }
                    }}
                  />
                </g>
              );
            })}

            {/* junction dots at node edges */}
            {phase >= 4 && nodes.map((n, i) => (
              <motion.circle key={`jd-${n.id}`}
                cx={n.nx} cy={n.ny} r={5} fill="#e9d5ff"
                style={{ filter:"drop-shadow(0 0 7px #a855f7) drop-shadow(0 0 3px #fff)" }}
                initial={{ scale:0, opacity:0 }}
                animate={{ scale:1, opacity:1 }}
                transition={{ duration:0.3, delay:0.7+i*0.18 }}
              />
            ))}

            {/* center dot */}
            {phase >= 4 && (
              <motion.circle cx={CX} cy={CY} r={9}
                fill="#a855f7" filter="url(#glgD)"
                initial={{ scale:0, opacity:0 }}
                animate={{ scale:1, opacity:1 }}
                transition={{ duration:0.4, delay:0.1 }}
              />
            )}

            {/* STEP 5+6 — domain nodes */}
            {phase >= 5 && nodes.map((n, i) => {
              const isActive = activeModal === n.id;
              return (
                <motion.g key={n.id}
                  onMouseEnter={() => setActiveModal(n.id)}
                  style={{ cursor:"pointer" }}
                  initial={{ scale:0, opacity:0 }}
                  animate={phase >= 6
                    ? { scale:1, opacity:1, y:[0,-10,0] as any,
                        transition:{
                          scale:{ duration:0.5, delay:i*0.12 },
                          opacity:{ duration:0.5, delay:i*0.12 },
                          y:{ duration:4+i*0.3, repeat:Infinity, ease:"easeInOut", delay:i*0.45, repeatType:"loop" },
                        }}
                    : { scale:1, opacity:1, transition:{ duration:0.5, delay:i*0.12 } }
                  }
                >
                  {/* outer rings */}
                  <motion.circle cx={n.nx} cy={n.ny} r={NODE_R+26} fill="none" stroke="#a855f7" strokeWidth={1}
                    animate={{ opacity:isActive?0.5:0, r:isActive?NODE_R+30:NODE_R+26 }} transition={{ duration:0.18 }}/>
                  <motion.circle cx={n.nx} cy={n.ny} r={NODE_R+14} fill="none" stroke="#a855f7" strokeWidth={1.2}
                    animate={{ opacity:isActive?0.28:0 }} transition={{ duration:0.18 }}/>
                  <circle cx={n.nx} cy={n.ny} r={NODE_R+8} fill="none" stroke="#a855f7" strokeWidth={1.6} strokeOpacity={0.55} filter="url(#gsmD)"/>
                  {/* main circle */}
                  <motion.circle cx={n.nx} cy={n.ny} r={isActive?NODE_R+4:NODE_R}
                    fill={isActive?"rgba(168,85,247,0.22)":"rgba(3,1,14,0.95)"}
                    stroke="#a855f7" strokeWidth={2.4} filter="url(#gsmD)"
                    transition={{ duration:0.18 }}/>
                  <circle cx={n.nx} cy={n.ny} r={NODE_R-14} fill="none" stroke="#a855f7" strokeWidth={0.6} strokeOpacity={0.2}/>

                  {/* emoji */}
                  <foreignObject x={n.nx-24} y={n.ny-30} width={48} height={48} style={{ pointerEvents:"none", overflow:"visible" }}>
                    <div style={{ width:48, height:48, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28,
                      filter: isActive ? "drop-shadow(0 0 14px #a855f7) drop-shadow(0 0 6px #fff)" : "drop-shadow(0 0 8px rgba(168,85,247,0.9))",
                      transition:"filter 0.2s" }}>{n.emoji}</div>
                  </foreignObject>

                  {/* ── DOMAIN LABEL — bold, crisp, large ── */}
                  <foreignObject x={n.nx-66} y={n.ny+NODE_R+6} width={132} height={34} style={{ pointerEvents:"none", overflow:"visible" }}>
                    <div style={{
                      width:"100%", height:"100%",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      background: isActive
                        ? "linear-gradient(135deg,rgba(168,85,247,0.5),rgba(139,92,246,0.4))"
                        : "linear-gradient(135deg,rgba(168,85,247,0.25),rgba(109,40,217,0.18))",
                      border: `1.5px solid ${isActive ? "rgba(168,85,247,0.85)" : "rgba(168,85,247,0.55)"}`,
                      borderRadius:9,
                      fontFamily:"'Inter','Segoe UI','Helvetica Neue',Arial,sans-serif",
                      fontSize:13,
                      fontWeight:800,
                      color:"#ffffff",
                      letterSpacing:"0.12em",
                      textTransform:"uppercase",
                      whiteSpace:"nowrap",
                      boxShadow: isActive
                        ? `0 0 18px rgba(168,85,247,0.6), inset 0 1px 0 rgba(255,255,255,0.12)`
                        : `0 0 10px rgba(168,85,247,0.3), inset 0 1px 0 rgba(255,255,255,0.07)`,
                      textShadow:"0 0 10px rgba(168,85,247,0.8), 0 1px 2px rgba(0,0,0,0.9)",
                      transition:"all 0.2s",
                    }}>
                      {n.label}
                    </div>
                  </foreignObject>
                </motion.g>
              );
            })}

            {/* STEP 8 — pixel girl (no-bg PNG) */}
            {phase >= 8 && (
              <motion.g
                initial={{ opacity:0, scale:0 }}
                animate={{ opacity:1, scale:1, y:[0,-8,0] as any }}
                transition={{
                  opacity:{ duration:0.9 },
                  scale:{ duration:0.9, ease:[0.22,1,0.36,1] },
                  y:{ duration:3.8, repeat:Infinity, ease:"easeInOut", delay:1, repeatType:"loop" }
                }}
                style={{ pointerEvents:"none" }}
              >
                {/* ground glow rings */}
                <ellipse cx={CX} cy={CY+96} rx={115} ry={22} fill="#a855f7" fillOpacity={0.07}/>
                <ellipse cx={CX} cy={CY+92} rx={68} ry={14} fill="url(#grndD)" filter="url(#glgD)"/>
                {[40,62,86].map(rx => (
                  <ellipse key={rx} cx={CX} cy={CY+93} rx={rx} ry={rx*0.19}
                    fill="none" stroke="#a855f7" strokeWidth={0.9} strokeOpacity={0.28}/>
                ))}
                {/* girl image — green-bg removed PNG served from /public */}
                <image
                  href="/wie-gril-nobg.png"
                  x={CX - 62}
                  y={CY - 162}
                  width={124}
                  height={258}
                  style={{
                    filter:"drop-shadow(0 0 18px rgba(168,85,247,0.95)) drop-shadow(0 0 36px rgba(139,92,246,0.6)) drop-shadow(0 6px 24px rgba(0,0,0,0.7))",
                    imageRendering:"pixelated",
                  }}
                />
              </motion.g>
            )}

            {/* STEP 7 — animated particles on ALL 6 lines */}
            {phase >= 7 && nodes.map((n, i) =>
              [0, 0.65, 1.3].map(offset => (
                <g key={`pt-${n.id}-${offset}`}>
                  {/* outer glow halo */}
                  <circle r={5} fill="#a855f7" fillOpacity={0.5}
                    style={{ filter:"drop-shadow(0 0 8px #a855f7) drop-shadow(0 0 16px #7c3aed)" }}>
                    <animateMotion dur="1.9s" repeatCount="indefinite" begin={`${i*0.2 + offset}s`} calcMode="linear">
                      <mpath href={`#mp-${n.id}-${String(offset).replace(".","_")}`}/>
                    </animateMotion>
                  </circle>
                  {/* bright white core */}
                  <circle r={2.2} fill="#ffffff" fillOpacity={0.95}>
                    <animateMotion dur="1.9s" repeatCount="indefinite" begin={`${i*0.2 + offset}s`} calcMode="linear">
                      <mpath href={`#mp-${n.id}-${String(offset).replace(".","_")}`}/>
                    </animateMotion>
                  </circle>
                </g>
              ))
            )}
          </svg>
        </div>

        {/* hint */}
        {phase >= 5 && (
          <motion.p
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.2 }}
            style={{
              position:"relative", zIndex:10,
              fontFamily:"'Inter','Segoe UI','Helvetica Neue',Arial,sans-serif",
              fontSize:9, letterSpacing:"0.3em",
              color:"rgba(255,255,255,0.18)", textTransform:"uppercase", marginTop:-10
            }}
          >
            Hover a domain to explore
          </motion.p>
        )}
      </section>
    </>
  );
}