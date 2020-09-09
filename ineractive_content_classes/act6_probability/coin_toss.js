google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['table']});
google.charts.setOnLoadCallback(drawTable);



function drawTable() {
    var test_string = document.getElementById("test").value;
    var results = randTosses(test_string);

        var table = new google.visualization.Table(document.getElementById('table_div'));

        table.draw(results[0], {showRowNumber: false, width: '200px', height: '100%', sort: false, allowHTML: true});
        document.getElementById("probability").innerHTML = "Probability = " + results[1].toFixed(5);

}
      
function randTosses(test_string){
    var data_ar = [["Toss","Matches"]];
    var outcomes = ["H","T"];
    var matches = 0;
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
        matches = matches+Number(itMatches);
        data_ar.push([thisSeq, itMatches]);
        
    }
    
    var prob = matches/20000;
    var data = new google.visualization.arrayToDataTable(data_ar);
    var results = [data,prob];
    return results;
}
