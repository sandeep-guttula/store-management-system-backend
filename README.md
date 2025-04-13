# 🏪 Store Rating Platform API

A backend system built with **Node.js**, **Express**, **PostgreSQL**, **Prisma**, and **TypeScript** that allows users to rate stores, while providing role-based access for admins and store owners.

---

## 🚀 Tech Stack

| Tech               | Description                                       |
|--------------------|---------------------------------------------------|
| Node.js + Express  | Backend API framework                             |
| TypeScript         | Strong typing and dev experience                  |
| PostgreSQL         | Relational database                               |
| Prisma             | Type-safe ORM                                     |
| Zod                | Schema validation                                 |
| Bcrypt             | Secure password hashing                           |
| JWT                | Authentication using JSON Web Tokens              |
| Render             | Deployment platform                               |

---

## 🔐 Authentication & Authorization

- Auth is done using **JWT**, stored as **HTTP-only cookies**
- Role-based access control with 3 roles:
  - `ADMIN`
  - `STORE_OWNER`
  - `USER`

---

## 📦 Dependencies

| Package             | Use                                                                 |
|----------------------|----------------------------------------------------------------------|
| `express`           | Web framework                                                        |
| `prisma` / `@prisma/client` | ORM for DB modeling and querying                               |
| `jsonwebtoken`      | Token-based authentication                                           |
| `bcrypt`            | Secure password hashing                                              |
| `zod`               | Input validation for routes                                          |
| `cookie-parser`     | Middleware to parse cookies                                          |
| `dotenv`            | Load environment variables                                           |
| `ts-node-dev`       | TypeScript hot-reloading during development                         |

Dev dependencies:
- `typescript`, `ts-node`, `@types/express`, `@types/jsonwebtoken`, `@types/bcrypt`, etc.

---

## 📁 Project Structure


---

## 🔗 API Routes

### 📌 Auth (`/api/auth`)
| Method | Route           | Access | Description              |
|--------|------------------|--------|--------------------------|
| POST   | `/signup`        | Public | Register new user        |
| POST   | `/login`         | Public | Login and set cookie     |

---

### 👤 Users (`/api/users`)
| Method | Route           | Access       | Description                |
|--------|-------------------|--------------|----------------------------|
| GET    | `/me`             | Authenticated | Get current user           |
| GET    | `/`               | Admin         | List all users             |
| GET    | `/:id`            | Admin         | Get user by ID             |
| PUT    | `/:id`            | Admin/User    | Update user                |
| DELETE | `/:id`            | Admin         | Delete user                |
| POST   | `/change-password`| Authenticated | Change Password            |
| POST   | `/`               | Admin         | Add User               |


---

### 🏬 Stores (`/api/stores`)
| Method | Route           | Access       | Description                        |
|--------|------------------|--------------|------------------------------------|
| POST   | `/`              | Admin         | Create store                       |
| GET    | `/`              | Public        | List all stores (w/ avg rating)    |
| GET    | `/:id`           | Public        | View a store                       |
| PUT    | `/:id`           | Admin/Owner   | Update store                       |
| DELETE | `/:id`           | Admin         | Delete store                       |

---

### ⭐ Ratings (`/api/ratings`)
| Method | Route                   | Access     | Description                          |
|--------|--------------------------|------------|--------------------------------------|
| POST   | `/`                      | User       | Submit a rating for a store          |
| PUT    | `/:id`                   | User       | Update your rating                   |
| GET    | `/store/:storeId`       | Admin/Owner| Get ratings for a specific store     |

---

## 🔐 Authentication & Roles

- Login/signup using **JWT stored in HTTP-only cookies**
- Roles:
  - `ADMIN`: Manage users & stores
  - `STORE_OWNER`: View ratings for owned stores
  - `USER`: Submit & update ratings

---

## ⚙️ Environment Variables

Create a `.env` file at the root with the following:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/storerating
JWT_SECRET=supersecretjwt
PORT=3000

