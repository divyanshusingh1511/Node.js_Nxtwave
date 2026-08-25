# Covid-19 India Portal

**Difficulty:** Easy
**Status:** Solved

## Problem Statement

Given two files `app.js` and a database file `covid19IndiaPortal.db` consisting of three tables `state`, `district`, and `user`.

Write APIs to perform operations on the tables `state` and `district` only after authentication of the user.

## Database Tables

### State Table

| Columns     | Type    |
|-------------|---------|
| state_id    | INTEGER |
| state_name  | TEXT    |
| population  | INTEGER |

### District Table

| Columns       | Type    |
|---------------|---------|
| district_id   | INTEGER |
| district_name | TEXT    |
| state_id      | INTEGER |
| cases         | INTEGER |
| cured         | INTEGER |
| active        | INTEGER |
| deaths        | INTEGER |

## Sample Valid User Credentials

```json
{
  "username": "christopher_phillips",
  "password": "christy@123"
}
```

## API 1: Login

**Path:** `/login/`
**Method:** `POST`

**Request**
```json
{
  "username": "christopher_phillips",
  "password": "christy@123"
}
```

**Scenario 1 — Unregistered user**
- Status code: `400`
- Body: `Invalid user`

**Scenario 2 — Incorrect password**
- Status code: `400`
- Body: `Invalid password`

**Scenario 3 — Successful login**
- Returns the JWT Token
```json
{
  "jwtToken": "ak2284ns8Di32......"
}
```

## Authentication with Token

**Scenario 1 — Missing or invalid token**
- Status code: `401`
- Body: `Invalid JWT Token`

**Scenario 2 — Successful verification**
- Proceed to the next middleware or handler

## API 2: Get All States

**Path:** `/states/`
**Method:** `GET`

**Description:** Returns a list of all states in the state table

**Response**
```json
[
  {
    "stateId": 1,
    "stateName": "Andaman and Nicobar Islands",
    "population": 380581
  },
  ...
]
```

## API 3: Get State by ID

**Path:** `/states/:stateId/`
**Method:** `GET`

**Description:** Returns a state based on the state ID

**Response**
```json
{
  "stateId": 8,
  "stateName": "Delhi",
  "population": 16787941
}
```

## API 4: Create District

**Path:** `/districts/`
**Method:** `POST`

**Description:** Create a district in the district table, `district_id` is auto-incremented

**Request**
```json
{
  "districtName": "Bagalkot",
  "stateId": 3,
  "cases": 2323,
  "cured": 2000,
  "active": 315,
  "deaths": 8
}
```

**Response**
```
District Successfully Added
```

## API 5: Get District by ID

**Path:** `/districts/:districtId/`
**Method:** `GET`

**Description:** Returns a district based on the district ID

**Response**
```json
{
  "districtId": 322,
  "districtName": "Palakkad",
  "stateId": 17,
  "cases": 61558,
  "cured": 59276,
  "active": 2095,
  "deaths": 177
}
```

## API 6: Delete District

**Path:** `/districts/:districtId/`
**Method:** `DELETE`

**Description:** Deletes a district from the district table based on the district ID

**Response**
```
District Removed
```

## API 7: Update District

**Path:** `/districts/:districtId/`
**Method:** `PUT`

**Description:** Updates the details of a specific district based on the district ID

**Request**
```json
{
  "districtName": "Nadia",
  "stateId": 3,
  "cases": 9628,
  "cured": 6524,
  "active": 3000,
  "deaths": 104
}
```

**Response**
```
District Details Updated
```

## API 8: Get State Statistics

**Path:** `/states/:stateId/stats/`
**Method:** `GET`

**Description:** Returns the statistics of total cases, cured, active, deaths of a specific state based on state ID

**Response**
```json
{
  "totalCases": 724355,
  "totalCured": 615324,
  "totalActive": 99254,
  "totalDeaths": 9777
}
```

## Setup

Use `npm install` to install the packages.

Export the express instance using the default export syntax.

Use Common JS module syntax.

## Author

**Divyanshu Singh**
