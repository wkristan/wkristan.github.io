makeshade <- function(mean, sd, limits, lwid, shadecol) {
  
  lrange <- abs(limits[2] - limits[1])
  x.seq <- seq(-50, 30, by = 0.05)
  ydens <- dnorm(x.seq, mean, sd)
  
  shadeseq <- seq(limits[1], limits[2], by = lrange/1000)
  shadedens <- dnorm(shadeseq, mean, sd)
  shadeseq <- c(shadeseq, max(limits), min(limits))
  shadedens <- c(shadedens, 0, 0)
  
  plot(ydens ~ x.seq, type = "n", xlab = "Blood pressure reduction", ylab = "Probability density", ylim = c(0,0.21))
  polygon(shadeseq, shadedens, col = shadecol)
  lines(ydens~x.seq, lwd = lwid)
}