import type { Metadata } from 'next'
import PlayClient from './PlayClient'

export const metadata: Metadata = {
  title: 'Kootenay Breaker 🏔 | Kootenay Made Digital',
  description: 'A hidden game inside a web design agency. Break through 10 levels of Kootenay pride. Can you clear The Summit?',
}

export default function PlayPage() {
  return <PlayClient />
}
