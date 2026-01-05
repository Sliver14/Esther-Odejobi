"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const journeySteps = [
  {
    title: "The Starter",
    description: "You're new to managing money and need the basics.",
    color: "bg-mint text-forest",
  },
  {
    title: "The Rebuilder",
    description: "You've made mistakes and want a fresh start.",
    color: "bg-basil text-anti-flash-white",
  },
  {
    title: "The Explorer",
    description: "You're ready to invest and grow your wealth.",
    color: "bg-primary text-primary-foreground",
  },
  {
    title: "The Achiever",
    description: "You want to optimize and scale what's working.",
    color: "bg-accent text-accent-foreground",
  },
  {
    title: "The Leader",
    description: "You want to lead others in financial wellness.",
    color: "bg-forest text-anti-flash-white",
  },
];

export function WhyWorkWithMeSection() {
  return (
    <section id="why-work-with-me" className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-widest text-primary mb-4">
            Where Are You on Your Money Journey?
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold">
            Find Your <span className="text-gradient">Starting Point</span>
          </h2>
        </div>

        {/* Journey Steps */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 mb-12">
          {journeySteps.map((step, index) => (
            <div
              key={step.title}
              className={`${step.color} rounded-2xl p-6 text-center hover:scale-105 transition-transform cursor-pointer`}
            >
              <div className="w-12 h-12 rounded-full bg-background/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">{index + 1}</span>
              </div>
              <h3 className="font-heading font-semibold mb-2">{step.title}</h3>
              <p className="text-sm opacity-90">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Two Column CTA */}
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {/* What Do You Need */}
          <div className="bg-mint/50 rounded-2xl p-8 lg:p-10">
            <h3 className="text-2xl font-heading font-semibold mb-4 text-forest">
              What Do You Need?
            </h3>
            <p className="text-forest/80 mb-6">
              If you're just getting started, need structure, or want to join a supportive community — 
              the Wealth & Wellness Community is perfect for you.
            </p>
            <Button className="rounded-full px-6 group bg-forest hover:bg-forest/90" asChild>
              <a href="https://bit.ly/WealthandWellnessCircle" target="_blank" rel="noopener noreferrer">
                Join Inner Circle
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          {/* How Can I Help */}
          <div className="bg-primary rounded-2xl p-8 lg:p-10 text-primary-foreground">
            <h3 className="text-2xl font-heading font-semibold mb-4">
              How Can I Help?
            </h3>
            <p className="text-primary-foreground/90 mb-6">
              If you want personalized, one-on-one support and a tailored roadmap — 
              book a clarity session or coaching package for deeper transformation.
            </p>

            <Button
              variant="outline"
              className="rounded-full px-6 group bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <a
                href="https://selar.com/23i6qrk378"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Session
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

          </div>
        </div>
      </div>
    </section>
  );
}