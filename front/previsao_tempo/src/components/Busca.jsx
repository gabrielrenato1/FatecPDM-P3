import React, { useEffect, useState } from "react"
import { InputText } from 'primereact/inputtext'
import { RadioButton } from 'primereact/radiobutton';
import openweatherClient from '../utils/openweatherClient'
import Listar from './Listar'

const Busca = () => {

    const [termoBusca, setTermoBusca] = useState("-23.561167625063238, -46.65648357473211")
    const [tipoBusca, setTipoBusca] = useState(null)
    const [resultados, setResultados] = useState([])

    useEffect(() => {

        const fazerBusca = async () => {

            const { data } = await openweatherClient.get('/search', {
                params: {
                    query: termoBusca,
                    data_type: tipoBusca
                }
            })

            setResultados(data)

        }

        if(termoBusca.length > 2 && termoBusca.includes(",") && tipoBusca !== null){

            if(resultados.length === 0){
                fazerBusca()
            }else{

                const timeoutID = setTimeout(() => {
                    if(termoBusca){
                        fazerBusca()
                    }
                }, 5000)

                return () => {
                    clearTimeout(timeoutID)
                }
                
            }

        }

    }, [termoBusca, tipoBusca])

    return (
        <div className='flex flex-column m-2'>
            <InputText
                className="w-full border-1 border-round-sm text-lg"
                placeholder="Digite a coordenada de uma cidade..."
                onChange={(e) => {setTermoBusca(e.target.value)}}
                value={termoBusca}
            />

            <div className="flex flex-wrap gap-3 w-full mt-3 justify-content-center">
                <div className="flex align-items-center">
                    <RadioButton inputId="buscaTipoTempMinMax" name="buscaRadio" value="temp_min_max" onChange={(e) => setTipoBusca(e.value)} checked={tipoBusca == "temp_min_max"} />
                    <label htmlFor="buscaTipoTempMinMax" className="ml-2">Temperatura máxima e mínima</label>
                </div>
                <div className="flex align-items-center">
                    <RadioButton inputId="buscaTipoHumidity" name="buscaRadio" value="humidity_atmosferic_pressure" onChange={(e) => setTipoBusca(e.value)} checked={tipoBusca == "humidity_atmosferic_pressure"} />
                    <label htmlFor="buscaTipoHumidity" className="ml-2">Humidade e Pressão Atmosférica</label>
                </div>
            </div>

            <Listar previsoes={resultados}/>

        </div>
    )

}

export default Busca