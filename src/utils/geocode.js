const request = require('request')

const geoCode = (place, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(place)+'.json?access_token=pk.eyJ1IjoiZGhhcm1pbDEyIiwiYSI6ImNrNGxrNGVpNTE3czkzb3FzMzVxdWR1MzUifQ.T8t0fGFGnaPu4RkFAM8WSg&limit=1'
    request({url, json: true},(error,{body}) => {
    if (error) {
        callback('Unable to Connect Server!',undefined)
    } else if (body.features[0]  === undefined) {
        callback('Unable to find the location. Try another search.',undefined)
    } else {
        callback(undefined,{
        longitude : body.features[0].center[1],
        latitude : body.features[0].center[0],
        location : body.features[0].place_name
        })
        
    }
})
}

module.exports = geoCode