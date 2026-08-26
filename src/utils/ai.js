export const suggestSummary = async (role) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!role) {
        resolve("Experienced professional with a proven track record of delivering high-quality results. Skilled in project management, team leadership, and strategic planning.");
      } else if (role.toLowerCase().includes('developer') || role.toLowerCase().includes('engineer')) {
        resolve(`Passionate ${role} with expertise in building scalable applications and solving complex technical problems. Proficient in modern web technologies and committed to writing clean, maintainable code.`);
      } else if (role.toLowerCase().includes('design')) {
        resolve(`Creative ${role} dedicated to crafting intuitive and visually stunning user experiences. Strong background in user-centered design principles and a keen eye for aesthetics.`);
      } else {
        resolve(`Results-driven ${role} with a strong ability to collaborate effectively across cross-functional teams to achieve strategic business objectives.`);
      }
    }, 800); // simulate network latency
  });
};

export const suggestBulletPoint = async (role, category) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const prefix = category ? `[${category}] ` : '';
      const roleText = role ? `for ${role}` : '';
      resolve(`${prefix}Optimized existing workflows ${roleText}, resulting in a 20% increase in efficiency and reduced operational overhead.`);
    }, 400);
  });
};

export const polishBulletPoint = async (bulletText, role = '') => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!bulletText || bulletText.trim().length < 4) {
        resolve("Spearheaded modern application development, resulting in a 35% improvement in processing speed and enhanced code quality.");
        return;
      }
      const cleaned = bulletText.replace(/^[•\s\-\*]+/, '').trim();
      const actionVerbs = ['Engineered', 'Spearheaded', 'Orchestrated', 'Architected', 'Pioneered', 'Optimized'];
      const verb = actionVerbs[Math.floor(Math.random() * actionVerbs.length)];
      resolve(`${verb} and scaled ${cleaned.toLowerCase()}, leveraging industry best practices to achieve a 28% reduction in latency and improved user satisfaction.`);
    }, 400);
  });
};

export const calculateLiveAtsScore = (resumeData) => {
  if (!resumeData) return { score: 40, feedback: [] };

  const hasName = Boolean(resumeData?.personal?.name);
  const hasEmail = Boolean(resumeData?.personal?.email);
  const hasPhone = Boolean(resumeData?.personal?.phone);
  const hasSummary = Boolean(resumeData?.personal?.summary && resumeData.personal.summary.length > 30);
  const expCount = resumeData?.experience?.length || 0;
  const skillsCount = resumeData?.skills?.length || 0;
  const eduCount = resumeData?.education?.length || 0;

  // Check metrics in bullet points
  const allBullets = (resumeData?.experience || []).map(e => e.description || '').join(' ');
  const hasMetrics = /\d+%|\$\d+|\d+\+|\d+x/i.test(allBullets);

  let score = 0;
  const feedback = [];

  if (hasName) score += 10; else feedback.push('Add your full name');
  if (hasEmail) score += 15; else feedback.push('Add a professional email address');
  if (hasPhone) score += 10; else feedback.push('Add contact phone number');
  if (hasSummary) score += 15; else feedback.push('Add an executive summary (at least 30 characters)');
  
  if (expCount > 0) score += 20; else feedback.push('Add at least 1 work experience entry');
  if (skillsCount >= 4) score += 15; else feedback.push(`Add more skills (${skillsCount}/4 added)`);
  if (eduCount > 0) score += 5; else feedback.push('Add education history');
  if (hasMetrics) score += 10; else feedback.push('Add quantifiable metrics (%, $, numbers) in work experience');

  return {
    score: Math.min(100, score),
    feedback: feedback.length > 0 ? feedback : ['Your resume structure is 100% ATS compliant!']
  };
};

