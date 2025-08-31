import React, { createContext, useContext, useRef } from "react";

const ScrollContext = createContext<any>(null);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null),
    smart: useRef<HTMLDivElement>(null),
    overview: useRef<HTMLDivElement>(null),
    features: useRef<HTMLDivElement>(null),
    docs: useRef<HTMLDivElement>(null),
    support: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
    help: useRef<HTMLDivElement>(null),
    cta: useRef<HTMLDivElement>(null)
  };

  const scrollTo = (key: keyof typeof sectionRefs) => {
    sectionRefs[key].current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ScrollContext.Provider value={{ refs: sectionRefs, scrollTo }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
