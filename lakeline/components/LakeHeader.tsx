import { format } from "date-fns";

interface Props {
  lakeName: string;
  state: string;
  fetchedAt: string;
  nextWindowSummary: string | null;
}

export default function LakeHeader({
  lakeName,
  state,
  fetchedAt,
  nextWindowSummary,
}: Props) {
  return (
    <header className="px-5 pt-6 pb-4">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-ink-mute">
            {state}
          </div>
          <h1 className="text-3xl font-medium tracking-tight text-ink leading-none mt-1">
            {lakeName}
          </h1>
        </div>
        <div className="text-right text-[11px] text-ink-mute uppercase tracking-widest">
          Updated
          <div className="text-ink-soft normal-case tracking-normal mt-0.5">
            {format(new Date(fetchedAt), "h:mm a")}
          </div>
        </div>
      </div>
      {nextWindowSummary ? (
        <div className="mt-3 text-sm text-ink-soft">{nextWindowSummary}</div>
      ) : null}
    </header>
  );
}
