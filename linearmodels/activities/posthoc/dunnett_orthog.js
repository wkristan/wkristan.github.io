function isOrthog() {
    var dunnett_wts = [];
    for (var i = 1; i < 6; i++) {
        var stage_wts = [];
        for (var j = 1; j < 5; j++) {
            stage_wts.push(Number(document.getElementById("s" + i + "_c" + j).value)); 
        }
        dunnett_wts.push(stage_wts);
    }
    
    for (var i = 0; i < 4; i++) {
        var col_total = 0;
        for (var j = 0; j < 5; j++) {
            col_total = col_total + dunnett_wts[j][i];
        }
        var which_contrast = "c" + (i+1) + "_total";
        document.getElementById(which_contrast).innerHTML = col_total;
    }
    
    for (var i = 0; i < 3; i++) {
        for (var j = i+1; j < 4; j++) {
            var sum_prod = 0;
            for (var k = 0; k < 5; k++) {
                sum_prod = sum_prod + dunnett_wts[k][i] * dunnett_wts[k][j];
            }
        var which_compared = "c" + (i+1) + "_c" + (j+1);
        document.getElementById(which_compared).innerHTML = sum_prod;
        }
    }

}
