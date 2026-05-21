const CONFIG = {
    DATABASE_ID: 'savori-waitlist-123', // This will be replaced after database creation
};

async function updateCount() {
    try {
        const response = await fetch(`https://app.baget.ai/api/public/databases/${CONFIG.DATABASE_ID}/count`);
        const data = await response.json();
        const countEl = document.getElementById('waitlist-count');
        if (countEl && data.count !== undefined) {
            countEl.textContent = data.count + 42; // Social proof offset
        }
    } catch (e) {
        console.error('Failed to fetch count', e);
    }
}

const form = document.getElementById('waitlist-form');
const status = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Joining...';
    status.textContent = '';
    status.style.color = 'var(--text-violet)';

    try {
        const res = await fetch(`https://app.baget.ai/api/public/databases/${CONFIG.DATABASE_ID}/rows`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: {
                    email: email,
                    source: window.location.href,
                    signup_date: new Date().toISOString()
                }
            })
        });

        if (res.ok) {
            status.textContent = 'Welcome to the inner circle! We\'ll be in touch soon.';
            status.style.color = 'var(--primary-teal)';
            form.reset();
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

// Initial count fetch
updateCount();
setInterval(updateCount, 30000); // Update every 30s
