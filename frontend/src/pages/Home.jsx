import { useState, useEffect } from 'react'
import { LayoutGrid, CalendarDays, RefreshCw } from 'lucide-react'
import FilterBar, { applyFilters } from '../components/FilterBar'
import EventList from '../components/EventList'
import EventCalendar from '../components/EventCalendar'
import ExportButton from '../components/ExportButton'
import { events as defaultEvents, organizers as defaultOrganizers, getOrgLogo } from '../data/mockData'
import { fetchEvents, fetchOrganizers } from '../services/api'

export default function Home() {
  const [view, setView] = useState('list')
  const [selectedOrganizers, setSelectedOrganizers] = useState([])
  const [selectedTypes, setSelectedTypes] = useState([])
  const [dateRange, setDateRange] = useState('all')

  const [allEvents, setAllEvents] = useState(defaultEvents)
  const [allOrganizers, setAllOrganizers] = useState(defaultOrganizers)
  const [loading, setLoading] = useState(true)
  const [isLiveApi, setIsLiveApi] = useState(false)

  const loadData = async () => {
    setLoading(true)
    try {
      const [eventsData, orgsData] = await Promise.all([
        fetchEvents(),
        fetchOrganizers(),
      ])

      if (Array.isArray(eventsData) && eventsData.length > 0) {
        const enrichedEvents = eventsData.map((ev) => {
          if (ev.organizer) {
            return {
              ...ev,
              organizer: {
                ...ev.organizer,
                logoUrl: getOrgLogo(ev.organizer),
              },
            }
          }
          return ev
        })
        setAllEvents(enrichedEvents)
        setIsLiveApi(true)
      }
      if (Array.isArray(orgsData) && orgsData.length > 0) {
        const normalized = orgsData.map((o) => ({
          id: o.id,
          name: o.name,
          shortName: o.short_name || o.shortName,
          color: o.color || '#004B7C',
          logoInitials: o.logo_initials || o.logoInitials,
          logoUrl: getOrgLogo(o),
          description: o.description,
          website: o.website,
        }))
        setAllOrganizers(normalized)
      }
    } catch (err) {
      console.warn('API poziv nije uspeo, koristim lokalne podatke:', err.message)
      setIsLiveApi(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const filteredEvents = applyFilters(allEvents, {
    selectedOrganizers,
    selectedTypes,
    dateRange,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero */}
      <div className="mb-8">
        <div className="relative rounded-3xl p-8 sm:p-12 text-white overflow-hidden shadow-2xl bg-navy-950 border border-navy-800/60">
          {/* Blurred Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/fon-hall.jpg"
              alt="FON hol"
              className="w-full h-full object-cover object-center filter blur-[5px] scale-105 opacity-35"
            />
            {/* Overlay gradient to ensure perfect readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/90 to-navy-900/65" />
          </div>

          <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute right-28 bottom-0 w-48 h-48 bg-gold-500/10 rounded-full translate-y-1/2 pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-black mb-3 leading-tight tracking-tight">
              Svi FON događaji,<br />
              <span className="text-gold-400">na jednom mestu.</span>
            </h1>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Svi događaji na fakultetu i za rast tvoje karijere, na jednom mestu.
              Prati predavanja, hakatone, radionice i panele organizovane od strane
              fakulteta, profesora i studentskih organizacija.
            </p>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <FilterBar
        organizersList={allOrganizers}
        selectedOrganizers={selectedOrganizers}
        setSelectedOrganizers={setSelectedOrganizers}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        dateRange={dateRange}
        setDateRange={setDateRange}
        resultCount={filteredEvents.length}
      />

      {/* View toggle + export + refresh */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setView('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                view === 'list'
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <LayoutGrid size={15} />
              Lista
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                view === 'calendar'
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <CalendarDays size={15} />
              Kalendar
            </button>
          </div>

          <button
            onClick={loadData}
            title="Osveži podatke sa servera"
            className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-500 hover:text-navy-900 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin text-navy-900' : ''} />
          </button>
        </div>

        <ExportButton events={filteredEvents} />
      </div>

      {/* Content */}
      {view === 'list' ? (
        <EventList events={filteredEvents} />
      ) : (
        <EventCalendar events={filteredEvents} />
      )}
    </div>
  )
}
