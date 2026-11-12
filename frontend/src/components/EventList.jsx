import EventCard from './EventCard'
import { Calendar, List, Inbox } from 'lucide-react'

export default function EventList({ events }) {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <Inbox size={48} className="mb-4 opacity-40" />
        <p className="text-lg font-semibold">Nema događaja</p>
        <p className="text-sm mt-1">Pokušajte da resetujete filtere.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
