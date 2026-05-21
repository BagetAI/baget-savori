import { VercelRequest, VercelResponse } from '@vercel/node';

const WAITLIST_DB_ID = 'db_waitlist_savori'; 
const REFERRALS_DB_ID = 'db_referrals_savori';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, referrerId } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // 1. Add to Waitlist
        await fetch(`https://app.baget.ai/api/public/databases/${WAITLIST_DB_ID}/rows`, {
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

        // 2. Log Referral
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

        const refCode = Buffer.from(email).toString('base64').substring(0, 8);

        return res.status(200).json({ success: true, refCode });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to process signup' });
    }
}
