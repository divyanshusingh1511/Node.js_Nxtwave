# Player Match Scores REST API

A backend REST API built using **Node.js**, **Express.js**, and **SQLite** to manage cricket player statistics and match records. The application performs CRUD operations on players and retrieves player performance, match details, and aggregated statistics using relational database queries.

## Tech Stack

* Node.js
* Express.js
* SQLite
* JavaScript

## Database Schema

### Player Details Table

| Column      | Type    |
| ----------- | ------- |
| player_id   | INTEGER |
| player_name | TEXT    |

### Match Details Table

| Column   | Type    |
| -------- | ------- |
| match_id | INTEGER |
| match    | TEXT    |
| year     | INTEGER |

### Player Match Score Table

| Column          | Type    |
| --------------- | ------- |
| player_match_id | INTEGER |
| player_id       | INTEGER |
| match_id        | INTEGER |
| score           | INTEGER |
| fours           | INTEGER |
| sixes           | INTEGER |

---

# API Documentation

## API 1

**Path:** `/players/`

**Method:** `GET`

**Description:**

Returns a list of all players.

### Response

```json
[
  {
    "playerId": 1,
    "playerName": "Ram"
  },
  {
    "playerId": 2,
    "playerName": "Joseph"
  }
]
```

---

## API 2

**Path:** `/players/:playerId/`

**Method:** `GET`

**Description:**

Returns a specific player based on the player ID.

### Sample Request

```text
GET /players/2/
```

### Response

```json
{
  "playerId": 2,
  "playerName": "Joseph"
}
```

---

## API 3

**Path:** `/players/:playerId/`

**Method:** `PUT`

**Description:**

Updates the details of a specific player.

### Request

```json
{
  "playerName": "Raju"
}
```

### Response

```text
Player Details Updated
```

---

## API 4

**Path:** `/matches/:matchId/`

**Method:** `GET`

**Description:**

Returns the details of a specific match.

### Sample Request

```text
GET /matches/18/
```

### Response

```json
{
  "matchId": 18,
  "match": "RR vs SRH",
  "year": 2011
}
```

---

## API 5

**Path:** `/players/:playerId/matches`

**Method:** `GET`

**Description:**

Returns all matches played by a specific player.

### Sample Request

```text
GET /players/1/matches
```

### Response

```json
[
  {
    "matchId": 1,
    "match": "SRH vs MI",
    "year": 2016
  },
  {
    "matchId": 5,
    "match": "RCB vs KKR",
    "year": 2018
  }
]
```

---

## API 6

**Path:** `/matches/:matchId/players`

**Method:** `GET`

**Description:**

Returns all players who participated in a specific match.

### Sample Request

```text
GET /matches/1/players
```

### Response

```json
[
  {
    "playerId": 2,
    "playerName": "Joseph"
  },
  {
    "playerId": 4,
    "playerName": "Ram"
  }
]
```

---

## API 7

**Path:** `/players/:playerId/playerScores`

**Method:** `GET`

**Description:**

Returns the aggregated statistics of a specific player.

### Sample Request

```text
GET /players/1/playerScores
```

### Response

```json
{
  "playerId": 1,
  "playerName": "Ram",
  "totalScore": 3453,
  "totalFours": 342,
  "totalSixes": 98
}
```

---

# Project Structure

```text
.
├── app.js
├── app.http
├── cricketMatchDetails.db
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
* Worked with relational databases containing multiple tables
* Implemented SQL JOIN operations to retrieve related data
* Used aggregate SQL functions such as `SUM()` to calculate player statistics
* Implemented route parameters and request body handling
* Designed backend APIs for sports analytics and player performance tracking

---



---

# Author

**Divyanshu Singh**
