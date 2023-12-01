
function drawChart() {
    var n = Number(document.getElementById("tot_tosses").value);
    var the_data = randFreqs(n);
    var chisq_results = doChisq(the_data);

    var coin1 = {
        x: ["Heads","Tails"],
        y: [the_data.obs[1][0], the_data.obs[1][1]],
        error_y: {
            type: 'data',
            symmetric: false,
            array: [chisq_results.diffs[1][0], chisq_results.diffs[1][1]],
            arrayminus: [0,0]
        },
        type: 'bar',
        name: "Tails",
        marker: {
            line: {
                color: 'black',
                width: 2
            }
        }
    }
    
    var coin2 = {
        x: ["Heads","Tails"],
        y: [the_data.obs[0][0], the_data.obs[0][1]],
        error_y: {
            type: 'data',
            symmetric: false,
            array: [chisq_results.diffs[0][0],chisq_results.diffs[0][1]],
            arrayminus: [0,0]
        },
        type: 'bar',
        name: "Heads",
        marker: {
            line: {
                color: 'black',
                width: 2
            }
        }
    }
    
    
    var data = [coin1, coin2];
    
    var layout = {
        title: {
            text: "Coin tosses"
        },
        xaxis: {
            title: {
                text: "Coin 1"
            }
        },
        legend: {
            title: {
                text: "Coin 2"
            }
        }
    }
    
    Plotly.newPlot("chart_div", data, layout);
    
    
    document.getElementById("chisq_stat").innerHTML = chisq_results.chisq.toFixed(4);
    document.getElementById("p_value").innerHTML = chisq_results.p.toFixed(4);
    if (chisq_results.p < 0.05) {
        document.getElementById("p_value").style.color = "red";
    } else {
        document.getElementById("p_value").style.color = "black";
    }

}
      
  
      
function randFreqs(n) {
    
    var tab = document.getElementById("chisq_table");
    
    var rands = [[0,0,0],[0,0,0],[0,0,0]];
    var exp = [[0,0],[0,0]];
    var rand1, rand2 = 0;
    for(var i=0; i<n; i++) {
        rand1 = Number(Math.random() < 0.5);
        rand2 = Number(Math.random() < 0.5);
        rands[rand1][rand2] = rands[rand1][rand2] + 1;
    }
    
    
    for (i = 0; i < 2; i++) {
        rands[i][2] = rands[i][0] + rands[i][1];
    }
    
    for (i = 0; i < 3; i++) {
        rands[2][i] = rands[0][i] + rands[1][i];
    }
    
    for (i = 0; i<2; i++) {
        for (j = 0; j<2; j++) {
            exp[i][j] = rands[i][2] * rands[2][j] / rands[2][2];
        }
    }
    
    
    tab.rows[2].cells[1].innerHTML = rands[0][0] + " (" + exp[0][0].toFixed(1) + ")";
    tab.rows[2].cells[2].innerHTML = rands[0][1] + " (" + exp[0][1].toFixed(1) + ")";
    tab.rows[2].cells[3].innerHTML = rands[0][2];
    tab.rows[3].cells[1].innerHTML = rands[1][0] + " (" + exp[1][0].toFixed(1) + ")";
    tab.rows[3].cells[2].innerHTML = rands[1][1] + " (" + exp[1][1].toFixed(1) + ")";
    tab.rows[3].cells[3].innerHTML = rands[1][2];
    tab.rows[4].cells[1].innerHTML = rands[2][0];
    tab.rows[4].cells[2].innerHTML = rands[2][1];
    tab.rows[4].cells[3].innerHTML = rands[2][2];
    
    var output = {obs: rands, exp: exp};
    
    return output;
}

function doChisq(the_data) {
    var chisq = 0;
    var diffs = [[0,0],[0,0]];

    for (i = 0; i<2; i++) {
        for (j = 0; j<2; j++) {
            var diff = the_data.obs[i][j] - the_data.exp[i][j];
            diffs[i][j] = -diff;
           chisq = chisq + (diff*diff)/the_data.exp[i][j]; 
        }
    }

    
    var pval = 1-jStat.chisquare.cdf(chisq,1);
    var results = {chisq: chisq, p: pval, diffs: diffs};

    return results;
}
