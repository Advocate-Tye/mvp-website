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
      data: [100, 120, 100, 140, 230, 230, 312],
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
      label: ' - Butterbeer',
      data: [2, 9, 6, 3, 4, 2, 4],
      borderColor: "rgba(36, 255, 72, 1)",
      fill: false,
      backgroundColor: "rgba(36, 255, 72, 1)",
      borderWidth: 3,
      spanGaps: false,


    },
       {
      label: ' - Roast hog',
      data: [6, 1, 2, 5, 2, 2, 4],
      borderColor: "rgba(72, 36, 255, 1)",
      fill: false,
backgroundColor: "rgba(72, 36, 255, 1)",
      borderWidth: 3,
      spanGaps: false,


    },
               {
      label: ' - Apple pie',
      data: [5, 2, 4, 2, 3, 3, 8],
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

$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

});
