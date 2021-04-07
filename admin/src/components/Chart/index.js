import './styles.scss';

import { useState, useEffect } from 'react'
import {Line} from 'react-chartjs-2'

const Chart = props => {
    const [chartData, setChartData] = useState({});

    const chart = () => {
        setChartData({
            labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
            datasets: [
                {
                    label: 'Remeras',
                    data: [256, 123 , 55, 223, 2500, 132, 313],
                    borderWidth: 4,
                    borderColor: '#ff9f43',
                    backgroundColor: 'rgba(255, 159, 67, .1)',
                    fill: false,
                    
                },
                {
                    label: 'Pantalones',
                    data: [2546, 1353 , 955, 4223, 1500, 5232, 3113],
                    borderWidth: 4,
                    borderColor: '#5f27cd',
                    backgroundColor: 'rgba(95, 39, 205, .1)',
                    fill: false,
                }

            ]
        })
    }

    useEffect(()=> {
        chart();

    }, []);

    return (
            <div className="lennychart">
                <h2>Ventas de la semana</h2>

                <Line 
                    data={chartData} 
                    options={{
                        responsive: true,
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: 10,
                                        beginAtZero: true
                                    },
                                    gridLines: {
                                        display: false
                                    }
                                }
                            ],
                            xAxes: [
                                {
                                    gridLines: {
                                        display: false
                                    }
                                }
                            ]
                        }
                    }}
                />

                
            </div>
    )
}

export default Chart;