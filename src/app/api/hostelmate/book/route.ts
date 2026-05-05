import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

const HOSTELMATE_API = 'https://api.hostelmate.co/api/v1';
const API_KEY = process.env.HOSTELMATE_API_KEY!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { room, dates, guest, notes } = body;

    // Validate required fields
    if (!room || !dates?.length || !guest?.first_name || !guest?.last_name || !guest?.email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Generate a server-side UUID v4 for idempotency — prevents duplicate bookings
    const bookingId = randomUUID();

    const payload = {
      booking: { id: bookingId, dates },
      room,
      guest,
      ...(notes ? { notes } : {}),
    };

    const response = await fetch(`${HOSTELMATE_API}/client/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('[book]', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
