import Button from './Button'

export default function Hero() {
  return (
    <section className="rounded-lg p-8 bg-white dark:bg-slate-800 shadow-md flex flex-col md:flex-row items-center gap-8">
      <div className="flex-1">
        <h1 className="text-3xl md:text-4xl font-extrabold text-sky-700">Transforming Cities. Empowering Citizens.</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Every Report Counts. Every Voice Matters. Report issues easily and track progress live.</p>
        <div className="mt-6">
          <Button>Report an Issue</Button>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="bg-gradient-to-tr from-sky-100 to-teal-100 dark:from-slate-700 dark:to-slate-600 rounded-lg p-6 h-56 flex items-center justify-center">
          <div className="text-center text-gray-500">[Illustration Placeholder]</div>
        </div>
      </div>
    </section>
  )
}
