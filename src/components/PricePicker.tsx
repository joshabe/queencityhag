"use client";

export default function PricePicker({
  priceCount,
  onChange,
}: {
  priceCount: number | null;
  onChange: (count: number | null) => void;
}) {
  function handleClick(count: number) {
    onChange(priceCount === count ? null : count);
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((n) => {
          const filled = priceCount !== null && n <= priceCount;
          return (
            <button
              key={n}
              type="button"
              onClick={() => handleClick(n)}
              className={`w-9 h-9 flex items-center justify-center rounded border text-lg font-bold transition-opacity ${
                filled
                  ? "border-gray-900 bg-gray-100 opacity-100"
                  : "border-gray-300 opacity-30 hover:opacity-60"
              }`}
              title={`${n} $`}
            >
              $
            </button>
          );
        })}
      </div>
      {priceCount !== null && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="text-xs text-gray-500 hover:text-gray-800 underline"
        >
          Clear price
        </button>
      )}
    </div>
  );
}
