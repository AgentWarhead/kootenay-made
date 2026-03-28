import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 3;

  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxRequests) return false;
  entry.count++;
  return true;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, business, interest, message, website, phone, source } = body;

    // Validate required fields
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please provide your name.' }, { status: 400 });
    }
    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ error: 'Please provide a message (at least 10 characters).' }, { status: 400 });
    }

    // Log submission (wire email later)
    console.log('=== NEW CONTACT FORM SUBMISSION ===');
    console.log('Time:', new Date().toISOString());
    console.log('Name:', name.trim());
    console.log('Email:', email.trim());
    console.log('Business:', business?.trim() || 'N/A');
    console.log('Interest:', interest || 'N/A');
    console.log('Website:', website?.trim() || 'N/A');
    console.log('Phone:', phone?.trim() || 'N/A');
    console.log('Source:', source || 'contact');
    console.log('Message:', message.trim());
    console.log('IP:', ip);
    console.log('===================================');

    return NextResponse.json({ success: true, message: 'Thank you! We\'ll be in touch within 24 hours.' });
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
