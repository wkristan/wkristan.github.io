google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['table']});

// coeffs object holds the possible levels, the weight effects, and the metabolic rate effects.
// Consider making the amount of difference relative to the random variation selectable

// Add one more ANOVA model - don't account for weight, allow them to see how the choices
// of holding constant vs. randomizing vs. accounting for affect the outcome.
// Then add in the complication of a confounded variable (weight), and how to use the
// Type I and Type II tables to understand what's happening.
// Can set up tabs so that the students can toggle between by pushing a button.

var coeffs = {
    treatment:[["High","Medium","Low"],[-2,-1,0],[1,0,-1]],
    age:[["adult","juvenile"],[5,-5],[1,-1]],
    sex:[["male","female"],[-4,4],[1,-1]],
    strain:[["white","wild"],[8,-8],[1,-1]],
    observer:[["Fred","Mary","Jane"],[0,0,0],[0,0,0]],
    chamber:[["A","B","C"],[0,0,0],[2,0,-2]]};

    
    // Will use a sd for weight of 2, for met of 6, and a wt/met slope of 0.15

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
        data = makeWeights(data);
        data = makeMet(data);
        var data_table = new google.visualization.DataTable();
        data_table.addColumn("string","Treatment");
        data_table.addColumn("string","age");
        data_table.addColumn("string","sex");
        data_table.addColumn("string","strain");
        data_table.addColumn("string","observer");
        data_table.addColumn("string","chamber");
        data_table.addColumn("number","weight");
        data_table.addColumn("number","metabolic rate");
        data_table.addRows(data);
        var table = new google.visualization.Table(document.getElementById('data_table'));
        table.draw(data_table);
            
        var analysisObject = makeAnalysisPieces(data,design);
        var full_model_output = fullModelAnalysis(analysisObject);
        var block_anova = doAnova(analysisObject,full_model_output.grand_mean, full_model_output.total_ss)
        var type2_analysis = doTypeII(analysisObject,full_model_output.full_model_ss, full_model_output.total_ss);
        var type1_analysis_wtfirst = doTypeI(analysisObject,full_model_output.total_ss,["weight","treatment"]);
        var type1_analysis_trtfirst = doTypeI(analysisObject,full_model_output.total_ss,["treatment","weight"]);
        var block_anova_array = makeAnovaTableArray(block_anova,full_model_output,["treatment"]);
        var type2_array = makeAnovaTableArray(type2_analysis,full_model_output,["weight","treatment"]);
        var type1wt_array = makeAnovaTableArray(type1_analysis_wtfirst,full_model_output,["weight","treatment"]);
        var type1trt_array = makeAnovaTableArray(type1_analysis_trtfirst,full_model_output,["treatment","weight"]);
        
        var block_data_table = makeGoogleTable(block_anova_array);
        var block_table = new google.visualization.Table(document.getElementById('block_anova'));
        block_table.draw(block_data_table, {sort: "disabled"});
        
        var type2_data_table = makeGoogleTable(type2_array);
        var type2_table = new google.visualization.Table(document.getElementById('typeII_anova'));
        type2_table.draw(type2_data_table, {sort: "disabled"});
        
        var type1wt_data_table = makeGoogleTable(type1wt_array);
        var type1wt_table = new google.visualization.Table(document.getElementById('typeI_wtfirst'));
        type1wt_table.draw(type1wt_data_table, {sort: "disabled"});
        
        var type1trt_data_table = makeGoogleTable(type1trt_array);
        var type1trt_table = new google.visualization.Table(document.getElementById('typeI_trtfirst'));
        type1trt_table.draw(type1trt_data_table, {sort: "disabled"});

        
    } else {
        document.getElementById("data_table").innerHTML = "The number of combinations produced with your choices is " + combos + ", but you need a number that divides evenly into 48. Please change your selections.";
    }
    
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
        if(design[vars[i]].length == 0) {
            ncombos = ncombos * 1;
        } else {
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

function makeWeights(data) {
    var vars_array = Object.keys(coeffs);
    var coeff_array = Object.values(coeffs);
    for (var i = 0; i < data.length; i++) {
        var arrSum = 0;
        for (var j = 0; j < vars_array.length; j++){
            var data_value = data[i][j];
            var current_index = coeff_array[j][0].indexOf(data_value);
            var arrSum = arrSum + coeff_array[j][1][current_index];
        }
        var resid = jStat.normal.sample(0,5);
        var current_wt = arrSum + 30 + resid;
        data[i].push(Number(current_wt.toFixed(2)));
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
            var arrSum = arrSum + coeff_array[j][2][current_index];
        }
        var weight = data[i][6];
        var resid = jStat.normal.sample(0,5);
        var current_met = 40 + arrSum + 0.5*weight + resid;
        data[i].push(Number(current_met.toFixed(2)));
    }
    return data;
    
}

function makeAnalysisPieces(data,design) {
    // Make the dummy codes needed for a model matrix
    var analysisPieces = new Object();
    var vars_array = Object.keys(design);
    var levels_array = Object.values(design);
    for (var i = 0; i < vars_array.length; i++) {
        if (levels_array[i].length > 1) {
            analysisPieces[vars_array[i]] = [];
        }
    }
    // Next, for the variables included in the model, add a row for each fow in the table to the model matrix.
    
    var analysisPieces_keys = Object.keys(analysisPieces);
    
    for (var i = 0; i < analysisPieces_keys.length; i++) {
        var variable_used = analysisPieces_keys[i];
        for (var j = 0; j < data.length; j++) {
            var current_dummies = [];
            for (var k = 0; k < design[variable_used].length - 1; k++) {
                var data_column = vars_array.indexOf(variable_used);
                var data_value = data[j][data_column];
                var factor_level = design[analysisPieces_keys[i]][k];
                if(data_value == factor_level) {
                    current_dummies.push(1);
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
    analysisPieces.weight = [];
    analysisPieces.metrate = [];
    for (var i = 0; i < data.length; i++) {
        analysisPieces["intercept"].push([1]);
        analysisPieces["weight"].push([data[i][6]]);
        analysisPieces["metrate"].push([data[i][7]]);
    }
    
    return analysisPieces;

}

function doAnova(analysisObject,grand_mean,ss_total) {
    var block_anova_output = {};
    var vars_array = Object.keys(analysisObject);
    // Do the leave one out models
    for (var i = 0; i < vars_array.length; i++) {
        if (vars_array[i] != "intercept" && vars_array[i] != "metrate" && vars_array[i] != "weight") {
            var current_variable = vars_array[i];
            var x = math.concat(analysisObject.intercept, analysisObject[current_variable]);
            var xprime = math.transpose(x);
            var xprime_x = math.multiply(xprime,x);
            var inv_xprime_x = math.inv(xprime_x);
            var xprime_y = math.multiply(xprime, analysisObject.metrate);
            var betas = math.multiply(inv_xprime_x, xprime_y);
            var predicted = math.multiply(x,betas);
            var sq_diffs = math.subtract(predicted,grand_mean);
            sq_diffs.forEach(squareEach);
            var ss_predictor = math.sum(sq_diffs);
            block_anova_output[current_variable] = {predictor_ss: ss_predictor, predictor_df: analysisObject[current_variable][0].length, betas: betas}
        }
    }
    return block_anova_output;
}


function doTypeII(analysisObject,ss_model_full,ss_total) {
    var type2_output = {};
    var vars_array = Object.keys(analysisObject);
    // Do the leave one out models
    for (var i = 0; i < vars_array.length; i++) {
        if (vars_array[i] != "intercept" && vars_array[i] != "metrate") {
            x = analysisObject.intercept;
            for (var j = 0; j < vars_array.length; j++) {
                if (vars_array[j] != "intercept" && vars_array[j] != "metrate" && vars_array[i] != vars_array[j]) {
                    x = math.concat(x,analysisObject[vars_array[j]]);
                }
            }
            var xprime = math.transpose(x);
            var xprime_x = math.multiply(xprime,x);
            var inv_xprime_x = math.inv(xprime_x);
            var xprime_y = math.multiply(xprime, analysisObject.metrate);
            var betas = math.multiply(inv_xprime_x, xprime_y);
            var predicted = math.multiply(x,betas);
            var sq_residuals = math.subtract(analysisObject.metrate, predicted);
            sq_residuals.forEach(squareEach);
            var ss_resid_model = math.sum(sq_residuals);
            var ss_model_current = ss_total - ss_resid_model;
            type2_output[vars_array[i]] = {predictor_ss: ss_model_full - ss_model_current, predictor_df: analysisObject[vars_array[i]][0].length, betas: betas}
        }
    }
    return type2_output;
}

function doTypeI(analysisObject,ss_total,vars_order_array) {
    // Do the model with only weight first
    var type1wt_output = {};
    var vars_array = Object.keys(analysisObject);
    for (var i = 0; i < vars_array.length; i++) {
        if (vars_array[i] != "weight" && vars_array[i] != "treatment" && vars_array[i] != "metrate" && vars_array[i] !="intercept") {
            vars_order_array.push(vars_array[i]);
        }
    }
    var x = analysisObject.intercept;
    var ss_model = 0;
    for (var i = 0; i < vars_order_array.length; i++) {
        var current_variable = vars_order_array[i];
        x = math.concat(x,analysisObject[current_variable]);
        var xprime = math.transpose(x);
        var xprime_x = math.multiply(xprime,x);
        var inv_xprime_x = math.inv(xprime_x);
        var xprime_y = math.multiply(xprime, analysisObject.metrate);
        var betas = math.multiply(inv_xprime_x, xprime_y);
        var predicted = math.multiply(x,betas);
        var sq_residuals = math.subtract(analysisObject.metrate, predicted);
        sq_residuals.forEach(squareEach);
        var ss_resid_model = math.sum(sq_residuals);
        var ss_model_current = ss_total - ss_resid_model;
        var predictor_ss = ss_model_current - ss_model;
        var predictor_df = analysisObject[current_variable][0].length;
        type1wt_output[current_variable] = {predictor_ss: predictor_ss, predictor_df: predictor_df, betas: betas};
        ss_model = ss_model_current;
    }
    return type1wt_output;

}

function fullModelAnalysis(analysisObject) {
    // Total ss
    var grand_mean = math.mean(analysisObject.metrate);
    var sq_diffs = math.subtract(analysisObject.metrate, grand_mean);
    sq_diffs.forEach(squareEach);
    var ss_total = math.sum(sq_diffs);
    // Full model ss
    var x = analysisObject.intercept;
    var vars_array = Object.keys(analysisObject);
    for (var i = 0; i < vars_array.length; i++) {
        if (vars_array[i] != "intercept" && vars_array[i] != "metrate" && vars_array[i]) {
            var current_variable = vars_array[i];
            x = math.concat(x,analysisObject[current_variable]);
        }
    }
    var xprime = math.transpose(x);
    var xprime_x = math.multiply(xprime,x);
    var inv_xprime_x = math.inv(xprime_x);
    var xprime_y = math.multiply(xprime, analysisObject.metrate);
    var betas = math.multiply(inv_xprime_x, xprime_y);
    var predicted = math.multiply(x,betas);
    var sq_residuals = math.subtract(analysisObject.metrate, predicted);
    sq_residuals.forEach(squareEach);
    var ss_resid_model = math.sum(sq_residuals);
    var ss_model_full = ss_total - ss_resid_model;
    // check that it works by squaring differences between predicted and grand mean too
    var sq_diffs_model = math.subtract(predicted,grand_mean);
    sq_diffs_model.forEach(squareEach);
    var ss_model_full_diffs = math.sum(sq_diffs_model);
    // Next the full model df
    var model_df = 0;
    for (var i = 0; i < vars_array.length; i++) {
        if (vars_array[i] != "intercept" && vars_array[i] != "metrate") {
            model_df = model_df + analysisObject[vars_array[i]][0].length;
        }
    }
    // Now assemble to the output
    var full_model_output = {total_ss: ss_total, total_df: 48 - 1, full_model_ss: ss_model_full, full_model_df: model_df, residual_ss: ss_resid_model, residual_df: 48 - 1 - model_df, grand_mean: grand_mean, betas: betas};
    return full_model_output;
}

function makeAnovaTableArray(results_object,full_model_output,vars_order_array) {
    var predictors_array = Object.keys(results_object);
    var anova_table_array = [];
    for (var i = 0; i < predictors_array.length; i++) {
        if (predictors_array[i] != "weight" && predictors_array[i] != "treatment") {
            vars_order_array.push(predictors_array[i]);
        }
    }
    var ss_resid = full_model_output.residual_ss;
    var df_resid = full_model_output.residual_df;
    var ms_resid = ss_resid/df_resid;
    
    for (var i = 0; i < vars_order_array.length; i++) {
            var term = vars_order_array[i];
            var df = results_object[term].predictor_df;
            var ss = results_object[term].predictor_ss;
            var ms = ss/df;
            var f = ms/ms_resid;
            var p = 1-jStat.centralF.cdf(f,df,df_resid);
            anova_table_array.push([term,df,ss,ms,f,p]);
    }

    // Residual line
    term = "Residual";
    df = df_resid;
    ss = ss_resid;
    ms = ms_resid;
    f = null;
    p = null;
    anova_table_array.push([term,df,ss,ms,f,p]);
    return anova_table_array;
}

function squareEach(item, index, arr) {
    arr[index] = item**2;
}

function makeGoogleTable(anova_array) {
        var anova_table = new google.visualization.DataTable();
        anova_table.addColumn("string","Term");
        anova_table.addColumn("number","DF");
        anova_table.addColumn("number","SS");
        anova_table.addColumn("number","MS");
        anova_table.addColumn("number","F");
        anova_table.addColumn("number","p");
        anova_table.addRows(anova_array);
        return anova_table;
}
