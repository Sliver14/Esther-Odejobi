"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Download,
  FileSpreadsheet,
  Sparkles,
  Mail,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import KitForm from "../KitForm";

const freeResources = [
  {
    icon: FileSpreadsheet,
    title: "Budget Template",
    description:
      "A simple, practical spreadsheet to track your income, expenses, and savings goals.",
    cta: "Download Free",
  },
  {
    icon: Sparkles,
    title: "Money Affirmation Card",
    description:
      "Daily affirmations to shift your money mindset and build financial confidence.",
    cta: "Get Free Card",
  },
];

export function FreeResourcesSection() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();

    if (!email) return;

    toast.success("Thank you for subscribing! Check your inbox soon.");
    setEmail("");
  };

  return (
    <section id="free-resources" className="section-padding bg-card">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Free Resources */}
          <div>
            <p className="text-sm uppercase tracking-widest text-primary mb-4">
              Free Resources
            </p>

            <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-8">
              Start Your Journey <span className="text-gradient">Today</span>
            </h2>

            <div className="space-y-6">
              {freeResources.map((resource) => {
                // Map your resources to filenames in the public folder
                const fileName =
                  resource.title === "Budget Template"
                    ? "/files/TEA'S BUDGETING TEMPLATE.xlsx"
                    : "/files/affirmation6.jpg"; // adjust paths as needed

                return (
                  <div
                    key={resource.title}
                    className="flex gap-6 p-6 bg-background rounded-2xl border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <resource.icon className="w-7 h-7 text-primary" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-heading font-semibold mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {resource.description}
                      </p>

                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="rounded-full group"
                      >
                        <a href={fileName} download>
                          <Download className="mr-2 w-4 h-4" />
                          {resource.cta}
                        </a>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-8 lg:p-12 text-primary-foreground">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <p className="text-sm uppercase tracking-widest opacity-90">
                Newsletter
              </p>
            </div>

            <h3 className="text-2xl md:text-3xl font-heading font-semibold mb-4">
              Get Weekly Money Tips
            </h3>

            <p className="text-primary-foreground/90 mb-8">
              Join my newsletter for practical financial tips, wellness
              insights, and community updates delivered straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 rounded-full h-12"
                required
              />

              <Button
                type="submit"
                className="w-full rounded-full h-12 bg-primary-foreground text-primary hover:bg-primary-foreground/90 group"
              >
                Subscribe Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
            {/* <div className="py-2">
              <KitForm />
            </div> */}
            

            <p className="text-xs text-primary-foreground/70 mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
