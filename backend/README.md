# Auth Routes

This document describes the authentication-related API routes available in `authRouter.js`.

---

## POST `/register`

**Description:** Register a new user.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string (min 6 chars)"
}
```

**Response:**
- **201 Created**
  ```json
  {
    "message": "User registered Successfully",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string"
    },
    "token": "jwt_token"
  }
  ```
- **400 Bad Request**
  ```json
  {
    "message": "User already exists"
  }
  ```

---

## POST `/login`

**Description:** Log in an existing user.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
- **200 OK**
  ```json
  {
    "message": "Login successful",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string"
    },
    "token": "jwt_token"
  }
  ```
- **400/401/404**
  ```json
  {
    "message": "Invalid credentials"
  }
  ```

---

## POST `/logout`

**Description:** Log out the current user.

**Request:**  
Requires authentication cookie (`token`).

**Response:**
- **200 OK**
  ```json
  {
    "message": "Logout successful"
  }
  ```
- **400 Bad Request**
  ```json
  {
    "message": "No token found"
  }
  ```

---

## GET `/profile`

**Description:** Get the authenticated user's profile.

**Request:**  
Requires authentication via cookie or `Authorization: Bearer <token>` header.

**Response:**
- **200 OK**
  ```json
  {
    "_id": "string",
    "name": "string",
    "email": "string",
    "socketId": "string|null",
    "createdAt": "date"
  }
  ```
- **401/404/500**
  ```json
  {
    "message": "User not found"
  }
  ```


