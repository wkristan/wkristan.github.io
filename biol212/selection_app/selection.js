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
    drawGraphs(selected);
}

function initialize() {
    var the_pop = {rr: [], rs: [], ss: [], fxf: [], relcont: [], p: [], q: [], w: [], wbar: []};
    var p_init = Number(document.getElementById("p_init").value);
    var fit_nodelist = document.getElementsByClassName("gt_fitness");
    the_pop.p.push(p_init);
    the_pop.q.push(1-p_init);
    the_pop.rr.push(p_init*p_init);
    the_pop.rs.push(2*p_init*(1-p_init));
    the_pop.ss.push((1-p_init)*(1-p_init));
    the_pop.w = fitInit(fit_nodelist);
    
    document.getElementById("q_init").innerHTML = the_pop.q[0].toFixed(2);
    document.getElementById("rr_init").innerHTML = the_pop.rr[0].toFixed(4);
    document.getElementById("rs_init").innerHTML = the_pop.rs[0].toFixed(4);
    document.getElementById("ss_init").innerHTML = the_pop.ss[0].toFixed(4);
    
    return the_pop;
    
}


function fitInit(fit_nodelist) {
    var tmp = [];
    for (var i = 0; i < 3; i++) {
        tmp.push(Number(fit_nodelist[genotypes[i]].value));
    }
    return tmp;
}

function doSelection(selected) {
    var generations = Number(document.getElementById("generations").value);
    for (i = 0; i<generations+1; i++) {
        var fxf_tmp = [];
        for (var j = 0; j < 3; j++) {
            var gt = genotypes[j];
            fxf_tmp.push(selected[gt][i] * selected.w[j]);
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
    var table = "<h3>Change in genotype frequencies over time</h3><table class='tableLarge'><tr><th>Generation</th><th>RR</th><th>RS</th><th>SS</th></tr>"
    
    for (var i = 0; i < generations+1; i++) {
        table += "<tr><td>" + i + "</td><td>" + selected.rr[i].toFixed(4) + "</td><td>" + selected.rs[i].toFixed(4) + "</td><td>" + selected.ss[i].toFixed(4) + "</td></tr>";
    }
    
    table += "</table>";
    
    document.getElementById("genotype_table_div").innerHTML = table;

}

function drawAlleleTable(selected) {
    var generations = Number(document.getElementById("generations").value);
    var table = "<h3>Change in allele frequencies over time</h3><table class='tableLarge'><tr><th>Generation</th><th>p (freq. of R)</th><th>q (freq. of S)</th></tr>"
    
    for (var i = 0; i < generations+1; i++) {
        table += "<tr><td>" + i + "</td><td>" + selected.p[i].toFixed(4) + "</td><td>" + selected.q[i].toFixed(4) + "</td></tr>";
    }
    
    table += "</table>";
    
    document.getElementById("allele_table_div").innerHTML = table;

}

function drawGraphs(selected) {
 
    var lwid = 4;
    
    var rr_trace = {
        x: selected.generation,
        y: selected.rr,
        type: 'scatterplot',
        mode: 'lines',
        name: 'RR',
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
        name: 'RS',
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
        name: 'SS',
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
    
    Plotly.newPlot("genotype_graph_div", [rr_trace, rs_trace, ss_trace], layout_geno);
    Plotly.newPlot("alleles_graph_div", [p_trace, q_trace], layout_allele);
    
}
