function drawConfIntGraphs() {
    drawConfIntP();
    drawPCI();
}

function drawConfIntP() {
    var pest = Number(document.getElementById("est_of_p").value);
    var n = Number(document.getElementById("n_of_p").value);
    
    var binom = calcBinom(pest, n);
    var limits = getLimits(binom);
    
    var binomTrace = {
        x: binom.x,
        y: binom.prob,
        type: 'bar',
        marker: {
            color: binom.colors
        }
    };
    
    var binomData = [binomTrace];
    
    var binomLayout = {
        title: {
            text: '<b>Binomial distribution for n = ' + n + ', p = ' + pest + '</b><br><i>CI LL = ' + limits.ll.toFixed(2) + ', CI UL = ' + limits.ul.toFixed(2) + '</i>'
        },
        xaxis: {
            title: {
                text: 'Number of virgins'
            }
        }
    }
    
    Plotly.newPlot('binomdist_graph', binomData, binomLayout);

}


function drawPCI() {
    var pest = Number(document.getElementById("est_of_p").value);
    var n = Number(document.getElementById("n_of_p").value);    
    var puncert = 1.96*Math.sqrt(pest*(1-pest)/n);
    var ul = pest + puncert;
    var ll = pest - puncert;
    
    var error_color = 'black';
    
    if (ul > 1 || ll < 0) {
        error_color = 'red';
    }
    
    var pestTrace = {
        x: ['p'],
        y: [pest],
        type: 'line',
        mode: 'markers',
        marker: {
            size: 12
        },
        error_y: {
            type: 'data',
            array: [puncert],
            color: error_color,
            visible: true
        }
    }
    
    var pestData = [pestTrace];
    
    var pestLayout = {
        title: {
            text: '<b>Wald 95% confidence interval for p = ' + pest + '</b><br><i>LL = ' + ll.toFixed(2) + ', UL = ' + ul.toFixed(2) + '</i>'
        },
        yaxis: {
            range: [-0.1,1.1]
        }
    }
    
    Plotly.newPlot('confint_p_graph', pestData, pestLayout);

}



function calcBinom(pest, n) {
    var binomdist = {x: [], prob: [], colors: []};
    var pdf = 0;
    var cdf = 0;
    for (var i = 0; i < n+1; i++) {
        binomdist.x.push(i);
        pdf = jStat.binomial.pdf(i, n, pest);
        binomdist.prob.push(pdf);
        cdf = cdf + pdf;
        if (cdf < 0.025 || cdf - pdf > 0.975) {
            binomdist.colors.push('red');
        } else {
            binomdist.colors.push('blue');
        }
    }
    
    return(binomdist);
}

function getLimits(binom) {
    var ll = [];
    var ul = [];
    var cdf = 0;
    for (var i = 0; i < binom.x.length; i++) {
        cdf = cdf + binom.prob[i];
        if (cdf > 0.025) {
            ll.push(binom.x[i]/(binom.x.length-1));
        }
            
        if(cdf - binom.prob[i] < 0.975) {
            ul.push(binom.x[i]/(binom.x.length-1)); 
        }
    }
    
    ll_est = Math.min(...ll);
    ul_est = Math.max(...ul);
    
    return {ll: ll_est, ul: ul_est};
}
