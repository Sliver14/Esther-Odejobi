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
    fileName: "/files/TEA'S BUDGETING TEMPLATE.xlsx",
    type: "download" as const,
  },
  {
    icon: Sparkles,
    title: "Money Affirmation Cards",
    description:
      "Daily affirmations to shift your money mindset and build financial confidence. Choose from 6 unique designs.",
    cta: "View All Cards",
    fileName: "",
    type: "gallery" as const,
    galleryItems: [
      { fileName: "/affirmation/affirmation1.webp", title: "Card 1" },
      { fileName: "/affirmation/affirmation2.webp", title: "Card 2" },
      { fileName: "/affirmation/affirmation3.webp", title: "Card 3" },
      { fileName: "/affirmation/affirmation4.webp", title: "Card 4" },
      { fileName: "/affirmation/affirmation5.webp", title: "Card 5" },
      { fileName: "/affirmation/affirmation6.webp", title: "Card 6" },
      { fileName: "/affirmation/affirmation7.webp", title: "Card 7" },
      { fileName: "/affirmation/affirmation8.webp", title: "Card 8" },
      { fileName: "/affirmation/affirmation9.webp", title: "Card 9" },
      { fileName: "/affirmation/affirmation10.webp", title: "Card 10" },
      { fileName: "/affirmation/affirmation11.webp", title: "Card 11" },
      { fileName: "/affirmation/affirmation12.webp", title: "Card 12" },
    ],
  },
];

type ResourceType = "download" | "gallery";

interface Resource {
  icon: any;
  title: string;
  description: string;
  cta: string;
  fileName: string;
  type: ResourceType;
  galleryItems?: Array<{ fileName: string; title: string }>;
}

export function FreeResourcesSection() {
  const [email, setEmail] = useState("");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thank you for subscribing! Check your inbox soon.");
    setEmail("");
  };

  const handleAffirmationClick = (resource: Resource) => {
    if (resource.type === "gallery") {
      setIsGalleryOpen(true);
    }
  };

  const toggleCardSelection = (fileName: string) => {
    setSelectedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(fileName)) {
        newSet.delete(fileName);
      } else {
        newSet.add(fileName);
      }
      return newSet;
    });
  };

  const handleDownloadSelected = () => {
    if (selectedCards.size === 0) {
      toast.error("Please select at least one card to download.");
      return;
    }

    // Trigger download for each selected card
    selectedCards.forEach((fileName) => {
      const link = document.createElement("a");
      link.href = fileName;
      link.download = fileName.split("/").pop() || "affirmation_card";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });

    toast.success(`Downloaded ${selectedCards.size} affirmation card(s)!`);
    setSelectedCards(new Set());
  };

  const affirmationResource = freeResources.find(r => r.type === "gallery") as Resource | undefined;

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
              {freeResources.map((resource) => (
                <div
                  key={resource.title}
                  className="flex gap-6 p-6 bg-background rounded-2xl border border-border hover:border-primary/30 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <resource.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-heading font-semibold mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {resource.description}
                    </p>

                    <Button
                      asChild={resource.type === "download"}
                      variant="outline"
                      size="sm"
                      className="rounded-full group"
                      onClick={() => resource.type === "gallery" && handleAffirmationClick(resource)}
                    >
                      {resource.type === "download" ? (
                        <a href={resource.fileName} download>
                          <Download className="mr-2 w-4 h-4" />
                          {resource.cta}
                        </a>
                      ) : (
                        <>
                          <Sparkles className="mr-2 w-4 h-4" />
                          {resource.cta}
                          <ArrowRight className="ml-auto w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
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

            <div className="py-2">
              <KitForm />
            </div>

            <p className="text-xs text-primary-foreground/70 mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Affirmation Cards Gallery Modal */}
      {isGalleryOpen && affirmationResource && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
          <div className="bg-primary rounded-3xl p-6 md:p-12 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl md:text-3xl text-white font-heading font-semibold">
                  {affirmationResource.title}
                </h3>
                {selectedCards.size > 0 && (
                  <p className="text-sm text-white mt-2">
                    {selectedCards.size} card{selectedCards.size !== 1 ? "s" : ""} selected
                  </p>
                )}
              </div>
              <Button
                // variant="ghost"
                size="sm"
                className="rounded-full"
                onClick={() => {
                  setIsGalleryOpen(false);
                  setSelectedCards(new Set());
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
              {affirmationResource.galleryItems?.map((item) => {
                const isSelected = selectedCards.has(item.fileName);
                return (
                  <div
                    key={item.fileName}
                    className={`relative bg-muted rounded-2xl overflow-hidden cursor-pointer transition-all aspect-square ${
                      isSelected
                        ? "ring-4 ring-primary shadow-lg scale-105"
                        : "hover:shadow-md hover:scale-102"
                    }`}
                    onClick={() => toggleCardSelection(item.fileName)}
                  >
                    <img
                      src={item.fileName}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Selection overlay */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    {/* <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white text-sm font-medium text-center">
                      {item.title}
                    </p> */}
                  </div>
                );
              })}
            </div>
            
            <Button
              onClick={handleDownloadSelected}
              disabled={selectedCards.size === 0}
              className="w-full rounded-2xl h-12 bg-black text-primary-foreground hover:from-primary/90 hover:bg-black-80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="mr-2 w-5 h-5" />
              Download Selected ({selectedCards.size})
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}