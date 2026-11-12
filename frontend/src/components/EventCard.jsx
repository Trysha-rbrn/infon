import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import {
  MapPin, Clock, X, Calendar as CalendarIcon, ExternalLink,
  Share2, Check, Sparkles, Building2, Layers
} from 'lucide-react'
import { getOrganizerById, getTypeInfo } from '../data/mockData'
import OrgLogo from './OrgLogo'

function EventModal({ event, onClose }) {
  const [copied, setCopied] = useState(false)
  const org = event.organizer || getOrganizerById(event.organizerId)
  const typeInfo = getTypeInfo(event.type)

  const startDate = new Date(event.date)
  const endDate = event.endDate ? new Date(event.endDate) : null

  // Zatvaranje na Escape taster
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Google Calendar URL generator
  const createGoogleCalendarUrl = () => {
    const formatGDate = (d) => {
      try {
        return d.toISOString().replace(/-|:|\.\d\d\d/g, '')
      } catch {
        return ''
      }
    }

    const startIso = formatGDate(startDate)
    const endIso = endDate ? formatGDate(endDate) : startIso

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      dates: `${startIso}/${endIso}`,
      details: `${event.description || ''}\n\nOrganizator: ${org?.name || ''}\nLokacija: ${event.location || ''}`,
      location: event.location || 'Fakultet organizacionih nauka, Beograd',
    })

    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }

  const handleShare = () => {
    const textToCopy = `${event.title}\n📅 ${format(startDate, 'dd.MM.yyyy HH:mm')}\n📍 ${event.location}\n🏢 ${org?.name || 'FON'}\n${event.description || ''}`
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const primaryColor = org?.color || '#004B7C'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-navy-950/70 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden my-auto transform transition-all border border-gray-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dynamic Branded Header */}
        <div
          className="relative p-6 sm:p-8 text-white overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, #0d1526 100%)`,
          }}
        >
          {/* Subtle decorative circles */}
          <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute right-24 -bottom-10 w-28 h-28 rounded-full bg-gold-500/20 blur-lg pointer-events-none" />

          {/* Top Bar with Organization & Close */}
          <div className="relative z-10 flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3 flex-wrap">
              <OrgLogo org={org} className="w-12 h-12 text-sm shadow-md" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white tracking-wide">
                    {org?.name || 'Studentska organizacija'}
                  </span>
                  {org?.website && (
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-200 hover:text-white transition-colors"
                      title="Poseti zvanični sajt"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide"
                    style={{
                      backgroundColor: typeInfo.color,
                      color: '#ffffff',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {typeInfo.label || event.type}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all hover:rotate-90 flex-shrink-0"
              aria-label="Zatvori"
            >
              <X size={18} />
            </button>
          </div>

          {/* Event Title */}
          <h2 className="relative z-10 text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight mt-2">
            {event.title}
          </h2>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Datum & Vreme */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gray-50 border border-gray-100/80">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-navy-900 flex items-center justify-center flex-shrink-0 shadow-sm">
                <CalendarIcon size={18} className="text-navy-900" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Datum i vreme</p>
                <p className="text-sm font-bold text-gray-900">
                  {format(startDate, 'd. MMMM yyyy.')}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-0.5">
                  <Clock size={13} className="text-gold-500" />
                  <span>
                    {format(startDate, 'HH:mm')}
                    {endDate && ` – ${format(endDate, 'HH:mm')}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Lokacija */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-gray-50 border border-gray-100/80">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                <MapPin size={18} className="text-amber-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Lokacija i sala</p>
                <p className="text-sm font-bold text-gray-900 leading-snug">
                  {event.location || 'Fakultet organizacionih nauka'}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  FON, Jove Ilića 154, Beograd
                </p>
              </div>
            </div>
          </div>

          {/* Opis događaja */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Sparkles size={16} className="text-gold-500" />
              <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wider">
                O događaju
              </h3>
            </div>
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/40 to-indigo-50/20 border border-blue-100/60">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {event.description || 'Nema dodatnog opisa za ovaj događaj.'}
              </p>
            </div>
          </div>

          {/* Studentski benefiti badge row */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/60">
              <Check size={13} />
              Otvoreno za sve studente
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-navy-50 text-navy-900 text-xs font-semibold border border-navy-200/60">
              <Building2 size={13} />
              Kampus FON-a
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-50 text-purple-800 text-xs font-semibold border border-purple-200/60">
              <Layers size={13} />
              {org?.shortName || 'FON'}
            </span>
          </div>

          {/* Modal Action Buttons Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Google Calendar Link */}
              <a
                href={createGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 sm:flex-none justify-center py-2.5 text-xs sm:text-sm font-semibold rounded-xl"
                title="Dodaj ovaj događaj u svoj lični Google Calendar"
              >
                <CalendarIcon size={15} />
                Dodaj u Google Kalendar
              </a>

              {/* Share / Copy Details Button */}
              <button
                onClick={handleShare}
                className="btn-secondary flex-1 sm:flex-none justify-center py-2.5 text-xs sm:text-sm font-semibold rounded-xl"
                title="Kopiraj podatke o događaju"
              >
                {copied ? (
                  <>
                    <Check size={15} className="text-emerald-600" />
                    <span className="text-emerald-700">Kopirano!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={15} />
                    Kopiraj info
                  </>
                )}
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-gray-500 hover:text-navy-900 hover:bg-gray-100 transition-colors"
            >
              Zatvori
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { EventModal }
export default function EventCard({ event }) {
  const [showModal, setShowModal] = useState(false)
  const org = event.organizer || getOrganizerById(event.organizerId)
  const typeInfo = getTypeInfo(event.type)
  const startDate = new Date(event.date)

  const primaryColor = org?.color || '#004B7C'

  return (
    <>
      <div
        className="card cursor-pointer group hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
        onClick={() => setShowModal(true)}
      >
        <div>
          {/* Top accent line */}
          <div className="h-1.5 w-full rounded-t-2xl" style={{ backgroundColor: primaryColor }} />

          <div className="p-5">
            {/* Organizer + type row */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <OrgLogo org={org} className="w-8 h-8 text-[10px]" />
                <span className="text-xs font-bold text-gray-700 truncate">
                  {org?.shortName || org?.name}
                </span>
              </div>
              <span
                className="badge text-white text-[11px] font-semibold flex-shrink-0 px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: typeInfo.color }}
              >
                {typeInfo.label || event.type}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-navy-900 transition-colors line-clamp-2">
              {event.title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">
              {event.description}
            </p>
          </div>
        </div>

        {/* Date & location in card footer */}
        <div className="px-5 pb-5 pt-0 space-y-1.5 border-t border-gray-50 mt-auto">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 pt-3">
            <Clock size={13} className="text-gold-500 flex-shrink-0" />
            <span className="font-semibold text-gray-700">
              {format(startDate, 'd. MMM yyyy, HH:mm')}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <MapPin size={13} className="text-gold-500 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>
      </div>

      {showModal && (
        <EventModal event={event} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}
