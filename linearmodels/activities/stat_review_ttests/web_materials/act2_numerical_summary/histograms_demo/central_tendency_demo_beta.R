saveVideo({
  par(mgp = c(1,1,0))
  shape.1 <- 2
  shape.2 <- 10
  x.seq <- seq(0,1, by = 0.001)
  for (i in 0:90) {
    dbeta.p <- dbeta(x.seq, shape1 = shape.1, shape2 = shape.2 - 8*i/90)
    x.mean <- (shape.1)/(shape.1 + shape.2 - 8*i/90)
    median <- x.seq[max(which((cumsum(dbeta.p)/1000) < 0.5))]
    mode <- (shape.1 - 1)/(shape.1+(shape.2 - 8*i/90)-2)
    plot(dbeta.p ~ x.seq, type = "l", xaxt = "n", xlab = "Variable", ylab = "Probability density\n\n", ylim = c(0,max(dbeta.p+0.05)))
    abline(v = c(x.mean, median, mode), col = c("red", "green", "blue"), lwd = 2)
    mtext("Location of the mean, median, and mode", side = 3, line = 2.5)
    mtext("Positively (right) skewed: mean > median > mode", side = 3, line = 1.5)
    text(x = x.mean + 0.15, y = 0.5*max(dbeta.p), "Mean", col = "red")
    text(x = median + 0.15, y = 0.7*max(dbeta.p), "Median", col = "green")
    text(x = mode + 0.15, y = 0.9*max(dbeta.p), "Mode", col = "blue")
  }
  
  shape.2 <- 2
  
  for (i in 0:20) {
    dbeta.p <- dbeta(x.seq, shape1 = shape.1, shape2 = shape.2)
    x.mean <- (shape.1)/(shape.1 + shape.2)
    median <- x.seq[max(which((cumsum(dbeta.p)/1000) < 0.5))]
    mode <- (shape.1 - 1)/(shape.1+shape.2-2)
    plot(dbeta.p ~ x.seq, type = "l", xaxt = "n", xlab = "Variable", ylab = "Probability density\n\n", ylim = c(0,max(dbeta.p+0.05)))
    abline(v = c(x.mean, median, mode), col = c("red", "green", "blue"), lwd = 2)
    mtext("Location of the mean, median, and mode", side = 3, line = 2.5)
    mtext("Symmetrical: mean = median = mode", side = 3, line = 1.5)
    text(x = x.mean + 0.15 - 0.3*i/20, y = 0.5*max(dbeta.p), "Mean", col = "red")
    text(x = median + 0.15 - 0.3*i/20, y = 0.7*max(dbeta.p), "Median", col = "green")
    text(x = mode + 0.15 - 0.3*i/20, y = 0.9*max(dbeta.p), "Mode", col = "blue")
  }
  
  for (i in 0:90) {
    dbeta.p <- dbeta(x.seq, shape1 = shape.1 + 8*i/90, shape2 = shape.2)
    x.mean <- (shape.1+8*i/90)/(shape.1 + 8*i/90 + shape.2)
    median <- x.seq[max(which((cumsum(dbeta.p)/1000) < 0.5))]
    mode <- ((shape.1+8*i/90) - 1)/((shape.1+8*i/90)+shape.2-2)
    plot(dbeta.p ~ x.seq, type = "l", xaxt = "n", xlab = "Variable", ylab = "Probability density\n\n", ylim = c(0,max(dbeta.p+0.05)))
    abline(v = c(x.mean, median, mode), col = c("red", "green", "blue"), lwd = 2)
    mtext("Location of the mean, median, and mode", side = 3, line = 2.5)
    mtext("Negatively (left) skewed: mean < median < mode", side = 3, line = 1.5)
    text(x = x.mean - 0.15, y = 0.5*max(dbeta.p), "Mean", col = "red")
    text(x = median - 0.15, y = 0.7*max(dbeta.p), "Median", col = "green")
    text(x = mode - 0.15, y = 0.9*max(dbeta.p), "Mode", col = "blue")
  }
  
  
}, interval = 0.1, ani.width = 400, ani.height = 300)