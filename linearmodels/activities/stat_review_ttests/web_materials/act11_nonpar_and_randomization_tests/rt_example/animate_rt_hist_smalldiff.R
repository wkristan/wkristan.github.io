saveVideo( {
diffs <- diff(tapply(lobsters$Heart.Rate, lobsters$Treatment, mean))
exceeds <- c(TRUE)
for (d in 1:2) {
  hist(diffs, xlim = c(-3,3), 
       xlab = "Differences between random groups", 
       ylab = "Count",
       breaks = seq(-3,3, by = 0.5),
       main = "",
       col = "red")
  abline(v = c(diffs[1]), col = "yellow", lwd = 3)
  abline(v = c(-diffs[1]), col = "yellow", lwd = 3)
  mtext(paste("Observed difference: ", round(diffs[1],2)), side = 3, line = 3)
  mtext("Continue shuffling groups randomly", side = 3, line = 1.5)
  mtext("and add each random difference to the histogram", side = 3, line = .5)
}
    for (i in 1:1000) {
      diffs <- c(diffs, diff(tapply(lobsters$Heart.Rate, sample(lobsters$trt.num), mean)))
      hist(diffs, xlim = c(-3,3), 
           xlab = "Differences between random groups", 
           ylab = "Count",
           breaks = seq(-3,3, by = 0.5),
           main = "",
           col = "red")
      abline(v = c(diffs[1]), col = "yellow", lwd = 3)
      abline(v = c(-diffs[1]), col = "yellow", lwd = 3)
      exceeds <- c(exceeds, abs(diffs[i]) > abs(diffs[1]))
      mtext(paste("Observed difference: ", round(diffs[1],2)), side = 3, line = 3)
      mtext(paste("Random diffs that exceed observed: ", sum(exceeds), " out of ", i), side = 3, line = 2)
      mtext(paste("p-value: ", formatC((sum(exceeds))/(i), digits=4, format = "f")), side = 3, line = 1)
      }
}, interval = 0.05, ani.width = 400, ani.height = 400)