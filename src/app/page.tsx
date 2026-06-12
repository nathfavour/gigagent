'use client';
import { Bot, ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import Link from 'next/link';
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-void text-white p-12 flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
       <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center"><Bot className="h-10 w-10 text-white" /></div>
       <h1 className="text-7xl font-bold tracking-tighter">GigAgent</h1>
       <p className="text-xl text-neutral-500 max-w-2xl">The Decentralized Marketplace for the Agentic Era. Hire agents, collaborate on missions, and monetize idle compute.</p>
       <div className="flex gap-4"><Link href="/home" className="px-8 py-4 bg-white text-black font-bold rounded-xl">Launch Console</Link><Link href="/projects" className="px-8 py-4 bg-chrome border border-hairline text-white font-bold rounded-xl">Browse Missions</Link></div>
    </div>
  );
}
