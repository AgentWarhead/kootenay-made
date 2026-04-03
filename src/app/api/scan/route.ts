import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let { url } = body as { url: string };

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Please provide a URL.' }, { status: 400 });
    }

    url = url.trim();

    // Add https:// if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    // Validate URL format
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL. Please check the address and try again.' }, { status: 400 });
    }

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return NextResponse.json({ error: 'URL must start with http:// or https://' }, { status: 400 });
    }

    const encodedUrl = encodeURIComponent(parsedUrl.href);
    const apiKey = process.env.PAGESPEED_API_KEY;
    const keyParam = apiKey ? `&key=${apiKey}` : '';
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodedUrl}&strategy=mobile&category=performance&category=accessibility&category=seo&category=best-practices${keyParam}`;

    // 30-second timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    let apiResponse: Response;
    try {
      apiResponse = await fetch(apiUrl, { signal: controller.signal });
    } catch (err: unknown) {
      clearTimeout(timeout);
      const isAbort = err instanceof Error && err.name === 'AbortError';
      return NextResponse.json(
        { error: isAbort ? 'Scan timed out. The site may be unreachable.' : 'Could not reach the PageSpeed API. Please try again.' },
        { status: 502 }
      );
    }
    clearTimeout(timeout);

    if (!apiResponse.ok) {
      const errBody = await apiResponse.json().catch(() => ({}));
      const rawMsg = (errBody?.error?.message || '').toLowerCase();
      const msg = rawMsg.includes('quota') || rawMsg.includes('limit')
        ? 'Our scanner is temporarily busy. Please try again in a few minutes, or skip straight to booking your free audit below.'
        : 'We couldn\'t scan that site. Please check the URL and try again.';
      return NextResponse.json({ error: msg }, { status: 502 });
    }

    const data = await apiResponse.json();
    const cats = data?.lighthouseResult?.categories;

    if (!cats) {
      return NextResponse.json({ error: 'Could not parse scan results. The site may not be reachable.' }, { status: 502 });
    }

    const toScore = (val: number | undefined) => Math.round((val ?? 0) * 100);

    return NextResponse.json({
      scores: {
        performance: toScore(cats.performance?.score),
        accessibility: toScore(cats.accessibility?.score),
        seo: toScore(cats.seo?.score),
        bestPractices: toScore(cats['best-practices']?.score),
      },
      fetchedUrl: parsedUrl.href,
    });
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
