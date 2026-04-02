import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import { Card, Input, ScoreRing, Badge, ImgBanner } from '../components/UI.jsx';
import { calcHealth, fmtK, IMGS } from '../utils.jsx';

export default function Profile({ profile, setProfile }) {
  const { T } = useTheme();
  const score   = calcHealth(profile);
  const surplus = Math.max(0, profile.income - profile.expenses - profile.emi);

  const priorities = [
    { label: 'Emergency Fund',   need: profile.expenses * 6,       priority: 'High',   color: T.rose,  icon: '🛡️' },
    { label: 'Health Insurance', need: profile.income   * 0.04,    priority: 'High',   color: T.rose,  icon: '❤️' },
    { label: 'EMI / Debt Repay', need: profile.emi,                priority: 'High',   color: T.amber, icon: '💳' },
    { label: 'Mutual Funds/SIP', need: Math.max(0, surplus * 0.5), priority: 'Medium', color: T.amber, icon: '📊' },
    { label: 'Home Loan',        need: Math.max(0, surplus * 0.3), priority: 'Medium', color: T.blue,  icon: '🏠' },
    { label: 'Lifestyle Goals',  need: Math.max(0, surplus * 0.2), priority: 'Low',    color: T.teal,  icon: '✨' },
  ];

  const update = key => val => setProfile(p => ({ ...p, [key]: val }));

  return (
    <div className="pf-page">
      <ImgBanner src={IMGS.profile} title="Financial Profile" subtitle="Build your Digital Financial Identity" color={T.blue} />

      <div className="pf-grid">
        <Card>
          <div className="pf-form-title" style={{ color: T.text }}>💼 Your Numbers</div>
          <Input label="Monthly Income (₹)"       value={profile.income}      onChange={update('income')}      />
          <Input label="Monthly Expenses (₹)"     value={profile.expenses}    onChange={update('expenses')}    />
          <Input label="Monthly EMI / Loans (₹)"  value={profile.emi}         onChange={update('emi')}         />
          <Input label="Monthly Savings (₹)"      value={profile.savings}     onChange={update('savings')}     />
          <Input label="Monthly Investments (₹)"  value={profile.investments} onChange={update('investments')} />
          <Input label="Emergency Fund Total (₹)" value={profile.emergency}   onChange={update('emergency')}   />
        </Card>

        <div className="pf-right">
          <Card className="pf-score-card" style={{ textAlign: 'center', padding: 28 }}>
            <ScoreRing score={score} />
            <div className="pf-mini">
              {[
                { l: 'Savings Rate',    v: profile.income ? `${Math.round(profile.savings / profile.income * 100)}%` : '0%', c: T.teal   },
                { l: 'DTI Ratio',       v: profile.income ? `${Math.round(profile.emi     / profile.income * 100)}%` : '0%', c: T.rose   },
                { l: 'Monthly Surplus', v: fmtK(surplus),                                                                     c: T.blue   },
                { l: 'Invest Rate',     v: profile.income ? `${Math.round(profile.investments / profile.income * 100)}%` : '0%', c: T.violet },
              ].map(({ l, v, c }) => (
                <div key={l} className="pf-mini-tile" style={{ background: T.bg, border: `1px solid ${T.border}` }}>
                  <div className="pf-mini-label" style={{ color: T.textMuted }}>{l}</div>
                  <div className="pf-mini-value" style={{ color: c }}>{v}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="pf-priority-title" style={{ color: T.text }}>📋 Priority Hierarchy</div>
            {priorities.map(p => (
              <div key={p.label} className="pf-priority-item" style={{ background: T.bg, border: `1px solid ${T.border}` }}>
                <div className="pf-priority-left">
                  <span className="pf-priority-icon">{p.icon}</span>
                  <div>
                    <div className="pf-priority-name" style={{ color: T.text }}>{p.label}</div>
                    <div className="pf-priority-amount" style={{ color: T.textMuted }}>{fmtK(Math.round(p.need))}/mo</div>
                  </div>
                </div>
                <Badge color={p.color}>{p.priority}</Badge>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
