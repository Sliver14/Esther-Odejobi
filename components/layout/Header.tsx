"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Free Resources", href: "/#free-resources" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll effect for frosted header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                E
              </span>
            </div>
            <span className="hidden sm:block font-semibold text-foreground">
              Esther Odejobi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === "/" && link.href.startsWith("/#");

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive
                      ? "text-primary"
                      : "text-foreground/80"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <a
                href="https://www.instagram.com/theesther.oj/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Follow on IG
              </a>
            </Button>

            <Button size="sm" className="rounded-full px-6" asChild>
              <a
                href="https://chat.whatsapp.com/CDyvXzgIDVRGJWX8tD8PPE"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Free Community
              </a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isOpen ? "max-h-[600px] opacity-100 mt-6" : "max-h-0 opacity-0"
          )}
        >
          <div className="bg-card rounded-2xl p-6 shadow-lg space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-3 text-base font-medium text-[rgb(var(--foreground)/0.8)] hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-6 border-t border-border space-y-4">
              <Button variant="outline" className="w-full rounded-full" asChild>
                <a
                  href="https://www.instagram.com/theesther.oj/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Follow on Instagram
                </a>
              </Button>

              <Button className="w-full rounded-full" asChild>
                <a
                  href="https://chat.whatsapp.com/CDyvXzgIDVRGJWX8tD8PPE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Free Community
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}