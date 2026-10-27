# Admin access

The owner workspace is served at `https://admin.flamebachi.com` from the same Netlify project as the public Flamebachi website.

For development, the admin hostname receives a temporary owner session automatically. No PIN is required right now.

Before production:

1. Set `ADMIN_DEV_MODE=false` in Netlify environment variables.
2. Replace development access with real owner authentication.
3. Use restaurant-scoped roles and secure sessions.
4. Never put payment-provider secrets in frontend code.
