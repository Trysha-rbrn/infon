import { getOrganizerById } from '../data/mockData'
import OrgLogo from './OrgLogo'

export default function OrganizerBadge({ organizerId, size = 'md' }) {
  const org = getOrganizerById(organizerId)
  if (!org) return null

  const sizes = {
    sm: { wrapper: 'w-7 h-7 text-[10px]', text: 'text-xs' },
    md: { wrapper: 'w-8 h-8 text-xs', text: 'text-sm' },
    lg: { wrapper: 'w-10 h-10 text-sm', text: 'text-base' },
  }
  const s = sizes[size] || sizes.md

  return (
    <div className="flex items-center gap-2">
      <OrgLogo org={org} className={s.wrapper} />
      <span className={`${s.text} font-semibold text-gray-700 leading-tight`}>
        {org.name}
      </span>
    </div>
  )
}
