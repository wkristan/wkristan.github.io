
//The data set to use - random normal data points, same as used in lecture slides
var the_data = {values: [119.42,123.67,124.86,125.17,125.30,126.90,126.96,128.13,128.31,128.74,130.36,130.63,130.78,132.53,135.61]};
the_data.sd = jStat.stdev(the_data.values,true);
the_data.mean = jStat.mean(the_data.values);

//Some global variable definitions - to use for selection of likelihood type, colors of curves and points, and y-axis ranges for each of the likelihood types.

var lk_function_selected_one = "like";
var colors_array = ["#FF0000", "#1F78B4", "#B2DF8A", "#33A02C", "#FB9A99", "#E31A1C", "#FDBF6F", "#FF7F00",
"#CAB2D6", "#6A3D9A", "#FFFF99", "#B15928","#1B9E77", "#00CCCC", "#666666"];
var likefun_ranges = {like: [0,0.11], loglike: [-15,0], negloglike: [0,15]};

//Event handler for the data value selector
var datasel = document.getElementById("data_value");
datasel.onclick = function() {
    drawSingleLikeChart();
}

var likesel_one = document.getElementById("liketype_one");
likesel_one.onclick = function() {
    turnOffEqns();
    lk_function_selected_one = this.value;
    turnOnSelectedEqn(lk_function_selected_one);
    drawSingleLikeChart();
}

//The main drawing function

function drawSingleLikeChart() {
    //Make the curves for all of the individual likelihoods
    var lk_curves = makeLikeCurvesOne(the_data, lk_function_selected_one);
    
    //Find the index number of the data value selected
    var data_val_index = Number(document.getElementById("data_value").value);
    
    //Find the estimate of the mean selected by the slider
    var est = document.getElementById("range").valueAsNumber;
    
    //Get the likelihoods for the estimate for all the individual likelihood functions
    var likes_of_est = likesEstCurves(est, lk_curves);
    
    //Put the selected likelihood type into a variable for plotting.
    //var lk_function_data = lk_function_curves[lk_function_selected];
    
    //var lk_function_title = like_function_titles[lk_function_selected];
    
    for (i = 0; i < lk_curves.length; i++) {
        lk_curves[i].line.color = colors_array[i];
    }
    
    var lk_curves_est_likelihoods = {
        name: 'Estimate',
        x: [likes_of_est.est[data_val_index]],
        y: [likes_of_est.y[data_val_index]],
        type: "scatter",
        mode: "markers",
        marker: {
            color: colors_array[data_val_index],
            size: 8
        },
        hovertemplate: 'Value: %{y:.2f}'
    }
    
    for (i = 0; i < 3; i++) {
        
        
    }
    
    var single_lk_function = [];

    single_lk_function.push(lk_curves_est_likelihoods);    
    single_lk_function.push(lk_curves[data_val_index]);
    
    var lk_curves_layout = {
        title: {
            text: "Likelihood functions for each point"
        },
        showlegend: false,
        hovermode: "closest",
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
            range: likefun_ranges[lk_function_selected_one]
        },
        shapes: [
        {
            type: 'line',
            x0: the_data.values[data_val_index],
            y0: 0,
            x1: the_data.values[data_val_index],
            y1: 0.101,
            line: {
                color: colors_array[data_val_index]
            }
        }
        ]
    }
    
    Plotly.newPlot("likelihood_curves", single_lk_function, lk_curves_layout, {displayModeBar: false});
    
    document.getElementById("data_value_eqn").innerHTML = the_data.values[data_val_index];
    document.getElementById("mu").innerHTML = est;
    document.getElementById("eqn_like").innerHTML = likes_of_est.y[data_val_index].toFixed(6);
    
    document.getElementById("data_value_loglik_eqn").innerHTML = the_data.values[data_val_index];
    document.getElementById("mu_loglik").innerHTML = est;
    document.getElementById("eqn_loglike").innerHTML = likes_of_est.y[data_val_index].toFixed(3);

    document.getElementById("data_value_negloglik_eqn").innerHTML = the_data.values[data_val_index];
    document.getElementById("mu_negloglik").innerHTML = est;
    document.getElementById("eqn_negloglike").innerHTML = likes_of_est.y[data_val_index].toFixed(3);

}


function makeLikeCurvesOne(the_data, liketype) {
    var curves = {x: [], like: {}, loglike: {}, negloglike: {}};
    var span = 145 - 110;
    var xval = 110;
    for (i = 0; i < 351; i++) {
        curves.x.push(xval);
        xval = xval + 0.1;
        xval = Number(xval.toFixed(1));
    }
    for (i = 0; i < the_data.values.length; i++) {
        curves.like[i] = [];
        curves.loglike[i] = [];
        curves.negloglike[i] = [];
        for (j = 0; j < curves.x.length; j++) {
            var pdens = jStat.jStat.normal.pdf(curves.x[j],the_data.values[i],the_data.sd);
            curves.like[i].push(pdens);
            curves.loglike[i].push(Math.log(pdens));
            curves.negloglike[i].push(-1*Math.log(pdens));
        }
    }
    
    var all_the_curves = [];
    
    for (i = 0; i < the_data.values.length; i++) {
        var the_curve = new likeCurve(curves.x, curves[liketype][i], "scatter", "lines","gray");
        all_the_curves.push(the_curve);
    }
        
    return all_the_curves;
}

function likeCurve(x, y, type, mode, color) {
    this.hoverinfo = "skip";
    this.x = x;
    this.y = y;
    this.type = type;
    this.mode = mode;
    this.line = {color: color};
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

function turnOffEqns() {
    var eqns = document.getElementsByClassName("eqn");
    for (i = 0; i < eqns.length; i++) {
        eqns[i].style.display = 'none';
    }
}

function turnOnSelectedEqn(lk_function_selected_one) {
    var eqn = document.getElementsByClassName(lk_function_selected_one);
    for (i = 0; i < eqn.length; i++) {
        eqn[i].style.display = 'block';
    }
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
        drawSingleLikeChart();
	};
document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener('input', setValue);
