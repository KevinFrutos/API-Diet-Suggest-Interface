# API - TodoList

A RESTful API for managing user authentication and todo notes, built with Node.js, TypeScript, MongoDB, and Redis using Hexagonal Architecture.

---

## SETUP

### Prerequisites

* Node.js >= 18
* MongoDB instance (local or cloud)
* Redis instance (local or cloud)
* Sentry instance (local or cloud)
* GroqCloud account

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory and set the following:

```env
PORT=3000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
JWT_SECRET=your_jwt_secret
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password
GROQ_API_KEY=your_groq_api_key
SENTRY_DSN=your_sentry_dns
NODE_ENV=your_environment
```

### Run the App

```bash
npm run dev
```

Server will start at `http://localhost:PORT`

---

## Routes

### Auth

| Method | Endpoint                | Description         | Request Body                                               | Response Example                |
| ------ | ----------------------- | ------------------- |------------------------------------------------------------|---------------------------------|
| POST   | `/api/v1/auth/register` | Register new user   | `{ "email": "user@example.com", "password": "secret123" }` | `{ "token": "jwt_token_here" }` |
| POST   | `/api/v1/auth/login`    | Login existing user | `{ "email": "user@example.com", "password": "secret123" }` | `{ "token": "jwt_token_here" }` |

### Diet Suggestion

The `/diet` route require a Bearer token in the `Authorization` header.

| Method | Endpoint               | Description             | Request Body                      | Response Example                             |
| ------ |------------------------| ----------------------- |-----------------------------------|----------------------------------------------|
| POST   | `/api/v1/diet/suggest` | Suggest daily diet plan | `{ "text": "some user context" }` | `{ "suggest": "diet plan suggestion here" }` |

### User Attributes

All `/user/attributes` routes require a Bearer token in the `Authorization` header.

| Method | Endpoint                   | Description                   | Request Body                                                                                                                                                  | Response Example                                                                                                                                                                    |
| ------ | -------------------------- |-------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| POST   | `/api/v1/user/attributes`  | Create user attributes        | `{ "age": 18, "gender": "male", "weight": 57, "weightUnit": "kg", "height": 167, "heightUnit": "cm", "goals": "weight loss", "allergies": [] }`               | `{ "userAttributes": { "age": 18, "gender": "male", "weight": 57, "weightUnit": "kg", "height": 167, "heightUnit": "cm", "goals": "weight loss", "allergies": [] } }`               |
| PUT    | `/api/v1/user/attributes`  | Update user attributes        | `{ "age": 30, "gender": "male", "weight": 57, "weightUnit": "kg", "height": 167, "heightUnit": "cm", "goals": "Gain some muscle", "allergies": ["lactose"] }` | `{ "userAttributes": { "age": 30, "gender": "male", "weight": 57, "weightUnit": "kg", "height": 167, "heightUnit": "cm", "goals": "Gain some muscle", "allergies": ["lactose"] } }` |
| GET    | `/api/v1/user/attributes`  | Get user attributes by userId | *None* (uses token for user ID)                                                                                                                               | `{ "userAttributes": { "age": 30, "gender": "male", "weight": 57, "weightUnit": "kg", "height": 167, "heightUnit": "cm", "goals": "Gain some muscle", "allergies": ["lactose"] } }` |

---

## Testing

```bash
npm run test
```

---

## License

MIT
