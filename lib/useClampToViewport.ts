import { useEffect, useLayoutEffect, useState, type RefObject } from "react";

// Next.js server-renders client components too, and React warns when
// useLayoutEffect is called there. The choice is made once per environment, not
// per render, so this is not a conditional hook.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Nudges an absolutely positioned popup back inside the viewport.
 *
 * The filter pickers anchor to their trigger — left edge on phones, right edge
 * from `sm` up — and are far wider than the trigger itself. That is fine while
 * the trigger sits at the edge of the page, and wrong the moment it does not:
 * the rank picker is the left column of a two-column filter row, so right-
 * anchoring it at 640–740px pushed its left edge several hundred pixels off the
 * screen. The tabs were cut off and the page grew a horizontal scrollbar.
 *
 * CSS cannot fix this on its own: an absolutely positioned box knows where its
 * container is, not where the viewport ends. So measure once, before paint, and
 * translate the box back inside if it pokes out. `useLayoutEffect` is what keeps
 * that from being a visible jump.
 *
 * Returns the correction in pixels — 0 when the popup already fits.
 */
export function useClampToViewport(
  ref: RefObject<HTMLElement | null>,
  open: boolean,
  gutter = 12,
): number {
  const [shift, setShift] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (!open) {
      setShift(0);
      return;
    }

    function measure() {
      const el = ref.current;
      if (!el) return;
      // Measure the natural position: with our own correction still applied the
      // second measurement would read as "already fits" and the shift would
      // drift on every resize.
      el.style.transform = "";
      const box = el.getBoundingClientRect();
      const right = document.documentElement.clientWidth - gutter;

      if (box.left < gutter) setShift(gutter - box.left);
      // If the popup is somehow wider than the viewport, keeping the left edge
      // visible beats keeping the right one: that is where the content starts.
      else if (box.right > right) setShift(Math.max(right - box.right, gutter - box.left));
      else setShift(0);
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [ref, open, gutter]);

  return shift;
}
