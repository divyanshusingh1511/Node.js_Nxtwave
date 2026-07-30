# Todo Management REST API

A backend REST API built using **Node.js**, **Express.js**, and **SQLite** to manage daily tasks (todos). The application supports creating, retrieving, updating, deleting, searching, and filtering todo items through RESTful API endpoints.

## Features

* Create a new todo
* Retrieve all todos
* Retrieve a specific todo by ID
* Update an existing todo
* Delete a todo
* Filter todos by **status**
* Filter todos by **priority**
* Search todos using keywords
* Store data using **SQLite**

## Tech Stack

* Node.js
* Express.js
* SQLite
* JavaScript

## Project Structure

```text
.
├── app.js
├── package.json
├── todoApplication.db
├── app.http
└── README.md
```

## API Endpoints

| Method | Endpoint                                   | Description                   |
| ------ | ------------------------------------------ | ----------------------------- |
| GET    | `/todos/`                                  | Get all todos                 |
| GET    | `/todos/?status=TO DO`                     | Filter todos by status        |
| GET    | `/todos/?priority=HIGH`                    | Filter todos by priority      |
| GET    | `/todos/?priority=HIGH&status=IN PROGRESS` | Filter by priority and status |
| GET    | `/todos/?search_q=Play`                    | Search todos by keyword       |
| GET    | `/todos/:todoId/`                          | Get a specific todo           |
| POST   | `/todos/`                                  | Create a new todo             |
| PUT    | `/todos/:todoId/`                          | Update a todo                 |
| DELETE | `/todos/:todoId/`                          | Delete a todo                 |

## Getting Started


### Install dependencies

```bash
npm install
```

### Start the server

```bash
npm start
```

The server will run at:

```text
http://localhost:3000/
```

## Sample Request

**Create a Todo**

```http
POST /todos/
Content-Type: application/json

{
  "id": 10,
  "todo": "Finalize event theme",
  "priority": "LOW",
  "status": "TO DO"
}
```

## Learning Outcomes

This project helped me learn:

* REST API development using Express.js
* CRUD operations
* SQLite database integration
* SQL queries (`SELECT`, `INSERT`, `UPDATE`, `DELETE`)
* Route parameters and query parameters
* Request body handling
* Backend project structure in Node.js

## Future Improvements

* Input validation
* JWT authentication
* User accounts
* Docker containerization
* AWS deployment (EC2/ECS)
* CI/CD pipeline
* API documentation with Swagger

## Author

**Divyanshu Singh**

