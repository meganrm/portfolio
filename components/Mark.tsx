export default function Mark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-label="Riel-Mehan mark">
      <g stroke="#211E1A" strokeWidth="1.5">
        <circle cx="19" cy="20" r="12" fill="#EBBF4F" />
        <circle cx="32" cy="18" r="8" fill="#0F706C" />
        <circle cx="31" cy="32" r="9" fill="#CB5A33" />
        <circle cx="17" cy="34" r="5.5" fill="#677A47" />
      </g>
    </svg>
  )
}
