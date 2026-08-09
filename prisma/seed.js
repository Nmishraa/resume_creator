import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const DEFAULT_RESUME_1 = {
  personal: {
    name: 'Jordan Alexander',
    role: 'Senior Full Stack Engineer',
    email: 'jordan.a@example.com',
    phone: '+1 (555) 012-3456',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/jordanalexander',
    summary: 'Innovative Full Stack Engineer with 8+ years of experience in building scalable web applications. Expert in React, Node.js, and Cloud Infrastructure.'
  },
  experience: [
    {
      id: '1',
      company: 'TechFlow Solutions',
      role: 'Senior Software Engineer',
      location: 'Remote',
      startDate: '2021-03',
      endDate: 'Present',
      description: '• Architected and developed a real-time data visualization platform using React and D3.js.\n• Optimized database queries, resulting in a 40% reduction in page load times.'
    }
  ],
  education: [
    {
      id: 'e1',
      school: 'Stanford University',
      degree: 'B.S. in Computer Science',
      location: 'Stanford, CA',
      startDate: '2014-09',
      endDate: '2018-05',
      description: 'Specialization in Systems and Networks. GPA: 3.9/4.0'
    }
  ],
  skills: [
    { id: 's1', name: 'JavaScript (ES6+)', level: 'Expert' },
    { id: 's2', name: 'React & Next.js', level: 'Expert' },
    { id: 's3', name: 'Node.js & Express', level: 'Advanced' },
    { id: 's4', name: 'PostgreSQL & Prisma', level: 'Advanced' }
  ]
};

async function main() {
  console.log('Seeding database...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      password: hashedPassword,
      name: 'Demo User',
      isGuest: false
    }
  });

  const sampleResume = await prisma.resume.findFirst({
    where: { userId: demoUser.id }
  });

  if (!sampleResume) {
    await prisma.resume.create({
      data: {
        userId: demoUser.id,
        title: "Jordan Alexander's Resume",
        data: JSON.stringify(DEFAULT_RESUME_1)
      }
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
