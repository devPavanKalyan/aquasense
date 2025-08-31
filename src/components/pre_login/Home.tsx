// pages/Home.tsx
import React from "react";
import { refs } from "../../utils/refs";
import ContactUs from "./ContactUs";
import Features from "./Features";
import CTASection from "./home/CTASection";
import HeroSection from "./home/HeroSection";
import SmartSolutions from "./home/SmartSolutions";
import Overview from "./Overview";
import Support from "./Support";

const Home: React.FC = () => {
  return (
    <div>
      <section ref={refs.home} className="scroll-mt-20">
        <HeroSection />
        <SmartSolutions />
      </section>
      <section ref={refs.overview} className="scroll-mt-20">
        <Overview />
      </section>
      <section ref={refs.features} className="scroll-mt-20">
        <Features />
      </section>
      {/* <section ref={refs.docs} className="scroll-mt-20">
        <Docs />
      </section> */}
      <section ref={refs.support} className="scroll-mt-20">
        <Support />
      </section>
      <section ref={refs.contact} className="scroll-mt-20">
        <ContactUs />
      </section>
      {/* <section ref={refs.helpus} className="scroll-mt-20">
        <HelpUs />
      </section> */}
      <CTASection />
    </div>
  );
};

export default Home;
