# Savori Technical Specification

## Core Hypotheses to Test
1. **The Flavor Gap**: Do customers value portioned spices over full jars enough to join a waitlist?
2. **Global Series Appeal**: Which flavor profile (Thai, Moroccan, Szechuan) generates the most clicks?
3. **Flat-Mail Logistics**: Can we maintain the value prop of "letterbox friendly" in our marketing?

## Development Stack
- **Frontend**: Static HTML5, CSS3 (Modern Flexbox/Grid), Vanilla JS.
- **Database**: Baget AI Public Database for waitlist capture.
- **Hosting**: Vercel via GitHub deployment.
- **Analytics**: Waitlist signup count + public API tracking.

## Database Schema (Savori Waitlist)
| Column | Type | Purpose |
| :--- | :--- | :--- |
| email | string | Primary contact |
| source | string | Referral tracking |
| signup_date | date | Cohort analysis |

## Visual System
- **Heading**: Sora (Extra Bold)
- **Body**: Karla
- **Palette**: #F0EDFF, #4C1D95, #14B8A6, #FBBF77
