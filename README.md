# BuildForge Backend

BuildForge Backend is the API server for the BuildForge project. It handles authentication, vehicle build records, and build item tracking.

The backend is built with **Node.js**, **Express**, **MongoDB**, **Mongoose**, and **JWT authentication**.

---

## About the Project

BuildForge is a car build tracker that lets users create vehicle builds and track the parts/items needed for each build.

Users can sign up, sign in, create builds, and manage items linked to those builds. Protected routes use JWT authentication so each user can only access their own data.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token / JWT
- bcrypt
- dotenv
- cors
- morgan
- nodemon

---

## Features

- User sign up
- User sign in
- Password hashing with bcrypt
- JWT-based authentication
- Protected routes
- Full CRUD for builds
- Full CRUD for build items
- Build items linked to specific builds
- User-owned data access

---

## Project Structure

```txt
BuildForge-Backend/
├── controllers/
│   ├── auth.routes.js
│   ├── build.routes.js
│   └── build.item.routes.js
│
├── middleware/
│   └── verify-token.js
│
├── models/
│   ├── User.js
│   ├── Build.js
│   └── BuildItem.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```


---

## Models

### User

Stores user account information.

| Field | Type | Notes |
|---|---|---|
| username | String | Required, unique |
| hashedPassword | String | Required, stored as a hashed password |

---

### Build

Stores the main vehicle build information.

| Field | Type | Notes |
|---|---|---|
| title | String | Required |
| make | String | Required |
| model | String | Required |
| year | Number | Required |
| engine | String | Required |
| goal | String | Required |
| status | String | Build progress status |
| budget | Number | Required |
| image | String | Optional |
| owner | ObjectId | Linked to User |

---

### BuildItem

Stores individual items or parts linked to a build.

| Field | Type | Notes |
|---|---|---|
| title | String | Required |
| category | String | Item category |
| status | String | Purchase status |
| cost | Number | Required |
| notes | String | Optional |
| owner | ObjectId | Linked to User |
| build | ObjectId | Linked to Build |

---

## Environment Variables

Create a `.env` file in the root of the backend project.

Use this structure:

```env
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here
```

## Installation

Install dependencies:

```bash
npm install
```

---

## Running the Server

Start the server normally:

```bash
npm start
```

Start the server in development mode:

```bash
npm run dev
```

## Authentication

Protected routes require a JWT token in the request headers.

Header format:

```txt
Authorization: Bearer your_token_here
```

After signing in, copy the returned token and use it when making requests to protected routes.

---

## API Routes

### Auth Routes

Base route:

```txt
/auth
```

| Method | Route | Protected | Description |
|---|---|---|---|
| POST | `/auth/sign-up` | No | Create a new user |
| POST | `/auth/sign-in` | No | Sign in and receive a JWT token |

#### Sign Up

```http
POST /auth/sign-up
```

Example request body:

```json
{
  "username": "testuser",
  "password": "password123"
}
```

Example response:

```json
{
  "user": {
    "_id": "user_id_here",
    "username": "testuser"
  }
}
```

---

#### Sign In

```http
POST /auth/sign-in
```

Example request body:

```json
{
  "username": "testuser",
  "password": "password123"
}
```

Example response:

```json
{
  "token": "jwt_token_here"
}
```

---

### Build Routes

Base route:

```txt
/build
```

All build routes are protected.

| Method | Route | Protected | Description |
|---|---|---|---|
| POST | `/build` | Yes | Create a build |
| GET | `/build` | Yes | Get all builds owned by the signed-in user |
| GET | `/build/:id` | Yes | Get one build owned by the signed-in user |
| PUT | `/build/:id` | Yes | Update a build |
| DELETE | `/build/:id` | Yes | Delete a build |

#### Create Build

```http
POST /build
```

Example request body:

```json
{
  "title": "Project Car Build",
  "make": "Toyota",
  "model": "Celica",
  "year": 1990,
  "engine": "3S-GE",
  "goal": "Street build",
  "status": "In progress",
  "budget": 3000,
  "image": "https://example.com/image.jpg"
}
```

---

#### Update Build

```http
PUT /build/:id
```

Example request body:

```json
{
  "title": "Updated Build Name",
  "make": "Toyota",
  "model": "Celica",
  "year": 1990,
  "engine": "3S-GE",
  "goal": "Track and street build",
  "status": "Complete",
  "budget": 4000,
  "image": "https://example.com/new-image.jpg"
}
```

---

### Build Item Routes

Base route:

```txt
/item
```

All item routes are protected.

| Method | Route | Protected | Description |
|---|---|---|---|
| POST | `/item` | Yes | Create a build item |
| GET | `/item` | Yes | Get all items owned by the signed-in user |
| GET | `/item/:id` | Yes | Get one item owned by the signed-in user |
| PUT | `/item/:id` | Yes | Update a build item |
| DELETE | `/item/:id` | Yes | Delete a build item |

#### Create Item

```http
POST /item
```

Example request body:

```json
{
  "title": "Fuel Pressure Regulator",
  "category": "Mechanical",
  "status": "Not purchased",
  "cost": 80,
  "notes": "Needed for fuel setup",
  "build": "build_id_here"
}
```

---

#### Update Item

```http
PUT /item/:id
```

Example request body:

```json
{
  "title": "Updated Item Name",
  "category": "Electrical",
  "status": "Purchased",
  "cost": 120,
  "notes": "Updated notes",
  "build": "build_id_here"
}
```

---

## Example Request Flow

1. Create an account using `/auth/sign-up`
2. Sign in using `/auth/sign-in`
3. Copy the returned JWT token
4. Add the token to the `Authorization` header
5. Create a build using `/build`
6. Create build items using `/item`
7. Link each item to a build using the build ID

---