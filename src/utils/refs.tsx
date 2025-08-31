import { type RefObject, createRef } from "react";

export type SectionKeys =
  | "home"
  | "overview"
  | "features"
  | "docs"
  | "support"
  | "contact"
  | "helpus";

export const sectionKeys: SectionKeys[] = [
  "home",
  "overview",
  "features",
  "docs",
  "support",
  "contact",
  "helpus"
];

// Use | null for all refs
export const refs: Record<SectionKeys, RefObject<HTMLElement | null>> = {
  home: createRef<HTMLElement>(),
  overview: createRef<HTMLElement>(),
  features: createRef<HTMLElement>(),
  docs: createRef<HTMLElement>(),
  support: createRef<HTMLElement>(),
  contact: createRef<HTMLElement>(),
  helpus: createRef<HTMLElement>()
};

export const scrollToSection = (key: SectionKeys) => {
  refs[key].current?.scrollIntoView({ behavior: "smooth", block: "start" });
};
