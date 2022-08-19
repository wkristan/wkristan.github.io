function runModel() {
    runSelection();
}

var genotypes = ["rr","rs","ss"];
var alleles = ["p","q"];
    
function runSelection() {
    var selected = initialize();
    selected = doSelection(selected);
    updatePage(selected);
    drawGenoTable(selected);
    drawAlleleTable(selected);
    drawFitnessTable(selected);
    drawGraphs(selected);
}

function initialize() {
    var the_pop = {rr: [], rs: [], ss: [], fxf: [], relcont: [], p: [], q: [], w: [], wbar: []};
    var p_init = Number(document.getElementById("p_init").value);
    the_pop.p.push(p_init);
    the_pop.q.push(1-p_init);
    the_pop.rr.push(p_init*p_init);
    the_pop.rs.push(2*p_init*(1-p_init));
    the_pop.ss.push((1-p_init)*(1-p_init));
    var fit_tmp = calcFitness(the_pop, 0);
    the_pop.w.push(fit_tmp);
    
    document.getElementById("q_init").innerHTML = the_pop.q[0].toFixed(2);
    document.getElementById("rr_init").innerHTML = the_pop.rr[0].toFixed(4);
    document.getElementById("rs_init").innerHTML = the_pop.rs[0].toFixed(4);
    document.getElementById("ss_init").innerHTML = the_pop.ss[0].toFixed(4);
    document.getElementById("fit_rr").innerHTML = the_pop.w[0][0].toFixed(2);
    document.getElementById("fit_rs").innerHTML = the_pop.w[0][1].toFixed(2);
    document.getElementById("fit_ss").innerHTML = the_pop.w[0][2].toFixed(2);
    
    
    return the_pop;
    
}


function calcFitness(the_pop, generation) {
    var tmp = [];
    var fit_tmp = 0;
    var dompheno_freq = the_pop.rr[generation] + the_pop.rs[generation];
    var recpheno_freq = the_pop.ss[generation];
    fit_tmp = Math.exp(3-6*dompheno_freq)/(1+Math.exp(3-6*dompheno_freq));
    tmp.push(fit_tmp);
    tmp.push(fit_tmp);
    fit_tmp = Math.exp(3-6*recpheno_freq)/(1+Math.exp(3-6*recpheno_freq));
    tmp.push(fit_tmp);
    return tmp;
}

function doSelection(selected) {
    var generations = Number(document.getElementById("generations").value);
    for (i = 0; i<generations+1; i++) {
        var fxf_tmp = [];
        for (var j = 0; j < 3; j++) {
            var gt = genotypes[j];
            fxf_tmp.push(selected[gt][i] * selected.w[i][j]);
        }
        selected.fxf.push(fxf_tmp);
        var wbar_tmp = jStat.sum(fxf_tmp);
        selected.wbar.push(wbar_tmp);
        var relcont_tmp = [];
        for (var j = 0; j < 3; j++) {
            var rc_tmp = fxf_tmp[j]/wbar_tmp;
            relcont_tmp.push(rc_tmp);
        }
        selected.relcont.push(relcont_tmp);
        var p_current = relcont_tmp[0] + relcont_tmp[1]/2;
        var q_current = 1-p_current;
        selected.p.push(p_current);
        selected.q.push(q_current);
        selected.rr.push(p_current*p_current);
        selected.rs.push(2*p_current*q_current);
        selected.ss.push(q_current*q_current);
        selected.w.push(calcFitness(selected, i+1));
    }
    
    return selected;
}

function updatePage(selected) {
    document.getElementById("fxf_rr").innerHTML = selected.fxf[0][0].toFixed(4);
    document.getElementById("fxf_rs").innerHTML = selected.fxf[0][1].toFixed(4);
    document.getElementById("fxf_ss").innerHTML = selected.fxf[0][2].toFixed(4);
    document.getElementById("mean_fit").innerHTML = selected.wbar[0].toFixed(4);
    document.getElementById("rel_cont_rr").innerHTML = selected.relcont[0][0].toFixed(4);
    document.getElementById("rel_cont_rs").innerHTML = selected.relcont[0][1].toFixed(4);
    document.getElementById("rel_cont_ss").innerHTML = selected.relcont[0][2].toFixed(4);
    document.getElementById("rr_offspring").innerHTML = selected.rr[1].toFixed(4);
    document.getElementById("rs_offspring").innerHTML = selected.rs[1].toFixed(4);
    document.getElementById("ss_offspring").innerHTML = selected.ss[1].toFixed(4);
    document.getElementById("p_gametes").innerHTML = selected.p[1].toFixed(4);
    document.getElementById("q_gametes").innerHTML = selected.q[1].toFixed(4);
}

function drawGenoTable(selected) {
    var generations = Number(document.getElementById("generations").value);
    var table = "<h3>Change in genotype frequencies over time</h3><table class='tableLarge'><tr><th>Generation</th><th>PP</th><th>PY</th><th>YY</th></tr>"
    
    for (var i = 0; i < generations+1; i++) {
        table += "<tr><td>" + i + "</td><td>" + selected.rr[i].toFixed(4) + "</td><td>" + selected.rs[i].toFixed(4) + "</td><td>" + selected.ss[i].toFixed(4) + "</td></tr>";
    }
    
    table += "</table>";
    
    document.getElementById("genotype_table_div").innerHTML = table;

}

function drawAlleleTable(selected) {
    var generations = Number(document.getElementById("generations").value);
    var table = "<h3>Change in allele frequencies over time</h3><table class='tableLarge'><tr><th>Generation</th><th>p (freq. of P)</th><th>q (freq. of Y)</th></tr>"
    
    for (var i = 0; i < generations+1; i++) {
        table += "<tr><td>" + i + "</td><td>" + selected.p[i].toFixed(4) + "</td><td>" + selected.q[i].toFixed(4) + "</td></tr>";
    }
    
    table += "</table>";
    
    document.getElementById("allele_table_div").innerHTML = table;

}

function drawFitnessTable(selected) {
    var generations = Number(document.getElementById("generations").value);
    var table = "<h3>Change in fitness over time</h3><table class='tableLarge'><tr><th>Generation</th><th>PP</th><th>PY</th><th>YY</th></tr>"
    
    for (var i = 0; i < generations+1; i++) {
        table += "<tr><td>" + i + "</td><td>" + selected.w[i][0].toFixed(4) + "</td><td>" + selected.w[i][1].toFixed(4) + "</td><td>" + selected.w[i][2].toFixed(4) + "</td></tr>";
    }
    
    table += "</table>";
    
    document.getElementById("fitness_table_div").innerHTML = table;
    
}

function drawGraphs(selected) {
 
    var lwid = 4;
    
    var rr_trace = {
        x: selected.generation,
        y: selected.rr,
        type: 'scatterplot',
        mode: 'lines',
        name: 'PP',
        line: {
            color: '#E1BE6A',
            width: lwid
        }
    }
    
    var rs_trace = {
        x: selected.generation,
        y: selected.rs,
        type: 'scatterplot',
        mode: 'lines',
        name: 'PY',
        line: {
            color: '#40B0A6',
            width: lwid
        }
    }
    
    var ss_trace = {
        x: selected.generation,
        y: selected.ss,
        type: 'scatterplot',
        mode: 'lines',
        name: 'YY',
        line: {
            color: '#5D3A9B',
            width: lwid
        }
        
    }
    
    var layout_geno = {
        title: {
            text: 'Genotype frequencies'
        },
        xaxis: {
            title: {
                text: 'Generation'
            }
        },
        yaxis: {
            title: {
                text: 'Frequency'
            },
            range: [0,1],
            hoverformat: '.2r'
        }
    }


    var p_trace = {
        x: selected.generation,
        y: selected.p,
        type: 'scatterplot',
        mode: 'lines',
        name: 'p',
        line: {
            color: '#FFC20A',
            width: lwid
        }
    }
    
    var q_trace = {
        x: selected.generation,
        y: selected.q,
        type: 'scatterplot',
        mode: 'lines',
        name: 'q',
        line: {
            color: '#0C7BDC',
            width: lwid
        }
        
    }    
    
    var layout_allele = {
        title: {
            text: 'Allele frequencies'
        },
        xaxis: {
            title: {
                text: 'Generation'
            }
        },
        yaxis: {
            title: {
                text: 'Frequency'
            },
            range: [0,1],
            hoverformat: '.2r'
        }
    }
    
    var w_rr_trace = {
        x: selected.generation,
        y: jStat.cola(selected.w,0),
        type: 'scatterplot',
        mode: 'lines',
        name: 'PP',
        line: {
            color: '#E1BE6A',
            width: lwid
        }
    }
    
    var w_rs_trace = {
        x: selected.generation,
        y: jStat.cola(selected.w,1),
        type: 'scatterplot',
        mode: 'lines',
        name: 'PY',
        line: {
            color: '#40B0A6',
            width: lwid
        }
    }
    
    var w_ss_trace = {
        x: selected.generation,
        y: jStat.cola(selected.w, 2),
        type: 'scatterplot',
        mode: 'lines',
        name: 'YY',
        line: {
            color: '#5D3A9B',
            width: lwid
        }
        
    }
    
    var layout_w = {
        title: {
            text: 'Fitnesses'
        },
        xaxis: {
            title: {
                text: 'Generation'
            }
        },
        yaxis: {
            title: {
                text: 'Relative fitness'
            },
            range: [0,1],
            hoverformat: '.2r'
        }
    }
    
    var balsel = getBalSel();
    
    var balsel_dom_trace = {
        x: balsel.freq,
        y: balsel.w_dom,
        type: 'scatterplot',
        mode: 'lines',
        name: 'Purple',
        line: {
            color: '#FFC20A',
            width: lwid
        }
    }
    
    var balsel_rec_trace = {
        x: balsel.freq,
        y: balsel.w_rec,
        type: 'scatterplot',
        mode: 'lines',
        name: 'Yellow',
        line: {
            color: '#0C7BDC',
            width: lwid
        }
        
    }    
    
    var layout_balsel = {
        title: {
            text: 'Frequency-dependent fitness'
        },
        xaxis: {
            title: {
                text: 'Frequency of purple (1-frequency of yellow)'
            }
        },
        yaxis: {
            title: {
                text: 'Fitness'
            },
            range: [0,1],
            hoverformat: '.2r'
        }
    }

    
    Plotly.newPlot("genotype_graph_div", [rr_trace, rs_trace, ss_trace], layout_geno);
    Plotly.newPlot("alleles_graph_div", [p_trace, q_trace], layout_allele);
    Plotly.newPlot("fit_graph_div", [w_rr_trace, w_rs_trace, w_ss_trace], layout_w);
    Plotly.newPlot("fit_freqdep_graph", [balsel_dom_trace, balsel_rec_trace], layout_balsel);
    
}

function getBalSel() {

    var balsel = {w_dom: [], w_rec: [], freq: []};
    var freq_tmp = 0;
    for (i = 0; i < 101; i++) {
        freq_tmp = freq_tmp+1/100;
        var w_dom_tmp = Math.exp(3-6*freq_tmp)/(1+Math.exp(3-6*freq_tmp));
        var w_rec_tmp = Math.exp(3-6*(1-freq_tmp))/(1+Math.exp(3-6*(1-freq_tmp)));
        balsel.w_dom.push(w_dom_tmp);
        balsel.w_rec.push(w_rec_tmp);
        balsel.freq.push(freq_tmp);
    }
    return balsel;
}
