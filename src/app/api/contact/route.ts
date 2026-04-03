import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
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

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER || 'hello@kootenaymade.ca',
      pass: process.env.SMTP_PASS,
    },
  });
}

function buildNotificationEmail(data: Record<string, string>) {
  const { name, email, phone, business, website, interest, message, source } = data;
  const interestLabels: Record<string, string> = {
    website: 'A brand new website',
    ecommerce: 'An online store (Shopify)',
    rebrand: 'A brand refresh or rebrand',
    email: 'Email marketing',
    ai: 'AI tools for my business',
    google: 'Show up on Google',
    audit: 'Free website audit',
    'not-sure': 'Not sure yet',
    other: 'Something else',
  };

  return {
    subject: `🏔️ New ${source === 'audit' ? 'Audit Request' : 'Contact Form'} — ${business || name}`,
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#F8F4F0;border-radius:12px;">
        <div style="background:#2D3436;padding:16px 24px;border-radius:8px 8px 0 0;">
          <h2 style="color:#fff;margin:0;font-size:18px;">New ${source === 'audit' ? 'Audit Request' : 'Inquiry'}</h2>
        </div>
        <div style="background:#fff;padding:24px;border:1px solid #e8e0d8;border-top:none;border-radius:0 0 8px 8px;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:8px 0;color:#888;width:120px;">Name</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#C17817;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#888;">Phone</td><td style="padding:8px 0;"><a href="tel:${phone}" style="color:#C17817;">${phone || 'Not provided'}</a></td></tr>
            <tr><td style="padding:8px 0;color:#888;">Business</td><td style="padding:8px 0;font-weight:600;">${business || 'Not provided'}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Website</td><td style="padding:8px 0;">${website || 'None'}</td></tr>
            <tr><td style="padding:8px 0;color:#888;">Interest</td><td style="padding:8px 0;">${interestLabels[interest] || interest || 'Not specified'}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#F8F4F0;border-radius:8px;border-left:3px solid #C17817;">
            <p style="margin:0 0 4px;color:#888;font-size:12px;">Message</p>
            <p style="margin:0;white-space:pre-wrap;">${message}</p>
          </div>
          <p style="margin-top:16px;font-size:12px;color:#888;">Submitted at ${new Date().toLocaleString('en-CA', { timeZone: 'America/Vancouver' })} PT</p>
        </div>
      </div>
    `,
  };
}

function buildConfirmationEmail(name: string, source: string) {
  const isAudit = source === 'audit';
  return {
    subject: isAudit
      ? '🏔️ Your free website audit is on the way'
      : '🏔️ Thanks for reaching out — Kootenay Made Digital',
    html: `
      <div style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#F8F4F0;border-radius:12px;">
        <div style="background:#2D3436;padding:16px 24px;border-radius:8px 8px 0 0;text-align:center;">
          <h2 style="color:#fff;margin:0;font-size:18px;">Kootenay Made Digital</h2>
        </div>
        <div style="background:#fff;padding:32px 24px;border:1px solid #e8e0d8;border-top:none;border-radius:0 0 8px 8px;">
          <p style="font-size:16px;margin:0 0 16px;">Hey ${name.split(' ')[0]},</p>
          ${isAudit ? `
            <p style="font-size:14px;line-height:1.6;margin:0 0 12px;">Thanks for requesting a free website audit! I'll personally review your site and send you a detailed report within <strong>48 hours</strong>.</p>
            <p style="font-size:14px;line-height:1.6;margin:0 0 12px;">The audit covers your site's speed, design, mobile experience, search visibility, and more — all in plain English with actionable next steps.</p>
          ` : `
            <p style="font-size:14px;line-height:1.6;margin:0 0 12px;">Thanks for reaching out! I got your message and I'll get back to you within <strong>24 hours</strong> with a real, personalized reply.</p>
            <p style="font-size:14px;line-height:1.6;margin:0 0 12px;">No automated responses here — just me, Brett, reading every message.</p>
          `}
          <p style="font-size:14px;line-height:1.6;margin:0 0 12px;">In the meantime, feel free to text me at <a href="sms:+17789864468" style="color:#C17817;font-weight:600;">778-986-4468</a> if you want to chat sooner.</p>
          <p style="font-size:14px;line-height:1.6;margin:24px 0 0;">Talk soon,<br/><strong>Brett</strong><br/><span style="color:#888;font-size:13px;">Kootenay Made Digital — Castlegar, BC</span></p>
        </div>
        <p style="text-align:center;font-size:11px;color:#888;margin-top:16px;">
          <a href="https://kootenaymade.ca" style="color:#C17817;">kootenaymade.ca</a> · hello@kootenaymade.ca · 778-986-4468
        </p>
      </div>
    `,
  };
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

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please provide your name.' }, { status: 400 });
    }
    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ error: 'Please provide a message (at least 10 characters).' }, { status: 400 });
    }

    const trimmed: Record<string, string> = {
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || '',
      business: business?.trim() || '',
      website: website?.trim() || '',
      interest: interest || '',
      message: message.trim(),
      source: source || 'contact',
    };

    // Send emails
    if (process.env.SMTP_PASS) {
      const transporter = getTransporter();
      const notification = buildNotificationEmail(trimmed);
      const confirmation = buildConfirmationEmail(trimmed.name, trimmed.source);

      // Notification to Brett
      await transporter.sendMail({
        from: '"Kootenay Made Digital" <hello@kootenaymade.ca>',
        to: 'hello@kootenaymade.ca',
        replyTo: trimmed.email,
        ...notification,
      });

      // Confirmation to customer
      await transporter.sendMail({
        from: '"Brett — Kootenay Made Digital" <hello@kootenaymade.ca>',
        to: trimmed.email,
        ...confirmation,
      });
    } else {
      console.warn('SMTP_PASS not set — emails not sent');
    }

    // Always log
    console.log('=== CONTACT SUBMISSION ===', JSON.stringify(trimmed), '===');

    return NextResponse.json({ success: true, message: 'Thank you! We\'ll be in touch within 24 hours.' });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
