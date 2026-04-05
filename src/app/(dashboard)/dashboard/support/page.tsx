'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Search, ChevronDown, Send, Shield, MessageSquare, CheckCircle, Clock, AlertCircle, X, Phone } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

type FAQ = { id: string; question: string; answer: string; category: string; order_index: number };
type TicketRow = { id: string; subject: string; message: string; status: string; created_at: string; updated_at: string };
type Reply = { id: string; ticket_id: string; user_id: string; message: string; is_admin: boolean; created_at: string };

function timeAgo(dateStr: string) {
  const d = new Date(dateStr);
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
    open: { label: 'Open', color: '#D97706', bg: 'rgba(217,119,6,0.12)', icon: <AlertCircle className="w-3 h-3" /> },
    in_progress: { label: 'In Progress', color: '#2563EB', bg: 'rgba(37,99,235,0.10)', icon: <Clock className="w-3 h-3" /> },
    resolved: { label: 'Resolved', color: '#16A34A', bg: 'rgba(22,163,74,0.10)', icon: <CheckCircle className="w-3 h-3" /> },
  };
  const s = map[status] ?? map.open;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full"
      style={{ color: s.color, backgroundColor: s.bg }}>
      {s.icon}{s.label}
    </span>
  );
}

function TicketCard({ ticket, userId }: { ticket: TicketRow; userId: string }) {
  const [open, setOpen] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const supabase = createClient();

  const loadReplies = async () => {
    const { data } = await supabase.from('ticket_replies').select('*').eq('ticket_id', ticket.id).order('created_at');
    setReplies(data ?? []);
  };

  const toggleOpen = async () => {
    if (!open) await loadReplies();
    setOpen(p => !p);
  };

  const sendReply = async () => {
    if (!replyText.trim()) return;
    setSending(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('ticket_replies').insert({ ticket_id: ticket.id, user_id: userId, message: replyText.trim(), is_admin: false });
    setReplyText('');
    await loadReplies();
    setSending(false);
  };

  return (
    <div className="rounded-xl border bg-white overflow-hidden transition-all duration-200"
      style={{ borderColor: open ? 'var(--color-dash-copper)' : 'var(--color-dash-border)', boxShadow: open ? '0 4px 16px rgba(200,121,65,0.10)' : '0 1px 4px rgba(0,0,0,0.04)' }}>
      <button onClick={toggleOpen} className="w-full p-4 flex items-start justify-between gap-3 text-left hover:bg-gray-50 transition-colors" style={{ minHeight: 44 }}>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm mb-1.5" style={{ color: 'var(--color-dash-text)' }}>{ticket.subject}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <StatusPill status={ticket.status} />
            <span className="text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>{timeAgo(ticket.created_at)}</span>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 shrink-0 mt-0.5 transition-transform ${open ? 'rotate-180' : ''}`} style={{ color: 'var(--color-dash-text-faint)' }} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="px-4 pb-4 space-y-3 border-t" style={{ borderColor: 'var(--color-dash-border)' }}>
              {/* Original message as user bubble */}
              <div className="pt-3">
                <div className="max-w-[85%] p-3 rounded-xl rounded-bl-sm" style={{ backgroundColor: 'var(--color-dash-bg)' }}>
                  <p className="text-xs font-medium mb-1" style={{ color: 'var(--color-dash-text-faint)' }}>You</p>
                  <p className="text-sm" style={{ color: 'var(--color-dash-text)' }}>{ticket.message}</p>
                </div>
              </div>
              {/* Replies as chat bubbles */}
              {replies.map(r => (
                <div key={r.id} className={`flex ${r.is_admin ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl ${r.is_admin ? 'rounded-br-sm' : 'rounded-bl-sm'}`}
                    style={{
                      backgroundColor: r.is_admin ? 'rgba(200,121,65,0.08)' : 'var(--color-dash-bg)',
                      border: r.is_admin ? '1px solid rgba(200,121,65,0.2)' : 'none',
                    }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold" style={{ color: r.is_admin ? 'var(--color-dash-copper)' : 'var(--color-dash-text-muted)' }}>
                        {r.is_admin ? 'Brett' : 'You'}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>{timeAgo(r.created_at)}</span>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-dash-text)' }}>{r.message}</p>
                  </div>
                </div>
              ))}
              {/* Reply input */}
              <div className="flex gap-2 pt-1">
                <textarea
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Add a reply…"
                  rows={2}
                  className="flex-1 rounded-lg border p-2.5 text-sm resize-none focus:outline-none focus:ring-2"
                  style={{ borderColor: 'var(--color-dash-border)', color: 'var(--color-dash-text)', fontFamily: 'var(--font-general)', '--tw-ring-color': 'var(--color-dash-copper)' } as React.CSSProperties}
                />
                <button onClick={sendReply} disabled={sending || !replyText.trim()} className="px-3 rounded-lg text-white text-sm font-medium disabled:opacity-50 transition-opacity" style={{ backgroundColor: 'var(--color-dash-copper)', minWidth: 44, minHeight: 44 }}>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SupportPage() {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [tickets, setTickets] = useState<TicketRow[]>([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [faqLoading, setFaqLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const [{ data: faqData }, { data: ticketData }] = await Promise.all([
          supabase.from('faq').select('*').order('order_index'),
          supabase.from('tickets').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        ]);
        setFaqs(faqData ?? []);
        setTickets(ticketData ?? []);
      }
      setFaqLoading(false);
    })();
  }, []);

  const categories = ['all', ...Array.from(new Set(faqs.map(f => f.category)))];

  const filteredFaqs = faqs.filter(f => {
    const matchCat = activeCategory === 'all' || f.category === activeCategory;
    const matchSearch = !search || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const submitTicket = async () => {
    if (!subject.trim() || !message.trim() || !userId) return;
    setSubmitState('loading');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('tickets').insert({ user_id: userId, subject: subject.trim(), message: message.trim(), status: 'open' });
    if (error) { setSubmitState('error'); return; }
    setSubmitState('success');
    setSubject('');
    setMessage('');
    const { data } = await supabase.from('tickets').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    setTickets(data ?? []);
    setTimeout(() => setSubmitState('idle'), 5000);
  };

  return (
    <div className="space-y-8 max-w-3xl" style={{ fontFamily: 'var(--font-general)' }}>
      {/* Header */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-dash-copper-muted)' }}>
            <Shield className="w-5 h-5" style={{ color: 'var(--color-dash-copper)' }} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>Ranger Station</h1>
        </div>
        <p className="text-sm" style={{ color: 'var(--color-dash-text-muted)' }}>Need help? Search below or send Brett a message.</p>
      </motion.div>

      {/* Emergency banner */}
      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="show"
        className="rounded-xl p-4 flex items-center gap-3"
        style={{ border: '1.5px solid var(--color-dash-copper)', backgroundColor: 'var(--color-dash-copper-muted)' }}>
        <Phone className="w-5 h-5 shrink-0" style={{ color: 'var(--color-dash-copper)' }} />
        <p className="text-sm font-medium" style={{ color: 'var(--color-dash-text)' }}>
          Site down? Call <a href="tel:7789864468" className="font-bold underline" style={{ color: 'var(--color-dash-copper)' }}>778-986-4468</a>
        </p>
      </motion.div>

      {/* Search */}
      <motion.div custom={2} variants={fadeUp} initial="hidden" animate="show" className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-dash-text-faint)' }} />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search for answers…"
          className="w-full pl-10 pr-10 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2"
          style={{ borderColor: 'var(--color-dash-border)', color: 'var(--color-dash-text)', fontFamily: 'var(--font-general)', '--tw-ring-color': 'var(--color-dash-copper)', backgroundColor: 'white' } as React.CSSProperties}
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ minHeight: 44, minWidth: 44 }}>
            <X className="w-4 h-4" style={{ color: 'var(--color-dash-text-faint)' }} />
          </button>
        )}
      </motion.div>

      {/* FAQ Section */}
      <motion.section custom={3} variants={fadeUp} initial="hidden" animate="show">
        <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>Frequently Asked Questions</h2>

        {/* Category pills */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="px-3.5 py-2 rounded-full text-xs font-medium capitalize transition-all"
                style={{
                  minHeight: 44,
                  backgroundColor: activeCategory === cat ? 'var(--color-dash-copper)' : 'transparent',
                  color: activeCategory === cat ? 'white' : 'var(--color-dash-text-muted)',
                  border: `1.5px solid ${activeCategory === cat ? 'var(--color-dash-copper)' : 'var(--color-dash-border)'}`,
                }}>
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        )}

        {faqLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-xl border p-4 flex items-center gap-3" style={{ borderColor: 'var(--color-dash-border)', backgroundColor: 'white' }}>
                <div className="h-4 flex-1 rounded animate-pulse" style={{ backgroundColor: 'var(--color-dash-border)' }} />
                <div className="w-4 h-4 rounded animate-pulse" style={{ backgroundColor: 'var(--color-dash-border)' }} />
              </div>
            ))}
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center" style={{ borderColor: 'var(--color-dash-border)' }}>
            <p className="text-sm" style={{ color: 'var(--color-dash-text-muted)' }}>
              {search ? "Nothing on that trail. Try a different search?" : "No FAQs here yet — send Brett a message below."}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredFaqs.map((faq, i) => (
              <motion.div key={faq.id} custom={i} variants={fadeUp} initial="hidden" animate="show"
                className="rounded-xl border bg-white overflow-hidden transition-all duration-200"
                style={{ borderColor: expandedFaq === faq.id ? 'var(--color-dash-copper)' : 'var(--color-dash-border)', boxShadow: expandedFaq === faq.id ? '0 4px 16px rgba(200,121,65,0.08)' : '0 1px 4px rgba(0,0,0,0.04)' }}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full p-4 flex items-center justify-between gap-3 text-left hover:bg-gray-50 transition-colors"
                  style={{ minHeight: 56 }}
                >
                  <span className="font-medium text-sm" style={{ color: 'var(--color-dash-text)' }}>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${expandedFaq === faq.id ? 'rotate-180' : ''}`} style={{ color: 'var(--color-dash-copper)' }} />
                </button>
                <AnimatePresence>
                  {expandedFaq === faq.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }} className="overflow-hidden">
                      <div className="px-4 pb-4 border-t" style={{ borderColor: 'var(--color-dash-border)' }}>
                        <p className="pt-3 text-sm leading-relaxed" style={{ color: 'var(--color-dash-text-muted)' }}>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Submit Ticket */}
      <motion.section custom={4} variants={fadeUp} initial="hidden" animate="show">
        <div className="rounded-xl border bg-white p-6" style={{ borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-dash-copper-muted)' }}>
              <MessageSquare className="w-4 h-4" style={{ color: 'var(--color-dash-copper)' }} />
            </div>
            <div>
              <h2 className="font-bold" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>Send Brett a Message</h2>
              <p className="text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>Brett typically replies within 4 hours.</p>
            </div>
          </div>

          {submitState === 'success' ? (
            <div className="rounded-lg p-4 text-center" style={{ backgroundColor: 'rgba(22,163,74,0.08)', border: '1px solid rgba(22,163,74,0.2)' }}>
              <CheckCircle className="w-8 h-8 mx-auto mb-2" style={{ color: '#16A34A' }} />
              <p className="font-medium text-sm" style={{ color: '#16A34A' }}>Message sent. Brett will get back to you soon.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: 'var(--color-dash-border)', color: 'var(--color-dash-text)', fontFamily: 'var(--font-general)', '--tw-ring-color': 'var(--color-dash-copper)' } as React.CSSProperties}
              />
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="What can Brett help you with?"
                rows={5}
                className="w-full px-4 py-3 rounded-lg border text-sm resize-none focus:outline-none focus:ring-2"
                style={{ borderColor: 'var(--color-dash-border)', color: 'var(--color-dash-text)', fontFamily: 'var(--font-general)', '--tw-ring-color': 'var(--color-dash-copper)' } as React.CSSProperties}
              />
              <button
                onClick={submitTicket}
                disabled={submitState === 'loading' || !subject.trim() || !message.trim()}
                className="w-full py-3 rounded-lg text-white font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-60 transition-opacity"
                style={{ backgroundColor: 'var(--color-dash-copper)', minHeight: 44 }}
              >
                {submitState === 'loading' ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending…</>
                ) : (
                  <><Send className="w-4 h-4" />Send to Brett</>
                )}
              </button>
            </div>
          )}
        </div>
      </motion.section>

      {/* Ticket History */}
      {userId && (
        <motion.section custom={5} variants={fadeUp} initial="hidden" animate="show">
          <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>Your Tickets</h2>
          {tickets.length === 0 ? (
            <div className="rounded-xl border bg-white p-10 text-center" style={{ borderColor: 'var(--color-dash-border)' }}>
              <CheckCircle className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--color-dash-text-faint)' }} />
              <p className="font-medium mb-0.5" style={{ color: 'var(--color-dash-text)', fontFamily: 'var(--font-cabinet)' }}>All clear on the trail.</p>
              <p className="text-sm" style={{ color: 'var(--color-dash-text-muted)' }}>No open tickets.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tickets.map((ticket, i) => (
                <motion.div key={ticket.id} custom={i} variants={fadeUp} initial="hidden" animate="show">
                  <TicketCard ticket={ticket} userId={userId} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      )}
    </div>
  );
}
