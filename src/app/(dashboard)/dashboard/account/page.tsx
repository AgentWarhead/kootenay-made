'use client';

import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Save, Lock, LogOut, CheckCircle, Trophy, Globe, User, BookOpen, Users, ThumbsUp, TrendingUp } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

type Profile = { id: string; business_name: string; website_url: string; bio: string };
type Achievement = { id: string; slug: string; name: string; description: string; icon_name: string; order_index: number };
type UserAchievement = { achievement_id: string; earned_at: string };

const ACHIEVEMENT_ICONS: Record<string, React.ReactNode> = {
  default: <Trophy className="w-5 h-5" />,
};

function AchievementIcon({ name }: { name: string }) {
  return ACHIEVEMENT_ICONS[name] ?? ACHIEVEMENT_ICONS.default;
}

export default function AccountPage() {
  const supabase = createClient();
  const router = useRouter();

  const [profile, setProfile] = useState<Profile>({ id: '', business_name: '', website_url: '', bio: '' });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);

  const [stats, setStats] = useState({ guidesCompleted: 0, totalGuides: 0, trailProgress: 0, communityPosts: 0, helpfulReactions: 0 });

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwState, setPwState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [pwError, setPwError] = useState('');

  const [notifPrefs, setNotifPrefs] = useState({ newGuide: true, ticketReply: true, communityMention: false });

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [
        { data: profileData },
        { data: achieveData },
        { data: userAchieveData },
        { data: guidesData },
        { data: progressData },
        { data: postsData },
        { data: helpfulData },
      ] = await Promise.all([
        supabase.from('profiles').select('id, business_name, website_url, bio').eq('id', user.id).single(),
        supabase.from('achievements').select('*').order('order_index'),
        supabase.from('user_achievements').select('achievement_id, earned_at').eq('user_id', user.id),
        supabase.from('guides').select('id', { count: 'exact', head: true }).eq('published', true),
        supabase.from('user_guide_progress').select('completed').eq('user_id', user.id).eq('completed', true),
        supabase.from('forum_posts').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('forum_replies').select('helpful_count').eq('user_id', user.id),
      ]);

      if (profileData && typeof profileData === 'object' && 'id' in profileData) {
        const pd = profileData as { id: string; business_name?: string | null; website_url?: string | null; bio?: string | null };
        setProfile({ id: pd.id, business_name: pd.business_name ?? '', website_url: pd.website_url ?? '', bio: pd.bio ?? '' });
      }
      setAchievements(achieveData ?? []);
      setUserAchievements(userAchieveData ?? []);

      const totalGuides = Array.isArray(guidesData) ? guidesData.length : 0;
      const completed = progressData?.length ?? 0;
      const total = (achieveData ?? []).length > 0 ? totalGuides : 0;
      const helpfulTotal = (helpfulData ?? []).reduce((sum: number, r: { helpful_count: number }) => sum + (r.helpful_count ?? 0), 0);

      setStats({
        guidesCompleted: completed,
        totalGuides: total,
        trailProgress: total > 0 ? Math.round((completed / total) * 100) : 0,
        communityPosts: Array.isArray(postsData) ? postsData.length : 0,
        helpfulReactions: helpfulTotal,
      });

      // Load notif prefs from localStorage
      try {
        const saved = JSON.parse(localStorage.getItem('kmd_notif_prefs') ?? '{}');
        setNotifPrefs(prev => ({ ...prev, ...saved }));
      } catch { /* ignore */ }
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

  const saveNotifPrefs = (prefs: typeof notifPrefs) => {
    setNotifPrefs(prefs);
    localStorage.setItem('kmd_notif_prefs', JSON.stringify(prefs));
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const earnedMap = new Map(userAchievements.map(ua => [ua.achievement_id, ua.earned_at]));

  return (
    <div className="space-y-8 max-w-3xl" style={{ fontFamily: 'var(--font-general)' }}>
      {/* Header */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="show">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>Account</h1>
        <p className="text-sm" style={{ color: 'var(--color-dash-text-muted)' }}>Your profile, achievements, and settings.</p>
      </motion.div>

      {/* Profile Card */}
      <motion.section custom={1} variants={fadeUp} initial="hidden" animate="show">
        <div className="rounded-xl border bg-white p-6" style={{ borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-dash-copper-muted)' }}>
              <User className="w-4 h-4" style={{ color: 'var(--color-dash-copper)' }} />
            </div>
            <h2 className="font-bold" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>Your Profile</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-dash-text-muted)' }}>Business Name</label>
              <input type="text" value={profile.business_name} onChange={e => setProfile(p => ({ ...p, business_name: e.target.value }))}
                placeholder="Your business name"
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: 'var(--color-dash-border)', color: 'var(--color-dash-text)', fontFamily: 'var(--font-general)', '--tw-ring-color': 'var(--color-dash-copper)' } as React.CSSProperties} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 flex items-center gap-1" style={{ color: 'var(--color-dash-text-muted)' }}>
                <Globe className="w-3 h-3" />Website URL
              </label>
              <input type="url" value={profile.website_url} onChange={e => setProfile(p => ({ ...p, website_url: e.target.value }))}
                placeholder="https://yourbusiness.ca"
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: 'var(--color-dash-border)', color: 'var(--color-dash-text)', fontFamily: 'var(--font-general)', '--tw-ring-color': 'var(--color-dash-copper)' } as React.CSSProperties} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--color-dash-text-muted)' }}>Bio</label>
              <textarea value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                placeholder="Tell your neighbours about your business..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg border text-sm resize-none focus:outline-none focus:ring-2"
                style={{ borderColor: 'var(--color-dash-border)', color: 'var(--color-dash-text)', fontFamily: 'var(--font-general)', '--tw-ring-color': 'var(--color-dash-copper)' } as React.CSSProperties} />
            </div>
            <button onClick={saveProfile} disabled={profileSaving}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-medium disabled:opacity-60 transition-all"
              style={{ backgroundColor: profileSaved ? 'var(--color-forest, #2D6A4F)' : 'var(--color-dash-copper)', minHeight: 44 }}>
              {profileSaved ? <><CheckCircle className="w-4 h-4" />Saved!</> : profileSaving ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save Profile</>}
            </button>
          </div>
        </div>
      </motion.section>

      {/* Achievements */}
      <motion.section custom={2} variants={fadeUp} initial="hidden" animate="show">
        <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>Achievements</h2>
        {achievements.length === 0 ? (
          <div className="rounded-xl border bg-white p-8 text-center" style={{ borderColor: 'var(--color-dash-border)' }}>
            <Trophy className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--color-dash-text-faint)' }} />
            <p className="text-sm" style={{ color: 'var(--color-dash-text-muted)' }}>Achievements unlocked as you explore the trail.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {achievements.map(a => {
              const earned = earnedMap.get(a.id);
              return (
                <div key={a.id} className="rounded-xl border bg-white p-4 flex flex-col items-center text-center"
                  style={{
                    borderColor: earned ? 'rgba(200,121,65,0.3)' : 'var(--color-dash-border)',
                    boxShadow: earned ? '0 1px 8px rgba(200,121,65,0.1)' : '0 1px 4px rgba(0,0,0,0.04)',
                    opacity: earned ? 1 : 0.6,
                  }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                    style={{ backgroundColor: earned ? 'var(--color-dash-copper-muted)' : '#f5f5f5', color: earned ? 'var(--color-dash-copper)' : '#aaa' }}>
                    <AchievementIcon name={a.icon_name} />
                  </div>
                  <p className="text-xs font-bold mb-1" style={{ color: earned ? 'var(--color-dash-text)' : 'var(--color-dash-text-faint)' }}>{a.name}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-dash-text-faint)' }}>
                    {earned ? `Earned ${new Date(earned).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}` : a.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </motion.section>

      {/* Stats */}
      <motion.section custom={3} variants={fadeUp} initial="hidden" animate="show">
        <h2 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>My Stats</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Guides Completed', value: `${stats.guidesCompleted}${stats.totalGuides > 0 ? ` / ${stats.totalGuides}` : ''}`, icon: BookOpen, color: 'var(--color-forest)' },
            { label: 'Trail Progress', value: `${stats.trailProgress}%`, icon: TrendingUp, color: 'var(--color-dash-copper)' },
            { label: 'Community Posts', value: String(stats.communityPosts), icon: Users, color: 'var(--color-river)' },
            { label: 'Helpful Reactions', value: String(stats.helpfulReactions), icon: ThumbsUp, color: '#8E44AD' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="rounded-xl border bg-white p-4 flex flex-col gap-2"
              style={{ borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
                <Icon className="w-4 h-4" style={{ color }} />
              </div>
              <p className="text-xl font-bold" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>{value}</p>
              <p className="text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>{label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Settings */}
      <motion.section custom={4} variants={fadeUp} initial="hidden" animate="show">
        <div className="rounded-xl border bg-white p-6" style={{ borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-dash-copper-muted)' }}>
              <Lock className="w-4 h-4" style={{ color: 'var(--color-dash-copper)' }} />
            </div>
            <h2 className="font-bold" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>Change Password</h2>
          </div>

          {pwState === 'success' ? (
            <div className="rounded-lg p-4 flex items-center gap-3" style={{ backgroundColor: 'rgba(45,106,79,0.08)', border: '1px solid rgba(45,106,79,0.2)' }}>
              <CheckCircle className="w-5 h-5" style={{ color: '#2D6A4F' }} />
              <p className="text-sm font-medium" style={{ color: '#2D6A4F' }}>New locks on the cabin. You&apos;re all set.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} placeholder="Current password"
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: 'var(--color-dash-border)', color: 'var(--color-dash-text)', fontFamily: 'var(--font-general)', '--tw-ring-color': 'var(--color-dash-copper)' } as React.CSSProperties} />
              <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="New password"
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: 'var(--color-dash-border)', color: 'var(--color-dash-text)', fontFamily: 'var(--font-general)', '--tw-ring-color': 'var(--color-dash-copper)' } as React.CSSProperties} />
              <input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder="Confirm new password"
                className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: 'var(--color-dash-border)', color: 'var(--color-dash-text)', fontFamily: 'var(--font-general)', '--tw-ring-color': 'var(--color-dash-copper)' } as React.CSSProperties} />
              {pwError && <p className="text-xs" style={{ color: '#C0392B' }}>{pwError}</p>}
              <button onClick={changePassword} disabled={pwState === 'loading' || !newPw || !confirmPw}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-medium disabled:opacity-60 transition-opacity"
                style={{ backgroundColor: 'var(--color-dash-copper)', minHeight: 44 }}>
                {pwState === 'loading' ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Updating...</> : <><Lock className="w-4 h-4" />Update Password</>}
              </button>
            </div>
          )}
        </div>
      </motion.section>

      {/* Notifications */}
      <motion.section custom={5} variants={fadeUp} initial="hidden" animate="show">
        <div className="rounded-xl border bg-white p-6" style={{ borderColor: 'var(--color-dash-border)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <h2 className="font-bold mb-4" style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}>Notification Preferences</h2>
          <div className="space-y-3">
            {[
              { key: 'newGuide', label: 'New guide published' },
              { key: 'ticketReply', label: 'Reply to my support ticket' },
              { key: 'communityMention', label: 'Mention in the community' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer" style={{ minHeight: 44 }}>
                <input type="checkbox" checked={notifPrefs[key as keyof typeof notifPrefs]}
                  onChange={e => saveNotifPrefs({ ...notifPrefs, [key]: e.target.checked })}
                  className="w-4 h-4 rounded accent-[var(--color-dash-copper)]" />
                <span className="text-sm" style={{ color: 'var(--color-dash-text)' }}>Email me when: {label}</span>
              </label>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Danger Zone */}
      <motion.section custom={6} variants={fadeUp} initial="hidden" animate="show">
        <div className="rounded-xl border p-6" style={{ borderColor: 'rgba(192,57,43,0.3)' }}>
          <h2 className="font-bold mb-3" style={{ fontFamily: 'var(--font-cabinet)', color: '#C0392B' }}>Danger Zone</h2>
          <button onClick={signOut}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all hover:bg-red-50"
            style={{ borderColor: '#C0392B', color: '#C0392B', minHeight: 44 }}>
            <LogOut className="w-4 h-4" />Sign Out
          </button>
        </div>
      </motion.section>
    </div>
  );
}
