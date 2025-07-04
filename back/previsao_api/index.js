require('dotenv').config()
const axios = require("axios")
const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())

const openWeatherMap = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5'
})

app.get('/previsao', async (req, res) => {
    const { lat, lon, tipo } = req.query;

    if (!lat || !lon || !tipo) {
        return res.status(400).json({ message: "Erro de parametro" });
    }

    try {
        const result = await openWeatherMap.get('/forecast', {
            params: {
                lat,
                lon,
                appid: process.env.API_KEY,
                units: "metric",
                lang: "pt_br"
            }
        });

        const dadosAPI = result.data.list;

        const resposta = [];

        for (let i = 4; i < dadosAPI.length; i += 8) {

            const dado = dadosAPI[i];
            const iconCode = dado.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            const info = {
                description: dado.weather[0].description,
                icon: iconUrl
            };

            if (tipo === 'temperatura') {
                info.temp_min = dado.main.temp_min;
                info.temp_max = dado.main.temp_max;

            } else if (tipo === 'pressao_umidade') {
                info.pressure = dado.main.pressure;
                info.humidity = dado.main.humidity;
            }

            resposta.push(info);
        }


        res.json(resposta);
    } catch (err) {
        res.status(500).json({ message: "Erros ao buscar dados da API" });
    }
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server online: http://127.0.0.1:${port}`);
});