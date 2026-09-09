/**
 * Helper to resolve the safe top-level block element to push to a new page.
 * Avoids setting inline marginTop on CSS Grid / Flex-row child items (which causes layout distortion and text overlap).
 */
function getValidPushTarget(el: HTMLElement): HTMLElement {
  // If element is a child inside a major entry block (e.g. an <li> bullet inside a job or project entry)
  const entryBlock = el.closest(
    '.education-entry, .experience-entry, .project-entry, .certification-entry, .summary-entry'
  ) as HTMLElement | null;

  let target: HTMLElement = entryBlock || el;

  // Check if target is inside a grid or flex-row container (like multi-column skill items or side-by-side cards)
  const parent = target.parentElement;
  if (parent) {
    const parentStyle = window.getComputedStyle(parent);
    const parentDisplay = parentStyle.display;
    const parentFlexDir = parentStyle.flexDirection;
    const isGridOrFlexRow = parentDisplay.includes('grid') || (parentDisplay.includes('flex') && !parentFlexDir.includes('column'));

    if (isGridOrFlexRow) {
      // Push the parent section container instead of an individual grid child cell
      const parentSection = target.closest('.resume-section') as HTMLElement | null;
      if (parentSection) {
        target = parentSection;
      }
    }
  }

  return target;
}

/**
 * Template-Aware Block Pagination Engine
 * Dynamically measures container paddings, font metrics, line heights, and element boundaries.
 * If an entry block, section title, or bullet item overflows the printable area of a page (1123px per A4 sheet),
 * it cleanly pushes the element (or parent entry block / section title if orphaned) to the top of the next page using top margins.
 * Eliminates text clipping, line splitting, orphaned headings, and split bullet points across all templates.
 */
export function applyBlockAwarePagination(containerEl: HTMLElement | null): number {
  if (!containerEl) return 1;

  const A4_PAGE_HEIGHT_PX = 1123;

  // Dynamically extract container padding metrics to respect template-specific margins & header heights
  const computedStyle = window.getComputedStyle(containerEl);
  const containerPaddingTop = parseFloat(computedStyle.paddingTop) || 56;
  const containerPaddingBottom = parseFloat(computedStyle.paddingBottom) || 60;

  const TOP_MARGIN_PADDING_PX = Math.max(containerPaddingTop, 48);
  const BOTTOM_MARGIN_LIMIT_PX = Math.max(containerPaddingBottom, 48);

  // 1. Reset any previously applied pagination margins/spacers
  const allManagedElements = Array.from(
    containerEl.querySelectorAll<HTMLElement>(
      '.resume-section, .resume-section-title, h2, [role="heading"], .education-entry, .experience-entry, .project-entry, .certification-entry, .skill-group, .summary-entry, .resume-entry, .page-break-avoid, .resume-section-item, li'
    )
  );

  allManagedElements.forEach(el => {
    el.style.marginTop = '';
  });

  // Force DOM layout recalculation
  void containerEl.offsetHeight;

  const containerRect = containerEl.getBoundingClientRect();
  const containerTop = containerRect.top;
  let maxPageFound = 1;

  // 2. Select manageable blocks across single-column and multi-column templates
  const blocks = Array.from(
    containerEl.querySelectorAll<HTMLElement>(
      '.resume-section-title, h2, .resume-section.page-break-avoid, .education-entry, .experience-entry, .project-entry, .certification-entry, .summary-entry, .resume-entry, .resume-section-item, li, .page-break-avoid'
    )
  ).filter((el, index, self) => {
    // Deduplicate
    if (self.indexOf(el) !== index) return false;

    // Skip resume-section unless marked as page-break-avoid
    if (el.classList.contains('resume-section') && !el.classList.contains('page-break-avoid')) {
      return false;
    }

    return true;
  });

  // 3. Iterate through elements and handle page breaks cleanly
  for (let i = 0; i < blocks.length; i++) {
    const el = blocks[i];
    const rect = el.getBoundingClientRect();
    const currentTop = rect.top - containerTop;
    const currentHeight = rect.height;

    if (currentHeight === 0) continue;

    // Current page index (0-indexed)
    const pageIndex = Math.floor(currentTop / A4_PAGE_HEIGHT_PX);
    const printableBottom = (pageIndex * A4_PAGE_HEIGHT_PX) + A4_PAGE_HEIGHT_PX - BOTTOM_MARGIN_LIMIT_PX;

    // If block extends past the printable area of the current page
    if (currentTop + currentHeight > printableBottom) {
      const nextPageContentTop = ((pageIndex + 1) * A4_PAGE_HEIGHT_PX) + TOP_MARGIN_PADDING_PX;

      // Determine the ideal element to push to avoid orphan headers or split bullet entries
      let targetToPush: HTMLElement = getValidPushTarget(el);

      // Check if targetToPush is the first entry in its section to prevent orphaned section titles
      const section = targetToPush.closest('.resume-section');
      const sectionTitle = section
        ? (section.querySelector('.resume-section-title, h2, [role="heading"]') as HTMLElement | null)
        : null;

      if (section && sectionTitle && section.contains(sectionTitle)) {
        const titleRect = sectionTitle.getBoundingClientRect();
        const titleTop = titleRect.top - containerTop;
        const titlePageIndex = Math.floor(titleTop / A4_PAGE_HEIGHT_PX);

        const sectionEntries = Array.from(
          section.querySelectorAll<HTMLElement>(
            '.education-entry, .experience-entry, .project-entry, .certification-entry, .summary-entry, .resume-entry, .resume-section-item, li'
          )
        );

        const targetTop = targetToPush.getBoundingClientRect().top - containerTop;

        const hasPriorContentOnTitlePage = sectionEntries.some(item => {
          if (item === targetToPush || targetToPush.contains(item) || sectionTitle.contains(item)) return false;
          const itemTop = item.getBoundingClientRect().top - containerTop;
          return Math.floor(itemTop / A4_PAGE_HEIGHT_PX) === titlePageIndex && itemTop < targetTop;
        });

        if (!hasPriorContentOnTitlePage && titleTop < nextPageContentTop) {
          targetToPush = sectionTitle;
        }
      }

      // Calculate required spacer for targetToPush
      const targetRect = targetToPush.getBoundingClientRect();
      const targetTop = targetRect.top - containerTop;
      const spacerNeeded = Math.max(0, nextPageContentTop - targetTop);

      if (spacerNeeded > 0) {
        targetToPush.style.marginTop = `${spacerNeeded}px`;

        // Recalculate max page found
        const updatedRect = el.getBoundingClientRect();
        const updatedTop = updatedRect.top - containerTop;
        const newPage = Math.floor(updatedTop / A4_PAGE_HEIGHT_PX) + 1;
        maxPageFound = Math.max(maxPageFound, newPage);
      }
    } else {
      const pageNum = Math.floor((currentTop + currentHeight) / A4_PAGE_HEIGHT_PX) + 1;
      maxPageFound = Math.max(maxPageFound, pageNum);
    }
  }

  // 4. Final total page calculation from container scrollHeight
  const totalHeight = containerEl.scrollHeight;
  const pageCountFromHeight = Math.ceil(totalHeight / A4_PAGE_HEIGHT_PX);

  return Math.max(maxPageFound, pageCountFromHeight, 1);
}
