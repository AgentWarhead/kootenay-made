'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Map,
  BookOpen,
  Video,
  MessageSquare,
  User,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  Mountain,
  Menu,
  X,
  LogOut,
  ExternalLink,
  Lock,
  Award,
  MapPin,
  Compass,
  TreePine,
  Flag,
  Eye,
  Tent,
} from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: Home, emoji: '🏠' },
  { href: '/dashboard/trailhead', label: 'Trailhead', icon: Map, emoji: '🗺️' },
  { href: '/dashboard/guides', label: 'Guides', icon: BookOpen, emoji: '📚' },
  { href: '/dashboard/videos', label: 'Videos', icon: Video, emoji: '🎬' },
  { href: '/dashboard/community', label: 'Community', icon: MessageSquare, emoji: '💬' },
  { href: '/dashboard/account', label: 'Account', icon: User, emoji: '👤' },
];

const BOTTOM_TABS = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/dashboard/guides', label: 'Learn', icon: BookOpen },
  { href: '/dashboard/videos', label: 'Watch', icon: Video },
  { href: '/dashboard/community', label: 'Community', icon: MessageSquare },
  { href: '/dashboard/account', label: 'Account', icon: User },
];

const ACHIEVEMENT_BADGES = [
  { id: 'basecamp', label: 'Basecamp', icon: Tent, earned: true },
  { id: 'arrow-lakes', label: 'Arrow Lakes', icon: Compass, earned: true },
  { id: 'old-growth', label: 'Old Growth', icon: TreePine, earned: true },
  { id: 'ridge-runner', label: 'Ridge Runner', icon: Mountain, earned: false },
  { id: 'summit-seeker', label: 'Summit Seeker', icon: Flag, earned: false },
  { id: 'trail-blazer', label: 'Trail Blazer', icon: MapPin, earned: false },
  { id: 'vista-view', label: 'Vista View', icon: Eye, earned: false },
  { id: 'community-guide', label: 'Community Guide', icon: MessageSquare, earned: false },
  { id: 'gold-standard', label: 'Gold Standard', icon: Award, earned: false },
];

function isActiveRoute(pathname: string, href: string) {
  if (href === '/dashboard') return pathname === '/dashboard';
  return pathname.startsWith(href);
}

/* Circular progress ring SVG */
function TrailProgressRing({ percent }: { percent: number }) {
  const size = 72;
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-dash-border)"
          strokeWidth={stroke}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-dash-copper)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span
        className="absolute text-sm font-bold"
        style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-copper)' }}
      >
        {percent}%
      </span>
    </div>
  );
}

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { profile, signOut } = useAuth();

  const businessName = profile?.business_name ?? 'Your Business';
  const initials = businessName
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'YB';

  // Collapse sidebar on tablet by default
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1024 && window.innerWidth >= 768) {
        setCollapsed(true);
      } else if (window.innerWidth >= 1024) {
        setCollapsed(false);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile overlay on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Demo: hardcode overall progress
  const overallProgress = 28;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--color-dash-bg)', fontFamily: 'var(--font-general)' }}
    >
      {/* Keyframes for copper nav glow */}
      <style>{`
        @keyframes copper-glow-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(200, 121, 65, 0); }
          50% { box-shadow: 0 0 12px 2px rgba(200, 121, 65, 0.18); }
        }
        .nav-active-glow {
          animation: copper-glow-pulse 2.5s ease-in-out infinite;
        }
        @media (max-width: 767px) {
          header { left: 0 !important; }
          main { margin-left: 0 !important; }
        }
      `}</style>

      {/* Top bar */}
      <header
        className="fixed top-0 right-0 z-40 flex items-center gap-3 px-4 border-b transition-all duration-200"
        style={{
          height: 'var(--topbar-height)',
          left: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
          backgroundColor: 'var(--color-dash-sidebar)',
          borderColor: 'var(--color-dash-sidebar-border)',
        }}
      >
        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
          style={{ color: 'var(--color-dash-text-muted)' }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 mr-4 shrink-0">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-dash-copper)' }}
          >
            <Mountain className="w-4 h-4 text-white" />
          </div>
          <span
            className="hidden sm:block font-bold text-sm"
            style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}
          >
            Neighbours
          </span>
        </Link>

        {/* Search — hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-sm relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: 'var(--color-dash-text-faint)' }}
          />
          <input
            type="search"
            placeholder="Search guides, videos..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border text-sm outline-none"
            style={{
              borderColor: 'var(--color-dash-border)',
              backgroundColor: 'var(--color-dash-bg)',
              color: 'var(--color-dash-text)',
            }}
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/dashboard/support"
            className="relative w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:bg-black/5"
            style={{ color: 'var(--color-dash-text-muted)' }}
            aria-label="Support & Notifications"
          >
            <Bell className="w-5 h-5" />
          </Link>

          <Link
            href="/dashboard/account"
            className="w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'var(--color-dash-copper)' }}
            title={businessName}
            aria-label="My Account"
          >
            {initials}
          </Link>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          'fixed top-0 left-0 bottom-0 z-30 flex flex-col transition-all duration-200',
          'max-md:w-[260px] max-md:shadow-2xl',
          mobileOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full',
          'md:translate-x-0',
        ].join(' ')}
        style={{
          width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
          backgroundColor: 'var(--color-dash-sidebar)',
          paddingTop: 'var(--topbar-height)',
          borderRight: '1px solid transparent',
          borderImage: `linear-gradient(to bottom, var(--color-dash-sidebar-border) 0%, rgba(200,121,65,0.25) 100%) 1`,
        }}
      >
        {/* Topo lines background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/images/dashboard/topo-lines.svg)',
            backgroundRepeat: 'repeat',
            backgroundSize: '400px 400px',
            opacity: 0.03,
          }}
          aria-hidden="true"
        />

        {/* Trail Progress Ring — above nav */}
        {!collapsed && (
          <div className="relative flex flex-col items-center py-5 px-4">
            <TrailProgressRing percent={overallProgress} />
            <p
              className="mt-2 text-xs font-medium"
              style={{ color: 'var(--color-dash-text-muted)', fontFamily: 'var(--font-cabinet)' }}
            >
              Trail Progress
            </p>
          </div>
        )}

        {/* Nav */}
        <nav className="relative flex-1 overflow-y-auto py-2 px-2">
          {!collapsed && (
            <p
              className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider"
              style={{ color: 'var(--color-dash-text-faint)', fontFamily: 'var(--font-cabinet)' }}
            >
              Navigation
            </p>
          )}
          <ul className="space-y-0.5">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active = isActiveRoute(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 relative',
                      active ? 'nav-active-glow' : '',
                    ].join(' ')}
                    style={{
                      color: active ? 'var(--color-dash-copper)' : 'var(--color-dash-text-muted)',
                      backgroundColor: active ? 'var(--color-dash-copper-muted)' : 'transparent',
                      fontFamily: 'var(--font-general)',
                    }}
                    title={collapsed ? label : undefined}
                  >
                    {/* Waypoint dot */}
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200"
                      style={{
                        backgroundColor: active ? 'var(--color-dash-copper)' : 'var(--color-dash-border)',
                      }}
                    />
                    <Icon className="w-5 h-5 shrink-0" />
                    {!collapsed && <span>{label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Trail Position Indicator */}
          {!collapsed && (
            <div
              className="mt-5 mx-2 rounded-lg p-3 flex items-center gap-2.5"
              style={{
                backgroundColor: 'var(--color-dash-copper-muted)',
                borderLeft: '3px solid var(--color-dash-copper)',
              }}
            >
              <Mountain className="w-4 h-4 shrink-0" style={{ color: 'var(--color-dash-copper)' }} />
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--color-dash-text-faint)' }}>
                  Currently at
                </p>
                <p className="text-xs font-semibold" style={{ color: 'var(--color-dash-text)', fontFamily: 'var(--font-cabinet)' }}>
                  Basecamp
                </p>
              </div>
            </div>
          )}

          {/* Achievement Badges */}
          {!collapsed && (
            <div className="mt-4 mx-2">
              <p
                className="px-1 mb-2 text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-dash-text-faint)', fontFamily: 'var(--font-cabinet)' }}
              >
                Achievements
              </p>
              <div className="flex flex-wrap gap-1.5">
                {ACHIEVEMENT_BADGES.map(({ id, label, icon: BadgeIcon, earned }) => (
                  <div
                    key={id}
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{
                      backgroundColor: earned ? 'var(--color-dash-copper)' : 'transparent',
                      border: earned ? 'none' : '1.5px dashed var(--color-dash-border)',
                    }}
                    title={label + (earned ? ' (earned)' : ' (locked)')}
                  >
                    {earned ? (
                      <BadgeIcon className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <Lock className="w-3 h-3" style={{ color: 'var(--color-dash-text-faint)' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Business name + Logout */}
        <div
          className="relative px-3 py-3 border-t"
          style={{ borderColor: 'var(--color-dash-sidebar-border)' }}
        >
          {!collapsed && (
            <div className="flex items-center gap-2 mb-2 px-1">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center font-semibold text-xs text-white shrink-0"
                style={{ backgroundColor: 'var(--color-dash-copper)' }}
              >
                {initials}
              </div>
              <span
                className="text-xs font-medium truncate"
                style={{ color: 'var(--color-dash-text-muted)', fontFamily: 'var(--font-general)' }}
              >
                {businessName}
              </span>
            </div>
          )}
          <Link
            href="/"
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors hover:bg-black/5"
            style={{ color: 'var(--color-dash-text-faint)', fontFamily: 'var(--font-general)' }}
            title={collapsed ? 'Back to kootenaymade.ca' : undefined}
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            {!collapsed && <span>kootenaymade.ca</span>}
          </Link>
          <button
            onClick={signOut}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition-colors hover:bg-black/5"
            style={{ color: 'var(--color-dash-text-faint)', fontFamily: 'var(--font-general)' }}
            title={collapsed ? 'Sign out' : undefined}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Sign out</span>}
          </button>
        </div>

        {/* Collapse button — desktop only */}
        <div className="relative hidden md:flex justify-end px-3 py-4 border-t" style={{ borderColor: 'var(--color-dash-sidebar-border)' }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-black/5"
            style={{ color: 'var(--color-dash-text-faint)' }}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        className="flex-1 transition-all duration-200 pb-20 md:pb-0"
        style={{
          marginTop: 'var(--topbar-height)',
          marginLeft: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        }}
      >
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>

      {/* Bottom tab bar — mobile only */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden border-t"
        style={{
          backgroundColor: 'rgba(253, 250, 247, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderColor: 'var(--color-dash-sidebar-border)',
        }}
      >
        {BOTTOM_TABS.map(({ href, label, icon: Icon }) => {
          const active = isActiveRoute(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-2 min-h-[56px] transition-colors"
              style={{ color: active ? 'var(--color-dash-copper)' : 'var(--color-dash-text-faint)' }}
            >
              <Icon className="w-5 h-5" />
              <span
                className="text-[10px] font-medium"
                style={{ fontFamily: 'var(--font-general)' }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
