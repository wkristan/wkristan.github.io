saveVideo({
pi.est <- c()
n <- 100

circle <- 0.5 + data.frame(x = cos(seq(0,2*pi,by=0.1)), y = sin(seq(0,2*pi,by=0.1)))/2
square <- data.frame(x = c(0,0,1,1), y = c(0,1,1,0))

for(i in 1:1000) {
rands <- data.frame(x = runif(n), y = runif(n))
in.circ <- sqrt(rowSums((rands-0.5)^2)) < 0.5
plot(rands, type = "n", frame.plot = F, xlim = c(0,1), ylim = c(0,1))
polygon(square, col = "tan1")
polygon(circle, col = "seashell")
points(rands, pch = 21, bg = c("red","blue")[as.factor(in.circ)])
pi.est <- c(pi.est, 4*sum(in.circ)/n)
mtext(paste("Estimate: ", format(pi.est[i],nsmall=3)), side =3 , line = 2)
}
}, ani.width = 400, ani.height = 400, interval = 0.1)