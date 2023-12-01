google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['table']});

// coeffs object holds the possible levels and the metabolic rate effects.



var coeffs = {
    treatment:[["High","Medium","Low"],[2,0,-2]],
    age:[["adult","juvenile"],[4,-4]],
    sex:[["male","female"],[4,-4]],
    strain:[["white","wild"],[-4,4]],
    observer:[["Fred","Mary","Jane"],[0,0,0]],
    chamber:[["A","B","C"],[2,0,-2]]};


function doExperiment() {
    // The function triggered by pushing the button on the web page.
    var design = {
        treatment:["High","Medium","Low"],
        age:[],
        sex:[],
        strain:[],
        observer:[],
        chamber:[]
    };
    var data = [];
    
    design = getSelections(design);
    var combos = getCombos(design);
    if (48 % combos === 0) {
        var reps = Math.floor(48/getCombos(design));
        var data = makeFactors(design, reps);
        data = makeMet(data);
        makeDataTable(data);
        var analysisObject = makeAnalysisPieces(data,design);
        var anova_object = doAnova(analysisObject);
        var anova_array = makeAnovaTableArray(anova_object,["treatment"]);
        var partial_eta_squared = calcPartialEtaSquared(anova_array);
        makeGoogleAnovaTable(anova_array);
        document.getElementById("effect_size").innerHTML = partial_eta_squared.toFixed(3);
        drawChart(data,anova_object);

        
    } else {
        document.getElementById("data_table").innerHTML = "The number of combinations produced with your choices is " + combos + ", but you need a number that divides evenly into 48. Please change your selections.";
    }
    
}


function makeDataTable(data) {
        var data_table = new google.visualization.DataTable();
        data_table.addColumn("string","Treatment");
        data_table.addColumn("string","age");
        data_table.addColumn("string","sex");
        data_table.addColumn("string","strain");
        data_table.addColumn("string","observer");
        data_table.addColumn("string","chamber");
        data_table.addColumn("number","metabolic rate");
        data_table.addRows(data);
        var table = new google.visualization.Table(document.getElementById('data_table'));
        table.draw(data_table, {height: 600});  
}

function getSelections(design) {
    var vars = Object.keys(design);
    for (var i = 1; i < vars.length; i++) {
        var selected = document.getElementsByName(vars[i]);
        for (var j = 0; j < selected.length; j++){
        if(selected[j].checked == true) {
            design[vars[i]].push(selected[j].value);
            }
        }
    }
    
    return design;

}

function getCombos(design) {
    var ncombos = 1;
    var vars = Object.keys(design);
    for (var i = 0; i < vars.length; i++) {
        if(design[vars[i]].length > 0) {
            ncombos = ncombos * design[vars[i]].length;
        }
    } 
    
    return ncombos;
}

function makeFactors(design, reps) {
    var data = [];
    const entries = Object.values(design);
    for (var the_entries = 0; the_entries < entries.length; the_entries++) {
        if (entries[the_entries].length <= 0) {
            entries[the_entries] = "R";
        }
    }
    

    for (var i = 0; i < reps; i++) {
        for (var trt = 0; trt < entries[0].length; trt++){
            var trt_level = entries[0][trt]
            for (var age = 0; age < entries[1].length; age++){
                for (var sex = 0; sex < entries[2].length; sex++){
                    for (var strn = 0; strn < entries[3].length; strn++) {                  
                        for (var obs = 0; obs < entries[4].length; obs++) {                    
                            for (var ch = 0; ch < entries[5].length; ch++) {
                                if (entries[1][age] === "R") {
                                    var age_level = coeffs.age[0][Math.floor(Math.random()*2)];
                                } else {
                                    var age_level = entries[1][age];
                                }
                                
                                if (entries[2][sex] === "R") {
                                    var sex_level = coeffs.sex[0][Math.floor(Math.random()*2)];
                                } else {
                                    var sex_level = entries[2][sex];
                                }
                    
                                if (entries[3][strn] === "R") {
                                    var str_level = coeffs.strain[0][Math.floor(Math.random()*2)];
                                } else {
                                    var str_level = entries[3][strn];
                                }  
                
                                if (entries[4][obs] === "R") {
                                    var obs_level = coeffs.observer[0][Math.floor(Math.random()*3)];
                                } else {
                                    var obs_level = entries[4][obs];
                                }  
                
                                if (entries[5][ch] === "R") {
                                    var ch_level = coeffs.chamber[0][Math.floor(Math.random()*3)];
                                } else {
                                    var ch_level = entries[5][ch];
                                }                         
                            
                                data.push([trt_level,age_level,sex_level,str_level,obs_level,ch_level]);
                            }
                        }
                    }
                }
            }
        }
    }
    
    return data;

}


function makeMet(data) {
    var vars_array = Object.keys(coeffs);
    var coeff_array = Object.values(coeffs);
    for (var i = 0; i < data.length; i++) {
        var arrSum = 0;
        for (var j = 0; j < vars_array.length; j++){
            var data_value = data[i][j];
            var current_index = coeff_array[j][0].indexOf(data_value);
            var arrSum = arrSum + coeff_array[j][1][current_index];
        }
        var resid = jStat.normal.sample(0,2);
        var current_met = 40 + arrSum + resid;
        data[i].push(Number(current_met.toFixed(2)));
    }
    return data;
    
}


function makeAnalysisPieces(data,design) {
    // Make decide which variables to include in the model matrix
    var analysisPieces = new Object();
    var vars_array = Object.keys(design);
    var levels_array = Object.values(design);
    for (var i = 0; i < vars_array.length; i++) {
        if (levels_array[i].length > 1) {
            analysisPieces[vars_array[i]] = [];
        }
    }
    // Next, for the variables included in the model, make the model matrix.
    
    var analysisPieces_keys = Object.keys(analysisPieces);
    
    for (var i = 0; i < analysisPieces_keys.length; i++) {
        var variable_used = analysisPieces_keys[i];
        for (var j = 0; j < data.length; j++) {
            var current_dummies = [];
            for (var k = 0; k < design[variable_used].length - 1; k++) {
                var data_column = vars_array.indexOf(variable_used);
                var data_value = data[j][data_column];
                var factor_level = design[analysisPieces_keys[i]][k];
                var factor_level_last = design[analysisPieces_keys[i]][design[variable_used].length - 1];
                if(data_value == factor_level) {
                    current_dummies.push(1);
                } else if (data_value == factor_level_last) {
                    current_dummies.push(-1);
                } else {
                    current_dummies.push(0);
                }
                // need to compare data value to appropriate level
                // put a 1 in the column if it matches, 0 otherwise
            }
            analysisPieces[variable_used].push(current_dummies);
        }
    }
    analysisPieces.intercept = [];
    analysisPieces.metrate = [];
    for (var i = 0; i < data.length; i++) {
        analysisPieces["intercept"].push([1]);
        analysisPieces["metrate"].push([data[i][6]]);
    }
    
    return analysisPieces;

}


function doAnova(analysisObject) {
    var anova_output = {};
    var vars_array = Object.keys(analysisObject);
    var ss_model = 0;
    var df_model = 0;
    // Get factor ss and df for each variable
    for (var i = 0; i < vars_array.length; i++) {
        if (vars_array[i] != "intercept" && vars_array[i] != "metrate") {
            var current_variable = vars_array[i];
            var x = math.concat(analysisObject.intercept, analysisObject[current_variable]);
            var xprime = math.transpose(x);
            var xprime_x = math.multiply(xprime,x);
            var inv_xprime_x = math.inv(xprime_x);
            var xprime_y = math.multiply(xprime, analysisObject.metrate);
            var betas = math.multiply(inv_xprime_x, xprime_y);
            var predicted = math.multiply(x,betas);
            var grand_mean = betas[0][0];
            var sq_diffs = math.subtract(predicted,grand_mean);
            sq_diffs.forEach(squareEach);
            var ss_predictor = math.sum(sq_diffs);
            var df_predictor = analysisObject[current_variable][0].length;
            anova_output[current_variable] = {predictor_ss: ss_predictor, predictor_df: df_predictor, betas: betas};
            ss_model = ss_model + ss_predictor;
            df_model = df_model + df_predictor;
        }
    }
    var sq_diffs_total = math.subtract(analysisObject.metrate, grand_mean);
    sq_diffs_total.forEach(squareEach);
    var ss_total = math.sum(sq_diffs_total);
    var df_total = 47;
    anova_output["total"] = {total_ss: ss_total, total_df: df_total};
    var ss_resid = ss_total - ss_model;
    var df_resid = df_total - df_model;
    anova_output["residual"] = {residual_ss: ss_resid, residual_df: df_resid};
    return anova_output;
}


function makeAnovaTableArray(anova_object,vars_order_array) {
    var predictors_array = Object.keys(anova_object);
    var anova_table_array = [];
    for (var i = 0; i < predictors_array.length; i++) {
        if (predictors_array[i] != "treatment" && predictors_array[i] != "total" && predictors_array[i] != "residual") {
            vars_order_array.push(predictors_array[i]);
        }
    }
    var ss_resid = anova_object.residual.residual_ss;
    var df_resid = anova_object.residual.residual_df;
    var ms_resid = ss_resid/df_resid;
    
    for (var i = 0; i < vars_order_array.length; i++) {
            var term = vars_order_array[i];
            var df = anova_object[term].predictor_df;
            var ss = anova_object[term].predictor_ss;
            var ms = ss/df;
            var f = ms/ms_resid;
            var p = 1-jStat.centralF.cdf(f,df,df_resid);
            anova_table_array.push([term,df,ss,ms,f,p]);
    }

    // Residual line
    anova_table_array.push(["Residual",df_resid,ss_resid,ms_resid,null,null]);
    // Total line
    anova_table_array.push(["Total",anova_object.total.total_df,anova_object.total.total_ss,null,null,null]);
    return anova_table_array;
}

function squareEach(item, index, arr) {
    arr[index] = item**2;
}

function makeGoogleAnovaTable(anova_array) {
        var anova_table = new google.visualization.DataTable();
        anova_table.addColumn("string","Term");
        anova_table.addColumn("number","DF");
        anova_table.addColumn("number","SS");
        anova_table.addColumn("number","MS");
        anova_table.addColumn("number","F");
        anova_table.addColumn("number","p");
        anova_table.addRows(anova_array);
        
        var formatter = new google.visualization.ColorFormat();
        formatter.addRange(0,0.05,'white','red');
        formatter.addRange(0.05,1,'black','white');
        formatter.format(anova_table,5);
        
        var anova_output_table = new google.visualization.Table(document.getElementById('anova_table'));
        anova_output_table.draw(anova_table, {allowHtml: true, sort: "disabled"});

}


function drawChart(data,fitted_model_object) {
    var resid_ms = fitted_model_object.residual.residual_ss/fitted_model_object.residual.residual_df;
    var int_width = 2*Math.sqrt(resid_ms/16);
    var low_mean = fitted_model_object.treatment.betas[0][0] - fitted_model_object.treatment.betas[1][0] - fitted_model_object.treatment.betas[2][0];
    var high_mean = fitted_model_object.treatment.betas[0][0] + fitted_model_object.treatment.betas[1][0];
    var med_mean = fitted_model_object.treatment.betas[0][0] + fitted_model_object.treatment.betas[2][0];

    var data_google = new google.visualization.DataTable();
        data_google.addColumn('number', 'Treatment');
        data_google.addColumn('number', 'Value');
        data_google.addColumn({id:'i0', type:'number', role:'interval'});
        data_google.addColumn({id:'i1', type:'number', role:'interval'});
        data_google.addColumn({id:'style_column', type:'string', role:'style'});
    
    var graph_data = [];
    for (var i = 0; i < data.length; i++){
        var xval = 0;
        if (data[i][0] === "Low") {
            xval = 0.9;
        } else if (data[i][0] == "Medium") {
            xval = 1.9;
        } else {
            xval = 2.9;
        }
        graph_data.push([xval,data[i][6],null,null,'point {size:2; fill-color: #ff0000;}']);
    }
        
    graph_data.push([1, low_mean, low_mean-int_width, low_mean+int_width, 'point {size:4; fill-color:#0000ff;}']);
    graph_data.push([2, med_mean, med_mean-int_width, med_mean+int_width, 'point {size:4; fill-color:#0000ff;}']);
    graph_data.push([3, high_mean, high_mean-int_width, high_mean+int_width, 'point {size:4; fill-color:#0000ff;}']);
        
    data_google.addRows(graph_data);

        var options = {
            title: "Means and CI's by treatment group",
            hAxis: {title: "Treatment", ticks: [{v:1, f:"Low"},{v:2, f:"Medium"},{v:3, f:"High"}]},
            vAxis: {title: "Metabolic rate", 
                viewWindowMode: "explicit", 
                viewWindow: {min: 20, max: 60}
            },
            intervals: {style: 'bars', barWidth: 2, color:'series-color'},
            legend: "none",


        };

        var chart = new google.visualization.ScatterChart(document.getElementById('graph_div'));
        chart.draw(data_google, options);
}

function calcPartialEtaSquared(anova_array) {
    var tr_ss = anova_array[0][2];
    var res_ss = anova_array[anova_array.length - 2][2];
    var partial_eta_squared = tr_ss/(tr_ss + res_ss);
    return partial_eta_squared;
    
}
