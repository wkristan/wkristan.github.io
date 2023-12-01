google.charts.load('current', {'packages':['corechart', 'table']});
google.charts.setOnLoadCallback(drawChart);

//Converting this to be more interactive. The students will be able to select the size of the main effects and interactions.
//For these data, the observed means are in the no_inter_data_ar matrix below.
//The observed coefficients, using sum coding so that the intercept is the grand mean, are:
//Intercept = 597.75, Fresh = 71.42, Female = -17.75, Fresh:Female = -8.75
//Predicted means are: 
//Fresh, Female = Intercept + Fresh + Female + Fresh:Female
//Rancid, Female = Intercept - Fresh + Female - Fresh:Female
//Fresh, Male = Intercept + Fresh - Female - Fresh:Female
//Rancid, Male = Intercept - Fresh - Female + Fresh:Female
//Need to add number inputs that start with the observed main effect and interaction coefficients, but allow students to change them.
//The observed SS are in table_nointer matrix.

    
        
function drawChart() {
    
    var options = {
            vAxis: {title: "Consumption", viewWindowMode: "explicit", viewWindow: {min: 400, max: 800}},
            hAxis: {title: "Sex"},
            width: 520,
            height: 300,
            chartArea: {width: 330, height: 230},
            pointSize: 10,
            series: {
                2:{visibleInLegend: false}
            }
        };

    var data_array = makeChartArray();
    
    var chart_data_array = data_array[0];
    
    var chart_data = google.visualization.arrayToDataTable(chart_data_array);
        
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        
    options["title"] = "Interaction plot";
        
    chart.draw(chart_data, options);
    
    drawTable(data_array[1]);

};

function drawTable(chart_data_array) {
    
    var anova_table_array = makeAnovaTableArray(chart_data_array);
        
    var table = new google.visualization.Table(document.getElementById('table_div'));

    var anova_table = google.visualization.arrayToDataTable(anova_table_array);
    
    var formatter_one = new google.visualization.NumberFormat({formatType: "scientific", fractionDigits: "1"});
    var formatter_two = new google.visualization.NumberFormat({formatType: "scientific", fractionDigits: "2"});
    var formatter_three = new google.visualization.NumberFormat({formatType: "scientific", fractionDigits: "3"});

    formatter_one.format(anova_table,2);
    formatter_one.format(anova_table,3);
    formatter_one.format(anova_table,4);
    formatter_three.format(anova_table,5);

    table.draw(anova_table, {showRowNumber: false, sort: "disable"});
}


function makeChartArray() {
    
    var sex_main = document.getElementById("sex_main").value/2;
    var fat_main = document.getElementById("fat_main").value/2;
    var sex_fat_inter = document.getElementById("sex_fat_inter").value/2;
    
    var ff = 597.75 + fat_main - sex_main - sex_fat_inter;
    var rf = 597.75 - fat_main - sex_main + sex_fat_inter;
    var fm = 597.75 + fat_main + sex_main + sex_fat_inter;
    var rm = 597.75 - fat_main + sex_main - sex_fat_inter;
    var female_mean = (ff+rf)/2;
    var male_mean = (fm+rm)/2;
    var fresh_mean = (ff+fm)/2;
    var rancid_mean = (rf+rm)/2;
    
    var chart_data_array = [
    ["Sex","Fresh",{'type': 'string', 'role': 'style'},"Rancid",{'type': 'string', 'role': 'style'}, "SexMean",{'type': 'string', 'role': 'style'}],
    ["F",ff, null,rf,null,female_mean,'point {fill-color: #FFC0CB}'],
    [null,fresh_mean,'point { shape-type: star; size: 12; fill-color: #0000FF; }',rancid_mean,'point { shape-type: star; size: 12; fill-color: #FF0000; }',null,null],
    ["M",fm, null,rm, null,male_mean,'point {fill-color: #89cff0}']
];
    var subgroup_means = [[ff,rf],[fm,rm]];

return([chart_data_array,subgroup_means]);
    
}

function makeAnovaTableArray(chart_data_array) {
    var grand_mean = 597.75;
    var subgroup_ss = 0;
    var sex_ss = 0;
    var fat_ss = 0;
    var interaction_ss = 0;
    var residual_ss = 11667;
    
    for (i = 0; i < 2; i++) {
        for (j = 0; j < 2; j++) {
            subgroup_ss = subgroup_ss + 3*Math.pow(chart_data_array[i][j] - grand_mean,2);
        }
    }
    
    for (i = 0; i < 2; i++) {
        var current_mean = (chart_data_array[i][0] + chart_data_array[i][1])/2;
        sex_ss = sex_ss + 6*Math.pow(current_mean - grand_mean,2);
    }

    for (i = 0; i < 2; i++) {
        var current_mean = (chart_data_array[0][i] + chart_data_array[1][i])/2;
        fat_ss = fat_ss + 6*Math.pow(current_mean - grand_mean,2);
    }
    
    interaction_ss = subgroup_ss - sex_ss - fat_ss;
    var residual_ms = residual_ss/8;
    var sex_f = sex_ss/residual_ms;
    var fat_f = fat_ss/residual_ms;
    var int_f = interaction_ss/residual_ms;
    var sex_p = 1-jStat.centralF.cdf(sex_f,1,8);
    var fat_p = 1-jStat.centralF.cdf(fat_f,1,8);
    var int_p = 1-jStat.centralF.cdf(int_f,1,8);
    
    var anova_table_array = [
            ["Source","DF","SS","MS","F","p"],
            ["Sex",1,sex_ss, sex_ss, sex_f, sex_p],
            ["Fat",1,fat_ss,fat_ss, fat_f, fat_p],
            ["Sex x Fat", 1, interaction_ss, interaction_ss, int_f, int_p],
            ["Residuals",8,residual_ss,residual_ss/8, null,null]
        ];    
    
    
    var anova_table_array_obs = [
            ["Source","DF","SS","MS","F","p"],
            ["Sex",1,3781, 3781, 2.59, {v: 0.1460, f: "0.1460"}],
            ["Fat",1,61204,61204,41.97, {v: 0.0002, f: "0.0002"}],
            ["Sex x Fat", 1, 919, 919, 0.63, {v: 0.4503, f: "0.4503"}],
            ["Residuals",8,11667,1458, null,null]
        ];
        
    return(anova_table_array);

}

function reset() {
    document.getElementById("sex_main").value = 35.5;
    document.getElementById("fat_main").value = 142.8333;
    document.getElementById("sex_fat_inter").value = 17.5;
    drawChart();
    
}
