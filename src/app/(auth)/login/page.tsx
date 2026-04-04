import LoginForm from './LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | Neighbours — Kootenay Made Digital',
};

export default function LoginPage() {
  return <LoginForm />;
}
