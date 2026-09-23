"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function CityFilterDropdown({ cities }: { cities: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("city", e.target.value);
    } else {
      params.delete("city");
    }
    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  }

  return (
    <div className="relative inline-flex items-center">
      <select
        value={searchParams.get("city") ?? ""}
        onChange={handleChange}
        className="appearance-none border-[2px] border-[var(--hag-blue)] pl-3 pr-8 py-1.5 font-bold text-sm leading-5 bg-[#f2eee9]"
      >
        <option value="">All cities</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
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
