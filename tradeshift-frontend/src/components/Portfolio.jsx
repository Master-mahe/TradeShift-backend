import { useEffect, useMemo, useState } from "react";
import { Dialog } from "@headlessui/react";
import { ExclamationTriangleIcon, CurrencyDollarIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import api from "../services/api";

const columnDefinitions = [
  { key: "asset", label: "Asset" },
  { key: "symbol", label: "Symbol" },
  { key: "quantity", label: "Quantity" },
  { key: "avgPrice", label: "Avg. Price" },
  { key: "marketPrice", label: "Market Price" },
  { key: "value", label: "Total Value" },
  { key: "pnl", label: "PnL" },
];

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      setIsLoading(true);
      setError("");
      try {
        const { data } = await api.get("/portfolio");
        setPortfolio(data ?? []);
      } catch (err) {
        setError("Unable to load portfolio data right now.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const totals = useMemo(() => {
    if (!portfolio.length) {
      return { marketValue: 0, costBasis: 0, pnl: 0 };
    }

    return portfolio.reduce(
      (acc, position) => {
        const marketValue = Number(position.value) || 0;
        const costBasis = Number(position.quantity) * Number(position.avgPrice || 0);
        const pnl = Number(position.pnl) || marketValue - costBasis;

        return {
          marketValue: acc.marketValue + marketValue,
          costBasis: acc.costBasis + costBasis,
          pnl: acc.pnl + pnl,
        };
      },
      { marketValue: 0, costBasis: 0, pnl: 0 },
    );
  }, [portfolio]);

  return (
    <div className="space-y-6 p-6 text-gray-100" role="main">
      <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-semibold">Portfolio Overview</h1>
          <p className="text-sm text-gray-400">Track allocations, profitability, and exposure across your holdings.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700"
          >
            <ArrowPathIcon className="h-5 w-5" />
            Refresh
          </button>
          <button className="flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
            <CurrencyDollarIcon className="h-5 w-5" />
            New Allocation
          </button>
        </div>
      </header>

      <section aria-label="Portfolio Totals" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard title="Market Value" value={`$${totals.marketValue.toLocaleString()}`} trend={totals.pnl >= 0 ? "positive" : "negative"} />
        <SummaryCard title="Cost Basis" value={`$${totals.costBasis.toLocaleString()}`} trend="neutral" />
        <SummaryCard
          title="Unrealized PnL"
          value={`${totals.pnl >= 0 ? "+" : "-"}$${Math.abs(totals.pnl).toLocaleString()}`}
          trend={totals.pnl >= 0 ? "positive" : "negative"}
        />
      </section>

      <section
        aria-label="Positions Table"
        className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-gray-800 p-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Positions</h2>
            <p className="text-sm text-gray-400">Click any row to inspect details.</p>
          </div>
          {isLoading && (
            <span className="flex items-center gap-2 text-xs font-medium text-indigo-400">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden>
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                />
              </svg>
              Syncing data...
            </span>
          )}
        </div>

        {error ? (
          <div className="flex items-center gap-3 bg-rose-500/10 px-4 py-6 text-rose-300">
            <ExclamationTriangleIcon className="h-6 w-6" />
            <div>
              <p className="font-medium">Something went wrong</p>
              <p className="text-sm text-rose-200/80">{error}</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800 text-sm">
              <thead className="bg-gray-800/60 text-left text-xs uppercase tracking-wide text-gray-400">
                <tr>
                  {columnDefinitions.map(({ key, label }) => (
                    <th key={key} className="px-4 py-3 font-medium">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60 text-gray-200">
                {portfolio.length === 0 ? (
                  <tr>
                    <td colSpan={columnDefinitions.length} className="px-4 py-8 text-center text-gray-500">
                      {isLoading ? "Loading positions..." : "No positions found."}
                    </td>
                  </tr>
                ) : (
                  portfolio.map((position) => (
                    <tr
                      key={position.id ?? position.symbol}
                      className="cursor-pointer transition hover:bg-gray-800/60"
                      onClick={() => setSelectedPosition(position)}
                    >
                      {columnDefinitions.map(({ key }) => (
                        <td key={key} className="px-4 py-3">
                          {formatCellValue(key, position[key])}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <PositionDrawer position={selectedPosition} onClose={() => setSelectedPosition(null)} />
    </div>
  );
}

function SummaryCard({ title, value, trend }) {
  const trendClasses = {
    positive: "bg-emerald-500/10 text-emerald-300",
    negative: "bg-rose-500/10 text-rose-300",
    neutral: "bg-slate-500/10 text-slate-300",
  };

  return (
    <article className="rounded-2xl bg-gray-900 p-5 shadow-lg ring-1 ring-gray-800">
      <p className="text-xs uppercase tracking-wide text-gray-500">{title}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
      <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${trendClasses[trend]}`}>
        {trend === "positive" && "▲"}
        {trend === "negative" && "▼"}
        {trend === "neutral" && "•"} Today
      </span>
    </article>
  );
}

function PositionDrawer({ position, onClose }) {
  return (
    <Dialog
      open={Boolean(position)}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden />

      <div className="fixed inset-y-0 right-0 w-full max-w-md overflow-auto bg-gray-900 p-6 shadow-2xl ring-1 ring-gray-800">
        <Dialog.Panel className="space-y-6">
          <Dialog.Title className="text-xl font-semibold text-white">Position Details</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-400">
            Detailed breakdown of the selected asset, including risk metrics and trade history.
          </Dialog.Description>

          {position ? (
            <div className="space-y-4 text-sm text-gray-200">
              {columnDefinitions.map(({ key, label }) => (
                <div key={key} className="flex justify-between rounded-lg bg-gray-800/60 px-4 py-3 text-gray-300">
                  <span className="font-medium text-gray-400">{label}</span>
                  <span className="text-white">{formatCellValue(key, position[key])}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No position selected.</p>
          )}

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-full bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700"
            >
              Close
            </button>
            <button className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
              Manage Position
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

function formatCellValue(key, value) {
  if (value == null) {
    return "—";
  }

  if (key === "quantity") {
    return Number(value).toLocaleString();
  }

  if (key === "avgPrice" || key === "marketPrice" || key === "value" || key === "pnl") {
    const numberValue = Number(value);
    if (Number.isNaN(numberValue)) {
      return value;
    }

    const formatted = `$${Math.abs(numberValue).toLocaleString()}`;
    if (key === "pnl") {
      return `${numberValue >= 0 ? "+" : "-"}${formatted}`;
    }

    return formatted;
  }

  return value;
}
