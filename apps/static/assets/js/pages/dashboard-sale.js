'use strict';
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        floatchart()
    }, 700);
    // [ campaign-scroll ] start
    var px = new PerfectScrollbar('.feed-scroll', {
        wheelSpeed: .5,
        swipeEasing: 0,
        wheelPropagation: 1,
        minScrollbarLength: 40,
    });
    var px = new PerfectScrollbar('.pro-scroll', {
        wheelSpeed: .5,
        swipeEasing: 0,
        wheelPropagation: 1,
        minScrollbarLength: 40,
    });
    // [ campaign-scroll ] end
});

function floatchart() {
    // [ support-chart ] start
    (function () {
        var options1 = {
            chart: {
                type: 'area',
                height: 85,
                sparkline: {
                    enabled: true
                }
            },
            colors: ["#7267EF"],
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            series: [{
                data: [0, 20, 10, 45, 30, 55, 20, 30, 0]
            }],
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return 'Ticket '
                        }
                    }
                },
                marker: {
                    show: false
                }
            }
        }
        new ApexCharts(document.querySelector("#support-chart"), options1).render();

        var options2 = {
            chart: {
                type: 'bar',
                height: 85,
                sparkline: {
                    enabled: true
                }
            },
            colors: ["#7267EF"],
            plotOptions: {
                bar: {
                    columnWidth: '70%'
                }
            },
            series: [{
                data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54, 44, 12, 36, 9, 54, 25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 25, 44, 12, 36, 9, 54]
            }],
            xaxis: {
                crosshairs: {
                    width: 1
                },
            },
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return ''
                        }
                    }
                },
                marker: {
                    show: false
                }
            }
        }
        new ApexCharts(document.querySelector("#support-chart1"), options2).render();
    })();
    // [ support-chart ] end




    //funcion rellenar tabla


    // Llamar a la función para cargar y mostrar la tabla

    //tablaProductores();





    // [ satisfaction-chart ] start
    (function () {
        var options = {
            chart: {
                height: 260,
                type: 'pie',
            },
            series: [66, 50, 40, 30],
            labels: ["extremely Satisfied", "Satisfied", "Poor", "Very Poor"],
            legend: {
                show: true,
                offsetY: 50,
            },
            dataLabels: {
                enabled: true,
                dropShadow: {
                    enabled: false,
                }
            },
            theme: {
                monochrome: {
                    enabled: true,
                    color: '#7267EF',
                }
            },
            responsive: [{
                breakpoint: 768,
                options: {
                    chart: {
                        height: 320,

                    },
                    legend: {
                        position: 'bottom',
                        offsetY: 0,
                    }
                }
            }]
        }
        var chart = new ApexCharts(document.querySelector("#satisfaction-chart"), options);
        chart.render();
    })();
    // [ satisfaction-chart ] end
}'use strict';
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        floatchart()
    }, 700);
    // [ campaign-scroll ] start
    var px = new PerfectScrollbar('.feed-scroll', {
        wheelSpeed: .5,
        swipeEasing: 0,
        wheelPropagation: 1,
        minScrollbarLength: 40,
    });
    var px = new PerfectScrollbar('.pro-scroll', {
        wheelSpeed: .5,
        swipeEasing: 0,
        wheelPropagation: 1,
        minScrollbarLength: 40,
    });
    // [ campaign-scroll ] end
});

function floatchart() {
    // [ support-chart ] start
    (function () {
        var options1 = {
            chart: {
                type: 'area',
                height: 85,
                sparkline: {
                    enabled: true
                }
            },
            colors: ["#7267EF"],
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            series: [{
                data: [0, 20, 10, 45, 30, 55, 20, 30, 0]
            }],
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return 'Ticket '
                        }
                    }
                },
                marker: {
                    show: false
                }
            }
        }
        new ApexCharts(document.querySelector("#support-chart"), options1).render();

        var options2 = {
            chart: {
                type: 'bar',
                height: 85,
                sparkline: {
                    enabled: true
                }
            },
            colors: ["#7267EF"],
            plotOptions: {
                bar: {
                    columnWidth: '70%'
                }
            },
            series: [{
                data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54, 44, 12, 36, 9, 54, 25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 25, 44, 12, 36, 9, 54]
            }],
            xaxis: {
                crosshairs: {
                    width: 1
                },
            },
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return ''
                        }
                    }
                },
                marker: {
                    show: false
                }
            }
        }
        new ApexCharts(document.querySelector("#support-chart1"), options2).render();
    })();
    // [ support-chart ] end
    // [ account-chart ] start





   (function () {
    // Obtener datos del servidor usando fetch con una URL
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

            const productoresUnicos = obtenerProductoresUnicos(jsonData);

            // Actualizar la lista desplegable con los productores
            actualizarListaDesplegable(productoresUnicos);

        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    }

    // Función para actualizar el gráfico con datos JSON
   async function updateChartWithData(datosJson,productorSeleccionadoId) {
        // Procesar datos para el gráfico
        var dataForChart = {
            cantidadMensualNatalicios: [],
            promedioNatalidadGlobal: []
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

        // Función para filtrar los objetos por el nombre del productor
     async  function obtenerProductoresUnicos(datosJson) {
       // Implementar lógica para obtener una lista de productores únicos
       // Puedes usar un Set para garantizar que no haya duplicados
       const productoresSet = new Set();

       datosJson.forEach(function (productores) {
           productores.forEach(function (registroParto) {
               productoresSet.add(registroParto.nombreProductor);
           });
       });

       return Array.from(productoresSet);
   }

     // Función para desplegar el nombre del productor en una lista seleccionable
   async function actualizarListaDesplegable(productores) {
       const selectProductor = document.getElementById('selectProductor');

       // Limpiar las opciones existentes
       selectProductor.innerHTML = '';

       // Agregar una opción por cada productor
       productores.forEach(function (productor) {
           const option = document.createElement('option');
           option.value = productor;
           option.text = productor;
           selectProductor.add(option);
       });
       }

       async function onProductorSelected() {
       const selectProductor = document.getElementById('selectProductor');
       const productorSeleccionado = selectProductor.value;


       // Volver a llamar a la función de actualización del gráfico con el productor seleccionado
       updateChartWithData(jsonData, productorSeleccionado);
         }


        // Configuración del gráfico
        var options = {
            chart: {
                height: 350,
                type: 'line',
                stacked: false,
            },
            stroke: {
                width: [0, 3],
                curve: 'smooth'
            },
            plotOptions: {
                bar: {
                    columnWidth: '50%'
                }
            },
            colors: ['#7267EF', '#118f17'],
            series: [
                {
                    name: 'Cantidad Mensual Natalicios por Productor',
                    type: 'column',
                    data: dataForChart.cantidadMensualNatalicios
                },
                {
                    name: 'Promedio Natalidad Global',
                    type: 'line',
                    data: dataForChart.promedioNatalidadGlobal
                }
            ],
            markers: {
                size: 0
            },
            xaxis: {
                type: 'datetime',
                categories: ['01/01/2023', '02/01/2023', '03/01/2023', '04/01/2023', '05/01/2023', '06/01/2023', '07/01/2023', '08/01/2023', '09/01/2023', '10/01/2023', '11/01/2023', '12/01/2023']
            },
            fill: {
                opacity: [0.85, 1],
            },
            yaxis: {
                min: 0
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function (y) {
                        if (typeof y !== "undefined") {
                            return " " + y.toFixed(0);
                        }
                        return y;
                    }
                }
            },
            legend: {
                labels: {
                    useSeriesColors: true
                },
                markers: {
                    customHTML: [
                        function () {
                            return ''
                        },
                        function () {
                            return ''
                        }
                    ]
                }
            }
        };

        // Crear el gráfico
        var chart = new ApexCharts(
            document.querySelector("#account-chart"),
            options
        );

        // Renderizar el gráfico
        chart.render();
    }

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
                height: 260,
                type: 'pie',
            },
            series: [66, 50, 40, 30],
            labels: ["extremely Satisfied", "Satisfied", "Poor", "Very Poor"],
            legend: {
                show: true,
                offsetY: 50,
            },
            dataLabels: {
                enabled: true,
                dropShadow: {
                    enabled: false,
                }
            },
            theme: {
                monochrome: {
                    enabled: true,
                    color: '#7267EF',
                }
            },
            responsive: [{
                breakpoint: 768,
                options: {
                    chart: {
                        height: 320,

                    },
                    legend: {
                        position: 'bottom',
                        offsetY: 0,
                    }
                }
            }]
        }
        var chart = new ApexCharts(document.querySelector("#satisfaction-chart"), options);
        chart.render();
    })();
    // [ satisfaction-chart ] end
}