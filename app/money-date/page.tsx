"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeSpeaker, setActiveSpeaker] = useState<{
    name: string;
    role: string;
    desc: string;
    img: string;
  } | null>(null);

  const gallerySlides = [
    {
      img: "/assets/esther-about1.png",
      alt: "Esther Odejobi presenting at Money Date 1.0",
      caption: "Empowering Mindsets"
    },
    {
      img: "/assets/esther-about.JPG",
      alt: "Money Date 1.0 interactive session",
      caption: "Interactive Wealth Coaching"
    },
    {
      img: "/assets/Asset 18@4x.png",
      alt: "Money Date flyer design details",
      caption: "Curated Networking Moments"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % gallerySlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Forms state
  const [formData, setFormData] = useState({ name: "", email: "", ticketType: "General Admission" });
  const [partnerFormData, setPartnerFormData] = useState({ name: "", email: "", company: "", partnershipType: "Sponsorship", message: "" });
  const [newsletterEmail, setNewsletterEmail] = useState("");

  // Submission success states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [partnerFormSubmitted, setPartnerFormSubmitted] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date("October 10, 2026 11:00:00").getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Monitor scroll for header background opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load Paystack script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePartnerInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPartnerFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getTicketAmount = (ticketType: string) => {
    if (ticketType.includes("35,000") || ticketType.includes("General")) return 35000;
    if (ticketType.includes("32,000") || ticketType.includes("Early")) return 32000;
    if (ticketType.includes("65,000") || ticketType.includes("Duo")) return 65000;
    if (ticketType.includes("27,000") || ticketType.includes("Student")) return 27000;
    if (ticketType.includes("150,000") || ticketType.includes("Growth")) return 150000;
    return 35000;
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && (window as any).PaystackPop) {
      const amount = getTicketAmount(formData.ticketType);
      try {
        const handler = (window as any).PaystackPop.setup({
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_16d7a46e1669fe4842188267df812d8a56247df6",
          email: formData.email,
          amount: amount * 100,
          currency: "NGN",
          metadata: {
            custom_fields: [
              {
                display_name: "Attendee Name",
                variable_name: "attendee_name",
                value: formData.name
              },
              {
                display_name: "Ticket Type",
                variable_name: "ticket_type",
                value: formData.ticketType
              }
            ]
          },
          callback: function(response: any) {
            setFormSubmitted(true);
          },
          onClose: function() {
            alert("Transaction was not completed.");
          }
        });
        handler.openIframe();
      } catch (err) {
        console.error("Paystack initialization failed:", err);
        setTimeout(() => setFormSubmitted(true), 800);
      }
    } else {
      setTimeout(() => setFormSubmitted(true), 800);
    }
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setPartnerFormSubmitted(true), 800);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setNewsletterSubmitted(true);
      setNewsletterEmail("");
    }, 600);
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", ticketType: "General Admission" });
    setFormSubmitted(false);
    setModalOpen(false);
  };

  const resetPartnerForm = () => {
    setPartnerFormData({ name: "", email: "", company: "", partnershipType: "Sponsorship", message: "" });
    setPartnerFormSubmitted(false);
    setPartnerModalOpen(false);
  };

  // Toggle Accordion FAQ
  const toggleFaq = (index: number) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  // Panelists details
  const panelists = [
    {
      name: "TBA",
      role: "Personal Finance Educator",
      desc: "Helping individuals build healthier financial habits and create sustainable wealth through practical financial education.",
      img: "/assets/Asset 8@4x.png" // Green container, gold MD monogram
    },
    {
      name: "TBA",
      role: "Wellness & Nutrition Expert",
      desc: "Passionate about promoting healthier lifestyles through nutrition, preventive healthcare, and holistic wellness.",
      img: "/assets/Asset 9@4x.png" // Dark container, gold MD monogram
    },
    {
      name: "TBA",
      role: "Real Estate & Agribusiness Entrepreneur",
      desc: "An entrepreneur committed to creating sustainable wealth through real estate, agriculture, and strategic business investments.",
      img: "/assets/Asset 11@4x.png" // Gold container, dark MD monogram
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "My expectation was to learn about investing, especially money market funds, mutual funds, and stocks, and to understand which investment option best suited my current financial level. Money Date gave me the clarity I was looking for.",
      tag: "Money Date 1.0 Attendee"
    },
    {
      quote: "It was such a beautiful experience! Thank you, Esther, for the mindset shift. It was timely, wholesome, and truly impactful.",
      tag: "Money Date 1.0 Attendee"
    },
    {
      quote: "Thank you for such an impactful and insightful programme. I left feeling inspired, and I don't regret attending for a second.",
      tag: "Money Date 1.0 Attendee"
    },
    {
      quote: "You poured into us without holding back. The value I received was worth far more than the registration fee.",
      tag: "Money Date 1.0 Attendee"
    }
  ];

  // FAQ List
  const faqs = [
    {
      q: "When is Money Date with Esther Odejobi 2.0?",
      a: "Saturday, 10th October 2026."
    },
    {
      q: "Where will the event take place?",
      a: "The Zone, Gbagada, Lagos."
    },
    {
      q: "Who should attend?",
      a: "Young professionals, entrepreneurs, business owners, corporate professionals, recent graduates, and anyone committed to building wealth and living intentionally."
    },
    {
      q: "How much is the ticket?",
      a: "The standard General Admission ticket is ₦35,000 per attendee. We also offer Early Bird pricing (₦32,000) for early registrations, as well as Duo Pass (₦65,000), Student Pass (₦27,000), and Group Pass / Growth Circle (₦150,000) options for those attending with accountability partners."
    },
    {
      q: "Will there be networking opportunities?",
      a: "Absolutely! Money Date is intentionally designed to encourage meaningful conversations and lasting connections."
    },
    {
      q: "Will refreshments be provided?",
      a: "Yes. Refreshments will be served during the event, and every attendee will receive a curated gift bag as part of the Money Date experience."
    },
    {
      q: "What should I wear?",
      a: "Smart Casual. We encourage attendees to dress comfortably while embracing the premium atmosphere of the event."
    },
    {
      q: "How do I become a sponsor or partner?",
      a: "Simply click 'Become a Partner' or contact our team via email (info@moneydate.com) or phone."
    }
  ];

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-[60] flex items-center justify-between px-6 md:px-16 py-4 transition-all duration-300 ${scrolled ? "glass-header shadow-xl border-b border-royal-blue/10" : "bg-transparent"
          }`}
      >
        <a href="#top" className="inline-flex items-center gap-3">
          <div className="relative w-36 h-9 md:w-44 md:h-11">
            <Image
              src="/assets/Asset 17@4x.png"
              alt="Money Date Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xs bg-brand-green text-white font-bold px-2 py-0.5 rounded-full border border-gold/20">
            2.0
          </span>
        </a>

        {/* Desktop Nav links */}
        <div className="hidden min-[1000px]:flex items-center gap-8">
          <a href="#about" className="font-semibold text-sm text-white/80 hover:text-gold transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-gold after:transition-all hover:after:w-full">
            About
          </a>
          <a href="#why-attend" className="font-semibold text-sm text-white/80 hover:text-gold transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-gold after:transition-all hover:after:w-full">
            Why Attend
          </a>
          <a href="#pillars" className="font-semibold text-sm text-white/80 hover:text-gold transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-gold after:transition-all hover:after:w-full">
            Pillars
          </a>
          <a href="#host" className="font-semibold text-sm text-white/80 hover:text-gold transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-gold after:transition-all hover:after:w-full">
            The Host
          </a>
          <a href="#speakers" className="font-semibold text-sm text-white/80 hover:text-gold transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-gold after:transition-all hover:after:w-full">
            Speakers
          </a>
          <a href="#experience" className="font-semibold text-sm text-white/80 hover:text-gold transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-gold after:transition-all hover:after:w-full">
            Experience
          </a>
          <a href="#tickets" className="font-semibold text-sm text-white/80 hover:text-gold transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-gold after:transition-all hover:after:w-full">
            Tickets
          </a>
          <a href="#faq" className="font-semibold text-sm text-white/80 hover:text-gold transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-0 after:bg-gold after:transition-all hover:after:w-full">
            FAQ
          </a>
        </div>

        {/* CTA Register Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setModalOpen(true)}
            className="group hidden md:inline-flex items-center gap-2 font-extrabold tracking-wide rounded-full px-6 py-2.5 text-sm bg-gold hover:bg-gold-hover text-[#001333] shadow-[0_8px_20px_-6px_rgba(255,163,0,0.5)] hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            Reserve Your Seat
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>

          {/* Hamburger menu for mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex min-[1000px]:hidden flex-col gap-1.5 p-2 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white rounded transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-0.5 bg-white rounded transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`w-6 h-0.5 bg-white rounded transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 bg-[#002A1C] flex flex-col items-center justify-center gap-6 transition-all duration-300 ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
      >
        <a onClick={() => setMobileMenuOpen(false)} href="#about" className="text-xl uppercase tracking-wider text-white hover:text-gold transition-colors">About</a>
        <a onClick={() => setMobileMenuOpen(false)} href="#why-attend" className="text-xl uppercase tracking-wider text-white hover:text-gold transition-colors">Why Attend</a>
        <a onClick={() => setMobileMenuOpen(false)} href="#pillars" className="text-xl uppercase tracking-wider text-white hover:text-gold transition-colors">Core Pillars</a>
        <a onClick={() => setMobileMenuOpen(false)} href="#host" className="text-xl uppercase tracking-wider text-white hover:text-gold transition-colors">The Host</a>
        <a onClick={() => setMobileMenuOpen(false)} href="#speakers" className="text-xl uppercase tracking-wider text-white hover:text-gold transition-colors">Speakers</a>
        <a onClick={() => setMobileMenuOpen(false)} href="#experience" className="text-xl uppercase tracking-wider text-white hover:text-gold transition-colors">Experience</a>
        <a onClick={() => setMobileMenuOpen(false)} href="#tickets" className="text-xl uppercase tracking-wider text-white hover:text-gold transition-colors">Tickets</a>
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            setModalOpen(true);
          }}
          className="text-xl text-gold uppercase tracking-wider mt-4"
        >
          Reserve Your Seat
        </button>
      </div>

      {/* 2. Hero Section */}
      <header
        id="top"
        className="relative min-h-[100vh] lg:min-h-[90vh] overflow-hidden flex flex-col bg-[radial-gradient(120%_80%_at_78%_-5%,rgba(255,255,255,0.15),transparent_55%),radial-gradient(90%_70%_at_10%_110%,rgba(0,104,74,0.45),transparent_60%),linear-gradient(160deg,#00684A_0%,#004D36_45%,#002A1C_100%)] pt-6 lg:py-8"
      >
        {/* Angular mesh visual highlights */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none mix-blend-screen bg-[linear-gradient(74deg,transparent_46%,rgba(255,255,255,0.02)_47%,rgba(255,255,255,0.02)_49%,transparent_50%),linear-gradient(110deg,transparent_60%,rgba(0,104,74,0.15)_61%,transparent_70%)]"></div>

        {/* Floating coins */}
        <span className="absolute z-[3] bottom-[15%] left-[-4%] hidden xl:block">
          <span className="relative inline-block animate-floaty" style={{ width: "240px", height: "240px" }}>
            <Image src="/coin1.svg" alt="Gold Coin" width={240} height={240} className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]" />
          </span>
        </span>
        <span className="absolute z-[3] top-[18%] right-[-3%] hidden xl:block">
          <span className="relative inline-block animate-floaty" style={{ width: "200px", height: "200px", animationDelay: "-2.5s" }}>
            <Image src="/coin2.svg" alt="Gold Coin" width={200} height={200} className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]" />
          </span>
        </span>

        {/* Hero Content grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-6 max-w-[1240px] mx-auto w-full px-6 md:px-16 relative z-[15] pt-4 md:pt-8 pb-8 lg:pb-0">
          <div className="relative z-[6] text-center lg:text-left min-h-[92vh] lg:min-h-0 flex flex-col justify-center items-center lg:items-start pt-12 lg:pt-0">
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-3">
              <span className="font-bold text-[0.72rem] tracking-widest uppercase text-white px-3 py-1 border border-white/20 rounded-full inline-flex items-center gap-1.5 bg-royal-blue/20">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>Money Date 2.0
              </span>
              <span className="font-bold text-[0.72rem] tracking-widest uppercase text-white px-3 py-1 border border-white/20 rounded-full bg-royal-blue/20">
                Lagos, Nigeria
              </span>
            </div>

            <h1 className="text-2xl md:text-[2.6rem] leading-tight uppercase font-black text-white mt-1 mb-3 drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)]">
              Beyond <span className="text-gold">Money:</span> Building a Life <span className="text-gold whitespace-nowrap">That Thrives.</span>
            </h1>

            <p className="text-white/95 text-sm md:text-base font-medium tracking-wide mb-4 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Bigger Conversations. Better Connections. Smarter Money Decisions.
              <span className="block mt-1 text-xs md:text-sm text-white/70">A premium biannual financial wellness experience merging wealth creation with intentional living.</span>
            </p>

            {/* Event Info Panel */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-white/90 max-w-2xl bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0 border border-gold/20">
                  <svg className="w-4.5 h-4.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x={3} y={4} width={18} height={18} rx={2} ry={2} />
                    <line x1={16} y1={2} x2={16} y2={6} />
                    <line x1={8} y1={2} x2={8} y2={6} />
                    <line x1={3} y1={10} x2={21} y2={10} />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="font-extrabold text-xs block leading-tight">Saturday, 10th Oct 2026</span>
                  <small className="text-[9px] text-white/60 font-semibold uppercase">Date</small>
                </div>
              </div>
              <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-x border-white/10 pt-2 sm:pt-0 sm:px-2">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0 border border-gold/20">
                  <svg className="w-4.5 h-4.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx={12} cy={12} r={10} />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="font-extrabold text-xs block leading-tight">11:00 AM – 4:00 PM</span>
                  <small className="text-[9px] text-white/60 font-semibold uppercase">Time</small>
                </div>
              </div>
              <div className="flex items-center gap-2 border-t sm:border-t-0 pt-2 sm:pt-0">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0 border border-gold/20">
                  <svg className="w-4.5 h-4.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z" />
                    <circle cx={12} cy={10} r={3} />
                  </svg>
                </div>
                <div className="text-left">
                  <span className="font-extrabold text-xs block leading-tight">The Zone, Gbagada</span>
                  <small className="text-[9px] text-white/60 font-semibold uppercase">Lagos, Nigeria</small>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 items-center">
              <button
                onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-2.5 font-extrabold tracking-wide rounded-full px-6 py-3 text-sm bg-gold text-[#001333] shadow-[0_12px_25px_-8px_rgba(255,163,0,0.7)] hover:-translate-y-0.5 hover:shadow-[0_18px_35px_-6px_rgba(255,163,0,0.85)] transition-all cursor-pointer"
              >
                Reserve Your Seat
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
              <a
                href="#tickets"
                className="font-bold text-xs md:text-sm text-white/80 hover:text-white border-b border-white/20 hover:border-gold pb-1 transition-all"
              >
                View Ticket Options
              </a>
            </div>
          </div>

          {/* Right Column: Premium Host Flyer Overlay */}
          <div className="relative self-end h-full min-w-0 flex items-end justify-center lg:justify-end z-10 lg:z-30">
            <div className="relative w-full max-w-[380px] flex items-end justify-center">
              <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-square rounded-full blur-[20px] bg-[radial-gradient(circle,rgba(0,104,74,0.5),transparent_65%)]"></div>
              <Image
                src="/assets/esther-about1.png"
                alt="Esther Odejobi - Money Date Host"
                width={380}
                height={470}
                className="relative z-10 w-full h-auto object-bottom drop-shadow-[0_20px_40px_rgba(2,12,50,0.6)] rounded-3xl translate-y-12 lg:translate-y-0"
                priority
              />
            </div>
          </div>
        </div>

        {/* Vector Background Overlays (Skyline and Gradients) */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none z-[8]">
          <Image src="/city.svg" alt="Skyline" width={1440} height={300} className="w-full h-auto object-bottom opacity-15" />
        </div>
        <div className="absolute bottom-0 left-0 w-full pointer-events-none z-20">
          <Image src="/down-bg.svg" alt="Skyline Overlay" width={1440} height={150} className="w-full h-auto object-bottom" />
        </div>
      </header>

      <section className="relative w-full overflow-hidden bg-royal-blue py-4 z-20 border-y border-white/10 shadow-lg">
        <div className="flex w-max animate-marquee whitespace-nowrap gap-12">
          <div className="flex items-center gap-12 shrink-0">
            <span className="text-white font-extrabold uppercase text-xs md:text-sm tracking-[0.2em] inline-flex items-center gap-4">
              LEARN <span className="text-gold">•</span> CONNECT <span className="text-gold">•</span> GROW <span className="text-gold">•</span> MONEY DATE 2.0
            </span>
            <span className="text-white font-extrabold uppercase text-xs md:text-sm tracking-[0.2em] inline-flex items-center gap-4">
              BEYOND MONEY <span className="text-gold">•</span> FINANCIAL WELLNESS <span className="text-gold">•</span> INTENTIONAL LIVING
            </span>
            <span className="text-white font-extrabold uppercase text-xs md:text-sm tracking-[0.2em] inline-flex items-center gap-4">
              SATURDAY, 10TH OCTOBER 2026 <span className="text-gold">•</span> THE ZONE, GBAGADA
            </span>
          </div>
          <div className="flex items-center gap-12 shrink-0" aria-hidden="true">
            <span className="text-white font-extrabold uppercase text-xs md:text-sm tracking-[0.2em] inline-flex items-center gap-4">
              LEARN <span className="text-gold">•</span> CONNECT <span className="text-gold">•</span> GROW <span className="text-gold">•</span> MONEY DATE 2.0
            </span>
            <span className="text-white font-extrabold uppercase text-xs md:text-sm tracking-[0.2em] inline-flex items-center gap-4">
              BEYOND MONEY <span className="text-gold">•</span> FINANCIAL WELLNESS <span className="text-gold">•</span> INTENTIONAL LIVING
            </span>
            <span className="text-white font-extrabold uppercase text-xs md:text-sm tracking-[0.2em] inline-flex items-center gap-4">
              SATURDAY, 10TH OCTOBER 2026 <span className="text-gold">•</span> THE ZONE, GBAGADA
            </span>
          </div>
        </div>
      </section>

      {/* 4. Philosophy & Manifesto Section */}
      <section id="about" className="relative text-white py-24 bg-gradient-to-b from-brand-green to-brand-green-dark">
        <div className="max-w-[1240px] mx-auto px-6 md:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 font-bold text-xs md:text-sm tracking-widest uppercase text-gold mb-3">
                <span className="w-8 h-[1.5px] bg-gold"></span>This Is More Than an Event
              </div>
              <h2 className="text-3xl md:text-5xl uppercase font-black leading-[1.1] tracking-wide mb-6">
                Redefining Success.<br />
                Finance Meets Wellness.<br />
                <span className="text-gold">Knowledge Meets Action.</span>
              </h2>
              <div className="space-y-4 text-white/90 text-base md:text-lg leading-relaxed">
                <p>
                  We believe wealth is more than the money in your bank account. Success should never come at the expense of your health, your peace of mind, or the people who matter most.
                </p>
                <p>
                  Financial freedom begins with intentional decisions, meaningful conversations, and the courage to take action. Building a fulfilling life requires more than earning more—it requires wisdom, discipline, balance, and community.
                </p>
                <p className="font-bold text-white">
                  At Money Date, we challenge the idea that you have to choose between building wealth and living well. Welcome to Money Date with Esther Odejobi.
                </p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/10 rounded-bl-full"></div>
              <h3 className="text-xl uppercase text-white font-extrabold mb-4">Why Money Date Exists</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Today's ambitious professionals are working harder than ever to build wealth, yet many still struggle with financial uncertainty, burnout, and unhealthy lifestyles.
              </p>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Money Date with Esther Odejobi was created to change that. We believe true success goes beyond financial achievement—it includes living well, making intentional choices, and building a life you genuinely enjoy.
              </p>
              <p className="text-white/80 text-sm leading-relaxed">
                By bringing together finance, wellness, and intentional living, Money Date creates a space for honest conversations, practical learning, and meaningful connections that inspire lasting personal and financial growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Attend Section */}
      <section id="why-attend" className="relative text-white py-24 bg-gradient-to-b from-royal-blue to-royal-blue-dark border-t border-white/5 shadow-inner">
        <div className="max-w-[1240px] mx-auto px-6 md:px-16 w-full">
          <div className="max-w-2xl mb-16">
            <div className="flex items-center gap-3 font-bold text-xs md:text-sm tracking-widest uppercase text-gold mb-2">
              <span className="w-8 h-[1.5px] bg-gold"></span>Leave With More Than Inspiration
            </div>
            <h2 className="text-3xl md:text-5xl uppercase font-black">
              Why Attend <span className="text-gold">Money Date?</span>
            </h2>
            <p className="text-white/80 mt-4 text-sm md:text-base leading-relaxed">
              Money Date is designed to equip you with the knowledge, connections, and confidence to thrive financially, personally, and professionally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative overflow-hidden bg-[#001333]/45 border border-white/10 rounded-2xl p-6 pb-14 hover:bg-[#001333]/70 hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 shadow-lg isolate">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-bl-full pointer-events-none"></div>
              <div className="absolute right-4 bottom-1 text-7xl md:text-8xl font-black text-white/5 select-none pointer-events-none -z-10">01</div>
              <div className="mb-3 z-10 relative">
                <h3 className="text-white font-extrabold text-sm uppercase tracking-wider">Practical Wealth Strategies</h3>
              </div>
              <p className="text-white/80 text-sm leading-relaxed relative z-10">
                Acquire direct financial strategies to help you earn, manage, grow, and enjoy your money in today's landscape.
              </p>
            </div>
            <div className="relative overflow-hidden bg-[#001333]/45 border border-white/10 rounded-2xl p-6 pb-14 hover:bg-[#001333]/70 hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 shadow-lg isolate">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-bl-full pointer-events-none"></div>
              <div className="absolute right-4 bottom-1 text-7xl md:text-8xl font-black text-white/5 select-none pointer-events-none -z-10">02</div>
              <div className="mb-3 z-10 relative">
                <h3 className="text-white font-extrabold text-sm uppercase tracking-wider">Expert Insights</h3>
              </div>
              <p className="text-white/80 text-sm leading-relaxed relative z-10">
                Learn directly from respected leaders in finance, wellness, business, and investments during keynotes and panels.
              </p>
            </div>
            <div className="relative overflow-hidden bg-[#001333]/45 border border-white/10 rounded-2xl p-6 pb-14 hover:bg-[#001333]/70 hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 shadow-lg isolate">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-bl-full pointer-events-none"></div>
              <div className="absolute right-4 bottom-1 text-7xl md:text-8xl font-black text-white/5 select-none pointer-events-none -z-10">03</div>
              <div className="mb-3 z-10 relative">
                <h3 className="text-white font-extrabold text-sm uppercase tracking-wider">Premium Networking</h3>
              </div>
              <p className="text-white/80 text-sm leading-relaxed relative z-10">
                Build meaningful partnerships and networks with ambitious professionals, entrepreneurs, and growth-minded peers.
              </p>
            </div>
            <div className="relative overflow-hidden bg-[#001333]/45 border border-white/10 rounded-2xl p-6 pb-14 hover:bg-[#001333]/70 hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 shadow-lg isolate">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-bl-full pointer-events-none"></div>
              <div className="absolute right-4 bottom-1 text-7xl md:text-8xl font-black text-white/5 select-none pointer-events-none -z-10">04</div>
              <div className="mb-3 z-10 relative">
                <h3 className="text-white font-extrabold text-sm uppercase tracking-wider">Holistic Wellness</h3>
              </div>
              <p className="text-white/80 text-sm leading-relaxed relative z-10">
                Unlock wellness conversations that prevent burnout and promote healthier, more balanced, and integrated living.
              </p>
            </div>
            <div className="relative overflow-hidden bg-[#001333]/45 border border-white/10 rounded-2xl p-6 pb-14 hover:bg-[#001333]/70 hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 shadow-lg isolate">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-bl-full pointer-events-none"></div>
              <div className="absolute right-4 bottom-1 text-7xl md:text-8xl font-black text-white/5 select-none pointer-events-none -z-10">05</div>
              <div className="mb-3 z-10 relative">
                <h3 className="text-white font-extrabold text-sm uppercase tracking-wider">Actionable Takeaways</h3>
              </div>
              <p className="text-white/80 text-sm leading-relaxed relative z-10">
                Walk away with tangible templates, resources, and action steps you can immediately apply to your career and life.
              </p>
            </div>
            <div className="bg-[#001333]/65 border border-gold/30 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
              <div>
                <h4 className="font-extrabold text-gold uppercase text-sm tracking-wider mb-2">Designed For You</h4>
                <p className="text-white/80 text-xs leading-relaxed">
                  Whether you are a young professional, entrepreneur, business owner, corporate executive, recent graduate, or simply someone committed to growth—Money Date is your opportunity to move beyond money.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="mt-4 w-full bg-gold hover:bg-gold-hover text-[#001333] font-bold text-xs py-2.5 rounded-lg transition-colors cursor-pointer text-center shadow-md shadow-gold/10"
              >
                Reserve Seat Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Core Pillars Section */}
      <section id="pillars" className="relative py-24 bg-white text-[#001333]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-16 w-full">
          <div className="max-w-2xl mb-16">
            <div className="flex items-center gap-3 font-bold text-xs md:text-sm tracking-widest uppercase text-royal-blue mb-2">
              <span className="w-8 h-[1.5px] bg-royal-blue"></span>Our Foundation
            </div>
            <h2 className="text-3xl md:text-5xl uppercase font-black text-[#001333]">
              The 4 Pillars of <span className="text-royal-blue">Money Date</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="group border border-slate-100 rounded-2xl bg-slate-50 p-6 transition-all duration-300 hover:bg-royal-blue hover:text-white hover:-translate-y-1.5 hover:shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-royal-blue/10 text-royal-blue flex items-center justify-center font-bold text-xl mb-6 group-hover:bg-gold group-hover:text-[#001333] transition-colors">
                ₦
              </div>
              <h3 className="font-extrabold text-lg uppercase mb-3 text-[#001333] group-hover:text-white">Financial Growth</h3>
              <p className="text-slate-600 text-sm leading-relaxed group-hover:text-white/80">
                Earning more, managing money wisely, investing strategically, and building sustainable wealth.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="group border border-slate-100 rounded-2xl bg-slate-50 p-6 transition-all duration-300 hover:bg-royal-blue hover:text-white hover:-translate-y-1.5 hover:shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-royal-blue/10 text-royal-blue flex items-center justify-center font-bold text-xl mb-6 group-hover:bg-gold group-hover:text-[#001333] transition-colors">
                ♥
              </div>
              <h3 className="font-extrabold text-lg uppercase mb-3 text-[#001333] group-hover:text-white">Personal Wellness</h3>
              <p className="text-slate-600 text-sm leading-relaxed group-hover:text-white/80">
                Prioritizing physical, mental, and emotional well-being as the foundation for long-term achievement.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="group border border-slate-100 rounded-2xl bg-slate-50 p-6 transition-all duration-300 hover:bg-royal-blue hover:text-white hover:-translate-y-1.5 hover:shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-royal-blue/10 text-royal-blue flex items-center justify-center font-bold text-xl mb-6 group-hover:bg-gold group-hover:text-[#001333] transition-colors">
                ☉
              </div>
              <h3 className="font-extrabold text-lg uppercase mb-3 text-[#001333] group-hover:text-white">Intentional Living</h3>
              <p className="text-slate-600 text-sm leading-relaxed group-hover:text-white/80">
                Making conscious, aligned choices that coordinate with your personal values and lifetime vision.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="group border border-slate-100 rounded-2xl bg-slate-50 p-6 transition-all duration-300 hover:bg-royal-blue hover:text-white hover:-translate-y-1.5 hover:shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-royal-blue/10 text-royal-blue flex items-center justify-center font-bold text-xl mb-6 group-hover:bg-gold group-hover:text-[#001333] transition-colors">
                👥
              </div>
              <h3 className="font-extrabold text-lg uppercase mb-3 text-[#001333] group-hover:text-white">Meaningful Community</h3>
              <p className="text-slate-600 text-sm leading-relaxed group-hover:text-white/80">
                Surrounding yourself with growth-oriented peers committed to mutual support and accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Meet Esther Odejobi (Host Profile) */}
      <section id="host" className="relative py-24 bg-gradient-to-b from-[#004D36] to-[#002A1C] text-white border-t border-white/5">
        <div className="max-w-[1240px] mx-auto px-6 md:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
            {/* Portrait Card */}
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-b from-royal-blue to-royal-blue-dark">
              <div className="aspect-[4/5] relative w-full">
                <Image
                  src="/assets/esther2.png"
                  alt="Esther Odejobi"
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-102"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-royal-blue-dark/95 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="font-bold text-xs uppercase tracking-wider text-gold">Founder & Host</span>
                <h3 className="text-2xl uppercase font-black mt-1">Esther Odejobi</h3>
              </div>
            </div>

            {/* Biography Details */}
            <div>
              <div className="flex items-center gap-3 font-bold text-xs md:text-sm tracking-widest uppercase text-gold mb-3">
                <span className="w-8 h-[1.5px] bg-gold"></span>Meet Your Host
              </div>
              <h2 className="text-3xl md:text-5xl uppercase font-black mb-6">
                Esther Odejobi
              </h2>
              <div className="space-y-4 text-white/80 text-base md:text-lg leading-relaxed">
                <p>
                  Esther Odejobi is a financial educator, speaker, and wealth coach passionate about helping people build healthier relationships with money. Through practical financial education and honest conversations, she empowers individuals to make smarter financial decisions, build sustainable wealth, and live more intentionally.
                </p>
                <p>
                  Through her speaking engagements, coaching programmes, digital platforms, and educational initiatives, Esther has helped thousands of individuals make smarter financial decisions and build healthier relationships with money.
                </p>
                <p>
                  As the visionary behind Money Date, Esther is on a mission to redefine success by showing that true wealth isn’t just about what you earn—it’s about how you live.
                </p>
                <blockquote>
                  <p className="border-l-4 border-gold pl-4 py-1 text-gold italic font-medium my-6">
                    "True success goes beyond financial achievement. It includes living well, making intentional choices, and building a life you genuinely enjoy."
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Panelists Showcase Grid */}
      <section id="speakers" className="relative py-24 bg-slate-50 text-[#001333]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-16 w-full">
          <div className="max-w-2xl mb-16 text-center mx-auto">
            <div className="inline-flex items-center gap-3 font-bold text-xs md:text-sm tracking-widest uppercase text-royal-blue mb-2">
              <span className="w-6 h-[1.5px] bg-royal-blue"></span>Expert panel
            </div>
            <h2 className="text-3xl md:text-5xl uppercase font-black text-[#001333]">
              Meet the Panelists
            </h2>
            <p className="text-slate-600 text-sm md:text-base mt-4">
              Learn from respected experts and industry leaders who are shaping conversations around finance, wellness, and intentional living.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {panelists.map((panelist, idx) => (
              <div
                key={idx}
                onClick={() => setActiveSpeaker(panelist)}
                className="group relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-b from-[#002A1C]/25 to-[#004D36]/25 border border-white/10 shadow-lg cursor-pointer flex items-center justify-center p-8 transition-all duration-350 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Panelist Monogram Graphic */}
                <div className="relative w-40 h-40 transform group-hover:scale-102 transition-transform duration-500">
                  <Image
                    src={panelist.img}
                    alt={panelist.role}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001333]/90 via-transparent to-transparent flex flex-col justify-end p-6 opacity-90 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-xl font-black uppercase text-white tracking-wide">{panelist.name}</h3>
                  <p className="text-gold/90 text-xs font-semibold uppercase tracking-wider mt-1">{panelist.role}</p>
                  <span className="inline-flex items-center gap-1.5 text-white/70 hover:text-gold text-xs font-bold uppercase tracking-wider mt-3 transition-colors">
                    View Bio <span>→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Event Experience */}
      <section id="experience" className="relative py-24 bg-gradient-to-b from-[#002A1C] to-[#004D36] text-white">
        <div className="max-w-[1240px] mx-auto px-6 md:px-16 w-full">
          <div className="max-w-2xl mb-16">
            <div className="flex items-center gap-3 font-bold text-xs md:text-sm tracking-widest uppercase text-gold mb-2">
              <span className="w-8 h-[1.5px] bg-gold"></span>What You'll Experience
            </div>
            <h2 className="text-3xl md:text-5xl uppercase font-black">
              Designed to <span className="text-gold">Transform</span>
            </h2>
            <p className="text-white/60 mt-4">
              Every moment is intentionally designed to educate, inspire, and connect. Here is what to expect throughout the day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "Inspiring Keynote Sessions", d: "Deep dives on financial wellness, investment structures, and intentional lifestyle architecture." },
              { t: "Expert Panel Conversations", d: "Discussions with industry specialists sharing actionable frameworks for wealth growth." },
              { t: "Interactive Q&A Blocks", d: "Direct access to ask our panelists and host your burning questions." },
              { t: "Wellness Activations", d: "Guided sessions to help audit personal health limits, prevent burnout, and manage stress." },
              { t: "Curated Networking Blocks", d: "Structured matching to connect with accountability partners, peers, and mentors." },
              { t: "Brand Activations & Giveaways", d: "Exciting sponsored items, free template kits, and curated special moments." }
            ].map((exp, idx) => (
              <div key={idx} className="relative overflow-hidden border border-white/5 bg-white/5 hover:bg-white/10 p-6 pb-14 rounded-2xl transition-all duration-300 isolate">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 rounded-bl-full pointer-events-none"></div>
                <div className="absolute right-4 bottom-1 text-7xl md:text-8xl font-black text-white/5 select-none pointer-events-none -z-10">0{idx + 1}</div>
                <h3 className="text-lg font-extrabold uppercase mb-2 text-white relative z-10">{exp.t}</h3>
                <p className="text-white/70 text-sm leading-relaxed relative z-10">{exp.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9.5 Relive the Experience (Gallery Carousel) */}
      <section className="relative py-24 bg-white text-[#001333] border-t border-slate-100 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 md:px-16 w-full">
          <div className="max-w-2xl mb-12">
            <div className="flex items-center gap-3 font-bold text-xs md:text-sm tracking-widest uppercase text-royal-blue mb-2">
              <span className="w-8 h-[1.5px] bg-royal-blue"></span>Relive the Experience
            </div>
            <h2 className="text-3xl md:text-5xl uppercase font-black text-[#001333]">
              Money Date 1.0 Highlights
            </h2>
            <p className="text-slate-600 mt-4 text-sm md:text-base leading-relaxed">
              Take a look back at highlights from the previous edition of Money Date and relive the conversations, connections, and memorable moments that continue to shape our growing community.
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 group">
            {/* Slides Wrapper */}
            <div
              className="flex w-full h-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {gallerySlides.map((slide, idx) => (
                <div key={idx} className="relative w-full h-full shrink-0">
                  <Image
                    src={slide.img}
                    alt={slide.alt}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                  />
                  {/* Overlay shadow & caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001333]/70 via-[#001333]/20 to-transparent flex flex-col justify-end p-8 md:p-12 text-white">
                    <span className="text-gold font-bold text-xs md:text-sm uppercase tracking-wider mb-1">Highlight 0{idx + 1}</span>
                    <h3 className="text-lg md:text-2xl font-black uppercase">{slide.caption}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls Bar Beneath Gallery */}
          <div className="flex items-center justify-between mt-6 max-w-[1240px] mx-auto">
            {/* Slide Indicator Dots on the Left */}
            <div className="flex gap-2">
              {gallerySlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${activeSlide === idx ? "bg-royal-blue w-6" : "bg-slate-300 hover:bg-slate-400"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev and Next Arrow Buttons Close Together on the Right */}
            <div className="flex items-center gap-3">
              {/* Prev Button */}
              <button
                onClick={() => setActiveSlide((prev) => (prev - 1 + gallerySlides.length) % gallerySlides.length)}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-royal-blue hover:text-white text-[#001333] flex items-center justify-center transition-all cursor-pointer shadow-md text-lg font-bold"
                aria-label="Previous slide"
              >
                ←
              </button>
              {/* Next Button */}
              <button
                onClick={() => setActiveSlide((prev) => (prev + 1) % gallerySlides.length)}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-royal-blue hover:text-white text-[#001333] flex items-center justify-center transition-all cursor-pointer shadow-md text-lg font-bold"
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="relative py-24 bg-slate-50 text-[#001333]">
        <div className="max-w-[1240px] mx-auto px-6 md:px-16 w-full">
          <div className="max-w-2xl mb-16 text-center mx-auto">
            <div className="inline-flex items-center gap-3 font-bold text-xs md:text-sm tracking-widest uppercase text-royal-blue mb-2">
              <span className="w-6 h-[1.5px] bg-royal-blue"></span>Attendee Stories
            </div>
            <h2 className="text-3xl md:text-5xl uppercase font-black text-[#001333]">
              What Past Attendees Are Saying
            </h2>
            <p className="text-slate-600 text-sm md:text-base mt-4">
              Don't just take our word for it—hear from attendees who experienced Money Date 1.0.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-3xl p-8 shadow-md relative hover:shadow-lg transition-shadow">
                <span className="text-royal-blue/20 text-6xl font-serif absolute top-4 left-6 pointer-events-none">“</span>
                <p className="text-slate-700 text-base leading-relaxed mb-6 italic relative z-10 pl-6">
                  {test.quote}
                </p>
                <div className="pl-6 border-l-2 border-gold">
                  <h4 className="font-extrabold text-sm text-[#001333]">{test.tag}</h4>
                  <small className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Money Date 1.0 Delegate</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Venue Information Section */}
      <section className="relative py-24 bg-white text-[#001333] border-t border-slate-100">
        <div className="max-w-[1240px] mx-auto px-6 md:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 font-bold text-xs md:text-sm tracking-widest uppercase text-royal-blue mb-2">
                <span className="w-8 h-[1.5px] bg-royal-blue"></span>Location & Directions
              </div>
              <h2 className="text-3xl md:text-5xl uppercase font-black text-[#001333] mb-6">
                The Venue
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 bg-royal-blue/10 rounded-2xl flex items-center justify-center text-royal-blue">
                    <svg className="w-6 h-6 text-royal-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M12 2a8 8 0 00-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 00-8-8z" />
                      <circle cx={12} cy={10} r={3} />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-[#001333] mb-1">The Zone, Gbagada</h4>
                    <p className="text-slate-600 text-sm">Gbagada Expressway, Gbagada, Lagos, Nigeria</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-[#001333] mb-1">Access & Arrival</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Centrally located in Gbagada, The Zone provides a modern, world-class learning space easily reached from both the Mainland and Island. We advise arriving by 10:30 AM for registration, verification, and early seat selection.
                  </p>
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-[#001333] mb-1">Parking & Ride-Hailing</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Secure on-site parking is available. However, due to limited space, ride-hailing services are strongly recommended for maximum convenience.
                  </p>
                </div>
              </div>
            </div>

            {/* Directions Map Visual Card */}
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-200 shadow-xl w-full min-h-[340px] bg-slate-100">
              <iframe
                title="The Zone, Gbagada Location Map"
                src="https://maps.google.com/maps?q=The%20Zone,%20Gbagada,%20Lagos&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 absolute inset-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Tickets & Pricing Grid */}
      <section id="tickets" className="relative py-24 bg-gradient-to-b from-[#004D36] to-[#002A1C] text-white">
        <div className="max-w-[1240px] mx-auto px-6 md:px-16 w-full">
          <div className="max-w-2xl mb-16">
            <div className="flex items-center gap-3 font-bold text-xs md:text-sm tracking-widest uppercase text-gold mb-2">
              <span className="w-8 h-[1.5px] bg-gold"></span>Choose Your Pass
            </div>
            <h2 className="text-3xl md:text-5xl uppercase font-black">
              Ticketing <span className="text-gold">Packages</span>
            </h2>
            <p className="text-white/60 mt-4">
              Select the package that fits you best and secure your access to this premium financial wellness experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {/* Early Bird */}
            <div className="border border-white/15 bg-white/5 rounded-3xl p-8 hover:border-royal-blue transition-all flex flex-col justify-between h-full">
              <div>
                <div className="inline-block bg-royal-blue/20 border border-royal-blue/30 rounded-full px-3 py-1 text-xs font-bold text-gold uppercase tracking-wider mb-4">
                  Limited Offer
                </div>
                <h3 className="text-xl font-extrabold uppercase mb-2 text-white">Early Bird Pass</h3>
                <div className="text-3xl font-black text-gold mb-4">₦32,000</div>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Be among the first to secure your seat and enjoy premium early-bird pricing. Complete access to all main stage sections.
                </p>
              </div>
              <button
                onClick={() => {
                  setFormData(prev => ({ ...prev, ticketType: "Early Bird Pass (₦32,000)" }));
                  setModalOpen(true);
                }}
                className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl text-sm transition-all cursor-pointer mt-auto"
              >
                Claim Early Bird
              </button>
            </div>

            {/* General Admission */}
            <div className="border-2 border-gold bg-royal-blue rounded-3xl p-8 relative shadow-2xl flex flex-col justify-between h-full transform lg:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-[#001333] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Recommended
              </div>
              <div>
                <h3 className="text-xl font-extrabold uppercase mb-2 mt-2 text-white">General Admission</h3>
                <div className="text-4xl font-black text-gold mb-4">₦35,000</div>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  Full delegate experience including access to panels, networking blocks, wellness audits, curated gift bags, and refreshments.
                </p>
                <ul className="space-y-3 text-xs text-white/70 mb-8">
                  <li className="flex items-center gap-2">✓ Full access to all event sessions</li>
                  <li className="flex items-center gap-2">✓ Expert panels & interactive Q&A</li>
                  <li className="flex items-center gap-2">✓ Structured networking blocks</li>
                  <li className="flex items-center gap-2">✓ Wellness activations & checks</li>
                  <li className="flex items-center gap-2">✓ Refreshments & catered drinks</li>
                  <li className="flex items-center gap-2">✓ Curated Money Date Gift Bag</li>
                </ul>
              </div>
              <button
                onClick={() => {
                  setFormData(prev => ({ ...prev, ticketType: "General Admission (₦35,000)" }));
                  setModalOpen(true);
                }}
                className="w-full py-3.5 bg-gold hover:bg-gold-hover text-[#001333] font-extrabold rounded-xl text-sm transition-all cursor-pointer shadow-lg shadow-gold/20"
              >
                Buy Ticket Now
              </button>
            </div>

            {/* Duo Pass */}
            <div className="border border-white/15 bg-white/5 rounded-3xl p-8 hover:border-royal-blue transition-all flex flex-col justify-between h-full">
              <div>
                <div className="inline-block bg-royal-blue/20 border border-royal-blue/30 rounded-full px-3 py-1 text-xs font-bold text-white uppercase tracking-wider mb-4">
                  Save ₦5,000
                </div>
                <h3 className="text-xl font-extrabold uppercase mb-2 text-white">Duo Pass (2 Tickets)</h3>
                <div className="text-3xl font-black text-gold mb-4">₦65,000</div>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Attend with a friend, co-worker, or accountability partner. Share the insights, network, and grow together at a discounted rate.
                </p>
              </div>
              <button
                onClick={() => {
                  setFormData(prev => ({ ...prev, ticketType: "Duo Pass (₦65,000)" }));
                  setModalOpen(true);
                }}
                className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl text-sm transition-all cursor-pointer mt-auto"
              >
                Claim Duo Pass
              </button>
            </div>
          </div>

          {/* Student Pass & Growth Circle in Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto items-stretch">
            {/* Student Pass */}
            <div className="border border-white/15 bg-white/5 rounded-3xl p-8 hover:border-royal-blue transition-all flex flex-col justify-between h-full">
              <div>
                <div className="inline-block bg-royal-blue/20 border border-royal-blue/30 rounded-full px-3 py-1 text-xs font-bold text-white uppercase tracking-wider mb-4">
                  Valid ID Required
                </div>
                <h3 className="text-xl font-extrabold uppercase mb-2 text-white">Student Pass</h3>
                <div className="text-3xl font-black text-gold mb-4">₦27,000</div>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Created for students who are ready to build solid financial and wellness habits early. A valid student ID will be required at check-in.
                </p>
              </div>
              <button
                onClick={() => {
                  setFormData(prev => ({ ...prev, ticketType: "Student Pass (₦27,000)" }));
                  setModalOpen(true);
                }}
                className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl text-sm transition-all cursor-pointer mt-auto"
              >
                Claim Student Pass
              </button>
            </div>

            {/* Growth Circle Pass */}
            <div className="border border-white/15 bg-white/5 rounded-3xl p-8 hover:border-royal-blue transition-all flex flex-col justify-between h-full">
              <div>
                <div className="inline-block bg-royal-blue/20 border border-royal-blue/30 rounded-full px-3 py-1 text-xs font-bold text-white uppercase tracking-wider mb-4">
                  Save ₦15,000
                </div>
                <h3 className="text-xl font-extrabold uppercase mb-2 text-white">Growth Circle (5 Tickets)</h3>
                <div className="text-3xl font-black text-gold mb-4">₦150,000</div>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Building wealth is better together. Bring your friends, colleagues, or accountability partners and enjoy exclusive group savings while experiencing Money Date as a team.
                </p>
              </div>
              <button
                onClick={() => {
                  setFormData(prev => ({ ...prev, ticketType: "Growth Circle Pass (₦150,000)" }));
                  setModalOpen(true);
                }}
                className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl text-sm transition-all cursor-pointer mt-auto"
              >
                Claim Group Pass
              </button>
            </div>
          </div>

          {/* Seat limitation warning */}
          <div className="mt-12 text-center text-white/50 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2">
            <span className="w-2.5 h-2.5 bg-orange rounded-full animate-ping"></span>
            Only 100 seats are available on a first-come, first-served basis.
          </div>
        </div>
      </section>

      {/* 13. Partners & Sponsors Grid */}
      <section className="relative py-20 bg-slate-50 text-[#001333] border-t border-slate-100">
        <div className="max-w-[1240px] mx-auto px-6 md:px-16 w-full text-center">
          <h3 className="font-extrabold text-sm uppercase text-slate-400 tracking-widest mb-8">
            Partners & Sponsors
          </h3>
          <p className="text-slate-600 max-w-xl mx-auto text-sm leading-relaxed mb-10">
            Our partners make the Money Date experience possible. Together, we are creating meaningful impact by empowering individuals to build wealth and live intentionally.
          </p>

          <div className="relative w-full overflow-hidden py-4 mt-6">
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

            <div className="flex w-max animate-marquee whitespace-nowrap gap-16 items-center">
              <div className="flex items-center gap-16 shrink-0">
                {[19, 20, 21, 22, 23].map((num) => (
                  <div key={num} className="relative w-36 h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <Image src={`/assets/Asset ${num}@4x.png`} alt={`Sponsor Logo ${num}`} fill className="object-contain" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-16 shrink-0" aria-hidden="true">
                {[19, 20, 21, 22, 23].map((num) => (
                  <div key={`dup-${num}`} className="relative w-36 h-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <Image src={`/assets/Asset ${num}@4x.png`} alt={`Sponsor Logo ${num}`} fill className="object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200/60 max-w-lg mx-auto">
            <span className="text-xs text-slate-500 font-bold uppercase block mb-3">Interested in collaborating?</span>
            <button
              onClick={() => setPartnerModalOpen(true)}
              className="inline-flex items-center gap-2 bg-[#001333] hover:bg-royal-blue text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-colors cursor-pointer"
            >
              Become a Partner
            </button>
          </div>
        </div>
      </section>

      {/* 14. FAQs Accordion */}
      <section id="faq" className="relative py-24 bg-gradient-to-b from-[#002A1C] to-[#004D36] text-white">
        <div className="max-w-[1240px] mx-auto px-6 md:px-16 w-full">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-3 font-bold text-xs md:text-sm tracking-widest uppercase text-gold mb-2">
              <span className="w-6 h-[1.5px] bg-gold"></span>Got Questions?
            </div>
            <h2 className="text-3xl md:text-5xl uppercase font-black">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-base md:text-lg focus:outline-none transition-colors hover:bg-white/10"
                >
                  <span className="pr-4">{faq.q}</span>
                  <span className="text-gold shrink-0 text-xl font-light">
                    {activeFaq === idx ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`transition-all duration-350 ease-in-out overflow-hidden ${activeFaq === idx ? "max-h-[300px] border-t border-white/10" : "max-h-0 pointer-events-none"
                    }`}
                >
                  <p className="p-6 text-white/70 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. Ticket Final Banner CTA */}
      <section className="relative py-28 overflow-hidden text-center bg-gradient-to-r from-royal-blue-dark to-royal-blue text-white">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-15 pointer-events-none">
          <Image src="/city.svg" alt="Skyline BG" fill className="object-cover object-bottom" />
        </div>
        <div className="relative z-10 max-w-[800px] mx-auto px-6">
          <div className="mb-10 max-w-md mx-auto">
            <div className="text-xs font-bold text-white/80 uppercase tracking-widest mb-3">Event Countdown</div>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="bg-[#001333]/80 border border-white/10 rounded-xl p-3 backdrop-blur-md">
                <div className="text-3xl font-black text-gold">{timeLeft.days}</div>
                <div className="text-[10px] font-bold text-white/60 uppercase">Days</div>
              </div>
              <div className="bg-[#001333]/80 border border-white/10 rounded-xl p-3 backdrop-blur-md">
                <div className="text-3xl font-black text-gold">{timeLeft.hours}</div>
                <div className="text-[10px] font-bold text-white/60 uppercase">Hours</div>
              </div>
              <div className="bg-[#001333]/80 border border-white/10 rounded-xl p-3 backdrop-blur-md">
                <div className="text-3xl font-black text-gold">{timeLeft.minutes}</div>
                <div className="text-[10px] font-bold text-white/60 uppercase">Mins</div>
              </div>
              <div className="bg-[#001333]/80 border border-white/10 rounded-xl p-3 backdrop-blur-md">
                <div className="text-3xl font-black text-gold">{timeLeft.seconds}</div>
                <div className="text-[10px] font-bold text-white/60 uppercase">Secs</div>
              </div>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl uppercase font-black mb-6 leading-none">
            Build Wealth. Live Well. <span className="text-gold block sm:inline">Thrive Intentionally.</span>
          </h2>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-xl mx-auto leading-relaxed">
            Your next financial breakthrough or meaningful connection begins with a single decision. Join us in Gbagada.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="group inline-flex items-center gap-2.5 font-extrabold tracking-wide rounded-full px-8 py-4 text-base bg-gold text-[#001333] shadow-[0_12px_25px_-8px_rgba(255,163,0,0.7)] hover:-translate-y-0.5 hover:shadow-[0_18px_35px_-6px_rgba(255,163,0,0.85)] transition-all cursor-pointer"
          >
            Reserve Your Seat Today
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </section>

      {/* 16. Footer */}
      <footer className="bg-[#000A21] text-white py-16 border-t border-white/5">
        <div className="max-w-[1240px] mx-auto px-6 md:px-16 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="relative w-44 h-12 mb-4">
                <Image src="/assets/Asset 17@4x.png" alt="Money Date Logo" fill className="object-contain" />
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Premium biannual financial wellness experience guiding professionals toward durable wealth creation and intentional lifestyle design.
              </p>
              <div className="space-y-2 text-sm text-white/60">
                <div><strong>Email:</strong> info@moneydate.com</div>
                <div><strong>Location:</strong> The Zone, Gbagada, Lagos</div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-black uppercase text-white mb-4">Quick Links</h4>
              <div className="grid grid-cols-2 gap-3 text-sm text-white/60">
                <a href="#about" className="hover:text-gold transition-colors">About</a>
                <a href="#why-attend" className="hover:text-gold transition-colors">Why Attend</a>
                <a href="#pillars" className="hover:text-gold transition-colors">Pillars</a>
                <a href="#host" className="hover:text-gold transition-colors">The Host</a>
                <a href="#speakers" className="hover:text-gold transition-colors">Speakers</a>
                <a href="#experience" className="hover:text-gold transition-colors">Experience</a>
                <a href="#tickets" className="hover:text-gold transition-colors">Tickets</a>
                <a href="#faq" className="hover:text-gold transition-colors">FAQ</a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-black uppercase text-white mb-4">Newsletter</h4>
              <p className="text-white/60 text-sm mb-4">Get updates on schedule cycles, ticket discounts, and speaker releases.</p>

              {!newsletterSubmitted ? (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-gold text-sm text-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-gold hover:bg-gold-hover text-[#001333] font-bold rounded-xl text-sm transition-colors cursor-pointer"
                  >
                    Join
                  </button>
                </form>
              ) : (
                <div className="text-gold text-sm font-medium">✓ You've joined the mailing list!</div>
              )}
            </div>
          </div>

          {/* Social Banners Row */}
          <div className="border-t border-white/5 py-8 flex flex-col items-center gap-6">
            <span className="text-xs text-white/50 uppercase tracking-widest font-bold">Follow Money Date for Event Updates</span>
            <div className="flex justify-center gap-4">
              <a 
                href="https://instagram.com/moneydate.co" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-gold hover:border-gold/30 hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-lg"
                title="Follow Instagram @moneydate.co"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              <a 
                href="https://tiktok.com/@moneydate.co" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-gold hover:border-gold/30 hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-lg"
                title="Follow TikTok @moneydate.co"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.52-4.09-1.37-.28-.2-.53-.43-.77-.68-.06 2.64-.04 5.28-.05 7.92-.01 1.83-.54 3.74-1.72 5.13-1.45 1.75-3.88 2.62-6.13 2.37-2.45-.19-4.8-1.74-5.74-4.05-.98-2.31-.69-5.18.84-7.14 1.25-1.64 3.32-2.5 5.37-2.33.03 1.34.02 2.69.03 4.03-1.12-.07-2.32.3-3.04 1.18-.75.87-.84 2.18-.34 3.19.45.98 1.5 1.65 2.58 1.69 1.12.07 2.29-.46 2.76-1.5.21-.49.27-1.03.26-1.56-.02-3.83-.01-7.66-.02-11.49-.01-.32-.01-.64-.01-.96z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com/@moneydate.co" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-gold hover:border-gold/30 hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-lg"
                title="Follow YouTube @moneydate.co"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.5 12 3.5 12 3.5s-7.517 0-9.388.553a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11C4.483 20.5 12 20.5 12 20.5s7.518 0 9.388-.553a3.002 3.002 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com/company/moneydate" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-gold hover:border-gold/30 hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-lg"
                title="Follow LinkedIn @moneydate"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">© {new Date().getFullYear()} Money Date with Esther Odejobi. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-white/40">
              <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 17. Interactive Registration Modal */}
      {modalOpen && (
        <div
          onClick={resetForm}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#004D36]/85 backdrop-blur-md transition-opacity duration-300 cursor-pointer overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-white text-[#001333] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 animate-scale-in cursor-default min-h-[580px] flex flex-col justify-between"
          >
            {/* Corner decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full pointer-events-none"></div>

            <button
              onClick={resetForm}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 focus:outline-none cursor-pointer text-2xl font-light w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition-all z-20"
            >
              ×
            </button>

            {!formSubmitted ? (
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px] items-stretch">
                {/* Left Column - Benefits & Event Details (Hidden on mobile) */}
                <div className="hidden md:flex md:col-span-5 bg-slate-50 p-10 flex-col justify-between border-r border-slate-200/80 relative">
                  <div>
                    <span className="font-extrabold text-[10px] uppercase tracking-widest text-[#00684A] block mb-2">Money Date 2.0</span>
                    <h4 className="text-xl uppercase font-black tracking-wide text-[#001333] leading-tight">Beyond Money Experience</h4>
                    <p className="text-xs text-slate-600 mt-2">Join us in Gbagada for a transformational day merging wealth creation with intentional wellness.</p>

                    <div className="mt-10 space-y-6">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#00684A]/10 flex items-center justify-center text-[#00684A] shrink-0 mt-0.5 border border-[#00684A]/20">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                          </svg>
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-[#001333]">Full Access Pass</h5>
                          <p className="text-[10px] text-slate-500">Entry to all keynote talks & expert speaker panels.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#00684A]/10 flex items-center justify-center text-[#00684A] shrink-0 mt-0.5 border border-[#00684A]/20">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-[#001333]">Networking & Audits</h5>
                          <p className="text-[10px] text-slate-500">Interactive speed networking and wellness clinics.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl bg-[#00684A]/10 flex items-center justify-center text-[#00684A] shrink-0 mt-0.5 border border-[#00684A]/20">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-[#001333]">Delegate Gift Bag</h5>
                          <p className="text-[10px] text-slate-500">Exclusive curated stationery, toolkits and resources.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-slate-200 text-[10px] text-slate-500 space-y-1">
                    <p>📍 The Zone, Gbagada, Lagos</p>
                    <p>📅 Saturday, 10th October 2026</p>
                  </div>
                </div>

                {/* Right Column - Form */}
                <div className="col-span-12 md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
                  <div className="mb-8">
                    <span className="font-bold text-xs uppercase tracking-widest text-[#00684A]">Secure Checkout</span>
                    <h3 className="text-2xl uppercase font-black text-[#001333] mt-1">Claim Your Pass</h3>
                    <p className="text-xs text-slate-600 mt-1">Provide your registration details to start secure checkout.</p>
                  </div>

                  <form onSubmit={handlePaymentSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Jane Doe"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00684A] text-sm text-slate-800 placeholder-slate-400 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g., you@domain.com"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00684A] text-sm text-slate-800 placeholder-slate-400 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Ticket Class Selected</label>
                      <div className="relative">
                        <select
                          name="ticketType"
                          value={formData.ticketType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00684A] text-sm text-slate-800 focus:bg-white transition-colors appearance-none cursor-pointer pr-10 font-semibold"
                        >
                          <option value="General Admission (₦35,000)">General Admission (₦35,000)</option>
                          <option value="Early Bird Pass (₦32,000)">Early Bird Pass (₦32,000)</option>
                          <option value="Duo Pass (₦65,000)">Duo Pass (₦65,000)</option>
                          <option value="Student Pass (₦27,000)">Student Pass (₦27,000)</option>
                          <option value="Growth Circle Pass (₦150,000)">Growth Circle Pass (₦150,000)</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl bg-gold hover:bg-gold-hover text-[#001333] transition-colors shadow-lg shadow-gold/20 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>Pay ₦{getTicketAmount(formData.ticketType).toLocaleString()} via Paystack</span>
                        <span>→</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="text-center p-16 max-w-lg mx-auto flex flex-col items-center justify-center min-h-[580px]">
                <div className="w-20 h-20 bg-[#00684A]/10 text-[#00684A] rounded-full flex items-center justify-center text-4xl mb-6 font-bold border border-[#00684A]/25">
                  ✓
                </div>
                <h3 className="text-3xl uppercase font-black text-[#001333] mb-3">Registration Confirmed!</h3>
                <p className="text-sm text-slate-600 mb-8 leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your payment was successful. We have sent a confirmation email to <strong>{formData.email}</strong> with your access details.
                </p>
                <button
                  onClick={resetForm}
                  className="font-bold text-sm bg-[#001333] hover:bg-[#002A1C] text-white rounded-full px-8 py-3 transition-colors focus:outline-none cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* 18. Interactive Partnership Modal */}
      {partnerModalOpen && (
        <div
          onClick={resetPartnerForm}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#001333]/80 backdrop-blur-md transition-opacity duration-300 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white text-[#001333] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 p-8 animate-in fade-in zoom-in-95 duration-200 cursor-default"
          >
            <button
              onClick={resetPartnerForm}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer text-2xl font-light"
            >
              ×
            </button>

            {!partnerFormSubmitted ? (
              <>
                <h3 className="text-2xl uppercase font-black text-[#001333] mb-2">Partner With Us</h3>
                <p className="text-sm text-slate-500 mb-6 font-head">
                  Sponsorship, value-in-kind support, or strategic collaboration—let's create value together.
                </p>

                <form onSubmit={handlePartnerSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={partnerFormData.name}
                      onChange={handlePartnerInputChange}
                      placeholder="e.g., John Doe"
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-royal-blue text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Company / Organization</label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={partnerFormData.company}
                      onChange={handlePartnerInputChange}
                      placeholder="e.g., Acme Corp"
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-royal-blue text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={partnerFormData.email}
                      onChange={handlePartnerInputChange}
                      placeholder="e.g., john@company.com"
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-royal-blue text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Partnership Class</label>
                    <select
                      name="partnershipType"
                      value={partnerFormData.partnershipType}
                      onChange={handlePartnerInputChange}
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-royal-blue text-sm bg-white"
                    >
                      <option value="Sponsorship">Financial Sponsorship</option>
                      <option value="Value-in-Kind">Value-in-Kind Support</option>
                      <option value="Strategic Collaboration">Strategic Collaboration</option>
                      <option value="Media Partner">Media & Press Partner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Brief Proposal / Message</label>
                    <textarea
                      name="message"
                      rows={3}
                      required
                      value={partnerFormData.message}
                      onChange={handlePartnerInputChange}
                      placeholder="Tell us briefly how you'd like to collaborate..."
                      className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-royal-blue text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 font-bold uppercase tracking-wider py-3 px-6 rounded-xl bg-gold hover:bg-gold-hover text-[#001333] transition-colors shadow-lg shadow-gold/20 cursor-pointer"
                  >
                    Send Collaboration Query
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-royal-blue/10 text-royal-blue rounded-full flex items-center justify-center text-3xl mx-auto mb-4 font-bold">
                  ✓
                </div>
                <h3 className="text-2xl uppercase font-black text-[#001333] mb-2">Proposal Received!</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Thank you, <strong>{partnerFormData.name}</strong> from <strong>{partnerFormData.company}</strong>. Our partnership desk will review your query and contact you at <strong>{partnerFormData.email}</strong> within 24-48 hours.
                </p>
                <button
                  onClick={resetPartnerForm}
                  className="font-bold text-sm text-royal-blue hover:text-royal-blue-dark underline focus:outline-none cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Speaker Bio Modal */}
      {activeSpeaker && (
        <div 
          onClick={() => setActiveSpeaker(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#001333]/85 backdrop-blur-md transition-opacity cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#001c38] border border-white/15 w-full max-w-lg rounded-3xl p-6 md:p-8 overflow-hidden shadow-2xl animate-scale-in cursor-default"
          >
            {/* Corner decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-full pointer-events-none"></div>

            <button
              onClick={() => setActiveSpeaker(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl font-light w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all cursor-pointer"
            >
              ×
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="relative w-36 h-36 bg-gradient-to-b from-[#002A1C]/40 to-[#004D36]/40 border border-white/10 rounded-2xl flex items-center justify-center p-6 mb-6">
                <div className="relative w-28 h-28">
                  <Image
                    src={activeSpeaker.img}
                    alt={activeSpeaker.role}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <span className="font-bold text-xs uppercase tracking-widest text-gold">{activeSpeaker.role}</span>
              <h3 className="text-2xl uppercase font-black text-white mt-1 mb-4">{activeSpeaker.name}</h3>

              <div className="border-t border-white/10 w-full pt-4 mt-2">
                <p className="text-white/80 text-sm leading-relaxed">
                  {activeSpeaker.desc}
                </p>
              </div>

              <button
                onClick={() => setActiveSpeaker(null)}
                className="mt-6 font-bold tracking-wide rounded-full px-6 py-2.5 text-xs bg-gold hover:bg-gold-hover text-[#001333] transition-colors cursor-pointer"
              >
                Close Bio
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
