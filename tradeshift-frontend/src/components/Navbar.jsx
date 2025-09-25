export default function Navbar({ onToggleMobileNav }) {
  return (
    <header className="flex w-full items-center justify-between border-b border-gray-800 bg-gray-900/80 px-6 py-4 backdrop-blur">
      <div className="flex items-center gap-4">
        <button
          className="rounded-full bg-gray-900 p-2 text-gray-400 transition hover:text-white lg:hidden"
          onClick={onToggleMobileNav}
          aria-label="Open navigation menu"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <p className="text-sm uppercase tracking-widest text-indigo-400">TradeShift</p>
          <h2 className="text-xl font-semibold text-white">Welcome back, trader!</h2>
        </div>
      </div>
      <button className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-indigo-500">
        Logout
      </button>
    </header>
  );
}
