saveVideo({
  mean <- -3
  sd <- 1.5
  x.seq <- seq(-10,10, by = 0.001)
  for (i in 0:80) {
    dnorm.p <- dnorm(x.seq, mean + 6*i/200, sd)
    dnorm.x <- exp(x.seq)/(1+exp(x.seq))
    median <- dnorm.x[max(which(cumsum(dnorm.p)<500))]
    x.mean <- sum(dnorm.x*dnorm.p*0.001)
    plot(dnorm.p ~ dnorm.x, type = "l", xaxt = "n", xlab = "Variable", ylab = "Probability")
    abline(v = c(x.mean, median), col = c("red", "green"), lwd = 2)
    mtext("Location of the mean and median", side = 3, line = 2.5)
    mtext("Positively (right) skewed: mean > median", side = 3, line = 1.5)
    text(x = x.mean + 0.1, y = 0.15, "Mean", col = "red")
    text(x = median + 0.1, y = 0.25, "Median", col = "green")
  }
  
  for (i in 81:120) {
    dnorm.p <- dnorm(x.seq, mean + 6*i/200, sd)
    dnorm.x <- exp(x.seq)/(1+exp(x.seq))
    median <- dnorm.x[max(which(cumsum(dnorm.p)<500))]
    x.mean <- sum(dnorm.x*dnorm.p*0.001)
    plot(dnorm.p ~ dnorm.x, type = "l", xaxt = "n", xlab = "Variable", ylab = "Probability")
    abline(v = c(x.mean, median), col = c("red", "green"), lwd = 2)
    mtext("Location of the mean and median", side = 3, line = 2.5)
    mtext("Symmetrical: mean = median", side = 3, line = 1.5)
    text(x = x.mean + 0.1 + 0.2*(81-i)/(120-81), y = 0.15, "Mean", col = "red")
    text(x = median + 0.1 + 0.2*(81-i)/(120-81), y = 0.25, "Median", col = "green")
  }
  
  for (i in 121:200) {
    dnorm.p <- dnorm(x.seq, mean + 6*i/200, sd)
    dnorm.x <- exp(x.seq)/(1+exp(x.seq))
    median <- dnorm.x[max(which(cumsum(dnorm.p)<500))]
    x.mean <- sum(dnorm.x*dnorm.p*0.001)
    plot(dnorm.p ~ dnorm.x, type = "l", xaxt = "n", xlab = "Variable", ylab = "Probability")
    abline(v = c(x.mean, median), col = c("red", "green"), lwd = 2)
    mtext("Location of the mean and median", side = 3, line = 2.5)
    mtext("Negatively (left) skewed: mean < median", side = 3, line = 1.5)
    text(x = x.mean - 0.1, y = 0.15, "Mean", col = "red")
    text(x = median - 0.1, y = 0.25, "Median", col = "green")
  }
  
}, interval = 0.1, ani.width = 400, ani.height = 300)