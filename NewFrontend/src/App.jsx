import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx';
import Dashboard  from './pages/Dashboard';
import Profile    from './pages/Profile';
import Goals      from './pages/Goals';
import Investment from './pages/Investment';
import Debt       from './pages/Debt';
import WhatIf     from './pages/WhatIf';
import Chatbot    from './pages/Chatbot';
import { calcHealth } from './utils.jsx';

const NAV = [
  { id: 'dashboard',  label: 'Dashboard',        emoji: '📊' },
  { id: 'profile',    label: 'Financial Profile', emoji: '👤' },
  { id: 'goals',      label: 'Goal Planner',      emoji: '🎯' },
  { id: 'investment', label: 'Investments',       emoji: '📈' },
  { id: 'debt',       label: 'Debt Optimizer',    emoji: '💳' },
  { id: 'whatif',     label: 'What-If Simulator', emoji: '🔬' },
  { id: 'chatbot',    label: 'AI Advisor',        emoji: '🤖' },
];

function ThemeToggle() {
  const { isDark, toggleTheme, T } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="app-theme-btn"
      style={{ background: isDark ? '#1E2738' : '#F0F4FF', borderColor: T.border }}
    >
      <div className="app-theme-track" style={{ background: isDark ? T.teal : T.border }}>
        <div className="app-theme-knob" style={{ left: isDark ? 16 : 3 }} />
      </div>
      <span className="app-theme-label" style={{ color: T.textSub }}>
        {isDark ? '🌙 Dark' : '☀️ Light'}
      </span>
    </button>
  );
}

function AppInner() {
  const { T, isDark } = useTheme();
  const [page,        setPage]        = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState({
    income: 80000, expenses: 35000, savings: 15000,
    emi: 12000, investments: 10000, emergency: 90000,
  });
  const [goals, setGoals] = useState([
    { id: 1, name: 'Emergency Fund',    target: 210000,   saved: 90000,  priority: 'High'   },
    { id: 2, name: 'Home Down Payment', target: 1500000,  saved: 200000, priority: 'High'   },
    { id: 3, name: 'Retirement Corpus', target: 10000000, saved: 500000, priority: 'Medium' },
  ]);

  const score      = calcHealth(profile);
  const scoreColor = score >= 75 ? T.teal : score >= 50 ? T.amber : T.rose;
  const navigate   = id => { setPage(id); setSidebarOpen(false); };

  const pages = {
    dashboard:  <Dashboard  profile={profile} goals={goals} />,
    profile:    <Profile    profile={profile} setProfile={setProfile} />,
    goals:      <Goals      goals={goals} setGoals={setGoals} profile={profile} />,
    investment: <Investment />,
    debt:       <Debt />,
    whatif:     <WhatIf     profile={profile} />,
    chatbot:    <Chatbot    profile={profile} />,
  };

  return (
    <>
      {/* Theme-reactive CSS vars — only dynamic colours live here */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600;700&display=swap');
        body { background: ${T.bg}; color: ${T.text}; }
        ::-webkit-scrollbar-thumb { background: ${T.border}; }
        input[type=range] { background: ${T.border}; }
        select option { background: ${T.surface}; color: ${T.text}; }
      `}</style>

      <button
        className="app-menu-btn"
        onClick={() => setSidebarOpen(o => !o)}
        style={{ color: T.text, background: T.surface, borderColor: T.border }}
        aria-label="Toggle menu"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      <div className={`app-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)} />

      <div className="app-shell">
        {/* SIDEBAR */}
        <div
          className={`app-sidebar ${sidebarOpen ? 'open' : ''}`}
          style={{ background: T.sidebarBg, borderRight: `1px solid ${T.border}`,
            boxShadow: isDark ? '2px 0 20px rgba(0,0,0,0.3)' : '2px 0 20px rgba(60,80,160,0.06)' }}
        >
          <div className="app-logo-wrap">
            <div className="app-logo-inner">
              <div className="app-logo-icon"
                style={{ background: `linear-gradient(135deg,${T.teal},${T.blue})`, boxShadow: `0 4px 14px ${T.teal}44` }}>
                💎
              </div>
              <div>
                <div className="app-logo-name" style={{ color: T.text }}>AI-FinTech</div>
                <div className="app-logo-sub" style={{ color: T.textMuted }}>Health Planner</div>
              </div>
            </div>
          </div>

          <div className="app-score-pill" style={{ background: scoreColor + '15', border: `1px solid ${scoreColor}30` }}>
            <div className="app-score-label" style={{ color: T.textMuted }}>Health Score</div>
            <div className="app-score-row">
              <div className="app-score-num" style={{ color: scoreColor }}>{score}</div>
              <div className="app-score-bar-wrap">
                <div className="app-score-bar-track" style={{ background: T.border }}>
                  <div className="app-score-bar-fill"
                    style={{ background: `linear-gradient(90deg,${scoreColor},${scoreColor}88)`, width: `${score}%` }} />
                </div>
                <div className="app-score-out" style={{ color: T.textMuted }}>out of 100</div>
              </div>
            </div>
          </div>

          <nav className="app-nav">
            {NAV.map(({ id, label, emoji }) => {
              const active = page === id;
              return (
                <button
                  key={id}
                  onClick={() => navigate(id)}
                  className={`app-nav-btn ${active ? 'active' : ''}`}
                  style={{
                    background: active ? T.navActive : 'transparent',
                    borderLeft: `3px solid ${active ? T.teal : 'transparent'}`,
                    color: active ? T.teal : T.textMuted,
                  }}
                >
                  <span className="app-nav-emoji">{emoji}</span>
                  {label}
                  {active && <div className="app-nav-dot" style={{ background: T.teal }} />}
                </button>
              );
            })}
          </nav>

          <div className="app-footer" style={{ borderTop: `1px solid ${T.border}` }}>
            <ThemeToggle />
            <div className="app-footer-tagline" style={{ color: T.textMuted }}>
              AI-Driven FinTech Platform<br />
              <span className="app-footer-brand" style={{ color: T.teal }}>Powered by Ashish and Team's</span>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="app-main" style={{ background: T.bg }}>
          {pages[page]}
        </div>
      </div>
    </>
  );
}

export default function App() {
  return <ThemeProvider><AppInner /></ThemeProvider>;
}
