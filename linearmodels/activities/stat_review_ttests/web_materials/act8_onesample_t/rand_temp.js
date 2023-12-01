var x_data = [98.77, 99.09, 98.99, 98.26, 98.63, 98.99, 98.36, 98.71, 98.61, 98.61, 98.54, 98.38, 99.09, 98.99, 98.62, 98.86, 98.59, 98.47, 98.40, 98.81];
var y_data = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

    function drawChart() {

        var trace = {
            x: x_data,
            y: y_data,
            type: 'scatter',
            mode: 'markers'
        };
        
        var data = [trace];
        
        var layout = {
            title: {
                text: "Figure 1: random sample of body <br>temperatures from 20 people, &mu;"
            },
            yaxis: {
                title: false,
                showticklabels: false
            },
            xaxis: {
                title: {
                    text: "Body temperature"
                },
                range: [97.6,99.6]
            }
        }
        
        Plotly.newPlot("chart_div", data, layout);
      }
      
function randData(){
       var dat = [];
       var j = 0;
       for(var i=0; i<20; i++){
            j = jStat.normal.sample(98.6, 0.3);
            dat.push(j);
       }
       return dat;
    }
    
function meanDat(dat) {
    var tot = 0;
    for(var i = 0;i<20;i++){
        tot = tot + dat[i];
    }
    var mean = tot/20;
    return mean;
}
              
              
function updateChart() {
var dataArray = randData();
x_data = dataArray;
var meanData = meanDat(dataArray);

document.getElementById("mean").innerHTML = meanData.toFixed(2);
drawChart();
};
