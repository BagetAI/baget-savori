const CONFIG = {
    WAITLIST_DB: 'savori-waitlist-123',
    REFERRALS_DB: 'savori-referrals-456'
};

async function updateCount() {
    try {
        const response = await fetch(`https://app.baget.ai/api/public/databases/${CONFIG.WAITLIST_DB}/count`);
        const data = await response.json();
        const countEl = document.getElementById('waitlist-count');
        if (countEl && data.count !== undefined) {
            countEl.textContent = data.count + 42; 
        }
    } catch (e) {
        console.error('Failed to fetch count', e);
    }
}

// Referral Logic
const urlParams = new URLSearchParams(window.location.search);
const ref = urlParams.get('ref');
if (ref) {
    localStorage.setItem('savori_ref', ref);
}

const form = document.getElementById('waitlist-form');
const status = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');
const referralBox = document.createElement('div');
referralBox.id = 'referral-link-box';
referralBox.className = 'referral-box hidden';
form.parentNode.insertBefore(referralBox, form.nextSibling);

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const storedRef = localStorage.getItem('savori_ref');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Joining...';
    status.textContent = '';

    try {
        // 1. Submit to Waitlist
        const waitlistRes = await fetch(`https://app.baget.ai/api/public/databases/${CONFIG.WAITLIST_DB}/rows`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: {
                    email: email,
                    source: storedRef || 'direct',
                    signup_date: new Date().toISOString()
                }
            })
        });

        if (waitlistRes.ok) {
            // 2. Submit to Referrals if ref exists
            if (storedRef) {
                await fetch(`https://app.baget.ai/api/public/databases/${CONFIG.REFERRALS_DB}/rows`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        data: {
                            referrer_id: storedRef,
                            friend_email: email,
                            timestamp: new Date().toISOString()
                        }
                    })
                });
            }

            // 3. Show Success & Personal Referral Link
            status.textContent = 'Welcome to the inner circle!';
            status.style.color = 'var(--primary-teal)';
            
            const refLink = `${window.location.origin}${window.location.pathname}?ref=${btoa(email).substring(0, 8)}`;
            referralBox.innerHTML = `
                <p>Invite friends and get your first kit free!</p>
                <div class="share-link">
                    <input type="text" value="${refLink}" readonly id="ref-input">
                    <button onclick="copyRef()">Copy</button>
                </div>
            `;
            referralBox.classList.remove('hidden');
            form.classList.add('hidden');
            updateCount();
        } else {
            throw new Error('Submission failed');
        }
    } catch (err) {
        status.textContent = 'Oops! Something went wrong. Please try again.';
        status.style.color = '#A63D2D';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Join the Waitlist';
    }
});

window.copyRef = () => {
    const input = document.getElementById('ref-input');
    input.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
};

updateCount();
setInterval(updateCount, 30000);
