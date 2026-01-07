"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, ArrowRight } from "lucide-react";

const eventGallery = [
  {
    title: "2024 in Review, 2025 in View: Your Financial Blueprint",
    category: "Webinar",
    description: "Practical strategies for saving, investing, and building a financial forecast to achieve clarity and confidence in the new year. Hosted by The Esther Akintayo.",
    impact: "Empowering participants with actionable financial planning tools and a structured blueprint for 2025.",
    image: "/events/WhatsApp Image 2026-01-07 at 12.59.32_59ae0e78.jpg", // Replace with actual event photo
  },
  {
    title: "Youth Camp 2025: Profitable Waters",
    category: "Churches & Fellowships",
    description: "A 3-day youth camp featuring word ministration, fire session (prayers), financial discussion, creative sessions, relationship talk, electrifying praise, deep worship, and sexual deliverance session. Financial session by Akintayo Esther on 'Smart Money Moves for 2025: Making the Most of Your Finances'.",
    impact: "Relatable finance teaching combined with spiritual growth and interactive sessions for youth in a faith-based setting.",
    image: "/events/WhatsApp Image 2026-01-07 at 12.59.51_755b8476.jpg",
  },
  {
    title: "Invest Wisely, Save Smartly: Building Wealth for Tomorrow",
    category: "Webinar",
    description: "Free online finance webinar focused on investing in knowledge to manage and grow your finances. Hosted by Akintayo Esther, featuring speaker Seyi Abiodun (Certified Financial Education Instructor).",
    impact: "Educating attendees on wise investing and smart saving habits through expert-led discussions.",
    image: "/events/WhatsApp Image 2026-01-07 at 13.00.34_e5de1a2d.jpg",
  },
  {
    title: "Money Date with TEI",
    category: "Personal Branding",
    description: "A financial education session or series featuring The Esther Akintayo (TEI) sharing insights on the path to financial freedom.",
    impact: "Inspiring and relatable personal finance guidance to help individuals take control of their money journey.",
    image: "/events/Screenshot 2026-01-07 205442.png",
  },
];

export function EventsGallery() {
  return (
    <section className="py-20 lg:py-32 bg-anti-flash-white overflow-hidden" id="impact">
      <div className="container-custom mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-primary mb-4">
            Impact & Reach
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-rich-black">
            Real Stories. <span className="text-gradient">Real Transformation</span>
          </h2>

          <p className="mt-6 text-muted-foreground text-lg">
            Through physical events and online webinars, Esther has helped hundreds
            move from financial stress to clarity.
          </p>
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
                    className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* <div className="absolute top-4 left-4">
                    <Badge className="bg-rich-black/80 backdrop-blur-md text-white border-none">
                      {event.category}
                    </Badge>
                  </div> */}
                </div>

                {/* <div className="p-6 md:p-8">
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
                </div> */}
              </div>
            </div>
          ))}
          
          {/* View More Card */}
          <div className="flex-none w-[250px] md:w-[350px] snap-center">
            <div className="h-full flex flex-col items-center justify-center bg-mountain-meadow rounded-3xl p-8 text-center text-white">
              <h4 className="text-2xl font-heading font-bold mb-4">Be Our Next Success Story</h4>
              <p className="text-white/80 mb-8 text-sm">
                Join the hundreds of young professionals already taking control of their money.
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
          <h3 className="text-xl font-heading font-bold mb-8">Topics covered across sessions:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-mountain-meadow" />
              <span className="text-anti-flash-white/80">Financial literacy & budgeting</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-mountain-meadow" />
              <span className="text-anti-flash-white/80">Saving & wealth-building</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-mountain-meadow" />
              <span className="text-anti-flash-white/80">Debt management strategies</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}