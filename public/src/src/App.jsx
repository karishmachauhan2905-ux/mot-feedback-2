import { useState, useEffect } from "react";

const C = {
  gold: "#C8922A", goldLight: "#E8B84B", goldPale: "#F5E6C8", turmeric: "#D4A017",
  cream: "#FDF8F0", brown: "#5C3D1E", brownDark: "#3B2510", brownLight: "#8B6340",
  white: "#FFFDF9", text: "#2C1A0E", muted: "#9B7D5A", border: "#E8D5B0",
  bg: "#FDF6E8", success: "#6B8F3E",
};

const PRODUCTS = ["Serum", "Facewash", "Moisturiser", "Sunscreen", "Scrub", "Multiple Products"];
const SKIN_CONCERNS = ["Pigmentation / Dark spots", "Acne / Breakouts", "Dullness / Uneven tone", "Oiliness", "Dryness / Dehydration"];

function RadioChip({ label, selected, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: "9px 18px", borderRadius: "30px", border: `1.5px solid ${selected ? C.gold : C.border}`, background: selected ? C.gold : "white", color: selected ? "white" : C.brownLight, fontFamily: "'Lora', serif", fontSize: "13px", cursor: "pointer", fontWeight: selected ? "600" : "400", transition: "all 0.2s", boxShadow: selected ? `0 2px 12px ${C.gold}55` : "none" }}>{label}</button>
  );
}

function CheckChip({ label, selected, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: "9px 16px", borderRadius: "8px", border: `1.5px solid ${selected ? C.gold : C.border}`, background: selected ? "#FFF8EC" : "white", color: selected ? C.brown : C.brownLight, fontFamily: "'Lora', serif", fontSize: "13px", cursor: "pointer", fontWeight: selected ? "600" : "400", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "7px" }}>
      <span style={{ width: "16px", height: "16px", borderRadius: "4px", border: `2px solid ${selected ? C.gold : C.border}`, background: selected ? C.gold : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {selected && <span style={{ color: "white", fontSize: "10px" }}>✓</span>}
      </span>
      {label}
    </button>
  );
}

function ScoreBtn({ n, selected, onClick }) {
  return (
    <button onClick={onClick} style={{ width: "40px", height: "40px", borderRadius: "50%", border: `2px solid ${selected ? C.gold : C.border}`, background: selected ? C.gold : "white", color: selected ? "white" : C.brownLight, fontFamily: "'Lora', serif", fontSize: "14px", fontWeight: "700", cursor: "pointer", transition: "all 0.2s", transform: selected ? "scale(1.15)" : "scale(1)", boxShadow: selected ? `0 3px 14px ${C.gold}66` : "none" }}>{n}</button>
  );
}

function TA({ value, onChange, placeholder }) {
  return <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} onFocus={e => e.target.style.borderColor = C.gold} onBlur={e => e.target.style.borderColor = C.border} style={{ width: "100%", padding: "12px 14px", border: `1.5px solid ${C.border}`, borderRadius: "10px", fontFamily: "'Lora', serif", fontSize: "14px", color: C.text, background: "white", resize: "vertical", outline: "none", boxSizing: "border-box", lineHeight: "1.6" }} />;
}

function TI({ value, onChange, placeholder }) {
  return <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} onFocus={e => e.target.style.borderColor = C.gold} onBlur={e => e.target.style.borderColor = C.border} style={{ width: "100%", padding: "11px 14px", border: `1.5px solid ${C.border}`, borderRadius: "10px", fontFamily: "'Lora', serif", fontSize: "14px", color: C.text, background: "white", outline: "none", boxSizing: "border-box" }} />;
}

function SH({ num, title, sub }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
        <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: C.gold, color: "white", fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{num}</div>
        <h3 style={{ margin: 0, fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: C.brown, fontWeight: "700" }}>{title}</h3>
      </div>
      {sub && <p style={{ margin: "4px 0 0 38px", color: C.muted, fontSize: "13px", fontFamily: "'Lora', serif", lineHeight: "1.5" }}>{sub}</p>}
    </div>
  );
}

function Card({ children, style }) {
  return <div style={{ background: "white", border: `1px solid ${C.border}`, borderRadius: "16px", padding: "26px", marginBottom: "20px", boxShadow: `0 2px 12px rgba(200,146,42,0.06)`, ...style }}>{children}</div>;
}

function Div() { return <div style={{ height: "1px", background: `linear-gradient(to right, transparent, ${C.border}, transparent)`, margin: "8px 0 16px" }} />; }

function MiniBar({ label, value, max, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
      <span style={{ minWidth: "130px", fontSize: "12px", color: C.muted, fontFamily: "'Lora', serif" }}>{label}</span>
      <div style={{ flex: 1, height: "8px", background: C.goldPale, borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${max ? (value / max) * 100 : 0}%`, background: color || C.gold, borderRadius: "4px", transition: "width 0.7s ease" }} />
      </div>
      <span style={{ minWidth: "24px", fontSize: "13px", fontWeight: "700", color: C.brown, fontFamily: "'Cormorant Garamond', serif" }}>{value}</span>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("form");
  const [adminCode, setAdminCode] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminErr, setAdminErr] = useState("");
  const [responses, setResponses] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const [products, setProducts] = useState([]);
  const [purchaseRating, setPurchaseRating] = useState("");
  const [purchaseComment, setPurchaseComment] = useState("");
  const [firstImpression, setFirstImpression] = useState("");
  const [usageFreq, setUsageFreq] = useState("");
  const [skinConcerns, setSkinConcerns] = useState([]);
  const [skinOther, setSkinOther] = useState("");
  const [resultsLevel, setResultsLevel] = useState("");
  const [resultsDesc, setResultsDesc] = useState("");
  const [timeToResults, setTimeToResults] = useState("");
  const [satisfaction, setSatisfaction] = useState(0);
  const [recommend, setRecommend] = useState("");
  const [recommendWhy, setRecommendWhy] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [rName, setRName] = useState("");
  const [rEmail, setREmail] = useState("");

  useEffect(() => {
    try {
      const s = localStorage.getItem("mot_v2");
      if (s) setResponses(JSON.parse(s));
    } catch {}
  }, []);

  const saveResp = (r) => {
    const up = [...responses, r];
    setResponses(up);
    try { localStorage.setItem("mot_v2", JSON.stringify(up)); } catch {}
  };

  const toggleConcern = (c) => setSkinConcerns(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);

  const isComplete = products.length > 0 && purchaseRating && firstImpression && usageFreq && skinConcerns.length > 0 && resultsLevel && timeToResults && satisfaction > 0 && recommend;

  const handleSubmit = async () => {
    if (!isComplete) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 700));
    saveResp({
      name: rName, email: rEmail, timestamp: new Date().toISOString(),
      products, purchaseRating, purchaseComment, firstImpression, usageFreq,
      skinConcerns: skinOther ? [...skinConcerns, `Other: ${skinOther}`] : skinConcerns,
      resultsLevel, resultsDesc, timeToResults, satisfaction, recommend, recommendWhy, suggestions
    });
    setSubmitting(false);
    setView("thanks");
  };

  const resetForm = () => {
    setProducts([]); setPurchaseRating(""); setPurchaseComment(""); setFirstImpression(""); setUsageFreq("");
    setSkinConcerns([]); setSkinOther(""); setResultsLevel(""); setResultsDesc(""); setTimeToResults("");
    setSatisfaction(0); setRecommend(""); setRecommendWhy(""); setSuggestions(""); setRName(""); setREmail("");
    setView("form");
  };

  const getStats = () => {
    if (!responses.length) return null;
    const n = responses.length;
    const avgSat = responses.reduce((a, r) => a + r.satisfaction, 0) / n;
    const purchaseDist = ["Excellent","Good","Average","Poor"].map(l => ({ label: l, count: responses.filter(r => r.purchaseRating === l).length }));
    const resultsDist = ["Yes, significant improvement","Yes, some improvement","Too early to tell","No visible change yet"].map(l => ({ label: l.length > 24 ? l.slice(0,24)+"…" : l, full: l, count: responses.filter(r => r.resultsLevel === l).length }));
    const recommendDist = ["Absolutely","Probably","Not sure","Unlikely"].map(l => ({ label: l, count: responses.filter(r => r.recommend === l).length }));
    const productDist = PRODUCTS.map(p => ({ label: p, count: responses.filter(r => r.products.includes(p)).length }));
    const concernDist = SKIN_CONCERNS.map(c => ({ label: c.split("/")[0].trim(), count: responses.filter(r => r.skinConcerns.includes(c)).length }));
    const promoters = responses.filter(r => r.recommend === "Absolutely" || r.recommend === "Probably").length;
    return { n, avgSat, purchaseDist, resultsDist, recommendDist, productDist, concernDist, nps: Math.round((promoters / n) * 100), promoters };
  };

  const downloadReport = () => {
    const s = getStats(); if (!s) return;
    const txt = [
      "MIRACLES OF TURMERIC — CUSTOMER FEEDBACK REPORT",
      "=================================================",
      `Generated: ${new Date().toLocaleString("en-IN")}`,
      `Total Responses: ${s.n}`,
      `Average Satisfaction: ${s.avgSat.toFixed(1)} / 10`,
      `Recommendation Rate: ${s.nps}%`,
      "", "PURCHASE RATINGS", ...s.purchaseDist.map(d => `  ${d.label}: ${d.count} (${Math.round(d.count/s.n*100)}%)`),
      "", "RESULTS SEEN", ...s.resultsDist.map(d => `  ${d.full}: ${d.count}`),
      "", "WOULD RECOMMEND", ...s.recommendDist.map(d => `  ${d.label}: ${d.count}`),
      "", "PRODUCTS PURCHASED", ...s.productDist.filter(d=>d.count>0).sort((a,b)=>b.count-a.count).map(d=>`  ${d.label}: ${d.count}`),
      "", "SKIN CONCERNS", ...s.concernDist.filter(d=>d.count>0).sort((a,b)=>b.count-a.count).map(d=>`  ${d.label}: ${d.count}`),
      "", "ALL RESPONSES", "-------------",
      ...responses.map((r,i) => [
        `#${i+1} | ${r.name||"Anonymous"} | ${new Date(r.timestamp).toLocaleString("en-IN")}`,
        `  Products: ${r.products.join(", ")}`,
        `  Purchase: ${r.purchaseRating} | Satisfaction: ${r.satisfaction}/10 | Recommend: ${r.recommend}`,
        `  Usage: ${r.usageFreq} | Time to results: ${r.timeToResults}`,
        `  Skin concerns: ${r.skinConcerns.join(", ")}`,
        `  Results: ${r.resultsLevel}`,
        r.resultsDesc ? `  Detail: ${r.resultsDesc}` : "",
        r.firstImpression ? `  First impression: ${r.firstImpression}` : "",
        r.suggestions ? `  Suggestions: ${r.suggestions}` : "",
        ""
      ].filter(Boolean).join("\n"))
    ].join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([txt], {type:"text/plain"}));
    a.download = `MoT-Feedback-${new Date().toISOString().slice(0,10)}.txt`;
    a.click();
  };

  const HeaderBar = ({ showAdmin = true }) => (
    <div style={{ background: `linear-gradient(135deg, ${C.brownDark} 0%, ${C.brown} 100%)`, padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `3px solid ${C.gold}` }}>
      <div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: C.goldLight, fontWeight: "700", letterSpacing: "0.5px" }}>✦ Miracles of Turmeric</div>
        <div style={{ fontFamily: "'Lora', serif", fontSize: "10px", color: C.goldPale, opacity: 0.7, letterSpacing: "2px", textTransform: "uppercase", marginTop: "2px" }}>Customer Feedback Form</div>
      </div>
      {showAdmin && <button onClick={() => setView("admin")} style={{ background: "transparent", border: `1px solid ${C.goldLight}66`, color: C.goldLight, padding: "7px 16px", borderRadius: "8px", fontFamily: "'Lora', serif", fontSize: "12px", cursor: "pointer" }}>Admin →</button>}
    </div>
  );

  if (view === "form") return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Lora:wght@400;500;600&display=swap" rel="stylesheet" />
      <HeaderBar />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "36px 20px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ fontSize: "40px", marginBottom: "10px" }}>🌿</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "30px", color: C.brown, margin: "0 0 10px", fontWeight: "700" }}>We'd Love Your Feedback</h1>
          <p style={{ color: C.muted, fontSize: "14px", margin: 0, lineHeight: "1.8" }}>Help us understand your experience with Miracles of Turmeric.<br />Your honest feedback shapes what we create next for Indian skin.</p>
        </div>

        <Card>
          <SH num="1" title="About Your Purchase" sub="Which Miracles of Turmeric product(s) did you purchase?" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {PRODUCTS.map(p => <CheckChip key={p} label={p} selected={products.includes(p)} onClick={() => setProducts(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])} />)}
          </div>
        </Card>

        <Card>
          <SH num="2" title="Purchase Experience" sub="How would you rate your overall purchase & delivery experience?" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            {["Excellent","Good","Average","Poor"].map(r => <RadioChip key={r} label={r} selected={purchaseRating===r} onClick={()=>setPurchaseRating(r)} />)}
          </div>
          <Div />
          <label style={{ display: "block", fontSize: "12px", color: C.muted, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.8px" }}>Any comments?</label>
          <TA value={purchaseComment} onChange={setPurchaseComment} placeholder="Tell us about your buying or delivery experience…" />
        </Card>

        <Card>
          <SH num="3" title="First Impressions" sub="When you first used the product, what was your initial impression? (Texture, scent, packaging, ease of use)" />
          <TA value={firstImpression} onChange={setFirstImpression} placeholder="Share your first thoughts — how it felt, the scent, how it applied to your skin…" />
        </Card>

        <Card>
          <SH num="4" title="Consistency of Use" sub="How regularly have you been using the product?" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["Daily (as directed)","Most days","Occasionally","Only tried it once or twice"].map(r => <RadioChip key={r} label={r} selected={usageFreq===r} onClick={()=>setUsageFreq(r)} />)}
          </div>
        </Card>

        <Card>
          <SH num="5" title="Skin Concerns" sub="Which skin concern(s) were you hoping to address?" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
            {SKIN_CONCERNS.map(c => <CheckChip key={c} label={c} selected={skinConcerns.includes(c)} onClick={() => toggleConcern(c)} />)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckChip label="Other" selected={skinOther.trim().length > 0} onClick={() => {}} />
            <input value={skinOther} onChange={e => setSkinOther(e.target.value)} placeholder="Specify your concern…" onFocus={e=>e.target.style.borderColor=C.gold} onBlur={e=>e.target.style.borderColor=C.border} style={{ flex: 1, padding: "9px 12px", border: `1.5px solid ${C.border}`, borderRadius: "8px", fontFamily: "'Lora',serif", fontSize: "13px", color: C.text, outline: "none" }} />
          </div>
        </Card>

        <Card>
          <SH num="6" title="Results Seen" sub="Have you noticed any visible improvements in your skin since using the product?" />
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: resultsLevel.startsWith("Yes") ? "16px" : "0" }}>
            {["Yes, significant improvement","Yes, some improvement","Too early to tell","No visible change yet"].map(r => <RadioChip key={r} label={r} selected={resultsLevel===r} onClick={()=>setResultsLevel(r)} />)}
          </div>
          {resultsLevel.startsWith("Yes") && (
            <>
              <Div />
              <label style={{ display: "block", fontSize: "12px", color: C.muted, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.8px" }}>Please describe what you noticed:</label>
              <TA value={resultsDesc} onChange={setResultsDesc} placeholder="e.g., My dark spots faded noticeably, skin felt more hydrated and bright…" />
            </>
          )}
        </Card>

        <Card>
          <SH num="7" title="Time to See Results" sub="Approximately how long did it take before you started noticing a difference?" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["Within 1 week","2–4 weeks","4–8 weeks","Haven't noticed results yet"].map(r => <RadioChip key={r} label={r} selected={timeToResults===r} onClick={()=>setTimeToResults(r)} />)}
          </div>
        </Card>

        <Card>
          <SH num="8" title="Overall Satisfaction" sub="On a scale of 1–10, how satisfied are you with the product overall?" />
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[1,2,3,4,5,6,7,8,9,10].map(n => <ScoreBtn key={n} n={n} selected={satisfaction===n} onClick={()=>setSatisfaction(n)} />)}
          </div>
          {satisfaction > 0 && (
            <p style={{ margin: "12px 0 0", fontSize: "14px", color: satisfaction>=8?C.success:satisfaction>=5?C.gold:"#C0392B", fontFamily: "'Cormorant Garamond',serif", fontWeight: "600" }}>
              {satisfaction>=9?"Wonderful! We're so glad you love it 🌿":satisfaction>=7?"Great to hear! Thank you for your support ✨":satisfaction>=5?"Thank you for your honest feedback.":"We're sorry to hear that. We'll use this to improve."}
            </p>
          )}
        </Card>

        <Card>
          <SH num="9" title="Would You Recommend Us?" sub="Would you recommend Miracles of Turmeric to a friend or family member?" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            {["Absolutely","Probably","Not sure","Unlikely"].map(r => <RadioChip key={r} label={r} selected={recommend===r} onClick={()=>setRecommend(r)} />)}
          </div>
          <Div />
          <label style={{ display: "block", fontSize: "12px", color: C.muted, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.8px" }}>Why?</label>
          <TA value={recommendWhy} onChange={setRecommendWhy} placeholder="Tell us what drives your answer…" />
        </Card>

        <Card>
          <SH num="10" title="Your Suggestions" sub="Is there anything we could improve — about the product, packaging, instructions, or your experience? Or is there a new product you'd love to see us create for Indian skin?" />
          <TA value={suggestions} onChange={setSuggestions} placeholder="Your ideas and suggestions are very valuable to us…" />
        </Card>

        <Card style={{ background: "#FFF8EC" }}>
          <p style={{ margin: "0 0 14px", fontFamily: "'Cormorant Garamond',serif", fontSize: "17px", color: C.brown, fontWeight: "700" }}>
            Your Details <span style={{ color: C.muted, fontSize: "13px", fontWeight: "400" }}>(optional)</span>
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", color: C.muted, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.8px" }}>Name</label>
              <TI value={rName} onChange={setRName} placeholder="Your name" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "11px", color: C.muted, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.8px" }}>Email</label>
              <TI value={rEmail} onChange={setREmail} placeholder="your@email.com" />
            </div>
          </div>
        </Card>

        <button onClick={handleSubmit} disabled={!isComplete||submitting} style={{ width: "100%", padding: "18px", background: isComplete ? `linear-gradient(135deg, ${C.brown}, ${C.gold})` : C.border, color: isComplete ? "white" : C.muted, border: "none", borderRadius: "14px", fontFamily: "'Cormorant Garamond',serif", fontSize: "18px", fontWeight: "700", cursor: isComplete ? "pointer" : "not-allowed", letterSpacing: "1px", boxShadow: isComplete ? `0 6px 24px ${C.gold}44` : "none", transition: "all 0.3s" }}>
          {submitting ? "Submitting…" : isComplete ? "Submit My Feedback ✦" : "Please answer all required questions to submit"}
        </button>
      </div>
    </div>
  );

  if (view === "thanks") return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Lora:wght@400;500;600&display=swap" rel="stylesheet" />
      <HeaderBar showAdmin={false} />
      <div style={{ maxWidth: "500px", margin: "80px auto", textAlign: "center", padding: "0 20px" }}>
        <Card>
          <div style={{ fontSize: "56px", marginBottom: "16px" }}>🌿</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "34px", color: C.brown, margin: "0 0 12px" }}>Thank You!</h1>
          <p style={{ color: C.muted, lineHeight: "1.8", marginBottom: "28px", fontSize: "14px" }}>Your feedback has been recorded. It means the world to us and will help us create even better products for Indian skin. ✦</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button onClick={resetForm} style={{ background: `linear-gradient(135deg,${C.brown},${C.gold})`, color: "white", border: "none", padding: "13px 24px", borderRadius: "10px", fontFamily: "'Lora',serif", fontSize: "14px", cursor: "pointer" }}>Submit Another</button>
            <button onClick={() => { setAdminUnlocked(true); setView("admin"); }} style={{ background: "white", color: C.brown, border: `1.5px solid ${C.border}`, padding: "13px 24px", borderRadius: "10px", fontFamily: "'Lora',serif", fontSize: "14px", cursor: "pointer" }}>View Dashboard</button>
          </div>
        </Card>
      </div>
    </div>
  );

  const stats = adminUnlocked ? getStats() : null;
  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Lora:wght@400;500;600&display=swap" rel="stylesheet" />
      <div style={{ background: `linear-gradient(135deg, ${C.brownDark}, ${C.brown})`, padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `3px solid ${C.gold}` }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "22px", color: C.goldLight, fontWeight: "700" }}>✦ Miracles of Turmeric — Admin</div>
          <div style={{ fontFamily: "'Lora',serif", fontSize: "10px", color: C.goldPale, opacity: 0.7, letterSpacing: "2px", textTransform: "uppercase", marginTop: "2px" }}>Feedback Dashboard</div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setView("form")} style={{ background: "transparent", border: `1px solid ${C.goldLight}66`, color: C.goldLight, padding: "7px 16px", borderRadius: "8px", fontFamily: "'Lora',serif", fontSize: "12px", cursor: "pointer" }}>← Form</button>
          {adminUnlocked && stats && <button onClick={downloadReport} style={{ background: C.gold, color: "white", border: "none", padding: "7px 16px", borderRadius: "8px", fontFamily: "'Lora',serif", fontSize: "12px", cursor: "pointer", fontWeight: "600" }}>⬇ Download Report</button>}
        </div>
      </div>

      {!adminUnlocked ? (
        <div style={{ maxWidth: "420px", margin: "80px auto", padding: "0 20px" }}>
          <Card>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", color: C.brown, margin: "0 0 8px" }}>Admin Access</h2>
            <p style={{ color: C.muted, fontSize: "13px", marginBottom: "16px" }}>Enter admin code to view results. Default: <strong style={{ color: C.gold }}>admin123</strong></p>
            <input type="password" value={adminCode} onChange={e => setAdminCode(e.target.value)} onKeyDown={e => e.key==="Enter" && (adminCode==="admin123" ? setAdminUnlocked(true) : setAdminErr("Incorrect code"))} placeholder="Admin code" style={{ width: "100%", padding: "11px 14px", border: `1.5px solid ${C.border}`, borderRadius: "10px", fontFamily: "'Lora',serif", fontSize: "14px", color: C.text, background: "white", outline: "none", boxSizing: "border-box", marginBottom: "12px" }} />
            {adminErr && <p style={{ color: "#C0392B", fontSize: "13px", margin: "0 0 12px" }}>{adminErr}</p>}
            <button onClick={() => adminCode==="admin123" ? setAdminUnlocked(true) : setAdminErr("Incorrect code. Try admin123")} style={{ background: `linear-gradient(135deg,${C.brown},${C.gold})`, color: "white", border: "none", padding: "12px", borderRadius: "10px", fontFamily: "'Lora',serif", fontSize: "14px", cursor: "pointer", width: "100%" }}>Unlock Dashboard</button>
          </Card>
        </div>
      ) : !stats ? (
        <div style={{ maxWidth: "480px", margin: "80px auto", textAlign: "center", padding: "0 20px" }}>
          <Card>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", color: C.brown }}>No responses yet</h2>
            <p style={{ color: C.muted, fontSize: "14px", marginBottom: "20px" }}>Share the feedback form with your customers to start collecting responses.</p>
            <button onClick={() => setView("form")} style={{ background: `linear-gradient(135deg,${C.brown},${C.gold})`, color: "white", border: "none", padding: "12px 28px", borderRadius: "10px", fontFamily: "'Lora',serif", fontSize: "14px", cursor: "pointer" }}>Go to Form</button>
          </Card>
        </div>
      ) : (
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "32px 20px 60px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", marginBottom: "24px" }}>
            {[
              { label: "Total Responses", val: stats.n },
              { label: "Avg Satisfaction", val: `${stats.avgSat.toFixed(1)}/10` },
              { label: "Recommendation Rate", val: `${stats.nps}%` }
            ].map((s,i) => (
              <div key={i} style={{ background: "white", border: `1px solid ${C.border}`, borderRadius: "14px", padding: "20px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "34px", color: C.brown, fontWeight: "700" }}>{s.val}</div>
                <div style={{ fontSize: "11px", color: C.muted, fontFamily: "'Lora',serif", marginTop: "4px", textTransform: "uppercase", letterSpacing: "0.8px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          <Card>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", color: C.brown, margin: "0 0 16px", fontSize: "18px" }}>Purchase & Delivery Ratings</h3>
            {stats.purchaseDist.map(d => <MiniBar key={d.label} label={d.label} value={d.count} max={stats.n} />)}
          </Card>

          <Card>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", color: C.brown, margin: "0 0 16px", fontSize: "18px" }}>Results Seen by Customers</h3>
            {stats.resultsDist.map((d,i) => <MiniBar key={d.label} label={d.label} value={d.count} max={stats.n} color={i===0?C.success:i===1?C.gold:i===2?C.turmeric:"#C0392B"} />)}
          </Card>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
            <Card style={{ marginBottom: 0 }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", color: C.brown, margin: "0 0 14px", fontSize: "16px" }}>Would Recommend?</h3>
              {stats.recommendDist.map(d => <MiniBar key={d.label} label={d.label} value={d.count} max={stats.n} />)}
            </Card>
            <Card style={{ marginBottom: 0 }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", color: C.brown, margin: "0 0 14px", fontSize: "16px" }}>Top Products</h3>
              {stats.productDist.filter(d=>d.count>0).sort((a,b)=>b.count-a.count).map(d => <MiniBar key={d.label} label={d.label} value={d.count} max={stats.n} color={C.turmeric} />)}
            </Card>
          </div>

          <Card>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", color: C.brown, margin: "0 0 16px", fontSize: "18px" }}>Skin Concerns Addressed</h3>
            {stats.concernDist.sort((a,b)=>b.count-a.count).map(d => <MiniBar key={d.label} label={d.label} value={d.count} max={stats.n} color={C.brownLight} />)}
          </Card>

          <Card>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", color: C.brown, margin: "0 0 16px", fontSize: "18px" }}>Recent Responses ({stats.n} total)</h3>
            {[...responses].reverse().slice(0,5).map((r,i) => (
              <div key={i} style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: "16px", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: "700", color: C.brown, fontSize: "16px" }}>{r.name||"Anonymous"}</span>
                  <span style={{ fontSize: "12px", color: C.muted }}>{new Date(r.timestamp).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "8px" }}>
                  <span style={{ background: C.goldPale, color: C.brown, padding: "3px 10px", borderRadius: "20px", fontSize: "11px" }}>⭐ {r.satisfaction}/10</span>
                  <span style={{ background: C.goldPale, color: C.brown, padding: "3px 10px", borderRadius: "20px", fontSize: "11px" }}>{r.purchaseRating}</span>
                  <span style={{ background: C.goldPale, color: C.brown, padding: "3px 10px", borderRadius: "20px", fontSize: "11px" }}>{r.recommend}</span>
                  {r.products.slice(0,2).map(p => <span key={p} style={{ background: "#F0F7E8", color: C.success, padding: "3px 10px", borderRadius: "20px", fontSize: "11px" }}>{p}</span>)}
                </div>
                <p style={{ margin: "0 0 4px", fontSize: "13px", color: C.brownLight }}>Results: <em>{r.resultsLevel}</em></p>
                {r.suggestions && <p style={{ margin: 0, fontSize: "13px", color: C.muted, fontStyle: "italic" }}>💡 "{r.suggestions.slice(0,120)}{r.suggestions.length>120?"…":""}"</p>}
              </div>
            ))}
          </Card>
        </div>
      )}
    </div>
  );
}
