"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

function WaveBars() {
  return (
    <div className="flex items-center gap-[3px] h-12">
      {[0, 0.2, 0.4, 0.1, 0.3, 0.5, 0.15, 0.35].map((delay, i) => (
        <div
          key={i}
          className="w-[3px] h-full bg-[#00D4FF] rounded-full wave-bar origin-bottom"
          style={{ animationDelay: `${delay}s`, opacity: 0.5 + Math.random() * 0.5 }}
        />
      ))}
    </div>
  );
}

function EarphoneGlow() {
  return (
    <div className="relative flex items-center justify-center my-12">
      {/* Expanding rings */}
      {[0, 0.8, 1.6].map((delay, i) => (
        <div
          key={i}
          className="absolute w-40 h-40 rounded-full border border-[#00D4FF]/30 ring-expand"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
      {/* Earphone emoji */}
      <div className="relative z-10 text-8xl glow-pulse rounded-full p-6">
        🎧
      </div>
      {/* Wave bars on sides */}
      <div className="absolute left-1/2 -translate-x-[120px] top-1/2 -translate-y-1/2">
        <WaveBars />
      </div>
      <div className="absolute left-1/2 translate-x-[80px] top-1/2 -translate-y-1/2">
        <WaveBars />
      </div>
    </div>
  );
}

function QueuePreview() {
  const items = [
    { name: "Ace", color: "#3B82F6", msg: "PR #42 is ready for review", active: true },
    { name: "Mia", color: "#EC4899", msg: "Draft ready", active: false },
    { name: "Rex", color: "#10B981", msg: "Data pulled", active: false },
  ];

  return (
    <motion.div
      variants={fadeUp}
      className="w-full max-w-sm mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 space-y-3"
    >
      {items.map((item) => (
        <div key={item.name} className="flex items-center gap-3">
          <div
            className={`w-3 h-3 rounded-full ${item.active ? "" : "border-2"}`}
            style={{
              backgroundColor: item.active ? item.color : "transparent",
              borderColor: item.active ? undefined : item.color,
              boxShadow: item.active ? `0 0 8px ${item.color}` : undefined,
            }}
          />
          <span className="text-sm font-medium" style={{ color: item.color }}>
            {item.name}
          </span>
          <span className="text-sm text-zinc-400">&quot;{item.msg}&quot;</span>
        </div>
      ))}
    </motion.div>
  );
}

function EmailForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-[#00D4FF] text-center"
      >
        You&apos;re on the list. We&apos;ll reach out when your spot opens.
      </motion.p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (email) setSubmitted(true);
      }}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto"
    >
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#00D4FF]/50 focus:ring-1 focus:ring-[#00D4FF]/30 transition-colors"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-[#00D4FF] text-black font-semibold rounded-xl hover:bg-[#00D4FF]/90 transition-colors cursor-pointer whitespace-nowrap"
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
      className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm">{desc}</p>
    </motion.div>
  );
}

function StepCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <motion.div variants={fadeUp} className="text-center">
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 flex items-center justify-center text-[#00D4FF] font-bold text-lg">
        {num}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm">{desc}</p>
    </motion.div>
  );
}

function QuoteCard({ quote, author }: { quote: string; author: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-white/5 border border-white/10 rounded-2xl p-6"
    >
      <p className="text-zinc-300 text-sm italic mb-4">&quot;{quote}&quot;</p>
      <p className="text-zinc-500 text-xs">{author}</p>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col items-center"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-400"
          >
            🔒 Closed beta · 47 people on the waitlist
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-3xl"
          >
            Your agents are talking.{" "}
            <span className="text-[#00D4FF]">Hear them.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg sm:text-xl text-zinc-400 max-w-xl mb-8">
            Queue AI agent replies. Listen hands-free. Reply by voice.
          </motion.p>

          <EarphoneGlow />

          <QueuePreview />

          <motion.div variants={fadeUp} className="mt-10 w-full max-w-md">
            <EmailForm />
          </motion.div>
        </motion.div>
      </section>

      {/* ── PAIN ── */}
      <section className="px-6 py-24 max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-4 max-w-2xl mx-auto">
            You built the perfect agent team.{" "}
            <span className="text-zinc-500">Then became their secretary.</span>
          </motion.h2>
          <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6 mt-12">
            <PainCard
              title="Screen switching"
              desc="Alt-tabbing between 5 agent windows. Copy-pasting context. Losing your flow every 30 seconds."
            />
            <PainCard
              title="Missed replies"
              desc="Your agent finished 10 minutes ago. You didn't notice. Now the whole pipeline is stalled."
            />
            <PainCard
              title="Zero hands-free"
              desc="Walking, driving, cooking — your agents keep working but you can't. Everything waits until you sit down."
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 py-24 max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-12">
            How it works
          </motion.h2>
          <motion.div variants={stagger} className="grid md:grid-cols-3 gap-12">
            <StepCard
              num="1"
              title="Connect"
              desc="Link your AI agents — OpenClaw, Discord bots, custom APIs. One-click integration."
            />
            <StepCard
              num="2"
              title="Pair"
              desc="Connect your Bluetooth earphones. VoiceDeck routes all agent messages to your audio queue."
            />
            <StepCard
              num="3"
              title="Listen & Reply"
              desc="Hear messages one by one. Tap to skip. Hold to reply by voice. Fully hands-free."
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── FOR YOU ── */}
      <section className="px-6 py-24 max-w-2xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-4">
            Is this for you?
          </motion.h2>
          <motion.p variants={fadeUp} className="text-zinc-500 mb-10">
            Built for serious agent users only.
          </motion.p>
          <motion.div variants={stagger} className="space-y-4 text-left max-w-sm mx-auto">
            {[
              "You run 3+ AI agents",
              "You use OpenClaw or Discord bots",
              "You want hands-free agent control",
              "You're tired of being your agents' secretary",
            ].map((item) => (
              <motion.div key={item} variants={fadeUp} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-md bg-[#00D4FF]/10 border border-[#00D4FF]/40 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-[#00D4FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-zinc-300">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="px-6 py-24 max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-12 text-center">
            The pain is real
          </motion.h2>
          <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6">
            <QuoteCard
              quote="I have 4 agents running and I spend half my day just checking if any of them finished. It's like babysitting."
              author="u/agent_overload · r/AIAgents"
            />
            <QuoteCard
              quote="The irony of AI automation is that I now spend more time managing my agents than doing actual work."
              author="u/devops_tired · r/ChatGPT"
            />
            <QuoteCard
              quote="Needed something hands-free for months. I walk my dog and miss half the agent outputs. By the time I'm back everything's stale."
              author="u/walkbot · r/OpenClaw"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── CTA / FOOTER ── */}
      <section className="px-6 py-24 max-w-2xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold mb-4">
            Request early access
          </motion.h2>
          <motion.p variants={fadeUp} className="text-zinc-500 mb-8">
            Currently invite-only. Built for teams running 3+ AI agents.
          </motion.p>
          <motion.div variants={fadeUp}>
            <EmailForm />
          </motion.div>
        </motion.div>
      </section>

      <footer className="border-t border-white/5 py-8 text-center text-zinc-600 text-sm">
        VoiceDeck &copy; {new Date().getFullYear()}
      </footer>
    </main>
  );
}
