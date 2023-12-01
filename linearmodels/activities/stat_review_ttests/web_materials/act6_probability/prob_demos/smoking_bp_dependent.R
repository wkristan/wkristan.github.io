saveVideo({

for(i in 1:10) {
plot(c(0,1) ~ c(0,1), xlim = c(0,1), ylim = c(0,1), xaxt = "n", yaxt = "n", xlab = "", ylab = "", main = "", type = "n")
abline(h = c(0.2, 0.4, 0.6, 0.8))
abline(v = c(0.25, 0.5, 0.75))
sapply(polys, FUN = function(x) polygon(x, col = "yellow"))
text(labels = c("Blood pressure","High","Normal","Total","Smoking","Smoker","Non-smoker","Total"), 
     x = c(0.1,0.1,0.1,0.1,0.5,0.375,0.625,0.875), 
     y = c(0.7,0.5,0.3,0.1,0.9,0.7,0.7,0.7))
mtext("First we enter the marginal totals", side = 3, line = 1.5)
}

  for(i in 1:20) {
    plot(c(0,1) ~ c(0,1), xlim = c(0,1), ylim = c(0,1), xaxt = "n", yaxt = "n", xlab = "", ylab = "", main = "", type = "n")
    abline(h = c(0.2, 0.4, 0.6, 0.8))
    abline(v = c(0.25, 0.5, 0.75))
    sapply(polys, FUN = function(x) polygon(x, col = "yellow"))
    text(labels = c("Blood pressure","High","Normal","Total","Smoking","Smoker","Non-smoker","Total"), 
         x = c(0.1,0.1,0.1,0.1,0.5,0.375,0.625,0.875), 
         y = c(0.7,0.5,0.3,0.1,0.9,0.7,0.7,0.7))
    text(labels = c(17, 83, 100, 22, 78),
         x = c(0.375, 0.625, 0.875, 0.875, 0.875),
         y = c(0.1, 0.1, 0.1, 0.3, 0.5))
  }
  
  for(i in 1:20) {
    plot(c(0,1) ~ c(0,1), xlim = c(0,1), ylim = c(0,1), xaxt = "n", yaxt = "n", xlab = "", ylab = "", main = "", type = "n")
    abline(h = c(0.2, 0.4, 0.6, 0.8))
    abline(v = c(0.25, 0.5, 0.75))
    sapply(polys, FUN = function(x) polygon(x, col = "yellow"))
    text(labels = c("Blood pressure","High","Normal","Total","Smoking","Smoker","Non-smoker","Total"), 
         x = c(0.1,0.1,0.1,0.1,0.5,0.375,0.625,0.875), 
         y = c(0.7,0.5,0.3,0.1,0.9,0.7,0.7,0.7))
    text(labels = c(17, 83, 100, 22, 78),
         x = c(0.375, 0.625, 0.875, 0.875, 0.875),
         y = c(0.1, 0.1, 0.1, 0.3, 0.5))
    mtext("22% of 17 smokers should have high blood pressure", side = 3, line = 1.5)
    text(labels = c("0.22 x 17 = 3.7"), x = c(0.375), y = c(0.5))
  }
  
  for(i in 1:20) {
    plot(c(0,1) ~ c(0,1), xlim = c(0,1), ylim = c(0,1), xaxt = "n", yaxt = "n", xlab = "", ylab = "", main = "", type = "n")
    abline(h = c(0.2, 0.4, 0.6, 0.8))
    abline(v = c(0.25, 0.5, 0.75))
    sapply(polys, FUN = function(x) polygon(x, col = "yellow"))
    text(labels = c("Blood pressure","High","Normal","Total","Smoking","Smoker","Non-smoker","Total"), 
         x = c(0.1,0.1,0.1,0.1,0.5,0.375,0.625,0.875), 
         y = c(0.7,0.5,0.3,0.1,0.9,0.7,0.7,0.7))
    text(labels = c(17, 83, 100, 22, 78),
         x = c(0.375, 0.625, 0.875, 0.875, 0.875),
         y = c(0.1, 0.1, 0.1, 0.3, 0.5))
    mtext("The other cells are calculated from this cell and", side = 3, line = 2)
    mtext("the marginal totals", side = 3, line = 1)
    text(labels = c(3.7), x = c(0.375), y = c(0.5))
  }
  
  for(i in 1:20) {
    plot(c(0,1) ~ c(0,1), xlim = c(0,1), ylim = c(0,1), xaxt = "n", yaxt = "n", xlab = "", ylab = "", main = "", type = "n")
    abline(h = c(0.2, 0.4, 0.6, 0.8))
    abline(v = c(0.25, 0.5, 0.75))
    sapply(polys, FUN = function(x) polygon(x, col = "yellow"))
    text(labels = c("Blood pressure","High","Normal","Total","Smoking","Smoker","Non-smoker","Total"), 
         x = c(0.1,0.1,0.1,0.1,0.5,0.375,0.625,0.875), 
         y = c(0.7,0.5,0.3,0.1,0.9,0.7,0.7,0.7))
    text(labels = c(17, 83, 100, 78, 22),
         x = c(0.375, 0.625, 0.875, 0.875, 0.875),
         y = c(0.1, 0.1, 0.1, 0.3, 0.5))
    mtext("22 have high blood pressure, 3.7 of which smoke,", side = 3, line = 2)
    mtext("so 22-3.7 don't smoke", side = 3, line = 1)
    text(labels = c(3.7), x = c(0.375), y = c(0.5))
    text(labels = c("22-3.7 = 18.3"), x = c(0.625), y = c(0.5))
    
  }
  
  for(i in 1:20) {
    plot(c(0,1) ~ c(0,1), xlim = c(0,1), ylim = c(0,1), xaxt = "n", yaxt = "n", xlab = "", ylab = "", main = "", type = "n")
    abline(h = c(0.2, 0.4, 0.6, 0.8))
    abline(v = c(0.25, 0.5, 0.75))
    sapply(polys, FUN = function(x) polygon(x, col = "yellow"))
    text(labels = c("Blood pressure","High","Normal","Total","Smoking","Smoker","Non-smoker","Total"), 
         x = c(0.1,0.1,0.1,0.1,0.5,0.375,0.625,0.875), 
         y = c(0.7,0.5,0.3,0.1,0.9,0.7,0.7,0.7))
    text(labels = c(17, 83, 100, 78, 22),
         x = c(0.375, 0.625, 0.875, 0.875, 0.875),
         y = c(0.1, 0.1, 0.1, 0.3, 0.5))
    mtext("17 smoke, 3.7 of which have high BP,", side = 3, line = 2)
    mtext("so 17-3.7 have normal BP", side = 3, line = 1)
    text(labels = c(3.7,18.3), x = c(0.375,0.625), y = c(0.5,0.5))
    text(labels = c("17-3.7 = 13.3"), x = c(0.375), y = c(0.3))
    
  }
  
  for(i in 1:20) {
    plot(c(0,1) ~ c(0,1), xlim = c(0,1), ylim = c(0,1), xaxt = "n", yaxt = "n", xlab = "", ylab = "", main = "", type = "n")
    abline(h = c(0.2, 0.4, 0.6, 0.8))
    abline(v = c(0.25, 0.5, 0.75))
    sapply(polys, FUN = function(x) polygon(x, col = "yellow"))
    text(labels = c("Blood pressure","High","Normal","Total","Smoking","Smoker","Non-smoker","Total"), 
         x = c(0.1,0.1,0.1,0.1,0.5,0.375,0.625,0.875), 
         y = c(0.7,0.5,0.3,0.1,0.9,0.7,0.7,0.7))
    text(labels = c(17, 83, 100, 78, 22),
         x = c(0.375, 0.625, 0.875, 0.875, 0.875),
         y = c(0.1, 0.1, 0.1, 0.3, 0.5))
    mtext("83 are non-smokers, 18.3 of which have high BP,", side = 3, line = 2)
    mtext("so 83-18.3 have normal BP", side = 3, line = 1)
    text(labels = c(3.7,18.3,13.3), x = c(0.375,0.625,0.375), y = c(0.5,0.5,0.3))
    text(labels = c("83-18.3 = 64.7"), x = c(0.625), y = c(0.3))
    
  }
  
  for(i in 1:10) {
    plot(c(0,1) ~ c(0,1), xlim = c(0,1), ylim = c(0,1), xaxt = "n", yaxt = "n", xlab = "", ylab = "", main = "", type = "n")
    abline(h = c(0.2, 0.4, 0.6, 0.8))
    abline(v = c(0.25, 0.5, 0.75))
    sapply(polys, FUN = function(x) polygon(x, col = "yellow"))
    text(labels = c("Blood pressure","High","Normal","Total","Smoking","Smoker","Non-smoker","Total"), 
         x = c(0.1,0.1,0.1,0.1,0.5,0.375,0.625,0.875), 
         y = c(0.7,0.5,0.3,0.1,0.9,0.7,0.7,0.7))
    text(labels = c(17, 83, 100, 78, 22),
         x = c(0.375, 0.625, 0.875, 0.875, 0.875),
         y = c(0.1, 0.1, 0.1, 0.3, 0.5))
    mtext("The completed table", side = 3, line = 1.5)
    text(labels = c(3.7,18.3,13.3,64.7), x = c(0.375,0.625,0.375,0.625), y = c(0.5,0.5,0.3,0.3))

  }


}, interval =0.1, ani.width = 600, ani.height = 300)