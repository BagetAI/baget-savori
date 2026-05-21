"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function HomeContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [refCode, setRefCode] = useState("");
  const [referrerId, setReferrerId] = useState<string | null>(null);

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
            <a href="#referral" className="hover:text-[#E89E1A] transition-colors">Refer & Earn</a>
          </div>
          <button 
            onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#2A2A2A] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-[#E89E1A] transition-all"
          >
            Get Early Access
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-12 md:pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="hero-content z-10">
            <div className="inline-block bg-[#FBBF77]/20 text-[#E89E1A] px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest mb-6 border border-[#FBBF77]/30">
              Launching August 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-black mb-8 leading-[0.95] text-[#2A2A2A]">
              100% Flavor.<br />
              <span className="text-[#E89E1A]">0% Waste.</span>
            </h1>
            <p className="text-xl opacity-80 mb-10 leading-relaxed max-w-lg text-[#2A2A2A]">
              Chef-curated international spice kits delivered to your mailbox. Pre-portioned to the gram for world-class dinners without the pantry clutter.
            </p>
            
            <div id="signup">
              {status !== "success" ? (
                <form onSubmit={handleSubmit} className="relative max-w-md">
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
                      className="bg-[#E89E1A] text-white px-8 py-3 rounded-xl font-black hover:bg-[#A63D2D] transition-all disabled:opacity-50"
                    >
                      {status === "loading" ? "..." : "JOIN NOW"}
                    </button>
                  </div>
                  {status === "error" && <p className="mt-3 text-red-500 font-medium">Try again soon!</p>}
                </form>
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
            
            <div className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-[#FBBF77] flex items-center justify-center text-[10px] font-bold">
                    USER
                  </div>
                ))}
              </div>
              <p className="text-sm font-bold opacity-60">Join 1,200+ cooks on the waitlist</p>
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
                <h4 className="text-xl font-black mb-2 leading-tight">No Pantry Tax.</h4>
                <p className="text-sm opacity-90 leading-relaxed">Stop paying $12 for a jar you'll use once. Our kits are exactly 1 dinner each.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-xl">
                <h4 className="text-xl font-black mb-2 text-[#2A2A2A]">Letterbox Ready.</h4>
                <p className="text-sm text-[#2A2A2A]/60">Ultra-slim profile fits through standard mail slots. No signatures, no missed deliveries.</p>
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

      {/* Feature Section */}
      <section id="how-it-works" className="py-24 bg-white border-y border-black/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-[#2A2A2A] mb-6">Built for the Tuesday night reality.</h2>
            <p className="text-xl opacity-70">Authentic flavors don't have to be a project. Savori bridges the gap between culinary curiosity and time-pressed reality.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { id: "01", title: "Select Your Box", desc: "Choose from our Global Series collections: Bangkok, Marrakesh, or Chengdu." },
              { id: "02", title: "Check Your Mail", desc: "Our flat-mail kits slide right through your slot. No cardboard waste, no heavy lifting." },
              { id: "03", title: "Cook Like a Chef", desc: "Bloom the spices, add fresh ingredients, and enjoy an authentic meal in under 25 minutes." }
            ].map(step => (
              <div key={step.id} className="group">
                <div className="text-6xl font-black text-black/5 mb-6 group-hover:text-[#E89E1A]/20 transition-colors">{step.id}</div>
                <h3 className="text-2xl font-heading font-black mb-4 text-[#2A2A2A]">{step.title}</h3>
                <p className="opacity-70 leading-relaxed text-lg">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Card Visuals Section */}
      <section className="py-24 overflow-hidden bg-[#F9F7F2]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-[#2A2A2A] mb-6">Expertly Guided.</h2>
            <p className="text-xl opacity-70 max-w-2xl mx-auto">Every kit includes a professional-grade recipe card designed for your kitchen counter, not a messy cookbook.</p>
          </div>
          
          <div className="relative">
            <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
              {/* Recipe Card Mockups */}
              <div className="w-full lg:w-1/3 bg-white p-4 rounded-2xl shadow-2xl rotate-[-2deg] border border-black/5">
                <img src="images/editorial-food-photography-of-chengdu-ma.png" alt="Mapo Tofu" className="w-full aspect-[5.5/8.5] object-cover rounded-xl mb-4" />
                <div className="p-4 border-t border-black/5">
                    <h4 className="font-heading font-black text-[#E89E1A]">CHENGDU MAPO TOFU</h4>
                    <p className="text-xs opacity-60">GLOBAL SERIES NO. 03</p>
                </div>
              </div>
              <div className="w-full lg:w-1/3 bg-white p-4 rounded-2xl shadow-2xl z-10 scale-110 border border-black/10">
                <img src="images/editorial-food-photography-of-a-vibrant-.png" alt="Green Curry" className="w-full aspect-[5.5/8.5] object-cover rounded-xl mb-4" />
                <div className="p-4 border-t border-black/5">
                    <h4 className="font-heading font-black text-[#2D5A27]">BANGKOK GREEN CURRY</h4>
                    <p className="text-xs opacity-60">GLOBAL SERIES NO. 01</p>
                </div>
              </div>
              <div className="w-full lg:w-1/3 bg-white p-4 rounded-2xl shadow-2xl rotate-[2deg] border border-black/5">
                <img src="images/editorial-food-photography-of-an-authent.png" alt="Lamb Tagine" className="w-full aspect-[5.5/8.5] object-cover rounded-xl mb-4" />
                <div className="p-4 border-t border-black/5">
                    <h4 className="font-heading font-black text-[#A63D2D]">MARRAKESH LAMB TAGINE</h4>
                    <p className="text-xs opacity-60">GLOBAL SERIES NO. 02</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Section: Give a Kit, Get a Kit */}
      <section className="py-24 bg-[#2A2A2A] text-white">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-heading font-black mb-8 leading-tight">Spread the Flavor. <br /><span className="text-[#FBBF77]">Eat for Free.</span></h2>
            <p className="text-xl opacity-80 mb-10 leading-relaxed">
              Our "Give a Kit, Get a Kit" program is simple. When you invite a friend to join the waitlist and they make their first purchase, we credit your account for a free 3-kit Global Explorer box.
            </p>
            <ul className="space-y-4">
              {[
                "Unlimited referrals",
                "Early access to seasonal drops",
                "Founder's Circle status"
              ].map(item => (
                <li key={item} className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="10" fill="#FBBF77"/>
                    <path d="M6 10L9 13L14 8" stroke="#2A2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="font-bold opacity-90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/5 p-12 rounded-[40px] border border-white/10 backdrop-blur-sm">
             <div className="text-center">
                <div className="w-20 h-20 bg-[#FBBF77] rounded-full mx-auto flex items-center justify-center mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2A2A2A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                </div>
                <h3 className="text-3xl font-heading font-black mb-4">Start your streak.</h3>
                <p className="opacity-70 mb-8">Join the waitlist today to get your unique referral link and start earning free kits before we launch.</p>
                <button 
                  onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-white text-[#2A2A2A] py-5 rounded-2xl font-black text-xl hover:bg-[#FBBF77] transition-all"
                >
                  GET MY LINK
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-black/5 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="font-heading font-black text-3xl mb-6">SAVORI</div>
              <p className="opacity-60 max-w-sm leading-relaxed text-lg">
                Eliminating the "Pantry Tax" through pre-portioned, chef-grade international spice kits.
              </p>
            </div>
            <div>
              <h5 className="font-black mb-6 uppercase tracking-widest text-sm">Series</h5>
              <ul className="space-y-4 opacity-60 font-bold">
                <li>Bangkok (Green Curry)</li>
                <li>Marrakesh (Tagine)</li>
                <li>Chengdu (Mapo Tofu)</li>
              </ul>
            </div>
            <div>
              <h5 className="font-black mb-6 uppercase tracking-widest text-sm">Follow</h5>
              <ul className="space-y-4 opacity-60 font-bold">
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
