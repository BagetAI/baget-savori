"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function HomeContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [refCode, setRefCode] = useState("");
  const [referrerId, setReferrerId] = useState<string | null>(null);

  // Stripe Payment Link for the $4.99 Trial Kit
  const TRIAL_KIT_URL = "https://buy.stripe.com/test_eVqfZgavu8DEalCeEr1ZS3s";

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      setReferrerId(ref);
      localStorage.setItem("savori_ref", ref);
    } else {
      setReferrerId(localStorage.getItem("savori_ref"));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, referrerId }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setRefCode(data.refCode);
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}?ref=${refCode}` : "";

  return (
    <main className="min-h-screen bg-[#F9F7F2]">
      {/* Navigation */}
      <nav className="py-6 bg-white border-b border-[#2A2A2A]/5 sticky top-0 z-50">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 font-heading text-2xl font-extrabold text-[#2A2A2A]">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4Z" fill="#E89E1A"/>
              <path d="M16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24C20.4183 24 24 20.4183 24 16C24 11.5817 20.4183 8 16 8Z" fill="#FBBF77"/>
              <path d="M16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12Z" fill="#A63D2D"/>
            </svg>
            <span className="tracking-tighter">SAVORI</span>
          </div>
          <div className="hidden md:flex gap-8 font-semibold text-sm text-[#2A2A2A]/60">
            <a href="#how-it-works" className="hover:text-[#E89E1A] transition-colors">How it Works</a>
            <a href="#global-series" className="hover:text-[#E89E1A] transition-colors">The Series</a>
            <a href="#trial" className="hover:text-[#E89E1A] transition-colors">Trial Kit</a>
          </div>
          <a 
            href={TRIAL_KIT_URL}
            className="bg-[#2A2A2A] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-[#E89E1A] transition-all"
          >
            Order $4.99 Trial
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-12 md:pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="hero-content z-10">
            <div className="inline-block bg-[#FBBF77]/20 text-[#E89E1A] px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest mb-6 border border-[#FBBF77]/30">
              Limited Batch: 1,000 Trial Kits Available
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-black mb-8 leading-[0.95] text-[#2A2A2A]">
              Chef-Grade Spices.<br />
              <span className="text-[#E89E1A]">Postcard Delivery.</span>
            </h1>
            <p className="text-xl opacity-80 mb-10 leading-relaxed max-w-lg text-[#2A2A2A]">
              Try our Global Series sampler. 3 kits (Thai, Moroccan, Szechuan) for just $4.99. No commitment, just flavor.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a 
                href={TRIAL_KIT_URL}
                className="bg-[#E89E1A] text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-[#A63D2D] transition-all shadow-xl shadow-[#E89E1A]/20 text-center"
              >
                ORDER $4.99 TRIAL
              </a>
              <button 
                onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-[#2A2A2A] px-10 py-5 rounded-2xl font-black text-xl border border-black/10 hover:bg-[#F9F7F2] transition-all text-center"
              >
                JOIN WAITLIST
              </button>
            </div>

            <div id="signup">
              {status !== "success" ? (
                <div className="max-w-md">
                   <p className="text-sm font-bold text-[#2A2A2A]/40 mb-3 uppercase tracking-tighter">Or join the waitlist for the full subscription</p>
                   <form onSubmit={handleSubmit} className="relative">
                    <div className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl shadow-2xl shadow-black/5 border border-black/5">
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email" 
                        required 
                        className="flex-1 bg-transparent border-none px-4 py-3 text-lg outline-none rounded-xl"
                      />
                      <button 
                        type="submit" 
                        disabled={status === "loading"}
                        className="bg-[#2A2A2A] text-white px-8 py-3 rounded-xl font-black hover:bg-[#E89E1A] transition-all disabled:opacity-50"
                      >
                        {status === "loading" ? "..." : "JOIN"}
                      </button>
                    </div>
                    {status === "error" && <p className="mt-3 text-red-500 font-medium">Try again soon!</p>}
                  </form>
                </div>
              ) : (
                <div id="referral" className="bg-white p-8 rounded-3xl shadow-2xl border border-[#E89E1A]/20 text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="text-2xl font-heading font-black text-[#2A2A2A] mb-2">Give a Kit, Get a Kit</h3>
                  <p className="text-[#2A2A2A]/70 mb-6">Share your link below. When a friend joins, we'll credit your first box for free!</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1 bg-[#F9F7F2] p-3 rounded-xl border border-black/5 flex items-center overflow-hidden">
                      <span className="text-xs font-mono truncate opacity-60">{shareUrl}</span>
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(shareUrl);
                        alert("Referral link copied!");
                      }}
                      className="bg-[#2A2A2A] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#E89E1A] transition-all whitespace-nowrap"
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="relative grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="relative group overflow-hidden rounded-3xl shadow-xl">
                <img 
                  src="images/editorial-food-photography-of-a-vibrant-.png" 
                  alt="Thai Green Curry" 
                  className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <span className="text-white font-bold text-sm tracking-widest uppercase">Bangkok</span>
                </div>
              </div>
              <div className="bg-[#E89E1A] p-8 rounded-3xl text-white">
                <h4 className="text-xl font-black mb-2 leading-tight">Zero Waste.</h4>
                <p className="text-sm opacity-90 leading-relaxed">No half-used jars. Just the exact spices you need for a Michelin-level dinner.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-xl">
                <h4 className="text-xl font-black mb-2 text-[#2A2A2A]">Letterbox Fit.</h4>
                <p className="text-sm text-[#2A2A2A]/60">Our kits are 0.60" thick. They slide right through your mail slot. No signatures.</p>
              </div>
              <div className="relative group overflow-hidden rounded-3xl shadow-xl">
                <img 
                  src="images/editorial-food-photography-of-an-authent.png" 
                  alt="Moroccan Tagine" 
                  className="w-full h-80 object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <span className="text-white font-bold text-sm tracking-widest uppercase">Marrakesh</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Trial Kit Section */}
      <section id="trial" className="py-24 bg-[#E89E1A] text-white">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
                <div className="inline-block bg-white/20 px-4 py-1 rounded-full font-bold text-xs uppercase mb-6">Limited Acquisition Offer</div>
                <h2 className="text-4xl md:text-6xl font-heading font-black mb-8 leading-tight">The Global Series <br />Sampler: $4.99</h2>
                <p className="text-xl opacity-90 mb-10 leading-relaxed">
                    Test the waters with our three most popular recipes. We source the single-origin turmeric and grade-A saffron so you don't have to.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                    {[
                        "3 Pre-portioned Spice Kits",
                        "3 Collector Recipe Cards",
                        "Free Flat-Mail Shipping",
                        "No Commitment / Cancel Anytime"
                    ].map(item => (
                        <div key={item} className="flex items-center gap-3">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="10" cy="10" r="10" fill="white"/>
                                <path d="M6 10L9 13L14 8" stroke="#E89E1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="font-bold">{item}</span>
                        </div>
                    ))}
                </div>
                <a 
                    href={TRIAL_KIT_URL}
                    className="inline-block bg-[#2A2A2A] text-white px-12 py-5 rounded-2xl font-black text-2xl hover:bg-white hover:text-[#2A2A2A] transition-all shadow-2xl"
                >
                    CLAIM MY TRIAL
                </a>
            </div>
            <div className="flex-1 relative">
                <div className="bg-white p-6 rounded-[40px] shadow-2xl rotate-[3deg] relative z-10">
                    <img 
                        src="images/top-down-editorial-food-photography-of-t.png" 
                        alt="Savori Kit Collection" 
                        className="w-full rounded-[30px]"
                    />
                </div>
                <div className="absolute inset-0 bg-[#FBBF77] rounded-[40px] rotate-[-3deg] -z-10"></div>
            </div>
        </div>
      </section>

      {/* Global Series Detail */}
      <section id="global-series" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-[#2A2A2A] mb-6">Authenticity in every gram.</h2>
            <p className="text-xl opacity-70">We replace the "Pantry Tax" with high-fidelity, single-origin ingredients sourced from farmers, not factories.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Bangkok Green Curry", 
                hero: "Single-Origin Turmeric", 
                img: "images/editorial-food-photography-of-a-vibrant-.png",
                color: "#2D5A27"
              },
              { 
                title: "Marrakesh Lamb Tagine", 
                hero: "Grade-A Saffron", 
                img: "images/editorial-food-photography-of-an-authent.png",
                color: "#A63D2D"
              },
              { 
                title: "Chengdu Mapo Tofu", 
                hero: "Szechuan Peppercorns", 
                img: "images/editorial-food-photography-of-chengdu-ma.png",
                color: "#E89E1A"
              }
            ].map(kit => (
              <div key={kit.title} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-3xl aspect-[4/5] mb-6">
                  <img 
                    src={kit.img} 
                    alt={kit.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#2A2A2A]">
                        Hero: {kit.hero}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-heading font-black text-[#2A2A2A] mb-2">{kit.title}</h3>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: kit.color }}></div>
                    <span className="text-sm font-bold opacity-40">Series No. {kit.title === "Bangkok Green Curry" ? "01" : kit.title === "Marrakesh Lamb Tagine" ? "02" : "03"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-black/5 bg-[#F9F7F2]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="font-heading font-black text-3xl mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-[#E89E1A] rounded-full"></div>
                SAVORI
              </div>
              <p className="opacity-60 max-w-sm leading-relaxed text-lg">
                100% Flavor. 0% Waste. Delivering the soul of international recipes to your mailbox.
              </p>
            </div>
            <div>
              <h5 className="font-black mb-6 uppercase tracking-widest text-sm text-[#2A2A2A]">Company</h5>
              <ul className="space-y-4 opacity-60 font-bold text-[#2A2A2A]">
                <li>How it Works</li>
                <li>The Series</li>
                <li>Trial Kit</li>
              </ul>
            </div>
            <div>
              <h5 className="font-black mb-6 uppercase tracking-widest text-sm text-[#2A2A2A]">Follow</h5>
              <ul className="space-y-4 opacity-60 font-bold text-[#2A2A2A]">
                <li><a href="https://instagram.com" className="hover:text-[#E89E1A]">Instagram</a></li>
                <li><a href="https://tiktok.com" className="hover:text-[#E89E1A]">TikTok</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-black/5 opacity-40 text-sm font-bold">
            <div>&copy; 2026 Savori Spice Co.</div>
            <div className="flex gap-8">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
