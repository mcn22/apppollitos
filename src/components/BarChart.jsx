import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Axios from "axios";
import _ from "lodash";
const BarChart = () => {
    const [label, setLabel] = useState([]);
    const [dat, setDat] = useState([]);
    const [go, setGo] = useState(true);
    var months = [];
    var quantity = [];
    var grouped = [];
    useEffect(() => {
        if (go) {
            Axios.get('https://pollitobackend.azurewebsites.net/api/Diarios')
                .then(response => {
                    setGo(false);
                    response.data.forEach(element => {
                        months.push({ mes: new Date(element.date).toLocaleString('default', { month: 'long' }), cantidad: 1 });
                    });
                    // eslint-disable-next-line
                    grouped = _.countBy(months, "mes");
                    // eslint-disable-next-line
                    months = [];
                    Object.keys(grouped).forEach(function (key) {
                        months.push(key);
                        quantity.push(grouped[key]);

                    });
                    setLabel(months);
                    setDat(quantity);

                });
        }
    });
    return (<div>
        <Bar
            data={{
                labels: label,
                datasets: [{
                    label: '# de Diarios recibidos por mes',
                    data: dat,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }}
            height={400}
            width={600}
        />
    </div>);
}

export default BarChart;