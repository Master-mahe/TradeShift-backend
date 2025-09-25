import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { ArrowRightOnRectangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const mobileLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/trade", label: "Trade" },
];

export default function ShellLayout() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <Sidebar className="hidden lg:flex" />

      <div className="flex flex-1 flex-col">
        <Navbar onToggleMobileNav={() => setIsMobileNavOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
          <div className="mx-auto w-full max-w-6xl px-4 py-8">
            <Outlet />
          </div>
        </main>
      </div>

      <MobileNavDrawer isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </div>
  );
}

function MobileNavDrawer({ isOpen, onClose }) {
  return (
    <div className={`fixed inset-0 z-40 lg:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      <div className={`absolute inset-0 bg-black/60 transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`} onClick={onClose} />

      <div
        className={`absolute inset-y-0 left-0 max-w-xs transform bg-gray-950 shadow-2xl transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-900 px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-indigo-400">Tradeshift</p>
            <h2 className="text-lg font-semibold text-white">Control Center</h2>
          </div>
          <button className="rounded-full bg-gray-900 p-2 text-gray-400" onClick={onClose}>
            <XMarkIcon className="h-5 w-5" />
            <span className="sr-only">Close navigation</span>
          </button>
        </div>

        <nav className="space-y-2 p-4 text-sm font-medium">
          {mobileLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 transition ${
                  isActive ? "bg-indigo-500/20 text-indigo-300" : "text-gray-400 hover:bg-gray-900 hover:text-gray-100"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-gray-900 p-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}