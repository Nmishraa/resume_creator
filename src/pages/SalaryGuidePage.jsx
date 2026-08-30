import React, { useState } from 'react';
import { DollarSign, TrendingUp, ShieldCheck, Copy, Check, MessageSquare, Calculator, Award } from 'lucide-react';

export default function SalaryGuidePage() {
  const [baseOffer, setBaseOffer] = useState(160000);
  const [targetIncreasePct, setTargetIncreasePct] = useState(15);
  const [candidateRole, setCandidateRole] = useState('Senior Software Engineer');
  const [companyName, setCompanyName] = useState('Tech Corp');
  const [competingOffer, setCompetingOffer] = useState('');
  
  const [copied, setCopied] = useState(false);

  const counterOfferAmount = Math.round(baseOffer * (1 + targetIncreasePct / 100));
  const difference = counterOfferAmount - baseOffer;

  const script = `Dear Hiring Manager,

Thank you for extending the offer for the ${candidateRole} position at ${companyName}. I am genuinely excited about the team's vision and the impact I can make in this role.

After reviewing the details of the offer and evaluating market benchmarks for ${candidateRole} roles with similar scope, I would like to discuss the base compensation. Given my track record in architecture, leadership, and delivering high-impact projects, I am looking for a base salary of $${counterOfferAmount.toLocaleString()}${competingOffer ? ` (which aligns closely with a competing offer I am considering)` : ''}.

If we can reach an agreement at $${counterOfferAmount.toLocaleString()}, I would be thrilled to accept immediately and dedicate my full focus to driving results for ${companyName}.

Thank you again for your time and flexibility. I look forward to finalizing our partnership.

Best regards,
Alex Vance`;

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem', color: '#1e293b' }}>
      {/* Hero Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#dcfce7', color: '#15803d', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1rem' }}>
          <DollarSign size={16} /> Salary Calculator & Offer Counter-Script Generator
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          Negotiate Higher Salary & Equity Packages
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
          Calculate target counter-offers, model compensation packages, and generate professional negotiation email scripts to maximize your earning potential.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
        {/* Input Parameters */}
        <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calculator size={20} color="#16a34a" /> Offer Parameters
          </h2>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>Job Title</label>
            <input type="text" value={candidateRole} onChange={(e) => setCandidateRole(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>Company Name</label>
            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>Current Base Offer ($)</label>
            <input type="number" value={baseOffer} onChange={(e) => setBaseOffer(Number(e.target.value))} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>Target Increase (%): {targetIncreasePct}%</label>
            <input type="range" min="5" max="30" value={targetIncreasePct} onChange={(e) => setTargetIncreasePct(Number(e.target.value))} style={{ width: '100%' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>Competing Offer Note (Optional)</label>
            <input type="text" value={competingOffer} onChange={(e) => setCompetingOffer(e.target.value)} placeholder="e.g. Yes ($185k offer from Stripe)" style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          </div>
        </div>

        {/* Output Metrics & Negotiation Script */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Summary Metric Display */}
          <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700 }}>Calculated Counter-Offer</span>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#4ade80' }}>
                  ${counterOfferAmount.toLocaleString()}
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700 }}>Potential Gain</span>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#38bdf8' }}>
                  +${difference.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Script Box */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MessageSquare size={18} color="#16a34a" /> Counter-Offer Email Script
                </h3>
                <button onClick={handleCopy} style={{ border: 'none', background: '#16a34a', color: '#ffffff', padding: '0.45rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy Script'}
                </button>
              </div>
              <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem', color: '#334155', lineHeight: 1.65, whiteSpace: 'pre-wrap', fontFamily: 'serif' }}>
                {script}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
