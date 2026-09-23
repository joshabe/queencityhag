"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { groupByState } from "@/lib/cityGroups";

export default function CityFilterDropdown({
  cities,
  current,
}: {
  cities: string[];
  current: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const groups = groupByState(cities);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function select(city: string) {
    setOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    params.set("city", city);
    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  }

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 border-[2px] border-[var(--hag-blue)] pl-3 pr-2 py-1.5 font-bold text-sm leading-5 bg-[#f2eee9]"
      >
        {current}
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
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
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-10 min-w-full w-max border-[2px] border-[var(--hag-blue)] bg-[#f2eee9]">
          {groups.map((group, i) => (
            <div key={group.state}>
              <p
                className={`px-3 pt-2 pb-1 text-xs font-bold uppercase ${
                  i > 0 ? "border-t-[2px] border-[var(--hag-blue)]" : ""
                }`}
              >
                {group.name}
              </p>
              {group.cities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => select(city)}
                  className={`block w-full text-left pl-[24px] pr-3 py-1.5 text-sm whitespace-nowrap ${
                    current === city
                      ? "bg-[var(--hag-blue)] text-white"
                      : "hover:bg-blue-50"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
