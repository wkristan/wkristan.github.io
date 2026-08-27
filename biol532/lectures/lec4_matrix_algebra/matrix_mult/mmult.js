const rmatrix = document.querySelector('#result-matrix');
const delay = (ms) => new Promise(res => setTimeout(res, ms));
const orig = [
["SS<sub>SL</sub>","SCP<sub>SL,SW</sub>","SCP<sub>SL,PL</sub>","SCP<sub>SL,PW</sub>"],
["SCP<sub>SW,SL</sub>","SS<sub>SW</sub>","SCP<sub>SW,PL</sub>","SCP<sub>SW,PW</sub>"],
["SCP<sub>PL,SL</sub>","SCP<sub>PL,SW</sub>","SS<sub>PL</sub>","SCP<sub>PL,PW</sub>"],
["SCP<sub>PW,SL</sub>","SCP<sub>PW,SW</sub>","SCP<sub>PW,PL</sub>","SS<sub>PW</sub>"]
]

rmatrix.addEventListener('click', function(e) {
    const cell = e.target.closest('td')
    if (!cell) return;
    if (cell.parentElement.rowIndex == 0 || cell.cellIndex == 0) return;



    rc_mult(cell);
});

async function rc_mult(cell) {
    cell.style.color = "red";
    const lrow = cell.parentElement.rowIndex-1;
    const rcol = cell.cellIndex-1;
    const lmatrix = document.querySelector('#left-matrix')
    const rmatrix = document.querySelector('#right-matrix')
    let resmatrix = document.querySelector('#result-matrix')
    let products = 0;
    let lval = 0;
    let rval = 0;
    let calc = document.querySelector('#calculation');
    calc.innerHTML = "";

    let i = 0;

    for (let j = 0; j < 11; j++ ) {
        for (let k = 0; k < 4; k++){
            lmatrix.rows[k].cells[j].style.color = "black";
            rmatrix.rows[j].cells[k].style.color = "black";
        }
    }

    for (let j = 1; j < 5; j++) {
        for (let k = 1; k < 5; k++) {
            resmatrix.rows[k].cells[j].style.color = "black";
        }
    }

    for (i = 1; i < 11; i++) {
        let lcell = lmatrix.rows[lrow].cells[i];
        let rcell = rmatrix.rows[i].cells[rcol];
        lval = Number(lcell.innerText);
        rval = Number(rcell.innerText);
        products = products + lval * rval;
        lcell.style.color = "red";
        rcell.style.color = "red";
        if (i < 10) {
          document.querySelector("#calculation").innerHTML = document.querySelector("#calculation").innerHTML + lval + " &times; " + rval + " + ";
          await delay(500);
        } else {
          document.querySelector("#calculation").innerHTML = document.querySelector("#calculation").innerHTML + lval + " &times; " + rval + " = " + products.toFixed(2);
          await delay(500);
        }
    }

    cell.innerText = products.toFixed(2);
    cell.style.color = "red";


}
