//The data set to use - random normal data points, same as used in lecture slides
var theData_p = {outcome: [0,1], freqs: [5,15]};

//Some global variable definitions - to use for selection of likelihood type, colors of curves and points, and y-axis ranges for each of the likelihood types.

var lk_function_selected_p = "like";
var lk_function_type_p = "Likelihood";
var like_function_types_p = {like: "Likelihood", loglike: "Log likelihood", negloglike: "-Log likelihood"};
var like_function_titles_p = {like: "Likelihood function of dataset<br><i>individual likelihoods multiplied</i>", loglike: "Likelihood function of dataset<br><i>log of individual likelihoods summed</i>", negloglike: "Likelihood function of dataset<br><i>negative of log likelihood</i>"};
var likefun_ranges_p = {like: [0,0.000015], loglike: [-85,0], negloglike: [0,85]};


//Adding an event handler for the drop-down menu that selects the likelihood type.

var likesel_p = document.getElementById("liketype_p");
likesel_p.onclick = function() {
    lk_function_selected_p = this.value;
    lk_function_type_p = like_function_types_p[this.value];
    drawChart_p();
}

var nhet_p = document.getElementById("n_het_p");
var ntotal_p = document.getElementById("n_total_p");

nhet_p.onchange = function() {
    theData_p.freqs[0] = Number(ntotal_p.value) - Number(nhet_p.value);
    theData_p.freqs[1] = Number(nhet_p.value);
    drawChart_p();
}

ntotal_p.onchange = function() {
    theData_p.freqs[0] = Number(ntotal_p.value) - Number(nhet_p.value);
    theData_p.freqs[1] = Number(nhet_p.value);
    drawChart_p();
}

//The main drawing function

function drawChart_p() {

    //Get the likelihood data needed for the three different likelihood function options
    var lk_function_p = makeLikeFunction_p(theData_p);
    likefun_ranges_p.like[1] = 1.05*lk_function_p.maxlike;
    
    //Find the range selected by the slider
    var est_p = document.getElementById("range_p").valueAsNumber;
    
    //Get the likelihood of the estimate for the dataset likelihood function
    var like_of_est_likefn_p = likesEstLkFuns_p(est_p, lk_function_p);
    
    //Put the selected likelihood type into a variable for plotting.
    var lk_function_data_p = lk_function_p[lk_function_selected_p];
    
    var lk_function_title_p = like_function_titles_p[lk_function_selected_p];
    
    var obs_data_p = {
        x: theData_p.outcome,
        y: theData_p.freqs,
        type: 'bar',
        width: 0.1
    }
    
    var obs_est_value_p = {
        x: [est_p],
        y: [0],
        type: 'scatter',
        mode: 'markers'
    }
    
    var obs_data_plotly_p = [obs_est_value_p, obs_data_p];
    
    var obs_layout_p = {
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
    
    var lk_function_data_plotly_p = {
        x: lk_function_p.p,
        y: lk_function_data_p,
        type: "scatter",
        mode: "lines",
        name: ''
    }
    
    var lk_function_data_at_est_p = {
        x: [est_p],
        y: [like_of_est_likefn_p[lk_function_selected_p]],
        type: 'scatter',
        mode: 'markers',
        marker: {
            color: 'red',
            size: 10
        },
        name: "Estimate"
    }
    
    var lk_function_curve_p = [lk_function_data_plotly_p];
    
    lk_function_curve_p.push(lk_function_data_at_est_p);
    
    var lk_function_layout_p = {
        title: {
            text: lk_function_title_p
        },
        showlegend: false,
        xaxis: {
            title: {
                text: "Data values"
            },
            range: [0,1]
        },
        yaxis: {
            title: {
                text: lk_function_type_p
            },
            range: likefun_ranges_p[lk_function_selected_p],
            exponentformat: 'power'
        }
    }
    
    Plotly.newPlot("obs_data_p", obs_data_plotly_p, obs_layout_p);
    Plotly.newPlot("likelihood_function_p", lk_function_curve_p, lk_function_layout_p);
    
    var p_p = theData_p.freqs[1]/(theData_p.freqs[0] + theData_p.freqs[1]);
    var rotation_p = 10*(p_p - est_p);
    document.getElementById("obs_data_p").style.transform = "rotate(" + rotation_p + "deg)";

}



function makeLikeFunction_p(theData_p) {
    var likefncurve_p = {p: [], like: [], loglike: [], negloglike: [], maxlike: 0};
    var like_p = 0;
    var loglike_p = 0;
    var negloglike_p = 0;
    var p_p = 0;
    
    for (i = 0; i < 199; i++) {
        p_p = p_p + 1/200;
        p_p = Number(p_p.toFixed(3));
        loglike_p =  theData_p.freqs[0]*Math.log(1-p_p) + theData_p.freqs[1]*Math.log(p_p);
        if (Math.exp(loglike_p) > like_p) {
            likefncurve_p.maxlike = Math.exp(loglike_p);
        }
        like_p = Math.exp(loglike_p);
        negloglike_p = -loglike_p;
        likefncurve_p.like.push(like_p);
        likefncurve_p.loglike.push(loglike_p);
        likefncurve_p.negloglike.push(negloglike_p);
        likefncurve_p.p.push(p_p);
    }   

    
    return likefncurve_p;
}


function likesEstLkFuns_p(est_p, lk_function_p){
    var index_p = lk_function_p.p.indexOf(est_p);
    var likes_of_est_p = {like: 0, loglike: 0, negloglike: 0};
    likes_of_est_p.like = lk_function_p.like[index_p];
    likes_of_est_p.loglike = lk_function_p.loglike[index_p];
    likes_of_est_p.negloglike = lk_function_p.negloglike[index_p];
    
    return likes_of_est_p;
}


const
	range_p = document.getElementById('range_p'),
	rangeV_p = document.getElementById('rangeV_p'),
	setValue_p = ()=>{
		const
			newValue_p = Number( (range_p.value - range_p.min) * 100 / (range_p.max - range_p.min) ),
			newPosition_p = 10 - (newValue_p * 0.2);
		rangeV_p.innerHTML = `<span>${range_p.value}</span>`;
		rangeV_p.style.left = `calc(${newValue_p}% + (${newPosition_p}px))`;
        drawChart_p();
	};
document.addEventListener("DOMContentLoaded", setValue_p);
range_p.addEventListener('input', setValue_p);
