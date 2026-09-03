/**
 * Block-Aware Resume Pagination Engine
 * Calculates heights and page boundaries (1123px per A4 page).
 * If an entry block overflows the printable area of a page, it pushes the entire entry block
 * (and its section title if it's the first entry) cleanly to the top of the next page using top margins.
 * Eliminates text clipping, line splitting, and overlapping across page boundaries.
 */
export function applyBlockAwarePagination(containerEl: HTMLElement | null): number {
  if (!containerEl) return 1;

  const A4_PAGE_HEIGHT_PX = 1123;
  const TOP_MARGIN_PADDING_PX = 56; // ~15mm top padding
  const BOTTOM_MARGIN_LIMIT_PX = 56; // ~15mm bottom margin limit

  // 1. Reset any previously applied pagination margins/spacers
  const allManagedElements = Array.from(
    containerEl.querySelectorAll<HTMLElement>(
      '.resume-section-title, .resume-entry, .education-entry, .experience-entry, .project-entry, .certification-entry, .skill-group, .page-break-avoid, .resume-section-item'
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

  // 2. Iterate through all section titles & entry blocks
  const blocks = Array.from(
    containerEl.querySelectorAll<HTMLElement>(
      '.resume-section-title, .resume-entry, .education-entry, .experience-entry, .project-entry, .certification-entry, .skill-group, .page-break-avoid, .resume-section-item'
    )
  );

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
      const spacerNeeded = Math.max(0, nextPageContentTop - currentTop);

      if (spacerNeeded > 0) {
        // If this entry is preceded immediately by a section title on the same page, push the section title instead
        const prevEl = el.previousElementSibling as HTMLElement | null;
        if (prevEl && (prevEl.classList.contains('resume-section-title') || prevEl.tagName.toLowerCase() === 'h2')) {
          const prevRect = prevEl.getBoundingClientRect();
          const prevTop = prevRect.top - containerTop;
          const headingSpacer = Math.max(0, nextPageContentTop - prevTop);
          if (headingSpacer > 0) {
            prevEl.style.marginTop = `${headingSpacer}px`;
          }
        } else {
          el.style.marginTop = `${spacerNeeded}px`;
        }

        // Update page count
        const newTop = currentTop + spacerNeeded;
        const newPage = Math.floor(newTop / A4_PAGE_HEIGHT_PX) + 1;
        maxPageFound = Math.max(maxPageFound, newPage);
      }
    } else {
      const pageNum = Math.floor((currentTop + currentHeight) / A4_PAGE_HEIGHT_PX) + 1;
      maxPageFound = Math.max(maxPageFound, pageNum);
    }
  }

  // 3. Final total page calculation from container scrollHeight
  const totalHeight = containerEl.scrollHeight;
  const pageCountFromHeight = Math.ceil(totalHeight / A4_PAGE_HEIGHT_PX);

  return Math.max(maxPageFound, pageCountFromHeight, 1);
}
