saveVideo({
  
  par(mar=rep(1,4),xpd=TRUE)
  high.bp <- data.frame(x = c(seq(0,22),rep(22,101), seq(22,0), rep(0,101)), y = c(rep(100,23), seq(100,0), rep(0,23), seq(0,100)))
  smoking <- data.frame(x = c(seq(0,100),rep(100,18), seq(100,0), rep(0,18)), y = c(rep(17,101), seq(17,0), rep(0,101), seq(0,17)))
  overlap.rect <- data.frame(x = c(seq(0,22), rep(22,18),seq(22,0),rep(0,18)), y = c(rep(0,23),seq(0,17),rep(17,23),seq(17,0)))
  box <- data.frame(x = c(0,100,100,0,0), y = c(0,0,100,100,0))

  for(i in 1:10) {
    plot(c(0,100) ~ c(100,0), type = "n", xaxt = "n", yaxt = "n", xlab="", ylab="", frame.plot = F)
    lines(box)
    text("This box represents all people...", x = 50, y = 75)
  }
  
  for(i in 1:30) {
    plot(c(0,100) ~ c(100,0), type = "n", xaxt = "n", yaxt = "n", xlab="", ylab="", frame.plot = F)
    lines(box)
    polygon(high.bp, col = rgb(1,1,0,0.5))
    text("...22% of which have", x = 70, y = 75)
    text("high blood pressure...", x = 70, y = 65)
    text("(that is, P(High BP) = 0.22)", x =75, y = 55)
    text("High BP", x = 11, y = 50, font = 3)
    text("Normal BP", x = 39, y = 25, font = 3)
  }
  
  for(i in 1:30) {
    plot(c(0,100) ~ c(100,0), type = "n", xaxt = "n", yaxt = "n", xlab="", ylab="", frame.plot = F)
    lines(box)
    polygon(smoking, col = rgb(0,0,1, 0.5))
    text("...17% of which smoke", x = 70, y = 75)
    text("(that is, P(Smoke) = 0.17)", x =75, y = 65)
    text("Smokers", x = 50, y = 8.5, font = 3)
    text("Non-smokers", x = 25, y = 50, font = 3)
  }
  
  for(i in 1:30) {
    plot(c(0,100) ~ c(100,0), type = "n", xaxt = "n", yaxt = "n", xlab="", ylab="", frame.plot = F)
    lines(box)
    polygon(smoking, col = rgb(0,0,1, 0.5))
    polygon(high.bp, col = rgb(1,1,0,0.5))
    polygon(overlap.rect, col = "green")
    text("If 22% of smokers have", x = 60, y = 75)
    text("high BP, like the", x =60, y = 65)
    text("population as a whole", x =60, y = 55)
    text("22% of 17%", x = 11, y = 8.5, cex = 0.7, font = 3)
    
  }
  
  for(i in 1:30) {
    plot(c(0,100) ~ c(100,0), type = "n", xaxt = "n", yaxt = "n", xlab="", ylab="", frame.plot = F)
    lines(box)
    polygon(smoking, col = rgb(0,0,1, 0.5))
    polygon(high.bp, col = rgb(1,1,0,0.5))
    polygon(overlap.rect, col = "green")
    text("Then high BP is the", x = 60, y = 75)
    text("same for smokers as the", x =60, y = 65)
    text("population as a whole", x =60, y = 55)
    text("22% of 17%", x = 11, y = 8.5, cex = 0.7, font = 3)
    
  }
  
  for(i in 1:30) {
    plot(c(0,100) ~ c(100,0), type = "n", xaxt = "n", yaxt = "n", xlab="", ylab="", frame.plot = F)
    lines(box)
    polygon(smoking, col = rgb(0,0,1, 0.5))
    polygon(high.bp, col = rgb(1,1,0,0.5))
    polygon(overlap.rect, col = "green")
    text("Then high BP is    ", x = 60, y = 75)
    text("independent of", x =60, y = 65)
    text("smoking", x =60, y = 55)
    text("22% of 17%", x = 11, y = 8.5, cex = 0.7, font = 3)
    
  }
  
  for(i in 1:10) {
    plot(c(0,100) ~ c(100,0), type = "n", xaxt = "n", yaxt = "n", xlab="", ylab="", frame.plot = F)
    lines(box)
    polygon(smoking, col = rgb(0,0,1, 0.5))
    polygon(high.bp, col = rgb(1,1,0,0.5))
    polygon(overlap.rect, col = "green")
    text("P(Smoker and High BP)", x = 60, y = 75)
    text("= 0.22 x 0.17 = 0.037", x =60, y = 65)
    text("p = 0.037", x = 11, y = 8.5, cex = 0.7, font = 3)
  }

}, interval = 0.1, ani.width=400, ani.height = 400)
