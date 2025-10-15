import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "../../hooks/Logo";
import {
  preparePkceAndRedirect,
  redirectToSignup
} from "../../utils/authRedirects";
import {
  refs,
  scrollToSection,
  sectionKeys,
  type SectionKeys
} from "../../utils/refs";
import NavItems from "./NavItems";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKeys>("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = sectionKeys.find((k) => refs[k].current === entry.target);
          if (entry.isIntersecting && key) {
            setActiveSection(key);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -50% 0px",
        threshold: 0.3
      }
    );

    sectionKeys.forEach((key) => {
      const el = refs[key].current;
      if (el) observer.observe(el);
    });

    return () => {
      sectionKeys.forEach((key) => {
        const el = refs[key].current;
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
        <Logo />

        <div className="hidden min-[890px]:block">
          <NavItems
            scrollToSection={scrollToSection}
            activeSection={activeSection}
          />
        </div>

        <div className="hidden min-[890px]:flex items-center space-x-4">
          <button
            onClick={() => {
              preparePkceAndRedirect();
            }}
            className="cursor-pointer text-gray-700 font-medium hover:text-[#6F00FF] transition-colors duration-300 ease-in-out"
          >
            Sign in
          </button>

          <button
            onClick={redirectToSignup}
            className="cursor-pointer bg-[#6F00FF] text-white px-4 py-2 rounded-lg font-semibold border border-transparent hover:bg-[#5800cc] transition-all duration-300 ease-in-out"
          >
            Create account
          </button>
        </div>

        <div className="min-[890px]:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="flex flex-col items-center gap-4 pb-4 mt-2 border-t border-gray-100 bg-white animate-fadeIn">
          <button
            onClick={() => {
              preparePkceAndRedirect();
            }}
            className="w-11/12 max-w-sm bg-[#6F00FF] text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-[#5800cc] hover:shadow-lg transition-all duration-200"
          >
            Sign in
          </button>

          <button
            onClick={redirectToSignup}
            className="w-11/12 max-w-sm bg-white text-[#6F00FF] font-semibold px-6 py-3 rounded-xl border-2 border-[#6F00FF] hover:bg-[#f3e8ff] hover:text-[#5800cc] hover:border-[#5800cc] transition-all duration-200"
          >
            Create account
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
