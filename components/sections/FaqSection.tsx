"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Do I need a high income to work with you?",
    answer: "No. My coaching and community are designed to help you manage what you earn and grow your wealth, no matter your income level.",
  },
  {
    question: "Is this beginner-friendly?",
    answer: "Absolutely, I break down finance concepts in a simple, practical, and actionable way, so you can start improving your finances immediately.",
  },
  {
    question: "Can I join from outside Nigeria?",
    answer: "Absolutely. My coaching and community are open globally, and I currently work with one-on-one clients outside Nigeria.",
  },
  {
    question: "What happens after payment?",
    answer: "You’ll receive instant confirmation and next steps via email, so you know exactly how to get started.",
  },
  {
    question: "Can I switch between coaching packages?",
    answer: "Yes, packages are flexible to fit your goals.",
  },
];

export function FAQSection() {
  return (
    <section className="py-20 lg:py-32 bg-white" id="faq">
      <div className="container-custom max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-mountain-meadow/10 text-mountain-meadow border-mountain-meadow/20 hover:bg-mountain-meadow/20">
            Got Questions?
          </Badge>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-rich-black mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about the Wealth & Wellness programs[cite: 180].
          </p>
        </div>

        <div className="bg-anti-flash-white/50 border border-border/50 rounded-3xl p-6 md:p-10">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white border border-border/40 rounded-2xl px-6 transition-all data-[state=open]:shadow-md data-[state=open]:border-mountain-meadow/30"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-rich-black hover:text-mountain-meadow hover:no-underline py-6">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-mountain-meadow shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Final Reassurance */}
        {/* <div className="mt-12 p-8 bg-rich-black rounded-2xl text-center text-anti-flash-white">
          <p className="mb-4 font-medium">Still have more questions?</p>
          <a 
            href="https://instagram.com" 
            target="_blank"
            className="text-mountain-meadow hover:text-caribbean-green font-bold flex items-center justify-center gap-2 transition-colors"
          >
            Follow me on Instagram for daily tips [cite: 5]
            <span className="text-xl">→</span>
          </a>
        </div> */}
      </div>
    </section>
  );
}