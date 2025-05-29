function toggleLinks() {
    var linkStates = document.getElementsByClassName("links");
    var popupStates = document.getElementsByClassName("popups");
    if (linkStates[0].style.display == "none"){
        for (var i = 0; i < linkStates.length; i++) {
            linkStates[i].style.display = "inline";
        }
        for (var i = 0; i < popupStates.length; i++){
            popupStates[i].style.display = "none";
        }
    } else {
        for (var i = 0; i < linkStates.length; i++){
            linkStates[i].style.display = "none";
        }
        for (var i = 0; i < popupStates.length; i++) {
            popupStates[i].style.display = "inline";
        }
    }

}
