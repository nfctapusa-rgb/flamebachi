# GoodTable × Flamebachi Owner CRM

This package keeps the existing Flamebachi customer website/menu and adds the owner operating workspace at `admin.flamebachi.com`.

## Owner workspace

- Overview / setup health
- Orders and order status
- Customer CRM
- Marketing consent audience
- Menu editing and availability
- Printer setup and local bridge instructions
- Stripe/Clover payment setup status
- Analytics
- Kiosk setup
- Restaurant settings

## Shared data flow

Customer website + kiosk → GoodTable order API → shared Flamebachi order store → owner dashboard / printer bridge / analytics.

The menu editor writes to the same menu store read by the public `/api/menu` endpoint.

## Development access

No PIN is required on `admin.flamebachi.com` while development mode is enabled. This is intentionally temporary.

## Production warning

This is a development/integration deployment. Before taking live restaurant payments, disable development owner access and configure production authentication, payment-provider onboarding, and printer security.
