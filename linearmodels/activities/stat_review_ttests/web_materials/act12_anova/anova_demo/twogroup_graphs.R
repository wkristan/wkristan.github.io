# Raw data
with(skulls, plot(maxbreadth ~ index, xaxt = "n", xlab = "", ylab = "Maximum skull breadth", pch = 21, bg = c(rep(3,29), rep(4,30)), main = "Maximum breadths of Egyptian skulls"))
axis(side = 1, at = c(15,45), labels = c("Early predynastic", "Late predynastic"))

# SST
with(skulls, plot(maxbreadth ~ index, 
                      xaxt = "n", 
                      xlab = "", 
                      ylab = "Maximum skull breadth", 
                      pch = 21, 
                      bg = "gray",
                      main = "Total sums of squares"))
abline(h = 131.8667)
with(skulls, segments(x0 = index, y0 = 131.8667, x1 = index, y1 = maxbreadth, col = "red"))

# Groups SS
with(skulls, plot(maxbreadth ~ index, 
                      xaxt = "n", 
                      xlab = "", 
                      ylab = "Maximum skull breadth", 
                      pch = 21, 
                      bg = "gray",
                      main = "Groups sums of squares", type = "n"))
abline(h = 131.8667)
axis(side = 1, at = c(15,45), labels = c("Early predynastic", "Late predynastic"))
with(skulls, segments(x0 = 1, y0 = 131.6707, x1 = 29, y1 = 131.6207, col = 3, lwd = 3))
with(skulls, segments(x0 = 30, y0 = 132.0968, x1 = 60, y1 = 132.0968, col = 6, lwd = 3))
with(skulls, segments(x0 = seq(1,29), y0 = 131.6207, x1 = seq(1,29), y1 = 131.8667, col = 3, lwd = 3))
with(skulls, segments(x0 = seq(30,60), y0 = 132.0968, x1 = seq(30,60), y1 = 131.8667, col = 6, lwd = 3))

# Error ss
with(skulls.epr, plot(maxbreadth ~ index, xaxt = "n", xlab = "", ylab = "Maximum skull breadth", pch = 21, bg = c(rep(3,29), rep(6,30)), main = "Error sums of squares"))
axis(side = 1, at = c(15,45), labels = c("Early predynastic", "Late predynastic"))
with(skulls.epr, segments(x0 = 1, y0 = 131.62, x1 = 29, y1 = 131.62, col = 3, lwd = 3))
with(skulls.epr, segments(x0 = 30, y0 = 132.0968, x1 = 60, y1 = 132.0968, col = 6, lwd = 3))
with(skulls.epr, segments(x0 = seq(1,29), y0 = 131.62, x1 = seq(1,29), y1 = maxbreadth[1:29], col = 3, lwd = 2))
with(skulls.epr, segments(x0 = seq(30,60), y0 = 132.0968, x1 = seq(30,60), y1 = maxbreadth[30:60], col = 6, lwd = 2))


# Groups and error ss
with(skulls.epr, plot(maxbreadth ~ index, xaxt = "n", xlab = "", ylab = "Maximum skull breadth", type = "n", main = "Variance partitioned: groups and error"))
abline(h = 133.3, col = "gray")
axis(side = 1, at = c(15,45), labels = c("Early predynastic", "Roman"))
with(skulls, segments(x0 = seq(1,29), y0 = 133.3, x1 = seq(1,29), y1 = 131.62, col = rgb(.2, 1, .2), lwd = 5))
with(skulls, segments(x0 = seq(30,59), y0 = 133.3, x1 = seq(30,59), y1 = 136.1667, col = rgb(1,.9,1), lwd = 5))
with(skulls.epr, segments(x0 = 1, y0 = 131.62, x1 = 29, y1 = 131.62, col = 3, lwd = 3))
with(skulls.epr, segments(x0 = 30, y0 = 136.1667, x1 = 59, y1 = 136.1667, col = 6, lwd = 3))
with(skulls.epr, segments(x0 = seq(1,29), y0 = 131.62, x1 = seq(1,29), y1 = maxbreadth[1:29], col = 3, lwd = 2))
with(skulls.epr, segments(x0 = seq(30,59), y0 = 136.1667, x1 = seq(30,59), y1 = maxbreadth[30:59], col = 6, lwd = 2))
with(skulls.epr, points(maxbreadth ~ index, pch = 21, bg = c(rep(3,29), rep(6,30))))