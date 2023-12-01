saveVideo({
  samp.means <- c()
  par(mfrow = c(1,1))
  n <- c(20)
  for(i in 1:10) {
  hist(pop, breaks=breaks, main = "Large population", xlab = "Myoglobin", ylab = "Count")
  text(paste("Seal myoglobin"), x = 90, y = 2300)
  }
  
  samp <- sample(pop, n)
  
  for(i in 1:20) {
    hist(pop, breaks=breaks, main = "Large population", xlab = "Myoglobin", ylab = "Count")
    stripchart(samp, method = "stack", add = T, pch = 21, bg = "red")
    text(paste("A single sample of ", n), x = 90, y = 2600)
    text(paste("with a mean of ", round(mean(samp),1)), x = 90, y = 2300)
    
  }
  
  samp.means <- c(samp.means, 5*round(mean(samp)/5,1))
  
  for(i in 1:20) {
    stripchart(samp.means, 
             method = "stack",
             main = "Sample means", 
             xlab = "Myoglobin", 
             ylab = "Count", 
             pch = 20, 
             col = "blue",
             cex = 1,
             xlim = c(45,100), ylim = c(0,20))
    text("Plot the mean,", x = 90, y = 15)
    text("then repeat 1000 times", x = 90, y = 12)
  }
  
  par(mfrow = c(1,2))
  
  for(i in 1:999){
    hist(pop, breaks=breaks, main = "Population", xlab = "Myoglobin", ylab = "Count")
    samp <- sample(pop, n)
    text(paste("Sample # ", i+1), x = 90, y = 2300)
    stripchart(samp, method = "stack", add = T, pch = 21, bg = "red")
    samp.means <- c(samp.means, 5*round(mean(samp)/5,1))
    stripchart(samp.means, 
               method = "stack",
               main = "Sample means", 
               xlab = "Myoglobin", 
               ylab = "Count", 
               pch = 20, 
               col = "blue",
               cex = 0.35,
               xlim = c(45,100), ylim = c(0,10))
  }
  
}, interval = 0.1, ani.width = 800, ani.height = 400)