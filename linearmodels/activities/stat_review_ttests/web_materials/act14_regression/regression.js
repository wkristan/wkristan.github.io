function drawCharts() {
    drawChart2();
    drawChart1();
}

var xdata = [0,0,0,0,0,10,10,10,10,10,20,20,20,20,20,30,30,30,30,30,40,40,40,40,40];
var ydata = [0.0861,0.0651,0.0941,0.0717,0.1416,0.255,0.1711,0.2025,0.1569,0.1621,0.3051,0.2967,0.3118,0.3462,0.2934,0.4244,0.3979,0.3697,0.378,0.4298,0.562,0.548,0.4598,0.4956,0.5497];
var x_for_line = [0, 40];
var y_for_line = [0.303, 0.303];

var best = {x: [0,40], y: [0.088, 0.518], slope: 0.0107, intercept: 0.0883};

var best_line = {
    x: best.x,
    y: best.y,
    type: "scatter",
    mode: "lines",
    name: "Best fit",
    visible: "legendonly"
}

        
function drawChart1() {
    
    var pts = {
        x: xdata,
        y: ydata,
        type: "scatter",
        mode: "markers",
        showlegend: false
    }
    
    var your_line = {
        x: x_for_line,
        y: y_for_line,
        type: "scatter",
        mode: "lines",
        name: "Your line"
    }
    
    var data = [pts, your_line, best_line];
    
    var layout = {
        title: {
            text: "Absorbance"
        }
    }

    Plotly.newPlot("chart_div1", data, layout);
        
}
        
      
function makeYourLine() {
    var slope = Number(document.getElementById("slope").value);
    var int = Number(document.getElementById("int").value);
    
    document.getElementById("cur_slope").innerHTML = slope;
    document.getElementById("cur_int").innerHTML = int;
    
    for (i = 0; i < x_for_line.length; i++){
        y_for_line[i] = slope*x_for_line[i] + int;
    }
    
    drawChart1();
    
    

}

function reveal() {
    best_line.visible = true;
    drawChart1();
    document.getElementById("best_eqn").innerHTML = "Absorbance = " + best.slope + " Concentration + " + best.intercept;
}

        
function reset() {
    document.getElementById("slope").value = 0;
    document.getElementById("int").value = 0.3;
    document.getElementById("best_eqn").innerHTML = "";
    best_line.visible = "legendonly";
    makeYourLine();
            
}


function drawChart2() {
    var rand_line = makeRand();
    
    var pts = {
        x: xdata,
        y: rand_line.absorbance,
        type: "scatter",
        mode: "markers"
    }
    
    var pred = {
        x: rand_line.xpred,
        y: rand_line.ypred,
        type: "scatter",
        mode: "lines"
    }
    
    var data = [pts, pred];
    
    var layout = {
        xaxis: {
            title: {
                text: "Concentration"
            }
        },
        yaxis: {
            title: {
                text: "Absorbance"
            },
            range: [0.15,0.45]
        },
        showlegend: false
    }
    
    Plotly.newPlot("chart_div2", data, layout);
        
document.getElementById("rand_eqn").innerHTML = "Absorbance = " + rand_line.slope.toFixed(5) + " Concentration + " + rand_line.int.toFixed(3);
      }
      
function makeRand() {
    var ydat = [];
    var xpred = [0,40];
    var ypred = [];

    for (var i = 0; i<25; i++) {
        var y = jStat.normal.sample(0.303, 0.032);
        ydat.push(y);
    }
    
    var corrxy = jStat.corrcoeff(xdata, ydat);
    var ysd = jStat.stdev(ydat,true);
    var xsd = jStat.stdev(xdata,true);
    var ymean = jStat.mean(ydat);
    var slope = corrxy*ysd/xsd;
    var int = ymean - slope * 20;
    
    for (var i = 0; i < xpred.length; i++){
        ypred.push(slope * xpred[i] + int);
    }
    
    var rand_line = {slope: slope, int: int, absorbance: ydat, xpred: xpred, ypred: ypred}
    
    return rand_line;
}
