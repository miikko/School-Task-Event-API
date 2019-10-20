const locationRouter = require('express').Router()
const dbHandler = require('../dbHandler')

locationRouter.get('/', async (req, res) => {
  const name = req.query.name
  if (!name) {
    return res.status(400).end()
  }
  const locationInfo = await dbHandler.getLocationInfo(name)
  return res.status(200).json(locationInfo)
})

module.exports = locationRouter