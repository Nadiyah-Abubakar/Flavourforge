import type { HalaalStatus } from "@/data/recipes";

const config: Record<HalaalStatus, { label: string; className: string }> = {
  "naturally-halaal": { label: "HALAAL", className: "bg-halaal text-halaal-foreground" },
  "halaal-with-subs": { label: "HALAAL + Subs", className: "bg-halaal text-halaal-foreground" },
  "verify": { label: "Verify", className: "bg-secondary text-secondary-foreground" },
};

const HalaalBadge = ({ status }: { status: HalaalStatus }) => {
  const { label, className } = config[status];
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide ${className}`}>
      {label}
    </span>
  );
};

export default HalaalBadge;
