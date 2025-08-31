// components/Header.tsx
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VLogoLoading } from "../../hooks/VLogoLoading";
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
  const navigate = useNavigate();

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
        rootMargin: "0px 0px -50% 0px", // triggers when section is near center
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
    <header className="p-4 bg-white shadow-md border-b border-gray-200 mb-1 fixed w-full top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Nav */}
        <div className="flex items-center space-x-10 max-[870px]:space-x-6">
          <div
            className="flex items-center"
            onClick={() => {
              navigate("/");
              scrollToSection("home");
            }}
          >
            <div className="w-9 h-9 flex items-center justify-center">
              <VLogoLoading />
            </div>
            <span className="text-2xl text-blue-600 font-bold cursor-pointer">
              AquaSense
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden min-[890px]:block">
            <NavItems
              scrollToSection={scrollToSection}
              activeSection={activeSection}
            />
          </div>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden min-[890px]:flex space-x-4">
          <button
            onClick={() => {
              preparePkceAndRedirect();
            }}
            className="cursor-pointer text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 ease-in-out"
          >
            Sign in
          </button>
          <button
            onClick={() => {
              redirectToSignup();
            }}
            className="cursor-pointer bg-blue-700 text-white px-4 py-2 rounded-md font-semibold border border-blue-300 hover:bg-blue-600 transition-all duration-300 ease-in-out"
          >
            Create account
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="min-[890px]:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isMenuOpen && (
        <div className="min-[890px]:hidden mt-3 space-y-3 px-4">
          <NavItems
            mobile
            scrollToSection={(key) => {
              scrollToSection(key);
              setIsMenuOpen(false); // close menu after click
            }}
            activeSection={activeSection}
          />

          <div className="flex flex-col items-start space-y-2">
            <button
              onClick={() => {
                preparePkceAndRedirect();
              }}
              className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 ease-in-out cursor-pointer"
            >
              Sign in
            </button>
            <button
              onClick={() => {
                redirectToSignup();
              }}
              className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md font-semibold shadow-md hover:bg-blue-700 transition-all duration-300"
            >
              Create account
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
