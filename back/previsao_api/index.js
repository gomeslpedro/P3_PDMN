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

        for (let i = 0; i < dadosAPI.length; i += 8) {

            const blocoDia = dadosAPI.slice(i, i + 8);

            let menor = blocoDia[0].main.temp_min;
            let maior = blocoDia[0].main.temp_max;

            let pressure = blocoDia[0].main.pressure;
            let humidity = blocoDia[0].main.humidity;

            const description = blocoDia[0].weather[0].description;

            const iconCode = blocoDia[0].weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            for (let j = 1; j < blocoDia.length; j++) {

                const tempMin = blocoDia[j].main.temp_min;
                const tempMax = blocoDia[j].main.temp_max;

                if (tempMin < menor) menor = tempMin;
                if (tempMax > maior) maior = tempMax;
            }

            const info = {
                description,
                icon: iconUrl
            };

            if (tipo === 'temperatura') {

                info.temp_min = menor;
                info.temp_max = maior;
            } else if (tipo === 'pressao_umidade') {

                info.pressure = pressure;
                info.humidity = humidity;
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