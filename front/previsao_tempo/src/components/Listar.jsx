import { Card } from 'primereact/card';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import striptags from 'striptags';

const Listar = ({ previsoes }) => {

    return (

        <div className="col-12">

            <div className="flex flex-wrap"
                style={{justifyContent: "space-around"}}>
                {previsoes.map((previsao) => (
                    
                    <div className='col-12 md:col-5 lg:col-4 xl:col-2'>

                        <Card
                            title={striptags(previsao.date)}
                            subTitle={striptags(previsao.description)}
                            className="shadow-2 border-round p-3 mt-3 mb-3 w-20 h-full">

                            {(previsao.temp_min && previsao.temp_max) ?
                                <div>
                                    <span><strong>Temperatura Mínima:</strong> <p>{striptags(previsao.temp_min.toString())}°C</p></span>
                                    <span><strong>Temperatura Máxima:</strong> <p>{striptags(previsao.temp_max.toString())}°C</p></span>
                                </div>
                            : "" }

                            {(previsao.humidity && previsao.pressure) ?
                                <div>
                                    <span><strong>Umidade Relativa:</strong> <p>{striptags(previsao.humidity.toString())}%</p></span>
                                    <span><strong>Pressão Atmosférica:</strong> <p>{striptags(previsao.pressure.toString())}%</p></span>
                                </div>
                            : "" }

                        </Card>

                    </div>

                ))}
            </div>
        </div>

    );
};

export default Listar;