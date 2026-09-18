import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { CODE_SHOWCASE } from '../data/mockData';

const TABS = [
  { id: 'agentGraph' as const, file: 'langgraph_swarm.py' },
  { id: 'whisperFineTune' as const, file: 'whisper_dialect.py' },
  { id: 'hybridRag' as const, file: 'hybrid_retriever.py' },
];

export const TerminalSection: React.FC = () => {
  const [active, setActive] = useState<(typeof TABS)[number]['id']>('agentGraph');
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(CODE_SHOWCASE[active]);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="relative z-10 px-5 py-32 md:px-8 md:py-48">
      <div className="mx-auto max-w-5xl">
        <h2 className="max-w-3xl text-[clamp(2rem,4vw,3.4rem)] font-medium tracking-tight text-mist">
          How the graphs are written
        </h2>
        <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-mute">
          State graphs, dialect fine-tunes, and hybrid retrieval. The same patterns I use in production work.
        </p>

        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-ink/80">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <div className="flex flex-wrap gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`rounded-full px-3 py-1.5 font-mono text-[11px] ${
                    active === tab.id ? 'bg-white/10 text-mist' : 'text-mute hover:text-mist'
                  }`}
                >
                  {tab.file}
                </button>
              ))}
            </div>
            <button
              onClick={copy}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] text-mute hover:text-mist"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="max-h-[28rem] overflow-auto p-5 font-mono text-[12px] leading-relaxed text-mist/80">
            <code>{CODE_SHOWCASE[active]}</code>
          </pre>
        </div>
      </div>
    </section>
  );
};
