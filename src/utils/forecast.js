const request = require('postman-request')


const forecast = (lat, long, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=253370224b93a52cea4476a58aff7611&query=${lat},${long}&units=f`

    request({ url, json: true }, (error, { body } = {}) => {
        if (!error) {
            if (!body.error) {
                const data = body.current
                callback(undefined, { temperature: data.temperature, feelslike: data.feelslike})
            } else {
                callback(body.error.info, undefined)
            }
        } else {
            callback('Cannot connect to weather services', undefined)
        }
    })
}


module.exports = forecast