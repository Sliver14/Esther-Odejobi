"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowRight, ExternalLink } from "lucide-react";

const eventGallery = [
  {
    title: "2024 in Review, 2025 in View: Your Financial Blueprint",
    category: "Webinar",
    description: "Practical strategies for saving, investing, and building a financial forecast to achieve clarity and confidence in the new year. Hosted by The Esther Akintayo.",
    impact: "Empowering participants with actionable financial planning tools and a structured blueprint for 2025.",
    image: "/events/WhatsApp Image 2026-01-07 at 12.59.32_59ae0e78.jpg",
    galleryLink: "", // No link yet → not clickable
  },
  {
    title: "Youth Camp 2025: Profitable Waters",
    category: "Churches & Fellowships",
    description: "A 3-day youth camp featuring word ministration, fire session (prayers), financial discussion, creative sessions, relationship talk, electrifying praise, deep worship, and sexual deliverance session. Financial session by Akintayo Esther on 'Smart Money Moves for 2025: Making the Most of Your Finances'.",
    impact: "Relatable finance teaching combined with spiritual growth and interactive sessions for youth in a faith-based setting.",
    image: "/events/WhatsApp Image 2026-01-07 at 12.59.51_755b8476.jpg",
    galleryLink: "", // No link yet
  },
  {
    title: "Invest Wisely, Save Smartly: Building Wealth for Tomorrow",
    category: "Webinar",
    description: "Free online finance webinar focused on investing in knowledge to manage and grow your finances. Hosted by Akintayo Esther, featuring speaker Seyi Abiodun (Certified Financial Education Instructor).",
    impact: "Educating attendees on wise investing and smart saving habits through expert-led discussions.",
    image: "/events/WhatsApp Image 2026-01-07 at 13.00.34_e5de1a2d.jpg",
    galleryLink: "", // No link yet
  },
  {
    title: "Money Date with TEI",
    category: "Personal Branding",
    description: "A financial education session or series featuring The Esther Akintayo (TEI) sharing insights on the path to financial freedom.",
    impact: "Inspiring and relatable personal finance guidance to help individuals take control of their money journey.",
    image: "/events/Screenshot 2026-01-07 205442.png",
    galleryLink: "https://mide-photography.pixieset.com/moneydatewithtea", // Valid link → clickable
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
          {eventGallery.map((event, index) => {
            const hasLink = event.galleryLink && event.galleryLink.trim() !== "";
            const CardWrapper = hasLink ? "a" : "div";
            const wrapperProps = hasLink
              ? {
                  href: event.galleryLink,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {};

            return (
              <div
                key={index}
                className="flex-none w-[300px] md:w-[450px] snap-center"
              >
                <CardWrapper
                  {...wrapperProps}
                  className={`block group relative bg-white rounded-3xl overflow-hidden border border-border/40 shadow-sm transition-all h-full flex flex-col ${
                    hasLink
                      ? "cursor-pointer hover:shadow-xl"
                      : "cursor-default"
                  }`}
                >
                  {/* Image Container */}
                  <div className="aspect-[4/3] bg-muted relative overflow-hidden flex-shrink-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className={`object-contain w-full h-full transition-transform duration-500 ${
                        hasLink ? "group-hover:scale-110" : ""
                      }`}
                    />

                    {/* Clickable overlay only if has link */}
                    {hasLink && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                        <ExternalLink className="w-12 h-12 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Commented content preserved */}
                  {/* <div className="p-6 md:p-8"> ... </div> */}
                </CardWrapper>
              </div>
            );
          })}

          {/* View More Card - Optional link */}
          <div className="flex-none w-[300px] md:w-[450px] snap-center">
            <a
              href="https://drive.google.com/drive/folders/YOUR_MAIN_GALLERY_FOLDER_ID?usp=sharing" // Update when ready
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full cursor-pointer group"
            >
              <div className="h-full flex flex-col rounded-3xl overflow-hidden shadow-sm border border-border/40 transition-all hover:shadow-xl">
                <div className="aspect-[4/3] bg-mountain-meadow flex flex-col items-center justify-center px-6 sm:px-8 md:px-12 text-center text-white flex-shrink-0">
                  <h4 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-3 md:mb-4 leading-tight">
                    Be Our Next Success Story
                  </h4>
                  <p className="text-white/80 mb-6 md:mb-8 text-sm sm:text-base max-w-xs mx-auto leading-relaxed">
                    Join the hundreds of young professionals already taking control of their money.
                  </p>
                  <button className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-mountain-meadow flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                    <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7" />
                  </button>
                </div>
              </div>
            </a>
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