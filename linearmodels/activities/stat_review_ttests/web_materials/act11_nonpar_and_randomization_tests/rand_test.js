var dataset = {survival: [177,162,216,553,278,12,260,200,156,182,143,105,103,250,100,52,164,19,53,15,43,340,133,111,231,378,49,30,384,4,54,13,123,97,153,59,117,16,151,22,56,21,18,139,20,31,52,287,18,51,122,27,54,7,63,392,10,25,103,21,13,87,2,20,7,24,99,8,99,61,25,95,80,51,29], group: [
'Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell']};


var counter = 0;
var exceeds = 0;


function drawTable() {
    var tab = document.getElementById("cancerTable");
    
    for (i = 0; i<dataset.survival.length; i++) {
        var row = tab.insertRow(i+1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = dataset.group[i];
        cell2.innerHTML = dataset.survival[i];
    }
    
    calcMeans(tab);

}
      
function calcMeans(tab) {
    var small = [];
    var large = [];
    for (var i = 0; i < 75; i++) {
        if (tab.rows[i+1].cells[0].innerHTML == "Large cell") {
            large.push(Number(tab.rows[i+1].cells[1].innerHTML));
        } else {
            small.push(Number(tab.rows[i+1].cells[1].innerHTML));
        }
    }
    var large_mean = jStat.mean(large);
    var small_mean = jStat.mean(small);
    var diff = large_mean - small_mean;
    document.getElementById("large_mean").innerHTML = large_mean.toFixed(3);
    document.getElementById("small_mean").innerHTML = small_mean.toFixed(3);
    document.getElementById("diff").innerHTML = diff.toFixed(3);
    if (Math.abs(diff) >= 94.44) {
        document.getElementById("diff").style.color = "#ff0000";
        exceeds = exceeds + 1;
    } else {
        document.getElementById("diff").style.color = "#000000";
    }
    counter = counter + 1;
    var pval = exceeds / counter;
    document.getElementById("shuffles").innerHTML = counter;
    document.getElementById("exceeds").innerHTML = exceeds;
    document.getElementById("pval").innerHTML = pval.toFixed(5);
    
}


function randSort() {
    var tab = document.getElementById("cancerTable");
    var cellTypes = [];
    
    for (var i = 0; i < 75; i++) {
        cellTypes.push(tab.rows[i+1].cells[0].innerHTML);
    }
    cellTypes.sort(function(a, b){return 0.5 - Math.random()});
    for (var i = 0; i < 75; i++){
        tab.rows[i+1].cells[0].innerHTML = cellTypes[i];
    }
    calcMeans(tab);
}

function resetTable() {
    
dataset = {survival: [177,162,216,553,278,12,260,200,156,182,143,105,103,250,100,52,164,19,53,15,43,340,133,111,231,378,49,30,384,4,54,13,123,97,153,59,117,16,151,22,56,21,18,139,20,31,52,287,18,51,122,27,54,7,63,392,10,25,103,21,13,87,2,20,7,24,99,8,99,61,25,95,80,51,29], group: [
'Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Large cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell','Small cell']};
    
counter = 0;
exceeds = 0;

drawTable();
}
