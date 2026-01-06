"use client";

import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const footerLinks = {
  pages: [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "FAQ", href: "/#faq" },
    { name: "Free Resources", href: "/#free-resources" },
    
    // { name: "Community", href: "/community" },
    // { name: "Coaching", href: "/coaching" },
    // { name: "Speaking", href: "/speaking" },
    // { name: "Collaborations", href: "/collaborations" },
    
  ],
  services: [
    { name: "Wealth & Wellness Community", href: "/services" },
    { name: "Clarity Session", href: "/services" },
    { name: "1-Month Coaching", href: "/services" },
    { name: "Workshops", href: "/services" },
    { name: "Content Creation", href: "/services" },
  ],
};

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
  { name: "TikTok", icon: TikTokIcon, href: "https://tiktok.com" },
];

export function Footer() {
  return (
    <footer className="bg-rich-black text-anti-flash-white">
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-xl  flex items-center justify-center">
                {/* <span className="text-primary-foreground font-heading font-bold text-lg">
                  E
                </span> */}
                <Image 
                  src="/estherodejobi1-046.png"
                  alt="Esther Odejobi Logo"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full rounded-xl"
                />
              </div>
              <span className="font-heading font-semibold">
                Esther Odejobi
              </span>
            </Link>

            <p className="text-anti-flash-white/60 text-sm mb-6">
              Financial Education • Financial Wellness • Community
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-anti-flash-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Sections</h4>
            <ul className="space-y-3">
              {footerLinks.pages.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-anti-flash-white/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-anti-flash-white/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Newsletter</h4>
            <p className="text-anti-flash-white/60 text-sm mb-4">
              Get weekly tips on building wealth and wellness.
            </p>
            <form className="space-y-3">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-anti-flash-white/10 border-anti-flash-white/20 text-anti-flash-white placeholder:text-anti-flash-white/40 rounded-full h-10"
              />
              <Button type="submit" size="sm" className="w-full rounded-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-anti-flash-white/10 mt-12 pt-8 text-center text-anti-flash-white/40 text-sm">
          <p>© {new Date().getFullYear()} Esther Odejobi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
