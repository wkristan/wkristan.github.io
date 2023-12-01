saveGIF({
  
  for(i in 1:5) {
    # Illustrate partitioning
    with(skulls, plot(maxbreadth ~ index, xaxt = "n", xlab = "", ylab = "Maximum skull breadth", pch = 21, bg = "gray"))
    mtext("The Egyptian skulls data", side = 3, line = 2.5)
    mtext("can be understood as:", side = 3, line = 1.5)
  }
  
  for(i in 1:50) {
    # Contribution of group membership
    with(skulls, plot(maxbreadth ~ index, xaxt = "n", type = "n", xlab = "", ylab = "Maximum skull breadth", pch = 21, bg = c(rep(3,29), rep(4,31), rep(6,30))))
    abline(h = 133.3)
    with(skulls, segments(x0 = 1, y0 = 131.62, x1 = 29, y1 = 131.62, col = 3))
    with(skulls, segments(x0 = 30, y0 = 132.0968, x1 = 60, y1 = 132.0968, col = 4))
    with(skulls, segments(x0 = 61, y0 = 136.1667, x1 = 90, y1 = 136.1667, col = 6))
    with(skulls, segments(x0 = seq(1,29), y0 = 133.3, x1 = seq(1,29), y1 = 131.62, col = 3))
    with(skulls, segments(x0 = seq(30,60), y0 = 133.3, x1 = seq(30,60), y1 = 132.0968, col = 4))
    with(skulls, segments(x0 = seq(61,90), y0 = 133.3, x1 = seq(61,90), y1 = 136.1667, col = 6))
    mtext("The Egyptian skulls data", side = 3, line = 2.5)
    mtext("can be understood as:", side = 3, line = 1.5)
    mtext("an effect of belonging to a period, plus...", side = 3, line = 0.5, font = 3)
    axis(side = 1, at = c(15,45,75), labels = c("Early predynastic", "Late predynastic", "Roman"))
    
  }
  
  for(i in 1:50) {
    # Contribution of individual error
    with(skulls, plot(maxbreadth ~ index, xaxt = "n", xlab = "", ylab = "Maximum skull breadth", pch = 21, bg = c(rep(3,29), rep(4,31), rep(6,30))))
    with(skulls, segments(x0 = 1, y0 = 131.62, x1 = 29, y1 = 131.62, col = 3))
    with(skulls, segments(x0 = 30, y0 = 132.0968, x1 = 60, y1 = 132.0968, col = 4))
    with(skulls, segments(x0 = 61, y0 = 136.1667, x1 = 90, y1 = 136.1667, col = 6))
    with(skulls, segments(x0 = seq(1,29), y0 = 131.62, x1 = seq(1,29), y1 = maxbreadth[1:29], col = 3))
    with(skulls, segments(x0 = seq(30,60), y0 = 132.0968, x1 = seq(30,60), y1 = maxbreadth[30:60], col = 4))
    with(skulls, segments(x0 = seq(61,90), y0 = 136.1667, x1 = seq(61,90), y1 = maxbreadth[61:90], col = 6))
    mtext("The Egyptian skulls data", side = 3, line = 2.5)
    mtext("can be understood as:", side = 3, line = 1.5)
    mtext("...the individual, random variation in each skull", side = 3, line = 0.5, font = 3)
    axis(side = 1, at = c(15,45,75), labels = c("Early predynastic", "Late predynastic", "Roman"))
    
  }
  
  for(i in 1:50) {
    # Transition
    with(skulls, plot(maxbreadth ~ index, xaxt = "n", xlab = "", ylab = "Maximum skull breadth", pch = 21, bg = "gray"))
    abline(h = 133.3)
    with(skulls, segments(x0 = 1, y0 = 131.62, x1 = 29, y1 = 131.62, col = 3))
    with(skulls, segments(x0 = 30, y0 = 132.0968, x1 = 60, y1 = 132.0968, col = 4))
    with(skulls, segments(x0 = 61, y0 = 136.1667, x1 = 90, y1 = 136.1667, col = 6))
    with(skulls, segments(x0 = seq(1,29), y0 = 131.62, x1 = seq(1,29), y1 = maxbreadth[1:29], col = 3, lwd = 3))
    with(skulls, segments(x0 = seq(30,60), y0 = 132.0968, x1 = seq(30,60), y1 = maxbreadth[30:60], col = 4, lwd = 3))
    with(skulls, segments(x0 = seq(61,90), y0 = 136.1667, x1 = seq(61,90), y1 = maxbreadth[61:90], col = 6, lwd = 3))
    with(skulls, segments(x0 = seq(1,29), y0 = 133.3, x1 = seq(1,29), y1 = 131.62, col = rgb(0,0.5,0)))
    with(skulls, segments(x0 = seq(30,60), y0 = 133.3, x1 = seq(30,60), y1 = 132.0968, col = rgb(0,0,0.5)))
    with(skulls, segments(x0 = seq(61,90), y0 = 133.3, x1 = seq(61,90), y1 = 136.1667, col = rgb(0.5, 0, 0.5)))
    mtext("We just need to calculate each", side = 3, line = 2.5)
    mtext("each of these sources of variation", side = 3, line = 1.5)
    axis(side = 1, at = c(15,45,75), labels = c("Early predynastic", "Late predynastic", "Roman"))
    
  }
  
  
  for(i in 1:50) {
  # Total SS
  with(skulls, plot(maxbreadth ~ index, xaxt = "n", xlab = "", ylab = "Maximum skull breadth", pch = 21, bg = "gray"))
  abline(h = 133.3)
  with(skulls, segments(x0 = index, y0 = 133.3, x1 = index, y1 = maxbreadth, col = "red"))
  mtext("Total sums of squares", side = 3, line = 2.5)
  mtext("Data values minus grand mean", side = 3, line = 1.5)
  mtext("the variation in the data to be partitioned", side = 3, line = 0.5, font = 3)
  mtext("Source   df       SS                         ", side = 1, line = 0.5, family = "mono")
  mtext("Total    89   2648.9                         ", side = 1, line = 3.5, family = "mono")
  }
  
  for(i in 1:50) {
    # Error SS
  with(skulls, plot(maxbreadth ~ index, xaxt = "n", xlab = "", ylab = "Maximum skull breadth", pch = 21, bg = c(rep(3,29), rep(4,31), rep(6,30))))
  with(skulls, segments(x0 = 1, y0 = 131.62, x1 = 29, y1 = 131.62, col = 3))
  with(skulls, segments(x0 = 30, y0 = 132.0968, x1 = 60, y1 = 132.0968, col = 4))
  with(skulls, segments(x0 = 61, y0 = 136.1667, x1 = 90, y1 = 136.1667, col = 6))
  with(skulls, segments(x0 = seq(1,29), y0 = 131.62, x1 = seq(1,29), y1 = maxbreadth[1:29], col = 3))
  with(skulls, segments(x0 = seq(30,60), y0 = 132.0968, x1 = seq(30,60), y1 = maxbreadth[30:60], col = 4))
  with(skulls, segments(x0 = seq(61,90), y0 = 136.1667, x1 = seq(61,90), y1 = maxbreadth[61:90], col = 6))
  mtext("Error sums of squares", side = 3, line = 2.5)
  mtext("Data values minus period (group) means", side = 3, line = 1.5)
  mtext("random, individual variation", side = 3, line = 0.5, font = 3)
  text(c("Early predynastic", "Late predynastic", "Roman"), x = c(15, 45, 75), y = 147, col = c(3,4,6))
  mtext("Source   df       SS      MS                 ", side = 1, line = 0.5, family = "mono")
  mtext("Total    89   2648.9                         ", side = 1, line = 3.5, family = "mono")
  mtext("Error    87   2275.7   26.16                 ", side = 1, line = 2.5, family = "mono")
  }
  
  for(i in 1:50) {
    # Groups SS
  with(skulls, plot(maxbreadth ~ index, xaxt = "n", type = "n", xlab = "", ylab = "Maximum skull breadth", pch = 21, bg = c(rep(3,29), rep(4,31), rep(6,30))))
  abline(h = 133.3)
  with(skulls, segments(x0 = 1, y0 = 131.62, x1 = 29, y1 = 131.62, col = 3))
  with(skulls, segments(x0 = 30, y0 = 132.0968, x1 = 60, y1 = 132.0968, col = 4))
  with(skulls, segments(x0 = 61, y0 = 136.1667, x1 = 90, y1 = 136.1667, col = 6))
  with(skulls, segments(x0 = seq(1,29), y0 = 133.3, x1 = seq(1,29), y1 = 131.62, col = 3))
  with(skulls, segments(x0 = seq(30,60), y0 = 133.3, x1 = seq(30,60), y1 = 132.0968, col = 4))
  with(skulls, segments(x0 = seq(61,90), y0 = 133.3, x1 = seq(61,90), y1 = 136.1667, col = 6))
  mtext("Groups sums of squares", side = 3, line = 2.5)
  mtext("Data values minus period (group) means", side = 3, line = 1.5)
  mtext("differences between groups - the stuff we're testing for!", side = 3, line = 0.5, font = 3)
  text(c("Early predynastic", "Late predynastic", "Roman"), x = c(15, 45, 75), y = 147, col = c(3,4,6))
  mtext("Source   df       SS      MS       F        p", side = 1, line = 0.5, family = "mono")
  mtext("Total    89   2648.9                         ", side = 1, line = 3.5, family = "mono")
  mtext("Error    87   2275.7   26.16                 ", side = 1, line = 2.5, family = "mono")
  mtext("Period    2    373.2  186.60    7.13    0.001", side = 1, line = 1.5, family = "mono")
  }
  with(skulls, plot(maxbreadth ~ index, xaxt = "n", type = "n", xlab = "", ylab = "Maximum skull breadth", pch = 21, bg = c(rep(3,29), rep(4,31), rep(6,30))))
  abline(h = 133.3)
  with(skulls, segments(x0 = 1, y0 = 131.62, x1 = 29, y1 = 131.62, col = 3))
  with(skulls, segments(x0 = 30, y0 = 132.0968, x1 = 60, y1 = 132.0968, col = 4))
  with(skulls, segments(x0 = 61, y0 = 136.1667, x1 = 90, y1 = 136.1667, col = 6))
  with(skulls, segments(x0 = seq(1,29), y0 = 133.3, x1 = seq(1,29), y1 = 131.62, col = 3))
  with(skulls, segments(x0 = seq(30,60), y0 = 133.3, x1 = seq(30,60), y1 = 132.0968, col = 4))
  with(skulls, segments(x0 = seq(61,90), y0 = 133.3, x1 = seq(61,90), y1 = 136.1667, col = 6))
  mtext("Groups sums of squares", side = 3, line = 2.5)
  mtext("Data values minus period (group) means", side = 3, line = 1.5)
  mtext("Difference between period means is statistically significant", side = 3, line = 0.5, font = 3)
  text(c("Early predynastic", "Late predynastic", "Roman"), x = c(15, 45, 75), y = 147, col = c(3,4,6))
  mtext("Source   df       SS      MS       F        p", side = 1, line = 0.5, family = "mono")
  mtext("Total    89   2648.9                         ", side = 1, line = 3.5, family = "mono")
  mtext("Error    87   2275.7   26.16                 ", side = 1, line = 2.5, family = "mono")
  mtext("Period    2    373.2  186.60    7.13    0.001", side = 1, line = 1.5, family = "mono")
  mtext("Diffs. btwn", adj = 0, side = 1, line = 1, cex = 0.7, font = 4, col = "red")
  mtext("periods \u2192", adj = 0, side = 1, line = 1.5, cex = 0.7, font = 4, col = "red")
  mtext("\u2190 p < 0.05", adj = 1, side = 1, line = 1.5, cex = 0.7, font = 4, col = "red")
  

  
}
, interval = 0.1, ani.width = 500, ani.height = 400 )