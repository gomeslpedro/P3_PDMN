import React from 'react';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import striptags from 'striptags';

const Exibicao = ({ previsoes, tipo }) => {

    if (!previsoes || previsoes.length === 0) {

        return (
            <p className="mt-4 flex justify-content-center">Sem previsao disponivel!</p>
        );
    }

    return (
        <div className="flex-wrap flex justify-content-center p-3">
            {previsoes.map((previsao, index) => (
                <div key={index} className="col-12 md:col-2 sm:col-12 flex justify-content-center">

                    <Card
                        title="Previsão do Tempo"
                        subTitle={striptags(previsao.description)}
                        className="w-20 shadow-2 border-round p-3">

                       <img
                        src={previsao.icon}
                        alt="icone api"
                        className="block mx-auto mb-3"
                        style={{ width: '80px', height: '80px' }}
/>
                        {tipo === 'temperatura' && (
                            <>
                                <p><strong>Temperatura Minima:</strong> {striptags(previsao.temp_min.toString())}°C</p>
                                <p><strong>Temperatura Maxima:</strong> {striptags(previsao.temp_max.toString())}°C</p>
                            </>
                        )}


                        {tipo === 'pressao_umidade' && (
                            <>
                                <p><strong>Pressão Atmosferica:</strong> {striptags(previsao.pressure.toString())} hPa</p>
                                <p><strong>Umidade Relativa:</strong> {striptags(previsao.humidity.toString())}%</p>
                            </>
                        )}
                    </Card>

                </div>
            ))}

        </div>
    );
};

export default Exibicao;
