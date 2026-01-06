"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Users, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const pastEvents = [
  {
    title: "Physical Money Date",
    location: "Lagos, Nigeria",
    description: "An intimate, high-impact session focused on real-life money conversations without pressure or shame.",
    tags: ["In-Person", "Workshop"],
    image: "/api/placeholder/800/500", // Source [cite: 147, 148]
  },
  {
    title: "Campus Finance Tour",
    location: "Various Universities",
    description: "Empowering the next generation of earners with practical budgeting and investment foundations.",
    tags: ["Students", "Speaking"],
    image: "/api/placeholder/800/500", // Source [cite: 151]
  }
];

const clientLogos = [
  "Schools & Universities", "Churches & Fellowships", 
  "Startups", "Corporate Groups", "Community Networks"
];

export default function EventsArchivePage() {
  return (
    <main className="bg-anti-flash-white min-h-screen">
      {/* Hero Header */}
      <section className="bg-rich-black text-anti-flash-white py-20 lg:py-32 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <Badge className="mb-6 bg-mountain-meadow text-white border-none px-4 py-1">
            Our Track Record
          </Badge>
          <h1 className="text-4xl md:text-7xl font-heading font-bold mb-6 max-w-4xl">
            Real Stories. <br />
            <span className="text-mountain-meadow">Real Transformation.</span>
          </h1>
          <p className="text-anti-flash-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
            I’ve had the privilege of working with students, young professionals, and entrepreneurs, 
            helping them move from financial stress to clarity, control, and wellness[cite: 138, 162].
          </p>
        </div>
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-mountain-meadow/5 blur-[120px] rounded-full" />
      </section>

      {/* Impact Stats Grid */}
      <section className="py-12 -mt-10 container-custom relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-border/50 shadow-sm">
            <div className="text-3xl font-bold text-rich-black mb-2">50%+</div>
            <p className="text-muted-foreground text-sm uppercase tracking-wider">Annual Portfolio Growth for clients [cite: 160]</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-border/50 shadow-sm">
            <div className="text-3xl font-bold text-rich-black mb-2">Hundreds</div>
            <p className="text-muted-foreground text-sm uppercase tracking-wider">Trained & Empowered [cite: 162]</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-border/50 shadow-sm">
            <div className="text-3xl font-bold text-rich-black mb-2">2-3</div>
            <p className="text-muted-foreground text-sm uppercase tracking-wider">Active investments per client [cite: 161]</p>
          </div>
        </div>
      </section>

      {/* Video Recap Feature */}
      <section className="py-20 container-custom">
        <div className="mb-12">
          <h2 className="text-3xl font-heading font-bold mb-4">Event Recaps</h2>
          <p className="text-muted-foreground">Catch a glimpse of our interactive community learning sessions[cite: 145, 148].</p>
        </div>
        
        <div className="group relative aspect-video rounded-[2rem] overflow-hidden bg-rich-black border border-border/50 shadow-2xl">
          <img 
            src="/api/placeholder/1200/675" 
            alt="Video Recap Thumbnail" 
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-mountain-meadow text-white w-20 h-20 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-mountain-meadow/20">
              <PlayCircle size={40} fill="currentColor" />
            </button>
          </div>
          <div className="absolute bottom-8 left-8 text-white">
            <p className="text-sm font-medium text-mountain-meadow mb-1">Featured Video</p>
            <h3 className="text-2xl font-bold">2026 Financial Wellness Highlights</h3>
          </div>
        </div>
      </section>

      {/* Image Gallery Archive */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-heading font-bold mb-12">Session Archive</h2>
          <div className="space-y-20">
            {pastEvents.map((event, idx) => (
              <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-md">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="flex gap-2">
                    {event.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-mountain-meadow border-mountain-meadow/30">{tag}</Badge>
                    ))}
                  </div>
                  <h3 className="text-3xl font-heading font-bold text-rich-black">{event.title}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground font-medium">
                    <MapPin size={18} className="text-mountain-meadow" />
                    {event.location} [cite: 151, 154]
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {event.description} [cite: 147, 158]
                  </p>
                  <ul className="grid grid-cols-1 gap-3">
                    <li className="flex items-center gap-3 text-rich-black font-medium">
                      <CheckCircle2 size={20} className="text-mountain-meadow" />
                      Interactive learning sessions [cite: 112]
                    </li>
                    <li className="flex items-center gap-3 text-rich-black font-medium">
                      <CheckCircle2 size={20} className="text-mountain-meadow" />
                      Actionable takeaways [cite: 113]
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizations Esther has Worked With */}
      <section className="py-20 border-t border-border/50">
        <div className="container-custom text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-10">Facilitated sessions for[cite: 150]:</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale transition-all">
             {clientLogos.map((logo, i) => (
               <span key={i} className="text-xl font-heading font-bold text-rich-black">{logo} [cite: 151, 152, 153]</span>
             ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-32 container-custom text-center">
        <div className="bg-rich-black rounded-[3rem] p-8 md:p-20 text-anti-flash-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8">Ready to create your success story?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-full bg-mountain-meadow hover:bg-mountain-meadow/90 px-8">
                Invite Me to Speak [cite: 169]
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/20 hover:bg-white/10 px-8">
                Join the Community [cite: 167]
              </Button>
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-mountain-meadow/20 rounded-full blur-3xl" />
        </div>
      </section>
    </main>
  );
}