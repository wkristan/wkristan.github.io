google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['table']});
//google.charts.setOnLoadCallback(drawChart1);

var current = 0;
var data = [];

function drawChart1() {
        var options = [];
            
        var freq_options = {
            title: "Allele frequencies over 500 generations of drift",
            vAxis: {title: "Relative frequency", viewWindowMode: "explicit", viewWindow: {min: 0, max: 1}},
            hAxis: {title: "Generation", viewWindowMode: "explicit", viewWindow: {min: 0, max: 500}},
            pointSize: 1,
            isStacked: "relative",
            pointsVisible: false,
        };
        
        var het_options = {
            title: "Heterozygosity",
            vAxis: {title: "Heterozygosity", viewWindowMode: "explicit", viewWindow: {min: 0, max: 1}},
            hAxis: {title: "Generation", viewWindowMode: "explicit", viewWindow: {min: 0, max: 500}},
        }
        
        options[0] = freq_options;
        options[1] = het_options;
        
        var chart = [];

        chart[0] = new google.visualization.AreaChart(document.getElementById('chart_div1'));
        chart[1] = new google.visualization.LineChart(document.getElementById('chart_div1'));
        
        chart[current].draw(data[current], options[current]);
        

      }
    

function oneRun() { 
// Initialize the population
    var pop_n = Number(document.getElementById("n_pop").value);
    var parents = initializePop(pop_n);
    
// Measure initial Hz, allele frequencies
    
    var alleleFreqs = [];
    
    var run = 0;
    
    alleleFreqs = alleleFreq(parents, alleleFreqs, run, pop_n);

    
    var Hz = [];
    Hz = het(parents, run, Hz, pop_n);

    var imm = Number(document.getElementById("immig").checked);


// For 500 generations, do:
    for (var i = 1; i < 501; i++) { 
// Random mating to produce offspring
        var offspring = mate(parents, pop_n, imm);
// Offspring become adults for next year
        parents = offspring;
// Measure Hz, allele frequencies - record
        Hz = het(parents, i, Hz, pop_n);
        alleleFreqs = alleleFreq(parents, alleleFreqs, i, pop_n);
    }

    
    var freq_data = new google.visualization.DataTable();
        freq_data.addColumn('number', 'Generation');
        freq_data.addColumn('number', "A: " + alleleFreqs[500][1].toFixed(2));
        freq_data.addColumn('number', "B: " + alleleFreqs[500][2].toFixed(2));
        freq_data.addColumn('number', "C: " + alleleFreqs[500][3].toFixed(2));
        freq_data.addColumn('number', "D: " + alleleFreqs[500][4].toFixed(2));
        freq_data.addColumn('number', "E: " + alleleFreqs[500][5].toFixed(2));
        freq_data.addRows(alleleFreqs);
    
    var het_data = new google.visualization.DataTable();
        het_data.addColumn('number','Generation');
        het_data.addColumn('number','Hz: ' + Hz[500][1].toFixed(2));
        het_data.addRows(Hz);
    
    data[0] = freq_data;
    data[1] = het_data;
    
    drawChart1();

}



function initializePop(pop_n) {
    var hom = [
    ["A","A"],
    ["B","B"],
    ["C","C"],
    ["D","D"],
    ["E","E"]
    ];
    var het = [
    ["A","B"],
    ["A","C"],
    ["A","D"],
    ["A","E"],
    ["B","C"],
    ["B","D"],
    ["B","E"],
    ["C","D"],
    ["C","E"],
    ["D","E"]
    ];
    var rep = pop_n/50;
    var m = [];
    for (var i = 0; i < rep; i++) {
        for (var j = 0; j<5; j++){
            m.push(hom[j]);
        }
    }
    for (var i = 0; i < rep*2; i++) {
        for (var j = 0; j<10; j++) {
            m.push(het[j]);
        }
    }
    var f = m;
    var pop = {males:m, females:f};
    return pop;
}

function alleleFreq(pop, alleleFreqs, run, pop_n) {
    var freqs = [run, 0,0,0,0,0];
    var tester = null;
    for (var i = 0; i < pop_n/2; i ++) {
        for (var j = 0; j < 2; j++) {
            tester = pop.males[i][j];
            if (tester == "A") {
                freqs[1] = freqs[1] + 1/(pop_n*2);
            } else if (tester == "B") {
                freqs[2] = freqs[2] + 1/(pop_n*2);
            } else if (tester == "C") {
                freqs[3] = freqs[3] + 1/(pop_n*2);
            } else if (tester == "D") {
                freqs[4] = freqs[4] + 1/(pop_n*2);
            } else {
                freqs[5] = freqs[5] + 1/(pop_n*2);
            }
        }
    }
    for (var i = 0; i < pop_n/2; i ++) {
        for (var j = 0; j < 2; j++) {
            tester = pop.females[i][j];
            if (tester == "A") {
                freqs[1] = freqs[1] + 1/(pop_n*2);
            } else if (tester == "B") {
                freqs[2] = freqs[2] + 1/(pop_n*2);
            } else if (tester == "C") {
                freqs[3] = freqs[3] + 1/(pop_n*2);
            } else if (tester == "D") {
                freqs[4] = freqs[4] + 1/(pop_n*2);
            } else {
                freqs[5] = freqs[5] + 1/(pop_n*2);
            }
        }
    }
    alleleFreqs.push(freqs);
    return(alleleFreqs);
}


function het(pop, run, Hz_ar, pop_n) {
    var hz = 0;
    for (var i = 0; i<pop_n/2; i++) {
        if (pop.males[i][0] != pop.males[i][1]){
            hz = hz + 1/pop_n;
        }
    }
    for (var i = 0; i<pop_n/2;i++) {
        if(pop.females[i][0] != pop.females[i][1]) {
            hz = hz + 1/pop_n;
        }
    }
    
    Hz_ar.push([run, hz]);
    
    return Hz_ar;
}

function mate(parents, pop_n, imm) {
    m = [];
    f = [];
    for (var i = 0; i<pop_n/2-imm; i++) {
        var dad = randIntBtwn(0,(pop_n/2)-1);
        var dad_allele = randIntBtwn(0,1);
        var mom = randIntBtwn(0,(pop_n/2)-1);
        var mom_allele = randIntBtwn(0,1);
        m.push([parents.males[dad][dad_allele], parents.females[mom][mom_allele]]);
    }
    
    if (imm = 1) {
        var alleles = ["A","B","C","D","E"];
        m.push([alleles[randIntBtwn(0,4)], alleles[randIntBtwn(0,4)]]);
    }
    
    for (var i = 0; i<pop_n/2; i++) {
        var dad = randIntBtwn(0,(pop_n/2)-1);
        var dad_allele = randIntBtwn(0,1);
        var mom = randIntBtwn(0,(pop_n/2)-1);
        var mom_allele = randIntBtwn(0,1);
        f.push([parents.males[dad][dad_allele], parents.females[mom][mom_allele]]);
    }
    var pop = {males:m, females:f};
    return pop;

}

function randIntBtwn(low, high) {
    var randNum = low + Math.round(Math.random() * (high-low));
    return randNum;
}

function switchChart() {
    current = 1-current;
    drawChart1();
}
