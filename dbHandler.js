const mysql = require('mysql')

const conn = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true
})

const getEventsFromTimePeriod = (sDate, eDate) => {
  return new Promise((resolve, reject) => {
    const queryStr = `SELECT * FROM event_date 
      JOIN event ON event_date.Event_id=event.Event_id
      JOIN location ON event.Location_Location_id=location.Location_id
      WHERE Date BETWEEN '${sDate}' AND '${eDate}'`
    conn.query(queryStr, (err, result, fields) => {
      if (err) {
        return reject(err)
      }
      resolve(result)
    })
  })
}

const getLocationInfo = (name) => {
  return new Promise((resolve, reject) => {
    const queryStr = `SELECT * FROM location
      WHERE location_name='${name}'`
    conn.query(queryStr, (err, result, fields) => {
      if (err) {
        return reject(err)
      }
      resolve(result)
    })
  })
}

const sendEvent = async (name, type, locationId, eventId) => {
  return new Promise((resolve, reject) => {
    const queryStr = `INSERT INTO 
      event (Event_id, Name, Type, Location_Location_id)
      VALUES (${eventId}, '${name}', '${type}', '${locationId}')`
    conn.query(queryStr, (err, result, fields) => {
      if (err) {
        return reject(err)
      }
      resolve(result)
    })
  })
}

const sendEventDate = (eventId, date) => {
  return new Promise((resolve, reject) => {
    const queryStr = `INSERT INTO
      event_date (Date, Event_id)
      VALUES ('${date}', '${eventId}')`
    conn.query(queryStr, (err, result, fields) => {
      if (err) {
        return reject(err)
      }
      resolve(result)
    })
  })
}

const sendEventLocation = (locationId, name, address, city,
                           zipCode, country) => {
  return new Promise((resolve, reject) => {
    const queryStr = `INSERT INTO location(
      Location_id, Location_name, Street_address, City, Zip, Country
    )
    SELECT * FROM (
      SELECT '${locationId}', '${name}', '${address}',
      '${city}', '${zipCode}', '${country}'
    ) AS tmp
    WHERE NOT EXISTS (
      SELECT Location_id FROM location
      WHERE Location_id = '${locationId}'
    )`
    conn.query(queryStr, (err, result, fields) => {
      if (err) {
        return reject(err)
      }
      resolve(result)
    })
  })
}

const getNextEventId = () => {
  return new Promise((resolve, reject) => {
    const queryStr = 'SELECT MAX(Event_id) FROM event'
    conn.query(queryStr, (err, result, fields) => {
      if (err) {
        reject(err)
      }
      resolve(result[0]['MAX(Event_id)'] + 1)
    })
  })
}

module.exports = {
  getEventsFromTimePeriod, getLocationInfo, sendEvent, sendEventDate,
  sendEventLocation, getNextEventId
}