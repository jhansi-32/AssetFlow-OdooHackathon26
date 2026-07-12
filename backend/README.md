# AssetFlow — Backend Foundation

Enterprise Asset & Resource Management System — backend foundation only (Odoo Hackathon).
Business modules (Departments, Categories, Assets, Allocations, Bookings, Maintenance, Audits,
Reports, Notifications) are **not** implemented yet — this is the auth/RBAC/infra layer they'll
be built on top of module by module.

## Stack

Node.js · Express · TypeScript · MongoDB · Prisma · JWT · bcrypt · Zod · Helmet · Morgan ·
Multer · Nodemailer · node-cron · Swagger

## What's included

- Clean Architecture layering: `controllers → services → repositories`
- JWT access + refresh token auth (refresh tokens stored & revocable in DB)
- Signup creates an Employee account only — no self-assigned roles (matches problem statement)
- RBAC middleware (`authorize(...roles)`) ready for Admin / Asset Manager / Department Head / Employee
- Forgot/reset password flow (token-based, emailed via Nodemailer)
- Centralized error handling with typed `AppError` subclasses
- Standard response envelope: `{ success, message, data, errors, timestamp }`
- Zod validation middleware for body/params/query
- Pagination/sort/filter helper, file upload helper (Multer), email helper
- Winston logging (console + file) + Morgan request logging
- Activity log table + helper (business modules will write into it later)
- Swagger/OpenAPI docs at `/api-docs`
- node-cron scheduler bootstrap (empty — jobs get registered per module)
- Rate limiting (global + stricter auth-endpoint limiter)

## Setup

MongoDB via Prisma **requires a replica set** — even a single-node local one — because Prisma
uses transactions (`$transaction`) internally. Easiest options:

- **MongoDB Atlas** (free tier) — already a replica set, just copy the connection string. No local setup.
- **Local via Docker** — run a single-node replica set:
  ```bash
  docker run -d --name assetflow-mongo -p 27017:27017 mongo:7 --replSet rs0
  docker exec -it assetflow-mongo mongosh --eval "rs.initiate()"
  ```
  Then use `DATABASE_URL=mongodb://localhost:27017/assetflow?replicaSet=rs0`

```bash
npm install
cp .env.example .env        # fill in DATABASE_URL (Atlas or local replica set), JWT secrets, SMTP, etc.

npx prisma generate
npx prisma db push          # Mongo has no migrations — this syncs the schema/indexes directly

npm run seed                # creates admin@assetflow.com / Admin@123

npm run dev                 # starts on http://localhost:5000
```

Swagger docs: `http://localhost:5000/api-docs`
Health check: `GET http://localhost:5000/api/v1/health`

## Auth flow

1. `POST /api/v1/auth/signup` — creates an Employee (no role field accepted)
2. `POST /api/v1/auth/login` — returns `{ user, tokens: { accessToken, refreshToken } }`
3. `POST /api/v1/auth/refresh` — rotates the refresh token, returns a new pair
4. `POST /api/v1/auth/logout` — revokes the given refresh token
5. `GET /api/v1/auth/me` — requires `Authorization: Bearer <accessToken>`
6. `POST /api/v1/auth/forgot-password` / `POST /api/v1/auth/reset-password`

Role promotion (Employee → Department Head / Asset Manager) is **not** exposed yet — per the
problem statement it belongs in the Admin's Employee Directory screen, which is a future module.
`userRepository.updateRole()` already exists for that module to call into.

## Project structure

```
src/
  config/        env, database (Prisma client), swagger
  constants/     roles, http status, error codes
  controllers/   thin HTTP handlers
  services/      business logic
  repositories/  Prisma data access
  routes/        Express routers + Swagger JSDoc
  middlewares/   auth, rbac, validation, error, rate limit, logging
  validators/    Zod schemas
  dto/           request/response shapes
  interfaces/    shared TS interfaces
  utils/         response envelope, logger, jwt, password, pagination, upload, email, activity log
  jobs/          node-cron bootstrap
prisma/
  schema.prisma  User, Department (stub), RefreshToken, PasswordResetToken, ActivityLog
  seed.ts        creates a default Admin
```

## Extending with the next module

1. Add models to `prisma/schema.prisma`, run `npx prisma db push`
2. Add a repository under `repositories/`
3. Add a service under `services/` (call `logActivity` on state changes)
4. Add Zod schemas under `validators/`
5. Add a controller + router, mount it in `routes/index.ts`
6. Protect routes with `authenticate` + `authorize(...)`
