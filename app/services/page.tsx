"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Users, 
  Zap, 
  Calendar, 
  Mic2, 
  PenTool, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Add image URLs for each service
const services = [
  {
    title: "Wealth & Wellness Community",
    id: "community",
    description: "A guided finance and wellness space for those ready to stop guessing and start growing intentionally.",
    icon: Users,
    features: [
      "Investment education & market updates",
      "Practical tools & templates",
      "Monthly live finance teaching sessions",
      "Accountability check-ins & peer support",
    ],
    cta: "Join the Community",
    href: "https://bit.ly/WealthandWellnessCircle",
    tag: "2026 Cohort",
    image: "/community2.jpg",
  },
  {
    title: "60-Minute Clarity Session",
    id: "clarity-session",
    description: "A deep-dive call to identify money leaks and give you clear direction when you feel stuck.",
    icon: Zap,
    features: [
      "Review current money habits",
      "Personalized apps & platforms guide",
      "Budgeting & planning workbooks",
      "Immediate actionable next steps",
    ],
    cta: "Book Your Session",
    href: "https://selar.com/8166zko2v2",
    tag: "Quick Reset",
    image: "/oneonone.jpg",
  },
  {
    title: "1-Month 1-on-1 Coaching",
    id: "coaching",
    description: "A full financial reset including personalized roadmaps for savings, debt, and investments.",
    icon: Target,
    features: [
      "30-min snapshot + 90-min strategy session",
      "Custom investment roadmap",
      "4 weeks of dedicated support",
      "Limited to 5 clients per month",
    ],
    cta: "Let's Work Together",
    href: "https://selar.com/23i6qrk378",
    tag: "Deep Transformation",
    image: "/oneonone2.jpg",
  },
  {
    title: "Workshops & Speaking",
    id: "speaking",
    description: "Interactive and actionable finance sessions for organizations, schools, and fellowships.",
    icon: Mic2,
    features: [
      "Money mindset & habits",
      "Building wealth without burnout",
      "Interactive sessions (no boring lectures)",
      "Tailored to your audience's needs",
    ],
    cta: "Invite Me to Speak",
    href: "https://wa.me/2347068778156?text=Hello%20Esther%2C%20I%20would%20love%20to%20invite%20you%20to%20speak%20at%20our%20event!",
    tag: "For Groups",
    image: "/new-year.jpg",
  },
  {
    title: "Content & Collaborations",
    id: "collaborations",
    description: "Custom finance education content and collaborative campaigns for brands and platforms.",
    icon: PenTool,
    features: [
      "Digital finance education content",
      "Webinars & community sessions",
      "Brand-aligned financial literacy",
      "Engagement-focused strategies",
    ],
    cta: "Let's Collaborate",
    href: "https://wa.me/2347068778156?text=Hi%20Esther%2C%20I%20am%20interested%20in%20collaborating%20on%20content%20with%20you.%20Let%27s%20chat!",
    tag: "For Brands",
    image: "/community 1.jpg",
  }
];

const whyWorkWithMe = [
  "Over 50% annual portfolio growth for 2 consecutive years",
  "Clients grow from 0 to 2-3 active investments",
  "Focused, personalized support (Max 5 clients/mo)",
  "Practical strategies that fit your personality",
  "100% confidentiality guaranteed"
];

export default function ServicesPage() {
  return (
    <main className="bg-anti-flash-white min-h-screen">

      {/* Hero Section */}
      <section className="bg-rich-black text-anti-flash-white py-28 lg:py-32">
        <div className="container-custom">
          <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 hover:bg-primary/20">
            Our Services
          </Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Move from Confusion <br />
            <span className="text-primary text-mountain-meadow">to Clarity & Control</span>
          </h1>
          <p className="text-anti-flash-white/70 max-w-2xl text-lg mb-8">
            I guide students, young professionals, earners, and entrepreneurs to save smart, 
            invest wisely, and build wealth + wellness, regardless of your income.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-32 container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-border/50 shadow-sm flex flex-col hover:shadow-md transition-shadow">
              
              {/* Image on top */}
              {service.image && (
                <div className="w-full h-96 relative">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover rounded-t-xl"
                  />
                </div>
              )}

              <CardHeader className="pt-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-mountain-meadow/10 flex items-center justify-center text-mountain-meadow">
                    <service.icon size={24} />
                  </div>
                  <Badge variant="secondary" className="bg-muted text-muted-foreground font-normal">
                    {service.tag}
                  </Badge>
                </div>
                <CardTitle className="font-heading text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base pt-2">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 size={18} className="text-mountain-meadow shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button asChild className="w-full rounded-full group" variant={index === 0 ? "default" : "outline"}>
                  <Link href={service.href} target="_blank" rel="noopener noreferrer">
                    {service.cta}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Work With Me Section */}
      <section className="bg-mountain-meadow/5 py-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-rich-black">
                Why Work With Me
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                My work focuses on more than just numbers. I help you build wealth in a way 
                that supports your wellbeing—at your own pace, with no unrealistic promises.
              </p>
              <div className="space-y-4">
                {whyWorkWithMe.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-border/40">
                    <div className="bg-mountain-meadow text-white p-1 rounded-full">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="font-medium text-rich-black/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-rich-black rounded-3xl p-8 lg:p-12 text-anti-flash-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-heading font-bold mb-4">Impact Highlights</h3>
                <div className="space-y-8">
                  <div>
                    <div className="text-4xl font-bold text-mountain-meadow mb-1">50%+</div>
                    <div className="text-sm text-anti-flash-white/60 uppercase tracking-wider">Annual Portfolio Growth</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-mountain-meadow mb-1">Hundreds</div>
                    <div className="text-sm text-anti-flash-white/60 uppercase tracking-wider">Professionals & Students Trained</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-mountain-meadow mb-1">2-3</div>
                    <div className="text-sm text-anti-flash-white/60 uppercase tracking-wider">Active Investments per Client</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-mountain-meadow/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 text-center container-custom">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-rich-black">
            Your financial freedom starts with a decision.
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Imagine looking back 6 months from now, grateful you started today. 
            You don't have to figure it all out alone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full px-8 bg-mountain-meadow hover:bg-mountain-meadow/90">
            <Link href="https://bit.ly/WealthandWellnessCircle" target="_blank" rel="noopener noreferrer">
              Join the Community
            </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              <Link href="https://selar.com/8166zko2v2" target="_blank" rel="noopener noreferrer">
              Book a Clarity Session
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
