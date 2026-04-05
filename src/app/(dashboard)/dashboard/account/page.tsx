'use client';

import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Save, Lock, LogOut, CheckCircle, Trophy, Globe, User,
  BookOpen, Users, ThumbsUp, TrendingUp, Star, Zap, Award,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

type Profile = { id: string; business_name: string; website_url: string; bio: string; created_at: string };
type Achievement = { id: string; slug: string; name: string; description: string; icon_name: string; order_index: number };
type UserAchievement = { achievement_id: string; earned_at: string };

const TIER_CONFIG: Record<string, { label: string; color: string; bg: string; border: string }> = {
  starter: { label: 'Starter', color: '#C87941', bg: 'rgba(200,121,65,0.08)', border: 'rgba(200,121,65,0.2)' },
  growth: { label: 'Growth', color: '#A0612F', bg: 'rgba(160,97,47,0.1)', border: 'rgba(160,97,47,0.3)' },
  premium: { label: 'Premium', color: '#8B4513', bg: 'rgba(139,69,19,0.12)', border: 'rgba(139,69,19,0.35)' },
};

const ACHIEVEMENT_ICON_MAP: Record<string, React.ElementType> = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
  award: Award,
  book: BookOpen,
  users: Users,
  globe: Globe,
  trending: TrendingUp,
  thumbsup: ThumbsUp,
};

function AchievementIcon({ name }: { name: string }) {
  const Icon = ACHIEVEMENT_ICON_MAP[name] ?? Trophy;
  return <Icon className="w-5 h-5" />;
}

export default function AccountPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [tier, setTier] = useState('starter');
  const [profile, setProfile] = useState<Profile>({ id: '', business_name: '', website_url: '', bio: '', created_at: '' });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwState, setPwState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [pwError, setPwError] = useState('');

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setEmail(user.email ?? '');

      const [
        { data: profileData },
        { data: achieveData },
        { data: userAchieveData },
      ] = await Promise.all([
        supabase.from('profiles').select('id, business_name, website_url, bio, created_at, package_tier').eq('id', user.id).single(),
        supabase.from('achievements').select('*').order('order_index'),
        supabase.from('user_achievements').select('achievement_id, earned_at').eq('user_id', user.id),
      ]);

      if (profileData && typeof profileData === 'object' && 'id' in profileData) {
        const pd = profileData as { id: string; business_name?: string | null; website_url?: string | null; bio?: string | null; created_at?: string | null; package_tier?: string | null };
        setProfile({
          id: pd.id,
          business_name: pd.business_name ?? '',
          website_url: pd.website_url ?? '',
          bio: pd.bio ?? '',
          created_at: pd.created_at ?? '',
        });
        setTier(pd.package_tier ?? 'starter');
      }
      setAchievements(achieveData ?? []);
      setUserAchievements(userAchieveData ?? []);
    })();
  }, []);

  const saveProfile = async () => {
    if (!profile.id) return;
    setProfileSaving(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase as any).from('profiles').update({ business_name: profile.business_name, website_url: profile.website_url, bio: profile.bio, updated_at: new Date().toISOString() }).eq('id', profile.id);
    setProfileSaving(false);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const changePassword = async () => {
    if (newPw !== confirmPw) { setPwError('Passwords don\'t match.'); return; }
    if (newPw.length < 8) { setPwError('Password must be at least 8 characters.'); return; }
    setPwError('');
    setPwState('loading');
    const { error } = await supabase.auth.updateUser({ password: newPw });
    if (error) { setPwError(error.message); setPwState('error'); return; }
    setPwState('success');
    setCurrentPw(''); setNewPw(''); setConfirmPw('');
    setTimeout(() => setPwState('idle'), 5000);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const earnedMap = new Map(userAchievements.map(ua => [ua.achievement_id, ua.earned_at]));
  const tierConfig = TIER_CONFIG[tier] ?? TIER_CONFIG.starter;
  const memberSince = profile.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-CA', { month: 'long', year: 'numeric' })
    : '';

  const inputStyle = {
    borderColor: 'var(--color-dash-border)',
    color: 'var(--color-dash-text)',
    fontFamily: 'var(--font-general)',
    '--tw-ring-color': 'var(--color-dash-copper)',
  } as React.CSSProperties;

  return (
    <div className="space-y-8 max-w-3xl" style={{ fontFamily: 'var(--font-general)' }}>
      {/* Header */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(200,121,65,0.1)' }}>
            <User className="w-5 h-5" style={{ color: 'var(--color-dash-copper)' }} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
              Your Camp
            </h1>
          </div>
        </div>
        <p className="text-sm mt-2" style={{ color: 'var(--color-dash-text-muted)' }}>
          Your profile, package, and achievements.
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.section custom={1} variants={fadeUp} initial="hidden" animate="show">
        <div className="rounded-xl border p-6" style={{ backgroundColor: 'var(--color-dash-card)', borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          {/* Profile summary row */}
          <div className="flex items-start gap-4 mb-6 pb-6 border-b" style={{ borderColor: 'var(--color-dash-border)' }}>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(200,121,65,0.1)' }}>
              <User className="w-7 h-7" style={{ color: 'var(--color-dash-copper)' }} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-lg truncate" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>
                {profile.business_name || 'Your Business'}
              </h2>
              <p className="text-sm truncate" style={{ color: 'var(--color-dash-text-muted)' }}>{email}</p>
              {profile.website_url && (
                <p className="text-sm truncate mt-0.5" style={{ color: 'var(--color-dash-text-faint)' }}>{profile.website_url}</p>
              )}
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: tierConfig.bg, color: tierConfig.color, border: `1px solid ${tierConfig.border}` }}>
                  <Star className="w-3 h-3" />
                  {tierConfig.label}
                </span>
                {memberSince && (
                  <span className="text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>
                    Member since {memberSince}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Edit form */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-dash-text-muted)' }}>Business Name</label>
              <input type="text" value={profile.business_name} onChange={e => setProfile(p => ({ ...p, business_name: e.target.value }))}
                placeholder="Your business name"
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 flex items-center gap-1" style={{ color: 'var(--color-dash-text-muted)' }}>
                <Globe className="w-3 h-3" />Website URL
              </label>
              <input type="url" value={profile.website_url} onChange={e => setProfile(p => ({ ...p, website_url: e.target.value }))}
                placeholder="https://yourbusiness.ca"
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-dash-text-muted)' }}>Bio</label>
              <textarea value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                placeholder="Tell your neighbours about your business..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg border text-sm resize-none focus:outline-none focus:ring-2"
                style={inputStyle} />
            </div>
            <button onClick={saveProfile} disabled={profileSaving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium disabled:opacity-60 transition-all"
              style={{ backgroundColor: profileSaved ? '#6B8E5A' : 'var(--color-dash-copper)', minHeight: 44 }}>
              {profileSaved ? <><CheckCircle className="w-4 h-4" />Saved!</> : profileSaving ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save Profile</>}
            </button>
          </div>
        </div>
      </motion.section>

      {/* Package Tier */}
      {tier !== 'premium' && (
        <motion.section custom={2} variants={fadeUp} initial="hidden" animate="show">
          <div className="rounded-xl border p-6" style={{ backgroundColor: 'var(--color-dash-card)', borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <h2 className="font-bold mb-3" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>Your Package</h2>
            <p className="text-sm mb-4" style={{ color: 'var(--color-dash-text-muted)' }}>
              You&apos;re on the <strong style={{ color: tierConfig.color }}>{tierConfig.label}</strong> plan.
              Upgrade to unlock more guides, videos, and priority support.
            </p>
            <a href="https://kootenaymade.ca/#pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--color-dash-copper)', minHeight: 44 }}>
              <Zap className="w-4 h-4" />
              View Upgrade Options
            </a>
          </div>
        </motion.section>
      )}

      {/* Achievement Showcase */}
      <motion.section custom={3} variants={fadeUp} initial="hidden" animate="show">
        <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>Achievement Showcase</h2>
        {achievements.length === 0 ? (
          <div className="rounded-xl border p-8 text-center" style={{ backgroundColor: 'var(--color-dash-card)', borderColor: 'var(--color-dash-border)' }}>
            <Trophy className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--color-dash-text-faint)' }} />
            <p className="text-sm" style={{ color: 'var(--color-dash-text-muted)' }}>Achievements unlock as you explore the trail.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {achievements.slice(0, 9).map(a => {
              const earnedAt = earnedMap.get(a.id);
              const earned = !!earnedAt;
              return (
                <motion.div
                  key={a.id}
                  className="rounded-xl border p-4 transition-all duration-200 group relative"
                  style={{
                    backgroundColor: 'var(--color-dash-card)',
                    borderColor: earned ? 'rgba(200,121,65,0.3)' : 'var(--color-dash-border)',
                    boxShadow: earned ? '0 1px 8px rgba(200,121,65,0.1)' : '0 1px 4px rgba(0,0,0,0.04)',
                    opacity: earned ? 1 : 0.55,
                  }}
                  whileHover={earned ? { y: -2, borderColor: '#C87941' } : {}}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: earned ? 'rgba(200,121,65,0.1)' : '#f5f5f5',
                        color: earned ? 'var(--color-dash-copper)' : '#bbb',
                      }}
                    >
                      <AchievementIcon name={a.icon_name} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold" style={{ fontFamily: 'var(--font-cabinet)', color: earned ? 'var(--color-dash-text)' : 'var(--color-dash-text-faint)' }}>
                        {a.name}
                      </p>
                      <p className="text-xs leading-relaxed mt-0.5" style={{ color: 'var(--color-dash-text-faint)' }}>
                        {earned
                          ? `Earned ${new Date(earnedAt).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}`
                          : a.description}
                      </p>
                    </div>
                  </div>
                  {/* Tooltip for locked achievements */}
                  {!earned && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                      style={{ backgroundColor: 'rgba(255,255,255,0.92)' }}>
                      <p className="text-xs font-medium px-3 text-center" style={{ color: 'var(--color-dash-text-muted)' }}>
                        {a.description}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.section>

      {/* Danger Zone */}
      <motion.section custom={4} variants={fadeUp} initial="hidden" animate="show">
        <div className="rounded-xl border p-6" style={{ backgroundColor: 'var(--color-dash-card)', borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(200,121,65,0.08)' }}>
              <Lock className="w-4 h-4" style={{ color: 'var(--color-dash-copper)' }} />
            </div>
            <h2 className="font-bold" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>Change Password</h2>
          </div>

          {pwState === 'success' ? (
            <div className="rounded-lg p-4 flex items-center gap-3" style={{ backgroundColor: 'rgba(45,106,79,0.08)', border: '1px solid rgba(45,106,79,0.2)' }}>
              <CheckCircle className="w-5 h-5" style={{ color: '#6B8E5A' }} />
              <p className="text-sm font-medium" style={{ color: '#6B8E5A' }}>New locks on the cabin. You&apos;re all set.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} placeholder="Current password"
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={inputStyle} />
              <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="New password"
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={inputStyle} />
              <input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="Confirm new password"
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={inputStyle} />
              {pwError && <p className="text-xs" style={{ color: '#C0392B' }}>{pwError}</p>}
              <button onClick={changePassword} disabled={pwState === 'loading' || !newPw || !confirmPw}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-medium disabled:opacity-60 transition-opacity"
                style={{ backgroundColor: 'var(--color-dash-copper)', minHeight: 44 }}>
                {pwState === 'loading' ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Updating...</> : <><Lock className="w-4 h-4" />Update Password</>}
              </button>
            </div>
          )}

          <div className="border-t mt-6 pt-5" style={{ borderColor: 'var(--color-dash-border)' }}>
            <button onClick={signOut}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border transition-all hover:bg-red-50"
              style={{ borderColor: 'rgba(192,57,43,0.3)', color: '#C0392B', minHeight: 44 }}>
              <LogOut className="w-4 h-4" />Sign Out
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
