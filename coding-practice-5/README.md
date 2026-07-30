# Movies Management REST API

A backend REST API built using **Node.js**, **Express.js**, and **SQLite** to manage movies and directors. The application performs CRUD operations on movie records and provides APIs to retrieve director information and the movies directed by them.

## Tech Stack

* Node.js
* Express.js
* SQLite
* JavaScript

## Database Schema

### Movie Table

| Column      | Type    |
| ----------- | ------- |
| movie_id    | INTEGER |
| director_id | INTEGER |
| movie_name  | TEXT    |
| lead_actor  | TEXT    |

### Director Table

| Column        | Type    |
| ------------- | ------- |
| director_id   | INTEGER |
| director_name | TEXT    |

---

# API Documentation

## API 1

**Path:** `/movies/`

**Method:** `GET`

**Description:**

Returns a list of all movie names in the movie table.

### Response

```json
[
  {
    "movieName": "Captain America: The First Avenger"
  },
  {
    "movieName": "Jurassic Park"
  }
]
```

---

## API 2

**Path:** `/movies/`

**Method:** `POST`

**Description:**

Creates a new movie in the movie table. The `movie_id` is auto-generated.

### Request

```json
{
  "directorId": 6,
  "movieName": "Jurassic Park",
  "leadActor": "Jeff Goldblum"
}
```

### Response

```text
Movie Successfully Added
```

---

## API 3

**Path:** `/movies/:movieId/`

**Method:** `GET`

**Description:**

Returns a movie based on the movie ID.

### Sample Request

```text
GET /movies/12/
```

### Response

```json
{
  "movieId": 12,
  "directorId": 3,
  "movieName": "The Lord of the Rings",
  "leadActor": "Elijah Wood"
}
```

---

## API 4

**Path:** `/movies/:movieId/`

**Method:** `PUT`

**Description:**

Updates the details of a movie based on the movie ID.

### Request

```json
{
  "directorId": 24,
  "movieName": "Thor",
  "leadActor": "Christopher Hemsworth"
}
```

### Response

```text
Movie Details Updated
```

---

## API 5

**Path:** `/movies/:movieId/`

**Method:** `DELETE`

**Description:**

Deletes a movie from the movie table based on the movie ID.

### Sample Request

```text
DELETE /movies/12/
```

### Response

```text
Movie Removed
```

---

## API 6

**Path:** `/directors/`

**Method:** `GET`

**Description:**

Returns a list of all directors in the director table.

### Response

```json
[
  {
    "directorId": 1,
    "directorName": "Joe Johnston"
  },
  {
    "directorId": 2,
    "directorName": "Anthony Russo"
  }
]
```

---

## API 7

**Path:** `/directors/:directorId/movies/`

**Method:** `GET`

**Description:**

Returns a list of all movie names directed by a specific director.

### Sample Request

```text
GET /directors/1/movies/
```

### Response

```json
[
  {
    "movieName": "Captain Marvel"
  },
  {
    "movieName": "Captain America: The First Avenger"
  }
]
```

---

# Project Structure

```text
.
├── app.js
├── app.http
├── moviesData.db
├── package.json
├── package-lock.json
└── README.md
```

---

# Installation

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
* Worked with relational database tables
* Implemented route parameters and request body handling
* Executed SQL queries (`SELECT`, `INSERT`, `UPDATE`, `DELETE`)
* Built APIs to retrieve related data using foreign-key relationships

---



# Author

**Divyanshu Singh**
