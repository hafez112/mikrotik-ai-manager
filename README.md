# MikroTik AI Manager on Render

## Deploy

1. Push this repo to GitHub.
2. In Render, choose New -> Blueprint.
3. Select this repository.
4. Render will read `render.yaml` and create the web service automatically.

## Required environment variables

Set these in Render dashboard:

- `JWT_SECRET` — any strong random value
- `MIKROTIK_URL` — RouterOS base URL, e.g. `https://203.0.113.10`
- `MIKROTIK_USER` — RouterOS admin username
- `MIKROTIK_PASSWORD` — RouterOS password

## Important

- If `MIKROTIK_URL` is empty, the app runs in demo mode.
- Render services must listen on `0.0.0.0`, not just localhost.
- For production, use HTTPS/VPN and a secure backend.
