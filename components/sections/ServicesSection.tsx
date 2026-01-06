"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Lightbulb, Heart } from "lucide-react";

const methodSteps = [
  {
    icon: BookOpen,
    title: "Practical Education",
    description:
      "No fluff, no jargon. Real financial strategies and tools you can apply immediately to your life.",
    color: "bg-primary",
  },
  {
    icon: Lightbulb,
    title: "Implementation Support",
    description:
      "Get hands-on guidance to implement what you learn. No more feeling stuck after learning new concepts.",
    color: "bg-accent",
  },
  {
    icon: Heart,
    title: "Wellness Integration",
    description:
      "Your financial health and mental health are connected. We address both for lasting transformation.",
    color: "bg-frog",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-widest text-primary mb-4">
            My Signature Method
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-4">
            How I Help You <span className="text-gradient">Transform</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Practical Education + Implementation + Wellness
          </p>
        </div>

        {/* Method Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {methodSteps.map((step) => (
            <div
              key={step.title}
              className="group bg-card rounded-2xl p-8 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 text-center"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}
              >
                <step.icon className="w-8 h-8 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-heading font-semibold mb-4">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button asChild size="lg" className="rounded-full px-8 group">
            <Link href="/services">
              Explore Services
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
