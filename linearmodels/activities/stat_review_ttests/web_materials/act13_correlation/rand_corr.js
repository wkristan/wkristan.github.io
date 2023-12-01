

var orig_dat = {diameter: [12.09,11.94,10.79,7.49,12.68,10.57,9.35,12.25,10.85,9.69,9.28,12.17,9.99,11.02,9.49,8.84,10.77,11.56,7.26,10.07,12.2,7.64,10.21,10.46,10.91,9.8,12.28,12.98,5.8,5.77,7.66,11.05,10.32,9.98,9.26,9.41,8.52,11.29,13.26,9.78,7.76,9.72,9.28,11.25,9.44,9.43,11.06,8.74,9.39,8.52,6.12,9.75,10.81,7.93,11.43,9.08,12.24,11.3,8.95,8.39,11.24,9.02,11.11,7.23,11.46,9.82,11.35,9.48,10.57,8.68,8.75,10.51,6.46,6.93,10.06,10.04,11.27,9.95,11.78,8.7,5.45,10.84,8.15,11.34,11.39,9.64,9.42,8.88,9.71,10.16,12.59,7.73,10.28,12.69,8.97,8.43,9.18,12.05,11.6,13.18], height: [120.84,103.55,99.21,84.61,103.74,104.78,104.94,111.64,101.16,107.19,99.04,116.3,96.89,96.19,103.55,92.65,98.5,101.39,84.03,96.33,99.82,76.93,92.27,100.44,107.22,100.94,95.56,112.6,79.93,84.52,88.72,111.17,110.55,106.23,95.92,93.97,93.95,101.72,109.81,101.5,95.18,102.92,85.04,104.97,105.1,91.18,99.26,104.91,105.84,106.78,86.98,91.57,106.8,106.12,106.04,102.88,99.84,118.38,97.55,104.23,97.89,100.09,93.02,95.46,111.66,97.56,107.12,94.85,102.69,104.42,91.67,103.13,84.79,83.25,98.24,102.51,103.45,99.4,106.57,93.81,85.83,100.5,99.58,103.54,107.01,107.62,92.52,110.39,103.08,103.67,118.84,81.95,101.54,109.24,95.57,94,91.58,107.91,94.84,110.87]};

function drawCharts() {
    drawChart(orig_dat);
    drawChart2();
    
}
        
function drawChart(thedata) {

    var trace = {
        x: thedata.diameter,
        y: thedata.height,
        type: "scatter",
        mode: "markers"
    }
    
    var layout = {
        xaxis: {
            title: {
                text: "Diameter"
            },
            range: [0,20]
        }
        ,
        yaxis: {
            title: {
                text: "Height"
            },
            range: [60,140]
        }
        
    }
    
    var data = [trace];

    Plotly.newPlot("chart_div", data, layout);
}
      
      
function randData(n){
       var dat = [];
       var j = 0;
       var k = 0;
       for(var i=0; i<n; i++){
            j = jStat.normal.inv(Math.random(),9.9, 2);
            k = jStat.normal.inv(Math.random(),100, 10);
            dat.push([j , k]);
       }
       return dat;
    }
    

function getSeq(data, ind) {
    var dat = [];
    for(var i = 0; i < data.length;i++){
        dat.push(data[i][ind]);
    }
    return dat;
}
              
              
function updateChart() {
    var n = Number(document.getElementById('samplesize').value);
    var dataArray = randData(n);
    var x = getSeq(dataArray,0);
    var y = getSeq(dataArray,1);
    var corrData = jStat.corrcoeff(x,y);
    var thedata = {diameter: x, height: y};
    document.getElementById("correl").innerHTML = corrData.toFixed(3);
    drawChart(thedata);
};

// Stuff needed to draw a chart of specified correlation.

function drawChart2() {

    var r_spec = Number(document.getElementById("r_val").value);
    var chol = [r_spec, Math.sqrt(1-(r_spec*r_spec))];
    var rand_x = randDataOneVar(1000, 0, 1);
    var rand_y = randDataOneVar(1000, 0, 1);
    var y_projected = projChol(rand_x, rand_y, chol);
    var rand_diam = scale(rand_x, 9.9, 2);
    var rand_height = scale(y_projected, 100, 10);
    
    var trace = {
        x: rand_diam,
        y: rand_height,
        type: "scatter",
        mode: "markers"
    }
    
    var data = [trace];
    
    var layout = {
        xaxis: {
            title: {
                text: "Diameter"
            },
            range: [0,20]
        },
        yaxis: {
            title: {
                text: "Height"
            },
            range: [50,150]
        }
    }

    Plotly.newPlot("chart_div2", data, layout);
}
            
function randDataOneVar(n, m, s){
       var dat = [];
       var j = 0;
       for(var i=0; i<n; i++){
            j = jStat.normal.inv(Math.random(), m, s);
            dat.push(j);
       }
       return dat;
    }

function projChol(dat1, dat2, chol) {
    var dat_projected = [];
    for (var i = 0; i < dat1.length; i++) {
        dat_projected.push(dat1[i]*chol[0] + dat2[i]*chol[1]);
    }
    return dat_projected;
}


function scale(dat, m, s) {
    var dat_scaled = [];
    for (var i = 0; i < dat.length; i++) {
        dat_scaled.push(dat[i]*s+m);
    }
    return dat_scaled;
}
