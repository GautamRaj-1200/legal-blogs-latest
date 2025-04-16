## Improvement to be Done

- If I ever want to rate limit per user/email (rather than IP), I'd need a custom limiter (e.g., using Redis with a key like login_attempts:${email}).
- But for now, IP-based limits with express-rate-limit are a solid start.
