const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const eventRouter = require('./routers/event')
const locationRouter = require('./routers/location')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.sendFile('listofplaces.html', {root: __dirname })
})

app.use('/api/events', eventRouter)
app.use('/api/location', locationRouter)

const server = app.listen(3001, () => {
  const host = server.address().address
  const port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})