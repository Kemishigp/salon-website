import Hero from '../src/components/Hero';
import Team from '../src/components/Team';
import About from "../src/components/About"
// import Contact from "./src/components/"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white">
      {/* 1. Hero Section with Background Image */}
      <section id="hero" className="relative h-screen w-full">
        <Hero />
      </section>

      {/* 2. Team Section */}
      <section id="About" className="py-0 bg-white">
        <About />
      </section>

      {/* 3. Products Section */}
      <section id="Contact" className="py-0 bg-white">
        <Team />
      </section>
    </main>
  );
}