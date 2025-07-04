import React, { useEffect, useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';

let timeout = null;

const Busca = ({ onBusca }) => {
    const [entrada, setEntrada] = useState('-23.561167625063238, -46.65648357473211');
    const [opcao, setOpcao] = useState(null);


    useEffect(() => {

        if (timeout) clearTimeout(timeout);


        timeout = setTimeout(() => {
            const partes = entrada.split(',');


            if (partes.length === 2 && !isNaN(partes[0]) && !isNaN(partes[1]) && opcao) {

                const lat = parseFloat(partes[0]);
                const lon = parseFloat(partes[1]);
                onBusca({ lat, lon, tipo: opcao });
            }
        }, 5000);


        return () => clearTimeout(timeout);
    }, [entrada, opcao]);


    return (
        <div className="p-3">

            <div className="mb-3">
                <label htmlFor="input">Digite a latitude e longitude separada por ','</label>

                <InputText
                    id="input"
                    value={entrada}
                    onChange={(e) => setEntrada(e.target.value)}
                    className="w-full" />
            </div>

            <div className="flex flex-column gap-2">

                <div className="flex align-items-center">

                    <RadioButton
                        inputId="temp"
                        name="opcao"
                        value="temperatura"
                        onChange={(e) => setOpcao(e.value)}
                        checked={opcao === 'temperatura'} />

                    <label htmlFor="temp" className="ml-2">Temperatura minima + maxima</label>
                </div>

                <div className="flex align-items-center">

                    <RadioButton
                        inputId="pressao"
                        name="opcao"
                        value="pressao_umidade"
                        onChange={(e) => setOpcao(e.value)}
                        checked={opcao === 'pressao_umidade'} />
                    <label htmlFor="pressao" className="ml-2">Pressao + Umidade</label>
                </div>

            </div>
        </div>
    );
};

export default Busca;