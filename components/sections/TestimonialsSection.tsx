"use client";

import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "The session was really enlightening. Thank you for all you shared. I’ll be joining the subscription-based community so I can learn more and be guided rightly.",
    author: "Community Member",
    role: "Live Session Attendee",
    rating: 5,
  },
  {
    quote:
      "I was almost depressed about my financial status, but just two months after joining the paid financial community, a lot has changed. The classes, book and movie reviews, one-on-one counselling, and other sessions have been truly impactful.",
    author: "Paid Community Member",
    role: "Wealth & Wellness Community",
    rating: 5,
  },
  {
    quote:
      "I’m already investing and I plan to add more funds to my money market and real estate investments this March.",
    author: "Private Client",
    role: "Investor",
    rating: 5,
  },
  {
    quote:
      "In less than four months of joining the paid financial community, I’ve gained valuable insights into multiple investment opportunities. I now have an emergency fund, a solid budget, clear goals, and a strong financial plan. My finances have improved significantly.",
    author: "Paid Community Member",
    role: "Financial Growth Journey",
    rating: 5,
  },
  {
    quote:
      "Before now, I thought I was making a lot of money and spent it anyhow. With the structure I’ve learned, I now know what to do with my money before it even comes. Even free money has an assignment now. That stands out for me.",
    author: "Coaching Client",
    role: "Budgeting & Structure",
    rating: 5,
  },
  {
    quote:
      "Thank you so much for your support over the past two months. Working with you one-on-one has helped me become more financially prudent, especially with budgeting. I’ve also started investing in mutual funds and stocks. You’ve been amazing.",
    author: "1-on-1 Coaching Client",
    role: "Personal Finance Coaching",
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
