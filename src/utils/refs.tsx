import { type RefObject, createRef } from "react";

export type SectionKeys =
  | "overview"
  | "features"
  | "docs"
  | "support"
  | "contact"
  | "helpus";

export const sectionKeys: SectionKeys[] = [
  "overview",
  "features",
  "docs",
  "support",
  "contact",
  "helpus"
];

export const refs: Record<SectionKeys, RefObject<HTMLElement | null>> = {
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
