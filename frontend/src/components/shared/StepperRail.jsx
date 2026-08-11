import { motion } from "framer-motion";
import { Check } from "lucide-react";

/**
 * Connected stepper rail — a vertical line runs through every section node.
 * The line fills (green) in proportion to how many sections are complete,
 * so the rail itself doubles as the progress bar. Each node becomes a
 * checkmark once its section is done, and the active section gets a
 * highlighted ring.
 *
 * sections: [{ id, label, icon: LucideIcon, done: boolean }]
 */
const StepperRail = ({ sections, activeId, onSelect, orientation = "vertical" }) => {
  const total = sections.length;
  const doneCount = sections.filter((s) => s.done).length;
  const fillPct = total > 0 ? (doneCount / total) * 100 : 0;

  if (orientation === "horizontal") {
    return (
      <div className="relative flex items-center gap-0 overflow-x-auto pb-1">
        <div className="absolute left-0 right-0 top-[15px] h-[2px] bg-[#20222c] rounded-full" />
        <motion.div
          className="absolute left-0 top-[15px] h-[2px] bg-emerald-500 rounded-full"
          initial={false}
          animate={{ width: `${fillPct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        {sections.map((s) => {
          const isActive = s.id === activeId;
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelect(s.id)}
              className="relative z-10 flex flex-col items-center gap-1.5 px-3.5 shrink-0 group"
            >
              <span
                className={`flex items-center justify-center w-[30px] h-[30px] rounded-full border-2 transition-colors ${
                  s.done
                    ? "bg-emerald-500 border-emerald-500 text-[#0a0b10]"
                    : isActive
                    ? "bg-[#0e0f16] border-indigo-400 text-indigo-300 ring-4 ring-indigo-500/15"
                    : "bg-[#0e0f16] border-[#20222c] text-slate-600 group-hover:border-slate-500"
                }`}
              >
                {s.done ? <Check size={14} strokeWidth={3} /> : Icon ? <Icon size={13} /> : null}
              </span>
              <span
                className={`text-[10.5px] font-semibold whitespace-nowrap ${
                  isActive ? "text-indigo-300" : s.done ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-0.5">
      {/* track */}
      <div
        className="absolute left-[15px] top-[15px] bottom-[15px] w-[2px] bg-[#20222c] rounded-full"
        aria-hidden
      />
      {/* fill */}
      <motion.div
        className="absolute left-[15px] top-[15px] w-[2px] bg-emerald-500 rounded-full origin-top"
        initial={false}
        animate={{ height: `calc(${fillPct}% - ${fillPct > 0 ? 15 : 0}px)` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ maxHeight: "calc(100% - 30px)" }}
        aria-hidden
      />

      {sections.map((s) => {
        const isActive = s.id === activeId;
        const Icon = s.icon;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(s.id)}
            className={`relative z-10 flex items-center gap-2.5 px-2 py-2 rounded-lg text-xs font-semibold transition-colors ${
              isActive ? "text-indigo-300" : s.done ? "text-slate-300" : "text-slate-500"
            } hover:bg-[#12141c]`}
          >
            <span
              className={`flex items-center justify-center w-[30px] h-[30px] rounded-full border-2 shrink-0 transition-colors ${
                s.done
                  ? "bg-emerald-500 border-emerald-500 text-[#0a0b10]"
                  : isActive
                  ? "bg-[#0e0f16] border-indigo-400 text-indigo-300 ring-4 ring-indigo-500/15"
                  : "bg-[#0e0f16] border-[#20222c] text-slate-600"
              }`}
            >
              {s.done ? <Check size={14} strokeWidth={3} /> : Icon ? <Icon size={13} /> : null}
            </span>
            <span className="whitespace-nowrap">{s.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default StepperRail;