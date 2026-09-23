export default function SiteFooter() {
  return (
    <footer className="flex flex-col items-center gap-8 pt-16 pb-10">
      <a
        href="https://substack.com/@queencityhag"
        target="_blank"
        rel="noopener noreferrer"
        className="border-[2px] border-[var(--hag-blue)] rounded-full px-8 py-3 font-bold hover:bg-[var(--hag-blue)] hover:text-white transition-colors"
      >
        Get the Newsletter
      </a>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/hag-mascot.png"
        alt="Queen City Hag mascot"
        width={386}
        height={440}
        className="w-40 sm:w-48 h-auto"
      />
    </footer>
  );
}
