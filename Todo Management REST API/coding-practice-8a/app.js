const express = require('express')
const path = require('path')
const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

const app = express()
app.use(express.json())

const dbPath = path.join(__dirname, 'todoApplication.db')

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })

    // Create table if it is not present
    await db.exec(`
      CREATE TABLE IF NOT EXISTS todo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        todo TEXT NOT NULL,
        priority TEXT NOT NULL,
        status TEXT NOT NULL
      );
    `)

    // Checking it is present or not
    const count = await db.get(`
      SELECT COUNT(*) AS total
      FROM todo;
    `)

    // if the nothing is inserted in the table just add one time in it
    if (count.total === 0) {
      await db.exec(`
        INSERT INTO todo (todo, priority, status)
        VALUES
        ('Watch Movie', 'LOW', 'TO DO'),
        ('Learn Node JS', 'HIGH', 'IN PROGRESS'),
        ('Read Book', 'MEDIUM', 'DONE'),
        ('Play Volleyball', 'MEDIUM', 'DONE'),
        ('Practice DSA', 'HIGH', 'TO DO');
      `)

      console.log('Sample data inserted successfully.')
    }

    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

initializeDBAndServer()

// API - 1
app.get('/todos/', async (request, response) => {
  const {status, priority, search_q = ''} = request.query

  let gettodoApplicationQuery = ''
  // It is the Sceniro - 3  i am doing
  if (status !== undefined && priority !== undefined) {
    gettodoApplicationQuery = `
     SELECT *
    FROM todo
    WHERE status = '${status}'
    AND priority = '${priority}';
    `
  }

  // Now check another scenrion 2
  else if (priority !== undefined) {
    gettodoApplicationQuery = ` 
      SELECT * 
      From todo 
      WHERE priority = '${priority}'
    `
  }
  // Now check the Sceniro - 1
  else if (status !== undefined) {
    gettodoApplicationQuery = `
      SELECT *
      FROM todo
      WHERE status = '${status}'
    `
  }

  //now cheking for 4th Sceniro
  else if (search_q !== '') {
    gettodoApplicationQuery = `
    SELECT *
    FROM todo
    WHERE todo LIKE '%${search_q}%'
  `
  } else {
    gettodoApplicationQuery = `
    SELECT *
    FROM todo;
  `
  }
  const calltheAPI1 = await db.all(gettodoApplicationQuery)
  response.send(calltheAPI1)
})

// API - 2

app.get('/todos/:todoId/', async (request, response) => {
  const {todoId} = request.params

  const getTodoQuery = `
    SELECT *
    FROM todo
    WHERE id = ${todoId};
  `

  const todo = await db.get(getTodoQuery)
  response.send(todo)
})

// API - 3
app.post('/todos/', async (request, response) => {
  const {id, todo, priority, status} = request.body

  const addTodoQuery = `
    INSERT INTO todo (id, todo, priority, status)
    VALUES (
      ${id},
      '${todo}',
      '${priority}',
      '${status}'
    );
  `

  await db.run(addTodoQuery)

  response.send('Todo Successfully Added')
})

// API - 4

app.put('/todos/:todoId/', async (request, response) => {
  const {todoId} = request.params
  const requestBody = request.body

  let updateQuery = ''

  if (
    requestBody.status !== undefined &&
    requestBody.priority === undefined &&
    requestBody.todo === undefined
  ) {
    updateQuery = `
      UPDATE todo
      SET status='${requestBody.status}'
      WHERE id=${todoId};
    `
    await db.run(updateQuery)
    response.send('Status Updated')
  } else if (
    requestBody.priority !== undefined &&
    requestBody.status === undefined &&
    requestBody.todo === undefined
  ) {
    updateQuery = `
      UPDATE todo
      SET priority='${requestBody.priority}'
      WHERE id=${todoId};
    `
    await db.run(updateQuery)
    response.send('Priority Updated')
  } else if (
    requestBody.todo !== undefined &&
    requestBody.status === undefined &&
    requestBody.priority === undefined
  ) {
    updateQuery = `
      UPDATE todo
      SET todo='${requestBody.todo}'
      WHERE id=${todoId};
    `
    await db.run(updateQuery)
    response.send('Todo Updated')
  }
})

// API - 5
app.delete('/todos/:todoId/', async (request, response) => {
  const {todoId} = request.params

  const deleteTodoQuery = `
    DELETE FROM todo
    WHERE id = ${todoId};
  `

  await db.run(deleteTodoQuery)

  response.send('Todo Deleted')
})

module.exports = app
