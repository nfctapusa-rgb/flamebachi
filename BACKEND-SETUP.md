
This package turns the current Netlify order flow into the first real operating backend.

## What is included

- `admin.flamebachi.com` owner dashboard (served from `/admin/` on the same Netlify site)
- Owner login with signed HttpOnly session cookie
- Current orders and past orders
- Cash order workflow: Cash Pending → Paid → Preparing → Ready → Completed
- Card-ready workflow: Stripe `PAID` orders can move through the same kitchen workflow
- Sales analytics: total / cash / card / order count / daily sales
- Customer list in owner dashboard
- Restaurant settings editor
- Owner photo library (Netlify Blobs)
- Kitchen printer bridge for common network ESC/POS printers on port 9100
- Email receipts via Resend
- SMS receipts via Twilio
- Receipt sending now works for cash orders as well as paid orders

## Netlify environment variables

Set these in the main Flamebachi Netlify site:

- `ADMIN_EMAIL` — owner login email
- `ADMIN_PASSWORD_SHA256` — SHA-256 hex hash of the owner password
- `ADMIN_SESSION_SECRET` — long random secret (32+ random bytes recommended)
- `KITCHEN_BRIDGE_TOKEN` — long random token shared with the kitchen bridge
- `RESEND_API_KEY` — required for real email receipts
- `RECEIPT_FROM_EMAIL` — verified sender, e.g. `Flamebachi <receipts@flamebachi.com>`
- `TWILIO_ACCOUNT_SID` — required for SMS receipts
- `TWILIO_AUTH_TOKEN` — required for SMS receipts
- `TWILIO_FROM_NUMBER` — verified Twilio sending number

Stripe variables from the existing payment build can remain in place for the future card rollout.

### Generate the owner password hash

PowerShell:

```powershell
[Convert]::ToHexString([Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes('YOUR_PASSWORD'))).ToLower()
```

Generate a strong session secret/token rather than using a normal password.

## admin.flamebachi.com DNS

Point the subdomain to the same Netlify site:

```text
CNAME  admin  flamebachi.netlify.app
```

Then add `admin.flamebachi.com` as a custom domain in the Flamebachi Netlify site and let Netlify issue HTTPS.

## Kitchen printer

The bridge is in `kitchen-bridge/`.

It polls the Netlify API for new orders, prints a simple ESC/POS kitchen ticket, then marks the order as printed.

Environment variables on the kitchen computer:

```text
FLAMEBACHI_API_URL=https://flamebachi.com
KITCHEN_BRIDGE_TOKEN=the_same_token_as_Netlify
PRINTER_HOST=192.168.1.100
PRINTER_PORT=9100
POLL_MS=3000
```

This is designed for a network thermal printer that accepts raw TCP/9100. If the client's printer is USB-only, use a small Windows/Raspberry Pi print bridge or the printer manufacturer's network utility rather than trying to print directly from Netlify's cloud functions.

## Important production behavior

Cash orders do not count as revenue in analytics until the owner presses **Mark cash paid**. Card orders count once their status is `PAID` and remain in sales through preparation/completion.

The owner dashboard is intentionally separate from the customer ordering UI. Customer-facing menu/order changes should not require opening the owner dashboard.

## Next backend phase

1. Connect the exact kitchen printer model.
2. Add order sound/desktop kitchen display and auto-refresh.
3. Add card checkout back through the GoodTable/Stripe provider layer.
4. Wire published photo/settings records into the homepage/menu instead of only storing them.
5. Add owner roles and audit history.
6. Add daily/weekly/monthly export and more detailed analytics.
