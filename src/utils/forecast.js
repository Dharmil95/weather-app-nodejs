const request = require ('request')

const forecast = (longitude,latitude,callback) => {
    url = 'https://api.darksky.net/forecast/4cb41e08b83847394f0a7e6e1cd49f50/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'?units=si'
    request({url, json: true},(error,{body}) => {
        if (error) {
            callback('Unable to Connect Server!',undefined)
        } else if (body.error){
                    callback('Unable to find the location.',undefined)
        } else {
            callback(undefined,{
                summary: body.daily.summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast