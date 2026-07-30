# Cricket Team Management REST API

A backend REST API built using **Node.js**, **Express.js**, and **SQLite** to manage a cricket team's player information. The application performs CRUD operations on player records stored in a SQLite database.

## Tech Stack

* Node.js
* Express.js
* SQLite
* JavaScript

## Database Schema

### Cricket Team Table

| Column        | Type    |
| ------------- | ------- |
| player_id     | INTEGER |
| player_name   | TEXT    |
| jersey_number | INTEGER |
| role          | TEXT    |

---

# API Documentation

## API 1

**Path:** `/players/`

**Method:** `GET`

**Description:**

Returns a list of all players in the cricket team.

### Response

```json
[
  {
    "playerId": 1,
    "playerName": "Lakshman",
    "jerseyNumber": 5,
    "role": "All-rounder"
  },
  {
    "playerId": 2,
    "playerName": "Rahul",
    "jerseyNumber": 18,
    "role": "Batsman"
  }
]
```

---

## API 2

**Path:** `/players/`

**Method:** `POST`

**Description:**

Creates a new player in the cricket team. The `player_id` is auto-generated.

### Request

```json
{
  "playerName": "Vishal",
  "jerseyNumber": 17,
  "role": "Bowler"
}
```

### Response

```text
Player Added to Team
```

---

## API 3

**Path:** `/players/:playerId/`

**Method:** `GET`

**Description:**

Returns the details of a player based on the player ID.

### Sample Request

```text
GET /players/1/
```

### Response

```json
{
  "playerId": 1,
  "playerName": "Lakshman",
  "jerseyNumber": 5,
  "role": "All-rounder"
}
```

---

## API 4

**Path:** `/players/:playerId/`

**Method:** `PUT`

**Description:**

Updates the details of a player based on the player ID.

### Request

```json
{
  "playerName": "Maneesh",
  "jerseyNumber": 54,
  "role": "All-rounder"
}
```

### Response

```text
Player Details Updated
```

---

## API 5

**Path:** `/players/:playerId/`

**Method:** `DELETE`

**Description:**

Deletes a player from the cricket team based on the player ID.

### Sample Request

```text
DELETE /players/1/
```

### Response

```text
Player Removed
```

---

# Project Structure

```text
.
├── app.js
├── app.http
├── cricketTeam.db
├── package.json
├── package-lock.json
└── README.md
```

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm start
```

The server starts at:

```text
http://localhost:3000/
```

---

# Learning Outcomes

* Developed RESTful APIs using Express.js
* Performed CRUD operations with SQLite
* Implemented route parameters and request body handling
* Executed SQL queries (`SELECT`, `INSERT`, `UPDATE`, `DELETE`)
* Built backend APIs for managing sports team data
* Followed REST API design principles using Node.js and Express.js

---

# Future Enhancements

* JWT Authentication
* Input Validation
* Search and Filtering
* Pagination Support
* Docker Containerization
* AWS Cloud Deployment
* Swagger API Documentation
* Unit Testing with Jest

---

# Author

**Divyanshu Singh**
