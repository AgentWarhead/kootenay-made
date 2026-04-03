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

const LOGO_URL = 'https://kootenay-made-psi.vercel.app/brand/kmd-horizontal-nobg.png';
const SITE_URL = 'https://kootenaymade.ca';

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

function buildNotificationEmail(data: Record<string, string>) {
  const { name, email, phone, business, website, interest, message, source } = data;
  const isAudit = source === 'audit';
  const timestamp = new Date().toLocaleString('en-CA', { timeZone: 'America/Vancouver', dateStyle: 'long', timeStyle: 'short' });

  return {
    subject: `🏔️ New ${isAudit ? 'Audit Request' : 'Inquiry'} — ${business || name}`,
    html: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#1a1a1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#2D3436 0%,#3d4648 100%);padding:28px 32px;border-radius:16px 16px 0 0;">
    <table role="presentation" width="100%"><tr>
      <td><img src="${LOGO_URL}" alt="KMD" width="160" style="display:block;filter:brightness(10);" /></td>
      <td align="right">
        <span style="display:inline-block;background:${isAudit ? '#C17817' : '#2D6A4F'};color:#fff;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:6px 14px;border-radius:20px;">${isAudit ? '🔍 AUDIT REQUEST' : '📬 NEW INQUIRY'}</span>
      </td>
    </tr></table>
  </td></tr>

  <!-- Body -->
  <tr><td style="background:#ffffff;padding:0;">

    <!-- Name banner -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:28px 32px 20px;border-bottom:1px solid #f0ebe5;">
        <p style="margin:0 0 4px;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px;font-weight:600;">From</p>
        <p style="margin:0;font-size:24px;font-weight:700;color:#2D3436;">${name}</p>
        ${business ? `<p style="margin:4px 0 0;font-size:14px;color:#666;">${business}</p>` : ''}
      </td></tr>
    </table>

    <!-- Contact details grid -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 32px;">
      <tr>
        <td style="width:50%;padding:0 12px 16px 0;vertical-align:top;">
          <p style="margin:0 0 2px;font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Email</p>
          <a href="mailto:${email}" style="color:#C17817;font-size:14px;font-weight:600;text-decoration:none;">${email}</a>
        </td>
        <td style="width:50%;padding:0 0 16px 12px;vertical-align:top;">
          <p style="margin:0 0 2px;font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Phone</p>
          <a href="tel:${phone}" style="color:#C17817;font-size:14px;font-weight:600;text-decoration:none;">${phone || 'Not provided'}</a>
        </td>
      </tr>
      <tr>
        <td style="width:50%;padding:0 12px 16px 0;vertical-align:top;">
          <p style="margin:0 0 2px;font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Website</p>
          <p style="margin:0;font-size:14px;color:#2D3436;">${website ? `<a href="${website.startsWith('http') ? website : 'https://' + website}" style="color:#C17817;text-decoration:none;">${website}</a>` : 'None'}</p>
        </td>
        <td style="width:50%;padding:0 0 16px 12px;vertical-align:top;">
          <p style="margin:0 0 2px;font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Interest</p>
          <p style="margin:0;font-size:14px;color:#2D3436;font-weight:500;">${interestLabels[interest] || interest || 'Not specified'}</p>
        </td>
      </tr>
    </table>

    <!-- Message -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:0 32px 28px;">
        <div style="background:#F8F4F0;border-radius:12px;padding:20px 24px;border-left:4px solid #C17817;">
          <p style="margin:0 0 8px;font-size:10px;color:#999;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Message</p>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#2D3436;white-space:pre-wrap;">${message}</p>
        </div>
      </td></tr>
    </table>

  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#F8F4F0;padding:16px 32px;border-radius:0 0 16px 16px;border-top:1px solid #e8e0d8;">
    <table role="presentation" width="100%"><tr>
      <td><p style="margin:0;font-size:12px;color:#999;">${timestamp} PT</p></td>
      <td align="right">
        <a href="mailto:${email}" style="display:inline-block;background:#C17817;color:#fff;font-size:12px;font-weight:600;padding:8px 20px;border-radius:8px;text-decoration:none;">Reply to ${name.split(' ')[0]}</a>
      </td>
    </tr></table>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`,
  };
}

function buildConfirmationEmail(name: string, source: string) {
  const isAudit = source === 'audit';
  const firstName = name.split(' ')[0];

  return {
    subject: isAudit
      ? '🏔️ Your free website audit is on the way'
      : `🏔️ Hey ${firstName} — thanks for reaching out`,
    html: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F8F4F0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F8F4F0;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Header -->
  <tr><td style="background:linear-gradient(135deg,#2D3436 0%,#3d4648 100%);padding:32px;border-radius:16px 16px 0 0;text-align:center;">
    <img src="${LOGO_URL}" alt="Kootenay Made Digital" width="180" style="display:inline-block;filter:brightness(10);" />
  </td></tr>

  <!-- Body -->
  <tr><td style="background:#ffffff;padding:40px 36px;">

    <h1 style="margin:0 0 24px;font-size:26px;font-weight:700;color:#2D3436;line-height:1.3;">
      ${isAudit ? `Your audit is in the works, ${firstName}.` : `Got it, ${firstName}. Let\u2019s talk.`}
    </h1>

    ${isAudit ? `
    <p style="font-size:15px;line-height:1.7;color:#444;margin:0 0 16px;">Thanks for requesting a free website audit! I\u2019ll personally review your site and send you a detailed report within <strong style="color:#2D3436;">48 hours</strong>.</p>
    <p style="font-size:15px;line-height:1.7;color:#444;margin:0 0 16px;">The audit covers speed, design, mobile experience, search visibility, and more \u2014 all in plain English with real next steps you can act on.</p>
    ` : `
    <p style="font-size:15px;line-height:1.7;color:#444;margin:0 0 16px;">Thanks for reaching out! I got your message and I\u2019ll get back to you within <strong style="color:#2D3436;">24 hours</strong> with a real, personalized reply.</p>
    <p style="font-size:15px;line-height:1.7;color:#444;margin:0 0 16px;">No automated responses here \u2014 just me, Brett, reading every message that comes in.</p>
    `}

    <!-- Divider -->
    <div style="height:1px;background:linear-gradient(to right,transparent,#C17817,transparent);margin:28px 0;"></div>

    <!-- What happens next -->
    <p style="font-size:10px;color:#C17817;text-transform:uppercase;letter-spacing:2px;font-weight:700;margin:0 0 16px;">What happens next</p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding:0 0 14px;">
          <table role="presentation"><tr>
            <td style="width:36px;vertical-align:top;">
              <div style="width:28px;height:28px;background:#C17817;border-radius:50%;text-align:center;line-height:28px;color:#fff;font-size:13px;font-weight:700;">1</div>
            </td>
            <td style="padding:2px 0 0 12px;">
              <p style="margin:0;font-size:14px;color:#2D3436;font-weight:600;">You\u2019re here \u2014 message received \u2705</p>
            </td>
          </tr></table>
        </td>
      </tr>
      <tr>
        <td style="padding:0 0 14px;">
          <table role="presentation"><tr>
            <td style="width:36px;vertical-align:top;">
              <div style="width:28px;height:28px;background:#e8e0d8;border-radius:50%;text-align:center;line-height:28px;color:#2D3436;font-size:13px;font-weight:700;">2</div>
            </td>
            <td style="padding:2px 0 0 12px;">
              <p style="margin:0;font-size:14px;color:#555;">${isAudit ? 'I review your site and build your report' : 'Brett reads your message and replies personally'}</p>
            </td>
          </tr></table>
        </td>
      </tr>
      <tr>
        <td style="padding:0;">
          <table role="presentation"><tr>
            <td style="width:36px;vertical-align:top;">
              <div style="width:28px;height:28px;background:#e8e0d8;border-radius:50%;text-align:center;line-height:28px;color:#2D3436;font-size:13px;font-weight:700;">3</div>
            </td>
            <td style="padding:2px 0 0 12px;">
              <p style="margin:0;font-size:14px;color:#555;">${isAudit ? 'You get a branded PDF audit \u2014 no strings attached' : 'We figure out the best path for your business'}</p>
            </td>
          </tr></table>
        </td>
      </tr>
    </table>

    <!-- Divider -->
    <div style="height:1px;background:linear-gradient(to right,transparent,#C17817,transparent);margin:28px 0;"></div>

    <!-- CTA -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F8F4F0;border-radius:12px;padding:24px;">
      <tr><td style="padding:24px;text-align:center;">
        <p style="margin:0 0 8px;font-size:15px;color:#2D3436;font-weight:600;">What happens from here?</p>
        <p style="margin:0;font-size:14px;color:#555;line-height:1.6;">I\u2019ll review your message and get back to you within 24 hours.<br/>If a call makes sense, I\u2019ll suggest a time that works for both of us.</p>
      </td></tr>
    </table>

    <!-- Sign off -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
      <tr><td>
        <p style="font-size:15px;color:#2D3436;margin:0 0 4px;">Talk soon,</p>
        <p style="font-size:18px;font-weight:700;color:#2D3436;margin:0;">Brett</p>
        <p style="font-size:13px;color:#888;margin:4px 0 0;">Kootenay Made Digital \u2014 Castlegar, BC</p>
      </td></tr>
    </table>

  </td></tr>

  <!-- Footer -->
  <tr><td style="padding:24px 32px;text-align:center;">
    <p style="margin:0 0 8px;">
      <a href="${SITE_URL}" style="color:#C17817;font-size:13px;font-weight:600;text-decoration:none;">kootenaymade.ca</a>
      <span style="color:#ccc;"> \u00B7 </span>
      <a href="mailto:hello@kootenaymade.ca" style="color:#888;font-size:13px;text-decoration:none;">hello@kootenaymade.ca</a>
    </p>
    <p style="margin:0;font-size:11px;color:#bbb;">Locally crafted digital for businesses worldwide.</p>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`,
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

    if (process.env.SMTP_PASS) {
      const transporter = getTransporter();
      const notification = buildNotificationEmail(trimmed);
      const confirmation = buildConfirmationEmail(trimmed.name, trimmed.source);

      await transporter.sendMail({
        from: '"Kootenay Made Digital" <hello@kootenaymade.ca>',
        to: 'hello@kootenaymade.ca',
        replyTo: trimmed.email,
        ...notification,
      });

      await transporter.sendMail({
        from: '"Brett — Kootenay Made Digital" <hello@kootenaymade.ca>',
        to: trimmed.email,
        ...confirmation,
      });
    } else {
      console.warn('SMTP_PASS not set — emails not sent');
    }

    console.log('=== CONTACT SUBMISSION ===', JSON.stringify(trimmed), '===');

    return NextResponse.json({ success: true, message: 'Thank you! We\'ll be in touch within 24 hours.' });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
