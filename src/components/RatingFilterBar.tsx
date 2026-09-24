import Link from "next/link";
import CityFilterDropdown from "@/components/CityFilterDropdown";
import CityFilterMobileDropdown from "@/components/CityFilterMobileDropdown";
import PriceFilterDropdown from "@/components/PriceFilterDropdown";
import GreatForFilterDropdown from "@/components/GreatForFilterDropdown";

function buildHref(
  price: string | undefined,
  city: string | undefined,
  greatFor: string[]
) {
  const params = new URLSearchParams();
  if (price) params.set("price", price);
  if (city) params.set("city", city);
  if (greatFor.length > 0) params.set("greatFor", greatFor.join(","));
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
  greatFor,
  greatForTags,
}: {
  current?: string;
  city: string;
  cities: string[];
  greatFor: string[];
  greatForTags: string[];
}) {
  const priceValues = [1, 2, 3, 4].map((n) => String(n));

  return (
    <div className="mb-10 border-t-[2px] border-b-[2px] border-[var(--hag-blue)] py-4">
      <div className="flex items-center flex-wrap gap-2 sm:gap-4">
        <div className="shrink-0 sm:hidden">
          <CityFilterMobileDropdown cities={cities} current={city} />
        </div>
        <div className="hidden sm:block shrink-0">
          <CityFilterDropdown cities={cities} current={city} />
        </div>

        <div className="shrink-0">
          <GreatForFilterDropdown current={greatFor} tags={greatForTags} />
        </div>

        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          {/* Mobile: price dropdown */}
          <div className="sm:hidden shrink-0">
            <PriceFilterDropdown />
          </div>

          {/* Desktop/tablet: connected pill set */}
          <div className="hidden sm:inline-flex min-w-0 max-w-full overflow-x-auto border-[2px] border-[var(--hag-blue)]">
            <Link
              href={buildHref(undefined, city, greatFor)}
              className={segmentClass(!current, true)}
            >
              All
            </Link>
            {priceValues.map((value, i) => (
              <Link
                key={value}
                href={buildHref(value, city, greatFor)}
                className={segmentClass(current === value, false)}
              >
                {"$".repeat(i + 1)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
