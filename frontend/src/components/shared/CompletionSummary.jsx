import CircularGauge from "../CircularGauge";

const tierFor = (score) => {
  if (score >= 90) return { label: "Great", color: "text-emerald-400" };
  if (score >= 70) return { label: "Good", color: "text-indigo-400" };
  if (score >= 40) return { label: "Fair", color: "text-amber-400" };
  return { label: "Needs work", color: "text-rose-400" };
};

/**
 * Ring + live readout, replacing a flat "X% complete" bar.
 * Names the actual missing sections instead of just a number.
 */
const CompletionSummary = ({ label = "Strength", score = 0, missing = [] }) => {
  const tier = tierFor(score);

  return (
    <div className="flex items-center gap-4 bg-[#12141c]/80 backdrop-blur-xl border border-[#20222c] rounded-xl px-4 py-3.5">
      <CircularGauge score={score} max={100} size={64} strokeWidth={6} />
      <div className="min-w-0">
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
          {label} <span className={`font-bold ${tier.color}`}>{tier.label}</span>
        </p>
        {missing.length > 0 ? (
          <p className="text-[12.5px] text-slate-500 mt-0.5 leading-snug">
            Still needs:{" "}
            <span className="text-slate-300 font-medium">{missing.join(", ")}</span>
          </p>
        ) : (
          <p className="text-[12.5px] text-emerald-400/90 mt-0.5 font-medium">
            All sections complete
          </p>
        )}
      </div>
    </div>
  );
};

export default CompletionSummary;
