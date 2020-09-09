google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
    

function drawChart() {
        var lower = document.getElementById("lower").value;
        var upper = document.getElementById("upper").value;
        var data_ar = normCurve(lower, upper);
        var data = google.visualization.arrayToDataTable(data_ar);
        var options = {
            title: "Standard normal distribution",
            hAxis: {title: "z", baselineColor: "transparent"},
            vAxis: {title: "Probability density"},
            legend: "none",
            series: {
                0: {areaOpacity: 0, color: "blue"},
                1: {areaOpacity: 1, lineWidth: 0, color: "red"}
            }
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(data, options);
        // Calculate the probability for the shaded region
        var lp = jStat.normal.cdf(Number(lower),0,1);
        var up = jStat.normal.cdf(Number(upper),0,1);
        var pval = up - lp;
        
        if (pval < 0) {
            document.getElementById("probability").innerHTML = "Set the upper limit higher than the lower limit";
        } else {
            document.getElementById("probability").innerHTML = "p = " + pval.toFixed(4);
        }
      }
      
      
function normCurve(ll, ul) {
       var dat = [["z","y", "fill.y"]];
       var j = -4;
       var k = 0;
       var l = 0;
       for(var i=0; i<101; i++) {
            j = j + 8/100;
            k = jStat.normal.pdf(j,0,1);
            if (j <= ll || j >= ul) {
                l = null;
            } else {
                l = k;
            }
            dat.push([j , k, l]);
       }
       return dat;
    };

