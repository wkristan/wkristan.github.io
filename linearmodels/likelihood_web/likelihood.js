function drawAllGraphs() {
    drawChart();
    drawRegPlots();
    drawPlotsQuad();
}

//The data set to use - random normal data points, same as used in lecture slides
var the_data = {values: [119.42,123.67,124.86,125.17,125.3,126.9,126.96,128.13,128.31,128.74,130.36,130.63,130.78,132.53,135.61]};
the_data.sd = jStat.stdev(the_data.values);
the_data.mean = jStat.mean(the_data.values);

//Some global variable definitions - to use for selection of likelihood type, colors of curves and points, and y-axis ranges for each of the likelihood types.

var lk_function_selected = "like";
var lk_function_type = "Likelihood";
var like_function_types = {like: "Likelihood", loglike: "Log likelihood", negloglike: "-Log likelihood"};
var like_function_titles = {like: "Likelihood function of dataset<br><i>individual likelihoods multiplied</i>", loglike: "Likelihood function of dataset<br><i>log of individual likelihoods summed</i>", negloglike: "Likelihood function of dataset<br><i>negative of log likelihood</i>"};
var colors_array = ["#FF0000", "#1F78B4", "#B2DF8A", "#33A02C", "#FB9A99", "#E31A1C", "#FDBF6F", "#FF7F00",
"#CAB2D6", "#6A3D9A", "#FFFF99", "#B15928","#1B9E77", "#00CCCC", "#666666"];
var likefun_ranges = {like: [0,0.0000000000000000011], loglike: [-85,-40], negloglike: [40,85]};


//Adding an event handler for the drop-down menu that selects the likelihood type.

var likesel = document.getElementById("liketype");
likesel.onclick = function() {
    lk_function_selected = this.value;
    lk_function_type = like_function_types[this.value];
    drawChart();
}

//The main drawing function

function drawChart() {
    //Make the curves for the individual likelihoods
    var lk_curves = makeLikeCurves(the_data);
    //Get the likelihood data needed for the three different likelihood function options
    var lk_function = makeLikeFunction(lk_curves);
    //Make the Plotly curves from the likelihood function
    var lk_function_curves = makeLikeFunctionCurves(lk_function);
    
    //Find the range selected by the slider
    var est = document.getElementById("range").valueAsNumber;
    
    //Get the likelihoods for the estimates for the individual likelihoods
    var likes_of_est_curves = likesEstCurves(est, lk_curves);
    //Get the likelihood of the estimate for the dataset likelihood function
    var like_of_est_likefn = likesEstLkFuns(est, lk_function);
    
    //Put the selected likelihood type into a variable for plotting.
    var lk_function_data = lk_function_curves[lk_function_selected];
    
    var lk_function_title = like_function_titles[lk_function_selected];
    
    for (i = 0; i < lk_curves.length; i++) {
        lk_curves[i].line.color = colors_array[i];
    }
    
    var lk_curves_est_likelihoods = {
        x: likes_of_est_curves.est,
        y: likes_of_est_curves.y,
        type: "scatter",
        mode: "markers",
        marker: {
            color: colors_array,
            size: 8
        }
    }
    

    
    lk_curves.push(lk_curves_est_likelihoods);
    
    var lk_curves_layout = {
        title: {
            text: "Likelihood functions for each point"
        },
        showlegend: false,
        hovermode: false,
        xaxis: {
            title: {
                text: "Data values"
            },
            tickvals: the_data.values,
            ticks: 'outside',
            ticklen: 8,
            gridcolor: 'lightgray'
        },
        yaxis: {
            title: {
                text: "Likelihood"
            },
            range: [0,0.12]
        }
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
    
    lk_function_data.push(lk_function_data_at_est);
    
    var lk_function_layout = {
        title: {
            text: lk_function_title
        },
        showlegend: false,
        xaxis: {
            title: {
                text: "Data values"
            },
            range: [119, 136]
        },
        yaxis: {
            title: {
                text: lk_function_type
            },
            range: likefun_ranges[lk_function_selected]
        }
    }
    
    Plotly.newPlot("likelihood_curves", lk_curves, lk_curves_layout);
    Plotly.newPlot("likelihood_function", lk_function_data, lk_function_layout);
    

}


function makeLikeCurves(the_data) {
    var curves = {x: [], y: {}};
    var span = 145 - 110;
    var xval = 110;
    for (i = 0; i < 351; i++) {
        curves.x.push(xval);
        xval = xval + 0.1;
        xval = Number(xval.toFixed(1));
    }
    for (i = 0; i < the_data.values.length; i++) {
        curves.y[i] = [];
        for (j = 0; j < curves.x.length; j++) {
            var pdens = jStat.jStat.normal.pdf(curves.x[j],the_data.values[i],the_data.sd);
            curves.y[i].push(pdens);
        }
    }
    
    var all_the_curves = [];
    
    for (i = 0; i < the_data.values.length; i++) {
        var the_curve = new likeCurve(curves.x, curves.y[i], "scatter", "lines","gray");
        all_the_curves.push(the_curve);
    }
        
    return all_the_curves;
}

function likeCurve(x, y, type, mode, color) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.mode = mode;
    this.line = {color: color};
}


function likeFnCurves(x,y,type,mode) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.mode = mode;
    this.line = {color: 'blue'};
    this.name = 'Likelihood function';
}


function makeLikeFunction(like_curves) {
    var likefncurves = {x: [], like: [], loglike: [], negloglike: []};
    var like = 0;
    var loglike = 0;
    var negloglike = 0;
    
    for (i = 0; i < like_curves[0].x.length; i++) {
        
        if (like_curves[0].x[i] >= 119 && like_curves[0].x[i] <= 136) {
        
            for (j = 0; j < like_curves.length; j++) {
                loglike = loglike + Math.log(like_curves[j].y[i]);
            }
        
            like = Math.exp(loglike);
            negloglike = -loglike;
            likefncurves.like.push(like);
            likefncurves.loglike.push(loglike);
            likefncurves.negloglike.push(negloglike);
            likefncurves.x.push(like_curves[0].x[i]);
        
            like = 0;
            loglike = 0;
            negloglike = 0;
        }
    }
    
    return likefncurves;
}

function makeLikeFunctionCurves(lk_function) {
    var all_the_curves = {like: [], loglike: [], negloglike: []};
    var curvenames = Object.keys(like_function_types);
    
    for (i = 0; i < curvenames.length; i++) {
        var the_curve = new likeFnCurves(lk_function.x, lk_function[curvenames[i]], "scatter", "lines");
        all_the_curves[curvenames[i]].push(the_curve);
    }
    
    return all_the_curves;
}

function likesEstCurves(est, lk_curves){
    var like_of_est_curves = {est: [], y: []};
    var xs = lk_curves[0].x;
    var index = xs.indexOf(est);
    for (i = 0; i < lk_curves.length; i++) {
        like_of_est_curves.est.push(est);
        like_of_est_curves.y.push(lk_curves[i].y[index]);
    }
    
    return like_of_est_curves;
}

function likesEstLkFuns(est, lk_function){
    var index = lk_function.x.indexOf(est);
    var likes_of_est = {like: 0, loglike: 0, negloglike: 0};
    likes_of_est.like = lk_function.like[index];
    likes_of_est.loglike = lk_function.loglike[index];
    likes_of_est.negloglike = lk_function.negloglike[index];
    
    return likes_of_est;
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
