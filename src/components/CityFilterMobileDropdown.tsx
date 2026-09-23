"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { groupByState } from "@/lib/cityGroups";

export default function CityFilterMobileDropdown({
  cities,
  current,
}: {
  cities: string[];
  current: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groups = groupByState(cities);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("city", e.target.value);
    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  }

  return (
    <div className="relative inline-flex items-center min-w-0">
      <select
        value={current}
        onChange={handleChange}
        className="w-full appearance-none border-[2px] border-[var(--hag-blue)] pl-3 pr-8 py-1.5 font-bold text-sm leading-5 bg-[#f2eee9]"
      >
        {groups.map((group) => (
          <optgroup key={group.state} label={group.name}>
            {group.cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-2 w-3 h-3"
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M2.5 4.5L6 8L9.5 4.5"
          stroke="var(--hag-blue)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
