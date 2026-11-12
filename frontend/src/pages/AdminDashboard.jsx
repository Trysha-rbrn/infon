import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Calendar, Users, TrendingUp, Plus, Trash2, X, Shield, BookOpen,
  RefreshCw, LogOut, ArrowLeft, CheckCircle2, MapPin, Clock, Layers
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { events as defaultEvents, organizers as defaultOrganizers, getOrganizerById, getTypeInfo, getOrgLogo } from '../data/mockData'
import { fetchEvents, fetchOrganizers, createEventApi, deleteEventApi } from '../services/api'
import { format, parseISO, isThisWeek } from 'date-fns'
import OrgLogo from '../components/OrgLogo'

const DEMO_TODAY = new Date('2026-11-16')

function StatCard({ icon: Icon, label, value, color, subtitle }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-2.5">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} shadow-sm`}>
          <Icon size={18} className="text-white" />
        </div>
      </div>
      <p className="text-2xl sm:text-3xl font-black text-gray-900 mb-0.5">{value}</p>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  )
}

function AddEventModal({ organizers, onClose, onEventAdded, userRole }) {
  const { token } = useAuth()
  const isProfesor = userRole === 'profesor'

  // Pronađi FON organizatora
  const fonOrg = organizers.find((o) => (o.shortName || o.short_name) === 'FON') || organizers[0]

  const [form, setForm] = useState({
    title: '',
    date: '2026-11-20T12:00',
    endDate: '2026-11-20T14:00',
    location: isProfesor ? 'Sala 201, FON' : '',
    organizerId: fonOrg?.id || '1',
    type: 'Radionica',
    description: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMsg('')

    try {
      const payload = {
        title: form.title,
        date: form.date,
        endDate: form.endDate || null,
        location: form.location,
        organizerId: parseInt(form.organizerId, 10),
        type: form.type,
        description: form.description,
        tags: [form.type, isProfesor ? 'profesor' : 'dogadjaj'],
      }

      const res = await createEventApi(payload, token)
      alert(`Događaj uspešno upisan u bazu podataka! (ID: ${res.id || 'Novi'})`)
      onEventAdded()
      onClose()
    } catch (err) {
      console.error('API dodavanje greška:', err.message)
      if (err.message.includes('token') || err.message.includes('Unauthorized')) {
        setErrorMsg('Vaša sesija je istekla ili niste autorizovani. Molimo odjavite se i prijavite ponovo.')
      } else {
        setErrorMsg(`Greška pri upisu u bazu: ${err.message}`)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-7 border border-gray-100" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center shadow-sm">
              <Plus size={18} />
            </div>
            <div>
              <h2 className="text-lg font-black text-navy-900 leading-tight">
                {isProfesor ? 'Dodaj predavanje / panel' : 'Dodaj novi događaj'}
              </h2>
              <p className="text-xs text-gray-500">
                {isProfesor ? 'Objavljivanje događaja u okviru vašeg predmeta' : 'Administratorski unos za bilo koju organizaciju'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl mb-4 border border-red-200">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Naziv događaja {isProfesor ? '(predmet / tema predavanja)' : ''} *
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-navy-900 transition-colors"
              placeholder={isProfesor ? "npr. Gostujuće predavanje: Arhitektura mikroservisa" : "npr. Hakaton 2026"}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Početak *</label>
              <input
                name="date"
                type="datetime-local"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-navy-900 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Završetak</label>
              <input
                name="endDate"
                type="datetime-local"
                value={form.endDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-navy-900 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Tip događaja *</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-navy-900 transition-colors bg-white"
              >
                <option value="Radionica">Radionica</option>
                <option value="Tribina / Diskusija">Tribina / Panel</option>
                <option value="Naučni simpozijum">Naučni simpozijum</option>
                {!isProfesor && <option value="Hakaton">Hakaton</option>}
                {!isProfesor && <option value="Takmičenje">Takmičenje</option>}
                {!isProfesor && <option value="Sajam organizacija">Sajam organizacija</option>}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Organizator *</label>
              <select
                name="organizerId"
                value={form.organizerId}
                onChange={handleChange}
                disabled={isProfesor}
                className={`w-full px-3 py-2.5 border-2 border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-navy-900 transition-colors bg-white ${
                  isProfesor ? 'opacity-80 bg-gray-100 cursor-not-allowed' : ''
                }`}
              >
                {organizers.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name || o.shortName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Lokacija / Sala *</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-navy-900 transition-colors"
              placeholder="npr. Sala 205, FON"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Opis događaja</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3.5 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-navy-900 transition-colors resize-none"
              placeholder="Detalji o predavanju, gostujućim predavačima i gradivu..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary flex-1 justify-center py-2.5 rounded-xl font-bold"
            >
              <Plus size={16} />
              {submitting ? 'Čuvanje...' : 'Sačuvaj u bazu'}
            </button>
            <button type="button" onClick={onClose} className="btn-secondary px-5 rounded-xl">
              Otkaži
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const { user, token, logout } = useAuth()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [eventsList, setEventsList] = useState(defaultEvents)
  const [orgsList, setOrgsList] = useState(defaultOrganizers)
  const [loading, setLoading] = useState(false)

  if (!user || (user.role !== 'admin' && user.role !== 'profesor')) {
    navigate('/')
    return null
  }

  const isProfesor = user.role === 'profesor'

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
        setEventsList(enrichedEvents)
      }
      if (Array.isArray(orgsData) && orgsData.length > 0) {
        const normalized = orgsData.map((o) => ({
          id: o.id,
          name: o.name,
          shortName: o.short_name || o.shortName,
          color: o.color || '#004B7C',
          logoInitials: o.logo_initials || o.logoInitials,
          logoUrl: getOrgLogo(o),
        }))
        setOrgsList(normalized)
      }
    } catch (err) {
      console.warn('API error in dashboard:', err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Da li ste sigurni da želite da uklonite događaj:\n"${title}"?`)) {
      return
    }

    try {
      await deleteEventApi(id, token)
      alert('Događaj uspešno uklonjen!')
      loadData()
    } catch (err) {
      alert(`Greška: ${err.message}`)
    }
  }

  // PROFESOR VIDI SAMO SVOJE DOGAĐAJE
  const displayedEvents = isProfesor
    ? eventsList.filter((ev) => ev.createdBy === user.id || ev.created_by === user.id)
    : eventsList

  // STATISTIKA ZA PROFESORA
  const professorTotalEvents = displayedEvents.length
  const professorUpcoming = displayedEvents.filter((ev) => {
    try {
      return new Date(ev.date) >= DEMO_TODAY
    } catch {
      return true
    }
  }).length

  // STATISTIKA ZA ADMINA (GLOBALNA)
  const eventsThisWeek = eventsList.filter((ev) => {
    try {
      return isThisWeek(parseISO(ev.date), { weekStartsOn: 1, referenceDate: DEMO_TODAY })
    } catch {
      return false
    }
  }).length

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* ========================================================= */}
        {/* SIDEBAR (Leva kolona)                                     */}
        {/* ========================================================= */}
        <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-4">
          {/* User Profile Card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
            {/* Top accent banner */}
            <div
              className="h-2 w-full absolute top-0 left-0"
              style={{ backgroundColor: isProfesor ? '#0077B6' : '#D90429' }}
            />

            {/* Role Pill */}
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  isProfesor
                    ? 'bg-blue-50 text-blue-800 border border-blue-200/60'
                    : 'bg-red-50 text-red-800 border border-red-200/60'
                }`}
              >
                {isProfesor ? (
                  <>
                    <BookOpen size={13} />
                    Profesor panel
                  </>
                ) : (
                  <>
                    <Shield size={13} />
                    Admin panel
                  </>
                )}
              </span>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3.5 mb-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white text-base shadow-md flex-shrink-0 tracking-wider"
                style={{ backgroundColor: isProfesor ? '#0077B6' : '#D90429' }}
              >
                {user.name
                  ? user.name
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                  : 'IN'}
              </div>
              <div className="min-w-0">
                <h3 className="font-black text-navy-900 text-base leading-tight truncate">
                  {user.name}
                </h3>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  {isProfesor ? 'Verifikovani predavač' : 'Glavni administrator'}
                </span>
              </div>
            </div>

            {/* Quick Action Button in Sidebar */}
            <button
              onClick={() => setShowModal(true)}
              className="w-full btn-gold justify-center py-2.5 rounded-xl font-bold text-sm shadow-md"
            >
              <Plus size={16} />
              {isProfesor ? 'Dodaj predavanje / panel' : 'Dodaj novi događaj'}
            </button>
          </div>

          {/* Sidebar Navigation Links */}
          <div className="bg-white rounded-3xl p-3 shadow-sm border border-gray-100 space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Navigacija panela
            </div>

            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-navy-50 text-navy-900 font-bold text-sm">
              <Layers size={16} className="text-navy-900" />
              <span>{isProfesor ? 'Moja predavanja' : 'Svi događaji na FON-u'}</span>
              <span className="ml-auto text-xs font-black bg-navy-900 text-white px-2 py-0.5 rounded-full">
                {displayedEvents.length}
              </span>
            </div>

            <button
              onClick={loadData}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-gray-600 hover:text-navy-900 hover:bg-gray-50 font-semibold text-sm transition-colors"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              <span>Osveži podatke</span>
            </button>

            <Link
              to="/"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-gray-600 hover:text-navy-900 hover:bg-gray-50 font-semibold text-sm transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Nazad na javni sajt</span>
            </Link>

            <div className="pt-2 border-t border-gray-100 mt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 font-semibold text-sm transition-colors"
              >
                <LogOut size={16} />
                <span>Odjavi se</span>
              </button>
            </div>
          </div>
        </aside>

        {/* ========================================================= */}
        {/* MAIN WORKSPACE (Desna kolona)                            */}
        {/* ========================================================= */}
        <main className="flex-1 w-full space-y-6">
          {/* Header Title Bar */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-navy-900 tracking-tight">
                {isProfesor ? 'Moja predavanja i paneli' : 'Upravljanje događajima na FON-u'}
              </h1>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                {isProfesor
                  ? 'Pregled i upravljanje vašim predavanjima, gostujućim panelima i radionicama'
                  : 'Centralna baza svih 15 studentskih i akademskih organizacija fakulteta'}
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="btn-primary text-xs sm:text-sm py-2.5 px-4 rounded-xl flex-shrink-0"
            >
              <Plus size={15} />
              {isProfesor ? 'Novo predavanje' : 'Novi događaj'}
            </button>
          </div>

          {/* STATISTIKA - STRIKTNO ODVOJENA ZA PROFESORA I ADMINA */}
          {isProfesor ? (
            /* PROFESOR STATISTIKA (Samo njegovi podaci!) */
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                icon={BookOpen}
                label="Moja predavanja"
                value={professorTotalEvents}
                color="bg-blue-600"
                subtitle="Ukupno unetih događaja"
              />
              <StatCard
                icon={Calendar}
                label="Predstojeći termini"
                value={professorUpcoming}
                color="bg-emerald-600"
                subtitle="Događaji u planu"
              />
              <StatCard
                icon={CheckCircle2}
                label="Akademski status"
                value="Aktivan"
                color="bg-purple-600"
                subtitle="Katedra za IS / FON"
              />
            </div>
          ) : (
            /* ADMIN STATISTIKA (Celokupni sistem) */
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                icon={Calendar}
                label="Ukupno događaja"
                value={eventsList.length}
                color="bg-navy-900"
                subtitle="U svim organizacijama"
              />
              <StatCard
                icon={TrendingUp}
                label="Ova nedelja"
                value={eventsThisWeek}
                color="bg-gold-500"
                subtitle="Aktivna dešavanja"
              />
              <StatCard
                icon={Users}
                label="Organizacije"
                value={orgsList.length}
                color="bg-emerald-600"
                subtitle="Aktivnih na fakultetu"
              />
            </div>
          )}

          {/* TABELA DOGAĐAJA */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-navy-900 text-base">
                  {isProfesor ? 'Vaši registrovani događaji' : 'Baza svih događaja'}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {isProfesor
                    ? 'Prikazani su samo događaji koje ste vi objavili za studente'
                    : 'Pregled svih događaja sa pravom izmene i brisanja'}
                </p>
              </div>
              <span className="text-xs font-bold text-navy-900 bg-navy-50 px-3 py-1 rounded-full">
                {displayedEvents.length} događaja
              </span>
            </div>

            {displayedEvents.length === 0 ? (
              /* Prazno stanje za profesora */
              <div className="p-10 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <BookOpen size={24} />
                </div>
                <h3 className="font-black text-navy-900 text-lg mb-1">
                  Još nemate unetih predavanja ili panela
                </h3>
                <p className="text-sm text-gray-500 max-w-md mb-5 leading-relaxed">
                  Kao profesor na FON-u, možete objaviti predavanje, gostujuću diskusiju ili radionicu
                  koja će odmah biti vidljiva svim studentima.
                </p>
                <button onClick={() => setShowModal(true)} className="btn-gold py-2.5 px-6 rounded-xl font-bold">
                  <Plus size={16} />
                  Dodaj moje prvo predavanje
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {['Naziv događaja', 'Organizator', 'Datum i vreme', 'Tip', 'Lokacija', 'Akcije'].map((h) => (
                        <th key={h} className="px-5 py-3.5 text-left text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {displayedEvents.map((ev) => {
                      const org = ev.organizer || getOrganizerById(ev.organizerId, orgsList)
                      const typeInfo = getTypeInfo(ev.type)
                      return (
                        <tr key={ev.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="px-5 py-4 text-sm font-bold text-gray-900 max-w-[240px]">
                            <span className="line-clamp-2 leading-snug">{ev.title}</span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <OrgLogo org={org} className="w-7 h-7 text-[9px]" />
                              <span className="text-xs text-gray-700 font-bold whitespace-nowrap">
                                {org?.shortName || org?.name || 'FON'}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-xs text-gray-600 whitespace-nowrap font-medium">
                            <div className="flex items-center gap-1.5">
                              <Clock size={12} className="text-gold-500" />
                              <span>{format(new Date(ev.date), 'dd.MM.yyyy HH:mm')}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <span
                              className="px-2.5 py-0.5 rounded-full text-white text-xs font-semibold"
                              style={{ backgroundColor: typeInfo.color }}
                            >
                              {typeInfo.label || ev.type}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-xs text-gray-500 max-w-[160px]">
                            <div className="flex items-center gap-1">
                              <MapPin size={12} className="text-gray-400 flex-shrink-0" />
                              <span className="truncate">{ev.location}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              {/* I admin i profesor mogu da obrišu svoj događaj */}
                              {(user.role === 'admin' || ev.createdBy === user.id || ev.created_by === user.id) ? (
                                <button
                                  onClick={() => handleDelete(ev.id, ev.title)}
                                  className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                                  title="Obriši događaj"
                                >
                                  <Trash2 size={15} />
                                </button>
                              ) : (
                                <span className="text-xs text-gray-400 italic">Pregled</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {showModal && (
        <AddEventModal
          organizers={orgsList}
          userRole={user.role}
          onClose={() => setShowModal(false)}
          onEventAdded={loadData}
        />
      )}
    </div>
  )
}
