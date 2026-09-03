import React, { CSSProperties } from 'react';
import { ResumeData, DensityMode } from '../../types/resume';

export function getFontFamilyClass(fontFamily: ResumeData['formatting']['fontFamily']): string {
  switch (fontFamily) {
    case 'serif':
      return 'font-serif';
    case 'mono':
      return 'font-mono';
    case 'inter':
      return 'font-sans';
    case 'outfit':
    default:
      return 'font-sans';
  }
}

export function getFontSizeClass(fontSize: ResumeData['formatting']['fontSize']): {
  body: string;
  name: string;
  sectionTitle: string;
  itemTitle: string;
  meta: string;
} {
  switch (fontSize) {
    case 'sm':
      return {
        body: 'text-xs leading-normal',
        name: 'text-xl font-bold tracking-tight',
        sectionTitle: 'text-xs font-bold uppercase tracking-wider',
        itemTitle: 'text-xs font-semibold',
        meta: 'text-[11px] text-slate-500'
      };
    case 'lg':
      return {
        body: 'text-sm leading-relaxed',
        name: 'text-3xl font-extrabold tracking-tight',
        sectionTitle: 'text-base font-bold uppercase tracking-wider',
        itemTitle: 'text-sm font-semibold',
        meta: 'text-xs text-slate-500'
      };
    case 'base':
    default:
      return {
        body: 'text-[13px] leading-relaxed',
        name: 'text-2xl font-bold tracking-tight',
        sectionTitle: 'text-sm font-bold uppercase tracking-wider',
        itemTitle: 'text-[13px] font-semibold',
        meta: 'text-xs text-slate-500'
      };
  }
}

export function getSpacingClass(spacing: ResumeData['formatting']['spacing']): {
  sectionGap: string;
  itemGap: string;
  bulletGap: string;
} {
  switch (spacing) {
    case 'compact':
      return { sectionGap: 'space-y-3', itemGap: 'space-y-2', bulletGap: 'space-y-0.5' };
    case 'relaxed':
      return { sectionGap: 'space-y-6', itemGap: 'space-y-4', bulletGap: 'space-y-1.5' };
    case 'normal':
    default:
      return { sectionGap: 'space-y-4.5', itemGap: 'space-y-3', bulletGap: 'space-y-1' };
  }
}

/**
 * Splits professional summary text into bullet points for clean, modern ATS formatting.
 * Handles multiline text, bullet symbols (•, -, *), and multi-sentence paragraphs cleanly.
 */
export function getSummaryBullets(summary: string): string[] {
  if (!summary || !summary.trim()) return [];

  const text = summary.trim();

  // If text contains explicit newlines or bullet symbols
  if (text.includes('\n') || text.includes('•')) {
    const rawLines = text
      .split(/[•\n]+/)
      .map(line => line.replace(/^[\s•\-\*\d\.\)]+/, '').trim())
      .filter(Boolean);

    if (rawLines.length > 0) return rawLines;
  }

  // If text is a paragraph of multiple sentences, split by sentence endings
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 5);

  if (sentences.length > 1) {
    return sentences;
  }

  return [text];
}

/**
 * Returns dynamic CSS Variables for Adaptive Layout Density Modes.
 * Enforces strict safe bounds:
 * - Body text: max 15px
 * - Headings: max 21px
 * - Line height: max 1.6
 * - Section gaps: max 28px
 * - Page margins: between 12mm and 18mm
 */
export function getAdaptiveDensityStyles(mode: DensityMode = 'standard'): CSSProperties {
  switch (mode) {
    case 'spacious':
      return {
        '--resume-body-size': '15px',
        '--resume-line-height': '1.6',
        '--resume-section-gap': '28px',
        '--resume-item-gap': '16px',
        '--resume-bullet-gap': '10px',
        '--resume-page-padding': '18mm 16mm',
        '--resume-column-gap': '32px',
        '--resume-name-size': '30px',
        '--resume-section-title-size': '20px',
        '--resume-contact-gap': '10px'
      } as CSSProperties;
    case 'balanced':
      return {
        '--resume-body-size': '14px',
        '--resume-line-height': '1.5',
        '--resume-section-gap': '22px',
        '--resume-item-gap': '12px',
        '--resume-bullet-gap': '7px',
        '--resume-page-padding': '15mm 14mm',
        '--resume-column-gap': '26px',
        '--resume-name-size': '27px',
        '--resume-section-title-size': '17.5px',
        '--resume-contact-gap': '8px'
      } as CSSProperties;
    case 'compact':
      return {
        '--resume-body-size': '12px',
        '--resume-line-height': '1.3',
        '--resume-section-gap': '12px',
        '--resume-item-gap': '7px',
        '--resume-bullet-gap': '3.5px',
        '--resume-page-padding': '12mm 10mm',
        '--resume-column-gap': '20px',
        '--resume-name-size': '22px',
        '--resume-section-title-size': '13.5px',
        '--resume-contact-gap': '5px'
      } as CSSProperties;
    case 'standard':
    default:
      return {
        '--resume-body-size': '13px',
        '--resume-line-height': '1.4',
        '--resume-section-gap': '16px',
        '--resume-item-gap': '9px',
        '--resume-bullet-gap': '5px',
        '--resume-page-padding': '13mm 12mm',
        '--resume-column-gap': '22px',
        '--resume-name-size': '24px',
        '--resume-section-title-size': '15px',
        '--resume-contact-gap': '6px'
      } as CSSProperties;
  }
}

/**
 * Calculates adaptive density mode based on content height vs A4 printable height.
 * Rules:
 * - Below 60% page usage: Spacious mode (enlarge content to fill 85-95% of A4 page)
 * - 60% - 85% page usage: Balanced mode
 * - 85% - 100% page usage: Standard mode
 * - Over 100%: Compact mode (with multi-page break formatting)
 */
export function calculateDensityModeFromHeight(contentHeightPx: number, printablePageHeightPx: number = 1010): {
  mode: DensityMode;
  fillPercentage: number;
  pageCount: number;
} {
  const safeHeight = Math.max(contentHeightPx, 100);
  const fillPercentage = Math.round((safeHeight / printablePageHeightPx) * 100);

  let mode: DensityMode = 'standard';
  if (fillPercentage < 60) {
    mode = 'spacious';
  } else if (fillPercentage <= 85) {
    mode = 'balanced';
  } else if (fillPercentage <= 100) {
    mode = 'standard';
  } else {
    mode = 'compact';
  }

  const pageCount = Math.max(1, Math.ceil(safeHeight / printablePageHeightPx));

  return { mode, fillPercentage, pageCount };
}
