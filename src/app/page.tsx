import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowWeWork from "@/components/HowWeWork";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Hero/>
      {/* Features Section */}
      <Features/>
      {/* How we work Page */}
      <HowWeWork/>
    </main>
  );
}
