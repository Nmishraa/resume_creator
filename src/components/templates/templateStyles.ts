import { ResumeData } from '../../types/resume';

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
