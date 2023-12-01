var theData_reg = {y: [7.79,8.54,7.92,8.88,8.44,8.28,7.91,8.84,8.31,8.38,9.37,8.62,10.17,10.2,10.01,9.43], x: [10,10.1,10.2,10.3,12,12.1,12.2,12.3,14,14.1,14.2,14.3,16,16.1,16.2,16.3], z: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
var reg_colors_array = ["#FF0000", "#1F78B4", "#B2DF8A", "#33A02C", "#FB9A99", "#E31A1C", "#FDBF6F", "#FF7F00",
"#CAB2D6", "#6A3D9A", "#FFFF99", "#B15928","#1B9E77", "#00CCCC", "#666666", "#BBBBBB"];

var slope_quad = Number(document.getElementById("slope_quad_input").value);
var int_quad = Number(document.getElementById("int_quad_input").value);
var quad_quad = Number(document.getElementById("quad_input").value);

const maxlike_quad = 0.0001161362;

var quadPoints = {
    x: theData_reg.x,
    y: theData_reg.y,
    z: theData_reg.z,
	type: 'scatter3d',
    mode: 'markers',
    marker: {
        color: reg_colors_array
    }
};

var normDistsQuad = makeNormDistQuad(theData_reg, reg_colors_array);


var likeHtsQuad = makeLikeHtsQuad(theData_reg, slope_quad, int_quad, quad_quad, reg_colors_array);

var lineLikeQuad = calcLineLikeQuad(likeHtsQuad, slope_quad, int_quad, quad_quad);

var lineColorQuad = 'rgb(' + (255*lineLikeQuad/maxlike_quad).toFixed(0) + ',0,0)';
var lineWidthQuad = 1+Math.round(9*lineLikeQuad/maxlike_quad);

var quadLine = makeQuadLine(slope_quad, int_quad, quad_quad);

quadLine.line.width = lineWidthQuad;
quadLine.line.color = lineColorQuad;


var regPlotDataQuad = [quadLine, quadPoints];

regPlotDataQuad = regPlotDataQuad.concat(normDistsQuad, likeHtsQuad);

var regLikeQuadPt = {
    x: [slope_quad],
    y: [int_quad],
    z: [quad_quad],
    type: 'scatter3d',
    mode: 'markers',
    marker: {
        color: lineColorQuad,
        size: 2*lineWidthQuad + 2
    },
    hovertemplate: 'Slope: %{x}<br>'+'Intercept: %{y}<br>'+'Quad: %{z}<br>' + 'Likelihood: ' + lineLikeQuad.toExponential(2) + '<br>Log likelihood: ' + Math.log(lineLikeQuad).toFixed(2) + '<br>-Log likelihood: ' + -1*Math.log(lineLikeQuad).toFixed(2)
}

var regLikeQuadData = [regLikeQuadPt];


var regLayoutQuad = {
    title: {
        text: '<b>Regression data</b><br>Model Likelihood: ' + lineLikeQuad.toExponential(2)
    },
    showlegend: false,
    hovermode: false,
    scene: {
        camera: {
            center: {
                x:0.006, 
                y:-0.038, 
                z:-0.140
            }, 
            eye: {
                x:-0.64, 
                y:-1.39, 
                z:0.2
            },
            up: {
                x:0,
                y:0,
                z:1
            }
        },
        aspectmode: "manual",
        aspectratio: {x:1, y: 1, z: 0.25},
        xaxis: {
        showspikes: false,
            title: {
                text: 'Predictor'
            },
            range: [9,17],
        },
        yaxis: {
        showspikes: false,
            title: {
                text: 'Response'
            }
        },
        zaxis: {
        showspikes: false,
            title: {
                text: 'Likelihood'
            }
        }
    }
}

var regQuadLikeLayout = {
    title: {
        text: 'Likelihood given all three parameters'
    },
    showlegend: false,
    showscale: false,
    scene: {
        camera: {
            center: {
                x:0.006, 
                y:-0.038, 
                z:-0.140
            }, 
            eye: {
                x:-0.64, 
                y:-1.39, 
                z:0.2
            },
            up: {
                x:0,
                y:0,
                z:1
            }
        },
        aspectmode: "manual",
        aspectratio: {x:1, y: 1, z: 0.5},
        xaxis: {
            title: {
                text: 'Slope'
            },
            range: [-3.1,0.1]
        },
        yaxis: {
            title: {
                text: 'Intercept'
            },
            range: [8,24]
        },
        zaxis: {
            title: {
                text: 'Quadratic'
            },
            range: [0,0.14]
        }
    }
}


function updateDataQuad() {

    slope_quad = Number(document.getElementById("slope_quad_input").value);
    int_quad = Number(document.getElementById("int_quad_input").value);
    quad_quad = Number(document.getElementById("quad_input").value);

    quadLine = makeQuadLine(slope_quad, int_quad, quad_quad);

    likeHtsQuad = likeHtsQuad = makeLikeHtsQuad(theData_reg, slope_quad, int_quad, quad_quad, reg_colors_array);
    lineLikeQuad = calcLineLikeQuad(likeHtsQuad, slope_quad, int_quad, quad_quad);
    lineColorQuad = 'rgb(' + (255*lineLikeQuad/maxlike_quad).toFixed(0) + ',0,0)';    
    lineWidthQuad = 1+Math.round(9*lineLikeQuad/maxlike_quad);

    quadLine.line.width = lineWidthQuad;
    quadLine.line.color = lineColorQuad;
    
    regLikeQuadData[0].marker.color = lineColorQuad;
    regLikeQuadData[0].marker.size = 2*lineWidthQuad + 2;
    regLikeQuadData[0].x[0] = slope_quad;
    regLikeQuadData[0].y[0] = int_quad;
    regLikeQuadData[0].z[0] = quad_quad;
    regLikeQuadData[0].hovertemplate = 'Slope: %{x}<br>'+'Intercept: %{y}<br>'+'Quad: %{z}<br>' + 'Likelihood: ' + lineLikeQuad.toExponential(2) + '<br>Log likelihood: ' + Math.log(lineLikeQuad).toFixed(2) + '<br>-Log likelihood: ' + -1*Math.log(lineLikeQuad).toFixed(2);
    
    regLayoutQuad.title.text = '<b>Regression data</b><br>Model Likelihood: ' + lineLikeQuad.toExponential(2);
    regPlotDataQuad = [quadLine, quadPoints];
    regPlotDataQuad = regPlotDataQuad.concat(normDistsQuad, likeHtsQuad);

}


function makeNormDistQuad(regData, colors) {
    var theData = [];
    for (j = 0; j < regData.x.length; j++) {
        var ndObj = new normCurveTraceQuad(colors[j]);
        var y = regData.y[j] - 1.8;
        for (i = 0; i < 101; i++) {
            ndObj.x.push(regData.x[j]);
            ndObj.y.push(y);
            ndObj.z.push(jStat.normal.pdf(y,regData.y[j],0.52));
            y = y + 3.6/100;
            y = Number(y.toFixed(3));
        }
        theData.push(ndObj);
    }
    return theData;
    
}


function makeLikeHtsQuad(regDat, slope_quad, int_quad, quad_quad, color) {
    var htsArray = [];
    for (j = 0; j < regDat.x.length; j++) {
        var htObj = new likeTraceQuad(color[j]);
        var pv = int_quad + slope_quad * regDat.x[j] + quad_quad * regDat.x[j] * regDat.x[j];
        var resid = regDat.y[j] - pv;
        var norm = jStat.normal.pdf(resid, 0, 0.52);
        htObj.x.push(regDat.x[j]);
        htObj.y.push(pv);
        htObj.z.push(0);
        htObj.x.push(regDat.x[j]);
        htObj.y.push(pv);
        htObj.z.push(norm);
        htsArray.push(htObj);
    }
    
    return htsArray;
}

function normCurveTraceQuad(color) {
    this.x = [];
    this.y = [];
    this.z = [];
    this.type = "scatter3d";
    this.mode = "lines";
    this.line = {color: color};
}

function likeTraceQuad(color) {
    this.x = [];
    this.y = [];
    this.z = [];
    this.type = "scatter3d";
    this.mode = "lines";
    this.line = {color: color}
}

function updateOnChangeQuad() {
    updateDataQuad();
    Plotly.newPlot("reg_quad_graph", regPlotDataQuad, regLayoutQuad);
    Plotly.newPlot('like_quad_regression', regLikeQuadData, regQuadLikeLayout);
}


function drawPlotsQuad() {
    Plotly.newPlot("reg_quad_graph", regPlotDataQuad, regLayoutQuad);
    Plotly.newPlot('like_quad_regression', regLikeQuadData, regQuadLikeLayout);
}

function calcLineLikeQuad(likeHts, slope, intercept, quad) {
    var loglike = 0;
    for (i = 0; i < likeHts.length; i++) {
        loglike = loglike + Math.log(likeHts[i].z[1]);
    }
    
    return Math.exp(loglike);
    
}

function makeQuadLine(slope_quad, int_quad, quad_quad) {
    var lineQuad = {
    x: [],
    y: [],
    z: [],
    type: 'scatter3d',
    mode: 'lines',
    line: {
            width: 1,
            color: 'FFFFFF',
        }
    }
    
    var pred = 10;
    
    for (i = 0; i < 101; i++) {
        var resp = int_quad + slope_quad*pred + quad_quad*pred*pred;
        lineQuad.x.push(pred);
        lineQuad.y.push(resp);
        lineQuad.z.push(0);
        pred = pred + 6.3/100;
    }
    
    return lineQuad;
}
