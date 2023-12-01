
function drawTable() {
    var test_string = document.getElementById("test").value;
    makeRndTossTable(test_string);
}
      
function makeRndTossTable(test_string){
    var outcomes = ["H","T"];
    var matches = 0;
    var tab = document.getElementById("coinTossTable");
    for (var i = 0; i<20000; i++){
        var thisSeq = "";
        for (var j = 0; j<10; j++) {
            var toss = outcomes[Number(Math.random() < 0.5)];
            thisSeq = thisSeq+toss;
        }
        if (thisSeq.indexOf(test_string) != -1){
            var itMatches = true;
        } else {
            var itMatches = null;
        };

        var row = tab.insertRow(i+1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        cell1.innerHTML = thisSeq;
        if (itMatches) {cell2.innerHTML = "&#9745;";}
        
        matches = matches+Number(itMatches);        
    }
    
    var prob = matches/20000;
    document.getElementById("coin_prob").innerHTML = prob.toFixed(6);
}
