import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import InfonLogo from '../components/InfonLogo'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, user } = useAuth()
  const navigate = useNavigate()

  if (user) {
    navigate('/')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (result.success) {
      navigate('/')
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-500">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Top banner */}
          <div className="bg-gradient-to-r from-navy-900 to-navy-500 p-8 text-center">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-2">
              <InfonLogo className="w-16 h-16" isDark={true} />
            </div>
            <h1 className="text-white font-black text-2xl">inFON</h1>
            <p className="text-blue-200 text-sm mt-1">Prijava na platformu</p>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
                <AlertCircle size={16} className="flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email adresa
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vas@fon.bg.ac.rs"
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-navy-900 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Lozinka
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-navy-900 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary justify-center py-3 text-base rounded-xl"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Prijavljivanje...
                  </span>
                ) : (
                  <>
                    <LogIn size={18} />
                    Prijavi se
                  </>
                )}
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Demo pristup
              </p>
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Admin:</span>
                  <code className="bg-white px-2 py-0.5 rounded border text-gray-700">
                    admin@fon.bg.ac.rs / admin123
                  </code>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Profesor:</span>
                  <code className="bg-white px-2 py-0.5 rounded border text-gray-700">
                    profesor@fon.bg.ac.rs / profesor123
                  </code>
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-gray-400 mt-5">
              <Link to="/" className="text-navy-900 font-semibold hover:underline">
                ← Nazad na početnu
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
