part.der <- function(r,c,L) {
  lambdas.out <- data.frame(param = numeric(), lamb = numeric())
  param.vals <- seq(0,1, by = 0.01)
  n <- c(1)
  for(i in param.vals) {
    L[r,c] <- i
    lambda <- eigen(L)$values[1]
    lambdas.out[n,] <- c(i,lambda)
    n <- n+1
  }
  return(lambdas.out)
}