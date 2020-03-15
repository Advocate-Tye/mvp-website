Chart.defaults.global.tooltips.backgroundColor = "rgba(255, 36, 72, 1)";
// Chart.defaults.global.defaultFontColor = "gray";
// Chart.defaults.global.defaultFontFamily = "Open Sans Condensed";
// Chart.defaults.global.defaultFontSize = 14;


// WebFont.load({
//     google: {
//         families: ['Condensed', 'Futura BT']
//     }
// });
var ctx = document.getElementById('myChart').getContext("2d");
var gradientColor = ctx.createLinearGradient(90, 500, 0, 100, 0);
gradientColor.addColorStop(0.2, "rgba(255, 36, 72, 0)");
gradientColor.addColorStop(1, "rgba(255, 36, 72, .4)");



var pointsChart = new Chart(ctx, {
    type: 'line',
    data: {

    labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
    datasets: [{
      label: ' - Points earned',
      data: [20, 10, 14, 52, 23, 23, 40],
      borderColor: "rgba(255, 36, 72, 1)",
      //fill: false,
      backgroundColor: gradientColor,
      borderWidth: 3,
      spanGaps: false,


    }]
    },
 options: {
   tooltips: {
     displayColors : false,
               callbacks: {


                label: function(tooltipItem, data) {
                    var label = ' '
                    label += Math.round(tooltipItem.yLabel * 100) / 100;
                    return label;
                }
            }
 },
        scales: {
            xAxes: [{
               gridLines: {
              display: false
            },
            }],
            yAxes: [{

                ticks: {
                    beginAtZero: true
                }
            }]
        },
      legend:{
        position: 'bottom',
        align: 'center',
        labels: {
        boxWidth : 20,
         fontSize : 14,
      },
      }
    }
});


var ctx = document.getElementById('myChart2').getContext("2d");
var salesChart = new Chart(ctx, {
    type: 'line',
    data: {

    labels: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
    datasets: [{
      label: ' - Product One',
      data: [20, 10, 14, 52, 23, 23, 40],
      borderColor: "rgba(36, 255, 72, 1)",
      fill: false,
      backgroundColor: "rgba(36, 255, 72, 1)",
      borderWidth: 3,
      spanGaps: false,


    },
       {
      label: ' - Product Two',
      data: [12, 9, 16, 53, 20, 12, 14],
      borderColor: "rgba(72, 36, 255, 1)",
      fill: false,
backgroundColor: "rgba(72, 36, 255, 1)",
      borderWidth: 3,
      spanGaps: false,


    },
               {
      label: ' - Product Three',
      data: [26, 10, 12, 15, 12, 2, 14],
      borderColor: "rgba(255, 72, 36, 1)",
      fill: false,
      backgroundColor: "rgba(255, 72, 36, 1)",
      borderWidth: 3,
      spanGaps: false,


    }
              ]
    },
 options: {
   tooltips: {
     // displayColors : false,
               callbacks: {


                // label: function(tooltipItem, data) {
                //     var label = ' '
                //     label += Math.round(tooltipItem.yLabel * 100) / 100;
                //     return label;
                // }
            }
 },
        scales: {
            xAxes: [{
               gridLines: {
              display: false
            },
            }],
            yAxes: [{

                ticks: {
                    beginAtZero: true
                }
            }]
        },
      legend:{
        position: 'bottom',
        align: 'center',
        labels: {
        boxWidth : 20,
         fontSize : 14,
      },
      }
    }
});
