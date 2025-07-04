import React, { useState } from 'react'
import Busca from './components/Busca'
import openweatherClient from './utils/openWeatherClient'
import Exibicao from './components/Exibicao'

const App = () => {

  const [previsao, setPrevisao] = useState([])

  const [tipo, setTipo] = useState(null)

  const onBuscaRealizada = ({ lat, lon, tipo }) => {

    openweatherClient.get('/previsao', {
      params: { lat, lon, tipo }
    })


      .then(result => {
        setPrevisao(result.data)
        setTipo(tipo)
      })


      .catch(() => {
        setPrevisao([])
        setTipo(tipo)

      })
  }

  return (
    <div className='grid justify-content-center'>
      <div className="col-12">
        <Busca onBusca={onBuscaRealizada} />
      </div>
      <div className="col-12">
        <Exibicao previsoes={previsao} tipo={tipo} />
      </div>
    </div>
  )
}

export default App