# Portfolio (Next.js)

Personal portfolio built with Next.js App Router, Tailwind CSS, and TypeScript.

## Local development

1. Install dependencies:

```bash
npm install
```

2. Create local environment file:

```bash
cp .env.example .env.local
```

3. Start dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Deployment

### Option 1: Vercel (recommended)

1. Push this repo to GitHub.
2. Import the project in Vercel.
3. Framework preset: `Next.js` (auto-detected).
4. Add environment variables from `.env.example`.
5. Deploy.

### Option 2: Self-host / VPS

This project uses `output: "standalone"` in Next config.

1. Build the app:

```bash
npm run build
```

2. Run production server:

```bash
npm run start
```

Set `NODE_ENV=production` and use a process manager like `pm2` for uptime.
