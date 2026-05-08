// Calculation of various probabilities

// Set up an array of the values, including marginal totals and grand totals

var ds_data = [[60,40,100],[5,95,100],[65,135,200]];
var td_indexes = [[1,2,3],[5,6,7],[9,10,11]];


function initializeTable() {
    var ds_table = document.getElementById("dsData");
    var cells = ds_table.getElementsByTagName("TD");
    var ds_rate_num = document.getElementById("ds_rate_num").value;
    var ds_rate_denom = document.getElementById("ds_rate_denom").value;
    var sensitivity = document.getElementById("sensitivity").value;
    var false_pos = document.getElementById("false_pos").value;
    ds_data[0][2] = ds_rate_num;
    ds_data[2][2] = ds_rate_denom;
    ds_data[1][2] = ds_rate_denom - ds_rate_num;
    ds_data[0][0] = Math.round(100 * ds_rate_num * sensitivity)/100;
    ds_data[0][1] = Math.round(100 * ds_rate_num * (1-sensitivity))/100;
    ds_data[1][0] = Math.round(100 * ds_data[1][2] * false_pos)/100;
    ds_data[1][1] = Math.round(100 * ds_data[1][2] * (1-false_pos))/100;
    ds_data[2][0] = Math.round(100 * (ds_data[0][0] + ds_data[1][0]))/100;
    ds_data[2][1] = Math.round(100 * (ds_data[0][1] + ds_data[1][1]))/100;
    
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            cells[td_indexes[i][j]].innerHTML = ds_data[i][j];
        }
    }
    
    probCalc();

}


// Set up an array of row states, and another of column states

var rowIds = ["ds","no_ds"];
var colIds = ["positive","negative"];
var rowState = ["None","None"];
var colState = ["None","None"];

// Main loop - to be executed with any change in the table

function setStates(selection) {
    var selected = selection.value;
    var rowInd = rowIds.indexOf(selection.id);
    var colInd = colIds.indexOf(selection.id);
    
    if (selected == "None") {
        noneSetStates(selected, rowInd, colInd);
        noneClearP();
        setButtons();
        styleTable();
    }
    if (selected == "Marginal") {
        marginalSetStates(selected, rowInd, colInd);
    }
    if (selected == "Joint") {                
        jointSetStates(selected, rowInd, colInd);
    }
    if (selected == "Given") {
        givenSetStates(selected, rowInd, colInd);
    }
    if (selected == "Conditional") {
        condSetStates(selected, rowInd, colInd);
    }
    
    probCalc();

}

function probCalc() {

    // now, depedinding on what is returned set the states

    if (rowState.indexOf("Marginal") > -1 || colState.indexOf("Marginal") > -1) {
        var rowInd = rowState.indexOf("Marginal");
        var colInd = colState.indexOf("Marginal");
        marginalCalcP(rowInd, colInd);
        setButtons();
        styleTable();
    }
    
    if (rowState.indexOf("Joint") > -1 || colState.indexOf("Joint") > -1) {
        jointCalcP();
        setButtons();
        styleTable();
    }
    
    if (rowState.indexOf("Given") > -1 || colState.indexOf("Given") > -1) {
        givenCalcP();
        setButtons();
        styleTable();
    }
    
    if (rowState.indexOf("Conditional") > -1 || colState.indexOf("Conditional") > -1) {
        condCalcP();
        setButtons();
        styleTable();
    }
}

// Set the states of rows and columns based on the selection

function noneSetStates(selected, rowInd, colInd) {
    if (rowInd > -1) {
        rowState[rowInd] = selected;
    }
    if (colInd > -1) {
        colState[colInd] = selected;
    }
    

}

function marginalSetStates(selected, rowInd, colInd) {
    if (rowInd > -1) {
        rowState[rowInd] = selected;
        rowState[1-rowInd] = "None";
        colState[0] = "None";
        colState[1] = "None";
    }
    if (colInd > -1) {
        colState[colInd] = selected;
        colState[1-colInd] = "None";
        rowState[0] = "None";
        rowState[1] = "None";
    }
}

function jointSetStates(selected, rowInd, colInd) {
    if (rowInd > -1) {
        rowState[rowInd] = selected;
        rowState[1-rowInd] = "None";
        for (var i = 0; i < 2; i++) {
            if (colState[i] != "Joint") {
                colState[i] = "None";
            }
        }
    }
    if (colInd > -1) {
        colState[colInd] = selected;
        colState[1-colInd] = "None";
        for (var i = 0; i< 2; i++) {
            if (rowState[i] != "Joint") {
                rowState[i] = "None";
            }
        }
        
    }
}

function givenSetStates(selected, rowInd, colInd) {
    if (rowInd > -1) {
        rowState[rowInd] = selected;
        rowState[1-rowInd] = "None";
        for (var i = 0; i < 2; i++) {
            if (colState[i] != "Conditional") {
                colState[i] = "None";
            }
        }
    }
    if (colInd > -1) {
        colState[colInd] = selected;
        colState[1-colInd] = "None";
        for (var i = 0; i< 2; i++) {
            if (rowState[i] != "Conditional") {
                rowState[i] = "None";
            }
        }
        
    }
    
}

function condSetStates(selected, rowInd, colInd) {
        if (rowInd > -1) {
        rowState[rowInd] = selected;
        rowState[1-rowInd] = "None";
        for (var i = 0; i < 2; i++) {
            if (colState[i] != "Given") {
                colState[i] = "None";
            }
        }
    }
    if (colInd > -1) {
        colState[colInd] = selected;
        colState[1-colInd] = "None";
        for (var i = 0; i< 2; i++) {
            if (rowState[i] != "Given") {
                rowState[i] = "None";
            }
        }
        
    }

}


function noneClearP() {
    document.getElementById("output").innerHTML = "Select an option to calculate a probability";
}

function marginalCalcP(rowInd, colInd) {
    var num = 0;
    var denom = 0;
    var p = 0;
    if (rowInd > -1) {
        num = ds_data[rowInd][2];
    }
    if (colInd > -1) {
        num = ds_data[2][colInd];
    }
    denom = ds_data[2][2];
    p = num/denom;
    
    document.getElementById("output").innerHTML = "Marginal probability = <span style='color: #FF0000'>" + num + "</span>/<span style='color: #0000FF'>" + denom + "</span> = " + p.toFixed(4);

}


function jointCalcP() {
    var row = rowState.indexOf("Joint");
    var col = colState.indexOf("Joint");
    var num = 0;
    var denom = 0;
    var p = 0;
    if (row == -1) {
        document.getElementById("output").innerHTML = "Select a DS status to get a joint probability";
    } else if (col == -1) {
        document.getElementById("output").innerHTML = "Select a test result to get a joint probability";
    } else {
        num = ds_data[row][col];
        denom = ds_data[2][2];
        p = num/denom;
    document.getElementById("output").innerHTML = "Joint probability = <span style='color: #FF0000'>" + num + "</span>/<span style='color: #0000FF'>" + denom + "</span> = " + p.toFixed(4);
    }
}


function givenCalcP() {
    var num = 0;
    var denom = 0;
    var p = 0;
    if (rowState.indexOf("Given") > -1) {
        denom = ds_data[rowState.indexOf("Given")][2];
    } else {
        denom = ds_data[2][colState.indexOf("Given")];
    }
    
    if (rowState.indexOf("Conditional") > -1) {
        num = ds_data[rowState.indexOf("Conditional")][colState.indexOf("Given")];
    } else if (colState.indexOf("Conditional") > -1) {
        num = ds_data[rowState.indexOf("Given")][colState.indexOf("Conditional")];
    }

    if (num > 0) {
        p = num/denom;
    document.getElementById("output").innerHTML = "Conditional probability = <span style='color: #FF0000'>" + num + "</span>/<span style='color: #0000FF'>" + denom + "</span> = " + p.toFixed(4);
    }
    else {
        document.getElementById("output").innerHTML = "Select an outcome for a conditional probability";
    }
}

function condCalcP() {
    var num = 0;
    var denom = 0;
    var p = 0;
    if (rowState.indexOf("Given") > -1) {
        denom = ds_data[rowState.indexOf("Given")][2];
    } else if (colState.indexOf("Given") > -1) {
        denom = ds_data[2][colState.indexOf("Given")];
    }
    
    if (denom > 0) {
        if (rowState.indexOf("Conditional") > -1) {
            num = ds_data[rowState.indexOf("Conditional")][colState.indexOf("Given")];
        } else {
            num = ds_data[rowState.indexOf("Given")][colState.indexOf("Conditional")];
        }        
    }

    if (denom > 0) {
        p = num/denom;
    document.getElementById("output").innerHTML = "Conditional probability = <span style='color: #FF0000'>" + num + "</span>/<span style='color: #0000FF'>" + denom + "</span> = " + p.toFixed(4);
    }
    else {
        document.getElementById("output").innerHTML = "Select a given for a conditional probability";
    }
}

function setButtons() {
    document.getElementById("positive").value = colState[0];
    document.getElementById("negative").value = colState[1];
    document.getElementById("ds").value = rowState[0];
    document.getElementById("no_ds").value = rowState[1];
}

function styleTable() {
    var ds_table = document.getElementById("dsData");
    var cells = ds_table.getElementsByTagName("TD");
    for (var i = 0; i < cells.length; i++) {
        cells[i].style.color = "black";
        cells[i].style.background = "none";
        cells[i].style.fontWeight = "normal";

    }
    if (rowState.indexOf("Marginal") > -1 || colState.indexOf("Marginal") > -1) {
        if (rowState.indexOf("Marginal") > -1) {
            cells[td_indexes[rowState.indexOf("Marginal")][2]].style.color = "red";
            cells[td_indexes[rowState.indexOf("Marginal")][2]].style.fontWeight = "bolder";            
        } else {
            cells[td_indexes[2][colState.indexOf("Marginal")]].style.color = "red";
            cells[td_indexes[2][colState.indexOf("Marginal")]].style.fontWeight = "bolder";
        }
        cells[11].style.color = "blue";
        cells[11].style.fontWeight = "bolder";
    }
    
    if (rowState.indexOf("Joint") > -1 && colState.indexOf("Joint") > -1) {
        cells[td_indexes[rowState.indexOf("Joint")][colState.indexOf("Joint")]].style.color = "red";
        cells[td_indexes[rowState.indexOf("Joint")][colState.indexOf("Joint")]].style.fontWeight = "bolder";
        cells[11].style.color = "blue";
        cells[11].style.fontWeight = "bolder";
    }
    
    if ((rowState.indexOf("Conditional") > -1 || colState.indexOf("Conditional") > -1) && (rowState.indexOf("Given") > -1 || colState.indexOf("Given") > -1)) {
        if (rowState.indexOf("Given") > -1) {
            var row = rowState.indexOf("Given");
            cells[td_indexes[row][2]].style.color = "blue";
            cells[td_indexes[row][2]].style.fontWeight = "bolder";
            var col = colState.indexOf("Conditional");
            cells[td_indexes[row][col]].style.color = "red";
            cells[td_indexes[row][col]].style.fontWeight = "bolder";
            for (var i = 0; i < 3; i++) {
                cells[td_indexes[row][i]].style.background = "lightgray";
            }
        }
        
        if (colState.indexOf("Given") > -1) {
            var col = colState.indexOf("Given");
            cells[td_indexes[2][col]].style.color = "blue";
            cells[td_indexes[2][col]].style.fontWeight = "bolder";
            var row = rowState.indexOf("Conditional");
            cells[td_indexes[row][col]].style.color = "red";
            cells[td_indexes[row][col]].style.fontWeight = "bolder";
            for (var i = 0; i < 3; i++) {
                cells[td_indexes[i][col]].style.background = "lightgray";
            }


        }
        
    }
    
}
