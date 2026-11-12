import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import InfonLogo from './InfonLogo'

const ROLE_LABELS = {
  admin: { label: 'Admin', color: 'bg-red-100 text-red-700' },
  profesor: { label: 'Profesor', color: 'bg-blue-100 text-blue-700' },
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  const navLinks = [
    ...(user?.role === 'admin'
      ? [{ to: '/admin', label: 'Admin panel' }]
      : user?.role === 'profesor'
      ? [{ to: '/admin', label: 'Profesor panel' }]
      : []),
  ]

  return (
    <nav className="sticky top-0 z-40 bg-navy-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
            <div className="w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
              <InfonLogo className="w-10 h-10" isDark={true} />
            </div>
            <div>
              <span className="text-white font-black text-xl tracking-tight">inFON</span>
              <p className="text-blue-200 text-xs leading-none hidden sm:block">
                Svi događaji, jedno mesto
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-150 ${
                  isActive(link.to)
                    ? 'bg-white/10 text-white'
                    : 'text-blue-200 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gold-500 flex items-center justify-center">
                    <User size={14} className="text-navy-900" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold leading-none">{user.name}</p>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${ROLE_LABELS[user.role]?.color}`}>
                      {ROLE_LABELS[user.role]?.label}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-blue-200 hover:text-white text-sm font-medium transition-colors"
                >
                  <LogOut size={15} />
                  Odjavi se
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn-gold text-sm"
              >
                Prijavi se
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Otvori meni"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-navy-900 px-4 pb-4 pt-2">
          <div className="space-y-1 mb-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive(link.to)
                    ? 'bg-white/10 text-white'
                    : 'text-blue-200 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {user ? (
            <div className="border-t border-white/10 pt-3">
              <div className="flex items-center gap-2 mb-3 px-1">
                <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center">
                  <User size={16} className="text-navy-900" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{user.name}</p>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${ROLE_LABELS[user.role]?.color}`}>
                    {ROLE_LABELS[user.role]?.label}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors"
              >
                <LogOut size={15} />
                Odjavi se
              </button>
            </div>
          ) : (
            <div className="border-t border-white/10 pt-3">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="btn-gold w-full justify-center"
              >
                Prijavi se
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}
