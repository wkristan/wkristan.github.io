//The data set to use - random normal data points, same as used in lecture slides
var theData = {outcome: [0,1], freqs: [5,15]};

//Some global variable definitions - to use for selection of likelihood type, colors of curves and points, and y-axis ranges for each of the likelihood types.

var lk_function_selected = "like";
var lk_function_type = "Likelihood";
var like_function_types = {like: "Likelihood", loglike: "Log likelihood", negloglike: "-Log likelihood", negll_min: "-LogLike with min. at 0"};
var like_function_titles = {like: "Likelihood function of dataset<br><i>individual likelihoods multiplied</i>", loglike: "Likelihood function of dataset<br><i>log of individual likelihoods summed</i>", negloglike: "Likelihood function of dataset<br><i>negative of log likelihood</i>", negll_min: "Likelihood function of dtaset<br><i>negative ll set with minimum at 0</i>"};
var likefun_ranges = {like: [0,0.000015], loglike: [-85,0], negloglike: [0,85], negll_min: [0,10]};


//Adding an event handler for the drop-down menu that selects the likelihood type.

var likesel = document.getElementById("liketype");
likesel.onclick = function() {
    lk_function_selected = this.value;
    lk_function_type = like_function_types[this.value];
    drawChart();
}

//Adding event handlers for the n het and n alleles inputs

var nhet = document.getElementById("n_het");
var nalleles = document.getElementById("n_alleles");

nhet.onchange = function() {
    theData.freqs[0] = Number(nalleles.value) - Number(nhet.value);
    theData.freqs[1] = Number(nhet.value);
    drawChart();
}

nalleles.onchange = function() {
    theData.freqs[0] = Number(nalleles.value) - Number(nhet.value);
    theData.freqs[1] = Number(nhet.value);
    nhet.max = Number(nalleles.value) - 1;
    drawChart();
}

//The main drawing function

function drawChart() {

    //Get the likelihood data needed for the four different likelihood function options
    var lk_function = makeLikeFunction(theData);
    likefun_ranges.like[1] = 1.05*lk_function.maxlike;
    
    //Make the lines needed for the profile 95% CI
    
    var profile_ci_lines = makeProfileCiLines(lk_function);
    
    //Find the range selected by the slider
    var est = document.getElementById("range").valueAsNumber;
    
    //Get the likelihood of the estimate for the dataset likelihood function
    var like_of_est_likefn = likesEstLkFuns(est, lk_function);
    
    //Put the selected likelihood type into a variable for plotting.
    var lk_function_data = lk_function[lk_function_selected];
    
    var lk_function_title = like_function_titles[lk_function_selected];
    
    var obs_data = {
        x: theData.outcome,
        y: theData.freqs,
        type: 'bar',
        width: 0.1
    }
    
    var obs_est_value = {
        x: [est],
        y: [0],
        type: 'scatter',
        mode: 'markers'
    }
    
    var obs_data_plotly = [obs_est_value, obs_data];
    
    var obs_layout = {
        title: {
            text: "Observed data"
        },
        width: 400,
        showlegend: false,
        hovermode: false,
        xaxis: {
            title: {
                text: "Data values"
            },
            gridcolor: 'lightgray',
            tickvals: [0,1],
            ticktext: ["Homozygotes","Heterozygotes"]
        },
        yaxis: {
            title: {
                text: "Count"
            }
        }
    }
    
    var lk_function_data_plotly = {
        x: lk_function.p,
        y: lk_function_data,
        type: "scatter",
        mode: "lines"
    }
    
    var lk_function_data_at_est = {
        x: [est],
        y: [like_of_est_likefn[lk_function_selected]],
        type: 'scatter',
        mode: 'markers',
        marker: {
            color: 'red',
            size: 10
        },
        name: "Estimate"
    }
    
    if (lk_function_selected == "negll_min") {
        var lk_function_curve = [lk_function_data_plotly];
        lk_function_curve.push(lk_function_data_at_est);
        lk_function_curve.push.apply(lk_function_curve, profile_ci_lines);
    } else {
        var lk_function_curve = [lk_function_data_plotly];
        lk_function_curve.push(lk_function_data_at_est);        
    }
    
    var lk_function_layout = {
        title: {
            text: lk_function_title
        },
        showlegend: false,
        xaxis: {
            title: {
                text: "Data values"
            },
            range: [0, 1]
        },
        yaxis: {
            title: {
                text: lk_function_type
            },
            range: likefun_ranges[lk_function_selected],
            exponentformat: 'power'
        }
    }
    
    Plotly.newPlot("obs_data", obs_data_plotly, obs_layout);
    Plotly.newPlot("likelihood_function", lk_function_curve, lk_function_layout);
    
    var p = theData.freqs[1]/(theData.freqs[0] + theData.freqs[1]);
    var rotation = 10*(p - est);
    document.getElementById("obs_data").style.transform = "rotate(" + rotation + "deg)";

}



function makeLikeFunction(theData) {
    var likefncurve = {p: [], like: [], loglike: [], negloglike: [], negll_min: [], maxlike: 0};
    var like = 0;
    var loglike = 0;
    var negloglike = 0;
    var p = 0;
    
    for (i = 0; i < 99; i++) {
        p = p + 1/100;
        p = Number(p.toFixed(2));
        loglike =  theData.freqs[0]*Math.log(1-p) + theData.freqs[1]*Math.log(p);
        if (Math.exp(loglike) > like) {
            likefncurve.maxlike = Math.exp(loglike);
        }
        like = Math.exp(loglike);
        negloglike = -loglike;
        likefncurve.like.push(like);
        likefncurve.loglike.push(loglike);
        likefncurve.negloglike.push(negloglike);
        likefncurve.p.push(p);
    }
    
    for (i = 0; i < 99; i++) {
        likefncurve.negll_min.push(likefncurve.negloglike[i] + Math.log(likefncurve.maxlike));
    }

    
    return likefncurve;
}


function likesEstLkFuns(est, lk_function){
    var index = lk_function.p.indexOf(est);
    var likes_of_est = {like: 0, loglike: 0, negloglike: 0, negll_min: 0};
    likes_of_est.like = lk_function.like[index];
    likes_of_est.loglike = lk_function.loglike[index];
    likes_of_est.negloglike = lk_function.negloglike[index];
    likes_of_est.negll_min = lk_function.negll_min[index];
    
    return likes_of_est;
}

function makeProfileCiLines(lk_function){
    var est_index = lk_function.like.indexOf(lk_function.maxlike);
    var diff1 = 10;
    var diff2 = 10;
    var index1 = 0;
    var index2 = 0;
    for (var i = 0; i < 99; i++) {
        if (i < est_index) {
            if (Math.abs(lk_function.negll_min[i] - 1.92) < diff1) {
                diff1 = Math.abs(lk_function.negll_min[i] - 1.92);
                index1 = i;
            }
        } else {
            if (Math.abs(lk_function.negll_min[i] - 1.92) < diff2) {
                diff2 = Math.abs(lk_function.negll_min[i] - 1.92);
                index2 = i;
            }
        }
    }
    
    var horizontal_line = {
        x:[0,1],
        y:[1.92,1.92],
        type: 'scatter',
        mode: 'lines',
        line: {
            color: 'blue'
        }
    }
    
    var lower = {
        x: [lk_function.p[index1], lk_function.p[index1]],
        y: [0, lk_function.negll_min[index1]],
        type: 'scatter',
        mode: 'lines',
        line: {
            color: 'cyan'
        }
    }
    
    var upper = {
        x: [lk_function.p[index2], lk_function.p[index2]],
        y: [0, lk_function.negll_min[index2]],
        type: 'scatter',
        mode: 'lines',
        line: {
            color: 'cyan'
        }
    }
    
    return [horizontal_line, lower, upper];
}


const
	range = document.getElementById('range'),
	rangeV = document.getElementById('rangeV'),
	setValue = ()=>{
		const
			newValue = Number( (range.value - range.min) * 100 / (range.max - range.min) ),
			newPosition = 10 - (newValue * 0.2);
		rangeV.innerHTML = `<span>${range.value}</span>`;
		rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
        drawChart();
	};
document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener('input', setValue);
