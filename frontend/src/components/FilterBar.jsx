import { RotateCcw, Filter } from 'lucide-react'
import { organizers, eventTypes } from '../data/mockData'
import {
  startOfWeek, endOfWeek, startOfMonth, endOfMonth, parseISO, isWithinInterval
} from 'date-fns'

export const DATE_RANGES = [
  { value: 'all', label: 'Svi' },
  { value: 'week', label: 'Ova nedelja' },
  { value: 'month', label: 'Ovaj mesec' },
]

export function applyFilters(events, { selectedOrganizers, selectedTypes, dateRange }) {
  return events.filter((ev) => {
    if (selectedOrganizers.length > 0) {
      const orgId = ev.organizer ? ev.organizer.id : ev.organizerId
      const orgShort = ev.organizer?.shortName || ev.organizer?.short_name || ''
      const match = selectedOrganizers.some(
        (so) => String(so) === String(orgId) || (orgShort && String(so).toLowerCase() === orgShort.toLowerCase())
      )
      if (!match) return false
    }
    if (selectedTypes.length > 0) {
      const match = selectedTypes.some(
        (st) =>
          st.toLowerCase() === (ev.type || '').toLowerCase() ||
          (ev.type || '').toLowerCase().includes(st.toLowerCase()) ||
          st.toLowerCase().includes((ev.type || '').toLowerCase())
      )
      if (!match) return false
    }
    if (dateRange !== 'all') {
      const now = new Date('2026-11-16') // demo "today" na početku događaja
      const evDate = parseISO(ev.date)
      if (dateRange === 'week') {
        const interval = { start: startOfWeek(now, { weekStartsOn: 1 }), end: endOfWeek(now, { weekStartsOn: 1 }) }
        if (!isWithinInterval(evDate, interval)) return false
      } else if (dateRange === 'month') {
        const interval = { start: startOfMonth(now), end: endOfMonth(now) }
        if (!isWithinInterval(evDate, interval)) return false
      }
    }
    return true
  })
}

export default function FilterBar({
  organizersList = organizers,
  selectedOrganizers,
  setSelectedOrganizers,
  selectedTypes,
  setSelectedTypes,
  dateRange,
  setDateRange,
  resultCount,
}) {
  const toggleOrganizer = (id) => {
    setSelectedOrganizers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const toggleType = (val) => {
    setSelectedTypes((prev) =>
      prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]
    )
  }

  const reset = () => {
    setSelectedOrganizers([])
    setSelectedTypes([])
    setDateRange('all')
  }

  const hasFilters = selectedOrganizers.length > 0 || selectedTypes.length > 0 || dateRange !== 'all'

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-navy-900" />
          <h2 className="font-bold text-navy-900 text-sm uppercase tracking-wider">Filteri</h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            <span className="font-bold text-navy-900">{resultCount}</span> događaja
          </span>
          {hasFilters && (
            <button
              onClick={reset}
              className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-600 transition-colors"
            >
              <RotateCcw size={13} />
              Resetuj filtere
            </button>
          )}
        </div>
      </div>

      {/* Organizers */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Organizatori</p>
        <div className="flex flex-wrap gap-2">
          {(organizersList && organizersList.length > 0 ? organizersList : organizers).map((org) => {
            const active = selectedOrganizers.includes(org.id)
            return (
              <button
                key={org.id}
                onClick={() => toggleOrganizer(org.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all duration-150 ${
                  active ? 'text-white border-transparent shadow-sm scale-105' : 'text-gray-600 border-gray-200 bg-white hover:border-gray-300'
                }`}
                style={active ? { backgroundColor: org.color, borderColor: org.color } : {}}
              >
                <span
                  className="w-2 h-2 rounded-full transition-colors"
                  style={{ backgroundColor: active ? '#ffffff' : (org.color || '#1a1f5e') }}
                />
                {org.shortName || org.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Types */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tip događaja</p>
        <div className="flex flex-wrap gap-2">
          {eventTypes.map((t) => {
            const active = selectedTypes.includes(t.value)
            return (
              <button
                key={t.value}
                onClick={() => toggleType(t.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all duration-150 ${
                  active ? 'text-white border-transparent shadow-sm scale-105' : 'text-gray-600 border-gray-200 bg-white hover:border-gray-300'
                }`}
                style={active ? { backgroundColor: t.color, borderColor: t.color } : {}}
              >
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Date range */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Vremenski period</p>
        <div className="flex gap-2">
          {DATE_RANGES.map((r) => (
            <button
              key={r.value}
              onClick={() => setDateRange(r.value)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border-2 transition-all duration-150 ${
                dateRange === r.value
                  ? 'bg-navy-900 text-white border-navy-900 shadow-sm'
                  : 'text-gray-600 border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
