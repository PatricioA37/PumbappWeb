'use strict';

document.addEventListener("DOMContentLoaded", function () {
    console.log("estoy en el DOMLoaded 2, el de floatchart2");

    setTimeout(function () {
        floatchart()
    }, 700);
    // [ campaign-scroll ] start
    var px = new PerfectScrollbar('.feed-scroll', {
        wheelSpeed: .5, swipeEasing: 0, wheelPropagation: 1, minScrollbarLength: 40,
    });
    var px = new PerfectScrollbar('.pro-scroll', {
        wheelSpeed: .5, swipeEasing: 0, wheelPropagation: 1, minScrollbarLength: 40,
    });
    // [ campaign-scroll ] end
});

function floatchart() {
    // [ support-chart ] start
    (function () {
        var options1 = {
            chart: {
                type: 'area', height: 85, sparkline: {
                    enabled: true
                }
            }, colors: ["#7267EF"], stroke: {
                curve: 'smooth', width: 2,
            }, series: [{
                data: [0, 20, 10, 45, 30, 55, 20, 30, 0]
            }], tooltip: {
                fixed: {
                    enabled: false
                }, x: {
                    show: false
                }, y: {
                    title: {
                        formatter: function (seriesName) {
                            return 'Ticket '
                        }
                    }
                }, marker: {
                    show: false
                }
            }
        }
        new ApexCharts(document.querySelector("#support-chart"), options1).render();

        var options2 = {
            chart: {
                type: 'bar', height: 85, sparkline: {
                    enabled: true
                }
            }, colors: ["#7267EF"], plotOptions: {
                bar: {
                    columnWidth: '70%'
                }
            }, series: [{
                data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54, 44, 12, 36, 9, 54, 25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 25, 44, 12, 36, 9, 54]
            }], xaxis: {
                crosshairs: {
                    width: 1
                },
            }, tooltip: {
                fixed: {
                    enabled: false
                }, x: {
                    show: false
                }, y: {
                    title: {
                        formatter: function (seriesName) {
                            return ''
                        }
                    }
                }, marker: {
                    show: false
                }
            }
        }
        new ApexCharts(document.querySelector("#support-chart1"), options2).render();
    })();
    // [ support-chart ] end
    // [ account-chart ] start


    (function () {

        // Llamar a la función para obtener datos cuando sea necesario
        fetchData();
    })();


    //funcion rellenar tabla


    // Llamar a la función para cargar y mostrar la tabla

    //tablaProductores();


    // [ satisfaction-chart ] start
    (function () {
        var options = {
            chart: {
                height: 260, type: 'pie',
            }, series: [66, 50, 40, 30], labels: ["extremely Satisfied", "Satisfied", "Poor", "Very Poor"], legend: {
                show: true, offsetY: 50,
            }, dataLabels: {
                enabled: true, dropShadow: {
                    enabled: false,
                }
            }, theme: {
                monochrome: {
                    enabled: true, color: '#7267EF',
                }
            }, responsive: [{
                breakpoint: 768, options: {
                    chart: {
                        height: 320,

                    }, legend: {
                        position: 'bottom', offsetY: 0,
                    }
                }
            }]
        }
        var chart = new ApexCharts(document.querySelector("#satisfaction-chart"), options);
        chart.render();
    })();
    // [ satisfaction-chart ] end
}

async function fetchData() {
    try {
        // URL desde donde obtendrás el JSON
        const url = await ('http://127.0.0.1:8000/indiceNatalidad/');

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }


        const jsonData = await response.json();

        // Procesar datosJson y actualizar el gráfico
        updateChartWithData(jsonData);

        //const productoresUnicos = obtenerProductoresUnicos(jsonData);

        // Actualizar la lista desplegable con los productores
        //actualizarListaDesplegable(productoresUnicos);

    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

async function updateChartWithData(datosJson, productorSeleccionadoId) {
    // Procesar datos para el gráfico
    var dataForChart = {
        cantidadMensualNatalicios: [], promedioNatalidadGlobal: []
    };

    // Inicializar arrays para cada mes
    for (var i = 0; i < 12; i++) {
        dataForChart.cantidadMensualNatalicios.push(0);
        dataForChart.promedioNatalidadGlobal.push(0);
    }

    // Procesar datos del JSON
datosJson.forEach(function (productores) {
        productores.forEach(function (registroParto) {
            // Filtrar por el productor seleccionado
            if (!productorSeleccionadoId || registroParto.Productor === productorSeleccionadoId) {
                var fechaParto = new Date(registroParto.FechaParto);
                var mes = fechaParto.getMonth();

                // Actualizar la cantidad mensual de natalicios (truncar a entero)
                dataForChart.cantidadMensualNatalicios[mes] += Math.floor(registroParto.Cantidad_hijosVIVOS);

                // Actualizar el promedio de natalidad global
                dataForChart.promedioNatalidadGlobal[mes]++;
            }
        });
});


    // Calcular el promedio mensual
    for (var i = 0; i < 12; i++) {
        if (dataForChart.promedioNatalidadGlobal[i] !== 0) {
            dataForChart.promedioNatalidadGlobal[i] = Math.floor(dataForChart.cantidadMensualNatalicios[i] / dataForChart.promedioNatalidadGlobal[i]);
        }
    }

    // Configuración del gráfico
    var options = {
        chart: {
            height: 350, type: 'line', stacked: false,
        }, stroke: {
            width: [0, 3], curve: 'smooth'
        }, plotOptions: {
            bar: {
                columnWidth: '50%'
            }
        }, colors: ['#7267EF', '#118f17'], series: [{
            name: 'Cantidad Mensual Natalicios por Productor',
            type: 'column',
            data: dataForChart.cantidadMensualNatalicios
        }, {
            name: 'Promedio Natalidad Global', type: 'line', data: dataForChart.promedioNatalidadGlobal
        }], markers: {
            size: 0
        }, xaxis: {
            type: 'datetime',
            categories: ['01/01/2023', '02/01/2023', '03/01/2023', '04/01/2023', '05/01/2023', '06/01/2023', '07/01/2023', '08/01/2023', '09/01/2023', '10/01/2023', '11/01/2023', '12/01/2023']
        }, fill: {
            opacity: [0.85, 1],
        }, yaxis: {
            min: 0
        }, tooltip: {
            shared: true, intersect: false, y: {
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return " " + y.toFixed(0);
                    }
                    return y;
                }
            }
        }, legend: {
            labels: {
                useSeriesColors: true
            }, markers: {
                customHTML: [function () {
                    return ''
                }, function () {
                    return ''
                }]
            }
        }
    };

    // Crear el gráfico
    var chart = new ApexCharts(document.querySelector("#account-chart"), options);

    // Renderizar el gráfico
    chart.render();
}


async function pruebaDeConcepto2(selectedProductor) {
    if (selectedProductor) {
        alert("Productor seleccionado: " + selectedProductor.nombre);
    } else {
        alert("Selecciona un productor");
    }
}

async function poc3(selectedProductor) {
    console.log(selectedProductor);
   let data;

    let data1 =[
        [
            {
                "nombreProductor": "gabriel",
                "Productor": "xwa7j4zypqTIdkpKTm4hi5Ee8sf2",
                "FechaParto": "2023-12-01",
                "Cantidad_hijosMUERTOS": 47,
                "Cantidad_hijosTOTAL": 46,
                "Cantidad_hijosVIVOS": 58
            },
            {
                "nombreProductor": "Gandalf",
                "Productor": "nWlVD7EM8EcRZURzfzwFtrhoNbm1",
                "FechaParto": "2023-12-01",
                "Cantidad_hijosMUERTOS": 18,
                "Cantidad_hijosTOTAL": 25,
                "Cantidad_hijosVIVOS": 7
            },
            {
                "nombreProductor": "Gandalf",
                "Productor": "nWlVD7EM8EcRZURzfzwFtrhoNbm1",
                "FechaParto": "2023-12-01",
                "Cantidad_hijosMUERTOS": 18,
                "Cantidad_hijosTOTAL": 25,
                "Cantidad_hijosVIVOS": 7
            },
        ]
        ];

    let data2 =[
        [
            {
                "nombreProductor": "gabriel",
                "Productor": "xwa7j4zypqTIdkpKTm4hi5Ee8sf2",
                "FechaParto": "2023-12-01",
                "Cantidad_hijosMUERTOS": 47,
                "Cantidad_hijosTOTAL": 46,
                "Cantidad_hijosVIVOS": 58
            },
            {
                "nombreProductor": "Gandalf",
                "Productor": "nWlVD7EM8EcRZURzfzwFtrhoNbm1",
                "FechaParto": "2023-12-01",
                "Cantidad_hijosMUERTOS": 18,
                "Cantidad_hijosTOTAL": 25,
                "Cantidad_hijosVIVOS": 7
            },
            {
                "nombreProductor": "Gandalf",
                "Productor": "nWlVD7EM8EcRZURzfzwFtrhoNbm1",
                "FechaParto": "2023-12-01",
                "Cantidad_hijosMUERTOS": 18,
                "Cantidad_hijosTOTAL": 25,
                "Cantidad_hijosVIVOS": 7
            },
]
        ];

    let data3 = [
        [
            {
                "nombreProductor": "Gandalf",
                "Productor": "xwa7j4zypqTIdkpKTm4hi5Ee8sf2",
                "FechaParto": "2023-10-01",
                "Cantidad_hijosMUERTOS": 47,
                "Cantidad_hijosTOTAL": 46,
                "Cantidad_hijosVIVOS": 58
            },
            {
                "nombreProductor": "Gandalf",
                "Productor": "nWlVD7EM8EcRZURzfzwFtrhoNbm1",
                "FechaParto": "2023-6-01",
                "Cantidad_hijosMUERTOS": 18,
                "Cantidad_hijosTOTAL": 25,
                "Cantidad_hijosVIVOS": 7
            },
            {
                "nombreProductor": "Gandalf",
                "Productor": "nWlVD7EM8EcRZURzfzwFtrhoNbm1",
                "FechaParto": "2023-12-01",
                "Cantidad_hijosMUERTOS": 18,
                "Cantidad_hijosTOTAL": 25,
                "Cantidad_hijosVIVOS": 7
            },
        ]
        ];

     console.log(selectedProductor.nombre);
     if (selectedProductor.id == 1){
        await updateChartWithData(data1);
    }
     else if (selectedProductor.id == 2){
        await updateChartWithData(data2);
    }
     else if (selectedProductor.id == 3){
        await updateChartWithData(data3);
    }

     //updateChartWithData(data3);

}