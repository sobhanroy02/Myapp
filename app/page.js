export const metadata = {
  title: 'Welcome | CitiZen'
}

export default function WelcomePage(){
  return (
    <main className="min-h-screen relative overflow-hidden bg-emerald-50">
      {/* Subtle background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-emerald-200 to-teal-100 opacity-60 blur-3xl" />
        <div className="absolute -bottom-20 -right-28 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-teal-200 to-emerald-100 opacity-50 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.07]" style={{backgroundImage:'radial-gradient(circle at 20% 20%, #10b981 1px, transparent 1px), radial-gradient(circle at 80% 30%, #14b8a6 1px, transparent 1px), radial-gradient(circle at 30% 80%, #22c55e 1px, transparent 1px)', backgroundSize:'28px 28px, 28px 28px, 28px 28px'}} />
      </div>

      {/* Centered welcome card */}
      <section className="flex items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-2xl text-center">
          <img src="/icons/icon-192x192.png" alt="CitiZen" className="mx-auto h-24 w-24 rounded" />
          <h1 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-emerald-900">Welcome to CitiZen</h1>
          <p className="mt-4 text-base md:text-lg text-emerald-900/70 max-w-xl mx-auto">A simple, transparent way to report civic issues and see real progress in your community.</p>

          <div className="mt-10">
            <a href="/auth" className="group relative inline-flex items-center justify-center px-10 py-4 rounded-2xl font-semibold text-white overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 shadow-lg shadow-emerald-600/20 active:scale-[0.98] transition">
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600" />
              <span className="relative flex items-center gap-2">
                Get Started
                <span className="opacity-90 group-hover:translate-x-1 transition">→</span>
              </span>
            </a>
            <p className="mt-3 text-sm text-emerald-900/60">No account yet? Create one in seconds on the next screen.</p>
          </div>

          {/* Minimal helpful hints */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            {[{t:'Report',d:'Capture and submit local issues quickly.'},{t:'Track',d:'Follow updates, add notes, and upvote.'},{t:'Resolve',d:'See progress and celebrate fixes.'}].map((i)=> (
              <div key={i.t} className="rounded-xl bg-white/70 backdrop-blur border border-emerald-400/20 p-4 shadow-sm">
                <p className="text-sm font-semibold text-emerald-900">{i.t}</p>
                <p className="text-sm text-emerald-900/70 mt-1">{i.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
