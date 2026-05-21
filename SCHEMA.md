# Savori Database Schemas

## 1. Suppliers Table
This table stores verified spice suppliers and co-packers for the Savori Global Series.

| Column | Type | Description |
| :--- | :--- | :--- |
| name | string | Partner name |
| email | string | Contact email |
| MOQ | string | Minimum Order Quantity |
| location | string | Geographical location |
| organic_certified | string | Certification status |

## 2. Referrals Table
This table tracks the referral loop for the waitlist.

| Column | Type | Description |
| :--- | :--- | :--- |
| referrer_id | string | ID of the person who shared the link |
| friend_email | string | Email of the person who signed up |
| timestamp | string | ISO date of referral |

## 3. Waitlist Table (Existing)
| Column | Type | Description |
| :--- | :--- | :--- |
| email | string | Subscriber email |
| source | string | Referrer ID or 'direct' |
| signup_date | string | ISO date of signup |
