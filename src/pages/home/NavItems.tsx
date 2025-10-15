// NavItems.tsx
import type { SectionKeys } from "../../utils/refs";

type NavItemsProps = {
  scrollToSection: (key: SectionKeys) => void;
  mobile?: boolean;
  activeSection?: SectionKeys;
};

const navLinks: { label: string; key: SectionKeys }[] = [
  { label: "Home", key: "home" },
  { label: "Overview", key: "overview" },
  { label: "Features", key: "features" }
  //   { label: "Docs", key: "docs" },
  //   { label: "Support", key: "support" },
  //   { label: "Contact", key: "contact" }
  //   { label: "Help us", key: "helpus" }
];

const NavItems: React.FC<NavItemsProps> = ({
  scrollToSection,
  mobile = false,
  activeSection
}) => {
  return (
    <nav>
      <ul
        className={`${
          mobile
            ? "flex flex-col space-y-2 px-4"
            : "flex space-x-6 text-gray-700 font-medium"
        }`}
      >
        {navLinks.map((link) => {
          const isActive = activeSection === link.key;
          return (
            <li key={link.key}>
              <button
                onClick={() => scrollToSection(link.key)}
                className={`relative transition-all duration-300 bg-transparent border-none outline-none cursor-pointer ${
                  mobile
                    ? `text-base font-semibold ${
                        isActive ? "text-blue-600" : "text-gray-900"
                      }`
                    : `before:content-[''] before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-blue-600 before:transition-all before:duration-300 ${
                        isActive
                          ? "text-blue-600 before:w-full"
                          : "hover:text-blue-600 before:w-0 hover:before:w-full"
                      }`
                }`}
              >
                {link.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavItems;
