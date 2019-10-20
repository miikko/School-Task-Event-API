const eventRouter = require('express').Router()
const dbHandler = require('../dbHandler')

eventRouter.get('/', async (req, res) => {
  const sDate = req.query.start
  const eDate = req.query.end
  if (!sDate || !eDate) {
    return res.status(400).end()
  }
  const events = await dbHandler.getEventsFromTimePeriod(sDate, eDate)
  return res.status(200).json(events)
})

eventRouter.post('/', async (req, res) => {
  const body = req.body
  const name = body.eventName
  const date = body.eventDate
  const type = body.eventType
  const locationId = body.eventLocation
  const locationName = body.locPlaceName
  const address = body.locStreetAddress
  const city = body.locCity
  const zipCode = body.locZip
  const country = body.locCountry
  const eventId = await dbHandler.getNextEventId()
  try {
    await dbHandler.sendEventLocation(
      locationId, locationName, address, city, zipCode, country
    )
    const savedEvent = await dbHandler.sendEvent(
      name, type, locationId, eventId)
    await dbHandler.sendEventDate(eventId, date)
    return res.status(201).end()
  } catch (exception) {
    console.log(exception)
    return res.status(400).end()
  }
})

module.exports = eventRouter