import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full max-w-[1000px] mx-auto">
      <SiteHeader />

      <main className="max-w-2xl mx-auto px-4 sm:px-0 pb-20">
        <p className="font-heading text-4xl leading-relaxed">
          If a french tire company can tell you where to eat, I can make a
          list too.
        </p>
        <p className="font-heading text-4xl leading-relaxed mt-6">
          This is a Charlotte-native&apos;s guide to the best food and drinks
          in the Queen City and beyond. If you&apos;re looking for a great
          date night or a place to take your parents while they&apos;re in
          town, you can trust the hag to give it to you straight.
        </p>
        <p className="text-sm mt-8">
          All opinions expressed and restaurants visited by a real person who
          paid for their own food (meaning, honest, real reviews).
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
