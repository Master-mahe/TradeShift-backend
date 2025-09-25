import { useEffect, useMemo, useRef, useState } from "react";
import api from "../services/api";

const tradeSides = ["Buy", "Sell"];
const orderTypes = ["Market", "Limit", "Stop"];

export default function TradeForm() {
  const formRef = useRef(null);
  const [formState, setFormState] = useState({
    asset: "",
    symbol: "",
    side: tradeSides[0],
    orderType: orderTypes[0],
    quantity: "",
    limitPrice: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isLimitOrder = formState.orderType === "Limit" || formState.orderType === "Stop";
  const limitPriceLabel = isLimitOrder ? "Limit / stop price" : "Reference price (optional)";
  const isSubmitDisabled = useMemo(() => {
    if (!formState.asset || !formState.symbol) return true;
    if (!Number(formState.quantity)) return true;
    if (isLimitOrder && !Number(formState.limitPrice)) return true;
    return false;
  }, [formState, isLimitOrder]);

  useEffect(() => {
    if (!isLimitOrder) {
      setFormState((prev) => ({ ...prev, limitPrice: "" }));
    }
  }, [isLimitOrder]);

  const handleChange = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
    setError("");
    setSuccessMessage("");
  };

  const handleTrade = async () => {
    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const payload = {
        ...formState,
        quantity: Number(formState.quantity),
        limitPrice: formState.limitPrice ? Number(formState.limitPrice) : undefined,
      };

      await api.post("/trade", payload);
      setSuccessMessage("Trade submitted successfully.");
      setFormState((prev) => ({
        ...prev,
        asset: "",
        symbol: "",
        quantity: "",
        limitPrice: "",
        notes: "",
      }));
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      setError("Trade submission failed. Please verify your inputs and try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={formRef} className="space-y-6 text-gray-100" role="main">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Submit a Trade</h1>
        <p className="text-sm text-gray-400">Configure and review your order details before sending it to market.</p>
      </header>

      {error && (
        <Alert variant="error" title="Submission error" description={error} />
      )}

      {successMessage && (
        <Alert variant="success" title="Trade submitted" description={successMessage} />
      )}

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6 rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField
              label="Asset name"
              placeholder="Apple Inc"
              value={formState.asset}
              onChange={(value) => handleChange("asset", value)}
            />
            <TextField
              label="Ticker symbol"
              placeholder="AAPL"
              value={formState.symbol}
              onChange={(value) => handleChange("symbol", value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <SelectField
              label="Direction"
              options={tradeSides}
              value={formState.side}
              onChange={(value) => handleChange("side", value)}
            />
            <SelectField
              label="Order type"
              options={orderTypes}
              value={formState.orderType}
              onChange={(value) => handleChange("orderType", value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <TextField
              label="Quantity"
              type="number"
              min="0"
              placeholder="100"
              value={formState.quantity}
              onChange={(value) => handleChange("quantity", value)}
            />

            <TextField
              label={limitPriceLabel}
              type="number"
              min="0"
              placeholder="180.35"
              value={formState.limitPrice}
              onChange={(value) => handleChange("limitPrice", value)}
              disabled={!isLimitOrder}
            />
          </div>

          <TextAreaField
            label="Order notes"
            placeholder="Add optional execution notes or trade rationale"
            rows={4}
            value={formState.notes}
            onChange={(value) => handleChange("notes", value)}
          />
        </div>

        <AsideSummary formState={formState} isSubmitDisabled={isSubmitDisabled} onSubmit={handleTrade} isSubmitting={isSubmitting} />
      </section>
    </div>
  );
}

function TextField({ label, onChange, value, type = "text", placeholder = "", disabled = false, min }) {
  return (
    <label className="block text-sm">
      <span className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</span>
      <input
        className="mt-2 w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:cursor-not-allowed disabled:opacity-60"
        type={type}
        value={value}
        placeholder={placeholder}
        min={min}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
      />
    </label>
  );
}

function TextAreaField({ label, onChange, value, placeholder = "", rows = 3 }) {
  return (
    <label className="block text-sm">
      <span className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</span>
      <textarea
        className="mt-2 w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function SelectField({ label, options, value, onChange }) {
  return (
    <label className="block text-sm">
      <span className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</span>
      <select
        className="mt-2 w-full rounded-xl border border-gray-800 bg-gray-950 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function AsideSummary({ formState, isSubmitDisabled, onSubmit, isSubmitting }) {
  const quantity = Number(formState.quantity) || 0;
  const limitPrice = Number(formState.limitPrice) || 0;
  const notional = quantity * (formState.orderType === "Market" ? 187.42 : limitPrice);

  return (
    <aside className="flex flex-col gap-6 rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-xl">
      <div>
        <h2 className="text-lg font-semibold text-white">Order summary</h2>
        <p className="text-xs text-gray-400">Double-check execution parameters before submission.</p>
      </div>

      <dl className="space-y-3 text-sm text-gray-300">
        <SummaryRow label="Asset" value={formState.asset || "—"} />
        <SummaryRow label="Symbol" value={formState.symbol || "—"} />
        <SummaryRow label="Side" value={formState.side} />
        <SummaryRow label="Order type" value={formState.orderType} />
        <SummaryRow label="Quantity" value={quantity ? quantity.toLocaleString() : "—"} />
        {formState.orderType !== "Market" && (
          <SummaryRow label="Limit price" value={limitPrice ? `$${limitPrice.toLocaleString()}` : "—"} />
        )}
        <SummaryRow
          label="Approx. notional"
          value={notional ? `$${notional.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : "—"}
        />
      </dl>

      <button
        className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        onClick={onSubmit}
        disabled={isSubmitDisabled || isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit trade"}
      </button>
    </aside>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-950 px-4 py-3">
      <span className="text-xs uppercase tracking-wide text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-100">{value}</span>
    </div>
  );
}

function Alert({ variant, title, description }) {
  const styles = variant === "error"
    ? "bg-rose-500/10 text-rose-200"
    : "bg-emerald-500/10 text-emerald-200";

  return (
    <div className={`rounded-2xl border border-opacity-20 px-4 py-3 text-sm shadow-inner ${styles}`}>
      <p className="font-semibold">{title}</p>
      <p className="text-xs text-white/70">{description}</p>
    </div>
  );
}
