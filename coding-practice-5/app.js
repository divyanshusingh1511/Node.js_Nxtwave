// const express = require('express')
// const app = express()
// const path = require('path')
// const {open} = require('sqlite')
// const sqlite3 = require('sqlite3')
// const dbPath = path.join(__dirname, 'moviesData.db')
// let db = null
// app.use(express.json())
// const intitializationDBAndServer = async () => {
//   try {
//     db = await open({
//       filename: dbPath,
//       driver: sqlite3.Database,
//     })
//     app.listen(3000, () => {
//       console.log('Server Running at http://localhost:3000/')
//     })
//   } catch (e) {
//     console.log(`DB Error: ${e.message}`)
//     process.exit(1)
//   }
// }

// intitializationDBAndServer()

// module.exports = app // gpt

// //API - 1

// app.get('/movies/', async (request, response) => {
//   const getMoviesQuery = `
//     SELECT *
//     FROM movie
//     ORDER BY 
//     movie_name
//     `
//   const movieArray = await db.all(getMoviesQuery)
//   response.send(movieArray.map(movie => ({movieName: movie.movie_name})))
// })

// // API - 2

// app.post('/movies/', async (request, response) => {
//   const {directorId, movieName, leadActor} = request.body
//   const addMovieQuery = `
//     INSERT INTO movie(director_id,movie_name,lead_actor)
//     VALUES
//     ('${director_id}' ,
//      '${movie_name}',
//       '${lead_actor}')
//   ` //gpt
//   const dbresponse = await db.run(addMovieQuery)

//   const movie_id = dbresponse.lastID

//   response.send('Movie Successfully Added')
// })

// // API - 3
// app.get('/movie/:movieId', async (request, response) => {
//   const {moviesId} = request.params
//   const getMoviesQuery = `
//    SELECT * 
//    FROM movie
//    WHERE movie_id =${moviesId};
//   `
//   const movieArray = await db.get(getMoviesQuery)
//   response.send({
//     movieId: movie.movie_id,
//     directorId: movie.director_id,
//     movieName: movie.movie_name,
//     leadActor: movie.lead_actor,
//   })
// })

// // API - 4
// app.put('/movies/:movieId/', async (request, response) => {
//   const {movieId} = request.params
//   const moviesDetails = request.body
//   const {director_id, movie_name, lead_actor} = moviesDetails
//   const updateMovieQuery = `
//     UPDATE 
//       movie 
//     SET
//     director_id='${director_id}',
//     movie_name='${movie_name}',
//     lead_actor ='${lead_actor}'

//     WHERE movie_id ='${movieId}'
//   `
//   await db.run(updateMovieQuery)
//   response.send('Movie Details Updated')
// })

// // API - 5
// app.delete('/movies/:movieId/', async (request, response) => {
//   const {movieId} = request.params
//   const deleteQuery = ` 
//    DELETE FROM movie 
//    WHERE movie_id ='${movieId}'
//    `
//   await db.get(deleteQuery)
//   response.send('Movie Removed')
// })

// // API -6
// app.get('/directors/', async (request, response) => {
//   const directorsQuery = ` 
//   SELECT *
//   FROM director 
//   ORDER BY 
//   director_id
// `
//   const directorArray = await db.all(directorsQuery)
//   response.send(
//     directorArray.map(director => ({
//       directorId: director.director_id,
//       directorName: director.director_name,
//     })),
//   ) //gpt
// })

// // API - 7
// app.get('/directors/:directorId/movies/', async (request, response) => {
//   const {directorId} = request.params
//   const getMovieQuery = `
//   SELECT movie_name 
//   FROM movie
//   WHERE director_id = ${directorId}
//   `
//   const movies = await db.all(getMovieQuery)
//   response.send(movies.map(movies => ({movieName: movies.movie_name})))
// })

const express = require('express')
const app = express()
const path = require('path')
const { open } = require('sqlite')
const sqlite3 = require('sqlite3')
const dbPath = path.join(__dirname, 'moviesData.db')

app.use(express.json())

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (error) {
    console.log(`DB Error: ${error.message}`)
    process.exit(1)
  }
}

initializeDBAndServer()

module.exports = app

// API 1: Get all movie names
app.get('/movies/', async (request, response) => {
  const getMoviesQuery = `SELECT movie_name FROM movie ORDER BY movie_id;`
  const movies = await db.all(getMoviesQuery)
  response.send(movies.map((movie) => ({ movieName: movie.movie_name })))
})

// API 2: Add a new movie
app.post('/movies/', async (request, response) => {
  const { directorId, movieName, leadActor } = request.body
  const addMovieQuery = `
    INSERT INTO movie (director_id, movie_name, lead_actor)
    VALUES (?, ?, ?);
  `
  await db.run(addMovieQuery, [directorId, movieName, leadActor])
  response.send('Movie Successfully Added')
})

// API 3: Get movie by ID
app.get('/movies/:movieId/', async (request, response) => {
  const { movieId } = request.params
  const getMovieQuery = `SELECT * FROM movie WHERE movie_id = ?;`
  const movie = await db.get(getMovieQuery, [movieId])
  response.send({
    movieId: movie.movie_id,
    directorId: movie.director_id,
    movieName: movie.movie_name,
    leadActor: movie.lead_actor,
  })
})

// API 4: Update movie by ID
app.put('/movies/:movieId/', async (request, response) => {
  const { movieId } = request.params
  const { directorId, movieName, leadActor } = request.body
  const updateQuery = `
    UPDATE movie
    SET director_id = ?, movie_name = ?, lead_actor = ?
    WHERE movie_id = ?;
  `
  await db.run(updateQuery, [directorId, movieName, leadActor, movieId])
  response.send('Movie Details Updated')
})

// API 5: Delete movie by ID
app.delete('/movies/:movieId/', async (request, response) => {
  const { movieId } = request.params
  const deleteQuery = `DELETE FROM movie WHERE movie_id = ?;`
  await db.run(deleteQuery, [movieId])
  response.send('Movie Removed')
})

// API 6: Get all directors
app.get('/directors/', async (request, response) => {
  const getDirectorsQuery = `SELECT * FROM director ORDER BY director_id;`
  const directors = await db.all(getDirectorsQuery)
  response.send(
    directors.map((director) => ({
      directorId: director.director_id,
      directorName: director.director_name,
    }))
  )
})

// API 7: Get movies by director
app.get('/directors/:directorId/movies/', async (request, response) => {
  const { directorId } = request.params
  const getMoviesQuery = `SELECT movie_name FROM movie WHERE director_id = ?;`
  const movies = await db.all(getMoviesQuery, [directorId])
  response.send(movies.map((movie) => ({ movieName: movie.movie_name })))
})
