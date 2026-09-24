"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function GreatForFilterDropdown({
  current,
  tags,
}: {
  current: string[];
  tags: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  function toggle(tag: string) {
    const next = current.includes(tag)
      ? current.filter((t) => t !== tag)
      : [...current, tag];
    const params = new URLSearchParams(searchParams.toString());
    if (next.length > 0) {
      params.set("greatFor", next.join(","));
    } else {
      params.delete("greatFor");
    }
    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  }

  function clear() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("greatFor");
    const query = params.toString();
    router.push(query ? `/?${query}` : "/");
  }

  const label =
    current.length === 0
      ? "Great for"
      : current.length === 1
        ? current[0]
        : `Great for (${current.length})`;

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 border-[2px] border-[var(--hag-blue)] pl-3 pr-2 py-1.5 font-bold text-sm leading-5 bg-[#f2eee9]"
      >
        {label}
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
        <div className="absolute left-0 top-full mt-2 z-10 min-w-full w-max border-[2px] border-[var(--hag-blue)] bg-[#f2eee9]">
          {tags.length === 0 && (
            <p className="px-3 py-1.5 text-sm whitespace-nowrap opacity-60">
              No tags yet
            </p>
          )}
          {tags.map((tag) => {
            const checked = current.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggle(tag)}
                className={`flex items-center gap-2 w-full text-left px-3 py-1.5 text-sm whitespace-nowrap ${
                  checked ? "bg-[var(--hag-blue)] text-white" : "hover:bg-blue-50"
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center w-3.5 h-3.5 border-[2px] shrink-0 ${
                    checked
                      ? "border-white bg-white"
                      : "border-[var(--hag-blue)]"
                  }`}
                >
                  {checked && (
                    <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none">
                      <path
                        d="M2.5 6L5 8.5L9.5 3.5"
                        stroke="var(--hag-blue)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                {tag}
              </button>
            );
          })}
          {current.length > 0 && (
            <button
              type="button"
              onClick={clear}
              className="block w-full text-left px-3 py-1.5 text-sm border-t-[2px] border-[var(--hag-blue)] hover:bg-blue-50"
            >
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
}
