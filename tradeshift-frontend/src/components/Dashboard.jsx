import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, ArrowPathIcon } from "@heroicons/react/24/solid";

const portfolioSummary = [
  { label: "Total Value", value: "$125,430", change: "+2.8%", positive: true },
  { label: "Daily P/L", value: "$1,120", change: "+0.9%", positive: true },
  { label: "Open Positions", value: "12", change: "2 new", positive: true },
  { label: "Win Rate", value: "64%", change: "-3.2%", positive: false },
];

const marketPerformance = [
  { name: "Mon", value: 112000 },
  { name: "Tue", value: 114500 },
  { name: "Wed", value: 113200 },
  { name: "Thu", value: 118400 },
  { name: "Fri", value: 119900 },
  { name: "Sat", value: 121300 },
  { name: "Sun", value: 125430 },
];

const recentTrades = [
  { id: "TS-8921", asset: "AAPL", type: "Buy", price: "$180.25", quantity: 15, status: "Completed" },
  { id: "TS-8920", asset: "ETH", type: "Sell", price: "$2,350.10", quantity: 1.2, status: "Completed" },
  { id: "TS-8919", asset: "TSLA", type: "Buy", price: "$242.80", quantity: 5, status: "Pending" },
  { id: "TS-8918", asset: "MSFT", type: "Sell", price: "$412.40", quantity: 8, status: "Completed" },
];

const watchlist = [
  { symbol: "BTC", name: "Bitcoin", price: "$63,420", change: "+3.1%", positive: true },
  { symbol: "ETH", name: "Ethereum", price: "$3,215", change: "-1.2%", positive: false },
  { symbol: "NVDA", name: "NVIDIA", price: "$870.65", change: "+6.5%", positive: true },
  { symbol: "GOOGL", name: "Alphabet", price: "$153.18", change: "-0.8%", positive: false },
];

export default function Dashboard() {
  const cardIcon = useMemo(() => ({
    positive: <ArrowTrendingUpIcon className="h-6 w-6" />,
    negative: <ArrowTrendingDownIcon className="h-6 w-6" />,
    neutral: <ArrowPathIcon className="h-6 w-6" />,
  }), []);

  return (
    <div className="grid grid-cols-1 gap-6 p-6 text-gray-100 lg:grid-cols-[260px_1fr]" role="main">
      <aside className="space-y-6 rounded-2xl bg-gradient-to-b from-gray-900 to-gray-800 p-6 shadow-xl">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold">TradeShift Dashboard</h1>
          <p className="text-sm text-gray-400">Track your performance and monitor market movements in real-time.</p>
        </header>

        <section aria-label="Portfolio Summary" className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">Portfolio Summary</h2>
          <div className="space-y-3">
            {portfolioSummary.map(({ label, value, change, positive }) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-xl bg-gray-900 px-4 py-3 shadow-inner ring-1 ring-gray-800"
              >
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
                  <p className="text-lg font-semibold text-white">{value}</p>
                </div>
                <span
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                    positive ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                  }`}
                >
                  {positive ? cardIcon.positive : cardIcon.negative}
                  {change}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section aria-label="Watchlist" className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">Watchlist</h2>
          <ul className="space-y-3">
            {watchlist.map(({ symbol, name, price, change, positive }) => (
              <li
                key={symbol}
                className="flex items-center justify-between rounded-xl bg-gray-900 px-4 py-3 ring-1 ring-gray-800"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{symbol}</p>
                  <p className="text-xs text-gray-400">{name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{price}</p>
                  <span className={`text-xs ${positive ? "text-emerald-400" : "text-rose-400"}`}>{change}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </aside>

      <section className="space-y-6 rounded-2xl bg-gray-900 p-6 shadow-xl ring-1 ring-gray-800" aria-label="Performance Overview">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-white">Portfolio Performance</h2>
            <p className="text-sm text-gray-400">Last 7 days • Updated 2 minutes ago</p>
          </div>
          <div className="flex gap-3 text-sm">
            <button className="rounded-full bg-gray-800 px-4 py-2 font-medium text-gray-300 hover:bg-gray-700">1D</button>
            <button className="rounded-full bg-indigo-600 px-4 py-2 font-medium text-white shadow-lg">7D</button>
            <button className="rounded-full bg-gray-800 px-4 py-2 font-medium text-gray-300 hover:bg-gray-700">1M</button>
            <button className="rounded-full bg-gray-800 px-4 py-2 font-medium text-gray-300 hover:bg-gray-700">3M</button>
          </div>
        </div>

        <div className="h-72 w-full overflow-hidden rounded-2xl bg-gray-950/80 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={marketPerformance}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#4b5563" tickLine={false} axisLine={false} />
              <YAxis stroke="#4b5563" tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <CartesianGrid stroke="#1f2937" strokeDasharray="4 8" />
              <Tooltip contentStyle={{ backgroundColor: "#111827", borderRadius: "0.75rem", border: "1px solid #1f2937" }} />
              <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <section aria-label="Recent Trades" className="space-y-4">
          <header className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">Recent Trades</h3>
              <p className="text-sm text-gray-400">Stay on top of the latest executions across your portfolios.</p>
            </div>
            <button className="rounded-full bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">View all</button>
          </header>

          <div className="overflow-hidden rounded-2xl border border-gray-800">
            <table className="min-w-full divide-y divide-gray-800 text-sm">
              <thead className="bg-gray-800/60 text-left text-xs uppercase tracking-wide text-gray-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Trade ID</th>
                  <th className="px-4 py-3 font-medium">Asset</th>
                  <th className="px-4 py-3 font-medium">Side</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Quantity</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {recentTrades.map(({ id, asset, type, price, quantity, status }) => (
                  <tr key={id} className="hover:bg-gray-800/60 transition">
                    <td className="px-4 py-3 font-medium text-white">{id}</td>
                    <td className="px-4 py-3 text-gray-200">{asset}</td>
                    <td>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          type === "Buy" ? "bg-emerald-500/10 text-emerald-400" : "bg-sky-500/10 text-sky-400"
                        }`}
                      >
                        {type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-200">{price}</td>
                    <td className="px-4 py-3 text-gray-200">{quantity}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          status === "Completed" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </div>
  );
}
