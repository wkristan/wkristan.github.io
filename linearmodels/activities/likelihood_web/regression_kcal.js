var theData_reg = {
    x: [58.58,59.68,60.69,65.28,67.5,69.5,69.6,70.64,70.65,70.78,71.5,72.33,73.23,73.32,73.46,74.91,77.2,77.28,78.01,78.86,78.89,79.1,79.11,79.8,80.09,80.32,80.54,80.8,80.85,80.96,80.97,81.58,81.71,81.83,82.25,83,83.07,83.29,83.71,83.8,84.21,84.46,84.94,85.17,85.56,85.6,85.66,85.75,85.97,86,86,86.13,86.35,86.41,86.58,86.73,87.13,87.23,87.55,87.58,87.59,87.68,87.71,87.78,87.87,87.96,88.25,88.29,88.83,88.87,88.98,89.11,89.66,89.67,89.82,90.07,90.15,90.17,90.21,90.4,90.55,90.69,90.8,90.89,90.95,91,91.02,91.38,91.4,91.4,91.45,91.6,91.6,91.69,91.81,91.85,91.87,91.91,92,92.06,92.18,92.2,92.21,92.41,92.47,92.5,92.55,92.66,92.82,93.14,93.22,93.61,93.79,93.89,94.12,94.24,94.39,94.5,94.64,95.07,95.11,95.23,95.27,95.32,95.43,95.64,95.64], 
    y: [386,413.5,405,316,380.5,298,306,290.5,267,267,262,432,243.5,241.5,251.5,230,233,222.5,188.5,210,206.5,192.5,192,189,187,181.5,178.5,176.5,183.5,182.5,176.5,111.5,168.5,177,163,158,158,150.5,150,147.5,148.5,129,122,138,135,116.5,109.5,136,128,111,129.5,129.5,124.5,116.5,122.5,122,120,119,106.5,111.5,114.5,111.5,93.5,103.5,114,91,109,107,101,102,75,103,93.5,82,93,98.5,87.5,80,80.5,78,78,72.5,67.5,83,84,70,57,79.5,62,60,78.5,59.5,67.5,77,70,73,72.5,64,59.5,58.5,64,57,80,63,49,59.5,57,49,59.5,59.5,52.5,54.5,44,52,41,49.5,41.5,46.5,42.5,38,28.5,40,41,34,41.5,36,42], 
    z: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    
};
var theRegModel = {slope: 0, intercept: 8.82, x: [10,16.3], y: [8.82, 8.82], z: [0,0]};
var reg_colors_array = ["#FF0000", "#1F78B4", "#B2DF8A", "#33A02C", "#FB9A99", "#E31A1C", "#FDBF6F", "#FF7F00",
"#CAB2D6", "#6A3D9A", "#FFFF99", "#B15928","#1B9E77", "#00CCCC", "#666666", "#BBBBBB"];
var liketype_selected_reg = document.getElementById("liketype_reg").value;
var liketype_reg_labels = {like: 'Likelihood', loglike: 'Log Likelihood', negloglike: '-Log Likelihood'};

const maxlike_reg = 0.00001311757;
const reg_sd = 0.5045583;

var points = {
    x: theData_reg.x,
    y: theData_reg.y,
    z: theData_reg.z,
	type: 'scatter3d',
    mode: 'markers',
    marker: {
        color: reg_colors_array
    }
};


var normDists = makeNormDist(theData_reg, reg_colors_array);


var likeHts = makeLikeHts(theData_reg, theRegModel, reg_colors_array);

var lineLike = calcLineLike(likeHts, theRegModel.slope, theRegModel.intercept);

var lineColor = 'rgb(' + (255*lineLike['like']/maxlike_reg).toFixed(0) + ',0,0)';
var lineWidth = 1+Math.round(9*lineLike['like']/maxlike_reg);

var likeSurfaces = makeLikeSurface();

var likeOfModel = {
    x: [theRegModel.slope],
    y: [theRegModel.intercept],
    z: [lineLike[liketype_selected_reg]],
    type: 'scatter3d',
    mode: 'markers',
    marker: {
        size: 10,
        color: 'red'
    }
}

var line = {
    x: theRegModel.x,
    y: theRegModel.y,
    z: theRegModel.z,
    type: 'scatter3d',
    mode: 'lines',
    line: {
        width: lineWidth,
        color: lineColor,
    }
}

var regPlotData = [line, points];

regPlotData = regPlotData.concat(normDists, likeHts);

var likeFormatted = 0;

if (liketype_selected_reg == 'like') {
    likeFormatted = lineLike[liketype_selected_reg].toExponential(2);
} else {
    likeFormatted = lineLike[liketype_selected_reg].toFixed(2);
}

var regLayout = {
    title: {
        text: '<b>Regression data</b><br>Model ' + liketype_reg_labels[liketype_selected_reg] + ': ' + likeFormatted
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

var regLikeLayout = {
    title: {
        text: 'Likelihood function'
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
        },
        yaxis: {
            title: {
                text: 'Intercept'
            }
        },
        zaxis: {
           showexponent: 'all',
            exponentformat: 'e',
            title: {
                text: liketype_reg_labels[liketype_selected_reg]
            }
        }
    }
}


function updateData() {
    
    liketype_selected_reg = document.getElementById("liketype_reg").value;
    
    theRegModel.slope = Number(document.getElementById("slope_input").value);
    theRegModel.intercept = Number(document.getElementById("int_input").value);
    theRegModel.y[0] = theRegModel.intercept + theRegModel.slope * theRegModel.x[0];
    theRegModel.y[1] = theRegModel.intercept + theRegModel.slope * theRegModel.x[1];
    
    line.y = theRegModel.y;

    likeHts = makeLikeHts(theData_reg, theRegModel, reg_colors_array);
    lineLike = calcLineLike(likeHts, theRegModel.slope, theRegModel.intercept);
    lineColor = 'rgb(' + (255*lineLike['like']/maxlike_reg).toFixed(0) + ',0,0)';    
    line.line.color = lineColor;
    lineWidth = 1+Math.round(9*lineLike['like']/maxlike_reg);
    line.line.width = lineWidth;
    likeSurfData = [likeSurfaces, lineLike];
    
    likeOfModel.x[0] = theRegModel.slope;
    likeOfModel.y[0] = theRegModel.intercept;
    likeOfModel.z[0] = lineLike[liketype_selected_reg];
    
    if (liketype_selected_reg == 'like') {
        likeFormatted = lineLike[liketype_selected_reg].toExponential(2);
    } else {
        likeFormatted = lineLike[liketype_selected_reg].toFixed(2);
    }
    
    regLayout.title.text = '<b>Regression data</b><br>Model ' + liketype_reg_labels[liketype_selected_reg] + ': ' + likeFormatted;
    regPlotData = [line, points];
    regPlotData = regPlotData.concat(normDists, likeHts);
    regLikeLayout.scene.zaxis.title.text = liketype_reg_labels[liketype_selected_reg];

}



function makeNormDist(regData, colors) {
    var theData = [];
    for (j = 0; j < regData.x.length; j++) {
        var ndObj = new normCurveTrace(colors[j]);
        var y = regData.y[j] - 1.8;
        for (i = 0; i < 101; i++) {
            ndObj.x.push(regData.x[j]);
            ndObj.y.push(y);
            ndObj.z.push(jStat.normal.pdf(y,regData.y[j],reg_sd));
            y = y + 3.6/100;
            y = Number(y.toFixed(3));
        }
        theData.push(ndObj);
    }
    return theData;
    
}


function makeLikeHts(regDat, regMod, color) {
    var htsArray = [];
    for (j = 0; j < regDat.x.length; j++) {
        var htObj = new likeTrace(color[j]);
        var pv = regMod.intercept + regMod.slope * regDat.x[j];
        var resid = regDat.y[j] - pv;
        var norm = jStat.normal.pdf(resid, 0, reg_sd);
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

function normCurveTrace(color) {
    this.x = [];
    this.y = [];
    this.z = [];
    this.type = "scatter3d";
    this.mode = "lines";
    this.line = {color: color};
}

function likeTrace(color) {
    this.x = [];
    this.y = [];
    this.z = [];
    this.type = "scatter3d";
    this.mode = "lines";
    this.line = {color: color}
}

function updateOnChange() {
    updateData();
    drawRegPlots();

}

function makeLikeSurface() {
    var likeSurf = {x: [], y: [], z: [], showscale: false, opacity: 0.5, name: '', type: 'surface', hovertemplate: 'Slope: %{x}<br>'+'Intercept: %{y}<br>'+'Likelihood: %{z:.2e}'};
    var loglikeSurf = {x: [], y: [], z: [], showscale: false, opacity: 0.5, name: '', type: 'surface', hovertemplate: 'Slope: %{x}<br>'+'Intercept: %{y}<br>'+'Log Likelihood: %{z}'};
    var negloglikeSurf = {x: [], y: [], z: [], showscale: false, opacity: 0.5, name: '', type: 'surface', hovertemplate: 'Slope: %{x}<br>'+'Intercept: %{y}<br>'+'-Log Likelihood: %{z}'};
    var slope = 0.0668;
    var int = 3.3;
    for (i = 0; i < 101; i++) {
        likeSurf.x.push(slope);
        likeSurf.y.push(int);
        loglikeSurf.x.push(slope);
        loglikeSurf.y.push(int);
        negloglikeSurf.x.push(slope);
        negloglikeSurf.y.push(int);
        slope = slope + 0.4/100;
        int = int + 4/100;
    }
    for (i = 0; i < likeSurf.x.length; i++) {
        slope = likeSurf.x[i];
        var likeForThisSlope = [];
        var loglikeForThisSlope = [];
        var negloglikeForThisSlope = [];
        for (j = 0; j < likeSurf.y.length; j++) {
            var loglike = 0;
            int = likeSurf.y[j];
            for (k = 0; k < theData_reg.x.length; k++) {
                var pv = int + slope * theData_reg.x[k];
                var resid = theData_reg.y[k] - pv;
                var logdens = Math.log(jStat.normal.pdf(resid,0,reg_sd));
                loglike = logdens + loglike;
            }
            likeForThisSlope.push(Math.exp(loglike));
            loglikeForThisSlope.push(loglike);
            negloglikeForThisSlope.push(-loglike); 
        }
        likeSurf.z.push(likeForThisSlope);
        loglikeSurf.z.push(loglikeForThisSlope);
        negloglikeSurf.z.push(negloglikeForThisSlope);
    }
    
    var likeSurfs = {like: likeSurf, loglike: loglikeSurf, negloglike: negloglikeSurf};
    
    return likeSurfs;
}


function drawRegPlots() {

    Plotly.newPlot("regression_graph", regPlotData, regLayout);
    Plotly.newPlot('likelihood_regression', [likeSurfaces[liketype_selected_reg], likeOfModel], regLikeLayout);
}

function calcLineLike(likeHts, slope, intercept) {
    var modelLikes = {like: 0, loglike: 0, negloglike: 0};
    var loglike = 0;
    for (i = 0; i < likeHts.length; i++) {
        loglike = loglike + Math.log(likeHts[i].z[1]);
    }
    
    modelLikes.like = Math.exp(loglike);
    modelLikes.loglike = loglike;
    modelLikes.negloglike = -loglike;
    
    return modelLikes;
    
}
