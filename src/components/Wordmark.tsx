/**
 * Placeholder wordmark. Brand guidelines call for a bold condensed logotype
 * with the "E" replaced by a speed-line/stripe glyph — this approximates that
 * shape in CSS until the real SVG lockup (black + white versions) is supplied.
 * Never recolor: render only in currentColor (monochrome on black or white).
 */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-[0.08em] font-display uppercase tracking-tight select-none ${className}`}
      aria-label="THREADBOX"
    >
      <span>THR</span>
      <span
        className="relative inline-block h-[0.72em] w-[0.5em] -skew-x-12 overflow-hidden"
        aria-hidden="true"
      >
        <span className="absolute inset-0 flex flex-col justify-between py-[0.05em]">
          <span className="block h-[0.16em] bg-current" />
          <span className="block h-[0.16em] bg-current" />
          <span className="block h-[0.16em] bg-current" />
        </span>
      </span>
      <span>ADBOX</span>
    </span>
  );
}
