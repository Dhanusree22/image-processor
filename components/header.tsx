export default function Header() {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              TextSegment
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              AI-powered handwritten text extraction & simplification
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
