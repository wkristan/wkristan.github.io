varcomp <- function(covmat,n) {
   if (is.list(covmat)) {
    if (length(covmat) < 2)
        stop("covmat must be a list with at least 2 elements")
    ps <- as.vector(sapply(covmat,dim))
    if (sum(ps[1] == ps) != length(ps))
        stop("all covariance matrices must have the same dimension")
    p <- ps[1]
        q <- length(covmat)
        if (length(n) == 1)
        Ng <- rep(n,q)
    else if (length(n) == q)
        Ng <- n
    else
        stop("n must be equal length(covmat) or 1")

    DNAME <- deparse(substitute(covmat))
   }

   else
    stop("covmat must be a list")

   ng <- Ng - 1
   Ag <- lapply(1:length(covmat),function(i,mat,n) { n[i] * mat[[i]] },mat=covmat,n=ng)
   A <- matrix(colSums(matrix(unlist(Ag),ncol=p^2,byrow=T)),ncol=p)
   detAg <- sapply(Ag,det)
   detA <- det(A)
   V1 <- prod(detAg^(ng/2))/(detA^(sum(ng)/2))
   kg <- ng/sum(ng)
   l1 <- prod((1/kg)^kg)^(p*sum(ng)/2) * V1
   rho <- 1 - (sum(1/ng) - 1/sum(ng))*(2*p^2+3*p-1)/(6*(p+1)*(q-1))
   w2 <- p*(p+1) * ((p-1)*(p+2) * (sum(1/ng^2) - 1/(sum(ng)^2)) - 6*(q-1)*(1-rho)^2) / (48*rho^2)
   f <- 0.5 * (q-1)*p*(p+1)
   STATISTIC <- -2*rho*log(l1)
   PVAL <- 1 - (pchisq(STATISTIC,f) + w2*(pchisq(STATISTIC,f+4) - pchisq(STATISTIC,f)))
   names(STATISTIC) <- "corrected lambda*"
   names(f) <- "df"
   RVAL <- structure(list(statistic = STATISTIC, parameter = f,p.value = PVAL, data.name = DNAME, method = "Equality of Covariances Matrices Test"),class="htest")
   return(RVAL)
}