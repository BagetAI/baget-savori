"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [refCode, setRefCode] = useState("");
  const [count, setCount] = useState(142);
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
    <main>
      <nav className="py-6">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 font-heading text-2xl font-extrabold">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4Z" fill="#E89E1A"/>
              <path d="M16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24C20.4183 24 24 20.4183 24 16C24 11.5817 20.4183 8 16 8Z" fill="#FBBF77"/>
              <path d="M16 12C13.7909 12 12 13.7909 12 16C12 18.2091 13.7909 20 16 20C18.2091 20 20 18.2091 20 16C20 13.7909 18.2091 12 16 12Z" fill="#A63D2D"/>
            </svg>
            <span>Savori</span>
          </div>
        </div>
      </nav>

      <header className="relative pt-20 pb-32">
        <div className="geometric-shape shape-1"></div>
        <div className="geometric-shape shape-2"></div>
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="hero-content">
            <div className="inline-block bg-savori-peach px-4 py-1.5 rounded-full font-bold text-sm mb-6">
              Coming August 2026
            </div>
            <h1 className="text-5xl lg:text-6xl font-heading font-extrabold mb-6 leading-[1.1]">
              Stop buying spice jars you'll only use once.
            </h1>
            <p className="text-xl opacity-90 mb-10 leading-relaxed">
              Chef-curated international spice kits delivered to your door. Pre-portioned for one dinner, designed for zero waste.
            </p>
            
            {status !== "success" ? (
              <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex gap-3 bg-white p-2 rounded-2xl shadow-lg shadow-savori-violet/10">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    required 
                    className="flex-1 border-none px-4 py-3 text-lg outline-none rounded-xl"
                  />
                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="bg-savori-teal text-white px-7 py-3 rounded-xl font-bold hover:bg-teal-700 transition-all disabled:opacity-50"
                  >
                    {status === "loading" ? "Joining..." : "Join the Waitlist"}
                  </button>
                </div>
                {status === "error" && <p className="mt-3 text-savori-red font-medium">Something went wrong. Please try again.</p>}
              </form>
            ) : (
              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-savori-violet/10 text-center animate-in fade-in zoom-in duration-300">
                <p className="text-2xl font-heading font-bold text-savori-teal mb-4">Welcome to the inner circle!</p>
                <p className="font-bold mb-4 text-lg">Invite friends and get your first kit free!</p>
                <div className="flex gap-2 bg-savori-lavender p-2 rounded-xl">
                  <input 
                    type="text" 
                    value={shareUrl} 
                    readOnly 
                    className="flex-1 bg-transparent border-none px-2 py-2 text-sm text-savori-violet outline-none"
                  />
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl);
                      alert("Link copied!");
                    }}
                    className="bg-savori-violet text-white px-4 py-2 rounded-lg font-semibold"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
            
            <div className="font-medium opacity-80 mt-6">
              <span>{count}</span> foodies already on the list
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="images/top-down-editorial-food-photography-of-t.png" 
              alt="Savori Global Series Spice Kits" 
              className="w-full rounded-[32px] shadow-2xl shadow-savori-violet/20"
            />
            <div className="absolute top-[10%] -right-5 bg-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg rotate-3">
              <span className="w-2.5 h-2.5 rounded-full bg-savori-peach"></span> 100% Authentic
            </div>
            <div className="absolute bottom-[15%] -left-10 bg-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg -rotate-3">
              <span className="w-2.5 h-2.5 rounded-full bg-savori-teal"></span> Zero Waste
            </div>
          </div>
        </div>
      </header>

      <section className="py-24 bg-white/50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-heading font-extrabold mb-4">The "Pantry Bloat" is real.</h2>
          <p className="text-xl max-w-2xl mx-auto mb-16">
            The average home cook has 15+ jars of spices. 70% are expired. We fixed that.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 1, title: "No Waste", desc: "Only the exact grams you need for the recipe. No half-empty jars cluttering your cabinet." },
              { id: 2, title: "True Flavor", desc: "Small-batch, freshly toasted, and single-origin ingredients sourced from around the world." },
              { id: 3, title: "Letterbox Ready", desc: "Our flat kits fit right through your mail slot. No missed deliveries, ever." }
            ].map(feat => (
              <div key={feat.id} className="bg-white p-10 rounded-[32px] text-left shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-savori-lavender rounded-full flex items-center justify-center font-heading font-extrabold text-savori-violet mb-6">
                  {feat.id}
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">{feat.title}</h3>
                <p className="opacity-80">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-extrabold mb-4">The Global Series</h2>
            <p className="text-lg opacity-80">Our debut collection features the complex flavor profiles that usually break your pantry budget.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Bangkok Green Curry", desc: "Real galangal, lemongrass, and Burlap & Barrel turmeric." },
              { title: "Marrakesh Tagine", desc: "Authentic Ras el Hanout with premium saffron threads." },
              { title: "Chengdu Mapo Tofu", desc: "Grade-A Szechuan peppercorns for that signature mala tingle." }
            ].map((kit, i) => (
              <div key={i} className="bg-white rounded-[32px] overflow-hidden hover:scale-[1.02] transition-transform shadow-sm">
                <img src="images/close-up-professional-product-shot-of-a-.png" alt={kit.title} className="w-full h-72 object-cover" />
                <div className="p-8">
                  <h3 className="text-xl font-heading font-bold mb-2">{kit.title}</h3>
                  <p className="opacity-80 text-sm">{kit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-savori-violet/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-heading font-extrabold text-xl">Savori</div>
          <div className="opacity-60 text-sm">&copy; 2026 Savori Spice Co. All rights reserved.</div>
          <div className="flex gap-6 font-semibold text-sm">
            <a href="https://instagram.com" className="hover:text-savori-teal transition-colors">Instagram</a>
            <a href="https://tiktok.com" className="hover:text-savori-teal transition-colors">TikTok</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
