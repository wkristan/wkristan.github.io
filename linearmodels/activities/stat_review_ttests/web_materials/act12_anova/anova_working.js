google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart1);
google.charts.setOnLoadCallback(drawChart2);

    

function drawChart1() {
        var data_ar = twoDists();
        var data = google.visualization.arrayToDataTable(data_ar);
        var means = anovaTable(data_ar);
        var options = {
            title: "Random samples of two groups from the same population",
            hAxis: {title: "Period", ticks: [{v:1, f:"Early predynastic"},{v:2, f:"Roman"}], viewWindowMode: "explicit", viewWindow: {min: 0.5, max: 2.5}},
            vAxis: {title: "Maximum skull breadth", 
                viewWindowMode: "explicit", 
                viewWindow: {min: 115, max: 150}, 
                ticks: [
                {v: 120, f: "120"}, 
                {v: 130, f: "130"}, 
                {v: 140, f: "140"}, 
                {v: 150, f: "150"}, 
                {v: means[0], f: "GM"}, 
                {v: means[1], f: ""}, 
                {v: means[2], f: ""},
                ]
            },
            legend: "none",


        };

        var chart = new google.visualization.ScatterChart(document.getElementById('chart_div1'));
        chart.draw(data, options);
}
      
      
function twoDists() {
       var dat = [["Group","Maximum breadth"]];
       var k = 0;
       for (var i = 0; i < 2; i++) {
        for (var j=0; j<29+i; j++) {
            k = jStat.normal.sample(133.93, 2.7);
            dat.push([i+1, k]);
            }
       }
       return dat;
    };

function extractResp(data) {
    var resp = [];
    for (var i = 0; i < data.length; i++) {
        resp.push(data[i][1]);
    }
    return resp;
}

function anovaTable(dat) {
    var alldat = extractResp(dat.slice(1,60));
    var ep_dat = extractResp(dat.slice(1,30));
    var ro_dat = extractResp(dat.slice(30,60));
    var means = [jStat.mean(alldat), jStat.mean(ep_dat), jStat.mean(ro_dat)];
    var tot_ss = jStat(alldat).sumsqerr();
    var err_ss = jStat(ep_dat).sumsqerr() + jStat(ro_dat).sumsqerr();
    var grp_ss = tot_ss - err_ss;
    var err_ms = err_ss/57;
    var grp_ms = grp_ss;
    var f_rat = grp_ms/err_ms;
    var p_val = 1-jStat.centralF.cdf(f_rat, 1, 57);
    document.getElementById("ss_btwn_rand").innerHTML = grp_ss.toFixed(2);
    document.getElementById("ss_error_rand").innerHTML = err_ss.toFixed(2);
    document.getElementById("ss_total_rand").innerHTML = tot_ss.toFixed(2);
    document.getElementById("ms_btwn_rand").innerHTML = grp_ms.toFixed(2);
    document.getElementById("ms_error_rand").innerHTML = err_ms.toFixed(2);
    document.getElementById("F_stat_rand").innerHTML = f_rat.toFixed(3);
    document.getElementById("p_val_rand").innerHTML = p_val.toFixed(4);
    if (p_val < Number(0.05)) {
        document.getElementById("p_val_rand").style.color = "red";
    } else {
        document.getElementById("p_val_rand").style.color = "black";

    }
    
    return means;
    
}

function drawChart2() {
        var mean_diff = document.getElementById("diff_btwn_means").value;
        var data = makeData(mean_diff);
        var options = {
            title: "Comparison of within and between SS",
            hAxis: {title: "Period", ticks: [{v:15, f:"Early predynastic"},{v:49, f:"Roman"}]},
            vAxis: {title: "Maximum skull breadth", 
                viewWindowMode: "explicit", 
                viewWindow: {min: 115, max: 150}
            },
            intervals: {'color':'series-color'},
            interval: {
                'i0': { 'color':'red', 'style':'bars', 'barWidth':0,'lineWidth':4, 'pointSize':0, 'fillOpacity':1},
                'i1': { 'color':'black', 'style':'bars', 'barWidth':0,'lineWidth':0, 'pointSize':10, 'fillOpacity':1}
                
            },
            legend: "none",


        };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div2'));
        chart.draw(data, options);
}
      
      
function makeData(mean_diff) {
        var delta = mean_diff - 4.6;
        var SST = 1841.7;
        var SSG = 59 * (mean_diff*mean_diff/4);
        var SSE_target = SST-SSG;
        var SSE_mult = SSE_target/1537;
        var dat_ar = [
            [1,133.9,-2.3,-0.599999999999994],
            [2,133.9,-2.3,-6.59999999999999],
            [3,133.9,-2.3,-0.599999999999994],
            [4,133.9,-2.3,-12.6],
            [5,133.9,-2.3,4.40000000000001],
            [6,133.9,-2.3,6.40000000000001],
            [7,133.9,-2.3,7.40000000000001],
            [8,133.9,-2.3,-6.59999999999999],
            [9,133.9,-2.3,-0.599999999999994],
            [10,133.9,-2.3,2.40000000000001],
            [11,133.9,-2.3,-2.59999999999999],
            [12,133.9,-2.3,2.40000000000001],
            [13,133.9,-2.3,-5.59999999999999],
            [14,133.9,-2.3,0.400000000000006],
            [15,133.9,-2.3,9.40000000000001],
            [16,133.9,-2.3,-0.599999999999994],
            [17,133.9,-2.3,3.40000000000001],
            [18,133.9,-2.3,0.400000000000006],
            [19,133.9,-2.3,7.40000000000001],
            [20,133.9,-2.3,0.400000000000006],
            [21,133.9,-2.3,-5.59999999999999],
            [22,133.9,-2.3,3.40000000000001],
            [23,133.9,-2.3,2.40000000000001],
            [24,133.9,-2.3,-3.59999999999999],
            [25,133.9,-2.3,-1.59999999999999],
            [26,133.9,-2.3,6.40000000000001],
            [27,133.9,-2.3,-3.59999999999999],
            [28,133.9,-2.3,-4.59999999999999],
            [29,133.9,-2.3,-0.599999999999994],
            [30,null,null,null],
            [31,null,null,null],
            [32,null,null,null],
            [33,133.9,2.3,0.799999999999983],
            [34,133.9,2.3,-0.200000000000017],
            [35,133.9,2.3,-8.20000000000002],
            [36,133.9,2.3,-6.20000000000002],
            [37,133.9,2.3,1.79999999999998],
            [38,133.9,2.3,-10.2],
            [39,133.9,2.3,-0.200000000000017],
            [40,133.9,2.3,-10.2],
            [41,133.9,2.3,-4.20000000000002],
            [42,133.9,2.3,2.79999999999998],
            [43,133.9,2.3,6.79999999999998],
            [44,133.9,2.3,4.79999999999998],
            [45,133.9,2.3,-1.20000000000002],
            [46,133.9,2.3,0.799999999999983],
            [47,133.9,2.3,5.79999999999998],
            [48,133.9,2.3,2.79999999999998],
            [49,133.9,2.3,1.79999999999998],
            [50,133.9,2.3,0.799999999999983],
            [51,133.9,2.3,-3.20000000000002],
            [52,133.9,2.3,8.79999999999998],
            [53,133.9,2.3,1.79999999999998],
            [54,133.9,2.3,-5.20000000000002],
            [55,133.9,2.3,6.79999999999998],
            [56,133.9,2.3,-2.20000000000002],
            [57,133.9,2.3,-4.20000000000002],
            [58,133.9,2.3,0.799999999999983],
            [59,133.9,2.3,-7.20000000000002],
            [60,133.9,2.3,3.79999999999998],
            [61,133.9,2.3,10.8],
            [62,133.9,2.3,-0.200000000000017]
        ];
        
    for (var i = 0; i<62; i++) {
        if (typeof(dat_ar[i][1]) !== "undefined" && dat_ar[i][1]) {
            var sign_delta = Math.sign(delta);
            var sign_grp_mean_diff = Math.sign(dat_ar[i][2]);
            var sign_resid = Math.sign(dat_ar[i][3]);
            var new_grp_mean_diff = sign_grp_mean_diff*(Math.abs(dat_ar[i][2]) + delta/2);
            var new_resid = sign_resid*Math.sqrt(SSE_mult*dat_ar[i][3]*dat_ar[i][3]);
            dat_ar[i][1] = dat_ar[i][1] + new_grp_mean_diff;
            dat_ar[i][2] = dat_ar[i][1];
            dat_ar[i][3] = dat_ar[i][1] + new_resid;
        }
    }
    
    var data = new google.visualization.DataTable();
        data.addColumn('number', 'x');
        data.addColumn('number', 'Group mean');
        data.addColumn({id:'i0', type:'number', role:'interval'});
        data.addColumn({id:'i1', type:'number', role:'interval'});
        data.addRows(dat_ar);
    
    var err_ms = SSE_target/57;
    var f_rat = SSG/err_ms;
    var p_val = 1-jStat.centralF.cdf(f_rat, 1, 57);
    
    if (SSG < SST) {
        document.getElementById("ss_btwn2").innerHTML = SSG.toFixed(2);
        document.getElementById("ss_error2").innerHTML = SSE_target.toFixed(2);
        document.getElementById("ss_total2").innerHTML = SST.toFixed(2);
    } else {
        document.getElementById("ss_btwn2").innerHTML = 1841.70;
        document.getElementById("ss_error2").innerHTML = 0;
        document.getElementById("ss_total2").innerHTML = 1841.70;
    };
    
    return data;
}

function resetDiff() {
    document.getElementById("diff_btwn_means").value = 4;
    drawChart2();
}

