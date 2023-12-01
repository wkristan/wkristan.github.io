saveVideo( {
diffs <- diff(tapply(lobsters$Heart.Rate, lobsters$trt.num, mean))
x.start <- lobsters$trt.num
x.end <- lobsters$trt.num
exceeds <- TRUE
for (d in 1:2) {
  with(lobsters, plot(Heart.Rate ~ trt.num, col = Treatment, pch = 21, bg = Treatment, xlim = c(-.5, 1.5), xaxt = "n", xlab = "Randomly assigned group", ylab = "Heart rate"))
  axis(side = 1, at = c(0,1), labels = c("GABA", "Control"))
  mtext(paste("Observed difference: ", round(diffs[1],2)), side = 3, line = 2.5)
  mtext("Now we start shuffling groups at random", side = 3, line = 1.5)
  mtext("and record the difference in means each time", side = 3, line = .5)
  }
for (j in 2:11) {
  x.end <- sample(lobsters$trt.num, 40)
  x.diffs <- x.end - x.start
  diffs <- c(diffs, diff(tapply(lobsters$Heart.Rate, x.end, mean)))
  if(abs(diffs[1]) < abs(diffs[j])) exceeds <- 2 else exceeds <- 1
  for (i in 1:50) {
    x.cur <- x.start + i*x.diffs/50
    with(lobsters, plot(Heart.Rate ~ x.cur, col = Treatment, pch = 21, bg = Treatment, xlim = c(-.5, 1.5), xaxt = "n", xlab = "Randomly assigned group", ylab = "Heart rate"))
    axis(side = 1, at = c(0,1), labels = c("GABA", "Control"))
    mtext(paste("Observed difference: ", round(diffs[1],2)), side = 3, line = 2.5)
    mtext(paste("Difference between shuffled groups: ", round(diffs[j],2)), side = 3, line = 1, col = exceeds)
  }
  for (c in 1:50) {
    with(lobsters, plot(Heart.Rate ~ x.cur, col = Treatment, pch = 21, bg = Treatment, xlim = c(-.5, 1.5), xaxt = "n", xlab = "Randomly assigned group", ylab = "Heart rate"))
    axis(side = 1, at = c(0,1), labels = c("GABA", "Control"))
    mtext(paste("Observed difference: ", round(diffs[1],2)), side = 3, line = 2.5)
    mtext(paste("Difference between shuffled groups: ", round(diffs[j],2)), side = 3, line = 1, col = exceeds)
  }
  x.start <- x.end
}
}, interval = 0.01, ani.width = 400, ani.height = 400)