import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import { getOrganizerById } from '../data/mockData'
import { EventModal } from './EventCard'

export default function EventCalendar({ events }) {
  const [selectedEvent, setSelectedEvent] = useState(null)

  const calendarEvents = events.map((ev) => {
    const org = ev.organizer || getOrganizerById(ev.organizerId)
    return {
      id: String(ev.id),
      title: ev.title,
      start: ev.date,
      end: ev.endDate,
      backgroundColor: org?.color || '#004B7C',
      borderColor: org?.color || '#004B7C',
      textColor: '#ffffff',
      extendedProps: { event: ev },
    }
  })

  return (
    <>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
        <FullCalendar
          plugins={[dayGridPlugin, listPlugin]}
          initialView="dayGridMonth"
          initialDate="2026-11-16"
          locale="sr"
          firstDay={1}
          events={calendarEvents}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listMonth',
          }}
          buttonText={{
            today: 'Danas',
            month: 'Mesec',
            list: 'Lista događaja',
          }}
          height="auto"
          eventClick={(info) => {
            const ev = info.event.extendedProps.event
            setSelectedEvent(ev)
          }}
          dayMaxEvents={3}
        />
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  )
}
