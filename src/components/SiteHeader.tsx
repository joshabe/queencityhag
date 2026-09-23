import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="relative pt-20 sm:pt-10 pb-8 px-4 flex justify-center">
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6 flex items-center gap-4">
        <a
          href="https://substack.com/@queencityhag"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Queen City Hag on Substack"
          className="hover:opacity-70 transition-opacity"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="2" y="3" width="20" height="3" fill="var(--hag-blue)" />
            <rect x="2" y="8" width="20" height="3" fill="var(--hag-blue)" />
            <path d="M2 13H22V21L12 15.5L2 21V13Z" fill="var(--hag-blue)" />
          </svg>
        </a>

        <a
          href="http://instagram.com/queencityhag"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Queen City Hag on Instagram"
          className="hover:opacity-70 transition-opacity"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="2"
              width="20"
              height="20"
              rx="5"
              stroke="var(--hag-blue)"
              strokeWidth="2"
            />
            <circle
              cx="12"
              cy="12"
              r="4.5"
              stroke="var(--hag-blue)"
              strokeWidth="2"
            />
            <circle cx="17.2" cy="6.8" r="1.2" fill="var(--hag-blue)" />
          </svg>
        </a>
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        <Link href="/" className="inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-wordmark.png"
            alt="Queen City Hag"
            width={931}
            height={157}
            className="w-72 sm:w-96 h-auto"
          />
        </Link>
        <p className="max-w-sm text-sm">The Official List®</p>
      </div>
    </header>
  );
}
