"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, ArrowRight } from "lucide-react";

const eventGallery = [
  {
    title: "Physical Money Date",
    category: "In-Person Event",
    description: "A unique space for real-life money conversations and connection[cite: 147].",
    impact: "Physical interaction & group learning[cite: 147, 148].",
    image: "/api/placeholder/600/400", // Replace with actual event photo
  },
  {
    title: "Campus Finance Workshops",
    category: "Education",
    description: "Empowering students across universities in Nigeria with budgeting and literacy[cite: 151, 156].",
    impact: "Over 100+ students trained[cite: 162].",
    image: "/api/placeholder/600/400",
  },
  {
    title: "Corporate Wellness Sessions",
    category: "Corporate",
    description: "Practical finance strategies tailored for startups and corporate groups[cite: 153, 157].",
    impact: "Focused on actionable takeaways[cite: 113, 163].",
    image: "/api/placeholder/600/400",
  },
  {
    title: "Churches & Fellowships",
    category: "Community",
    description: "Relatable finance teaching sessions for faith-based organizations[cite: 150, 152].",
    impact: "Relatable, interactive lectures[cite: 112, 154].",
    image: "/api/placeholder/600/400",
  },
];

export function EventsGallery() {
  return (
    <section className="py-20 lg:py-32 bg-anti-flash-white overflow-hidden" id="impact">
      <div className="container-custom mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Impact & Reach
            </Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-rich-black mb-4">
              Real Stories. Real Transformation[cite: 137].
            </h2>
            <p className="text-muted-foreground text-lg">
              Through physical events and online webinars, Esther has helped hundreds 
              move from financial stress to clarity[cite: 16, 162].
            </p>
          </div>
          
          <div className="hidden md:flex gap-2 items-center text-sm font-medium text-mountain-meadow">
            Scroll to explore <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide px-[5%] lg:px-[10%]">
          {eventGallery.map((event, index) => (
            <div 
              key={index}
              className="flex-none w-[300px] md:w-[450px] snap-center"
            >
              <div className="group relative bg-white rounded-3xl overflow-hidden border border-border/40 shadow-sm transition-all hover:shadow-xl">
                {/* Image Placeholder/Container */}
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-rich-black/80 backdrop-blur-md text-white border-none">
                      {event.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-rich-black mb-3">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base mb-6 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="pt-6 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-mountain-meadow font-semibold text-sm">
                      <Users className="w-4 h-4" />
                      <span>{event.impact}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* View More Card */}
          <div className="flex-none w-[250px] md:w-[350px] snap-center">
            <div className="h-full flex flex-col items-center justify-center bg-mountain-meadow rounded-3xl p-8 text-center text-white">
              <h4 className="text-2xl font-heading font-bold mb-4">Be Our Next Success Story [cite: 166]</h4>
              <p className="text-white/80 mb-8 text-sm">
                Join the hundreds of young professionals already taking control of their money[cite: 162, 163].
              </p>
              <button className="w-12 h-12 rounded-full bg-white text-mountain-meadow flex items-center justify-center hover:scale-110 transition-transform">
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Topics Covered Summary */}
      <div className="container-custom mt-16">
        <div className="bg-rich-black rounded-3xl p-8 md:p-12 text-anti-flash-white">
          <h3 className="text-xl font-heading font-bold mb-8">Topics covered across sessions[cite: 155]:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-mountain-meadow" />
              <span className="text-anti-flash-white/80">Financial literacy & budgeting [cite: 156]</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-mountain-meadow" />
              <span className="text-anti-flash-white/80">Saving & wealth-building [cite: 157]</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-mountain-meadow" />
              <span className="text-anti-flash-white/80">Debt management strategies [cite: 158]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}