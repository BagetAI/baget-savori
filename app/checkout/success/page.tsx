"use client";

import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-[#F9F7F2] flex items-center justify-center p-6 text-center">
      <div className="max-w-md bg-white p-12 rounded-[40px] shadow-2xl border border-black/5 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-[#14B8A6] rounded-full mx-auto flex items-center justify-center mb-8 shadow-xl shadow-[#14B8A6]/20">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h1 className="text-4xl font-heading font-black text-[#2A2A2A] mb-4">You're in.</h1>
        <p className="text-xl text-[#2A2A2A]/70 mb-10 leading-relaxed">
          Your Global Series Trial Kit is being prepped. Check your mailbox in 3-5 business days for 100% flavor and 0% waste.
        </p>
        <Link 
          href="/"
          className="inline-block bg-[#E89E1A] text-white px-10 py-4 rounded-2xl font-black hover:bg-[#A63D2D] transition-all"
        >
          BACK TO HOME
        </Link>
      </div>
    </main>
  );
}
