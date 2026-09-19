# MikroTik AI Manager

## Deploy to Render

1. Push this repo to GitHub.
2. Open Render -> New -> Blueprint.
3. Select this repository.
4. Render reads `render.yaml` automatically.

### Required env vars
- `JWT_SECRET`
- `MIKROTIK_URL`
- `MIKROTIK_USER`
- `MIKROTIK_PASSWORD`

If `MIKROTIK_URL` is empty, the app runs in demo mode.

## Run locally

```bash
npm install
cp .env.example .env
npm start
```

Then open:
- http://localhost:3000

## Run with Docker

```bash
docker build -t mikrotik-ai-manager .
docker run --rm -p 3000:3000 --env-file .env mikrotik-ai-manager
```

## Health check

```bash
curl http://localhost:3000/api/health
```
