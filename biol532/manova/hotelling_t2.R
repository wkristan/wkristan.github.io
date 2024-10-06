tsquare<-function(data,group){
#This function calculates Hotelling's T-square (pg. 39-40)#
##
#1) Split the input data into two groups, and assign them to a list object.
##
data.list <- split(data, group)
##
#2) Find the sample sizes, vector of means (i.e. the centroids), and covariance matrices for the two groups#
##
ns <- lapply(data.list, function(x) length(x[,1]))
n1 <- ns[[1]]
n2 <- ns[[2]]
means.list <- lapply(data.list, colMeans)
Ss <- lapply(data.list, var)

#3) find the pooled covariance matrix and its inverse#
##
S.pooled <- ((n1-1)*Ss[[1]]+(n2-1)*Ss[[2]])/(n1+n2-2)
S.pooled.inv <- solve(S.pooled)
##
#4) Find the difference vector between group centroids (i.e. the differences group means for each variable)
d <- means.list[[1]] - means.list[[2]]
#5) Calculate the T-square test statistic.#
##
Tsquare <- ((n1*n2)/(n1+n2))*(t(d)%*%S.pooled.inv%*%(d))

#6) Convert T-square to the F approximation.#
p <- length(data.list[[1]][1,])
F <- (n1+n2-p-1)*Tsquare/((n1+n2-2)*p)
#7) Calculate the p-value for the F approximation.#
df.num=p
df.denom=n1+n2-p-1
p.value <- 1 - pf(F,df1=df.num,df2=df.denom)
##
#8) Finally, make a list of all of the results and return it#
##
output <- list("S1"=Ss[[1]], "S2" = Ss[[2]], "S.pooled"=S.pooled, "Means" = data.frame(means.list, diff = d), "Hypothesis.test.results" = data.frame(n1,n2,n.var = p,Tsquare,F,df.num,df.denom,p.value))
return(output)
}

tsquare.onesample<-function(data, null.values){
  #This function calculates a paired Hotelling's T-square#
  ##
  #1) Find the centroid (vector of means for the variables) and covariance matrix for the first group#
  ##
  n <- length(data[,1])
  xbar <- colMeans(data) - null.values
  S <- var(data)
  ##
  #2) Invert the covariance matrix.
  S.inv <- solve(S)
  #3) multiply to find the T-square stat and convert it to F and p-value#
  ##
  Tsquare <- n*t(xbar) %*% S.inv %*% (xbar)
  p <- length(data[1,])
  F <- (n-p)*Tsquare/((n-1)*p)
  df.num=p
  df.denom=n-p
  p.value <- 1 - pf(F,df1=df.num,df2=df.denom)
  ##
  #Finally, output all of the results#
  ##
  output <- list("S"=S, "Mean differences" = xbar, "Hypothesis.test.results" = data.frame(n,p,Tsquare,F,df.num,df.denom,p.value))
  return(output)
}
