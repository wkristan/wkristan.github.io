rsq.adj <- function(y) {
  sum.tmp <- summary(y)
  rsq.tmp <- sum.tmp$r.squared
  rsq.adj.tmp <- sum.tmp$adj.r.squared
  f.tmp <- if(is.null(sum.tmp$fstatistic)) c(0,1,1) else sum.tmp$fstatistic
  p.tmp <- pf(q = f.tmp[[1]], df1 = f.tmp[[2]], df2 = f.tmp[[3]], lower.tail = F)
  out <- c(rsq.tmp, rsq.adj.tmp, p.tmp)
  names(out) <- c("r.squared","adj.r.squared","p")
  return(out)
}

# Use with the command lapply(model.list, function(y) rsq.adj(y)) to get a list as output.
# Use with the command sapply(model.list, function(y), rsq.adj(y)) to get a matrix as output.
# Transpose the matrix to get the names of the models as row names, and the statistics as columns.