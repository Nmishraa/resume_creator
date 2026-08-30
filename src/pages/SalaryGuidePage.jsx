import React, { useState } from 'react';
import { DollarSign, Copy, Check, Calculator, Send, ArrowRight } from 'lucide-react';
import AuthorMetadata from '../components/AuthorMetadata';
import FaqSection from '../components/FaqSection';
import RelatedResources from '../components/RelatedResources';
import { ROUTE_SEO_MAP } from '../utils/seoData';

export default function SalaryGuidePage() {
  const seoInfo = ROUTE_SEO_MAP['/salary-guide'];
  const [baseOffer, setBaseOffer] = useState(150000);
  const [targetIncreasePercent, setTargetIncreasePercent] = useState(12);
  const [role, setRole] = useState('Senior Full Stack Engineer');
  const [company, setCompany] = useState('TechCorp');
  const [copied, setCopied] = useState(false);

  const counterOfferAmount = Math.round(baseOffer * (1 + targetIncreasePercent / 100));

  const script = `Subject: Regarding Job Offer - ${role} at ${company}

Dear Hiring Team,

Thank you very much for extending the offer for the ${role} position at ${company}! I am genuinely excited about the opportunity to join your team and contribute to your upcoming product milestones.

Based on market data research for senior engineering roles in our region, along with my specific track record of scaling high-throughput microservices, I would like to explore whether there is flexibility to adjust the base compensation to $${counterOfferAmount.toLocaleString()}.

I am confident that my technical skills and immediate impact will yield significant ROI for ${company}. I look forward to reaching an agreement and joining the team!

Best regards,
Alex Vance`;

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.5rem', color: '#1e293b' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#dcfce7', color: '#15803d', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
          <DollarSign size={16} /> Salary Negotiation & Offer Counter-Calculator
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          {seoInfo.h1}
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
          Calculate target compensation packages and generate recruiter-proven email negotiation scripts.
        </p>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <AuthorMetadata />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {/* Counter Offer Calculator */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calculator size={20} color="#16a34a" /> Target Counter-Offer Calculator
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>Initial Base Offer ($ USD)</label>
              <input
                type="number"
                value={baseOffer}
                onChange={(e) => setBaseOffer(Number(e.target.value))}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', fontWeight: 700 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '0.3rem' }}>Target Counter Percentage Increase: {targetIncreasePercent}%</label>
              <input
                type="range"
                min="5"
                max="25"
                value={targetIncreasePercent}
                onChange={(e) => setTargetIncreasePercent(Number(e.target.value))}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>

            <div style={{ background: '#f0fdf4', padding: '1.2rem', borderRadius: '12px', border: '1px solid #bbf7d0', textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase' }}>Calculated Target Counter-Offer</span>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#15803d', margin: '0.2rem 0' }}>
                ${counterOfferAmount.toLocaleString()}
              </div>
              <span style={{ fontSize: '0.85rem', color: '#166534', fontWeight: 600 }}>+${(counterOfferAmount - baseOffer).toLocaleString()} Increase</span>
            </div>
          </div>
        </div>

        {/* Negotiation Email Script */}
        <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Send size={20} color="#16a34a" /> Recruiter Email Counter Script
            </h2>
            <div style={{ background: '#f8fafc', padding: '1.2rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#334155', lineHeight: 1.6, whiteSpace: 'pre-wrap', fontFamily: 'Georgia, serif' }}>
              {script}
            </div>
          </div>

          <button
            onClick={handleCopy}
            style={{ marginTop: '1.5rem', padding: '0.8rem', borderRadius: '10px', border: 'none', background: '#16a34a', color: '#ffffff', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', boxShadow: '0 4px 14px rgba(22,163,74,0.3)' }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied Negotiation Script!' : 'Copy Negotiation Email Script'}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <FaqSection faqs={seoInfo.faqs} title="Salary Negotiation FAQs" />
        <RelatedResources currentPath="/salary-guide" />
      </div>
    </div>
  );
}
