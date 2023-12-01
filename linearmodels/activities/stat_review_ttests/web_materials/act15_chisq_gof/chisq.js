
var concussions = {sport: ["Basketball","Football","Lacrosse","Soccer","Baseball"], concussions: [9572, 62353, 3508, 22955, 2579], expected: [23525, 32209, 4140, 27766, 13328]};

function drawCharts(){
    drawChart1(concussions);
    drawChart2();
    drawChart3();
    drawChart4();
}

function drawChart1(the_data) {
    
    var trace1 = {
        x: the_data.sport,
        y: the_data.concussions,
        type: 'bar',
        name: "Concussions"
    };
    
    var trace2 = {
        x: the_data.sport,
        y: the_data.expected,
        type: 'bar',
        name: "Expected concussions"
    };

    var data = [trace1, trace2];
    
    var layout = {
        title: {
            text: "Concussions"
        },
        legend: {
            x: 0.95,
            xanchor: 'right',
            y: -0.1,
            orientation: 'h'
        },
        yaxis: {
            range: [0,62000],
            title: {
                text: 'Count'
            }
        }
    };
    
    Plotly.newPlot("chart_div", data, layout);
    
}
      
function updateChart1() {
    tot_n = 100967;
    var the_data = randFreqs(tot_n);    
    drawChart1(the_data);
    
}
      
function resetChart1(){
    drawChart1(concussions);
}
    
function drawChart2() {
    var n_total = Number(document.getElementById("tot_concussions").value);
    var the_data = randFreqs(n_total);
    var chitest_results = chiTest(the_data);
    
    var conc = {
        x: the_data.sport,
        y: the_data.concussions,
        type: "bar",
        name: "Concussions"
    }
    
    var exp = {
        x: the_data.sport,
        y: the_data.expected,
        type: "bar",
        name: "Expected"
    }
    
    var data = [conc, exp];
    
    var layout = {
        title: {
            text: "Concussions"
        },
        legend: {
            x: 0.75,
            xanchor: 'right',
            y: -0.1,
            orientation: 'h'
        },
        yaxis: {
            range: [0,n_total*0.4],
            title: {
                text: 'Count'
            }
        }
    };
    
    Plotly.newPlot("chart_div2", data, layout);
    document.getElementById("chisq_value").innerHTML = chitest_results[0].toFixed(2)
    document.getElementById("chisq_p").innerHTML = chitest_results[1].toFixed(4);
    if (chitest_results[1] < 0.05) {
        document.getElementById("chisq_p").style.color = "red";
    } else {
        document.getElementById("chisq_p").style.color = "black";
    }

}
      

function drawChart3() {
        var df = Number(document.getElementById("chisq_df").value);
        var the_data = chisqCurve(df);

        var curve = {
            x: the_data.chisq_curve,
            y: the_data.pdens_curve,
            type: 'scatter',
            mode: 'lines',
            line: {color: 'rgb(0,0,0)'}
        }
        
        var fill = {
            x: the_data.chisq_fill,
            y: the_data.pdens_fill,
            type: 'scatter',
            fill: 'tozeroy',
            mode: 'none',
            fillcolor: 'rgb(255,0,0)'
        }
        
        var data = [fill, curve];
        
        var layout = {
            title: {
                text: "The Chi-square distribution"
            },
            showlegend: false
        }

        Plotly.newPlot("chart_div3", data, layout);
        
        document.getElementById("chi_crit").innerHTML = jStat.chisquare.inv(0.95, df).toFixed(3);
    
}

function drawChart4() {
    var p_binom = Number(document.getElementById("boy_prob").value);
    var k_binom = Number(document.getElementById("fam_size").value);
    var the_data = binomDist(p_binom, k_binom);

    var trace = {
        x: the_data.males,
        y: the_data.p,
        type: 'bar',
        showlegend: false
    }
    
    var data = [trace];
    
    var layout = {
        title: {
            text: "The binomial distribution"
        },
        xaxis: {
            title: {
                text: "Number of boys"
            }
        },
        yaxis: {
            title: {
                text: "Probability"
            }
        }
    }
    
    Plotly.newPlot("chart_div4", data, layout);
    
}

function randFreqs(n_total) {
       var cum_prob = [0.233, 0.552, 0.593, 0.868, 1];
       var exp_con = [0.233*n_total, 0.319*n_total, 0.041*n_total, 0.275*n_total, 0.132*n_total];
       var the_data = {sport: ["Basketball","Football","Lacrosse","Soccer","Baseball"], expected: exp_con};
       var bb = 0;
       var fb = 0;
       var lac = 0;
       var soc = 0;
       var base = 0;
       for(var i=0; i<n_total; i++) {
            rand = Math.random();
            if (rand <= cum_prob[0]) {
                bb = bb + 1;
            } else if (rand <= cum_prob[1]) {
                fb = fb + 1;
            } else if (rand <= cum_prob[2]) {
                lac = lac + 1;
            } else if (rand <= cum_prob[3]) {
                soc = soc + 1;
            } else {
                base = base + 1;
            }
       }

       the_data.concussions = [bb, fb, lac, soc, base];
       
       return the_data;
    };


function chiTest(data) {
    var chisq_obs = 0;
    var pval = 0;
    for (var i = 0;i < 5;i++) {
        var diff = data.concussions[i]-data.expected[i];
        chisq_obs = chisq_obs + (diff*diff)/data.expected[i];
    }
    pval = 1-jStat.chisquare.cdf(chisq_obs, 4);
    var test_result = [chisq_obs, pval];
    return test_result;
    
};

function chisqCurve(df) {
       var dat = {chisq_curve: [], pdens_curve: [], chisq_fill: [], pdens_fill: []};
       var j = 0.003;
       var k = 0;
       var l = 0;
       var chi_crit = jStat.chisquare.inv(0.95, df);
       for(var i=0; i<301; i++) {
            k = jStat.chisquare.pdf(j,df);
            dat.chisq_curve.push(j);
            dat.pdens_curve.push(k);
            if (j >= chi_crit) {
                dat.chisq_fill.push(j);
                dat.pdens_fill.push(k);
            }
            j = j + (chi_crit+df)/300;

       }
       return dat;
    };
    
function binomDist(p, n) {
    var dat = {males: [], p: []};
    var prob = 0;
    for (var i = 0; i < n+1; i++) {
        prob = jStat.binomial.pdf(i, n, p);
        dat.males.push(i);
        dat.p.push(prob);
    }
    return dat;
};
