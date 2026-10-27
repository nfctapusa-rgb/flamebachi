# FLAMEBACHI — START HERE

This is the first backend setup for Flamebachi. **You do not need to understand code to follow the setup.**

## What you are setting up

- Customer website: `https://flamebachi.com`
- Owner dashboard: `https://admin.flamebachi.com`
- Kitchen screen: `https://kitchen.flamebachi.com`
- Kitchen printer: connected at the restaurant
- Orders: website + future kiosk use the same order system
- Receipts: email + text (after provider credentials are added)
- Analytics: cash/card sales and order counts

## IMPORTANT: Do these in this order

### STEP 1 — Deploy the main site
Upload this project to the Flamebachi Netlify site.

Do not create a second Netlify site for the backend. The customer site, owner dashboard, and kitchen screen are part of the same application.

### STEP 2 — Add the owner login settings
In Netlify → Site configuration → Environment variables, add:

- `ADMIN_EMAIL` = the owner's login email
- `ADMIN_PASSWORD_SHA256` = password hash (instructions in OWNER-SETUP.md)
- `ADMIN_SESSION_SECRET` = a long random secret
- `KITCHEN_BRIDGE_TOKEN` = a long random token

### STEP 3 — Add the owner subdomain
In Netlify → Domain management, add:

`admin.flamebachi.com`

DNS:

`CNAME  admin  flamebachi.netlify.app`

### STEP 4 — Test the owner dashboard
Open:

`https://admin.flamebachi.com`

Sign in with the owner email/password you configured.

Confirm you can see:

- Current orders
- Past orders
- Analytics
- Restaurant settings
- Photos

### STEP 5 — Set up the kitchen tablet/computer
Open:

`https://kitchen.flamebachi.com`

Keep this screen open in the kitchen. It is the live order board.

### STEP 6 — Connect the kitchen printer
Follow **KITCHEN-PRINTER-SETUP.md**. The restaurant only has to do this once.

After pairing, every new website/kiosk order can print automatically.

### STEP 7 — Test before going live
Place one test order from the website.

Confirm:

1. Order gets an order number.
2. Order appears in Owner → Current Orders.
3. Order appears on Kitchen.
4. Kitchen printer prints the kitchen ticket.
5. Owner can change the order status.
6. Cash order is not counted as paid sales until marked paid.
7. Customer receipt screen appears.

## What we are NOT turning on yet

- Live card payments
- Clover
- Full kiosk/browser lock
- Advanced multi-printer routing

Those plug into the same order system later.

## Simple rule

**Customer orders → GoodTable backend → Owner + Kitchen + Printer.**

The kiosk will use the exact same backend later, so we do not rebuild the order system.

## Receipt setup
For email receipts, add `RESEND_API_KEY` and `RECEIPT_FROM_EMAIL` in Netlify. For text receipts, add the Twilio variables listed in `.env.example`. The receipt email already includes **Order Again** and **Leave a Google Review** buttons.
