google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
//google.charts.setOnLoadCallback(drawChart1);

    

function drawChart() {
        var n = Number(document.getElementById("n").value);
        var alpha = Number(document.getElementById("alpha").value);
        var data_ar = curve(n, alpha);
        var data = google.visualization.arrayToDataTable(data_ar);
        var options = {
            title: "Effect size and power",
            hAxis: {title: "Effect size"},
            vAxis: {title: "Power"},
            legend: "none",
            series: {
                0: {color: "blue"},
            }
        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);

      }
      
      
function curve(ss, alpha) {
       var dat = [["Effect size","Power"]];
       var t_beta = 0;
       var t_crit = jStat.studentt.inv(1-alpha/2, 2*ss-2);
       var ES = 0;
       var power = 0;
       for(var i=0; i<201; i++) {
            ES = ES + 1/100;
            k = ES/Math.sqrt(2/ss);
            t_beta = k - t_crit;
            power = jStat.studentt.cdf(t_beta,2*ss-2);

            dat.push([ES,power]);
       }

       return dat;
    };

