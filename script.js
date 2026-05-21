const CONFIG = {
    API_ENDPOINT: '/api/signup'
};

const urlParams = new URLSearchParams(window.location.search);
const ref = urlParams.get('ref');
if (ref) {
    localStorage.setItem('savori_ref', ref);
}

const form = document.getElementById('waitlist-form');
const status = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');
const referralBox = document.getElementById('referral-box');
const refLinkInput = document.getElementById('ref-link');
const copyBtn = document.getElementById('copy-btn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const storedRef = localStorage.getItem('savori_ref');
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Joining...';
    status.textContent = '';

    try {
        const res = await fetch(CONFIG.API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, referrerId: storedRef })
        });

        const data = await res.json();

        if (data.success) {
            form.classList.add('hidden');
            referralBox.classList.remove('hidden');
            const shareUrl = `${window.location.origin}${window.location.pathname}?ref=${data.refCode}`;
            refLinkInput.value = shareUrl;
        } else {
            throw new Error(data.error || 'Submission failed');
        }
    } catch (err) {
        status.textContent = 'Oops! Something went wrong. Please try again.';
        status.style.color = '#A63D2D';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Join the Waitlist';
    }
});

copyBtn.addEventListener('click', () => {
    refLinkInput.select();
    document.execCommand('copy');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    setTimeout(() => copyBtn.textContent = originalText, 2000);
});
