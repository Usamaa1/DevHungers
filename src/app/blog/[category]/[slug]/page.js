"use client";
import { useState, use } from "react";

const themes = {
  mongodb: {
    primary: "#00A651",
    primaryLight: "#00ED6415",
    primaryBorder: "#00ED6430",
    gradient: "linear-gradient(135deg, #00ED64 0%, #00684A 100%)",
    label: "MongoDB",
    codeAccent: "#00ED64",
  },
  nodejs: {
    primary: "#2E7D32",
    primaryLight: "#6cc24a15",
    primaryBorder: "#6cc24a30",
    gradient: "linear-gradient(135deg, #6cc24a 0%, #339933 100%)",
    label: "Node.js",
    codeAccent: "#6cc24a",
  },
  javascript: {
    primary: "#B8860B",
    primaryLight: "#F7DF1E15",
    primaryBorder: "#F7DF1E40",
    gradient: "linear-gradient(135deg, #F7DF1E 0%, #E2C000 100%)",
    label: "JavaScript",
    codeAccent: "#F7DF1E",
  },
};

const sidebarItems = [
  { id: 1, label: "Introduction", tag: "01", done: true },
  { id: 2, label: "Query Documents", tag: "02", active: true },
  { id: 3, label: "Update Docs", tag: "03" },
  { id: 4, label: "Delete Docs", tag: "04" },
  { id: 5, label: "Aggregation", tag: "05" },
  { id: 6, label: "Indexes & Performance", tag: "06" },
];

const operators = [
  { op: "$eq", desc: "Equal to value" },
  { op: "$ne", desc: "Not equal" },
  { op: "$lt", desc: "Less than" },
  { op: "$gt", desc: "Greater than" },
  { op: "$in", desc: "Matches array" },
  { op: "$exists", desc: "Field exists" },
];

export default function TutorialPage({ params }) {
  const { category, slug } = use(params);
  const theme = themes[category] || themes.javascript;

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("js");
  const [menuOpen, setMenuOpen] = useState(false);

  const codeSnippets = {
    js: `// Find documents matching the filter\ndb.inventory.find({\n  status: "D",\n  qty: { $lt: 30 }\n}).pretty();`,
    python: `# Python driver usage\ninventory = db["inventory"]\nresults = inventory.find({\n    "status": "D",\n    "qty": { "$lt": 30 }\n})`,
    shell: `# Run directly in mongosh\nmongosh --eval '\n  db.inventory.find({\n    status: "D",\n    qty: { $lt: 30 }\n  }).pretty()\n'`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#F5F3EF",
      fontFamily: "'DM Sans','Helvetica Neue',sans-serif",
      color: "#1C1917", position: "relative",
      "--t-primary": theme.primary,
      "--t-primary-light": theme.primaryLight,
      "--t-primary-border": theme.primaryBorder,
      "--t-gradient": theme.gradient,
      "--t-code-accent": theme.codeAccent,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=DM+Mono:wght@400;500&family=Syne:wght@700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .orb { position: fixed; border-radius: 50%; filter: blur(110px); pointer-events: none; z-index: 0; }
        .orb-1 { width: 520px; height: 520px; top: -180px; right: -80px; background: var(--t-primary-light); animation: orbf 13s ease-in-out infinite alternate; }
        .orb-2 { width: 360px; height: 360px; bottom: 60px; left: -100px; background: var(--t-primary-light); opacity: 0.5; animation: orbf 17s ease-in-out infinite alternate-reverse; }
        .orb-3 { width: 260px; height: 260px; top: 55%; right: 12%; background: var(--t-primary-light); opacity: 0.4; animation: orbf 20s ease-in-out infinite alternate; }
        @keyframes orbf { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(28px,22px) scale(1.06); } }

        .pc { position: relative; z-index: 1; }

        .nav {
          position: sticky; top: 0; z-index: 50;
          height: 58px; display: flex; align-items: center; justify-content: space-between;
          padding: 0 40px;
          background: #FFFFFF;
          border-bottom: 1px solid rgba(28,25,23,0.08);
        }
        .nav-logo { font-family:'Syne',sans-serif; font-size:17px; font-weight:800; color:#1C1917; letter-spacing:-0.4px; display:flex; align-items:center; gap:9px; text-decoration:none; }
        .logo-mark { width:26px; height:26px; border-radius:7px; background:var(--t-gradient); display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:800; color:#001E2B; flex-shrink:0; }
        .nav-center { display:flex; align-items:center; gap:2px; }
        .nav-link { font-size:13px; font-weight:500; color:#78716C; padding:5px 12px; border-radius:7px; cursor:pointer; transition:all .18s; text-decoration:none; border:none; background:none; }
        .nav-link:hover { background:rgba(28,25,23,.06); color:#1C1917; }
        .nav-right { display:flex; align-items:center; gap:10px; }
        .nav-badge { font-family:'DM Mono',monospace; font-size:10px; font-weight:500; letter-spacing:.1em; text-transform:uppercase; padding:4px 10px; border-radius:5px; background:var(--t-primary-light); color:var(--t-primary); border:1px solid var(--t-primary-border); }
        .btn-signin { font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600; padding:6px 16px; border-radius:8px; background:#1C1917; color:#F5F3EF; border:none; cursor:pointer; transition:all .18s; }
        .btn-signin:hover { background:#292524; transform:translateY(-1px); box-shadow:0 4px 12px rgba(28,25,23,.2); }

        .layout { max-width:1280px; margin:0 auto; padding:0 40px; display:flex; gap:0; }

        .sidebar { width:232px; flex-shrink:0; padding:36px 0 40px; position:sticky; top:58px; height:calc(100vh - 58px); overflow-y:auto; border-right:1px solid rgba(28,25,23,.08); padding-right:28px; }
        .sidebar::-webkit-scrollbar { width:0; }
        .sb-label { font-family:'DM Mono',monospace; font-size:9px; font-weight:600; letter-spacing:.18em; text-transform:uppercase; color:#6B6560; margin-bottom:12px; }
        .prog-track { height:3px; background:rgba(28,25,23,.12); border-radius:3px; margin-bottom:6px; overflow:hidden; }
        .prog-fill { height:100%; width:33%; background:var(--t-gradient); border-radius:3px; }
        .prog-txt { font-family:'DM Mono',monospace; font-size:10px; color:#6B6560; margin-bottom:22px; }
        .prog-txt span { color:var(--t-primary); font-weight:600; }
        .sb-item { display:flex; align-items:center; gap:11px; padding:8px 10px; border-radius:9px; cursor:pointer; transition:all .18s; margin-bottom:2px; }
        .sb-item:hover:not(.active) { background:rgba(28,25,23,.06); }
        .sb-item.active { background:var(--t-primary-light); border:1px solid var(--t-primary-border); }
        .sb-num { font-family:'DM Mono',monospace; font-size:9px; color:#78716C; min-width:18px; font-weight:500; }
        .sb-item.active .sb-num { color:var(--t-primary); }
        .sb-done .sb-num { color:var(--t-primary); }
        .sb-txt { font-size:13px; font-weight:500; color:#1C1917; }
        .sb-item.active .sb-txt { color:#1C1917; font-weight:700; }
        .sb-done .sb-txt { color:#1C1917; }
        .sb-bar { width:3px; height:16px; border-radius:2px; background:var(--t-gradient); margin-left:auto; flex-shrink:0; }

        .main { flex:1; padding:44px 48px 100px; max-width:780px; min-width:0; }

        .bc { display:flex; align-items:center; gap:7px; margin-bottom:28px; }
        .bc-item { font-family:'DM Mono',monospace; font-size:11px; color:#A8A29E; text-decoration:none; transition:color .15s; }
        .bc-item:hover { color:#78716C; }
        .bc-sep { color:#D4CFC9; }
        .bc-cur { color:var(--t-primary); }

        .ch-tag { display:inline-flex; align-items:center; gap:8px; font-family:'DM Mono',monospace; font-size:10px; letter-spacing:.14em; text-transform:uppercase; color:#A8A29E; margin-bottom:14px; }
        .ch-line { width:20px; height:1px; background:#D4CFC9; }

        .main-title { font-family:'Syne',sans-serif; font-size:clamp(36px,4.5vw,54px); font-weight:800; line-height:1.04; letter-spacing:-2px; margin-bottom:18px; text-transform:capitalize; }
        .main-title span { background:var(--t-gradient); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .main-sub { font-size:16px; font-weight:400; line-height:1.72; color:#78716C; max-width:520px; margin-bottom:32px; }

        .meta-row { display:flex; align-items:center; gap:18px; padding:14px 0; border-top:1px solid rgba(28,25,23,.07); border-bottom:1px solid rgba(28,25,23,.07); margin-bottom:32px; flex-wrap:wrap; }
        .meta-chip { display:flex; align-items:center; gap:6px; font-size:12px; font-weight:500; color:#A8A29E; }
        .diff-pill { font-size:10px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; padding:3px 10px; border-radius:20px; background:var(--t-primary-light); color:var(--t-primary); border:1px solid var(--t-primary-border); }

        .info-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:18px; }
        .info-card { padding:16px 20px; border-radius:13px; background:#FFFFFF; border:1px solid rgba(28,25,23,.08); box-shadow:0 1px 3px rgba(28,25,23,.04); }
        .info-lbl { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.15em; text-transform:uppercase; color:#A8A29E; margin-bottom:7px; }
        .info-val { font-size:14px; font-weight:600; color:#1C1917; }

        .card { background:#FFFFFF; border:1px solid rgba(28,25,23,.08); border-radius:18px; padding:28px 30px; margin-bottom:18px; box-shadow:0 1px 3px rgba(28,25,23,.04),0 4px 16px rgba(28,25,23,.03); transition:box-shadow .25s,border-color .25s; }
        .card:hover { box-shadow:0 2px 8px rgba(28,25,23,.07),0 8px 28px rgba(28,25,23,.06); border-color:rgba(28,25,23,.13); }
        .card-hdr { display:flex; align-items:center; gap:14px; margin-bottom:16px; }
        .card-num { width:34px; height:34px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-family:'DM Mono',monospace; font-size:13px; font-weight:500; color:#001E2B; background:var(--t-gradient); flex-shrink:0; }
        .card-ttl { font-family:'Syne',sans-serif; font-size:19px; font-weight:700; color:#1C1917; letter-spacing:-.4px; }
        .card-body { font-size:15px; line-height:1.75; color:#57534E; margin-bottom:22px; }
        .icode { font-family:'DM Mono',monospace; font-size:12.5px; padding:2px 6px; border-radius:5px; background:#F0EDE8; color:var(--t-primary); border:1px solid rgba(28,25,23,.08); }

        .code-block { border-radius:13px; overflow:hidden; background:#0E1117; border:1px solid rgba(255,255,255,.06); box-shadow:0 8px 32px rgba(28,25,23,.13); }
        .code-toolbar { display:flex; align-items:center; justify-content:space-between; padding:10px 14px; background:#161B22; border-bottom:1px solid rgba(255,255,255,.05); }
        .code-tabs { display:flex; gap:3px; }
        .code-tab { font-family:'DM Mono',monospace; font-size:10px; font-weight:500; letter-spacing:.08em; text-transform:uppercase; padding:4px 10px; border-radius:6px; cursor:pointer; transition:all .18s; color:rgba(226,232,240,.3); background:transparent; border:none; }
        .code-tab.active { background:var(--t-primary-light); color:var(--t-code-accent); }
        .code-tab:hover:not(.active) { background:rgba(255,255,255,.05); color:rgba(226,232,240,.6); }
        .copy-btn { font-family:'DM Mono',monospace; font-size:10px; font-weight:500; letter-spacing:.07em; text-transform:uppercase; padding:4px 12px; border-radius:6px; border:1px solid rgba(255,255,255,.1); background:transparent; color:rgba(226,232,240,.35); cursor:pointer; transition:all .18s; }
        .copy-btn:hover,.copy-btn.copied { border-color:var(--t-primary-border); color:var(--t-code-accent); background:var(--t-primary-light); }
        .code-pre { padding:22px 24px; font-family:'DM Mono',monospace; font-size:13px; line-height:1.75; color:#8B96A8; overflow-x:auto; margin:0; tab-size:2; }
        .ck { color:#7AA2F7; } .cs { color:#9ECE6A; } .co { color:var(--t-code-accent); } .cc { color:#4A5568; font-style:italic; } .cv { color:#E0AF68; } .cn { color:#F7768E; }

        .callout { display:flex; gap:14px; align-items:flex-start; margin-top:18px; padding:14px 18px; border-radius:11px; background:#FFFBF0; border:1px solid #F7DF1E30; border-left:3px solid #E2C000; }
        .callout-icon { font-size:15px; flex-shrink:0; margin-top:1px; }
        .callout-txt { font-size:13.5px; line-height:1.65; color:#78716C; }
        .callout-txt strong { color:#1C1917; font-weight:600; }

        .op-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:6px; }
        .op-item { display:flex; align-items:center; gap:10px; padding:10px 14px; border-radius:10px; background:#FAFAF8; border:1px solid rgba(28,25,23,.07); transition:all .18s; }
        .op-item:hover { border-color:var(--t-primary-border); background:var(--t-primary-light); }
        .op-name { font-family:'DM Mono',monospace; font-size:12px; font-weight:500; color:var(--t-primary); min-width:52px; }
        .op-desc { font-size:12px; color:#A8A29E; font-weight:500; }

        .next-card { display:flex; align-items:center; justify-content:space-between; padding:22px 26px; border-radius:16px; background:#1C1917; color:#F5F3EF; margin-top:28px; cursor:pointer; transition:all .25s; gap:16px; box-shadow:0 4px 24px rgba(28,25,23,.16); }
        .next-card:hover { background:#292524; transform:translateY(-2px); box-shadow:0 8px 32px rgba(28,25,23,.22); }
        .next-lbl { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.15em; text-transform:uppercase; color:rgba(245,243,239,.35); margin-bottom:7px; }
        .next-ttl { font-family:'Syne',sans-serif; font-size:18px; font-weight:700; letter-spacing:-.4px; }
        .next-arrow { width:40px; height:40px; border-radius:11px; flex-shrink:0; display:flex; align-items:center; justify-content:center; background:var(--t-gradient); color:#001E2B; font-size:18px; transition:transform .25s; }
        .next-card:hover .next-arrow { transform:translateX(4px); }

        .toc-panel { width:188px; flex-shrink:0; padding:44px 0 40px 32px; position:sticky; top:58px; height:calc(100vh - 58px); overflow-y:auto; border-left:1px solid rgba(28,25,23,.07); }
        .toc-lbl { font-family:'DM Mono',monospace; font-size:9px; letter-spacing:.18em; text-transform:uppercase; color:#6B6560; font-weight:600; margin-bottom:16px; }
        .toc-item { font-size:12px; font-weight:500; color:#44403C; padding:6px 0 6px 13px; border-left:2px solid rgba(28,25,23,.15); cursor:pointer; transition:all .18s; line-height:1.4; margin-bottom:3px; }
        .toc-item:hover { color:#1C1917; border-left-color:rgba(28,25,23,.35); }
        .toc-item.active { color:var(--t-primary); border-left-color:var(--t-primary); font-weight:600; }
        .toc-div { height:1px; background:rgba(28,25,23,.1); margin:16px 0; }
        .toc-fb { font-size:11px; color:#78716C; font-weight:500; cursor:pointer; display:flex; align-items:center; gap:5px; margin-top:6px; transition:color .18s; }
        .toc-fb:hover { color:#1C1917; }

        @media(max-width:1180px) { .toc-panel { display:none; } }
        @media(max-width:860px) { .sidebar { display:none; } .main { padding:32px 20px 80px; } }
        @media(max-width:600px) { .layout { padding:0; } .info-grid,.op-grid { grid-template-columns:1fr; } }

        .hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; padding:6px; border-radius:7px; border:none; background:none; transition:background .18s; }
        .hamburger:hover { background:rgba(28,25,23,.06); }
        .hamburger span { display:block; width:20px; height:2px; background:#1C1917; border-radius:2px; transition:all .25s; }
        .hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity:0; transform:scaleX(0); }
        .hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

        .mobile-menu {
          position:fixed; top:58px; left:0; right:0; z-index:49;
          background:#FFFFFF; border-bottom:1px solid rgba(28,25,23,.08);
          padding:12px 20px 20px; display:flex; flex-direction:column; gap:2px;
          box-shadow:0 8px 24px rgba(28,25,23,.08);
          transform:translateY(-10px); opacity:0; pointer-events:none;
          transition:all .22s cubic-bezier(.22,1,.36,1);
        }
        .mobile-menu.open { transform:translateY(0); opacity:1; pointer-events:all; }
        .mobile-nav-link { font-size:15px; font-weight:500; color:#57534E; padding:10px 12px; border-radius:9px; cursor:pointer; text-decoration:none; transition:all .18s; border:none; background:none; text-align:left; width:100%; }
        .mobile-nav-link:hover { background:rgba(28,25,23,.05); color:#1C1917; }
        .mobile-divider { height:1px; background:rgba(28,25,23,.07); margin:8px 0; }
        .mobile-bottom { display:flex; align-items:center; justify-content:space-between; padding:6px 0 2px; }
        .mobile-badge { font-family:'DM Mono',monospace; font-size:10px; font-weight:500; letter-spacing:.1em; text-transform:uppercase; padding:4px 10px; border-radius:5px; background:var(--t-primary-light); color:var(--t-primary); border:1px solid var(--t-primary-border); }
        .mobile-signin { font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600; padding:8px 20px; border-radius:8px; background:#1C1917; color:#F5F3EF; border:none; cursor:pointer; }

        @media(max-width:768px) {
          .nav-center,.nav-right { display:none; }
          .hamburger { display:flex; }
          .nav { padding:0 20px; }
        }
      `}</style>

      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="pc">
        {/* NAV */}
        <nav className="nav">
          <a href="#" className="nav-logo">
            <div className="logo-mark">D</div>
            Dev<span style={{ opacity: 0.3 }}>Hungers</span>
          </a>
          <div className="nav-center">
            {["Courses", "Roadmap", "Community", "Blog"].map(l => <a key={l} href="#" className="nav-link">{l}</a>)}
          </div>
          <div className="nav-right">
            <span className="nav-badge">{theme.label}</span>
            <button className="btn-signin">Sign In</button>
          </div>
          <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </nav>

        {/* MOBILE MENU */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {["Courses", "Roadmap", "Community", "Blog"].map(l => (
            <button key={l} className="mobile-nav-link">{l}</button>
          ))}
          <div className="mobile-divider" />
          <div className="mobile-bottom">
            <span className="mobile-badge">{theme.label}</span>
            <button className="mobile-signin">Sign In</button>
          </div>
        </div>

        <div className="layout">
          {/* SIDEBAR */}
          <aside className="sidebar">
            <p className="sb-label">Your Progress</p>
            <div className="prog-track"><div className="prog-fill" /></div>
            <p className="prog-txt"><span>2 of 6</span> lessons complete</p>
            <p className="sb-label">Course Content</p>
            {sidebarItems.map(item => (
              <div key={item.id} className={`sb-item ${item.active ? "active" : ""} ${item.done ? "sb-done" : ""}`}>
                <span className="sb-num">{item.done ? "✓" : item.tag}</span>
                <span className="sb-txt">{item.label}</span>
                {item.active && <div className="sb-bar" />}
              </div>
            ))}
          </aside>

          {/* MAIN */}
          <main className="main">
            <div className="bc">
              <a href="#" className="bc-item">MongoDB</a>
              <span className="bc-sep">/</span>
              <a href="#" className="bc-item">CRUD Operations</a>
              <span className="bc-sep">/</span>
              <span className="bc-item bc-cur">Query Documents</span>
            </div>

            <div className="ch-tag"><div className="ch-line" />Lesson 02<div className="ch-line" /></div>
            <h1 className="main-title"><span>{slug ? slug.replace(/-/g, " ") : "Tutorial"}</span></h1>
            <p className="main-sub">Mastering data retrieval in {theme.label} is the foundation of any full-stack application. Learn how to fetch exactly the documents you need.</p>

            <div className="meta-row">
              <div className="meta-chip">🕐 8 min read</div>
              <div className="meta-chip">📅 Updated Jan 2025</div>
              <div className="meta-chip">🔖 MongoDB 7.x</div>
              <span className="diff-pill">Beginner</span>
            </div>

            <div className="info-grid">
              <div className="info-card"><div className="info-lbl">Prerequisites</div><div className="info-val">Basic JS + mongosh</div></div>
              <div className="info-card"><div className="info-lbl">What you'll learn</div><div className="info-val">find(), filters, operators</div></div>
            </div>

            {/* CARD 1 */}
            <div className="card">
              <div className="card-hdr">
                <div className="card-num">1</div>
                <h2 className="card-ttl">The Basic Query</h2>
              </div>
              <p className="card-body">
                To fetch documents, call the <span className="icode">find()</span> method on any collection. Pass a filter object as the first argument — MongoDB returns only matching documents. An empty <span className="icode">{"{}"}</span> matches everything in the collection.
              </p>
              <div className="code-block">
                <div className="code-toolbar">
                  <div className="code-tabs">
                    {[["js","JavaScript"],["python","Python"],["shell","Shell"]].map(([id,lbl]) => (
                      <button key={id} className={`code-tab ${activeTab===id?"active":""}`} onClick={() => setActiveTab(id)}>{lbl}</button>
                    ))}
                  </div>
                  <button className={`copy-btn ${copied?"copied":""}`} onClick={handleCopy}>{copied ? "✓ Copied" : "Copy"}</button>
                </div>
                <pre className="code-pre">
                  {activeTab === "js" && <code>
                    <span className="cc">{"// Find documents matching the filter\n"}</span>
                    <span className="cv">db</span>{".inventory."}
                    <span className="ck">find</span>{"({\n"}
                    {"  status: "}<span className="cs">{"\"D\""}</span>{",\n"}
                    {"  qty: \{ "}<span className="co">$lt</span>{": "}<span className="cn">30</span>{" \}\n"}
                    {"})."}
                    <span className="ck">pretty</span>{"();"}
                  </code>}
                  {activeTab === "python" && <code>
                    <span className="cc">{"# Python driver usage\n"}</span>
                    <span className="cv">inventory</span>{" = db["}<span className="cs">{"\"inventory\""}</span>{"]\n"}
                    <span className="cv">results</span>{" = inventory."}<span className="ck">find</span>{"({\n"}
                    {"    "}<span className="cs">{"\"status\""}</span>{": "}<span className="cs">{"\"D\""}</span>{",\n"}
                    {"    "}<span className="cs">{"\"qty\""}</span>{": \{ "}<span className="cs">{"\"$lt\""}</span>{": "}<span className="cn">30</span>{" \}\n})"}
                  </code>}
                  {activeTab === "shell" && <code>
                    <span className="cc">{"# Run directly in mongosh\n"}</span>
                    <span className="ck">mongosh</span>{" --eval "}<span className="cs">{"'\n  db.inventory.find({\n    status: \"D\",\n    qty: { $lt: 30 }\n  }).pretty()\n'"}</span>
                  </code>}
                </pre>
              </div>
              <div className="callout">
                <span className="callout-icon">💡</span>
                <p className="callout-txt"><strong>Pro tip:</strong> <span className="icode">.pretty()</span> formats output as readable JSON in the shell. In application drivers it has no effect — skip it in production code.</p>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="card">
              <div className="card-hdr">
                <div className="card-num">2</div>
                <h2 className="card-ttl">Query Operators</h2>
              </div>
              <p className="card-body">MongoDB's comparison operators let you build expressive, readable queries. Combine multiple operators in a single filter to narrow results precisely — no joins required.</p>
              <div className="op-grid">
                {operators.map(({ op, desc }) => (
                  <div key={op} className="op-item">
                    <span className="op-name">{op}</span>
                    <span className="op-desc">{desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* NEXT */}
            <div className="next-card">
              <div>
                <div className="next-lbl">Up Next — Lesson 03</div>
                <div className="next-ttl">Comparison Operators</div>
              </div>
              <div className="next-arrow">→</div>
            </div>
          </main>

          {/* TOC */}
          <aside className="toc-panel">
            <p className="toc-lbl">On this page</p>
            {[{l:"The Basic Query",a:true},{l:"Query Operators"},{l:"Filter Syntax"},{l:"Projection Fields"}].map(item => (
              <div key={item.l} className={`toc-item ${item.a?"active":""}`}>{item.l}</div>
            ))}
            <div className="toc-div" />
            <div className="toc-fb">👍 Was this helpful?</div>
            <div className="toc-fb" style={{marginTop:4}}>🐛 Report an issue</div>
          </aside>
        </div>
      </div>
    </div>
  );
}