/**
 * Block-Aware Resume Pagination Engine
 * Calculates heights and page boundaries (1123px per A4 page).
 * If an entry block or bullet item overflows the printable area of a page, it cleanly pushes
 * the element (or its parent entry / section title if orphaned) to the top of the next page using top margins.
 * Eliminates text clipping, line splitting, orphaned headings, and overlapping across page boundaries.
 */
export function applyBlockAwarePagination(containerEl: HTMLElement | null): number {
  if (!containerEl) return 1;

  const A4_PAGE_HEIGHT_PX = 1123;
  const TOP_MARGIN_PADDING_PX = 56; // ~15mm top padding
  const BOTTOM_MARGIN_LIMIT_PX = 60; // ~16mm bottom margin limit for safe line spacing

  // 1. Reset any previously applied pagination margins/spacers
  const allManagedElements = Array.from(
    containerEl.querySelectorAll<HTMLElement>(
      '.resume-section, .resume-section-title, h2, .education-entry, .experience-entry, .project-entry, .certification-entry, .skill-group, .summary-entry, .resume-entry, .page-break-avoid, .resume-section-item, li'
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

  // 2. Select manageable blocks
  const blocks = Array.from(
    containerEl.querySelectorAll<HTMLElement>(
      '.resume-section.page-break-avoid, .education-entry, .experience-entry, .project-entry, .certification-entry, .skill-group, .summary-entry, .resume-entry, .resume-section-item, li, .page-break-avoid'
    )
  ).filter((el, index, self) => {
    // Deduplicate
    if (self.indexOf(el) !== index) return false;

    // Skip resume-section unless marked as page-break-avoid
    if (el.classList.contains('resume-section') && !el.classList.contains('page-break-avoid')) {
      return false;
    }

    const parent = el.parentElement;
    if (!parent) return true;
    const parentDisplay = window.getComputedStyle(parent).display;
    // Skip child items inside grid/flex containers unless appropriate
    if (!el.classList.contains('resume-section') && (parentDisplay.includes('grid') || (parentDisplay.includes('flex') && !parent.classList.contains('page-break-container') && parent.tagName.toLowerCase() !== 'div'))) {
      return false;
    }
    return true;
  });

  // 3. Iterate through elements and handle page breaks
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
      let targetToPush: HTMLElement = el;

      // If el is an <li> bullet inside an entry block
      if (el.tagName.toLowerCase() === 'li') {
        const entryBlock = el.closest(
          '.education-entry, .experience-entry, .project-entry, .certification-entry, .skill-group, .summary-entry, .resume-entry, .resume-section-item'
        ) as HTMLElement | null;

        if (entryBlock) {
          const bullets = Array.from(entryBlock.querySelectorAll<HTMLElement>('li'));
          const isFirstBullet = bullets.length > 0 && bullets[0] === el;
          if (isFirstBullet) {
            targetToPush = entryBlock;
          }
        }
      }

      // Check if targetToPush is the first entry in its section
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
            '.education-entry, .experience-entry, .project-entry, .certification-entry, .skill-group, .summary-entry, .resume-entry, .resume-section-item, li'
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
