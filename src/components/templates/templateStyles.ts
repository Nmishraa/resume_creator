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
 * Returns dynamic CSS Variables for Adaptive Density Mode.
 * Safe limits enforced:
 * - Body font size: 12px - 15px
 * - Line height: 1.3 - 1.55
 * - Section spacing: 12px - 24px
 * - Bullet spacing: 4px - 10px
 * - Page margins: 12mm - 18mm
 * - Column gaps: 20px - 32px
 */
export function getAdaptiveDensityStyles(mode: DensityMode = 'standard'): CSSProperties {
  switch (mode) {
    case 'spacious':
      return {
        '--resume-body-size': '14.5px',
        '--resume-line-height': '1.55',
        '--resume-section-gap': '24px',
        '--resume-item-gap': '14px',
        '--resume-bullet-gap': '9px',
        '--resume-page-padding': '18mm 16mm',
        '--resume-column-gap': '32px',
        '--resume-name-size': '28px',
        '--resume-section-title-size': '15px'
      } as CSSProperties;
    case 'compact':
      return {
        '--resume-body-size': '12px',
        '--resume-line-height': '1.32',
        '--resume-section-gap': '12px',
        '--resume-item-gap': '7px',
        '--resume-bullet-gap': '4px',
        '--resume-page-padding': '12mm 10mm',
        '--resume-column-gap': '20px',
        '--resume-name-size': '22px',
        '--resume-section-title-size': '13px'
      } as CSSProperties;
    case 'standard':
    default:
      return {
        '--resume-body-size': '13.2px',
        '--resume-line-height': '1.45',
        '--resume-section-gap': '18px',
        '--resume-item-gap': '10px',
        '--resume-bullet-gap': '6px',
        '--resume-page-padding': '15mm 13mm',
        '--resume-column-gap': '24px',
        '--resume-name-size': '25px',
        '--resume-section-title-size': '14px'
      } as CSSProperties;
  }
}

/**
 * Calculates adaptive density mode based on unconstrained content height vs A4 printable height.
 * - < 65% height: spacious mode
 * - 65% - 90% height: standard mode
 * - 90% - 100%+ height: compact mode
 */
export function calculateDensityModeFromHeight(contentHeightPx: number, printablePageHeightPx: number = 1010): {
  mode: DensityMode;
  fillPercentage: number;
  pageCount: number;
} {
  const safeHeight = Math.max(contentHeightPx, 100);
  const fillPercentage = Math.round((safeHeight / printablePageHeightPx) * 100);

  let mode: DensityMode = 'standard';
  if (fillPercentage < 65) {
    mode = 'spacious';
  } else if (fillPercentage <= 90) {
    mode = 'standard';
  } else {
    mode = 'compact';
  }

  const pageCount = Math.max(1, Math.ceil(safeHeight / printablePageHeightPx));

  return { mode, fillPercentage, pageCount };
}
