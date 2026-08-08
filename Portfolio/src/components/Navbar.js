"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-xs py-3" : "bg-white/80 backdrop-blur-md py-4 border-b border-border/40"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group relative text-xl font-bold tracking-tight text-heading"
          id="nav-logo"
        >
          <span className="relative z-10">
            Ethan
            <span className="text-accent">.</span>
          </span>
          <span className="absolute -bottom-1 left-0 h-2 w-0 bg-accent-light rounded-full transition-all duration-300 group-hover:w-full" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 md:flex" id="nav-desktop">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-accent bg-accent-light/50 font-semibold"
                      : "text-muted hover:text-heading hover:bg-surface-hover"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-accent" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-surface-hover md:hidden"
          aria-label="Toggle navigation menu"
          id="nav-hamburger"
        >
          <div className="flex w-5 flex-col gap-1.5">
            <span
              className={`block h-0.5 rounded-full bg-heading transition-all duration-300 ${
                isOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 rounded-full bg-heading transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 rounded-full bg-heading transition-all duration-300 ${
                isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>

        {/* Mobile Drawer Overlay */}
        <div
          className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
            isOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Mobile Drawer */}
        <div
          className={`fixed top-0 right-0 z-40 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          id="nav-mobile-drawer"
        >
          <div className="flex flex-col gap-2 px-6 pt-24">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-accent-light/50 text-accent font-semibold"
                      : "text-muted hover:bg-surface-hover hover:text-heading"
                  }`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
