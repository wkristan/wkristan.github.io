saveVideo( {
  split.screen(figs = c(1,2))
  diffs <- diff(tapply(lobsters$Heart.Rate, lobsters$trt.num, mean))
  x.start <- lobsters$trt.num
  x.end <- lobsters$trt.num
  exceeds <- TRUE
  for (d in 1:2) {
    screen(1)
    with(lobsters, plot(Heart.Rate ~ trt.num, col = Treatment, pch = 21, bg = Treatment, xlim = c(-.5, 1.5), xaxt = "n", xlab = "Randomly assigned group", ylab = "Heart rate"))
    axis(side = 1, at = c(0,1), labels = c("GABA", "Control"))
    mtext(paste("Observed difference: ", round(diffs[1],2)), side = 3, line = 2.5)
    mtext("Now we start shuffling groups at random", side = 3, line = 1.5)
    mtext("and record the difference in means each time", side = 3, line = .5)
    screen(2)
    hist(diffs, xlim = c(-10,10), 
         xlab = "Differences between random groups", 
         ylab = "Count",
         breaks = seq(-10,10, by = 1),
         main = "",
         col = "red")
    abline(v = c(diffs[1]), col = "yellow", lwd = 3)
    abline(v = c(-diffs[1]), col = "yellow", lwd = 3)
    mtext("When data are randomly shuffled", side = 3, line = 1.5)
    mtext("each random difference is added to the histogram", side = 3, line = .5)
  }
}, interval = 0.01, ani.width = 600, ani.height = 300)