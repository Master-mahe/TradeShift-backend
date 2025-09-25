import { NavLink } from "react-router-dom";
import { HomeModernIcon, BriefcaseIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: HomeModernIcon },
  { to: "/portfolio", label: "Portfolio", icon: BriefcaseIcon },
  { to: "/trade", label: "Trade", icon: ArrowsRightLeftIcon },
];

export default function Sidebar({ className = "" }) {
  return (
    <aside className={`flex min-h-full w-72 flex-col border-r border-gray-900 bg-gray-950 px-5 py-8 text-gray-200 ${className}`}>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-widest text-indigo-400">Tradeshift</p>
        <h1 className="text-2xl font-semibold text-white">Control Center</h1>
      </div>

      <nav className="mt-10 space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-600/20 text-indigo-300 ring-1 ring-inset ring-indigo-500"
                  : "text-gray-400 hover:bg-gray-900 hover:text-gray-100"
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-3 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-indigo-700/10 p-4 text-sm text-gray-300">
        <p className="font-semibold text-white">Daily insight</p>
        <p className="text-xs leading-relaxed text-indigo-200">
          Keep an eye on risk exposure—volatility is up 8% this week across your tech holdings.
        </p>
      </div>
    </aside>
  );
}
