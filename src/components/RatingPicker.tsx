"use client";

type RatingType = "fire" | "knife" | null;

export default function RatingPicker({
  ratingType,
  ratingCount,
  onChange,
}: {
  ratingType: RatingType;
  ratingCount: number | null;
  onChange: (type: RatingType, count: number | null) => void;
}) {
  function handleClick(type: "fire" | "knife", count: number) {
    if (ratingType === type && ratingCount === count) {
      onChange(null, null);
    } else {
      onChange(type, count);
    }
  }

  function renderRow(type: "fire" | "knife", emoji: string, label: string) {
    const active = ratingType === type;
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700 w-12">{label}</span>
        <div className="flex gap-1">
          {[1, 2, 3].map((n) => {
            const filled = active && ratingCount !== null && n <= ratingCount;
            return (
              <button
                key={n}
                type="button"
                onClick={() => handleClick(type, n)}
                className={`w-9 h-9 flex items-center justify-center rounded border text-lg transition-opacity ${
                  filled
                    ? "border-gray-900 bg-gray-100 opacity-100"
                    : "border-gray-300 opacity-30 hover:opacity-60"
                }`}
                title={`${n} ${label}`}
              >
                {emoji}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {renderRow("fire", "🔥", "Fire")}
      {renderRow("knife", "🔪", "Knife")}
      {ratingType && (
        <button
          type="button"
          onClick={() => onChange(null, null)}
          className="text-xs text-gray-500 hover:text-gray-800 underline"
        >
          Clear rating
        </button>
      )}
    </div>
  );
}
