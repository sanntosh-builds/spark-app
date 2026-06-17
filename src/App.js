import { useState } from "react";

// ── THEME ────────────────────────────────────────────────────────────
const T = {
  navy:    "#0D0F1A",
  navy2:   "#161829",
  card:    "#1A1D2E",
  card2:   "#20243A",
  coral:   "#FF4D6D",
  gold:    "#FFD166",
  lav:     "#C4B7E8",
  muted:   "#6B6E8A",
  white:   "#F5F0FF",
  border:  "rgba(196,183,232,0.12)",
};

const css = {
  app: {
    minHeight: "100vh", background: T.navy,
    color: T.white, fontFamily: "'Inter', sans-serif",
    display: "flex", flexDirection: "column",
  },
};

// ── MOCK DATA ─────────────────────────────────────────────────────────
const MOCK_USERS = [
  { id:1, name:"Priya S.", age:26, city:"Mumbai", mode:"date",
    bio:"Bookworm, chai addict, weekend hiker. Looking for someone to explore cafés and trails with.",
    interests:["Books","Hiking","Coffee","Travel"], emoji:"🌸", match:92 },
  { id:2, name:"Leo K.", age:28, city:"Berlin", mode:"friends",
    bio:"Photographer & music producer. Always down for a jam session or gallery hop.",
    interests:["Music","Art","Photography","Nightlife"], emoji:"🎸", match:87 },
  { id:3, name:"Amara T.", age:24, city:"Nairobi", mode:"date",
    bio:"Software dev by day, amateur chef by night. Swipe if you like spicy food debates.",
    interests:["Coding","Cooking","Fitness","Films"], emoji:"🍜", match:85 },
  { id:4, name:"Jin W.", age:30, city:"Seoul", mode:"hangout",
    bio:"Board game fanatic and weekend cyclist. Looking for chill people to hang with.",
    interests:["Board Games","Cycling","Anime","Cooking"], emoji:"🎲", match:80 },
  { id:5, name:"Sofia R.", age:27, city:"Barcelona", mode:"date",
    bio:"Architect with a love for rooftop sunsets and terrible puns. Fluent in sarcasm.",
    interests:["Architecture","Travel","Wine","Comedy"], emoji:"🌅", match:78 },
  { id:6, name:"Arjun M.", age:25, city:"Kathmandu", mode:"hangout",
    bio:"Trekking guide and landscape painter. Nepal's trails are my therapy.",
    interests:["Trekking","Art","Nature","Culture"], emoji:"🏔️", match:91 },
];

const MOCK_EVENTS = [
  { id:1, title:"Rooftop Sunset Social", city:"Kathmandu", date:"Jun 20", time:"5:30 PM",
    category:"Social", attendees:24, cap:40, emoji:"🌇", host:"Spark Community" },
  { id:2, title:"Photography Walk — Old Town", city:"Berlin", date:"Jun 22", time:"10:00 AM",
    category:"Hobby", attendees:12, cap:20, emoji:"📸", host:"Leo K." },
  { id:3, title:"Startup Founders Mixer", city:"Nairobi", date:"Jun 25", time:"7:00 PM",
    category:"Networking", attendees:38, cap:60, emoji:"🚀", host:"Spark Events" },
  { id:4, title:"Board Game Night", city:"Seoul", date:"Jun 21", time:"6:00 PM",
    category:"Games", attendees:8, cap:16, emoji:"🎲", host:"Jin W." },
];

const MOCK_MESSAGES = [
  { id:1, from:"Priya S.", emoji:"🌸", preview:"Hey! I saw you like hiking too 😊", time:"2m", unread:2 },
  { id:2, from:"Arjun M.", emoji:"🏔️", preview:"The Langtang trail is incredible this season!", time:"1h", unread:0 },
  { id:3, from:"Leo K.", emoji:"🎸", preview:"Would love to collaborate on a project", time:"3h", unread:1 },
];

// ── SMALL COMPONENTS ──────────────────────────────────────────────────
function Badge({ label, color = T.lav }) {
  return (
    <span style={{
      background: color + "1A", border: `1px solid ${color}40`,
      color, fontSize: 11, fontWeight: 600, padding: "3px 10px",
      borderRadius: 50, letterSpacing: 0.3,
    }}>{label}</span>
  );
}

function ModeTag({ mode }) {
  const map = { date:["💫 Date",T.coral], friends:["🤝 Friends",T.lav], hangout:["☕ Hangout",T.gold] };
  const [label, color] = map[mode] || ["✦",T.lav];
  return <Badge label={label} color={color} />;
}

function Btn({ children, onClick, variant="primary", small, style={} }) {
  const base = {
    border: "none", borderRadius: 50, cursor: "pointer", fontWeight: 600,
    fontFamily: "'Inter',sans-serif", transition: "transform 0.15s, box-shadow 0.15s",
    padding: small ? "8px 18px" : "13px 28px",
    fontSize: small ? 13 : 15, display:"inline-flex", alignItems:"center", gap:6,
    ...style,
  };
  const variants = {
    primary: { background: T.coral, color:"#fff" },
    ghost:   { background:"transparent", color:T.white, border:`1.5px solid ${T.border}` },
    gold:    { background: T.gold, color: T.navy },
    soft:    { background: T.card2, color: T.lav },
  };
  return (
    <button style={{...base,...variants[variant]}} onClick={onClick}
      onMouseEnter={e => e.currentTarget.style.transform="translateY(-1px)"}
      onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>
      {children}
    </button>
  );
}

// ── BOTTOM NAV ────────────────────────────────────────────────────────
function BottomNav({ screen, setScreen }) {
  const tabs = [
    { id:"discover", icon:"✦", label:"Discover" },
    { id:"events",   icon:"🎉", label:"Events" },
    { id:"messages", icon:"💬", label:"Messages" },
    { id:"profile",  icon:"👤", label:"Profile" },
  ];
  return (
    <div style={{
      position:"fixed", bottom:0, left:0, right:0,
      background: T.navy2, borderTop:`1px solid ${T.border}`,
      display:"flex", justifyContent:"space-around", padding:"10px 0 18px",
      zIndex: 50,
    }}>
      {tabs.map(t => {
        const active = screen === t.id;
        return (
          <button key={t.id} onClick={() => setScreen(t.id)}
            style={{
              background:"none", border:"none", cursor:"pointer",
              display:"flex", flexDirection:"column", alignItems:"center", gap:3,
              color: active ? T.coral : T.muted,
              fontFamily:"'Inter',sans-serif",
            }}>
            <span style={{ fontSize:20 }}>{t.icon}</span>
            <span style={{ fontSize:10, fontWeight: active?700:500 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── ONBOARDING ────────────────────────────────────────────────────────
function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ name:"", age:"", city:"", mode:"", interests:[] });

  const interests = ["Travel","Music","Hiking","Cooking","Art","Gaming","Coffee","Books","Fitness","Photography","Film","Tech"];
  const modes = [
    { id:"date",    icon:"💫", label:"Find a Date",   desc:"Romantic connections" },
    { id:"hangout", icon:"🤝", label:"Make Friends",   desc:"Expand your circle" },
    { id:"events",  icon:"🎉", label:"Join Events",   desc:"Meet people in person" },
  ];

  const toggleInterest = (i) => {
    setData(d => ({
      ...d,
      interests: d.interests.includes(i) ? d.interests.filter(x=>x!==i) : [...d.interests, i]
    }));
  };

  const steps = [
    // Step 0 — name/age/city
    <div key="0">
      <h2 style={{ fontSize:26, fontWeight:800, marginBottom:6, letterSpacing:-0.5 }}>
        Hey there 👋
      </h2>
      <p style={{ color:T.muted, marginBottom:28, fontSize:14 }}>Let's build your Spark profile</p>
      {[
        { label:"Your name", key:"name", placeholder:"e.g. Arjun" },
        { label:"Your age", key:"age", placeholder:"e.g. 25", type:"number" },
        { label:"Your city", key:"city", placeholder:"e.g. Kathmandu" },
      ].map(f => (
        <div key={f.key} style={{ marginBottom:16 }}>
          <label style={{ fontSize:12, color:T.lav, fontWeight:600, display:"block", marginBottom:6 }}>{f.label}</label>
          <input
            type={f.type||"text"} placeholder={f.placeholder}
            value={data[f.key]}
            onChange={e => setData(d=>({...d,[f.key]:e.target.value}))}
            style={{
              width:"100%", padding:"13px 16px", borderRadius:12,
              background:T.card2, border:`1px solid ${T.border}`,
              color:T.white, fontSize:15, outline:"none",
              fontFamily:"'Inter',sans-serif",
            }}
          />
        </div>
      ))}
    </div>,

    // Step 1 — mode
    <div key="1">
      <h2 style={{ fontSize:26, fontWeight:800, marginBottom:6, letterSpacing:-0.5 }}>What are you here for?</h2>
      <p style={{ color:T.muted, marginBottom:24, fontSize:14 }}>You can change this anytime</p>
      {modes.map(m => (
        <div key={m.id} onClick={() => setData(d=>({...d,mode:m.id}))}
          style={{
            background: data.mode===m.id ? `${T.coral}22` : T.card2,
            border: `1.5px solid ${data.mode===m.id ? T.coral : T.border}`,
            borderRadius:16, padding:"18px 20px", marginBottom:12,
            cursor:"pointer", display:"flex", alignItems:"center", gap:16,
            transition:"all 0.2s",
          }}>
          <span style={{ fontSize:26 }}>{m.icon}</span>
          <div>
            <div style={{ fontWeight:700, fontSize:15 }}>{m.label}</div>
            <div style={{ color:T.muted, fontSize:13 }}>{m.desc}</div>
          </div>
          {data.mode===m.id && <span style={{ marginLeft:"auto", color:T.coral, fontSize:18 }}>✓</span>}
        </div>
      ))}
    </div>,

    // Step 2 — interests
    <div key="2">
      <h2 style={{ fontSize:26, fontWeight:800, marginBottom:6, letterSpacing:-0.5 }}>What do you love?</h2>
      <p style={{ color:T.muted, marginBottom:24, fontSize:14 }}>Pick at least 3 interests</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
        {interests.map(i => {
          const on = data.interests.includes(i);
          return (
            <button key={i} onClick={() => toggleInterest(i)}
              style={{
                padding:"9px 18px", borderRadius:50, cursor:"pointer",
                background: on ? T.coral : T.card2,
                border: `1.5px solid ${on ? T.coral : T.border}`,
                color: on ? "#fff" : T.lav, fontWeight:600, fontSize:13,
                fontFamily:"'Inter',sans-serif", transition:"all 0.15s",
              }}>{i}</button>
          );
        })}
      </div>
    </div>,
  ];

  const canNext = [
    data.name && data.age && data.city,
    data.mode,
    data.interests.length >= 3,
  ];

  return (
    <div style={{ minHeight:"100vh", background:T.navy, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px 20px" }}>
      {/* progress */}
      <div style={{ width:"100%", maxWidth:420, marginBottom:32 }}>
        <div style={{ display:"flex", gap:6 }}>
          {steps.map((_,i) => (
            <div key={i} style={{
              flex:1, height:3, borderRadius:10,
              background: i <= step ? T.coral : T.card2,
              transition:"background 0.3s",
            }}/>
          ))}
        </div>
      </div>

      <div style={{ width:"100%", maxWidth:420 }}>
        {steps[step]}
        <div style={{ marginTop:32, display:"flex", gap:12 }}>
          {step > 0 && <Btn variant="ghost" onClick={() => setStep(s=>s-1)}>Back</Btn>}
          <Btn
            onClick={() => step < steps.length-1 ? setStep(s=>s+1) : onDone(data)}
            style={{ flex:1, justifyContent:"center" }}
            variant={canNext[step] ? "primary" : "soft"}
          >
            {step === steps.length-1 ? "Launch my Spark ✦" : "Continue →"}
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ── DISCOVER SCREEN ───────────────────────────────────────────────────
function Discover({ user }) {
  const [idx, setIdx] = useState(0);
  const [liked, setLiked] = useState([]);
  const [passed, setPassed] = useState([]);
  const [toast, setToast] = useState(null);
  const [filter, setFilter] = useState("all");

  const visible = MOCK_USERS.filter(u =>
    filter === "all" || u.mode === filter
  ).filter(u => !liked.includes(u.id) && !passed.includes(u.id));

  const current = visible[0];

  const showToast = (msg, color) => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2000);
  };

  const handleLike = () => {
    if (!current) return;
    setLiked(l => [...l, current.id]);
    showToast(`You liked ${current.name}! 💫`, T.coral);
  };
  const handlePass = () => {
    if (!current) return;
    setPassed(p => [...p, current.id]);
  };

  const filters = [
    { id:"all", label:"All" },
    { id:"date", label:"💫 Date" },
    { id:"hangout", label:"☕ Hangout" },
    { id:"friends", label:"🤝 Friends" },
  ];

  return (
    <div style={{ padding:"20px 16px 90px" }}>
      {/* header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <div>
          <div style={{ fontSize:22, fontWeight:800, letterSpacing:-0.5 }}>
            ✦ Spark
          </div>
          <div style={{ fontSize:12, color:T.muted }}>Hey {user?.name?.split(" ")[0] || "there"} 👋</div>
        </div>
        <div style={{ position:"relative" }}>
          <div style={{
            width:40, height:40, borderRadius:50, background:`${T.coral}22`,
            border:`1.5px solid ${T.coral}40`, display:"flex", alignItems:"center",
            justifyContent:"center", fontSize:18, cursor:"pointer",
          }}>🔔</div>
        </div>
      </div>

      {/* filter tabs */}
      <div style={{ display:"flex", gap:8, marginBottom:20, overflowX:"auto", paddingBottom:4 }}>
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)}
            style={{
              padding:"7px 16px", borderRadius:50, border:"none",
              background: filter===f.id ? T.coral : T.card2,
              color: filter===f.id ? "#fff" : T.lav,
              fontWeight:600, fontSize:12, cursor:"pointer", whiteSpace:"nowrap",
              fontFamily:"'Inter',sans-serif",
            }}>{f.label}</button>
        ))}
      </div>

      {/* card */}
      {current ? (
        <div>
          {/* profile card */}
          <div style={{
            background: T.card, border:`1px solid ${T.border}`,
            borderRadius:24, overflow:"hidden", marginBottom:16,
          }}>
            {/* avatar area */}
            <div style={{
              background: `linear-gradient(135deg, ${T.card2}, ${T.navy2})`,
              height:240, display:"flex", alignItems:"center", justifyContent:"center",
              position:"relative",
            }}>
              <div style={{ fontSize:80 }}>{current.emoji}</div>
              {/* match badge */}
              <div style={{
                position:"absolute", top:16, right:16,
                background:`${T.coral}22`, border:`1px solid ${T.coral}60`,
                borderRadius:50, padding:"4px 12px",
                fontSize:12, fontWeight:700, color:T.coral,
              }}>
                {current.match}% match
              </div>
              {/* mode badge */}
              <div style={{ position:"absolute", top:16, left:16 }}>
                <ModeTag mode={current.mode} />
              </div>
            </div>

            {/* info */}
            <div style={{ padding:"20px 22px" }}>
              <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:6 }}>
                <span style={{ fontSize:20, fontWeight:800 }}>{current.name}</span>
                <span style={{ color:T.muted, fontSize:14 }}>{current.age}</span>
                <span style={{ color:T.muted, fontSize:13, marginLeft:"auto" }}>📍 {current.city}</span>
              </div>
              <p style={{ color:T.lav, fontSize:13, lineHeight:1.6, marginBottom:16 }}>{current.bio}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {current.interests.map(i => <Badge key={i} label={i} color={T.lav} />)}
              </div>
            </div>
          </div>

          {/* action buttons */}
          <div style={{ display:"flex", gap:12, justifyContent:"center" }}>
            <button onClick={handlePass}
              style={{
                width:58, height:58, borderRadius:50, border:`1.5px solid ${T.border}`,
                background:T.card2, fontSize:22, cursor:"pointer",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>👋</button>
            <button onClick={handleLike}
              style={{
                flex:1, height:58, borderRadius:50, border:"none",
                background:`linear-gradient(135deg, ${T.coral}, #e83e5c)`,
                color:"#fff", fontSize:16, fontWeight:700, cursor:"pointer",
                fontFamily:"'Inter',sans-serif",
              }}>Like {current.name.split(" ")[0]} ✦</button>
            <button
              style={{
                width:58, height:58, borderRadius:50, border:`1.5px solid ${T.border}`,
                background:T.card2, fontSize:22, cursor:"pointer",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>⭐</button>
          </div>

          {/* remaining count */}
          <div style={{ textAlign:"center", marginTop:14, fontSize:12, color:T.muted }}>
            {visible.length - 1} more people nearby
          </div>
        </div>
      ) : (
        <div style={{ textAlign:"center", padding:"60px 20px" }}>
          <div style={{ fontSize:48, marginBottom:16 }}>✨</div>
          <div style={{ fontWeight:700, fontSize:18, marginBottom:8 }}>You've seen everyone!</div>
          <div style={{ color:T.muted, fontSize:13, marginBottom:24 }}>Check back soon — new people join daily.</div>
          <Btn onClick={() => { setLiked([]); setPassed([]); }}>Start over</Btn>
        </div>
      )}

      {/* toast */}
      {toast && (
        <div style={{
          position:"fixed", top:24, left:"50%", transform:"translateX(-50%)",
          background:toast.color, color:"#fff", padding:"10px 22px",
          borderRadius:50, fontWeight:600, fontSize:14, zIndex:200,
          boxShadow:"0 8px 24px rgba(0,0,0,0.3)",
        }}>{toast.msg}</div>
      )}
    </div>
  );
}

// ── EVENTS SCREEN ─────────────────────────────────────────────────────
function Events() {
  const [joined, setJoined] = useState([]);

  const toggle = (id) => setJoined(j => j.includes(id) ? j.filter(x=>x!==id) : [...j, id]);

  const catColor = { Social:T.coral, Hobby:T.lav, Networking:T.gold, Games:T.lav };

  return (
    <div style={{ padding:"20px 16px 90px" }}>
      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:22, fontWeight:800, letterSpacing:-0.5, marginBottom:4 }}>Events 🎉</div>
        <div style={{ fontSize:13, color:T.muted }}>Real meetups, real people</div>
      </div>

      {/* host CTA */}
      <div style={{
        background:`linear-gradient(135deg, ${T.coral}22, ${T.gold}11)`,
        border:`1px solid ${T.coral}30`, borderRadius:20,
        padding:"18px 20px", marginBottom:22, display:"flex", alignItems:"center", gap:16,
      }}>
        <span style={{ fontSize:30 }}>🚀</span>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:700, fontSize:14 }}>Host your own event</div>
          <div style={{ color:T.muted, fontSize:12 }}>Free to list · Reach local Spark members</div>
        </div>
        <Btn small variant="primary">Create</Btn>
      </div>

      {MOCK_EVENTS.map(ev => {
        const isJoined = joined.includes(ev.id);
        const pct = Math.round(ev.attendees / ev.cap * 100);
        return (
          <div key={ev.id} style={{
            background:T.card, border:`1px solid ${T.border}`,
            borderRadius:20, padding:"20px 18px", marginBottom:14,
          }}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:14 }}>
              <div style={{
                width:52, height:52, borderRadius:14,
                background:T.card2, display:"flex", alignItems:"center",
                justifyContent:"center", fontSize:24, flexShrink:0,
              }}>{ev.emoji}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:15, marginBottom:4 }}>{ev.title}</div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:8 }}>
                  <Badge label={ev.category} color={catColor[ev.category] || T.lav} />
                  <span style={{ fontSize:12, color:T.muted }}>📍 {ev.city}</span>
                </div>
                <div style={{ fontSize:12, color:T.lav }}>
                  📅 {ev.date} · {ev.time} · by {ev.host}
                </div>
              </div>
            </div>

            {/* capacity bar */}
            <div style={{ marginTop:14, marginBottom:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:T.muted, marginBottom:5 }}>
                <span>{ev.attendees} going</span>
                <span>{ev.cap - ev.attendees} spots left</span>
              </div>
              <div style={{ background:T.card2, borderRadius:10, height:5 }}>
                <div style={{
                  height:5, borderRadius:10, width:`${pct}%`,
                  background: pct > 80 ? T.coral : T.lav,
                  transition:"width 0.4s",
                }}/>
              </div>
            </div>

            <Btn
              small
              variant={isJoined ? "soft" : "primary"}
              onClick={() => toggle(ev.id)}
              style={{ width:"100%", justifyContent:"center" }}
            >
              {isJoined ? "✓ You're going!" : "RSVP — Join event"}
            </Btn>
          </div>
        );
      })}
    </div>
  );
}

// ── MESSAGES SCREEN ───────────────────────────────────────────────────
function Messages() {
  const [active, setActive] = useState(null);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState({
    1: [{ from:"them", text:"Hey! I saw you like hiking too 😊" },
        { from:"them", text:"Have you done the Annapurna circuit?" }],
    2: [{ from:"them", text:"The Langtang trail is incredible this season!" }],
    3: [{ from:"them", text:"Would love to collaborate on a project" }],
  });

  const send = () => {
    if (!input.trim()) return;
    setChats(c => ({
      ...c,
      [active]: [...(c[active]||[]), { from:"me", text:input }]
    }));
    setInput("");
  };

  if (active) {
    const person = MOCK_MESSAGES.find(m=>m.id===active);
    const msgs = chats[active] || [];
    return (
      <div style={{ display:"flex", flexDirection:"column", height:"100vh" }}>
        {/* header */}
        <div style={{
          background:T.navy2, padding:"18px 16px 14px",
          borderBottom:`1px solid ${T.border}`,
          display:"flex", alignItems:"center", gap:12,
        }}>
          <button onClick={() => setActive(null)}
            style={{ background:"none", border:"none", color:T.lav, fontSize:20, cursor:"pointer" }}>←</button>
          <div style={{
            width:38, height:38, borderRadius:50, background:`${T.coral}22`,
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:18,
          }}>{person?.emoji}</div>
          <div>
            <div style={{ fontWeight:700, fontSize:15 }}>{person?.from}</div>
            <div style={{ fontSize:11, color:T.muted }}>Active now</div>
          </div>
        </div>

        {/* messages */}
        <div style={{ flex:1, overflow:"auto", padding:"16px", display:"flex", flexDirection:"column", gap:10 }}>
          {msgs.map((m,i) => (
            <div key={i} style={{ display:"flex", justifyContent:m.from==="me"?"flex-end":"flex-start" }}>
              <div style={{
                background: m.from==="me" ? T.coral : T.card2,
                color: "#fff", padding:"10px 14px",
                borderRadius: m.from==="me" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                maxWidth:"75%", fontSize:14, lineHeight:1.5,
              }}>{m.text}</div>
            </div>
          ))}
        </div>

        {/* input */}
        <div style={{
          padding:"12px 16px 28px", background:T.navy2,
          borderTop:`1px solid ${T.border}`,
          display:"flex", gap:10,
        }}>
          <input
            value={input} onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>e.key==="Enter"&&send()}
            placeholder="Say something..."
            style={{
              flex:1, padding:"12px 16px", borderRadius:50,
              background:T.card2, border:`1px solid ${T.border}`,
              color:T.white, fontSize:14, outline:"none",
              fontFamily:"'Inter',sans-serif",
            }}
          />
          <button onClick={send}
            style={{
              width:44, height:44, borderRadius:50, background:T.coral,
              border:"none", color:"#fff", fontSize:18, cursor:"pointer",
            }}>↑</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding:"20px 16px 90px" }}>
      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:22, fontWeight:800, letterSpacing:-0.5, marginBottom:4 }}>Messages 💬</div>
        <div style={{ fontSize:13, color:T.muted }}>Your conversations</div>
      </div>
      {MOCK_MESSAGES.map(m => (
        <div key={m.id} onClick={() => setActive(m.id)}
          style={{
            background:T.card, border:`1px solid ${T.border}`,
            borderRadius:18, padding:"16px 18px", marginBottom:10,
            display:"flex", alignItems:"center", gap:14, cursor:"pointer",
          }}>
          <div style={{
            width:46, height:46, borderRadius:50, background:`${T.coral}22`,
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0,
          }}>{m.emoji}</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontWeight:700, fontSize:14, marginBottom:3 }}>{m.from}</div>
            <div style={{ color:T.muted, fontSize:12, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{m.preview}</div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6 }}>
            <span style={{ fontSize:11, color:T.muted }}>{m.time}</span>
            {m.unread > 0 && (
              <span style={{
                background:T.coral, color:"#fff", fontSize:10, fontWeight:700,
                width:18, height:18, borderRadius:50, display:"flex", alignItems:"center", justifyContent:"center",
              }}>{m.unread}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── PROFILE SCREEN ────────────────────────────────────────────────────
function Profile({ user }) {
  const name = user?.name || "Your Name";
  const city = user?.city || "Your City";
  const interests = user?.interests || ["Travel","Coffee","Hiking"];

  const stats = [
    { val:"12", label:"Likes sent" },
    { val:"8",  label:"Matches" },
    { val:"3",  label:"Events" },
  ];

  return (
    <div style={{ padding:"20px 16px 90px" }}>
      <div style={{ marginBottom:24, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ fontSize:22, fontWeight:800, letterSpacing:-0.5 }}>Profile</div>
        <Btn small variant="ghost">Edit</Btn>
      </div>

      {/* avatar card */}
      <div style={{
        background:T.card, border:`1px solid ${T.border}`,
        borderRadius:24, padding:"32px 24px", textAlign:"center", marginBottom:16,
      }}>
        <div style={{
          width:80, height:80, borderRadius:50, margin:"0 auto 16px",
          background:`linear-gradient(135deg, ${T.coral}, #e83e5c)`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:34,
        }}>✦</div>
        <div style={{ fontSize:22, fontWeight:800, marginBottom:4 }}>{name}</div>
        <div style={{ color:T.muted, fontSize:13, marginBottom:14 }}>📍 {city}</div>
        <div style={{ marginBottom:20 }}>
          <ModeTag mode={user?.mode || "hangout"} />
        </div>
        {/* stats */}
        <div style={{ display:"flex", justifyContent:"space-around", paddingTop:16, borderTop:`1px solid ${T.border}` }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign:"center" }}>
              <div style={{ fontSize:20, fontWeight:800, color:T.coral }}>{s.val}</div>
              <div style={{ fontSize:11, color:T.muted }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* interests */}
      <div style={{
        background:T.card, border:`1px solid ${T.border}`,
        borderRadius:20, padding:"18px 20px", marginBottom:14,
      }}>
        <div style={{ fontSize:13, fontWeight:700, marginBottom:12, color:T.lav }}>My Interests</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
          {interests.map(i => <Badge key={i} label={i} color={T.lav} />)}
        </div>
      </div>

      {/* settings list */}
      {["Notification settings","Privacy & safety","Spark Premium ⭐","Help & support","Sign out"].map(item => (
        <div key={item} style={{
          background:T.card, border:`1px solid ${T.border}`,
          borderRadius:14, padding:"15px 18px", marginBottom:8,
          display:"flex", justifyContent:"space-between", alignItems:"center",
          cursor:"pointer", fontSize:14,
        }}>
          <span style={{ color: item.includes("Premium") ? T.gold : T.white }}>{item}</span>
          <span style={{ color:T.muted }}>›</span>
        </div>
      ))}
    </div>
  );
}

// ── ROOT APP ──────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("discover");
  const [user, setUser] = useState(null);

  if (!user) {
    return <Onboarding onDone={data => setUser(data)} />;
  }

  const screens = {
    discover: <Discover user={user} />,
    events:   <Events />,
    messages: <Messages />,
    profile:  <Profile user={user} />,
  };

  return (
    <div style={css.app}>
      <div style={{ flex:1, overflowY:"auto", paddingBottom:0 }}>
        {screens[screen]}
      </div>
      <BottomNav screen={screen} setScreen={setScreen} />
    </div>
  );
}