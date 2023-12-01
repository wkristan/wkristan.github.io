saveVideo({
  
  par(mar=rep(1,4),xpd=TRUE)
  high.bp <- data.frame(x = c(seq(0,22),rep(22,101), seq(22,0), rep(0,101)), y = c(rep(100,23), seq(100,0), rep(0,23), seq(0,100)))
  smoking <- data.frame(x = c(seq(0,100),rep(100,18), seq(100,0), rep(0,18)), y = c(rep(17,101), seq(17,0), rep(0,101), seq(0,17)))
  overlap.rect <- data.frame(x = c(seq(0,22), rep(22,18),seq(22,0),rep(0,18)), y = c(rep(0,23),seq(0,17),rep(17,23),seq(17,0)))
  box <- data.frame(x = c(0,100,100,0,0), y = c(0,0,100,100,0))
  bp.circ <- data.frame(x = bp.rad*sin(seq(0,2*pi, by = 2*pi/247))+ 50)
  bp.circ$y <- bp.rad*cos(seq(0,2*pi, by = 2*pi/247))+ 50
  sm.circ <- data.frame(x = sm.rad*sin(seq(0,2*pi, by = 2*pi/237))+ 50)
  sm.circ$y <- sm.rad*cos(seq(0,2*pi, by = 2*pi/237))+ 50
  bp.diffs <- bp.circ - high.bp
  sm.diffs <- sm.circ - smoking
  
  for(i in 1:10) {
    plot(c(0,100) ~ c(100,0), type = "n", xaxt = "n", yaxt = "n", xlab="", ylab="", frame.plot = F)
    lines(box)
    polygon(smoking, col = rgb(0,0,1, 0.5))
    polygon(high.bp, col = rgb(1,1,0,0.5))
    polygon(overlap.rect, col = "green")
    text("When BP and smoking", x = 60, y = 75)
    text("are independent", x =60, y = 65)
    text("0.22 x 0.17", x = 11, y = 12, cex = 0.8, font = 3)
    text("= 0.037", x = 11, y = 7, cex = 0.8, font = 3)
    text("P(High BP)", x = 11, y = 50, font = 3, cex = 0.8)
    text("0.22", x = 11, y = 40, font = 3, cex = 0.8)
    text("P(Smoker) = 0.17", x = 50, y = 8.5, font = 3, cex = 0.8)
    text("P(High BP and Smoker)", x = 45, y = 33, cex = 0.8, font = 3)
    arrows(x0 = 40, y0 = 30, x1 = 20, y1 = 15, length = 0.1)
  }

for(i in 0:50) {
  plot(c(0,100) ~ c(100,0), type = "n", xaxt = "n", yaxt = "n", xlab="", ylab="", frame.plot = F)
  polygon(box)
  polygon(high.bp + i*bp.diffs/50, col = rgb(1,1,0,0.5))
  polygon(smoking + i*sm.diffs/50, col = rgb(0,0,1, 0.5))
  text("To make BP depend on smoking...", x = 50, y = 90)
}
  
  for(i in 1:20) {
    plot(c(0,100) ~ c(100,0), type = "n", xaxt = "n", yaxt = "n", xlab="", ylab="", frame.plot = F)
    polygon(bp.circ, col = rgb(1,1,0,0.5))
    polygon(sm.circ, col = "green")
    polygon(box)
    text("All smokers have high BP", x = 50, y = 90)
    text("Smokers", x = 50, y = 50, font = 3, cex = 0.8)
    text("High BP", x = 20, y = 22, font = 3, cex = 0.8)
    arrows(x0 = 20, y0 = 25, x1 = 28.03208, y1 = 35.24560, length = 0.1)
  }
  
  for(i in 1:20) {
    plot(c(0,100) ~ c(100,0), type = "n", xaxt = "n", yaxt = "n", xlab="", ylab="", frame.plot = F)
    polygon(bp.circ, col = rgb(1,1,0,0.5))
    polygon(sm.circ, col = "green")
    polygon(box)
    text("If you randomly select a smoker from the population,", x = 50, y = 90)
    text("100% of the time he or she will have high BP", x = 50, y = 85)
    text("Smokers", x = 50, y = 50, font = 3, cex = 0.8)
    text("High BP", x = 20, y = 22, font = 3, cex = 0.8)
    arrows(x0 = 20, y0 = 25, x1 = 28.03208, y1 = 35.24560, length = 0.1)
  }
  
  for(i in 1:20) {
    plot(c(0,100) ~ c(100,0), type = "n", xaxt = "n", yaxt = "n", xlab="", ylab="", frame.plot = F)
    polygon(bp.circ, col = rgb(1,1,0,0.5))
    polygon(sm.circ, col = "green")
    polygon(box)
    text("A randomly selected non-smoker", x = 50, y = 90)
    text("will have high BP 22-17 = 5% of the time", x = 50, y = 85)
    text("Smokers", x = 50, y = 50, font = 3, cex = 0.8)
    text("High BP", x = 20, y = 22, font = 3, cex = 0.8)
    arrows(x0 = 20, y0 = 25, x1 = 28.03208, y1 = 35.24560, length = 0.1)
  }
  
  for(i in 1:20) {
    plot(c(0,100) ~ c(100,0), type = "n", xaxt = "n", yaxt = "n", xlab="", ylab="", frame.plot = F)
    polygon(bp.circ, col = rgb(1,1,0,0.5))
    polygon(sm.circ, col = "green")
    polygon(box)
    text("If the probability of high BP depends on", x = 50, y = 90)
    text("whether the person is a smoker...", x = 50, y = 85)
    text("then high BP is not independent", x = 50, y = 15)
    text("of smoking", x = 50, y = 10)
    text("Smokers", x = 50, y = 50, font = 3, cex = 0.8)
    text("High BP", x = 20, y = 22, font = 3, cex = 0.8)
    arrows(x0 = 20, y0 = 25, x1 = 28.03208, y1 = 35.24560, length = 0.1)
  }
  
  
}, interval = 0.1, ani.width=400, ani.height = 400)
