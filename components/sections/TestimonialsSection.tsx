"use client";

import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Hello Esther, Good morning, The session last night was a really enlightening one. Thank you for all you shared, I think I would be joining the subscription based group so I can learn more and be guided rightly",
    author: "Remi",
    role: "Entrepreneur",
    rating: 5,
  },
  {
    quote:
      "I was almost depressed about my financial status but just after 2 months plus of registering for the Paid Financial community alot has changed. Through the online classes, book reviews, movie reviews, 1 on 1 counselling and other amazing sessions.",
    author: "Paid Community Member",
    role: "Paid Financial Community",
    rating: 5,
  },
  {
    quote:
      "Hi Esther I’m already investing and plan to add more funds to my money market and real estate investments in March.",
    author: "Private Client",
    role: "Investor",
    rating: 5,
  },
  {
    quote:
      "In less than four months of being a member of your paid Financial Community, I have gained valuable insights into countless investment opportunities. Before joining, I had no knowledge of emergency funds. Now, I have one, along with a well-structured budget, clear financial goals, and a solid plan. My finances have improved significantly.",
    author: "Paid Community Member",
    role: "Paid Financial Community",
    rating: 5,
  },
  {
    quote:
      "On a normal day, I would have thought I was making a lot of money and spent them on other things. But with the structure now. I know where my money is going and what to do with before it even comes I think that is what stands out Knowing what to do with money before it comes. So even when I receive free money, I know what to use it for. Thank youuuuu",
    author: "Erioluwa",
    role: "Entrepreneur and MBA student",
    rating: 5,
  },
  {
    quote:
      "I just wanted to say thank you for your support and help over the past two months of working with you as regards my finances one on one. You have been nothing short of amazing and it’s so nice working with you During this period working with you, I’ve learnt how to be more financially prudent especially in terms of budgeting I’ve been able to invest in mutual funds and some stocks Thank you soooo much",
    author: "Olakunle",
    role: "Writer",
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
