import { FileDown, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { getOrganizerById, getTypeInfo } from '../data/mockData'

function buildRows(events) {
  return events.map((ev) => {
    const org = ev.organizer || getOrganizerById(ev.organizerId)
    const typeInfo = getTypeInfo(ev.type)
    return {
      title: ev.title,
      organizer: org?.name || ev.organizer?.name || ev.organizerId || 'FON',
      date: format(new Date(ev.date), 'dd.MM.yyyy HH:mm'),
      location: ev.location,
      type: typeInfo.label,
    }
  })
}

function exportCSV(events) {
  const rows = buildRows(events)
  const header = ['Naziv', 'Organizator', 'Datum', 'Lokacija', 'Tip']
  const csvContent = [
    header.join(';'),
    ...rows.map((r) =>
      [r.title, r.organizer, r.date, r.location, r.type]
        .map((v) => `"${v.replace(/"/g, '""')}"`)
        .join(';')
    ),
  ].join('\n')

  const BOM = '\uFEFF'
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `infon-dogadjaji-${format(new Date(), 'yyyy-MM-dd')}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

async function exportPDF(events) {
  const { default: jsPDF } = await import('jspdf')
  const { default: autoTable } = await import('jspdf-autotable')

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })

  // Header
  doc.setFillColor(26, 31, 94)
  doc.rect(0, 0, 297, 25, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('InFON', 15, 14)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('Svi dogadjaji, jedno mesto', 15, 20)
  doc.setTextColor(245, 166, 35)
  doc.text(`Izvoz: ${format(new Date(), 'dd.MM.yyyy')}`, 250, 14)

  const rows = buildRows(events)

  autoTable(doc, {
    startY: 32,
    head: [['Naziv', 'Organizator', 'Datum', 'Lokacija', 'Tip']],
    body: rows.map((r) => [r.title, r.organizer, r.date, r.location, r.type]),
    headStyles: {
      fillColor: [26, 31, 94],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
    },
    bodyStyles: { fontSize: 8.5, cellPadding: 3 },
    alternateRowStyles: { fillColor: [248, 249, 252] },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 55 },
      2: { cellWidth: 42 },
      3: { cellWidth: 60 },
      4: { cellWidth: 30 },
    },
    margin: { left: 15, right: 15 },
    styles: { overflow: 'linebreak', valign: 'middle' },
  })

  doc.save(`infon-dogadjaji-${format(new Date(), 'yyyy-MM-dd')}.pdf`)
}

export default function ExportButton({ events }) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => exportPDF(events)}
        className="btn-primary"
        disabled={events.length === 0}
      >
        <FileDown size={16} />
        Izvezi PDF
      </button>
      <button
        onClick={() => exportCSV(events)}
        className="btn-secondary"
        disabled={events.length === 0}
      >
        <FileText size={16} />
        Izvezi CSV
      </button>
    </div>
  )
}
