// The grand mean is 0.75, variance is 0.00666, and the standard deviation is 0.0816

var grps = {level: ["control","trt1","trt2"]};
var allsamples = {x: [], y: [], fval_rnd: []};
var fval_count = {x: [], y: []};
var num_iter = 0;
var current = 0;

for (i = 0; i<101; i++) {
    fval_count.x.push(0 + i);
    fval_count.y.push(0);
}

function drawCharts(){
    drawChart1();
}

function drawChart1() {
    var this_sample = randSample();
    var sample_summary = summarize(this_sample);
    var anova = doAnova(sample_summary);
    anovaTable(anova);

    var control_pts = {
        x: this_sample.control_labs,
        y: this_sample.control,
        mode: "markers",
        type: "scatter",
        marker: {
            size: 8,
            color: "red"
        },
        name: "Control"
    }

    var trt1_pts = {
        x: this_sample.trt1_labs,
        y: this_sample.trt1,
        mode: "markers",
        type: "scatter",
        marker: {
            size: 8,
            color: "green"
        },
        name: "Treatment 1"
    }

    var trt2_pts = {
        x: this_sample.trt2_labs,
        y: this_sample.trt2,
        mode: "markers",
        type: "scatter",
        marker: {
            size: 8,
            color: "magenta"
        },
        name: "Treatment 2"
    }

    var control_mean = {
        x: ["Control"],
        y: [sample_summary.control.mean],
        mode: "markers",
        type: "scatter",
        marker: {
            size: 14,
            color: "red",
            symbol: "x"
        },
        showlegend: false
    }

    var trt1_mean = {
        x: ["Treatment 1"],
        y: [sample_summary.trt1.mean],
        mode: "markers",
        type: "scatter",
        marker: {
            size: 14,
            color: "green",
            symbol: "x"
        },
        showlegend: false
    }

    var trt2_mean = {
        x: ["Treatment 2"],
        y: [sample_summary.trt2.mean],
        mode: "markers",
        type: "scatter",
        marker: {
            size: 14,
            color: "magenta",
            symbol: "x"
        },
        showlegend: false
    }

    var layout_single = {
        title: {
            text: "Response to treatment"
        },
        yaxis: {
            title: {
                text: "Response variable"
            },
            range: [60,140]
        },
        xaxis: {
            title: {
                text: "Treatments"
            }
        }
    }

    var data_all = [control_pts, trt1_pts, trt2_pts, control_mean, trt1_mean, trt2_mean];

    Plotly.newPlot("one_repeat", data_all, layout_single);

    countFvals(anova.f_val);

    var fval_points = {
        x: fval_count.x,
        y: fval_count.y,
        type: "scatter",
        mode: "markers",
        showlegend: false
    }

    var fval_layout = {
        title: {
            text: "Distribution of " + num_iter + " F values"
        },
        xaxis: {
            title: {
                text: "F value"
            },
            range: [0,100]

        },
        yaxis: {
            title: {
                text: "Count"
            },
            rangemode: "tozero",
        }
    }


    Plotly.newPlot("many_repeats", fval_points, fval_layout);


}


function randSample() {
    var grp_labels = ["Control", "Treatment 1", "Treatment 2"];
    var n_groups = document.getElementById("sample_size").value;
    var sample = {control: [], trt1: [], trt2: [], control_labs: [], trt1_labs: [], trt2_labs: []};
    for (var i = 0; i < grps.level.length; i++) {
        for (var j = 0; j < n_groups; j++) {
            sample[grps.level[i]].push(jStat.normal.sample(100, 10));
            sample[grps.level[i] + "_labs"].push(grp_labels[i])
        }
    }

    return sample;

}

function summarize(this_sample) {
    var sums = {control: {mean: 0, sd: 0}, trt1: {mean: 0, sd: 0}, trt2: {mean: 0, sd: 0}, grand: {mean: 0, sd: 0}};
    for (var i = 0; i < grps.level.length; i++){
        sums[grps.level[i]].mean = jStat.mean(this_sample[grps.level[i]]);
        sums[grps.level[i]].sd = jStat.stdev(this_sample[grps.level[i]]);
    }
    var alldat = this_sample["control"].concat(this_sample["trt1"], this_sample["trt2"]);
    sums.grand.mean = jStat.mean(alldat);
    sums.grand.sd = jStat.stdev(alldat);

    return sums;
}

function doAnova(sample_summary) {
    var grp_n = document.getElementById("sample_size").value;
    var total_n = grp_n * 3;
    var anova_stats = {error_ss: 0, model_ss: 0, error_df: total_n - 3, model_df: 2, model_ms: 0, f_val: 0, p_val: 0};
    for (var i = 0; i < grps.level.length; i++) {
        anova_stats.error_ss = anova_stats.error_ss + (sample_summary[grps.level[i]].sd)**2 * (grp_n - 1);
    }
    for (var i = 0; i < grps.level.length; i++) {
        anova_stats.model_ss = anova_stats.model_ss + (sample_summary[grps.level[i]].mean - sample_summary.grand.mean)**2 * grp_n;
    }
    anova_stats.model_ms = anova_stats.model_ss / 2;
    anova_stats.error_ms = anova_stats.error_ss / (total_n - 3);
    anova_stats.f_val = anova_stats.model_ms / anova_stats.error_ms;
    anova_stats.p_val = 1-jStat.centralF.cdf(anova_stats.f_val, 2, (total_n-3));

    return anova_stats;
}

function anovaTable(anova) {
    document.getElementById("model_ss").innerHTML = anova.model_ss.toFixed(2);
    document.getElementById("model_ms").innerHTML = anova.model_ss.toFixed(2) / 2;
    document.getElementById("resid_ss").innerHTML = anova.error_ss.toFixed(2);
    document.getElementById("resid_ms").innerHTML = anova.error_ms.toFixed(2);
    document.getElementById("resid_df").innerHTML = anova.error_df;
    document.getElementById("frat").innerHTML = anova.f_val.toFixed(2);
    document.getElementById("pval").innerHTML = anova.p_val.toFixed(4);
    if(anova.p_val < 0.05) {
        document.getElementById("pval").style.color = "red";
    } else {
        document.getElementById("pval").style.color = "black";
    }

}

function countFvals(fval) {
    var fval_rnd = Math.round(fval);
    var x_ind = fval_count.x.indexOf(fval_rnd);
    fval_count.y[x_ind] = fval_count.y[x_ind] + 1;
    allsamples.x.push(fval);
    allsamples.fval_rnd.push(fval_rnd);
    allsamples.y.push(fval_count.y[x_ind]);
    num_iter = num_iter + 1;
}

function run1k() {
    var n = Number(document.getElementById("sample_size").value);
    for (i = 0; i < 1000; i++) {
        var data_object = randSample();
        var summary_object = summarize(data_object);
        var anova_object = doAnova(summary_object);
        var fval = anova_object.f_val;
        countFvals(fval);
    }
    drawChart1();
}
