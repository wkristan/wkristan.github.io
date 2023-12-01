var theData_reg = {y: [7.79,8.54,7.92,8.88,8.44,8.28,7.91,8.84,8.31,8.38,9.37,8.62,10.17,10.2,10.01,9.43], x: [10,10.1,10.2,10.3,12,12.1,12.2,12.3,14,14.1,14.2,14.3,16,16.1,16.2,16.3], z: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
var theRegModel = {slope: 0, intercept: 8.756, x: [10,16.3], y: [8.756, 8.756], z: [0,0]};
var reg_colors_array = ["#FF0000", "#1F78B4", "#B2DF8A", "#33A02C", "#FB9A99", "#E31A1C", "#FDBF6F", "#FF7F00",
"#CAB2D6", "#6A3D9A", "#FFFF99", "#B15928","#1B9E77", "#00CCCC", "#666666", "#BBBBBB"];
var liketype_selected_reg = document.getElementById("liketype_reg").value;
var liketype_reg_labels = {like: 'Likelihood', loglike: 'Log Likelihood', negloglike: '-Log Likelihood'};

const maxlike_reg = 0.00000725;

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
            title: {
                text: 'Predictor'
            },
            range: [9,17],
        },
        yaxis: {
            title: {
                text: 'Response'
            }
        },
        zaxis: {
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
            ndObj.z.push(jStat.normal.pdf(y,regData.y[j],0.52));
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
                var logdens = Math.log(jStat.normal.pdf(resid,0,0.52));
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
    Plotly.newPlot('likelihood_regression', [likeSurfaces[liketype_selected_reg]], regLikeLayout);
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
