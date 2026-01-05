"use client";

import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Working with Esther completely transformed how I view and manage my money. I finally feel in control of my finances!",
    author: "Adaeze O.",
    role: "Young Professional",
    rating: 5,
  },
  {
    quote: "The Wealth & Wellness Community gave me the accountability and support I needed to start investing confidently.",
    author: "Tunde M.",
    role: "Entrepreneur",
    rating: 5,
  },
  {
    quote: "Esther's approach is practical, relatable, and judgment-free. If you're tired of poor financial habits, she's your person.",
    author: "Funke A.",
    role: "University Student",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-widest text-primary mb-4">
            What Clients Say About Me
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold">
            Real Stories. <span className="text-gradient">Real Results.</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-md hover:shadow-lg transition-all duration-300 relative"
            >
              {/* Quote icon */}
              <div className="absolute top-6 left-6">
                <Quote className="w-8 h-8 text-primary/20" />
              </div>
              
              {/* Stars */}
              <div className="flex gap-1 mb-6 pt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-lg">★</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">👤</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
