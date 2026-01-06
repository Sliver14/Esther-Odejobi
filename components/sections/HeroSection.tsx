"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Instagram } from "lucide-react";

export function HeroSection() {
  return (
    <>
      <section id="home" className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-mint/30 via-background to-secondary/50">
        
        {/* Decorative shapes */}
        <div className="absolute top-20 right-10 w-16 h-16 text-primary opacity-20">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <polygon points="50,0 100,100 0,100" />
          </svg>
        </div>

        <div className="absolute top-40 right-[20%] w-8 h-8 text-accent opacity-30 rotate-45">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <rect width="100" height="100" />
          </svg>
        </div>

        <div className="absolute bottom-32 left-[15%] w-12 h-12 text-frog opacity-20">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="50" />
          </svg>
        </div>

        <div className="container-custom py-14 sm:py-16 md:py-28">
          
          {/* Mobile: Image first | Desktop: Two-column grid */}
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-8 items-center">

            {/* Text Content */}
            <div className="space-y-5 sm:space-y-6 animate-fade-up text-center lg:text-left">

              {/* Eyebrow */}
              <p className="text-[8px] sm:text-sm uppercase tracking-wide sm:tracking-widest text-muted-foreground">
                Financial Educator • Wellness Coach • Speaker
              </p>

              {/* Headline */}
              <h1 className="
                text-2xl
                sm:text-3xl
                md:text-5xl
                lg:text-[3.5rem]
                font-heading
                font-semibold
                leading-tight
              ">
                Money Doesn't Have to Feel{" "}
                <span className="text-gradient">This Hard.</span>
              </h1>

              {/* Body */}
              <p className="
                text-base
                sm:text-lg
                text-muted-foreground
                leading-relaxed
                max-w-lg
                mx-auto
                lg:mx-0
              ">
                If you're tired of debt, financial stress, or starting over every month — you're in the right place.
                I guide students, young professionals, and entrepreneurs to save smart, invest wisely, and build{" "}
                <span className="text-primary font-medium">wealth + wellness</span>.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="rounded-full px-8 text-sm sm:text-base group"
                  asChild
                >
                  <a href="https://bit.ly/WealthandWellnessCircle" target="_blank" rel="noopener noreferrer">
                    Join inner Circle
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 text-sm sm:text-base group"
                  asChild
                >
                  <a href="https://www.instagram.com/theesther.oj/" target="_blank" rel="noopener noreferrer">
                    <Instagram className="mr-2 w-4 h-4" />
                    Follow on Instagram
                  </a>
                </Button>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative flex justify-center animate-fade-up delay-200">
              <div className="relative">
                
                <div className="
                  w-[260px] h-[340px]
                  sm:w-[320px] sm:h-[400px]
                  lg:w-[420px] lg:h-[500px]
                  rounded-3xl
                  overflow-hidden
                  bg-gradient-to-br from-primary/20 via-accent/10 to-mint/30
                  shadow-xl
                ">
                  <img
                    src="/esther-hero.png"
                    alt="Esther Odejobi"
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Decorative accents */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent rounded-2xl -z-10 opacity-60" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/30 rounded-full -z-10" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-12 z-10">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary via-accent to-primary rounded-2xl shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-primary-foreground/20">
              {[
                { number: "500+", label: "Lives Impacted" },
                { number: "5+", label: "Years Experience" },
                { number: "100+", label: "Sessions Delivered" },
                { number: "4.9★", label: "Client Rating" },
              ].map((stat, index) => (
                <div key={index} className="p-5 md:p-8 text-center text-primary-foreground">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base opacity-90">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
