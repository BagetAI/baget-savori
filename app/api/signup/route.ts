"use strict";

import { NextResponse } from 'next/server';

const WAITLIST_DB_ID = 'db_waitlist_savori'; // Generic ID to be updated by environment or deploy
const REFERRALS_DB_ID = 'db_referrals_savori';

export async function POST(request: Request) {
    const { email, referrerId } = await request.json();

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    try {
        // 1. Add to Waitlist
        const waitlistRes = await fetch(`https://app.baget.ai/api/public/databases/${WAITLIST_DB_ID}/rows`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: {
                    email: email,
                    source: referrerId || 'direct',
                    signup_date: new Date().toISOString()
                }
            })
        });

        if (!waitlistRes.ok) throw new Error('Waitlist submission failed');

        // 2. If referred, log the referral connection
        if (referrerId && referrerId !== 'direct') {
            await fetch(`https://app.baget.ai/api/public/databases/${REFERRALS_DB_ID}/rows`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    data: {
                        referrer_id: referrerId,
                        friend_email: email,
                        timestamp: new Date().toISOString()
                    }
                })
            });
        }

        // 3. Generate referral code (simple base64 of email for prototype)
        const refCode = Buffer.from(email).toString('base64').substring(0, 8);

        return NextResponse.json({ success: true, refCode });
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ error: 'Failed to process signup' }, { status: 500 });
    }
}
