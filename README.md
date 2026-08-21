# A11 Freight

## Quote email setup

The booking form sends quote requests to `/api/quote-resend.php`. The browser never receives the Resend API key, and the customer's email is used as the email's Reply-To address.

For Hostinger-style PHP hosting, copy `quote-config.example.php` to `quote-config.php`, enter the real Resend API key, and upload that private configuration one directory above `public_html`. Upload the contents of `dist` to `public_html`; the build includes `dist/api/quote-resend.php`. The `a11freight.com` sender domain must be verified in Resend.

For local development, copy `.env.example` to `.env.local`, enter the server-side values, and run `npm run dev`. Vite maps the PHP route to the local Node handler. Never commit `.env.local`, `quote-config.php`, or a real API key.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
