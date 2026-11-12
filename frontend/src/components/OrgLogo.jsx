import { useState } from 'react'
import { getOrgLogo } from '../data/mockData'

export default function OrgLogo({ org, className = 'w-8 h-8 text-[11px]' }) {
  const [imgError, setImgError] = useState(false)
  const logoUrl = getOrgLogo(org)

  const primaryColor = org?.color || '#004B7C'
  const initials = org?.logoInitials || org?.shortName?.slice(0, 3) || 'FON'

  // Ako postoji logo URL i nije došlo do greške pri učitavanju
  if (logoUrl && !imgError) {
    return (
      <div
        className={`${className} rounded-lg bg-white border border-gray-100 flex items-center justify-center p-1 shadow-sm flex-shrink-0 overflow-hidden`}
        title={org?.name}
      >
        <img
          src={logoUrl}
          alt={org?.name || 'Organizator'}
          className="w-full h-full object-contain"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      </div>
    )
  }

  // Fallback: kvadrat sa bojom organizacije i skraćenicom naziva
  return (
    <div
      className={`${className} rounded-lg flex items-center justify-center font-black text-white shadow-sm flex-shrink-0 tracking-wider`}
      style={{ backgroundColor: primaryColor }}
      title={org?.name}
    >
      <span>{initials}</span>
    </div>
  )
}
