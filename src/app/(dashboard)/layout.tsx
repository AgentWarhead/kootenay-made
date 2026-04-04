import DashboardShell from './DashboardShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard | Neighbours',
    template: '%s | Neighbours',
  },
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
