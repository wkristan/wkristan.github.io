    
function drawCharts() {
    drawChart();
    drawChart1();
}
    
function drawChart() {
        var n = Number(document.getElementById("n").value);
        var data_obj = curves(n);
        
        var t_fill = {
            x: data_obj.x,
            y: data_obj.t_fill,
            fill: 'tozeroy',
            fillopacity: 0.7,
            type: 'scatter',
            line: {
                color: "red"
            }
        };
        
        var t_curve = {
            x: data_obj.x,
            y: data_obj.t_curve,
            type: 'scatter',
            line: {
                color: "red"
            }
        };
        
        var z_fill = {
            x: data_obj.x,
            y: data_obj.z_fill,
            fill: 'tozeroy',
            fillopacity: 0.7,
            type: 'scatter',
            line: {
                color: "blue"
            }
        };
        
        var z_curve = {
            x: data_obj.x,
            y: data_obj.z_curve,
            type: 'scatter',
            line: {
                color: "blue"
            }
        };        
        
        var data = [z_fill, z_curve, t_fill, t_curve];
        
        var layout = {
            title: {
                text: "Student's t-distributions at various degrees of freedom"
            },
            xaxis: {
                title: {
                    text: "t-value"
                }
            },
            yaxis: {
                title: {
                    text: "Probability density"
                }
            },
            showlegend: false,
            hovermode: false
        };

        Plotly.newPlot("chart_div", data, layout);

      }
      
      
function curves(ss) {
       var dat = {x: [], z_curve: [], z_fill: [], t_curve: [], t_fill: []};
       var t_crit = jStat.studentt.inv(0.975, ss-1);
       var j = -6;
       var k = 0;
       var l = 0;
       var m = 0;
       var n = 0;
       for(var i=0; i<501; i++) {
            k = jStat.normal.pdf(j,0,1);
            if (j <= -1.96 || j >= 1.96) {
                l = null;
            } else {
                l = k;
            }
            m = jStat.studentt.pdf(j,ss-1);
            if (j <= -t_crit || j >= t_crit) {
                n = null;
            } else {
                n = m;
            }
            dat.x.push(j);
            dat.z_curve.push(k);
            dat.z_fill.push(l);
            dat.t_curve.push(m);
            dat.t_fill.push(n);
            j = j + 12/500;

       }
       document.getElementById("critval").innerHTML = "Critical t-value: " + t_crit.toFixed(3);


       return dat;
    };

    
    
function drawChart1() {
        var pop_dists = makePop();
        var n = Number(document.getElementById("n_clt").value);
        var sample_means = samplePop(n, pop_dists);
        var mean_means = meanMeans(sample_means);
        
        var trace1 = {
            x: pop_dists.react,
            y: pop_dists.prob,
            fill: 'tozeroy',
            fillopacity: 0.7,
            type: 'scatter',
            line: {
                color: "red"
            },
            showlegend: false
        }
        
        var trace2 = {
            x: sample_means,
            type: "histogram",
            showlegend: false
        }

        var data1 = [trace1];
        var data2 = [trace2];
        
var layout1 = {
    title: {text: "Population distribution"},
    xaxis: {
        title: {text: "Reaction time (ms)"}
    },
    yaxis: {
        title: {text: "Probability density"}
    }
};

var layout2 = {
    xaxis: {
        range: [0,1200],
        title: {text: "Reaction time (ms)"}
    },
    yaxis: {
         title: {text: "Frequency"}
    },
    title: {text: "Histogram of sample means"}
}
        
        Plotly.newPlot("chart_div1", data1, layout1);
        Plotly.newPlot("chart_div2", data2, layout2);
        
      }

function makePop() {
    var pop = {react: [],prob: [], cdf: []};
    var x = 0;
    var cdf = 0;
    var min_cdf = (2*jStat.normal.cdf(0, 200, 30)/3 + jStat.normal.cdf(0, 600, 200)/3);
    var max_cdf = (2*jStat.normal.cdf(1200,200,30)/3 + jStat.normal.cdf(1200,600,200)/3);
    var pdf = 0;
    for (var i = 0; i < 1201; i++) {
        x = i;
        cdf = (-min_cdf + (2*jStat.normal.cdf(i, 200, 30)/3 + jStat.normal.cdf(i, 600, 200)/3))/max_cdf;
        pdf = 2*jStat.normal.pdf(i,200,30)/3 + jStat.normal.pdf(i, 600, 200)/3;
        pop.react.push(x);
        pop.prob.push(pdf);
        pop.cdf.push(cdf);
    }
    return pop;
}

function samplePop(n, pop_dists) {
    var rand_p = 0;
    var data_point = 0;
    var means = [];
    for (var i = 0; i < 1000; i++){
        var the_sample = [];
        for (var j = 0; j < n; j++){
            rand_p = Math.random();
            data_point = getRT(rand_p, pop_dists);
            the_sample.push(data_point);
        }
        means.push(jStat.mean(the_sample));

    }
    return means;
}

function getRT(rand_p, pop) {
    var the_pt = 0;
    var diff = 1;
    for (var i = 0; i < 1201; i++) {
        var diff_tmp = Math.abs(rand_p - pop.cdf[i]);
        if (diff_tmp < diff) {
            the_pt = pop.react[i];
            diff = diff_tmp;
        }
    }
    
    return the_pt;
}

function meanMeans(means) {
    var sum = 0;
    for (var i = 0; i < 1000; i++) {
        sum = sum + Number(means[i,0]);
    }

    return sum/1000;
}
