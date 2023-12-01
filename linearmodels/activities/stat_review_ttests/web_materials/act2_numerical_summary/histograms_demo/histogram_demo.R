saveGIF({
  
  breaks <- seq(60, 140, by = 10)
  
  for (d in 1:10) {
  with(rainfall, plot(yaxis ~ Rainfall, xlab = "Rainfall (mm)", yaxt = "n", ylab = "", xlim = c(60,140), ylim=c(0,360), yaxs = "i", pch=21, bg = "gray"))
    mtext("Some rainfall data", side = 3, line = 3)
    mtext("Rainfall is the x-axis,", side = 3, line = 2)
    mtext("height on y doesn't matter (yet)", side = 3, line = 1)
  }

  for (d in 1:10){
    with(rainfall, plot(yaxis ~ Rainfall, xlab = "Rainfall (mm)", yaxt = "n", ylab = "", xlim = c(60,140), ylim=c(0,360), yaxs = "i", pch=21, bg = "gray"))
    abline(v = breaks)
    mtext("To make a histogram, divide", side = 3, line = 3)
    mtext("the x-axis into bins and count", side = 3, line = 2)
    mtext("points falling in each", side = 3, line = 1)
  }

  
  for(k in 1:8) {
    pts <- rainfall[rainfall$bin == k,]
    n.pts <- nrow(pts)

        for (d in 1:10) {
          with(rainfall, plot(yaxis ~ Rainfall, xlab = "Rainfall (mm)", ylab = "Count", xlim = c(60,140), ylim=c(0,360), yaxs = "i", pch=21, bg = "gray"))
          abline(v = breaks)
          mtext(paste("Points between ", breaks[k], " mm and ", breaks[k+1], " mm"), side = 3, line = 2)
          with(pts, points(yaxis ~ Rainfall, pch = 21, bg = "red"))
        }

        for (d in 1:10) {
          with(rainfall, plot(yaxis ~ Rainfall, xlab = "Rainfall (mm)", ylab = "Count", xlim = c(60,140), ylim=c(0,360), yaxs = "i", pch=21, bg = "gray"))
          abline(v = breaks)
          with(pts, points(yaxis ~ Rainfall, pch = 21, bg = "red"))
          mtext(paste(n.pts , " points"), at = c(370, (breaks[k] + 5)))
        }


        for (d in 1:10) {
          with(rainfall, plot(yaxis ~ Rainfall, xlab = "Rainfall (mm)", ylab = "Count", xlim = c(60,140), ylim=c(0,360), yaxs = "i", pch=21, bg = "gray"))
          abline(v = breaks)
          mtext(paste("Draw a bar to indicate ", n.pts, " points"), side = 3, line = 2)
          with(pts, points(yaxis ~ Rainfall, pch = 21, bg = "red"))
          mtext(paste(n.pts , " points"), at = c(370, (breaks[k] + 5)))
          polygon.x <- c(breaks[k], breaks[k], breaks[k+1], breaks[k+1], breaks[k])
          polygon.y <- c(0,n.pts, n.pts, 0, 0)
          polygon(polygon.x, polygon.y, col = "red")
        }

  }
  
  for (d in 1:10) {
    with(rainfall, plot(yaxis ~ Rainfall, xlab = "Rainfall (mm)", ylab = "Count", xlim = c(60,140), ylim=c(0,360), yaxs = "i", pch=21, bg = "gray"))
    abline(v = breaks)  
    mtext(paste("The completed histogram"), side = 3, line = 2)
    lapply(poly.list, FUN = function(x) polygon(x$polygon.x, x$polygon.y, col = "red"))
    }

}, interval = 0.1, ani.width = 400, ani.height = 300)