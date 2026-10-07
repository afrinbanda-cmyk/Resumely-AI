import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import Logo from '../common/Logo';
import ThemeToggle from '../common/ThemeToggle';
import Button from '../common/Button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/#hero' },
    { label: 'Features', href: '/#features' },
    { label: 'Templates', href: '/#templates' },
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Pricing', href: '/#pricing' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBF8F3]/85 dark:bg-[#14110E]/85 backdrop-blur-md shadow-xs border-b border-[#E8DFD3]/80 dark:border-[#352C25]/80'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo size="md" to="/" />

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#73675F] dark:text-[#BAADA0] hover:text-[#E39A7B] dark:hover:text-[#FAF5EE] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action buttons */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </Link>
          <Link to="/builder">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-[#FFD3AC]" />}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Build Resume
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#73675F] dark:text-[#BAADA0] hover:bg-[#F5EFE6] dark:hover:bg-[#2A241F]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBF8F3] dark:bg-[#14110E] border-b border-[#E8DFD3] dark:border-[#352C25] px-5 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#73675F] dark:text-[#BAADA0] hover:text-[#E39A7B] py-1.5"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-[#E8DFD3] dark:border-[#352C25] flex flex-col gap-2.5">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="secondary" className="w-full">
                Log In
              </Button>
            </Link>
            <Link to="/builder" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full" leftIcon={<Sparkles className="w-4 h-4 text-[#FFD3AC]" />}>
                Build My Resume
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
