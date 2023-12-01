  function changeValue( e ) {
    if(e.value == '0')
        e.value = '1';
    else
        e.value = '0';
    updateValues(e);
    predictMean();
  }

 function predictMean() {
    var pred = document.getElementById("predicted");
    var med = document.getElementById("med");
    var high = document.getElementById("high");
    var predicted_mean = 0.68333 + Number(med.value)*0.09967 + Number(high.value)*0.11667;
    pred.innerHTML = predicted_mean.toFixed(5); 
}

function updateValues(e) {
    var ids = ["med","high"];
    for (i = 0; i < ids.length; i++) {
        var the_button = document.getElementById(ids[i]);
        if (the_button.id !== e.id) {
            the_button.value = 0;
        }
        
    }
    var the_menu = document.getElementById("cyandensity");
    if (e.value == 1) {
        the_menu.value = e.id;
    } else the_menu.value = "low";

}

function setButtons(selection) {
    var ids = ["med","high"];
    for (i = 0; i < ids.length; i++) {
        var the_button = document.getElementById(ids[i]);
        if (the_button.id == selection.value) {
            the_button.value = 1;
        } else the_button.value = 0;
    }
    
    predictMean();

}
