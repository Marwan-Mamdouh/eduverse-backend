# Eduverse Backend

Simple Node + Express + TypeScript backend for a course platform. Provides authentication (JWT), user management, and courses CRUD.

## Features

- JWT authentication (access + refresh tokens)
- User signup/signin, logout, refresh token
- Watch-later list for users
- Courses CRUD (create, read, update, delete)
- Mongoose models and repositories
- Request logging and centralized error handler

## Quick links

- Entry point: `src/ts/index.ts`
- DB connector: `src/ts/db/db.ts`
- Auth router: `src/ts/auth/router.ts`
- User router: `src/ts/user/router.ts`
- Courses router: `src/ts/courses/router.ts`
- Logger middleware: `src/ts/middlewares/logger.ts`
- Authentication middleware: `src/ts/middlewares/auth.ts`
- Main service example: `src/ts/user/service.ts`
- Package scripts: `package.json`

## Postman collection

- Shared collection / documentation:  
  https://bold-crescent-678554.postman.co/workspace/courses~b6d9b2af-df93-421b-a48e-8c1261664d6c/request/38980431-a3385e11-247b-4794-9c09-8a83e9903775?action=share&creator=38980431&ctx=documentation

## Getting started

### 1. Install

```sh
npm install
```

### 2. Environment

Create a `.env` file in the project root with at least the following variables:

- `MONGO_URL` — MongoDB connection string
- `PORT` — (optional) server port, default typically `3000` or `4000`
- `JWT_SECRET` — secret for access tokens
- `JWT_REFRESH_SECRET` — secret for refresh tokens
- (optional) `JWT_EXPIRES_IN`, `JWT_REFRESH_EXPIRES_IN`

Example `.env`:

```env
MONGO_URL=mongodb://localhost:27017/eduverse
PORT=4000
JWT_SECRET=yourAccessSecret
JWT_REFRESH_SECRET=yourRefreshSecret
```

### 3. Run (development)

```sh
npm run dev
```

### Build & run (production)

```sh
npm run build
npm start
```

## Testing

If tests exist, run:

```sh
npm test
```

## API overview (examples)

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/signin`
- `POST /api/auth/refresh-token`
- `POST /api/auth/logout`

### Users

- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PUT /api/users/:id`
- `PATCH /api/users/watch-later`

### Courses

- `GET /api/courses`
- `GET /api/courses/:id`
- `POST /api/courses`
- `PUT /api/courses/:id`
- `DELETE /api/courses/:id`

## Notes

- Types and interfaces are located in `src/ts/interfaces.ts`.
- JWT helpers: `src/ts/utils/jwt.ts`.
- Adjust secrets and salts for production via environment variables or a secrets manager.
- Review router files for available request/response shapes and required auth.

## Contributing

- Open issues or PRs with clear descriptions.
- Follow existing code style and run lint/tests before submitting.

## License

Check `package.json` for licensing information or add a `LICENSE` file if needed.
and thank you
