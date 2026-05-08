

function readOnLoad() {
    drawChart();
}

function onetwoActions(sel_option) {
    if (sel_option.value == "one") {
        showGtLt();
        drawChart();
    } else {
        hideGtLt();
        drawChart();
    }
}


function drawChart() {
    
    var t_curve = tdist();
    
    var onetwo = document.getElementById("opt_onetwo").value;
    var gtlt = whichChecked(document.getElementsByName("opt_gtlt"));
    var rr_p = document.getElementById("rejret").value;
    
    var alpha = Number(document.getElementById("alpha").value);
    var alpha_pct = alpha * 100;
    alpha_pct = +alpha_pct.toFixed(1);
    var alpha_pct_half = alpha_pct/2;
    alpha_pct_half = +alpha_pct_half.toFixed(3);
    var n = Number(document.getElementById("n").value);
    var df = n - 1;
    
    var mu = Number(document.getElementById("mu").value);
    var xbar = Number(document.getElementById("xbar").value);
    var s = Number(document.getElementById("stdev").value);
    var se = s/Math.sqrt(n);
    var diff = xbar - mu;
    
    var t_obs = diff/se;
    
    var stat_result = calcStatResult(df, alpha, onetwo, gtlt, rr_p, t_obs);
    
    if (stat_result.p < alpha) {
        if (rr_p == "p_val") {
            var graph_title = "Significant: p-value = " + stat_result.p.toFixed(4) + ", which is < alpha level of " + alpha;
        } else {
            var graph_title = "Reject Ho: observed t-value is in the rejection region";
        }
        
    } else {
        if (rr_p == "p_val") {
                var graph_title = "Not significant: p-value = " + +stat_result.p.toFixed(4) + ", which is > alpha level of " + alpha;
            } else {
                var graph_title = "Retain Ho: observed t-value is in the retention region";
            }
    }
    
    
    if (stat_result.p < alpha) {
        if (rr_p == "p_val") {
            var title_color = 'red';
        } else {
            var title_color = 'blue';
        }
        var title_size = 14;
    } else {
        var title_color = 'black';
        var title_size = 12;
    }
        
    var curves = tfill(df, alpha, onetwo, gtlt, rr_p, t_obs, stat_result.p);
        
        var trace1 = {
            x: t_curve.t,
            y: t_curve.tdist,
            type: "scatter",
            mode: "lines",
            line: {
                color: "black"
            }
        }
        
        curves.push(trace1);
        
        var layout1 = {
            showlegend: false,
            title: {
                text: graph_title,
                font: {
                    color: title_color,
                    size: title_size
                }
            },
            xaxis: {
                title: 't-value'
            },
            yaxis: {
                title: 'Probability density'
            },
            annotations: [{
                x: t_obs,
                y: 0,
                xref: 'x',
                yref: 'y',
                text: 'Observed t-value',
                showarrow: true,
                arrowhead: 3,
                ax: 0,
                ay: -40

            }]
        }
        
        Plotly.newPlot('chart_div1', curves, layout1);
        
        var sample_data = makeData(n, xbar, s);
        
        var data_trace = {
            x: sample_data.x,
            y: sample_data.y,
            type: "scatter",
            mode: "markers"
        }
        
        var mean_data_trace = {
            x: [""],
            y: [sample_data.mean],
            type: "scatter",
            mode: "markers",
            marker: {
                size: 10,
                color: 'red'
            }
        }
        
        var layout2 = {
            showlegend: false,
            title: {
                text: "Data values"
            },
            xaxis: {
                title: ''
            },
            yaxis: {
                title: 'Body temp.',
                range: [85,115]
            },
        annotations: [{
                x: 1,
                y: mu,
                xref: 'x',
                yref: 'y',
                text: 'μ',
                showarrow: true,
                arrowhead: 3,
                ax: 20,
                ay: 0

            }]
        }
        
        
        Plotly.newPlot('chart_div2', [data_trace, mean_data_trace], layout2);
        
        if (gtlt == "gt") {
            var tail_used = "upper";
            var alt_choice = "'Greater than μ'";
            var inf_value = "positive infinity";
        } else {
            var tail_used = "lower";
            var alt_choice = "'Less than μ'";
            var inf_value = "negative infinity";
        }
        
        document.getElementById("df").innerHTML = df;
        document.getElementById("cur_xbar").innerHTML = xbar;
        document.getElementById("cur_mu").innerHTML = mu;
        document.getElementById("cur_s").innerHTML = s;
        document.getElementById("cur_n").innerHTML = n;
        document.getElementById("cur_tobs").innerHTML = +t_obs.toFixed(3);
        document.getElementById("cur_diff").innerHTML = +diff.toFixed(1);
        document.getElementById("cur_se").innerHTML = +se.toFixed(3);
        
        if (onetwo == "one") {
            document.getElementById("onetail_info").style.display = "block";
            document.getElementById("twotail_info").style.display = "none";
            document.getElementById("oneortwo").innerHTML = "one tailed";
            document.getElementById("alpha_percent").innerHTML = "and " + alt_choice + " selected, all " + alpha_pct + '%';
            document.getElementById("whichofthetails").innerHTML = "the " + tail_used + " tail";
            if (rr_p == "p_val") {
                document.getElementById("gt_lt_p_info").style.display = "block";
                document.getElementById("gtlt_pval").innerHTML = alt_choice;
                document.getElementById("posneginf").innerHTML = inf_value;
            }
        } else {
            document.getElementById("onetail_info").style.display = "none";
            document.getElementById("twotail_info").style.display = "block";
            document.getElementById("oneortwo").innerHTML = "two tailed";
            document.getElementById("alpha_percent").innerHTML = "half of the " + alpha_pct + "%, or " + alpha_pct_half + '%';
            document.getElementById("whichofthetails").innerHTML = "each of the tails";            
            document.getElementById("gt_lt_p_info").style.display = "none";

        }
        

        if (rr_p == "p_val") {
            document.getElementById("pval_info").style.display = "block";
            document.getElementById("rejret_info").style.display = "none";
        } else {
            document.getElementById("pval_info").style.display = "none";
            document.getElementById("rejret_info").style.display = "block";
        }


      }
      
function tdist() {
    var df = Number(document.getElementById("n").value) - 1;
    var tdist = {t: [], tdist: []};
    var j = -6;
    var k = 0;
    var m = 0;
    for(var i=0; i<501; i++) {
        j = j + 12/500;
        m = jStat.studentt.pdf(j,df);
        tdist.t.push(j);
        tdist.tdist.push(m);
    }
       
    return tdist;
};
         

      
function tfill(df, alpha, onetwo, gtlt, rr_pval, t_obs, pval) {
       var t_fill = [];
       var t_from = 0;
       var t_to = 0;
       
       if (onetwo == "two") {
            var t_crit = jStat.studentt.inv(alpha/2, df);
        } else {
            var t_crit = jStat.studentt.inv(alpha, df);
        }
        
        if (rr_pval == "p_val") {
            if (pval < alpha) {
                var filltracecolor = "rgba(255,0,0,1)";
            } else {
                var filltracecolor = "rgba(150,150,150,0.5)";
            }
        } else {
            if (pval < alpha) {
                var filltracecolor = "rgba(0,0,255,1)";
            }
            else {
                var filltracecolor = "rgba(150,150,150,0.5)";
            }
        }
       
       if (onetwo == "two") {
           if (rr_pval == "p_val") {
                t_from = -6;
                t_to = -Math.abs(t_obs);
                var ft1 = makeFromToT(t_from, t_to, df);
                var ft2 = makeFromToT(-t_from, -t_to, df);
                var ft_object1 = new fillTrace(ft1.t, ft1.tfill, filltracecolor);
                var ft_object2 = new fillTrace(ft2.t, ft2.tfill, filltracecolor);
                t_fill.push(ft_object1, ft_object2);
            } else {
                t_from = -6;
                t_to = t_crit;
                var ft1 = makeFromToT(t_from, t_to, df);
                var ft2 = makeFromToT(-t_from, -t_to, df);
                var ft_object1 = new fillTrace(ft1.t, ft1.tfill, filltracecolor);
                var ft_object2 = new fillTrace(ft2.t, ft2.tfill, filltracecolor);
                t_fill.push(ft_object1, ft_object2);
            }
        }
       
        
        if (onetwo == "one") {
            if (gtlt == "gt") {
                if (rr_pval == "p_val") {
                    t_from = t_obs;
                    t_to = 6;
                    var ft = makeFromToT(t_from, t_to, df);
                    var ft_object = new fillTrace(ft.t, ft.tfill, filltracecolor);
                    t_fill.push(ft_object);
                } else {
                    t_from = -t_crit;
                    t_to = 6;
                    var ft = makeFromToT(t_from, t_to, df);
                    var ft_object = new fillTrace(ft.t, ft.tfill, filltracecolor);
                    t_fill.push(ft_object);
                }
            } else {
                if (rr_pval == "p_val") {
                    t_from = -6;
                    t_to = t_obs;
                    var ft = makeFromToT(t_from, t_to, df);
                    var ft_object = new fillTrace(ft.t, ft.tfill, filltracecolor);
                    t_fill.push(ft_object);
                } else {
                    t_from = -6;
                    t_to = t_crit;
                    var ft = makeFromToT(t_from, t_to, df);
                    var ft_object = new fillTrace(ft.t, ft.tfill, filltracecolor);
                    t_fill.push(ft_object);
                }
            }
        }
       
       return t_fill;
    };
   
    
function makeFromToT(from_t, to_t, df) {
    var shaded = {t: [], tfill: []};
    var j = from_t;
    var span = to_t - from_t;
    for(var i=0; i<101; i++) {
        m = jStat.studentt.pdf(j,df);
        shaded.t.push(j);
        shaded.tfill.push(m);
        j = j + span/100;

    }
    return shaded;
}

function showGtLt() {
    var gtlt = document.getElementById("gtlt_wrapper");
    gtlt.style.display = "block";
}

function hideGtLt() {
    var gtlt = document.getElementById("gtlt_wrapper");
    gtlt.style.display = "none";
}

function whichChecked(radios) {
    var checked_value = null;
    for (i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            checked_value = radios[i].value;
        }
    }
    return checked_value;
    
}

class fillTrace {
    constructor(x, y, col) {
        this.x = x;
        this.y = y;
        this.fill = "tozeroy";
        this.type = "scatter";
        this.mode = "none";
        this.fillcolor = col;
    }
}

function calcStatResult(df, alpha, onetwo, gtlt, rr_p, t_obs) {
    var sr = {p: 0, rr: ''};
    if (onetwo == "two") {
        sr.p = 2*jStat.studentt.cdf(-Math.abs(t_obs), df);
        if (sr.p < alpha) {
            sr.rr = "Reject Ho:";
        } else {
            sr.rr = "Retain Ho:";
        }
    }
    if (onetwo == "one") {
        if (gtlt == "gt") {
            sr.p = 1-jStat.studentt.cdf(t_obs, df);
            if (sr.p < alpha) {
                sr.rr = "Reject Ho:";
            } else {
                sr.rr = "Retain Ho:";
            }
        } else {
            sr.p = jStat.studentt.cdf(t_obs, df);
            if (sr.p < alpha) {
                sr.rr = "Reject Ho:";
            } else {
                sr.rr = "Retain Ho:";
            }
        } 
    }
    
    return sr;
}

function makeData(n, xbar, s) {
    var the_data = {x: [], y: [], mean: 0};
    
    for (var i = 0; i < n; i++) {
        the_data.y.push(jStat.normal.sample(0,1));
        the_data.x.push("");
    }
    
    var randmean = jStat.mean(the_data.y);
    var rands = jStat.stdev(the_data.y);
    
    for (var i = 0; i < the_data.y.length; i++) {
        the_data.y[i] = s*((the_data.y[i] - randmean)/rands) + xbar;
    }
    
    the_data.mean = jStat.mean(the_data.y);
    
    return the_data;
}

function openThing(evt, thingName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(thingName).style.display = "block";
  evt.currentTarget.className += " active";
}
