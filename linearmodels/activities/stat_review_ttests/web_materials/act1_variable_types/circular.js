
function drawChart() {
    
var circ_data = makeCirc();    

var data = [
    {
      type: "scatterpolar",
      mode: "markers",
      name: "Observed data",
      r: circ_data.r,
      theta: circ_data.theta,
      marker: {
        color: "#8090c7",
        symbol: "circle",
        size: 8
      },
      showlegend: false
    },
    {
      type: "scatterpolar",
      mode: "lines+markers",
      name: "Mean angle",
      r: [0,1],
      theta: [0,circ_data.mean_angle],
      marker: {
        color: "#00FF00",
        symbol: "circle",
        size: 10
      },
    },
    {
      type: "scatterpolar",
      mode: "lines+markers",
      name: "Mean direction",
      r: [0,1],
      theta: [0,circ_data.mean_dir],
      marker: {
        color: "red",
        symbol: "circle",
        size: 8
      },
    }
  ]

var layout = {
      polar: {
          radialaxis: {
              visible: false,
        },
          angularaxis: {
            tickfont: {
                    size: 8
                },
            direction: "clockwise",
            },
        showlegend: false
    }
}

Plotly.newPlot('chart_div', data, layout)

var pause_here = 0;
}
      
  
      
function makeCirc() {
//first make the circle
    
    var theta = [];

// Now make the random points, and add them as interval data to the data set
    
    var angle_sum = 0;
    var angle_deg = 0;
    var xcomp_sum = 0;
    var ycomp_sum = 0;
    var angle_deg_360 = 0
    
    for (var i = 0; i<10; i++) {
        angle_deg = Number(jStat.normal.sample(0,30).toFixed(0));
        if (angle_deg < 0) {
            angle_deg_360 = angle_deg + 360;
        } else {
            angle_deg_360 = angle_deg;
        }
        xcomp_sum = xcomp_sum + Math.sin(2*Math.PI*angle_deg/360);
        ycomp_sum = ycomp_sum + Math.cos(2*Math.PI*angle_deg/360);
        theta.push(angle_deg);
        angle_sum = angle_sum + angle_deg_360;
    }
    

    // Calculate some stats, add lines for the correct and incorrect means
        var angle_mean = angle_sum/10;
        var xcomp_mean = xcomp_sum/10;
        var ycomp_mean = ycomp_sum/10;
        var atan_means = Math.atan(xcomp_mean/ycomp_mean);
        var mean_dir = 0;
        if (xcomp_mean >= 0 && ycomp_mean >= 0) {
            mean_dir = 360*atan_means/(2*Math.PI);
        } else if (ycomp_mean < 0) {
            mean_dir = 180+360*atan_means/(2*Math.PI);
        } else {
            mean_dir = 360 + 360*atan_means/(2*Math.PI);
        }        

       var data = {r: [1,1,1,1,1,1,1,1,1,1], theta: theta, mean_angle: angle_mean, mean_dir: mean_dir};
       return data;
    }

