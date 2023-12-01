saveVideo({

for(i in 1:10) {
plot(c(0,1) ~ c(0,1), xlim = c(0,1), ylim = c(0,1), xaxt = "n", yaxt = "n", xlab = "", ylab = "", main = "", type = "n")
abline(h = c(0.2, 0.4, 0.6, 0.8))
abline(v = c(0.25, 0.5, 0.75))
sapply(polys, FUN = function(x) polygon(x, col = "yellow"))
text(labels = c("DS status","DS","No DS","Total","Test result","Positive","Negative","Total"), 
     x = c(0.1,0.1,0.1,0.1,0.5,0.375,0.625,0.875), 
     y = c(0.7,0.5,0.3,0.1,0.9,0.7,0.7,0.7))
mtext("Start by setting the marginal totals to match", side = 3, line = 2)
mtext("a 1 in 1000 rate for DS", side = 3, line = 1)

}

  
  
  for(i in 1:20) {
    plot(c(0,1) ~ c(0,1), xlim = c(0,1), ylim = c(0,1), xaxt = "n", yaxt = "n", xlab = "", ylab = "", main = "", type = "n")
    abline(h = c(0.2, 0.4, 0.6, 0.8))
    abline(v = c(0.25, 0.5, 0.75))
    sapply(polys, FUN = function(x) polygon(x, col = "yellow"))
    text(labels = c("DS status","DS","No DS","Total","Test result","Positive","Negative","Total"), 
         x = c(0.1,0.1,0.1,0.1,0.5,0.375,0.625,0.875), 
         y = c(0.7,0.5,0.3,0.1,0.9,0.7,0.7,0.7))
    text(labels = c(1,1000),
         x = c(0.875, 0.875),
         y = c(0.5, 0.1))
    mtext("One DS pregnancy for every 1000 total pregnancies", side = 3, line = 1.5)
  }
  
  for(i in 1:20) {
    plot(c(0,1) ~ c(0,1), xlim = c(0,1), ylim = c(0,1), xaxt = "n", yaxt = "n", xlab = "", ylab = "", main = "", type = "n")
    abline(h = c(0.2, 0.4, 0.6, 0.8))
    abline(v = c(0.25, 0.5, 0.75))
    sapply(polys, FUN = function(x) polygon(x, col = "yellow"))
    text(labels = c("DS status","DS","No DS","Total","Test result","Positive","Negative","Total"), 
         x = c(0.1,0.1,0.1,0.1,0.5,0.375,0.625,0.875), 
         y = c(0.7,0.5,0.3,0.1,0.9,0.7,0.7,0.7))
    text(labels = c(1,999,1000),
         x = c(0.875, 0.875, 0.875),
         y = c(0.5, 0.3, 0.1))
    mtext("Which means 999 No DS for every 1000", side = 3, line = 1.5)
  }
  
  for(i in 1:20) {
    plot(c(0,1) ~ c(0,1), xlim = c(0,1), ylim = c(0,1), xaxt = "n", yaxt = "n", xlab = "", ylab = "", main = "", type = "n")
    abline(h = c(0.2, 0.4, 0.6, 0.8))
    abline(v = c(0.25, 0.5, 0.75))
    sapply(polys, FUN = function(x) polygon(x, col = "yellow"))
    text(labels = c("DS status","DS","No DS","Total","Test result","Positive","Negative","Total"), 
         x = c(0.1,0.1,0.1,0.1,0.5,0.375,0.625,0.875), 
         y = c(0.7,0.5,0.3,0.1,0.9,0.7,0.7,0.7))
    text(labels = c(1,999,1000),
         x = c(0.875, 0.875, 0.875),
         y = c(0.5, 0.3, 0.1))
    mtext("Sensitivity is 0.6, so 60% of DS pregnancies", side = 3, line = 2)
    mtext("correctly get positive test results", side = 3, line = 1)
    
    text(labels = c("0.6 x 1 = 0.6"), x = c(0.375), y = c(0.5))
  }
  
  for(i in 1:20) {
    plot(c(0,1) ~ c(0,1), xlim = c(0,1), ylim = c(0,1), xaxt = "n", yaxt = "n", xlab = "", ylab = "", main = "", type = "n")
    abline(h = c(0.2, 0.4, 0.6, 0.8))
    abline(v = c(0.25, 0.5, 0.75))
    sapply(polys, FUN = function(x) polygon(x, col = "yellow"))
    text(labels = c("DS status","DS","No DS","Total","Test result","Positive","Negative","Total"), 
         x = c(0.1,0.1,0.1,0.1,0.5,0.375,0.625,0.875), 
         y = c(0.7,0.5,0.3,0.1,0.9,0.7,0.7,0.7))
    text(labels = c(1,999,1000,0.6),
         x = c(0.875, 0.875, 0.875,0.375),
         y = c(0.5, 0.3, 0.1,0.5))
    mtext("Which means that the other 40%", side = 3, line = 2)
    mtext("incorrectly get negative test results", side = 3, line = 1)
    text(labels = c("0.4 x 1 = 0.4"), x = c(0.625), y = c(0.5))
  }
  
  for(i in 1:20) {
    plot(c(0,1) ~ c(0,1), xlim = c(0,1), ylim = c(0,1), xaxt = "n", yaxt = "n", xlab = "", ylab = "", main = "", type = "n")
    abline(h = c(0.2, 0.4, 0.6, 0.8))
    abline(v = c(0.25, 0.5, 0.75))
    sapply(polys, FUN = function(x) polygon(x, col = "yellow"))
    text(labels = c("DS status","DS","No DS","Total","Test result","Positive","Negative","Total"), 
         x = c(0.1,0.1,0.1,0.1,0.5,0.375,0.625,0.875), 
         y = c(0.7,0.5,0.3,0.1,0.9,0.7,0.7,0.7))
    text(labels = c(1,999,1000,0.6,0.4),
         x = c(0.875, 0.875, 0.875,0.375,0.625),
         y = c(0.5, 0.3, 0.1,0.5,0.5))
    mtext("5% of No DS women incorrectly get", side = 3, line = 2)
    mtext("positive test results", side = 3, line = 1)
    text(labels = c("0.05x999 = 49.95"), x = c(0.375), y = c(0.3))
    
  }
  
  for(i in 1:20) {
    plot(c(0,1) ~ c(0,1), xlim = c(0,1), ylim = c(0,1), xaxt = "n", yaxt = "n", xlab = "", ylab = "", main = "", type = "n")
    abline(h = c(0.2, 0.4, 0.6, 0.8))
    abline(v = c(0.25, 0.5, 0.75))
    sapply(polys, FUN = function(x) polygon(x, col = "yellow"))
    text(labels = c("DS status","DS","No DS","Total","Test result","Positive","Negative","Total"), 
         x = c(0.1,0.1,0.1,0.1,0.5,0.375,0.625,0.875), 
         y = c(0.7,0.5,0.3,0.1,0.9,0.7,0.7,0.7))
    text(labels = c(1,999,1000,0.6,0.4,49.95),
         x = c(0.875, 0.875, 0.875,0.375,0.625,0.375),
         y = c(0.5, 0.3, 0.1,0.5,0.5,0.3))
    mtext("The remaining 95% correctly receive", side = 3, line = 2)
    mtext("a negative test result", side = 3, line = 1)
    text(labels = c("0.95x999=949.05"), x = c(0.625), y = c(0.3))
    
  }
  
  for(i in 1:20) {
    plot(c(0,1) ~ c(0,1), xlim = c(0,1), ylim = c(0,1), xaxt = "n", yaxt = "n", xlab = "", ylab = "", main = "", type = "n")
    abline(h = c(0.2, 0.4, 0.6, 0.8))
    abline(v = c(0.25, 0.5, 0.75))
    sapply(polys, FUN = function(x) polygon(x, col = "yellow"))
    text(labels = c("DS status","DS","No DS","Total","Test result","Positive","Negative","Total"), 
         x = c(0.1,0.1,0.1,0.1,0.5,0.375,0.625,0.875), 
         y = c(0.7,0.5,0.3,0.1,0.9,0.7,0.7,0.7))
    text(labels = c(1,999,1000,0.6,0.4,49.95,949.05),
         x = c(0.875, 0.875, 0.875,0.375,0.625,0.375,0.625),
         y = c(0.5, 0.3, 0.1,0.5,0.5,0.3,0.3))
    mtext("Totals for positive and negative tests are now", side = 3, line = 2)
    mtext("just sums across the rows", side = 3, line = 1)
    text(labels = c("0.6+49.95=50.55"), x = c(0.375), y = c(0.1))
    text(labels = c("0.4+949.05=949.45"), x = c(0.625), y = c(0.1))
    
  }
  
  for(i in 1:10) {
    plot(c(0,1) ~ c(0,1), xlim = c(0,1), ylim = c(0,1), xaxt = "n", yaxt = "n", xlab = "", ylab = "", main = "", type = "n")
    abline(h = c(0.2, 0.4, 0.6, 0.8))
    abline(v = c(0.25, 0.5, 0.75))
    sapply(polys, FUN = function(x) polygon(x, col = "yellow"))
    text(labels = c("DS status","DS","No DS","Total","Test result","Positive","Negative","Total"), 
         x = c(0.1,0.1,0.1,0.1,0.5,0.375,0.625,0.875), 
         y = c(0.7,0.5,0.3,0.1,0.9,0.7,0.7,0.7))
    text(labels = c(1,999,1000,0.6,0.4,49.95,949.05,50.55,949.45),
         x = c(0.875, 0.875, 0.875,0.375,0.625,0.375,0.625,0.375,0.625),
         y = c(0.5, 0.3, 0.1,0.5,0.5,0.3,0.3,0.1,0.1))
    mtext("The completed table", side = 3, line = 1.5)

  }


}, interval =0.1, ani.width = 600, ani.height = 300)