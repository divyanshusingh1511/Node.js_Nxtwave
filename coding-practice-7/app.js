const express = require('express')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const dbPath = path.join(__dirname, 'cricketMatchDetails.db')
const app = express()
app.use(express.json())

let db = null

const initializationDBServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at https://localhost:3000')
    })
  } catch (e) {
    console.log(`DB server Error ${e.message}`)
    process.exit(1)
  }
}
initializationDBServer()

// API - 1
app.get('/players/', async (request, response) => {
  const query = `
        SELECT player_id as playerId, player_name as playerName
        FROM player_details;
    `
  const getQueryMethod = await db.all(query)
  response.send(getQueryMethod)
})

// API - 2
app.get('/players/:playerId/', async (request, response) => {
  const {playerId} = request.params
  const query = `
    SELECT player_id as playerId, player_name as playerName
    FROM player_details
    WHERE player_id = ${playerId};
  `
  const getPLayerId = await db.get(query)
  response.send(getPLayerId)
})

//API - 3
app.put('/players/:playerId/', async (request, response) => {
  const {playerName} = request.body
  const {playerId} = request.params

  const query = `
    UPDATE player_details
    SET player_name = '${playerName}'
    WHERE player_id = ${playerId};
  `

  await db.run(query)
  response.send('Player Details Updated')
})
// API - 4
app.get('/matches/:matchId/', async (request, response) => {
  const {matchId} = request.params

  const query = `
    SELECT
      match_id AS matchId,
      match,
      year
    FROM match_details
    WHERE match_id = ${matchId};
  `

  const match = await db.get(query)
  response.send(match)
})
// API - 5
app.get('/players/:playerId/matches', async (request, response) => {
  const {playerId} = request.params

  const query = `
    SELECT
      md.match_id AS matchId,
      md.match,
      md.year
    FROM match_details AS md
    INNER JOIN player_match_score AS pms
      ON md.match_id = pms.match_id
    WHERE pms.player_id = ${playerId};
  `

  const matches = await db.all(query)
  response.send(matches)
})

// API - 6
app.get('/matches/:matchId/players', async (request, response) => {
  const {matchId} = request.params
  const query = `
        SELECT
      pd.player_id AS playerId,
      pd.player_name AS playerName
    FROM player_details AS pd
    INNER JOIN player_match_score AS pms
    ON pd.player_id = pms.player_id
    WHERE pms.match_id = ${matchId};
  `
  const matches = await db.all(query)
  response.send(matches)
})

// API - 7
app.get('/players/:playerId/playerScores', async (request, response) => {
  const {playerId} = request.params

  const query = `
    SELECT
      pd.player_id AS playerId,
      pd.player_name AS playerName,
      SUM(pms.score) AS totalScore,
      SUM(pms.fours) AS totalFours,
      SUM(pms.sixes) AS totalSixes
    FROM player_match_score AS pms
    INNER JOIN player_details AS pd
      ON pms.player_id = pd.player_id
    WHERE pms.player_id = ${playerId}
    GROUP BY pd.player_id, pd.player_name;
  `

  const playerStats = await db.get(query)
  response.send(playerStats)
})
module.exports = app;