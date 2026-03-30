"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import NowPlayingQueue from "@/components/NowPlayingQueue";

const EarphoneHero = dynamic(() => import("@/components/EarphoneHero"), {
  ssr: false,
  loading: () => (
    <div className="w-[340px] h-[400px] sm:w-[400px] sm:h-[480px] flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-[#00D4FF]/10 blur-[60px] animate-pulse" />
    </div>
  ),
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

function EmailForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-[#00D4FF] font-medium"
      >
        You&apos;re on the list &#10003;
      </motion.p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email) setSubmitted(true);
      }}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
    >
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#00D4FF]/40 focus:ring-1 focus:ring-[#00D4FF]/20 transition-colors text-sm"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-[#00D4FF] text-[#050510] font-semibold rounded-xl hover:bg-[#00D4FF]/90 transition-colors cursor-pointer whitespace-nowrap text-sm"
      >
        Request access &rarr;
      </button>
    </form>
  );
}

function PainCard({ title, desc }: { title: string; desc: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 text-center"
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function StepCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <motion.div variants={fadeUp} className="text-center">
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#00D4FF]/[0.08] border border-[#00D4FF]/20 flex items-center justify-center text-[#00D4FF] font-bold text-lg">
        {num}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function QuoteCard({ quote, author }: { quote: string; author: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6"
    >
      <p className="text-zinc-300 text-sm italic mb-4 leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <p className="text-zinc-600 text-xs">{author}</p>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* ── SECTION 1: HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden bg-[#050510]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,212,255,0.05)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,_rgba(124,58,237,0.03)_0%,_transparent_50%)]" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 max-w-6xl w-full"
        >
          {/* Left: Text */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-full text-xs text-zinc-400"
            >
              &#x1F512; Closed beta &middot; 47 people on the waitlist
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
            >
              Your agents are talking.
              <br />
              <span className="gradient-text">Hear them.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-zinc-400 max-w-lg mb-10 leading-relaxed">
              Queue AI agent replies. Listen hands-free. Reply by voice.
            </motion.p>

            <motion.div variants={fadeUp} className="w-full max-w-md mb-10">
              <EmailForm />
            </motion.div>
          </div>

          {/* Right: 3D Earphone + Now Playing */}
          <motion.div
            variants={fadeUp}
            className="flex-shrink-0 flex flex-col items-center gap-4"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 rounded-full bg-[#00D4FF]/10 blur-[100px]" />
              </div>
              <EarphoneHero />
            </div>
            <NowPlayingQueue />
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 2: PAIN ── */}
      <section className="px-6 py-24 bg-[#0a0a0f]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-3">
            You built the perfect agent team.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-zinc-500 mb-12">
            Then became their secretary.
          </motion.p>
          <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6">
            <PainCard
              title="Constant screen switching"
              desc="Switching between 5 Discord channels, copy-pasting context, losing flow every 30 seconds."
            />
            <PainCard
              title="Missed replies"
              desc="Agents waiting while you're on a call. By the time you check, the whole pipeline is stalled."
            />
            <PainCard
              title="Never hands-free"
              desc="Can't check while driving, walking, building. Everything waits until you sit back down."
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 3: HOW IT WORKS ── */}
      <section className="px-6 py-24 bg-[#050510]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-12">
            Up and running in 3 minutes.
          </motion.h2>
          <motion.div variants={stagger} className="grid md:grid-cols-3 gap-12">
            <StepCard
              num="1"
              title="Connect your agents"
              desc="OpenClaw, Claude Code, or any Discord-based setup."
            />
            <StepCard
              num="2"
              title="Pair your earbuds"
              desc="Any Bluetooth device. No new hardware needed."
            />
            <StepCard
              num="3"
              title="Start listening"
              desc="Your queue builds itself. You just reply."
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 4: FOR YOU ── */}
      <section className="px-6 py-24 bg-[#0a0a0f]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-10">
            Built for serious agent users only.
          </motion.h2>
          <motion.div variants={stagger} className="space-y-4 text-left max-w-md mx-auto">
            {[
              "Running 3+ AI agents in parallel",
              "OpenClaw / Claude Code user",
              "Constantly switching channels to check replies",
              "Wishing you could delegate while your hands are busy",
            ].map((item) => (
              <motion.div key={item} variants={fadeUp} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-md bg-[#00D4FF]/[0.08] border border-[#00D4FF]/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-[#00D4FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-zinc-300 text-sm">{item}</span>
              </motion.div>
            ))}
          </motion.div>
          <motion.p variants={fadeUp} className="mt-10 text-zinc-500 text-sm italic max-w-md mx-auto">
            If you&apos;ve said &ldquo;I&apos;m literally just routing tasks manually&rdquo; — yes, this is for you.
          </motion.p>
        </motion.div>
      </section>

      {/* ── SECTION 5: SOCIAL PROOF ── */}
      <section className="px-6 py-24 bg-[#050510]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            You&apos;re not alone.
          </motion.h2>
          <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6">
            <QuoteCard
              quote="Lots of frameworks are solving agent-to-agent coordination, but the human-to-agents interface feels completely unsolved."
              author="r/AI_Agents"
            />
            <QuoteCard
              quote="I hit a wall around 4 concurrent agents. Terminals everywhere and no idea which needs my attention."
              author="r/ClaudeAI"
            />
            <QuoteCard
              quote="Would pay for a proper UI that lets me voice-command my whole agent stack."
              author="r/LocalLLaMA"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION 6: FINAL CTA ── */}
      <section className="px-6 py-24 bg-gradient-to-b from-[#050510] via-[#080818] to-[#050510]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-4">
            Stop being the router.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-zinc-500 mb-8">
            Currently invite-only. Built for teams running 3+ AI agents.
          </motion.p>
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <EmailForm />
          </motion.div>
          <motion.p variants={fadeUp} className="text-zinc-600 text-xs">
            Free during beta. Works with OpenClaw out of the box.
          </motion.p>
        </motion.div>
      </section>

      {/* ── SECTION 7: FOOTER ── */}
      <footer className="border-t border-white/[0.04] py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-700 text-sm">
          <span className="font-medium text-zinc-500">VoiceDeck</span>
          <span>&copy; 2026 DigDaTech LLC</span>
        </div>
      </footer>
    </main>
  );
}
