# GoodTable Flamebachi Owner Workspace

## Owner access

`https://admin.flamebachi.com`

Development access is currently automatic on the admin hostname so the restaurant can be configured without a PIN. This is temporary. Before production, set `ADMIN_DEV_MODE=false` and replace it with real owner authentication.

## What is connected

- Customer website ordering → shared Flamebachi order store
- Kiosk ordering → same order store (`source=kiosk`)
- Owner order queue → same order store
- Customer CRM → checkout customer records
- Menu editor → same menu store used by `/api/menu`
- Analytics → calculated from order records
- Printer bridge → token + printer configuration + test jobs
- Stripe/Clover status → provider configuration area; no private keys belong in the browser

## Printer setup

1. Owner opens **Printers**.
2. Generate a bridge token.
3. On the restaurant Windows computer, copy `kitchen-bridge/.env.example` to `.env`.
4. Set `FLAMEBACHI_API_URL=https://flamebachi.com`.
5. Set `KITCHEN_BRIDGE_TOKEN` to the generated token.
6. Set `PRINTER_HOST` to the printer's LAN IP.
7. Set `PRINTER_PORT=9100` unless the printer uses another port.
8. Run `start-windows.bat`.
9. In the owner dashboard add the printer with the same IP/port.
10. Request **Test print**.
11. When the test prints, leave the bridge running. New qualifying orders are then printed automatically.

## Clover

The owner dashboard intentionally shows **Waiting for GoodTable Setup** until GoodTable completes the merchant authorization/connection. Never paste a Clover private API secret into the customer website or owner browser.

## Stripe

Stripe Connect should be configured by GoodTable using the restaurant's connected account onboarding. Do not place Stripe secret keys in browser code.
