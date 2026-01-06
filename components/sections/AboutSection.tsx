"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="section-padding mt-12 bg-rich-black text-anti-flash-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <div className="relative order-2 lg:order-1">
            <div className="rounded-3xl p-8 bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
              <div className="text-center space-y-4 py-12 md:py-16">
                <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-primary/40">
                  <img
                    src="/esther-about.webp"
                    alt="Esther Odejobi"
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-anti-flash-white/60 text-sm">Esther Odejobi</p>
              </div>
            </div>
          </div>

          
          {/* Content side */}
          <div className="order-1 lg:order-2 space-y-6">
            <p className="text-sm uppercase tracking-widest text-primary">
              About Me
            </p>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold leading-tight">
              Anyone, including <span className="text-primary">YOU</span>, can master money and build real wealth.
            </h2>
            
            <div className="space-y-4 text-anti-flash-white/80 leading-relaxed">
              <p>
                I'm Esther Odejobi — a passionate financial educator, speaker, and finance & wellness coach. 
                I help people who are tired of struggling with money find clarity, structure, 
                and confidence in their finances.
              </p>
              <p>
                I understand how overwhelming money can feel — debt, inconsistent income, and 
                the constant pressure to "figure it all out." My work focuses on more than just numbers; 
                it&apos;s about building wealth while protecting your peace.
              </p>
            </div>
            
            <Button size="lg" className="rounded-full px-8 group mt-4" asChild>
              <a href="https://selar.com/23i6qrk378" target="_blank" rel="noopener noreferrer">
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
