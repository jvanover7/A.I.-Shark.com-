interface Props {
  active: "surf" | "fish" | "map" | "saved";
}

const TABS: { id: Props["active"]; label: string; icon: React.ReactNode }[] = [
  {
    id: "surf",
    label: "Surf",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 14c3-3 5-3 8 0s5 3 8 0" />
        <path d="M3 19c3-3 5-3 8 0s5 3 8 0" />
      </svg>
    ),
  },
  {
    id: "fish",
    label: "Fish",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12c4-6 12-6 16 0-4 6-12 6-16 0Z" />
        <path d="M19 12l3-3v6l-3-3Z" />
        <circle cx="9" cy="11" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "map",
    label: "Map",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6Z" />
        <path d="M9 4v16M15 6v16" />
      </svg>
    ),
  },
  {
    id: "saved",
    label: "Saved",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4h12v17l-6-4-6 4V4Z" />
      </svg>
    ),
  },
];

export default function BottomNav({ active }: Props) {
  return (
    <nav
      className="sticky bottom-0 bg-paper border-t border-rule"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 8px)" }}
    >
      <ul className="grid grid-cols-4">
        {TABS.map((t) => {
          const isActive = t.id === active;
          return (
            <li key={t.id}>
              <button
                className={`w-full py-2 flex flex-col items-center gap-1 ${
                  isActive ? "text-ink" : "text-ink-mute"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="w-6 h-6 block">{t.icon}</span>
                <span className="text-[10px] uppercase tracking-widest">
                  {t.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
