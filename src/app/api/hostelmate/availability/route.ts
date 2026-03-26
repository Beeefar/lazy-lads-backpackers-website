import { NextRequest, NextResponse } from 'next/server';

const HOSTELMATE_API = 'https://api.hostelmate.co/api/v1';
const PROPERTY_ID = process.env.HOSTELMATE_PROPERTY_ID!;
const API_KEY = process.env.HOSTELMATE_API_KEY!;

/** Returns the next N days starting from today as YYYY-MM-DD strings */
function getUpcomingDates(days = 14): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

async function fetchAvailability(dates: string[]) {
  return fetch(`${HOSTELMATE_API}/get-new-avilablilty`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify({ dates, property: PROPERTY_ID }),
    next: { revalidate: 600 },
  });
}

/**
 * GET /api/hostelmate/availability
 * Fetches the next 14 days and picks the first available price per room.
 * Used by the Rooms section on the homepage.
 */
export async function GET() {
  try {
    const dates = getUpcomingDates(14);
    const response = await fetchAvailability(dates);

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: err }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('[availability GET]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/hostelmate/availability
 * Fetches prices for specific dates. Used by the Reserve page.
 * Body: { dates: string[] }
 */
export async function POST(req: NextRequest) {
  try {
    const { dates } = await req.json();
    if (!dates || !Array.isArray(dates) || dates.length === 0) {
      return NextResponse.json({ error: 'dates array is required' }, { status: 400 });
    }

    const response = await fetchAvailability(dates);
    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: err }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('[availability POST]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
