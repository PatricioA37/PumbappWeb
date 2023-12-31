'use strict';
setTimeout(function () {

    (function () {
        var options = {
            chart: {
                height: 300,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false,
                width: 2,
            },
            stroke: {
                curve: 'straight',
            },
            colors: ["#7267EF"],
            series: [{
                name: "Desktops",
                data: [80, 41, 35, 51, 49, 62, 69, 91, 148,40,13,58]
            }],
            title: {
                text: 'Cantidad total de Lechones por productor',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f6ff', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Enero', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'oct','Nov','Dic'],
            }
        }

        var chart = new ApexCharts(
            document.querySelector("#line-chart-1"),
            options
        );
        chart.render();


    })();


    (function () {
        var options = {
            chart: {
                height: 350,
                type: 'area',
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            colors: ["#ffa21d", "#EA4D4D"],
            series: [{
                name: 'Natalidad',
                data: [31, 40, 28, 51, 42, 109, 100]
            }, {
                name: 'Mortalidad',
                data: [11, 32, 45, 32, 34, 52, 41]
            }],

            xaxis: {
                type: 'datetime',
                categories: ["2018-09-19T00:00:00", "2018-09-19T01:30:00", "2018-09-19T02:30:00", "2018-09-19T03:30:00", "2018-09-19T04:30:00", "2018-09-19T05:30:00", "2018-09-19T06:30:00"],
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            }
        }

        var chart = new ApexCharts(
            document.querySelector("#area-chart-1"),
            options
        );

        chart.render();
    })();

  // (function () {
  //     var options = {
  //         chart: {
  //             height: 350,
  //             type: 'bar',
  //         },
  //         plotOptions: {
  //             bar: {
  //                 horizontal: false,
  //                 columnWidth: '55%',
  //                 endingShape: 'rounded'
  //             },
  //         },
  //         dataLabels: {
  //             enabled: false
  //         },
  //         colors: ["#0e9e4a", "#7267EF", "#EA4D4D","#ffa21d"],
  //         stroke: {
  //             show: true,
  //             width: 2,
  //             colors: ['transparent']
  //         },
  //         series: [{
  //             name: 'Verracos',
  //             data: [44, 55, 57, 56, 61, 58, 63,56,23,65,24,64]
  //         }, {
  //             name: 'Marranas',
  //             data: [76, 85, 101, 98, 87, 105, 91,14,65,23,5,52]
  //         }, {
  //             name: 'Lechon',
  //             data: [35, 41, 36, 26, 45, 48, 52,62,12,63,74,23]
  //         },{
  //             name: 'Al destete',
  //             data: [35, 41, 36, 26, 45, 48, 52,14,63,25,12,53]

  //         }],
  //         xaxis: {
  //             categories: ['Ene', 'Feb', 'Marz', 'Abr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dic'],
  //         },
  //         yaxis: {
  //             title: {
  //                 text: 'Cantidad)'
  //             }
  //         },
  //         fill: {
  //             opacity: 1

  //         },
  //         tooltip: {
  //             y: {
  //                 formatter: function (val) {
  //                     return  val + " Cantidad"
  //                 }
  //             }
  //         }
  //     }
  //     var chart = new ApexCharts(
  //         document.querySelector("#bar-chart-1"),
  //         options
  //     );
  //     chart.render();
  //  })();

    (function () {
        var options = {
            chart: {
                height: 320,
                type: 'pie',
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            series: [44, 55, 13, 43, 22],
            colors: ["#7267EF", "#0e9e4a", "#3ec9d6", "#ffa21d", "#EA4D4D"],
            legend: {
                show: true,
                position: 'bottom',
            },
            dataLabels: {
                enabled: true,
                dropShadow: {
                    enabled: false,
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }
        var chart = new ApexCharts(
            document.querySelector("#pie-chart-1"),
            options
        );
        chart.render();
    })();


    (function () {
        var options = {
            chart: {
                height: 320,
                type: 'donut',
            },
            labels: ['Verracos', 'Marranas', 'Lechones', 'Al destete'],
            series: [44, 55, 41, 17],
            colors: ["#7267EF", "#0e9e4a", "#3ec9d6", "#ffa21d"],
            legend: {
                show: true,
                position: 'bottom',
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            name: {
                                show: true
                            },
                            value: {
                                show: true
                            }
                        }
                    }
                }
            },
            dataLabels: {
                enabled: true,
                dropShadow: {
                    enabled: false,
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }
        var chart = new ApexCharts(
            document.querySelector("#pie-chart-2"),
            options
        );
        chart.render();
    })();
}, 700);
