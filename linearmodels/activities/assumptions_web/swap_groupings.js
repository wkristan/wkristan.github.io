function swapGrouping(current_img) { 
    if (current_img.id == "ungrouped_img") {
        document.getElementById("ungrouped").style.display = "none"; 
        document.getElementById("grouped").style.display = "block"; 
        } 
    else { 
        document.getElementById("ungrouped").style.display = "block";
        document.getElementById("grouped").style.display = "none"; 
        }
    }
