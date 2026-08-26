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
    }, 600);
  });
};
