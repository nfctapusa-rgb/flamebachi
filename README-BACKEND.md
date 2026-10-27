# Flamebachi Home v1

This package is for the main/home website only.

Verified photo mappings used:
- NY Steak & Lobster -> menu-steak-lobster.jpg
- Salmon & Shrimp -> menu-salmon-shrimp.jpg
- NY Steak & Chicken -> menu-steak-chicken.jpg
- NY Steak, Chicken & Shrimp -> menu-steak-chicken-shrimp.jpg
- Chicken Bowl -> menu-chicken-bowl.jpg
- Steak & Garlic Noodles -> food-6.jpg
- Aguas Frescas -> menu-aguas-frescas.jpg

No uncertain product photos were assigned to named dishes.

Current order CTA points to the existing ChowNow locations URL and can be replaced when the separate online-ordering package is ready.

Social URLs are included as likely Flamebachi handles but should be verified before launch.


## v2 update
The main navigation and hero CTA now use **View Menu** / **View the Menu** and route directly to `https://friendly-biscochitos-21347e.netlify.app/online-menu`. Kiosk, owner dashboard, and payment backend remain separate.

## Stripe Live Checkout

This unified package keeps the Flamebachi homepage at `/` and the online ordering experience at `/online-menu/`.

The online menu now uses Stripe-hosted Checkout in **Stripe Live mode**:
- Server creates the order and calculates the amount.
- Server creates a Stripe Checkout Session.
- Payment uses the configured Stripe Connect connected account.
- GoodTable takes `GOODTABLE_FEE_PERCENT` as an application fee.
- The customer is redirected back to `/online-menu/` with the order number.
- The return page verifies the Stripe Checkout Session server-to-server before showing **Order Confirmed**.
- A Stripe webhook endpoint is also included for durable asynchronous confirmation.
- Email/SMS receipt delivery is intentionally deferred; the confirmation screen currently offers **No receipt** and labels email delivery as coming next.

### Live environment variables

Set these in Netlify:

```text
STRIPE_SECRET_KEY=sk_live_REPLACE_IN_NETLIFY
STRIPE_CONNECTED_ACCOUNT_ID=acct_1UNlQsDfr8feECWD
GOODTABLE_FEE_PERCENT=1
PUBLIC_SITE_URL=https://YOUR-NETLIFY-SITE.netlify.app
STRIPE_WEBHOOK_SECRET=whsec_...
```

For the current live demo, use connected account `acct_1UNlQsDfr8feECWD`.

**Important:** this build is prepared for the live Stripe demo. Set `STRIPE_SECRET_KEY` in Netlify to your current `sk_live_...` secret. Never commit the real secret key to the project.

### Stripe webhook

After deployment, create a Stripe webhook endpoint pointing to:

```text
https://YOUR-NETLIFY-SITE.netlify.app/api/stripe/webhook
```

Subscribe to:
- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`

Copy the endpoint signing secret into the Netlify `STRIPE_WEBHOOK_SECRET` variable.

### Test payment

Use Stripe's standard test card:

```text
4242 4242 4242 4242
```

Use any future expiration date, any CVC, and any ZIP code.

### Payment model

The Checkout Session uses a destination charge:
- Customer pays through Stripe Checkout.
- Flamebachi's connected Stripe account is the destination.
- GoodTable receives the configured application fee.
- Stripe processing fees remain subject to the Connect charge configuration.

No raw card data is stored by this application.



## Live Stripe setup
The live connected account is configured by environment variable:
`STRIPE_CONNECTED_ACCOUNT_ID=acct_1UNlQsDfr8feECWD`

For security, the live Stripe secret key is intentionally NOT bundled in this ZIP. Add it in Netlify as the secret environment variable `STRIPE_SECRET_KEY` using your current `sk_live_...` key.

Homepage buttons including Menu and Order Now now route to `/online-menu/`. The homepage Aguas Frescas highlight card has been removed.


## Current payment architecture
- Checkout stays inside Flamebachi using Stripe.js + Payment Element.
- Orders are priced and taxed server-side before Stripe creates the PaymentIntent.
- Payments are created as direct charges on the configured Stripe Connect connected account.
- `GOODTABLE_FEE_PERCENT` controls the GoodTable application fee (default 1%).
- `STRIPE_PUBLISHABLE_KEY` is required in Netlify as a non-secret `pk_live_...` variable.
- `STRIPE_SECRET_KEY` remains server-only.
- Automatic payment methods are enabled so Stripe can surface eligible methods such as card and Link in the embedded element.
- `STRIPE_WEBHOOK_SECRET` is recommended for production so PaymentIntent events can mark orders paid even if the customer closes the page.
- The confirmation screen remains on-site and supports email/text receipt preference capture. Actual SMS delivery requires an SMS provider connection.

## Current tax rates
- Downtown LA: 10.250%
- Jurupa Valley: 7.750%
Rates are server-authoritative for this prototype and should be replaced with address-based tax calculation before expanding to additional locations.
