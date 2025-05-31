# Auth Routes

This document describes the authentication-related API routes available in `authRouter.js` and `captainAuthRouter.js`.

---

## User Auth Routes

### POST `/register`

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

### POST `/login`

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

### POST `/logout`

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

### GET `/profile`

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

---

## Captain Auth Routes

All routes are prefixed with `/captain`.

### POST `/captain/register`

**Description:** Register a new captain.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string (min 6 chars)",
  "status": "active|inactive",
  "vehicle": {
    "model": "string",
    "color": "string",
    "plate": "string",
    "vehicleType": "car|bike|truck"
  }
}
```

**Response:**
- **201 Created**
  ```json
  {
    "message": "Captain registered Successfully",
    "captain": {
      "id": "string",
      "name": "string",
      "email": "string",
      "status": "active|inactive",
      "vehicle": {
        "model": "string",
        "color": "string",
        "plate": "string",
        "vehicleType": "car|bike|truck"
      }
    },
    "token": "jwt_token"
  }
  ```
- **400 Bad Request**
  ```json
  {
    "message": "Captain already exists"
  }
  ```

---

### POST `/captain/login`

**Description:** Log in an existing captain.

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
    "captain": {
      "id": "string",
      "name": "string",
      "email": "string",
      "status": "active|inactive",
      "vehicle": {
        "model": "string",
        "color": "string",
        "plate": "string",
        "vehicleType": "car|bike|truck"
      }
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

### POST `/captain/logout`

**Description:** Log out the current captain.

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

### GET `/captain/profile`

**Description:** Get the authenticated captain's profile.

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
    "status": "active|inactive",
    "vehicle": {
      "model": "string",
      "color": "string",
      "plate": "string",
      "vehicleType": "car|bike|truck"
    },
    "location": {
      "lat": "number",
      "lng": "number"
    },
    "createdAt": "date"
  }
  ```
- **401/404/500**
  ```json
  {
    "message": "Captain not found"
  }
  ```

---

**Note:**  
All responses are in JSON format.  
See `controllers/authController.js` and `controllers/captainAuthController.js` for implementation details.


