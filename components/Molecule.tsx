export default function Molecule({ size = 180 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <g stroke="#705040" strokeWidth="1.5">
        <circle cx="46" cy="48" r="30" fill="#EBBF4F" />
        <circle cx="82" cy="40" r="20" fill="#0F706C" />
        <circle cx="80" cy="80" r="22" fill="#CB5A33" />
        <circle cx="42" cy="86" r="14" fill="#677A47" />
        <circle cx="62" cy="62" r="9" fill="#8C7050" />
        <circle cx="100" cy="64" r="6" fill="#7A9660" />
      </g>
    </svg>
  )
}
