require('dotenv').config()
const axios = require("axios")
const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())

const openWeatherMapClient = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: { 
            appid: process.env.OPEN_WEATHER_KEY,
            units: "metric",
            lang: "pt_br"
        }
})

app.get('/search', async (request, response) => {
    
    const coords = request.query.query.replaceAll(" ", "").split(",")
    
    const result = await openWeatherMapClient.get('/forecast', {
        params: {
            lat: coords[0],
            lon: coords[1]
        }
    }).catch((err) => {
        response.status(err.status).json({
            message: `Algo de errado ocorreu ao pesquisar a coordenada: ${request.query.lat}, ${request.query.long}.`
        })
    })

    const weatherData = result.data.list
    let responseData = [];

    for(i = 0; i < weatherData.length; i+=8){

        if(request.query.data_type == "temp_min_max"){

            let weatherDataFromDay = weatherData.slice(i, i+8)
            let temp_min = 100
            let temp_max = 0

            weatherDataFromDay.map(function(value) {
                
                if(value.main.temp_min <= temp_min){
                    temp_min = value.main.temp_min
                }

                if(value.main.temp_max >= temp_max){
                    temp_max = value.main.temp_max
                }

            })

            responseData.push({
                temp_min: temp_min,
                temp_max: temp_max,
                date: date
            })

        }else if(request.query.data_type == "humidity_atmosferic_pressure"){

            responseData.push({
                humidity: weatherData[i].main.humidity,
                pressure: weatherData[i].main.pressure,
                date: date
            })

        }

    }

    response.json(responseData)

})

const port = 3001

app.listen(port, () => {
    console.log(`Server online: http://127.0.0.1:${port}`)
})