"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Calendar, Mic } from "lucide-react";

export function FinalCTASection() {
  return (
    <section className="section-padding bg-rich-black text-anti-flash-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Case Story / Impact Section */}
          <p className="text-sm uppercase tracking-widest text-primary mb-6">
            Ready to Transform Your Finances?
          </p>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold mb-6 leading-tight">
            Your financial freedom journey{" "}
            <span className="text-primary">starts today.</span>
          </h2>

          <p className="text-lg text-anti-flash-white/80 mb-12 max-w-2xl mx-auto">
            Whether you need community support, one-on-one coaching, or want me to speak at your event — 
            there&apos;s a place for you here. Let&apos;s build wealth and wellness together.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="rounded-full px-8 group" asChild>
              <Link href="https://bit.ly/WealthandWellnessCircle" target="_blank" rel="noopener noreferrer">
                <Users className="mr-2 w-5 h-5" />
                Join the Community
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-anti-flash-white/30 text-black hover:bg-anti-flash-white hover:text-rich-black group"
              asChild
            >
              <Link href="https://selar.com/23i6qrk378" target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 w-5 h-5" />
                Book a Session
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-anti-flash-white/30 text-black hover:bg-anti-flash-white hover:text-rich-black group"
              asChild
            >
          <Link
            href="https://wa.me/2347068778156?text=Hello%20Esther%2C%20I%20would%20love%20to%20invite%20you%20to%20speak%20at%20our%20event!"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            <Mic className="mr-2 w-5 h-5" />
            Invite Me to Speak
          </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-anti-flash-white/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>No pressure, no shame</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>100% confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Results-focused</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
