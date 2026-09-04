export type ExperienceLevel = 'Entry Level' | 'Mid Level' | 'Senior Level';

export type QuestionCategory =
  | 'Beginner / Fundamental'
  | 'Technical / Role-Specific'
  | 'Behavioral'
  | 'Scenario-Based';

export interface InterviewQuestion {
  id: number;
  question: string;
  category: QuestionCategory;
  typeBadge: 'Beginner' | 'Technical' | 'Behavioral' | 'Scenario';
  sampleAnswer: string;
  keyTakeaways: string[];
}

export interface QuestionGenerationResult {
  role: string;
  experienceLevel: ExperienceLevel;
  questions: InterviewQuestion[];
}

// Bank data structure
type RoleBankStructure = Record<
  ExperienceLevel,
  {
    beginner: Array<{ q: string; a: string; tips: string[] }>;
    technical: Array<{ q: string; a: string; tips: string[] }>;
    behavioral: Array<{ q: string; a: string; tips: string[] }>;
    scenario: Array<{ q: string; a: string; tips: string[] }>;
  }
>;

// Preset question repositories by normalized role key & level
const ROLE_QUESTION_BANK: Record<string, RoleBankStructure> = {
  nurse: {
    'Entry Level': {
      beginner: [
        {
          q: 'What are the core steps in patient assessment and vital signs monitoring?',
          a: 'I perform systematic head-to-toe assessments, evaluating vital signs (blood pressure, pulse, oxygen saturation, temperature, respiratory rate), listening to lung and heart sounds, and documenting baseline findings immediately in the EHR.',
          tips: ['Mention head-to-toe assessment framework', 'Emphasize immediate and accurate EHR charting']
        },
        {
          q: 'How do you maintain patient privacy and compliance with HIPAA standards during daily care?',
          a: 'I protect patient identifiers by locking computer terminals, discussing health details only in private settings with authorized care personnel, and securing physical charts at all times.',
          tips: ['Reference HIPAA privacy regulations', 'Mention workstation and verbal confidentiality']
        },
        {
          q: 'What is your procedure for medication administration and double-checking dosages?',
          a: 'I strictly adhere to the Rights of Medication Administration (Right Patient, Medication, Dose, Route, Time, Documentation), verifying physician orders against the EHR and scanning patient identification wristbands.',
          tips: ['List the Rights of Medication Administration', 'Highlight independent double-check procedures for high-risk meds']
        }
      ],
      technical: [
        {
          q: 'How do you respond if a patient exhibits signs of acute respiratory distress or anaphylaxis?',
          a: 'I elevate the head of the bed immediately, call for rapid response assistance, administer supplemental oxygen per protocol, assess airway patency, and prepare emergency medications (such as epinephrine or bronchodilators) while notifying the attending physician.',
          tips: ['Prioritize Airway, Breathing, Circulation (ABCs)', 'Outline rapid response protocol activation']
        },
        {
          q: 'Walk me through how you document patient charts using the SBAR framework in EHR systems like Epic or Cerner.',
          a: 'I use the SBAR framework (Situation, Background, Assessment, Recommendation) to record clear, objective clinical updates in real time, ensuring flowsheets, MAR entries, and care plans accurately reflect patient status changes.',
          tips: ['Detail the SBAR communication structure', 'Emphasize objective, real-time documentation']
        },
        {
          q: 'What precautions do you take when managing IV lines and preventing central line infections?',
          a: 'I maintain strict aseptic technique during insertion and dressing changes, inspect catheter insertion sites daily for erythema or phlebitis, scrub hub connectors for 15 seconds with antiseptic, and advocate for line removal as soon as clinically indicated.',
          tips: ['Mention aseptic technique and hub scrubbing', 'Highlight daily necessity evaluation']
        },
        {
          q: 'How do you assess patient pain levels and evaluate intervention effectiveness?',
          a: 'I utilize validated pain scales (such as the Numeric 0-10 or FACES scale) to assess pain location, severity, and character, reassessing the patient 30 to 60 minutes after administering pharmacologic or non-pharmacologic comfort measures.',
          tips: ['Specify validated pain assessment tools', 'Emphasize mandatory post-treatment reassessment']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a time you had to comfort or communicate with an anxious or upset patient family member.',
          a: 'I listened actively without interrupting, validated their emotional concerns, provided clear non-jargon explanations of the care plan within HIPAA boundaries, and involved social work when additional family support was needed.',
          tips: ['Demonstrate empathy and active listening', 'Maintain professional boundaries and privacy']
        },
        {
          q: 'Describe a situation where you advocated for a patient’s safety or care preference with a physician.',
          a: 'When a prescribed medication dosage appeared high for a patient with kidney dysfunction, I double-checked the renal lab panel, consulted the pharmacist, and respectfully requested the physician review the order, resulting in a safer adjusted dosage.',
          tips: ['Show commitment to patient safety', 'Demonstrate collaborative interprofessional communication']
        }
      ],
      scenario: [
        {
          q: 'Scenario: A patient’s blood pressure drops rapidly to 80/50 mmHg and they become dizzy. What are your immediate actions?',
          a: 'I position the patient supine with legs elevated, recheck vital signs, verify IV access, alert the physician or rapid response team immediately, and prepare a fluid bolus per standing standing order while monitoring oxygen levels.',
          tips: ['Outline immediate clinical stabilization steps', 'Demonstrate urgent team notification']
        }
      ]
    },
    'Mid Level': {
      beginner: [
        {
          q: 'How do you prioritize triage care when managing multiple high-acuity patients simultaneously?',
          a: 'I utilize clinical acuity frameworks (such as ABC prioritization and Emergency Severity Index), delegating routine tasks to nursing assistants while focusing directly on unstable patients requiring immediate clinical monitoring.',
          tips: ['Reference clinical acuity frameworks', 'Mention delegation and workload balancing']
        },
        {
          q: 'How do you handle interprofessional communication breakdowns with physicians or clinical care teams?',
          a: 'I use the structured SBAR tool to present clear, concise patient data, maintaining a calm, objective focus on patient safety and care quality.',
          tips: ['Emphasize SBAR framework', 'Keep focus on patient outcomes']
        },
        {
          q: 'What protocols do you enforce for hospital-acquired infection (HAI) prevention across your unit?',
          a: 'I enforce strict hand hygiene compliance, proper transmission-based isolation precautions, adherence to CLABSI and CAUTI prevention bundles, and routine environmental disinfection audits.',
          tips: ['List infection prevention bundles (CLABSI, CAUTI)', 'Highlight unit safety standards']
        }
      ],
      technical: [
        {
          q: 'How do you identify and intervene during early signs of clinical deterioration or sepsis?',
          a: 'I monitor qSOFA indicators (altered mental status, elevated respiratory rate, hypotension). When sepsis is suspected, I draw blood cultures before initiating broad-spectrum antibiotics and fluid resuscitation within the golden hour bundle timeframe.',
          tips: ['Reference qSOFA / SIRS criteria', 'Detail the 1-hour Sepsis Bundle steps']
        },
        {
          q: 'Describe your management procedure for complex surgical wounds and Negative Pressure Wound Therapy (NPWT).',
          a: 'I evaluate wound tissue characteristics, exudate volume, and skin integrity, performing dressing changes under sterile technique. For NPWT (Wound VAC), I inspect vacuum seal integrity and pressure settings daily.',
          tips: ['Detail sterile dressing change protocols', 'Mention NPWT pressure and seal monitoring']
        },
        {
          q: 'How do you educate patients and families on post-discharge chronic condition management?',
          a: 'I use the "teach-back" method, breaking complex instructions (like insulin administration or heart failure fluid restrictions) into clear steps and having the patient demonstrate comprehension before discharge.',
          tips: ['Highlight the teach-back method', 'Verify patient health literacy']
        },
        {
          q: 'What is your approach to interdisciplinary care coordination with physical therapy, pharmacy, and case management?',
          a: 'I participate in daily multidisciplinary rounds, sharing patient progress, identifying discharge barriers, verifying medication reconciliation, and arranging necessary home care equipment.',
          tips: ['Mention multidisciplinary care rounds', 'Highlight smooth transition of care']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a high-stress emergency situation (such as a Code Blue) and how you maintained focus.',
          a: 'During a cardiac arrest, I immediately started chest compressions, assigned clear team roles (compressor, recorder, medication nurse), and maintained closed-loop communication until circulation was restored.',
          tips: ['Demonstrate calm crisis execution', 'Mention closed-loop communication']
        },
        {
          q: 'Describe a time you caught a potentially serious medication error during shift handoff.',
          a: 'During bedside shift report, I noticed an IV pump programmed at an incorrect rate for heparin. I paused the infusion, checked the patient’s PTT labs, notified the doctor, and submitted an incident report to improve double-check safeguards.',
          tips: ['Highlight bedside shift handoff benefits', 'Promote non-punitive safety reporting']
        }
      ],
      scenario: [
        {
          q: 'Scenario: You notice a colleague breaking sterile field technique during a procedure. How do you respond?',
          a: 'I immediately speak up calmly and directly ("Let’s pause and replace the sterile glove"), providing fresh sterile supplies immediately to protect patient safety without causing embarrassment.',
          tips: ['Prioritize patient safety above hierarchy', 'Use respectful, immediate communication']
        }
      ]
    },
    'Senior Level': {
      beginner: [
        {
          q: 'How do you lead a nursing unit during peak bed utilization, short staffing, or emergency patient surges?',
          a: 'I implement acuity-based staffing adjustments, coordinate with bed management for timely discharges, reallocate float pool resources, and maintain visible floor support to preserve safe nurse-to-patient ratios.',
          tips: ['Discuss acuity-based scheduling', 'Detail patient flow optimization during surges']
        },
        {
          q: 'How do you ensure clinical governance and evidence-based nursing practice across a hospital department?',
          a: 'I monitor clinical quality indicators (fall rates, pressure injuries, infection metrics), chair unit practice councils, and translate clinical research updates into standardized nursing workflows.',
          tips: ['Mention clinical audit metrics and Unit Practice Councils', 'Focus on evidence-based practice']
        },
        {
          q: 'What strategies do you execute to mitigate nursing staff burnout and improve retention in high-stress units?',
          a: 'I promote a culture of psychological safety, advocate for balanced workloads, establish peer mentorship programs, recognize team accomplishments, and address workplace stress proactively.',
          tips: ['Address retention drivers and workload equity', 'Emphasize psychological safety']
        }
      ],
      technical: [
        {
          q: 'How do you lead a Root Cause Analysis (RCA) following a sentinel event or clinical near-miss?',
          a: 'I form a multidisciplinary team to analyze systemic contributing factors using fishbone diagrams and 5-Whys methodology, developing actionable policy improvements to prevent future occurrences.',
          tips: ['Explain RCA methodology (5 Whys / Fishbone)', 'Focus on systemic improvements over individual blame']
        },
        {
          q: 'How do you manage department operational budgets, staffing ratios, and clinical supply allocation?',
          a: 'I analyze Hours Per Patient Day (HPPD) metrics, balance staffing costs against patient acuity requirements, reduce supply waste, and justify capital requests for upgraded clinical technology.',
          tips: ['Reference HPPD metrics', 'Balance cost controls with clinical care standards']
        },
        {
          q: 'Describe your framework for implementing new clinical technologies or EHR upgrades across a nursing unit.',
          a: 'I identify unit super-users, build competency validation checklists, run phased workflow simulations, and provide continuous floor support during implementation to maintain patient safety.',
          tips: ['Highlight super-user training model', 'Focus on change management and care continuity']
        },
        {
          q: 'How do you ensure compliance with Joint Commission (TJC) standards and state health regulations?',
          a: 'I maintain continuous audit readiness, conduct mock tracer inspections, verify staff competency documentation, and align nursing policies with National Patient Safety Goals.',
          tips: ['Reference National Patient Safety Goals', 'Detail continuous tracer audit readiness']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a time you resolved a major conflict between nursing staff and attending physicians.',
          a: 'I organized a joint debrief with nursing and medical leads, reviewed safety data objectively, established agreed-upon communication guidelines, and restored productive interprofessional trust.',
          tips: ['Show senior leadership conflict resolution', 'Focus on shared safety goals']
        },
        {
          q: 'Describe how you mentored a junior nurse to improve their clinical decision-making skills.',
          a: 'I paired them with an experienced preceptor, conducted weekly check-ins to review complex cases, encouraged critical reflection, and provided constructive feedback that built their independence.',
          tips: ['Demonstrate structured mentorship', 'Highlight measurable clinical growth']
        }
      ],
      scenario: [
        {
          q: 'Scenario: Your unit receives a sudden influx of trauma patients during a disaster while short-staffed. How do you lead?',
          a: 'I activate disaster triage protocols, coordinate with house supervisors for float assistance, reassign non-essential duties, step in to assist with critical patients, and keep the team focused on triage priorities.',
          tips: ['Demonstrate disaster leadership and resource management', 'Maintain team focus and triage standards']
        }
      ]
    }
  },
  accountant: {
    'Entry Level': {
      beginner: [
        {
          q: 'What is the fundamental accounting equation, and how do balance sheets stay in balance?',
          a: 'The accounting equation is Assets = Liabilities + Equity. Every double-entry transaction affects at least two accounts with equal debit and credit amounts, keeping the balance sheet balanced.',
          tips: ['Define Assets = Liabilities + Equity', 'Explain double-entry debits and credits']
        },
        {
          q: 'What is the main difference between cash-basis and accrual-basis accounting?',
          a: 'Cash accounting records revenue and expenses when money actually changes hands. Accrual accounting recognizes revenue when earned and expenses when incurred, aligning with the matching principle.',
          tips: ['Contrast cash flow timing vs performance matching', 'Reference GAAP revenue recognition']
        },
        {
          q: 'What are the three core financial statements, and how are they linked?',
          a: 'The Income Statement feeds Net Income into the Statement of Cash Flows and Retained Earnings on the Balance Sheet. The Balance Sheet reports ending cash which matches the Cash Flow statement.',
          tips: ['Explain how Net Income flows into Retained Earnings', 'Highlight cash balance reconciliation']
        }
      ],
      technical: [
        {
          q: 'Walk me through the monthly bank reconciliation process and common adjusting entries.',
          a: 'I compare general ledger cash balances against bank statements, identifying outstanding checks, deposits in transit, bank fees, and interest earned, posting adjusting journal entries to reconcile differences.',
          tips: ['Identify deposits in transit and outstanding checks', 'Detail adjusting journal entry steps']
        },
        {
          q: 'How do straight-line and double-declining balance depreciation methods differ?',
          a: 'Straight-line spreads depreciation expense evenly across an asset’s useful life. Double-declining balance accelerates expense recognition in early years, suitable for rapidly depreciating assets.',
          tips: ['Explain equal expense vs accelerated expense', 'Mention asset useful life calculation']
        },
        {
          q: 'How do you conduct variance analysis between budgeted and actual financial figures?',
          a: 'I calculate line-item dollar and percentage differences between actuals and budgets, investigate root causes for unfavorable variances, and discuss findings with department managers.',
          tips: ['Explain favorable vs unfavorable variances', 'Focus on investigating significant deviations']
        },
        {
          q: 'What accounting software and ERP tools (e.g. QuickBooks, SAP, Excel) do you use for ledger maintenance?',
          a: 'I use ERP modules to post journal entries, perform trial balance reviews, generate sub-ledger reports, and build automated Excel reconciliations using VLOOKUP, INDEX/MATCH, and PivotTables.',
          tips: ['Mention specific ERP systems and Excel functions', 'Highlight ledger accuracy controls']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a time you detected a discrepancy or error in a financial ledger.',
          a: 'During a month-end close review, I noticed a $12,000 imbalance in accounts payable. I traced transaction logs to a duplicate invoice entry, reversed the duplicate entry, and updated posting checks.',
          tips: ['Show attention to financial detail', 'Explain systematic error tracing and correction']
        },
        {
          q: 'How do you ensure accuracy when processing large volumes of invoice data under tight close deadlines?',
          a: 'I organize batch processing schedules, use automated data validation checks in Excel, and perform spot-checks on high-value transactions before submitting journal vouchers.',
          tips: ['Describe personal quality control procedures', 'Mention time management during month-end close']
        }
      ],
      scenario: [
        {
          q: 'Scenario: An expense is recorded in the wrong fiscal period right before financial statements are finalized. What do you do?',
          a: 'I determine the materiality of the misstatement. If material, I post an adjusting accrual entry to shift the expense to the correct period and document the rationale for the audit trail.',
          tips: ['Reference accounting materiality concepts', 'Explain period-end adjusting entries']
        }
      ]
    },
    'Mid Level': {
      beginner: [
        {
          q: 'How do GAAP and IFRS standards differ regarding inventory valuation and revenue recognition?',
          a: 'GAAP allows LIFO, FIFO, and weighted-average inventory valuation, whereas IFRS prohibits LIFO. Under ASC 606 / IFRS 15, revenue recognition follows a standardized 5-step model focused on performance obligations.',
          tips: ['Mention LIFO prohibition in IFRS', 'Reference ASC 606 5-step model']
        },
        {
          q: 'What is the difference between Capital Expenditures (CapEx) and Operating Expenditures (OpEx)?',
          a: 'CapEx provides long-term value and is capitalized on the balance sheet and depreciated over time. OpEx represents day-to-day operational costs expensed immediately on the income statement.',
          tips: ['Distinguish balance sheet capitalization vs immediate expense', 'Provide concrete business examples']
        },
        {
          q: 'How do you calculate and interpret Working Capital and the Quick Ratio?',
          a: 'Working Capital is Current Assets minus Current Liabilities. The Quick Ratio excludes inventory from current assets, measuring immediate short-term liquidity without relying on inventory sales.',
          tips: ['State formulas for Working Capital and Quick Ratio', 'Explain liquidity assessment significance']
        }
      ],
      technical: [
        {
          q: 'Walk me through how you implement ASC 606 revenue recognition for complex multi-element contracts.',
          a: 'I identify contract terms, separate distinct performance obligations, determine transaction price, allocate price based on standalone selling prices, and recognize revenue as obligations are satisfied.',
          tips: ['Detail the 5-step ASC 606 process', 'Explain allocation by standalone selling price']
        },
        {
          q: 'How do you audit accounts receivable aging and calculate allowances for doubtful accounts?',
          a: 'I analyze aging buckets (30/60/90+ days), evaluate customer historical default trends, consult account managers on disputed balances, and adjust bad debt allowance reserves accordingly.',
          tips: ['Explain aging bucket analysis', 'Describe bad debt reserve estimation methods']
        },
        {
          q: 'How do you prepare corporate tax schedules and ensure compliance with federal and local tax laws?',
          a: 'I maintain permanent vs timing tax difference schedules, calculate book-to-tax adjustments, record deferred tax assets/liabilities, and assemble supporting documentation for tax returns.',
          tips: ['Mention timing differences and deferred taxes', 'Highlight tax compliance documentation']
        },
        {
          q: 'How do you conduct fixed asset management, impairment testing, and disposition tracking?',
          a: 'I maintain the fixed asset register, track capitalization thresholds, evaluate indicators of asset impairment, calculate carrying values vs fair values, and record gains/losses upon asset retirement.',
          tips: ['Discuss fixed asset registers and impairment testing', 'Explain gain/loss calculation on disposition']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a time you advised a department manager on reducing operational budget overruns.',
          a: 'I analyzed their department spending patterns, identified recurring software license redundancies, presented cost-saving options to the manager, and helped reallocate budget to critical priorities.',
          tips: ['Demonstrate business partnership skills', 'Quantify cost savings or budget improvements']
        },
        {
          q: 'Describe a situation where you managed a complex month-end close under unexpected staffing shortages.',
          a: 'I prioritized high-risk account reconciliations, automated repetitive journal entries using macros, reallocated close tasks across available team members, and completed financial reporting on schedule.',
          tips: ['Highlight task prioritization under pressure', 'Mention process automation improvements']
        }
      ],
      scenario: [
        {
          q: 'Scenario: External auditors question an asset valuation method used during last year’s audit. How do you respond?',
          a: 'I gather original valuation models, supporting market data, and accounting policy documentation, present the technical justification clearly to the audit team, and resolve open audit items collaboratively.',
          tips: ['Show audit preparation and documentation backup', 'Maintain professional audit communication']
        }
      ]
    },
    'Senior Level': {
      beginner: [
        {
          q: 'How do you design an enterprise internal control framework to prevent fraud and satisfy SOX compliance?',
          a: 'I implement COSO internal control frameworks, establish clear segregation of duties, mandate dual authorizations for high-value transactions, conduct periodic access reviews, and institute regular control testing.',
          tips: ['Reference COSO framework and SOX compliance', 'Emphasize segregation of duties and control testing']
        },
        {
          q: 'What framework do you use for strategic capital allocation, capital budgeting, and corporate financial forecasting?',
          a: 'I evaluate projects using Net Present Value (NPV), Internal Rate of Return (IRR), and Payback Period, building rolling 12-month forecasts aligned with strategic corporate objectives.',
          tips: ['Mention NPV, IRR, and payback period criteria', 'Discuss rolling forecast models']
        },
        {
          q: 'How do you manage complex multi-entity financial consolidation and intercompany eliminations?',
          a: 'I establish standardized chart of accounts mapping, record intercompany balance eliminations, manage foreign currency translation adjustments under ASC 830, and produce consolidated financial statements.',
          tips: ['Detail intercompany transaction eliminations', 'Mention foreign currency translation rules (ASC 830)']
        }
      ],
      technical: [
        {
          q: 'How do you build a 3-statement financial model for corporate valuation, scenario planning, and stress testing?',
          a: 'I link the Income Statement, Balance Sheet, and Cash Flow Statement dynamically using underlying operating drivers, incorporating sensitivity toggles for revenue growth, margin changes, and interest rate shifts.',
          tips: ['Explain dynamic 3-statement integration', 'Discuss scenario planning and sensitivity analysis']
        },
        {
          q: 'Describe your approach to corporate tax strategy, transfer pricing, and international tax compliance.',
          a: 'I oversee arm’s-length transfer pricing documentation across global subsidiaries, monitor GILTI and BEAT provisions, optimize R&D tax credits, and minimize global effective tax rates legally.',
          tips: ['Reference transfer pricing arm’s-length principles', 'Discuss effective tax rate optimization']
        },
        {
          q: 'How do you lead external audit engagements and report financial results to board audit committees?',
          a: 'I establish audit schedules, review draft audit opinions, resolve complex accounting position papers (e.g. lease accounting or M&A purchase price allocations), and present clear summaries to the board committee.',
          tips: ['Describe executive audit leadership', 'Mention position papers and board presentations']
        },
        {
          q: 'How do you evaluate potential M&A transactions from a financial due diligence perspective?',
          a: 'I perform Quality of Earnings (QofE) analyses, audit target historical working capital requirements, evaluate unrecorded liabilities, and model integration cost synergies.',
          tips: ['Reference Quality of Earnings (QofE) analysis', 'Detail financial due diligence steps']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a time you led an accounting team through a major ERP migration or accounting standard transition.',
          a: 'I led the transition to ASC 842 lease accounting, auditing over 200 lease contracts, implementing dedicated lease management software, training finance teams, and ensuring full compliance without restatements.',
          tips: ['Demonstrate major change project leadership', 'Highlight compliance outcome and cross-team execution']
        },
        {
          q: 'Describe a situation where executive leadership proposed a high-risk financial strategy. How did you guide them?',
          a: 'I conducted financial scenario modeling illustrating potential downside cash flow risks, presented alternative structured financing options, and guided leadership toward a balanced risk approach.',
          tips: ['Show executive courage backed by financial modeling', 'Provide constructive strategic alternatives']
        }
      ],
      scenario: [
        {
          q: 'Scenario: A key subsidiary reports a sudden unrecorded financial liability shortly before annual reporting. How do you handle it?',
          a: 'I assess liability scope and materiality immediately, determine if adjustment to current period financial statements is required under GAAP, inform executive leadership, and update internal controls to prevent similar gaps.',
          tips: ['Prioritize financial reporting accuracy and materiality', 'Update internal controls immediately']
        }
      ]
    }
  },
  marketing: {
    'Entry Level': {
      beginner: [
        {
          q: 'What are the key elements of a modern digital marketing funnel?',
          a: 'The funnel consists of Top of Funnel (Awareness/Traffic), Middle of Funnel (Consideration/Lead Generation), and Bottom of Funnel (Conversion/Sales), supported by retention and loyalty tactics.',
          tips: ['Explain TOFU, MOFU, and BOFU stages', 'Connect channels to funnel stages']
        },
        {
          q: 'What is the difference between organic search (SEO) and paid search advertising (PPC)?',
          a: 'SEO focuses on optimizing content and site authority for unpaid organic search rankings over time. PPC involves bidding on keywords to place paid ads immediately at the top of search results.',
          tips: ['Contrast long-term organic growth vs immediate paid traffic', 'Mention cost per click vs SEO effort']
        },
        {
          q: 'What core metrics do you monitor to measure email marketing campaign performance?',
          a: 'I track Deliverability Rate, Open Rate, Click-Through Rate (CTR), Conversion Rate, Unsubscribe Rate, and overall Campaign Revenue.',
          tips: ['List key email engagement metrics', 'Explain CTR vs Open Rate significance']
        }
      ],
      technical: [
        {
          q: 'How do you conduct keyword research and on-page SEO optimization for a new article or landing page?',
          a: 'I use SEO tools (like Semrush or Ahrefs) to find search volume and keyword intent, placing target keywords in H1 headers, title tags, meta descriptions, body content, and image alt text while preserving natural readability.',
          tips: ['Mention keyword intent and search volume', 'List key on-page SEO placement areas']
        },
        {
          q: 'How do you set up UTM parameters and track marketing campaign performance in Google Analytics 4 (GA4)?',
          a: 'I construct standardized UTM links (utm_source, utm_medium, utm_campaign), verifying event tracking and conversion goals in GA4 to analyze traffic quality and campaign ROI.',
          tips: ['Explain UTM parameter structure', 'Connect UTM links to GA4 reporting']
        },
        {
          q: 'What is your process for creating engaging social media content across different platforms (LinkedIn, Instagram, X)?',
          a: 'I adapt messaging and formats to platform audiences—using professional long-form insights on LinkedIn, visual carousels on Instagram, and concise updates on X, aligning all with brand guidelines.',
          tips: ['Tailor content strategy to audience platform norms', 'Maintain brand consistency']
        },
        {
          q: 'How do you design and execute an A/B test for a marketing email or landing page?',
          a: 'I isolate a single variable (such as subject line or CTA button color), split the audience randomly into equal segments, run the test until statistical confidence is reached, and implement the winning variant.',
          tips: ['Test one variable at a time', 'Mention statistical confidence and sample split']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a marketing campaign you ran that did not meet its target goals. What did you learn?',
          a: 'A social ad campaign generated high clicks but low landing page conversions. I analyzed user behavior, realized the messaging on the ad didn’t match the landing page headline, redesigned the page copy, and improved conversions by 35%.',
          tips: ['Demonstrate analytical reflection', 'Focus on corrective actions and learning']
        },
        {
          q: 'How do you handle tight content deadlines when managing multiple campaign requests simultaneously?',
          a: 'I prioritize tasks using a content calendar, break campaigns into production steps, set expectations with stakeholders early, and focus on core high-impact channels.',
          tips: ['Mention content calendars and workflow tools', 'Highlight realistic stakeholder communication']
        }
      ],
      scenario: [
        {
          q: 'Scenario: Your organic blog traffic drops by 20% following a Google search algorithm update. How do you investigate?',
          a: 'I check Google Search Console to identify which specific pages and queries lost impressions, review updated search quality guidelines, audit affected pages for content quality or technical SEO issues, and refresh the content.',
          tips: ['Use Google Search Console for diagnostics', 'Focus on content quality and technical SEO fixes']
        }
      ]
    },
    'Mid Level': {
      beginner: [
        {
          q: 'How do you calculate and optimize Customer Acquisition Cost (CAC) and Customer Lifetime Value (LTV)?',
          a: 'CAC is total marketing and sales expenses divided by new customers acquired. LTV is average revenue per customer multiplied by lifespan and margin. I optimize the LTV:CAC ratio (target 3:1+) by improving conversion rates and retention.',
          tips: ['State CAC and LTV formulas', 'Reference the target 3:1 LTV:CAC benchmark']
        },
        {
          q: 'What is Conversion Rate Optimization (CRO), and how do you implement it on web landing pages?',
          a: 'CRO systematically increases the percentage of website visitors who take a desired action. I analyze heatmaps, review form drop-off analytics, simplify page copy, strengthen CTAs, and run iterative split tests.',
          tips: ['Mention heatmap and funnel analytics', 'Focus on reducing user friction']
        },
        {
          q: 'How do multi-touch attribution models differ from first-touch and last-touch attribution?',
          a: 'First-touch gives 100% credit to the initial touchpoint; last-touch gives 100% credit to the final touchpoint before conversion. Multi-touch attribution (linear, time-decay, position-based) distributes credit across all buyer journey touchpoints.',
          tips: ['Compare single-touch vs multi-touch models', 'Explain how multi-touch reflects complex buyer journeys']
        }
      ],
      technical: [
        {
          q: 'How do you manage paid ad budgets across Google Ads and Meta Ads to maximize ROAS (Return on Ad Spend)?',
          a: 'I segment campaigns by audience intent, continuously optimize keyword match types and negative keywords, use custom audience retargeting, and reallocate budget dynamically to high-performing campaigns.',
          tips: ['Explain keyword targeting and negative keywords', 'Discuss dynamic budget reallocation by ROAS']
        },
        {
          q: 'Walk me through how you build an automated lead nurturing lifecycle workflow in HubSpot or Marketo.',
          a: 'I map buyer personas to lifecycle stages, trigger automated email workflows based on user behaviors (e.g. downloading an eBook), score lead engagement, and route qualified leads to sales.',
          tips: ['Detail lead scoring and behavioral triggers', 'Explain alignment with sales pipeline']
        },
        {
          q: 'How do you perform technical SEO audits to resolve site speed, indexing, and structured data issues?',
          a: 'I run site crawls using Screaming Frog, check Core Web Vitals in PageSpeed Insights, fix broken links and 404s, optimize canonical tags, and implement Schema.org markup for rich snippets.',
          tips: ['Mention technical SEO tools (Screaming Frog, PageSpeed)', 'Cover Schema markup and Core Web Vitals']
        },
        {
          q: 'How do you structure product launch marketing campaigns across PR, social, email, and performance channels?',
          a: 'I define launch positioning, create a unified multi-channel content roadmap, coordinate influencer and media outreach, align sales enablement assets, and track launch KPIs against targets.',
          tips: ['Detail multi-channel launch roadmaps', 'Ensure cross-functional sales alignment']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a time you persuaded product management or sales leadership to pivot marketing strategy.',
          a: 'By presenting customer analytics showing our product was attracting small business users rather than enterprise targets, I convinced leadership to introduce a self-serve tier, growing self-serve ARR by 40%.',
          tips: ['Use data to drive executive persuasion', 'Quantify business revenue impact']
        },
        {
          q: 'Describe a project where you successfully scaled organic content traffic by 100%+',
          a: 'I conducted a content gap analysis, refreshed outdated high-performing articles, built a topic cluster structure with strong internal linking, and scaled output, increasing organic monthly visits from 25k to 60k.',
          tips: ['Explain topic cluster strategy', 'Share concrete growth metrics']
        }
      ],
      scenario: [
        {
          q: 'Scenario: Your paid acquisition channel CAC doubles over 2 months due to increased ad competition. What do you do?',
          a: 'I audit ad copy and creative fatigue, shift focus to longer-tail keywords and custom audience retargeting, test alternative channels (such as LinkedIn or YouTube ads), and focus on landing page conversion efficiency.',
          tips: ['Diagnose ad creative fatigue and bidding competition', 'Diversify acquisition channels']
        }
      ]
    },
    'Senior Level': {
      beginner: [
        {
          q: 'How do you build a comprehensive enterprise brand positioning and growth marketing strategy?',
          a: 'I align brand identity with core market positioning, build data-driven customer acquisition and retention engines, set channel mix strategy, and tie marketing outputs directly to pipeline revenue goals.',
          tips: ['Connect brand positioning to measurable growth', 'Focus on pipeline revenue creation']
        },
        {
          q: 'How do you manage multi-million dollar annual marketing budgets and optimize capital allocation across channels?',
          a: 'I build predictive customer acquisition models, evaluate blended CAC and marginal ROAS across channels, maintain contingency reserves for agile experimentation, and present quarterly ROI models to executive leadership.',
          tips: ['Discuss marginal ROAS and channel portfolio management', 'Focus on executive financial accountability']
        },
        {
          q: 'What is Account-Based Marketing (ABM), and how do you execute ABM strategies for enterprise B2B clients?',
          a: 'ABM targets high-value target accounts with personalized multi-channel campaigns. I collaborate with sales to identify target account lists, build bespoke content, run hyper-targeted ads, and track account engagement metrics.',
          tips: ['Explain sales-marketing alignment in ABM', 'Highlight bespoke content and account engagement tracking']
        }
      ],
      technical: [
        {
          q: 'How do you design a MarTech stack (CDP, CRM, Automation, Analytics) that guarantees data hygiene and privacy compliance?',
          a: 'I integrate customer data platforms (CDPs) with CRM and automation engines via APIs, enforce strict GDPR/CCPA consent management, maintain unified customer IDs, and audit data hygiene continuously.',
          tips: ['Detail MarTech integration architecture', 'Include GDPR/CCPA privacy compliance controls']
        },
        {
          q: 'How do you establish a Marketing Operations (MOPs) structure that scales lead routing and attribution accuracy?',
          a: 'I define standardized lead stage transitions, build automated lead scoring models, enforce CRM field validation, and implement multi-touch attribution dashboards linked to pipeline opportunities.',
          tips: ['Cover MOPs infrastructure and lead routing', 'Detail attribution modeling connected to CRM opportunities']
        },
        {
          q: 'Describe your approach to market expansion, international localization, and brand entry strategies.',
          a: 'I evaluate regional market size and competitive intensity, adapt messaging for cultural and linguistic nuances, build local partner networks, and test localized digital acquisition campaigns.',
          tips: ['Cover localized market evaluation', 'Discuss cultural messaging adaptation and partner channels']
        },
        {
          q: 'How do you measure marketing contribution to Customer Lifetime Value and net retention rate (NRR)?',
          a: 'I build customer lifecycle marketing campaigns focused on onboarding completion, feature adoption, upsell triggers, and customer community engagement, tracking incremental expansion revenue.',
          tips: ['Connect marketing to customer retention and expansion', 'Reference Net Retention Rate (NRR) metrics']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a time you led a high-performing marketing team through a company rebrand or major strategic pivot.',
          a: 'I led a full rebrand across 500+ assets within 4 months, maintaining cross-team alignment, communicating updated brand guidelines transparently, and launching a campaign that boosted brand search volume by 65%.',
          tips: ['Demonstrate executive project leadership', 'Quantify brand search and sentiment outcome']
        },
        {
          q: 'How do you handle disagreement with the CEO or VP of Sales regarding marketing budget allocation?',
          a: 'I bring objective pipeline data, showing payback period comparisons across channels, framing suggestions in terms of sales-qualified opportunities and revenue outcomes rather than vanity metrics.',
          tips: ['Focus on revenue metrics over vanity metrics', 'Demonstrate collaborative executive leadership']
        }
      ],
      scenario: [
        {
          q: 'Scenario: Your core product suffers negative viral publicity on social media. How do you lead the marketing response?',
          a: 'I activate crisis communications protocols, pause promotional campaigns immediately, coordinate with legal and PR to issue an authentic, transparent public statement, and monitor sentiment metrics closely.',
          tips: ['Act swiftly with transparent crisis communication', 'Coordinate PR, legal, and executive alignment']
        }
      ]
    }
  },
  hr: {
    'Entry Level': {
      beginner: [
        {
          q: 'What are the foundational functions of a Human Resources department in a modern company?',
          a: 'HR functions include recruitment and talent acquisition, onboarding, employee relations, compensation and benefits administration, performance management, compliance with labor laws, and workplace culture development.',
          tips: ['Cover key HR functional areas', 'Emphasize employee experience and compliance']
        },
        {
          q: 'What is the importance of maintaining confidentiality in Human Resources operations?',
          a: 'HR handles sensitive employee data (salaries, medical notes, performance reviews). Protecting confidentiality builds employee trust, ensures compliance with privacy regulations, and mitigates legal risks.',
          tips: ['Emphasize employee trust and legal privacy obligations', 'Mention secure data handling']
        },
        {
          q: 'What is the purpose of an employee handbook, and how does HR keep it updated?',
          a: 'An employee handbook outlines company policies, codes of conduct, benefits, and workplace expectations. HR updates it annually to reflect evolving labor laws and organizational changes.',
          tips: ['Explain policy clarity and legal risk mitigation', 'Mention annual policy reviews']
        }
      ],
      technical: [
        {
          q: 'Walk me through your step-by-step workflow for onboarding a new employee.',
          a: 'I send welcome communications, coordinate IT equipment setup, ensure completion of I-9 and tax forms, organize orientation sessions on company culture and policies, and check in after their first week.',
          tips: ['Cover pre-boarding, paperwork, and orientation', 'Highlight post-onboarding follow-up']
        },
        {
          q: 'How do you conduct candidate screening calls to evaluate job fit and qualifications?',
          a: 'I review candidate resumes against job specifications, ask structured behavioral and technical experience questions, evaluate salary alignment, and summarize key findings for hiring managers.',
          tips: ['Use structured interview questions', 'Check salary and culture alignment']
        },
        {
          q: 'How do you ensure HR compliance with labor regulations like FLSA, FMLA, and EEOC guidelines?',
          a: 'I maintain accurate record-keeping, verify correct employee exemption classifications (FLSA), process medical leave requests per FMLA rules, and promote non-discriminatory hiring practices under EEOC guidelines.',
          tips: ['Reference core employment laws (FLSA, FMLA, EEOC)', 'Highlight accurate record-keeping']
        },
        {
          q: 'What Applicant Tracking Systems (ATS) and HRIS tools (e.g., Workday, Greenhouse, BambooHR) do you use?',
          a: 'I use HRIS/ATS platforms to post requisitions, manage candidate pipelines, track onboarding progress, maintain digital personnel files, and generate workforce reports.',
          tips: ['Name specific ATS/HRIS platforms', 'Explain workflow efficiency benefits']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a time an employee came to you with a confidential workplace concern. How did you handle it?',
          a: 'I listened empathetically in a private setting, took detailed objective notes, explained confidentiality boundaries, investigated the matter discreetly, and followed up with the employee on appropriate resolution steps.',
          tips: ['Demonstrate active listening and discretion', 'Outline clear investigative follow-up']
        },
        {
          q: 'Describe a situation where you had to manage multiple urgent HR requests from different managers simultaneously.',
          a: 'I prioritized tasks based on urgency and risk (such as safety or payroll issues over routine inquiries), communicated realistic completion timelines, and used HR ticketing systems to stay organized.',
          tips: ['Prioritize based on legal/business risk', 'Use organized tracking systems']
        }
      ],
      scenario: [
        {
          q: 'Scenario: A candidate accepts an offer letter but notifies HR two days before their start date that they cannot join. How do you respond?',
          a: 'I acknowledge their message professionally, inquire if circumstances can be accommodated, notify the hiring manager immediately, and re-engage top runner-up candidates from the recent interview pool.',
          tips: ['Maintain professional composure', 'Act quickly to re-engage runner-up candidates']
        }
      ]
    },
    'Mid Level': {
      beginner: [
        {
          q: 'How do you approach performance management and structured employee review cycles?',
          a: 'I establish clear goal-setting frameworks (like OKRs or SMART goals), facilitate mid-year and annual review cycles, coach managers on providing constructive feedback, and oversee Performance Improvement Plans (PIPs).',
          tips: ['Reference SMART goals or OKRs', 'Describe coaching managers on constructive feedback']
        },
        {
          q: 'What is the role of HR in cultivating Diversity, Equity, and Inclusion (DEI) in the workplace?',
          a: 'HR drives DEI by implementing unbiased hiring practices, expanding sourcing channels, supporting Employee Resource Groups (ERGs), conducting pay equity audits, and fostering an inclusive workplace culture.',
          tips: ['Mention inclusive recruiting and pay equity audits', 'Highlight Employee Resource Groups (ERGs)']
        },
        {
          q: 'How do voluntary turnover metrics inform HR retention strategies?',
          a: 'Analyzing exit interview data and turnover rates by department reveals underlying issues (such as compensation gaps or management friction), guiding targeted retention interventions.',
          tips: ['Explain exit interview analysis', 'Connect turnover metrics to retention action plans']
        }
      ],
      technical: [
        {
          q: 'How do you manage complex employee relations investigations regarding harassment or policy violations?',
          a: 'I conduct impartial investigations—interviewing the complainant, respondent, and witnesses, gathering documentary evidence, assessing credibility, writing an objective findings report, and recommending corrective actions.',
          tips: ['Detail structured investigation steps', 'Emphasize objectivity, documentation, and prompt action']
        },
        {
          q: 'How do you design competitive compensation bands and total rewards structures?',
          a: 'I benchmark job roles against salary market data (such as Mercer or Radford surveys), establish salary bands with midpoints, evaluate internal equity, and design benefits packages.',
          tips: ['Reference market salary benchmarks', 'Explain internal equity and salary ranges']
        },
        {
          q: 'What is your process for managing involuntary employee terminations smoothly and legally?',
          a: 'I review documentation with legal/management, prepare severance and COBRA information, conduct respectful termination meetings, ensure IT access revocation, and manage final paycheck compliance.',
          tips: ['Focus on legal risk reduction and dignity', 'Ensure seamless IT and payroll coordination']
        },
        {
          q: 'How do you build manager training programs on effective leadership, feedback, and compliance?',
          a: 'I design interactive workshops on coaching skills, conflict resolution, legal compliance, and performance evaluations, tracking manager attendance and feedback effectiveness.',
          tips: ['Cover key leadership topics', 'Highlight measurable training impact']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a time you managed a difficult Performance Improvement Plan (PIP) that ended in employee turnaround.',
          a: 'I worked with the manager to set clear 30/60-day measurable targets, held weekly coaching check-ins with the employee, and provided resources, resulting in the employee exceeding performance targets.',
          tips: ['Show constructive coaching focus in PIPs', 'Highlight successful employee turnaround']
        },
        {
          q: 'Describe a situation where you mediated a severe interpersonal conflict between two key team members.',
          a: 'I met with each individual separately to understand their perspectives, facilitated a joint resolution meeting, established clear communication ground rules, and followed up to ensure sustained teamwork.',
          tips: ['Detail structured mediation steps', 'Focus on neutral, outcome-driven facilitation']
        }
      ],
      scenario: [
        {
          q: 'Scenario: An anonymous glassdoor review alleges toxic management in a specific department. How do you respond?',
          a: 'I brief leadership, conduct confidential pulse surveys or stay interviews within the department, analyze exit trends, present findings objectively to executive leadership, and implement manager coaching.',
          tips: ['Investigate proactively without defensiveness', 'Use internal stay interviews to uncover ground truth']
        }
      ]
    },
    'Senior Level': {
      beginner: [
        {
          q: 'How do you align enterprise People Strategy and Talent Management with long-term business goals?',
          a: 'I partner with C-suite leadership to map workforce planning to multi-year business strategies, designing talent acquisition, retention, and succession programs that support strategic expansion.',
          tips: ['Demonstrate executive partnership', 'Connect workforce planning directly to revenue goals']
        },
        {
          q: 'How do you design executive succession planning frameworks for critical leadership roles?',
          a: 'I implement 9-box grid talent evaluations, identify high-potential leaders, build tailored executive development plans, and review succession readiness annually with the board of directors.',
          tips: ['Reference 9-box grid framework', 'Mention board-level succession reviews']
        },
        {
          q: 'How do you evaluate HR effectiveness using advanced People Analytics and HR dashboards?',
          a: 'I track strategic metrics—such as Quality of Hire, Time-to-Productivity, eNPS (Employee Net Promoter Score), Retention of Top Performers, and HR Cost Per Employee—presenting insights to executive leadership.',
          tips: ['List strategic HR metrics (eNPS, Quality of Hire)', 'Translate data into strategic decision-making']
        }
      ],
      technical: [
        {
          q: 'How do you manage HR integration during mergers and acquisitions (M&A)?',
          a: 'I conduct HR due diligence (auditing benefit liabilities and employment contracts), design culture integration roadmaps, align compensation structures, and manage change communications to retain top talent.',
          tips: ['Cover HR due diligence and cultural integration', 'Focus on key talent retention during M&A']
        },
        {
          q: 'How do you build a global workforce management framework covering multi-country compliance and remote work policies?',
          a: 'I leverage Employers of Record (EORs) or local legal entities, establish standardized global remote work policies, ensure international labor law compliance, and harmonize global benefits.',
          tips: ['Mention EORs and global compliance', 'Discuss remote work policy harmonization']
        },
        {
          q: 'Describe your approach to designing executive compensation packages and long-term incentive plans (LTIPs).',
          a: 'I design competitive executive total rewards featuring base salary, performance bonuses, equity/stock options (RSUs), and clawback provisions, aligning executive incentives with shareholder value.',
          tips: ['Cover base, bonus, equity (RSUs), and governance', 'Align incentives with shareholder outcomes']
        },
        {
          q: 'How do you handle enterprise-wide Restructuring / Reduction in Force (RIF) operations while minimizing risk and preserving culture?',
          a: 'I partner with legal to ensure non-discriminatory selection criteria, design fair severance packages, train managers on conducting compassionate notification meetings, provide outplacement support, and communicate transparently with remaining employees.',
          tips: ['Ensure legal compliance and empathetic execution', 'Focus on outplacement and remaining team morale']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a time you led an enterprise culture transformation that significantly improved employee retention.',
          a: 'Facing high turnover, I spearheaded a cultural overhaul—introducing transparent compensation bands, flexible hybrid work policies, and leadership coaching—which raised eNPS by 35 points and reduced turnover by 22%.',
          tips: ['Show executive leadership in cultural change', 'Quantify eNPS and turnover improvements']
        },
        {
          q: 'Describe a situation where you had to advise the CEO against a risky HR decision.',
          a: 'When leadership proposed an abrupt across-the-board benefit cut, I presented benchmark data showing the risk of losing top engineering talent, proposing targeted cost optimizations instead that achieved cost savings while retaining benefits.',
          tips: ['Demonstrate executive courage backed by data', 'Offer constructive alternative solutions']
        }
      ],
      scenario: [
        {
          q: 'Scenario: A key department head is accused of executive misconduct by a senior team member. How do you lead the response?',
          a: 'I retain external independent legal counsel if necessary to conduct an un-biased investigation, place the department head on administrative leave, protect the reporting employee from retaliation, and present investigation findings to the board.',
          tips: ['Ensure impartial independent investigation', 'Protect reporter from retaliation and inform board']
        }
      ]
    }
  },
  sales: {
    'Entry Level': {
      beginner: [
        {
          q: 'What is the standard B2B sales funnel structure, and how do leads move through each stage?',
          a: 'Leads move from Prospecting (lead generation) to Qualification (MQL/SQL), Discovery, Solution Demo/Proposal, Negotiation, and Closed-Won (or Closed-Lost).',
          tips: ['Detail stages from lead to closed-won', 'Explain qualification criteria']
        },
        {
          q: 'What is the difference between inbound sales and outbound sales?',
          a: 'Inbound sales handles prospects who express interest directly (e.g. website forms or content downloads). Outbound sales involves actively reaching out to target prospects via cold calling, email, or LinkedIn.',
          tips: ['Contrast warm inbound vs proactive outbound', 'Mention different outreach tactics']
        },
        {
          q: 'What core metrics do sales professionals monitor to track monthly performance?',
          a: 'Key metrics include Activity Volume (calls/emails sent), Connect Rate, Qualified Opportunities Generated, Pipeline Value, Win Rate, and Quota Attainment.',
          tips: ['List activity and revenue metrics', 'Explain quota attainment percentage']
        }
      ],
      technical: [
        {
          q: 'How do you use sales qualification frameworks like BANT or MEDDPICC during discovery calls?',
          a: 'I evaluate BANT (Budget, Authority, Need, Timeline) or MEDDPICC to confirm the prospect has a real pain point, available budget, and decision-making authority before advancing them in the pipeline.',
          tips: ['Define BANT or MEDDPICC acronyms', 'Explain why qualifying early saves time']
        },
        {
          q: 'Walk me through your process for crafting personalized cold email sequences that get high response rates.',
          a: 'I research the prospect’s company and role, open with a relevant trigger event or observation, state a clear value proposition addressing a common pain point, and end with a low-friction call to action.',
          tips: ['Highlight personalized research hooks', 'Keep call-to-action low friction']
        },
        {
          q: 'How do you handle common prospect sales objections regarding price or timing?',
          a: 'I listen actively, validate their concern, reframe price in terms of Return on Investment (ROI) and value created, and share customer success stories to demonstrate proven outcomes.',
          tips: ['Use the Acknowledge-Validate-Reframe approach', 'Focus on ROI over cost']
        },
        {
          q: 'How do you leverage CRM tools like Salesforce or HubSpot to manage your pipeline accurately?',
          a: 'I update deal stages in real time, record meeting notes and next steps, maintain close date accuracy, and track pipeline metrics to ensure accurate monthly forecasting.',
          tips: ['Emphasize real-time CRM updates', 'Highlight deal stage hygiene and forecasting']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a time you missed your quarterly sales quota. How did you bounce back?',
          a: 'After missing quota by 15%, I analyzed my pipeline conversion rates, realized my top-of-funnel activity was insufficient, doubled my daily outreach activity, and exceeded quota by 20% the following quarter.',
          tips: ['Demonstrate self-analysis and accountability', 'Show grit and measurable recovery']
        },
        {
          q: 'Describe a deal where a prospect was on the fence. How did you successfully close it?',
          a: 'I arranged a customer reference call with a peer in their industry, demonstrating how our solution solved an identical problem, which built trust and secured their signature within a week.',
          tips: ['Highlight social proof and reference calls', 'Focus on building prospect trust']
        }
      ],
      scenario: [
        {
          q: 'Scenario: A prospect agrees to a demo but stops responding right before the scheduled meeting. How do you follow up?',
          a: 'I send a polite follow-up offering a brief pre-recorded overview video or flexible rescheduled times, highlighting a specific key insight relevant to their business to re-engage interest.',
          tips: ['Provide value in follow-up messaging', 'Offer low-friction rescheduling options']
        }
      ]
    },
    'Mid Level': {
      beginner: [
        {
          q: 'How do you manage complex multi-stakeholder enterprise sales cycles?',
          a: 'I map out the buying committee (economic buyer, technical evaluator, end-user champion), tailor value propositions to each stakeholder’s priorities, and build alignment across decision-makers.',
          tips: ['Map out buying committee roles', 'Tailor messaging to individual stakeholder needs']
        },
        {
          q: 'What is Solution Selling, and how does it differ from transactional selling?',
          a: 'Transactional selling focuses on product features and price. Solution Selling focuses on diagnosing deep business pain points, quantifying financial impact, and co-creating a tailored business solution.',
          tips: ['Contrast feature selling vs pain-point diagnosis', 'Focus on quantifying financial value']
        },
        {
          q: 'How do you calculate sales velocity and use it to optimize performance?',
          a: 'Sales Velocity is (Number of Deals × Average Deal Value × Win Rate) ÷ Sales Cycle Length. I increase velocity by shortening cycle times and improving win rates on qualified deals.',
          tips: ['State the Sales Velocity formula', 'Explain levers to increase velocity']
        }
      ],
      technical: [
        {
          q: 'How do you conduct deep-dive sales discovery sessions to uncover hidden business pain points?',
          a: 'I ask open-ended diagnostic questions about current operational bottlenecks, quantify the financial cost of inaction, and guide the prospect to articulate the business necessity of solving the problem.',
          tips: ['Ask open-ended diagnostic questions', 'Quantify cost of inaction']
        },
        {
          q: 'Walk me through how you build and deliver executive sales presentations to C-suite decision makers.',
          a: 'I skip generic feature slides, starting directly with their strategic business challenges, presenting clear ROI benchmarks, demonstrating solution impact, and concluding with a clear implementation roadmap.',
          tips: ['Lead with executive business outcomes', 'Focus on ROI and strategic impact']
        },
        {
          q: 'How do you negotiate complex enterprise software contracts without discounting price heavily?',
          a: 'I protect price integrity by trading value instead of giving unilateral discounts—offering multi-year terms or flexible payment schedules in exchange for maintaining contract price.',
          tips: ['Trade value for terms rather than discounting price', 'Maintain pricing integrity']
        },
        {
          q: 'How do you cultivate internal champions who actively sell on your behalf within target accounts?',
          a: 'I arm champions with internal business case decks, ROI calculators, and competitive comparison sheets, coaching them on how to address objections from their executive team.',
          tips: ['Provide champions with enablement materials', 'Coach champions to sell internally']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about your largest closed enterprise deal. Walk me through the sales cycle from cold lead to contract.',
          a: 'I closed a $250k ARR contract by identifying an operational bottleneck, securing an executive champion, navigating legal and security reviews over 6 months, and delivering a custom ROI proposal.',
          tips: ['Detail deal size, cycle length, and milestones', 'Highlight stakeholder navigation']
        },
        {
          q: 'Describe a situation where a major deal stalled late in the sales cycle. How did you reactivate it?',
          a: 'When a deal stalled in procurement, I re-engaged the economic buyer with updated quarterly business case data, showing the cost of delaying launch by another quarter, which unblocked contract signing.',
          tips: ['Re-engage economic buyers with urgency', 'Quantify cost of delay']
        }
      ],
      scenario: [
        {
          q: 'Scenario: Procurement demands a 25% price reduction on the final contract day before fiscal quarter end. What do you do?',
          a: 'I review the proposal with the economic buyer, reiterating value delivered, and offer minor scope adjustments or extended contract terms instead of an unearned price cut.',
          tips: ['Involve the economic buyer', 'Trade contract scope/terms for pricing stability']
        }
      ]
    },
    'Senior Level': {
      beginner: [
        {
          q: 'How do you design enterprise Go-To-Market (GTM) sales strategies and territory alignment plans?',
          a: 'I analyze total addressable market (TAM), segment accounts by vertical and revenue potential, establish territory allocations, and design sales compensation plans that drive strategic product growth.',
          tips: ['Discuss TAM analysis and territory design', 'Align sales compensation incentives with strategy']
        },
        {
          q: 'How do you build accurate quarterly sales revenue forecasting models for executive leadership?',
          a: 'I combine deal-stage probability weighting, historical rep conversion benchmarks, MEDDPICC qualification scores, and pipeline coverage ratios (target 3x+) to deliver reliable forecasts.',
          tips: ['Reference pipeline coverage ratios (3x+)', 'Combine rep benchmarks with qualification scoring']
        },
        {
          q: 'What methodologies do you use to scale sales team quota attainment across an entire sales department?',
          a: 'I introduce standardized sales playbooks, conduct weekly deal desk reviews, implement continuous pitch coaching, and pair underperforming reps with top-tier account executives.',
          tips: ['Detail sales enablement playbooks', 'Focus on deal desk reviews and continuous coaching']
        }
      ],
      technical: [
        {
          q: 'How do you structure Deal Desk operations and complex contract pricing governance for global sales teams?',
          a: 'I establish clear discount authorization tiers, standardize custom SLA and legal redline workflows, and streamline deal desk approvals to maximize margin while accelerating deal velocity.',
          tips: ['Define discount authorization thresholds', 'Optimize contract approval workflows']
        },
        {
          q: 'How do you lead multi-product cross-sell and expansion strategies across enterprise key accounts?',
          a: 'I institute structured Executive Sponsor programs, conduct quarterly business reviews (QBRs) showcasing ROI delivered, and identify adjacent department expansion opportunities.',
          tips: ['Mention Quarterly Business Reviews (QBRs)', 'Detail executive sponsorship and expansion playbooks']
        },
        {
          q: 'Describe your approach to recruiting, onboarding, and retaining top-performing Account Executives.',
          a: 'I hire for coachability and curiosity through roleplay evaluations, build a 30/60/90-day onboarding program that reduces time-to-first-deal, and maintain transparent career progression paths.',
          tips: ['Focus on hiring for coachability', 'Highlight 30/60/90-day onboarding execution']
        },
        {
          q: 'How do you manage strategic sales channel partnerships and co-selling ecosystems?',
          a: 'I establish joint partner value propositions, align co-selling incentives for field reps, build partner enablement programs, and track partner-sourced revenue contributions.',
          tips: ['Align joint partner incentives', 'Track partner-sourced vs partner-influenced pipeline']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a time you turned around an underperforming sales team or region.',
          a: 'Taking over a team achieving only 60% of quota, I restructured territory assignments, introduced rigorous discovery training, enforced pipeline hygiene, and grew annual quota attainment to 110%.',
          tips: ['Show executive sales turnaround leadership', 'Quantify quota attainment improvement']
        },
        {
          q: 'Describe a situation where sales strategy conflicted with product roadmap plans. How did you align leadership?',
          a: 'I presented customer feedback and lost deal analysis showing $2M in missed pipeline due to missing enterprise security features, persuading product leadership to prioritize those capabilities.',
          tips: ['Use lost deal analysis data to influence product', 'Align product features with revenue opportunities']
        }
      ],
      scenario: [
        {
          q: 'Scenario: A top competitor launches a product with a 40% lower price point. How do you protect market share?',
          a: 'I equip the sales force with competitive battlecards highlighting total cost of ownership (TCO), superior product capabilities, and customer ROI metrics, shifting focus away from price.',
          tips: ['Create competitive battlecards focusing on TCO and ROI', 'Train reps to defend value against low-cost competitors']
        }
      ]
    }
  },
  manager: {
    'Entry Level': {
      beginner: [
        {
          q: 'What are the primary responsibilities of a Project Manager in delivering successful projects?',
          a: 'A Project Manager defines project scope, creates structured timelines, manages resource allocation, facilitates team communication, monitors risks, and ensures deliverables meet quality standards on time and within budget.',
          tips: ['Cover scope, time, cost, quality, and risk', 'Highlight clear team communication']
        },
        {
          q: 'What is the main difference between Agile and Waterfall project management methodologies?',
          a: 'Waterfall follows a sequential phase-by-phase plan best suited for fixed-scope projects. Agile works in iterative sprints, allowing continuous feedback, rapid adaptation, and incremental feature delivery.',
          tips: ['Contrast sequential phases vs iterative sprints', 'Explain when to use each methodology']
        },
        {
          q: 'What tools do you use to track project tasks, dependencies, and team milestones?',
          a: 'I use project management tools (such as Jira, Asana, Trello, or MS Project) to set up Kanban boards or Gantt charts, assign task ownership, track dependencies, and monitor milestone progress.',
          tips: ['Mention specific tools (Jira, Asana, Gantt charts)', 'Highlight dependency tracking']
        }
      ],
      technical: [
        {
          q: 'How do you create a Work Breakdown Structure (WBS) and establish project timelines?',
          a: 'I decompose project deliverables into smaller manageable work packages, estimate task durations with team leads, identify critical dependencies, and build a baseline schedule with clear milestones.',
          tips: ['Explain WBS task decomposition', 'Highlight critical path identification']
        },
        {
          q: 'How do you manage project scope creep when stakeholders request additional features mid-project?',
          a: 'I evaluate the requested change against baseline scope, quantify its impact on budget and schedule, present trade-offs to project sponsors, and update the scope document only upon approval.',
          tips: ['Use formal change control procedures', 'Quantify trade-offs on timeline and budget']
        },
        {
          q: 'How do you run effective daily standup meetings and retrospective meetings for team alignment?',
          a: 'I keep daily standups focused under 15 minutes (covering yesterday’s progress, today’s plan, and blockers). In retrospectives, I guide the team to identify continuous improvements.',
          tips: ['Keep standups brief and focused on blockers', 'Use retrospectives for continuous improvement']
        },
        {
          q: 'What metrics do you monitor to measure project performance and team velocity?',
          a: 'I track velocity charts, burndown charts, sprint completion rates, task cycle times, and budget burn rates to verify project health.',
          tips: ['Mention burndown charts and velocity metrics', 'Monitor budget burn rate']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a time a project team member was missing deadlines. How did you handle it?',
          a: 'I held a private check-in to understand underlying bottlenecks, discovered they were overburdened with conflicting tasks, helped reallocate non-essential work, and set up daily check-ins to restore progress.',
          tips: ['Show empathetic problem-solving', 'Focus on removing blockers and restoring progress']
        },
        {
          q: 'Describe a project where you had to manage conflicting feedback from two stakeholders.',
          a: 'I organized a joint alignment meeting, presented project constraints and objectives clearly, guided them to agree on shared business priorities, and documented agreed scope updates.',
          tips: ['Demonstrate objective stakeholder facilitation', 'Align decisions with project goals']
        }
      ],
      scenario: [
        {
          q: 'Scenario: A critical project dependency is delayed by two weeks right before a milestone. How do you respond?',
          a: 'I assess critical path impact immediately, explore fast-tracking or crashing options (reallocating resources to parallel tasks), update stakeholders transparently, and adjust schedule baselines.',
          tips: ['Assess critical path impact', 'Explore fast-tracking/crashing scheduling techniques']
        }
      ]
    },
    'Mid Level': {
      beginner: [
        {
          q: 'How do you perform comprehensive project risk management (identification, assessment, mitigation)?',
          a: 'I maintain a Risk Register, assessing risks by probability and impact. I assign risk owners and establish proactive mitigation strategies and contingency plans for high-priority risks.',
          tips: ['Explain Risk Register assessment', 'Detail proactive mitigation vs reactive contingency plans']
        },
        {
          q: 'What is Earned Value Management (EVM), and how do Schedule Performance Index (SPI) and Cost Performance Index (CPI) work?',
          a: 'EVM measures project progress by comparing planned work against actual earned value. SPI (EV/PV) measures schedule efficiency; CPI (EV/AC) measures cost efficiency. Values below 1.0 indicate delays or budget overruns.',
          tips: ['State formulas for SPI and CPI', 'Explain what values above/below 1.0 signify']
        },
        {
          q: 'How do you manage cross-functional teams where team members do not report directly to you?',
          a: 'I build influence without direct authority by establishing clear project goals, fostering open communication, recognizing individual contributions, and aligning project outcomes with their department goals.',
          tips: ['Explain influence without authority', 'Align project milestones with team priorities']
        }
      ],
      technical: [
        {
          q: 'How do you manage resource capacity planning across multiple concurrent project initiatives?',
          a: 'I review resource availability matrices, balance workload allocations to avoid burnout, resolve resource contention through prioritization, and forecast future staffing needs.',
          tips: ['Mention resource capacity matrices', 'Balance workload equity across concurrent projects']
        },
        {
          q: 'Walk me through your process for conducting vendor management and third-party contractor delivery audits.',
          a: 'I define clear Statement of Work (SOW) deliverables, establish vendor milestone payment triggers, conduct regular quality audits, and manage vendor performance reviews.',
          tips: ['Detail Statement of Work (SOW) controls', 'Connect payment triggers to milestone acceptance']
        },
        {
          q: 'How do you adapt project governance frameworks when managing remote or distributed international teams?',
          a: 'I implement asynchronous documentation practices, establish core overlapping collaboration hours, standardize communication tools, and respect time zone differences.',
          tips: ['Emphasize asynchronous documentation', 'Establish core overlapping collaboration hours']
        },
        {
          q: 'How do you conduct post-project reviews and build organizational knowledge repositories?',
          a: 'I lead structured lessons-learned sessions with stakeholders, document success factors and operational mistakes, and update organizational process assets for future project reference.',
          tips: ['Document lessons learned systematically', 'Update organizational process assets']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a complex project that went off track. How did you turn it around?',
          a: 'Facing a 3-week delay due to scope creep, I paused non-essential deliverables, re-baselined critical path tasks with stakeholder approval, introduced daily standups, and delivered on the revised schedule.',
          tips: ['Take ownership of project recovery', 'Re-baseline critical path with stakeholder alignment']
        },
        {
          q: 'Describe a situation where executive leadership requested a tight launch date that you knew was unrealistic.',
          a: 'I presented data-backed capacity models illustrating timeline risks, offered options (reducing scope to an MVP for the target date vs delaying launch for full scope), allowing leadership to make an informed choice.',
          tips: ['Use data-backed timeline estimation models', 'Present trade-offs clearly (MVP vs full scope)']
        }
      ],
      scenario: [
        {
          q: 'Scenario: Mid-project, budget is unexpectedly cut by 20%. How do you adjust execution?',
          a: 'I conduct a cost-benefit review of all remaining deliverables, prioritize high-value core features, negotiate scope reductions with project sponsors, and optimize resource assignments.',
          tips: ['Prioritize core high-value features', 'Negotiate controlled scope reductions']
        }
      ]
    },
    'Senior Level': {
      beginner: [
        {
          q: 'How do you align Program and Portfolio Management with corporate strategic goals and financial targets?',
          a: 'I evaluate portfolio initiatives using strategic alignment, ROI, and risk metrics, allocating capital to high-impact programs, balancing innovation with operational maintenance, and optimizing portfolio ROI.',
          tips: ['Discuss portfolio prioritization models', 'Align project portfolio directly with strategic growth']
        },
        {
          q: 'How do you establish a Project Management Office (PMO) framework and governance standards from scratch?',
          a: 'I define standardized project lifecycle methodologies, implement PMO reporting dashboards, establish project health gating checks, and train project managers on uniform delivery standards.',
          tips: ['Detail PMO framework creation', 'Focus on standardized governance and stage gating']
        },
        {
          q: 'What strategies do you use for enterprise organizational change management (e.g. ADKAR model)?',
          a: 'I use structured change frameworks (like ADKAR: Awareness, Desire, Knowledge, Ability, Reinforcement) to build stakeholder buy-in, communicate benefits, deliver targeted training, and minimize operational friction.',
          tips: ['Reference ADKAR or Kotter change models', 'Focus on stakeholder buy-in and adoption']
        }
      ],
      technical: [
        {
          q: 'How do you manage multi-million dollar program budgets and optimize capital allocation across departments?',
          a: 'I oversee program financial modeling, monitor Earned Value metrics across projects, manage financial contingency reserves, and report portfolio performance to executive committees.',
          tips: ['Detail program financial modeling', 'Manage contingency reserves and executive reporting']
        },
        {
          q: 'Describe your methodology for conducting enterprise project portfolio health audits and recovering distressed programs.',
          a: 'I conduct independent health audits analyzing schedule performance, cost variance, quality defect trends, and team morale, implementing targeted recovery interventions for distressed initiatives.',
          tips: ['Outline systematic health audit criteria', 'Detail recovery plans for troubled programs']
        },
        {
          q: 'How do you mentor and develop project managers across a global PMO organization?',
          a: 'I build structured career progression frameworks, establish PMO peer coaching networks, conduct regular methodology training, and empower senior project managers to lead major programs.',
          tips: ['Highlight structured career tracks', 'Establish continuous PM learning programs']
        },
        {
          q: 'How do you navigate complex corporate politics and align divergent executive priorities across business units?',
          a: 'I build trusted relationships with executive leaders, map individual stakeholder motivations, facilitate data-driven consensus sessions, and anchor project decisions in overarching business goals.',
          tips: ['Demonstrate executive stakeholder diplomacy', 'Anchor decisions in business goals']
        }
      ],
      behavioral: [
        {
          q: 'Tell me about a major enterprise program failure under your watch. What happened and how did you lead the post-mortem?',
          a: 'When an enterprise software rollout experienced severe downtime due to legacy integration flaws, I led immediate incident response, conducted a blameless post-mortem, restructured testing protocols, and delivered a successful re-launch.',
          tips: ['Demonstrate executive accountability', 'Lead blameless post-mortems and systemic improvements']
        },
        {
          q: 'Describe how you managed a major strategic pivot for a multi-year enterprise transformation program.',
          a: 'When market conditions shifted, I led a portfolio review that reallocated resources from low-ROI legacy projects to high-priority digital initiatives, maintaining team morale through clear communication.',
          tips: ['Show strategic agility in portfolio management', 'Maintain team momentum through transparent leadership']
        }
      ],
      scenario: [
        {
          q: 'Scenario: Two executive VPs publicly conflict over resource allocation between their competing strategic projects. How do you resolve it?',
          a: 'I evaluate both projects against company OKRs and ROI criteria, present objective portfolio models to the executive steering committee, and facilitate a data-driven resource allocation decision.',
          tips: ['Use objective data against company OKRs', 'Facilitate executive steering committee resolution']
        }
      ]
    }
  }
};

// Generic dynamic question generator for custom roles
function generateGenericQuestions(
  role: string,
  experienceLevel: ExperienceLevel
): {
  beginner: Array<{ q: string; a: string; tips: string[] }>;
  technical: Array<{ q: string; a: string; tips: string[] }>;
  behavioral: Array<{ q: string; a: string; tips: string[] }>;
  scenario: Array<{ q: string; a: string; tips: string[] }>;
} {
  const cleanRole = role.trim();

  return {
    beginner: [
      {
        q: `What core principles and industry best practices guide your work as a ${experienceLevel} ${cleanRole}?`,
        a: `As a ${experienceLevel} ${cleanRole}, I prioritize accuracy, clear communication, structured problem solving, continuous industry learning, and aligning daily execution directly with organizational goals.`,
        tips: ['Focus on foundational domain principles', 'Mention professional standards and alignment']
      },
      {
        q: `How do you stay updated with emerging tools, methodologies, and trends in the ${cleanRole} field?`,
        a: `I regularly review leading industry publications, participate in professional communities, evaluate new operational tools, and benchmark best practices to bring continuous improvement to my team.`,
        tips: ['Provide concrete learning sources', 'Highlight continuous professional growth']
      },
      {
        q: `What key metrics or outcomes do you use to measure success in a ${cleanRole} position?`,
        a: `I track both quantitative metrics (such as task completion speed, error reduction rates, and quality benchmarks) and qualitative metrics (stakeholder satisfaction, team collaboration, and process efficiency).`,
        tips: ['Balance quantitative and qualitative metrics', 'Connect metrics to business value']
      }
    ],
    technical: [
      {
        q: `Walk me through your end-to-end workflow when starting a complex project or task as a ${cleanRole}.`,
        a: `I begin by gathering detailed requirements, analyzing operational constraints, mapping a structured project plan, and executing with iterative feedback checkpoints to ensure high quality.`,
        tips: ['Detail a structured step-by-step methodology', 'Emphasize validation and requirement gathering']
      },
      {
        q: `What specialized software, equipment, or operational tools do you rely on to excel as a ${cleanRole}?`,
        a: `I leverage industry-standard software tools and frameworks suited for ${cleanRole} tasks, selecting technologies based on reliability, efficiency, collaboration features, and accuracy.`,
        tips: ['Mention specific tools relevant to the job title', 'Discuss evaluation criteria for tooling selection']
      },
      {
        q: `How do you identify, troubleshoot, and resolve unexpected operational bottlenecks in your work as a ${cleanRole}?`,
        a: `I perform a root cause analysis to locate the bottleneck, evaluate potential workarounds, consult with impacted stakeholders, and implement standardized process improvements to prevent recurrence.`,
        tips: ['Advocate for sustainable quality controls', 'Mention systematic problem solving and root cause analysis']
      },
      {
        q: `How do you maintain high quality and precision when managing multiple tight deadlines as a ${cleanRole}?`,
        a: `I use structured task prioritization frameworks, break deliverables into clear milestones, double-check outputs against quality standards, and communicate progress transparently with stakeholders.`,
        tips: ['Describe prioritization techniques', 'Highlight quality control under pressure']
      }
    ],
    behavioral: [
      {
        q: `Tell me about a challenging project where you had to collaborate across different teams as a ${cleanRole}.`,
        a: `I led cross-functional coordination by establishing clear documentation, holding brief status updates, actively listening to team concerns, and keeping focus on shared deliverables.`,
        tips: ['Use the STAR method (Situation, Task, Action, Result)', 'Highlight empathy and clear communication']
      },
      {
        q: `Describe a situation where a project requirement or priority changed unexpectedly. How did you adapt?`,
        a: `I assessed the impact on scope and timeline, communicated trade-offs transparently with stakeholders, reprioritized core tasks, and adjusted execution without sacrificing quality.`,
        tips: ['Show adaptability under pressure', 'Highlight stakeholder communication']
      }
    ],
    scenario: [
      {
        q: `Scenario: You are assigned a critical ${cleanRole} task with incomplete guidelines and a tight deadline. How do you proceed?`,
        a: `I immediately identify core assumptions, build a rapid initial draft or prototype, review key deliverables with stakeholders to validate direction, and iterate quickly to meet the deadline.`,
        tips: ['Emphasize rapid prototyping and feedback', 'Show proactive initiative under ambiguity']
      }
    ]
  };
}

/**
 * Main generator function guaranteeing exactly 10 questions:
 * - 3 General questions (IDs 1-3)
 * - 4 Role-Specific or Technical questions (IDs 4-7)
 * - 2 Behavioral questions (IDs 8-9)
 * - 1 Scenario-Based question (ID 10)
 */
export function generateTenRoleQuestions(
  role: string,
  experienceLevel: ExperienceLevel = 'Mid Level'
): QuestionGenerationResult {
  let rawRole = role.trim();
  if (!rawRole || /university|college|school|institute|river forest|degree|bachelor|master|phd/i.test(rawRole)) {
    rawRole = 'Software Engineer';
  }
  const cleanRole = rawRole;
  const roleLower = cleanRole.toLowerCase();

  // Match role to bank key
  let bankKey = '';
  if (roleLower.includes('nurse') || roleLower.includes('nursing') || roleLower.includes('healthcare') || roleLower.includes('medical') || roleLower.includes('doctor') || roleLower.includes('clinical') || roleLower.includes('patient') || roleLower.includes('caregiver')) {
    bankKey = 'nurse';
  } else if (roleLower.includes('accountant') || roleLower.includes('accounting') || roleLower.includes('finance') || roleLower.includes('financial') || roleLower.includes('auditor') || roleLower.includes('bookkeeper') || roleLower.includes('payroll')) {
    bankKey = 'accountant';
  } else if (roleLower.includes('marketing') || roleLower.includes('seo') || roleLower.includes('growth') || roleLower.includes('content') || roleLower.includes('social media') || roleLower.includes('copywriter')) {
    bankKey = 'marketing';
  } else if (roleLower.includes('hr') || roleLower.includes('human resource') || roleLower.includes('recruiter') || roleLower.includes('talent') || roleLower.includes('people ops')) {
    bankKey = 'hr';
  } else if (roleLower.includes('sales') || roleLower.includes('account executive') || roleLower.includes('business development') || roleLower.includes('sdr') || roleLower.includes('bdr')) {
    bankKey = 'sales';
  } else if (roleLower.includes('manager') || roleLower.includes('project manager') || roleLower.includes('product manager') || roleLower.includes('scrum master') || roleLower.includes('operations manager') || roleLower.includes('team lead')) {
    bankKey = 'manager';
  } else if (roleLower.includes('ai') || roleLower.includes('machine learning') || roleLower.includes('llm') || roleLower.includes('data scientist') || roleLower.includes('deep learning') || roleLower.includes('prompt')) {
    bankKey = 'ai';
  } else if (roleLower.includes('analyst') || roleLower.includes('business analyst') || roleLower.includes('data analyst') || roleLower.includes('bi')) {
    bankKey = 'analyst';
  } else if (roleLower.includes('developer') || roleLower.includes('software') || roleLower.includes('programmer') || roleLower.includes('coder') || roleLower.includes('web') || roleLower.includes('frontend') || roleLower.includes('backend') || roleLower.includes('fullstack') || roleLower.includes('devops') || roleLower.includes('cloud engineer') || roleLower.includes('software engineer')) {
    bankKey = 'software';
  }

  const roleBank = bankKey ? ROLE_QUESTION_BANK[bankKey]?.[experienceLevel] : undefined;
  const qBank = roleBank || generateGenericQuestions(cleanRole, experienceLevel);

  const questions: InterviewQuestion[] = [];

  // 1-3: General / Fundamental (3 questions)
  qBank.beginner.slice(0, 3).forEach((item, idx) => {
    questions.push({
      id: idx + 1,
      question: item.q,
      category: 'Beginner / Fundamental',
      typeBadge: 'Beginner',
      sampleAnswer: item.a,
      keyTakeaways: item.tips
    });
  });

  // 4-7: Role-Specific / Technical (4 questions)
  // Ensure we have 4 technical items
  const techItems = [...qBank.technical];
  while (techItems.length < 4) {
    techItems.push({
      q: `What specific methodologies, software, or tools do you rely on to excel as a ${cleanRole}?`,
      a: `I leverage industry-standard frameworks and software tools suited for ${cleanRole} tasks, continuously refining my workflow to maximize throughput and quality.`,
      tips: ['Specify tools relevant to the job title', 'Highlight efficiency and best practices']
    });
  }

  techItems.slice(0, 4).forEach((item, idx) => {
    questions.push({
      id: idx + 4,
      question: item.q,
      category: 'Technical / Role-Specific',
      typeBadge: 'Technical',
      sampleAnswer: item.a,
      keyTakeaways: item.tips
    });
  });

  // 8-9: Behavioral (2 questions)
  qBank.behavioral.slice(0, 2).forEach((item, idx) => {
    questions.push({
      id: idx + 8,
      question: item.q,
      category: 'Behavioral',
      typeBadge: 'Behavioral',
      sampleAnswer: item.a,
      keyTakeaways: item.tips
    });
  });

  // 10: Scenario-Based (1 question)
  const scenarioItem = qBank.scenario[0] || {
    q: `Scenario: You face a high-pressure deadline as a ${cleanRole} with unexpected scope changes. How do you respond?`,
    a: `I immediately assess the critical path, communicate trade-offs with stakeholders, reprioritize core deliverables, and execute with focus.`,
    tips: ['Focus on rapid prioritization', 'Highlight clear communication under pressure']
  };

  questions.push({
    id: 10,
    question: scenarioItem.q,
    category: 'Scenario-Based',
    typeBadge: 'Scenario',
    sampleAnswer: scenarioItem.a,
    keyTakeaways: scenarioItem.tips
  });

  return {
    role: cleanRole,
    experienceLevel,
    questions
  };
}
