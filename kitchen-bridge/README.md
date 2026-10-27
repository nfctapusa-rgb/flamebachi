# GoodTable Printer Bridge — Flamebachi

This small Windows program runs inside the restaurant and connects GoodTable cloud orders to a local ESC/POS thermal printer.

## One-time setup
1. Install Node.js on the Windows computer connected to the printer/network.
2. Copy `.env.example` to `.env`.
3. Set `FLAMEBACHI_API_URL=https://flamebachi.com`.
4. Set `KITCHEN_BRIDGE_TOKEN` to the Bridge Token generated in Admin → Printers.
5. Set `PRINTER_HOST` to the printer's local IP address and leave port `9100` unless the printer uses another ESC/POS TCP port.
6. Run `start-windows.bat`.
7. In Admin → Printers, add the same printer and request a test print.

The bridge polls GoodTable, prints new eligible orders, and acknowledges each print so the same order is not repeatedly printed. Keep `.env` private.
