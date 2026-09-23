import Link from "next/link";
import CityFilterDropdown from "@/components/CityFilterDropdown";
import RatingFilterDropdown from "@/components/RatingFilterDropdown";

function buildHref(rating: string | undefined, city: string | undefined) {
  const params = new URLSearchParams();
  if (rating) params.set("rating", rating);
  if (city) params.set("city", city);
  const query = params.toString();
  return query ? `/?${query}` : "/";
}

function segmentClass(active: boolean, first: boolean) {
  return `px-3 py-1.5 font-bold text-sm whitespace-nowrap ${first ? "" : "border-l-[2px] border-[var(--hag-blue)]"} ${
    active ? "bg-[var(--hag-blue)] text-white" : "hover:bg-blue-50"
  }`;
}

export default function RatingFilterBar({
  current,
  city,
  cities,
}: {
  current?: string;
  city?: string;
  cities: string[];
}) {
  const fireValues = [1, 2, 3].map((n) => `fire-${n}`);
  const knifeValues = [1, 2, 3].map((n) => `knife-${n}`);

  return (
    <div className="mb-10 border-t-[2px] border-b-[2px] border-[var(--hag-blue)] py-4">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <div className="shrink-0 self-stretch flex items-center pr-2 sm:pr-4 border-r-[2px] border-[var(--hag-blue)]">
            <span className="font-bold text-sm whitespace-nowrap">
              FILTER
            </span>
          </div>

          {/* Mobile: rating dropdown */}
          <div className="sm:hidden flex-1 min-w-0">
            <RatingFilterDropdown />
          </div>

          {/* Desktop/tablet: connected pill set */}
          <div className="hidden sm:inline-flex min-w-0 max-w-full overflow-x-auto border-[2px] border-[var(--hag-blue)]">
            <Link
              href={buildHref(undefined, city)}
              className={segmentClass(!current, true)}
            >
              All
            </Link>
            {fireValues.map((value, i) => (
              <Link
                key={value}
                href={buildHref(value, city)}
                className={segmentClass(current === value, false)}
              >
                {"🔥".repeat(i + 1)}
              </Link>
            ))}
            {knifeValues.map((value, i) => (
              <Link
                key={value}
                href={buildHref(value, city)}
                className={segmentClass(current === value, false)}
              >
                {"🔪".repeat(i + 1)}
              </Link>
            ))}
          </div>
        </div>

        <div className="shrink-0">
          <CityFilterDropdown cities={cities} />
        </div>
      </div>
    </div>
  );
}
