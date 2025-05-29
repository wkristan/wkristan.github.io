

function drawChart() {


    var directions = makeDirectionData();
    var mean_data = makeMeanDirection(directions);
    
    mean_data.unshift(directions);
    
    var layout = {
        title: "Direction flown at release",
        showlegend: true,
        polar: {
            radialaxis: {
                range: [0,1],
                visible: false
            },
            angularaxis: {
                tickfont: {
                    size: 10
                },
                direction: "clockwise"
            }
        }
    }
        

    Plotly.newPlot('chart_div', mean_data, layout);

}
      
  
function makeDirectionData() {
    var r = [];
    var theta = [];
    
    for (var i = 0; i < 10; i++) {
        theta.push(jStat.normal.sample(0,10));
        r.push(1);
    }
    
    for (var i = 0; i < theta.length; i++) {
        if(theta[i] < 0) {
            theta[i] = 360 + theta[i];
        } 
    }
    
    var dirDat = {
        showlegend: false,
        type: "scatterpolar", 
        mode: "markers", 
        r: r, 
        theta: theta, 
        marker: {
            color: 'green', 
            size: 10}
    };
    return dirDat;
}

function makeMeanDirection(directions) {
    var r_meanangle = [0];
    var theta_meanangle = [0];
    var r_angular = [0];
    var theta_angular = [0];
    
    var sum_mean = 0;
    var n = directions.theta.length;
    
    var sum_sin = 0;
    var mean_sin = 0;
    var sum_cos = 0;
    var mean_cos = 0;
    
    for (var i = 0; i < directions.theta.length; i++) {
        sum_mean = sum_mean + directions.theta[i];
        sum_sin = sum_sin + Math.sin(directions.theta[i]*Math.PI/180);
        sum_cos = sum_cos + Math.cos(directions.theta[i]*Math.PI/180);
    }
    
    theta_meanangle.push(sum_mean/n);
    r_meanangle.push(1);
    
    mean_sin = sum_sin/n;
    mean_cos = sum_cos/n;
    
    var atan_theta = 180*Math.atan(mean_sin/mean_cos)/Math.PI;
    
    theta_angular.push(atan_theta);
    r_angular.push(1);

    var meanDat = [{name: 'Mean angle (wrong)', type: "scatterpolar", mode: "lines+markers", r: r_meanangle, theta: theta_meanangle, marker: {color: 'red', size: 12}},
    {name: 'Angular mean (right)', type: "scatterpolar", mode: "lines+markers", r: r_angular, theta: theta_angular, marker: {color: 'blue', size: 12}}];
    return meanDat;    
    
}
