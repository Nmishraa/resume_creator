import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Tab,
  HeadingLevel,
  BorderStyle,
  AlignmentType,
  LevelFormat
} from 'docx';
import { ResumeData, PersonalInfo } from '../types/resume';

/**
 * Clean hex color string for docx (removes leading # if present)
 */
function parseHexColor(hexColor?: string): string {
  if (!hexColor) return '0284C7';
  const clean = hexColor.replace('#', '').trim();
  return clean.length === 6 ? clean : '0284C7';
}

/**
 * Generate and download an editable Microsoft Word (.docx) file from ResumeData
 */
export async function exportResumeToDocx(resume: ResumeData): Promise<void> {
  const safeResume = resume || ({} as ResumeData);
  const accentHex = parseHexColor(safeResume.formatting?.accentColor);
  const pInfo: PersonalInfo = safeResume.personalInfo || {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: ''
  };

  const children: Paragraph[] = [];

  // ── 1. HEADER SECTION (Name, Title, Contact Info) ──────────────────────────
  if (pInfo.fullName && pInfo.fullName.trim()) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: pInfo.fullName.trim(),
            bold: true,
            size: 40, // 20pt
            color: '0F172A',
            font: 'Calibri'
          })
        ]
      })
    );
  }

  if (pInfo.jobTitle && pInfo.jobTitle.trim()) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 160 },
        children: [
          new TextRun({
            text: pInfo.jobTitle.trim(),
            bold: true,
            size: 24, // 12pt
            color: accentHex,
            font: 'Calibri'
          })
        ]
      })
    );
  }

  // Contact line items
  const contactParts: string[] = [];
  if (pInfo.email) contactParts.push(pInfo.email.trim());
  if (pInfo.phone) contactParts.push(pInfo.phone.trim());
  if (pInfo.location) contactParts.push(pInfo.location.trim());
  if (pInfo.website) contactParts.push(pInfo.website.trim());
  if (pInfo.linkedin) contactParts.push(pInfo.linkedin.trim());
  if (pInfo.github) contactParts.push(pInfo.github.trim());

  if (contactParts.length > 0) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 280 },
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 8, color: 'CBD5E1', space: 6 }
        },
        children: [
          new TextRun({
            text: contactParts.join('  •  '),
            size: 19, // 9.5pt
            color: '475569',
            font: 'Calibri'
          })
        ]
      })
    );
  }

  // Helper for Section Heading
  const createSectionHeader = (title: string): Paragraph => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 6, color: accentHex, space: 4 }
      },
      children: [
        new TextRun({
          text: title.toUpperCase(),
          bold: true,
          size: 24, // 12pt
          color: accentHex,
          font: 'Calibri'
        })
      ]
    });
  };

  // Section Builders
  const buildSummarySection = () => {
    if (!safeResume.summary || !safeResume.summary.trim()) return;
    children.push(createSectionHeader('Professional Summary'));
    children.push(
      new Paragraph({
        spacing: { after: 180 },
        children: [
          new TextRun({
            text: safeResume.summary.trim(),
            size: 21, // 10.5pt
            color: '334155',
            font: 'Calibri'
          })
        ]
      })
    );
  };

  const buildExperienceSection = () => {
    if (!safeResume.experience || safeResume.experience.length === 0) return;
    const validItems = safeResume.experience.filter(
      (e) => (e.role && e.role.trim()) || (e.company && e.company.trim())
    );
    if (validItems.length === 0) return;

    children.push(createSectionHeader('Work Experience'));

    validItems.forEach((exp) => {
      const dates = exp.current
        ? `${exp.startDate || ''} – Present`
        : `${exp.startDate || ''}${exp.endDate ? ` – ${exp.endDate}` : ''}`;

      const rightMetaParts = [exp.location, dates].filter(Boolean).join(' | ');

      children.push(
        new Paragraph({
          spacing: { before: 120, after: 40 },
          tabStops: [{ type: 'right', position: 9360 }], // 6.5 inches right aligned tab
          children: [
            new TextRun({
              text: exp.role || 'Role',
              bold: true,
              size: 22, // 11pt
              color: '0F172A',
              font: 'Calibri'
            }),
            new TextRun({
              text: exp.company ? `  •  ${exp.company}` : '',
              bold: true,
              size: 22,
              color: '334155',
              font: 'Calibri'
            }),
            ...(rightMetaParts
              ? [
                  new Tab(),
                  new TextRun({
                    text: rightMetaParts,
                    italics: true,
                    size: 20,
                    color: '64748B',
                    font: 'Calibri'
                  })
                ]
              : [])
          ]
        })
      );

      if (exp.highlights && exp.highlights.length > 0) {
        exp.highlights.forEach((h) => {
          if (!h || !h.trim()) return;
          children.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { after: 40 },
              children: [
                new TextRun({
                  text: h.trim(),
                  size: 20, // 10pt
                  color: '334155',
                  font: 'Calibri'
                })
              ]
            })
          );
        });
      }
    });
  };

  const buildEducationSection = () => {
    if (!safeResume.education || safeResume.education.length === 0) return;
    const validItems = safeResume.education.filter(
      (e) => (e.degree && e.degree.trim()) || (e.institution && e.institution.trim())
    );
    if (validItems.length === 0) return;

    children.push(createSectionHeader('Education'));

    validItems.forEach((edu) => {
      const dates = `${edu.startDate || ''}${edu.endDate ? ` – ${edu.endDate}` : ''}`;
      const rightMetaParts = [edu.location, dates].filter(Boolean).join(' | ');

      children.push(
        new Paragraph({
          spacing: { before: 100, after: 40 },
          tabStops: [{ type: 'right', position: 9360 }],
          children: [
            new TextRun({
              text: edu.degree || 'Degree',
              bold: true,
              size: 22,
              color: '0F172A',
              font: 'Calibri'
            }),
            new TextRun({
              text: edu.institution ? `  •  ${edu.institution}` : '',
              size: 21,
              color: '334155',
              font: 'Calibri'
            }),
            ...(rightMetaParts
              ? [
                  new Tab(),
                  new TextRun({
                    text: rightMetaParts,
                    italics: true,
                    size: 20,
                    color: '64748B',
                    font: 'Calibri'
                  })
                ]
              : [])
          ]
        })
      );

      if (edu.gpa) {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: `GPA: ${edu.gpa}`,
                size: 20,
                color: '475569',
                font: 'Calibri'
              })
            ]
          })
        );
      }

      if (edu.highlights && edu.highlights.length > 0) {
        edu.highlights.forEach((h) => {
          if (!h || !h.trim()) return;
          children.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { after: 40 },
              children: [
                new TextRun({
                  text: h.trim(),
                  size: 20,
                  color: '334155',
                  font: 'Calibri'
                })
              ]
            })
          );
        });
      }
    });
  };

  const buildSkillsSection = () => {
    if (!safeResume.skills || safeResume.skills.length === 0) return;
    const validCategories = safeResume.skills.filter(
      (s) => s.items && s.items.length > 0
    );
    if (validCategories.length === 0) return;

    children.push(createSectionHeader('Core Skills'));

    validCategories.forEach((sc) => {
      const categoryLabel = sc.category ? `${sc.category}: ` : '';
      const skillText = sc.items.join(', ');

      children.push(
        new Paragraph({
          spacing: { after: 60 },
          children: [
            ...(categoryLabel
              ? [
                  new TextRun({
                    text: categoryLabel,
                    bold: true,
                    size: 21,
                    color: '0F172A',
                    font: 'Calibri'
                  })
                ]
              : []),
            new TextRun({
              text: skillText,
              size: 21,
              color: '334155',
              font: 'Calibri'
            })
          ]
        })
      );
    });
  };

  const buildProjectsSection = () => {
    if (!safeResume.projects || safeResume.projects.length === 0) return;
    const validItems = safeResume.projects.filter((p) => p.title && p.title.trim());
    if (validItems.length === 0) return;

    children.push(createSectionHeader('Projects'));

    validItems.forEach((proj) => {
      const dates = `${proj.startDate || ''}${proj.endDate ? ` – ${proj.endDate}` : ''}`;

      children.push(
        new Paragraph({
          spacing: { before: 100, after: 40 },
          tabStops: [{ type: 'right', position: 9360 }],
          children: [
            new TextRun({
              text: proj.title,
              bold: true,
              size: 22,
              color: '0F172A',
              font: 'Calibri'
            }),
            ...(proj.subtitle
              ? [
                  new TextRun({
                    text: `  •  ${proj.subtitle}`,
                    size: 21,
                    color: '475569',
                    font: 'Calibri'
                  })
                ]
              : []),
            ...(dates
              ? [
                  new Tab(),
                  new TextRun({
                    text: dates,
                    italics: true,
                    size: 20,
                    color: '64748B',
                    font: 'Calibri'
                  })
                ]
              : [])
          ]
        })
      );

      if (proj.link) {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: proj.link,
                size: 19,
                color: accentHex,
                font: 'Calibri'
              })
            ]
          })
        );
      }

      if (proj.highlights && proj.highlights.length > 0) {
        proj.highlights.forEach((h) => {
          if (!h || !h.trim()) return;
          children.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { after: 40 },
              children: [
                new TextRun({
                  text: h.trim(),
                  size: 20,
                  color: '334155',
                  font: 'Calibri'
                })
              ]
            })
          );
        });
      }
    });
  };

  const buildCertificationsSection = () => {
    if (!safeResume.certifications || safeResume.certifications.length === 0) return;
    const validItems = safeResume.certifications.filter((c) => c.name && c.name.trim());
    if (validItems.length === 0) return;

    children.push(createSectionHeader('Certifications'));

    validItems.forEach((cert) => {
      children.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          tabStops: [{ type: 'right', position: 9360 }],
          children: [
            new TextRun({
              text: cert.name,
              bold: true,
              size: 21,
              color: '0F172A',
              font: 'Calibri'
            }),
            ...(cert.issuer
              ? [
                  new TextRun({
                    text: `  •  ${cert.issuer}`,
                    size: 21,
                    color: '475569',
                    font: 'Calibri'
                  })
                ]
              : []),
            ...(cert.date
              ? [
                  new Tab(),
                  new TextRun({
                    text: cert.date,
                    italics: true,
                    size: 20,
                    color: '64748B',
                    font: 'Calibri'
                  })
                ]
              : [])
          ]
        })
      );
    });
  };

  const buildCustomSections = () => {
    if (!safeResume.customSections || safeResume.customSections.length === 0) return;

    safeResume.customSections.forEach((cs) => {
      if (!cs.items || cs.items.length === 0) return;
      const validItems = cs.items.filter((item) => item.title && item.title.trim());
      if (validItems.length === 0) return;

      children.push(createSectionHeader(cs.title || 'Additional Information'));

      validItems.forEach((item) => {
        children.push(
          new Paragraph({
            spacing: { before: 80, after: 40 },
            tabStops: [{ type: 'right', position: 9360 }],
            children: [
              new TextRun({
                text: item.title,
                bold: true,
                size: 21,
                color: '0F172A',
                font: 'Calibri'
              }),
              ...(item.subtitle
                ? [
                    new TextRun({
                      text: `  •  ${item.subtitle}`,
                      size: 21,
                      color: '475569',
                      font: 'Calibri'
                    })
                  ]
                : []),
              ...(item.date
                ? [
                    new Tab(),
                    new TextRun({
                      text: item.date,
                      italics: true,
                      size: 20,
                      color: '64748B',
                      font: 'Calibri'
                    })
                  ]
                : [])
            ]
          })
        );

        if (item.description) {
          children.push(
            new Paragraph({
              spacing: { after: 40 },
              children: [
                new TextRun({
                  text: item.description,
                  size: 20,
                  color: '334155',
                  font: 'Calibri'
                })
              ]
            })
          );
        }
      });
    });
  };

  // Section Order Mapping
  const sectionOrder = safeResume.formatting?.sectionOrder || [
    'summary',
    'experience',
    'skills',
    'projects',
    'education',
    'certifications',
    'customSections'
  ];

  const sectionBuilders: Record<string, () => void> = {
    summary: buildSummarySection,
    experience: buildExperienceSection,
    skills: buildSkillsSection,
    projects: buildProjectsSection,
    education: buildEducationSection,
    certifications: buildCertificationsSection,
    customSections: buildCustomSections
  };

  sectionOrder.forEach((secId) => {
    if (sectionBuilders[secId]) {
      sectionBuilders[secId]();
    }
  });

  // Create Document
  const doc = new Document({
    numbering: {
      config: [
        {
          reference: 'default-bullet-list',
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: '•',
              alignment: AlignmentType.LEFT,
              style: {
                paragraph: {
                  indent: { left: 360, hanging: 240 }
                }
              }
            }
          ]
        }
      ]
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1080,    // 0.75 in
              bottom: 1080, // 0.75 in
              left: 1080,   // 0.75 in
              right: 1080   // 0.75 in
            }
          }
        },
        children
      }
    ]
  });

  // Generate Blob and Download
  let blob: Blob;
  try {
    blob = await Packer.toBlob(doc);
  } catch (e) {
    const buffer = await Packer.toBuffer(doc);
    blob = new Blob([buffer as unknown as BlobPart], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });
  }

  // Filename logic: FirstName_LastName_Resume.docx
  const fullName = (pInfo.fullName || 'Resume').trim();
  const nameParts = fullName.split(/\s+/).filter(Boolean);
  let filename = 'Resume.docx';

  if (nameParts.length === 1) {
    filename = `${nameParts[0]}_Resume.docx`;
  } else if (nameParts.length > 1) {
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join('_');
    filename = `${firstName}_${lastName}_Resume.docx`;
  }

  // Trigger browser download safely without immediate URL revocation
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    if (document.body.contains(a)) {
      document.body.removeChild(a);
    }
    URL.revokeObjectURL(url);
  }, 2000);
}

