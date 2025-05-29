var theData = {history: ["01","10","11","00"], obs: [76,48,23,0], p_ch: [0,0,0,0], exp: [0,0,0,0]};
var liketype_selected_mult = document.getElementById("liketype_multinom").value;
var liketype_mult_labels = {like: 'Likelihood', loglike: 'Log Likelihood', negloglike: '-Log Likelihood'};
var p = Number(document.getElementById("p_input").value);
var f00 = Number(document.getElementById("f00_input").value);

theData.obs[3] = f00;
theData.p_ch = calcPch(p);
theData.exp = calcExp(theData, f00);
var current_likelihood = calcCurrentLikelihood(theData);

var likeSurface = makeLikeSurface();

var like_point = {
    x: [p],
    y: [f00],
    z: [current_likelihood[liketype_selected_mult]],
    mode: 'markers',
	marker: {
		size: 8,
        color: 'red',
		opacity: 1
    },
    type: 'scatter3d',
    showlegend: false
}

var obs_freq = {
    x: theData.history,
    y: theData.obs,
    name: 'Observed',
	type: 'bar',
    text: ['History 01 occurred 76 times', 'History 10 occurred 48 times', 'History 11 occurred 23 times', 'History 00 set equal to f00, which is ' + f00],
    marker: {
        color: ['#07BBFA','#07BBFA','#07BBFA','#9DDDF3']
    },
    hovertemplate: '%{text}'
};


var exp_freq = {
    x: theData.history,
    y: theData.exp,
    name: 'Expected',
    type: 'bar',
    marker: {
        color: '#F8C471'
    },
    text: ['(1-p)p x Total', 'p(1-p) x Total', 'p<sup>2</sup> x Total', '(1-p)<sup>2</sup> x Total'],
    hovertemplate: '<i>Formula</i>: %{text}'
}

var current_like_formatted = 0;

if (liketype_selected_mult = 'like') {
    current_like_formatted = current_likelihood[liketype_selected_mult].toExponential(2);
} else {
    current_like_formatted = current_likelihood[liketype_selected_mult].toFixed(2);
}


var multPlotData = [obs_freq, exp_freq];

var multLayout = {
    title: {
        text: '<b>Multinomial data</b><br>' + liketype_mult_labels[liketype_selected_mult] + ': ' + current_like_formatted
    },
    xaxis: { 
        type: 'category',
        tickfont: {
            size: 16
        },
        title: {
            text: 'Capture history',
            font: {
                size: 14
            }
        }
    },
    showlegend: true,
    barmode: 'group'
}

var multLikeLayout = {
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
                text: 'p'
            },
        },
        yaxis: {
            title: {
                text: 'f00'
            }
        },
        zaxis: {
           showexponent: 'all',
            exponentformat: 'e',
            title: {
                text: liketype_mult_labels[liketype_selected_mult]
            }
        }
    }
}


function updateData() {
    
    liketype_selected_mult = document.getElementById("liketype_multinom").value;
    p_updated = Number(document.getElementById("p_input").value);
    f00_updated = Number(document.getElementById("f00_input").value);
    
    document.getElementById("nhat").innerHTML = f00_updated + 147;
    
    theData.obs[3] = f00_updated;
    theData.p_ch = calcPch(p_updated);
    theData.exp = calcExp(theData, f00_updated);
    
    
    obs_freq.x = theData.history;
    obs_freq.y = theData.obs;
    obs_freq.text[3] = 'History 00 set equal to f00, which is ' + f00_updated;

    exp_freq.x = theData.history;
    exp_freq.y = theData.exp;
    
    current_likelihood = calcCurrentLikelihood(theData);
    
    like_point.x = [p_updated];
    like_point.y = [f00_updated];
    like_point.z = [current_likelihood[liketype_selected_mult]];
    
    if (liketype_selected_mult == 'like') {
        current_like_formatted = current_likelihood[liketype_selected_mult].toExponential(2);
    } else {
        current_like_formatted = current_likelihood[liketype_selected_mult].toFixed(2);
    }

    multPlotData = [obs_freq, exp_freq];
    
    multLikeLayout.scene.zaxis.title.text = liketype_mult_labels[liketype_selected_mult];
    
    multLayout.title.text = '<b>Multinomial data</b><br>' + liketype_mult_labels[liketype_selected_mult] + ': ' + current_like_formatted;

}



function updateOnChange() {
    updateData();
    drawMultPlots();

}

function makeLikeSurface() {
    var likeSurf = {x: [], y: [], z: [], showscale: false, opacity: 0.5, name: '', type: 'surface', hovertemplate: 'p: %{x}<br>'+'f00: %{y}<br>'+'Likelihood: %{z:.2e}'};
    var loglikeSurf = {x: [], y: [], z: [], showscale: false, opacity: 0.5, name: '', type: 'surface', hovertemplate: 'p: %{x}<br>'+'f00: %{y}<br>'+'Log Likelihood: %{z}'};
    var negloglikeSurf = {x: [], y: [], z: [], showscale: false, opacity: 0.5, name: '', type: 'surface', hovertemplate: 'p: %{x}<br>'+'f00: %{y}<br>'+'-Log Likelihood: %{z}'};
    var p = 0.15;
    var f00 = 50;
    for (i = 0; i < 101; i++) {
        likeSurf.x.push(p);
        likeSurf.y.push(f00);
        loglikeSurf.x.push(p);
        loglikeSurf.y.push(f00);
        negloglikeSurf.x.push(p);
        negloglikeSurf.y.push(f00);
        f00 = f00 + 250/100;
        p = p + 0.4/100;
    }
    
    var countPart = 0;
    var probPart = 0;
    var loglike = 0;
    
    for (i = 0; i < likeSurf.y.length; i++) {
        f00 = likeSurf.y[i];
        var likeForThisp = [];
        var loglikeForThisp = [];
        var negloglikeForThisp = [];
        for (j = 0; j < likeSurf.x.length; j++) {
            p = likeSurf.x[j];
            countPart = jStat.gammaln(147 + f00 + 1) - jStat.gammaln(f00 + 1) - jStat.gammaln(76 + 1) - jStat.gammaln(48 + 1) - jStat.gammaln(23 + 1);
            probPart = 76*Math.log((1-p)*p) + 48*Math.log(p*(1-p)) + 23*Math.log(p*p) + f00*Math.log((1-p)*(1-p));
            loglike = countPart + probPart;
            likeForThisp.push(Math.exp(loglike));
            loglikeForThisp.push(loglike);
            negloglikeForThisp.push(-loglike); 
        }
        likeSurf.z.push(likeForThisp);
        loglikeSurf.z.push(loglikeForThisp);
        negloglikeSurf.z.push(negloglikeForThisp);
    }
    
    var likeSurfs = {like: likeSurf, loglike: loglikeSurf, negloglike: negloglikeSurf};
    
    return likeSurfs;
}


function drawMultPlots() {
    Plotly.newPlot("multinom_graph", multPlotData, multLayout);
    Plotly.newPlot("likelihood_multinom", [likeSurface[liketype_selected_mult], like_point], multLikeLayout);
}

function calcPch(p) {
    var pch = [(1-p)*p, p*(1-p), p*p, (1-p)*(1-p)];
    return pch;
}

function calcExp(theData, f00) {
    var freq_total = theData.obs.reduce(calcSum,0);
    var nhat = freq_total + f00;
    for (var i = 0; i < theData.exp.length; i++) {
        theData.exp[i] = nhat * theData.p_ch[i];
    }
    return theData.exp;
}

function calcSum(total, num) {
    return total + num;
}

function calcCurrentLikelihood(theData) {
    var current_likelihood = {like: 0, loglike: 0, negloglike: 0};
    var f00 = theData.obs[3];
    var p = Math.sqrt(theData.p_ch[2]);
    var countPart = jStat.gammaln(147 + f00 + 1) - jStat.gammaln(f00 + 1) - jStat.gammaln(76 + 1) - jStat.gammaln(48 + 1) - jStat.gammaln(23 + 1);
    var probPart = 76*Math.log((1-p)*p) + 48*Math.log(p*(1-p)) + 23*Math.log(p*p) + theData.obs[3]*Math.log((1-p)*(1-p));
    var loglike = countPart + probPart;
    
    current_likelihood.loglike = loglike;
    current_likelihood.like = Math.exp(loglike);
    current_likelihood.negloglike = -loglike;
    
    return current_likelihood;
}
