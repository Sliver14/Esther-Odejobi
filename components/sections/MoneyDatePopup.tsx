"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Calendar } from "lucide-react";

export function MoneyDatePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem("hasSeenMoneyDatePopup");
    if (!hasSeenPopup) {
      // Set a timer to show the popup after 3 seconds
      const timer = setTimeout(() => {
        setShouldRender(true);
        // Small delay to trigger the transition class
        setTimeout(() => setIsOpen(true), 50);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Mark as seen in session storage
    sessionStorage.setItem("hasSeenMoneyDatePopup", "true");
    // Wait for animation to finish before unrendering
    setTimeout(() => setShouldRender(false), 300);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-md bg-card rounded-2xl overflow-hidden shadow-2xl border border-border/80 flex flex-col transform transition-all duration-300 ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80 hover:scale-105 transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Flyer Image Container */}
        <div className="relative w-full aspect-[4/5] bg-muted">
          <Image
            src="/assets/money-date-flyer.jpeg"
            alt="Money Date Event Flyer"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover"
            priority
          />
        </div>

        {/* Content & CTA Button */}
        <div className="p-5 text-center space-y-4 bg-gradient-to-b from-card to-secondary/30">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" /> Upcoming Event
            </span>
            <h3 className="text-xl font-semibold text-foreground">
              Money Date 2.0
            </h3>
            <p className="text-sm text-muted-foreground">
              Join us for a holistic approach to wealth, wellness, and finance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2.5 rounded-full border border-border text-sm font-medium text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              Maybe Later
            </button>
            <Link
              href="/money-date"
              onClick={handleClose}
              className="flex-[2] inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary/20 hover:brightness-105 transition-all"
            >
              Secure Your Spot
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
