var binomdist = {x: [], p: [], color: []};

function readOnLoad() {
    updateValues();
}

const ntrials = document.getElementById("n");
const successes = document.getElementById("x");
const p_succ = document.getElementById("p_succ");

ntrials.addEventListener("change", updateValues);
successes.addEventListener("change", updateValues);
p_succ.addEventListener("change", updateValues);

function updateValues() {
    
    var n = Number(ntrials.value);
    var x = Number(successes.value);
    var p_x = Number(p_succ.value);
    var nfact = jStat.factorial(n);
    var xfact = jStat.factorial(x);
    var n_xfact = jStat.factorial(n-x);
    var p_one_of_possible = (p_x**x)*((1-p_x)**(n-x));
    var nways = nfact/(xfact*n_xfact);
    
    successes.max = n;
    
    var ps = document.getElementsByClassName("p_succ");
    for (item of ps) {
        item.innerHTML = p_x;
    }
    
    var ns = document.getElementsByClassName("n_total");
    for (item of ns) {
        item.innerHTML = n;
    }
    
    var xs = document.getElementsByClassName("x_successes");
    for (item of xs) {
        item.innerHTML = x;
    }
    
    var count_part = document.getElementsByClassName("counting_part");
    for (item of count_part) {
        item.innerHTML = nways.toFixed(0);
    }
    
    var binom_p = document.getElementsByClassName("binom_prob");
    for (item of binom_p) {
        var p = nways * p_one_of_possible;
        item.innerHTML = p.toFixed(4);
    }
    
    var p_each = document.getElementsByClassName("prob_each");
    for (item of p_each) {
        item.innerHTML = p_one_of_possible.toFixed(4);
    }
    
    makeBinomDist(n, x, p_x);
    
    drawTable(n);
    
    var dist_trace = {
        x: binomdist.x,
        y: binomdist.p,
        type: 'bar',
        marker: {
            color: binomdist.color
        }
    }
    
    var dist_layout = {
        xaxis: {
            title: {
                text: "Number of females"
            }
        },
        yaxis: {
            title: {
                text: "Probability"
            }
        }
    }
    
    Plotly.newPlot('chart_div', [dist_trace], dist_layout);
}

function makeBinomDist(n,x,p_x) {
    binomdist.x = [];
    binomdist.p = [];
    binomdist.color = [];
    var mid = n/2;
    if (x < mid) {
        var lower = x;
        var upper = n-x;
    } else {
        var lower = n-x;
        var upper = x;
    }
    var comb = 0;
    var p_val = 0;
    for (var i = 0; i < n+1; i++) {
        binomdist.x.push(i);
        comb = jStat.factorial(n)/(jStat.factorial(i)*jStat.factorial(n-i));
        p_val = comb*(p_x**i)*((1-p_x)**(n-i));
        binomdist.p.push(p_val.toFixed(4));
        if (i == x) {
            binomdist.color.push("cyan");
        } else {
            binomdist.color.push("lightblue");
        }
    }
}

function drawTable(n) {
    var table = "<table class='tableLarge'><tr><th>N. females</th><th>Probability</th></tr>"
    
    for (i = 0; i < n+1; i++) {
        table += "<tr><td style='background-color:" + binomdist.color[i] + "'>" + binomdist.x[i] + "</td><td style='background-color: " + binomdist.color[i] + "'>" + binomdist.p[i] + "</td></tr>";
    }
    
    table += "</table>";
    
    document.getElementById("table_div").innerHTML = table;

}

